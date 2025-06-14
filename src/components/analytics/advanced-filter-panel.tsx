// src/components/analytics/advanced-filter-panel.tsx
// Comprehensive filtering system with date ranges, division selection, metric filtering, and saved filter presets

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Filter, 
  CalendarIcon, 
  Save, 
  RotateCcw, 
  Trash2, 
  Star,
  StarOff,
  TrendingUp,
  TrendingDown,
  Target,
  Settings
} from 'lucide-react';
import { format, subDays, subMonths, subQuarters, startOfYear, endOfYear } from 'date-fns';
import { AnalyticsFilters } from '@/types/analytics';
import { divisionConfig } from '@/lib/analytics-data';
import { cn } from '@/lib/utils';

interface FilterPreset {
  id: string;
  name: string;
  description: string;
  filters: AnalyticsFilters;
  favorite: boolean;
  createdAt: Date;
}

interface AdvancedFilterPanelProps {
  filters: AnalyticsFilters;
  onFiltersChange: (filters: AnalyticsFilters) => void;
  onApply: () => void;
  trigger?: React.ReactNode;
  className?: string;
}

// Purpose: Provide comprehensive filtering interface with preset management and real-time preview
export function AdvancedFilterPanel({
  filters,
  onFiltersChange,
  onApply,
  trigger,
  className
}: AdvancedFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [presetName, setPresetName] = useState('');
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // Quick date range presets
  const datePresets = [
    {
      label: 'Last 7 days',
      value: 'last7days',
      start: subDays(new Date(), 7),
      end: new Date()
    },
    {
      label: 'Last 30 days',
      value: 'last30days',
      start: subDays(new Date(), 30),
      end: new Date()
    },
    {
      label: 'Last 3 months',
      value: 'last3months',
      start: subMonths(new Date(), 3),
      end: new Date()
    },
    {
      label: 'Last quarter',
      value: 'lastquarter',
      start: subQuarters(new Date(), 1),
      end: new Date()
    },
    {
      label: 'This year',
      value: 'thisyear',
      start: startOfYear(new Date()),
      end: endOfYear(new Date())
    },
    {
      label: 'Custom range',
      value: 'custom',
      start: null,
      end: null
    }
  ];

  const availableDivisions = Object.entries(divisionConfig).map(([slug, config]) => ({
    slug,
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    color: config.accent,
    category: config.category
  }));

  const metricOptions = [
    { value: 'revenue', label: 'Revenue', icon: <TrendingUp className="h-4 w-4" /> },
    { value: 'growth', label: 'Growth Rate', icon: <TrendingUp className="h-4 w-4" /> },
    { value: 'projects', label: 'Projects', icon: <Target className="h-4 w-4" /> },
    { value: 'customers', label: 'Customers', icon: <Target className="h-4 w-4" /> },
    { value: 'products', label: 'Products', icon: <Target className="h-4 w-4" /> }
  ];

  // Load presets from localStorage on component mount
  useEffect(() => {
    const savedPresets = localStorage.getItem('analytics-filter-presets');
    if (savedPresets) {
      try {
        const parsed = JSON.parse(savedPresets).map((preset: any) => ({
          ...preset,
          createdAt: new Date(preset.createdAt),
          filters: {
            ...preset.filters,
            dateRange: preset.filters.dateRange ? {
              start: new Date(preset.filters.dateRange.start),
              end: new Date(preset.filters.dateRange.end)
            } : undefined
          }
        }));
        setPresets(parsed);
      } catch (error) {
        console.error('Failed to load filter presets:', error);
      }
    }
  }, []);

  // Save presets to localStorage when changed
  useEffect(() => {
    localStorage.setItem('analytics-filter-presets', JSON.stringify(presets));
  }, [presets]);

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    onFiltersChange({
      ...filters,
      dateRange: start && end ? { start, end } : { start: new Date(), end: new Date() }
    });
  };

  const handleQuickDateRange = (preset: typeof datePresets[0]) => {
    if (preset.start && preset.end) {
      handleDateRangeChange(preset.start, preset.end);
    } else {
      // For custom range, clear the date range
      handleDateRangeChange(undefined, undefined);
    }
  };

  const handleDivisionToggle = (divisionSlug: string) => {
    const currentDivisions = filters.divisions || [];
    const newDivisions = currentDivisions.includes(divisionSlug)
      ? currentDivisions.filter(d => d !== divisionSlug)
      : [...currentDivisions, divisionSlug];
    
            onFiltersChange({
          ...filters,
          divisions: newDivisions.length > 0 ? newDivisions : []
        });
  };

  const handleCategoryFilter = (category: string) => {
    const divisionsInCategory = availableDivisions
      .filter(div => div.category === category)
      .map(div => div.slug);
    
    const currentDivisions = filters.divisions || [];
    const hasAllInCategory = divisionsInCategory.every(slug => currentDivisions.includes(slug));
    
    if (hasAllInCategory) {
      // Remove all divisions in this category
      const newDivisions = currentDivisions.filter(slug => !divisionsInCategory.includes(slug));
      onFiltersChange({
        ...filters,
        divisions: newDivisions.length > 0 ? newDivisions : []
      });
    } else {
      // Add all divisions in this category
      const newDivisions = [...new Set([...currentDivisions, ...divisionsInCategory])];
      onFiltersChange({
        ...filters,
        divisions: newDivisions
      });
    }
  };

  const savePreset = () => {
    if (!presetName.trim()) return;

    const newPreset: FilterPreset = {
      id: Date.now().toString(),
      name: presetName.trim(),
      description: generatePresetDescription(filters),
      filters: { ...filters },
      favorite: false,
      createdAt: new Date()
    };

    setPresets(prev => [...prev, newPreset]);
    setPresetName('');
    setActivePresetId(newPreset.id);
  };

  const loadPreset = (preset: FilterPreset) => {
    onFiltersChange(preset.filters);
    setActivePresetId(preset.id);
    setIsOpen(false);
    onApply();
  };

  const deletePreset = (presetId: string) => {
    setPresets(prev => prev.filter(p => p.id !== presetId));
    if (activePresetId === presetId) {
      setActivePresetId(null);
    }
  };

  const togglePresetFavorite = (presetId: string) => {
    setPresets(prev => prev.map(p => 
      p.id === presetId ? { ...p, favorite: !p.favorite } : p
    ));
  };

  const resetFilters = () => {
    const defaultFilters: AnalyticsFilters = {
      dateRange: { start: new Date(), end: new Date() },
      divisions: [],
      metric: 'revenue',
      period: 'monthly'
    };
    onFiltersChange(defaultFilters);
    setActivePresetId(null);
  };

  const generatePresetDescription = (filters: AnalyticsFilters): string => {
    const parts = [];
    
    if (filters.dateRange) {
      parts.push(`${format(filters.dateRange.start, 'MMM d')} - ${format(filters.dateRange.end, 'MMM d')}`);
    }
    
    if (filters.divisions && filters.divisions.length > 0) {
      parts.push(`${filters.divisions.length} divisions`);
    }
    
    if (filters.metric) {
      parts.push(`${filters.metric} focus`);
    }
    
    return parts.join(', ') || 'All data';
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange) count++;
    if (filters.divisions && filters.divisions.length > 0) count++;
    if (filters.metric && filters.metric !== 'revenue') count++;
    return count;
  };

  const groupedDivisions = availableDivisions.reduce((acc, division) => {
    if (!acc[division.category]) {
      acc[division.category] = [];
    }
    acc[division.category].push(division);
    return acc;
  }, {} as Record<string, typeof availableDivisions>);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className={className}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md" side="right">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Advanced Filters
          </SheetTitle>
          <SheetDescription>
            Customize your analytics view with detailed filtering options
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6 pr-6">
            {/* Saved Presets */}
            {presets.length > 0 && (
              <div>
                <Label className="text-sm font-medium mb-3 block">Saved Presets</Label>
                <div className="space-y-2">
                  {presets
                    .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0))
                    .slice(0, 5)
                    .map((preset) => (
                    <div
                      key={preset.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                        activePresetId === preset.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => loadPreset(preset)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{preset.name}</span>
                          {preset.favorite && (
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{preset.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePresetFavorite(preset.id);
                          }}
                        >
                          {preset.favorite ? (
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          ) : (
                            <StarOff className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePreset(preset.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Date Range Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Date Range</Label>
              <div className="space-y-3">
                {/* Quick presets */}
                <div className="grid grid-cols-2 gap-2">
                  {datePresets.slice(0, 4).map((preset) => (
                    <Button
                      key={preset.value}
                      variant="outline"
                      size="sm"
                      className="text-xs justify-start"
                      onClick={() => handleQuickDateRange(preset)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>

                {/* Custom date range */}
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="justify-start text-left">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {filters.dateRange?.start ? format(filters.dateRange.start, 'MMM d') : 'Start'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange?.start}
                        onSelect={(date) => handleDateRangeChange(date, filters.dateRange?.end)}
                        disabled={(date) => date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="justify-start text-left">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {filters.dateRange?.end ? format(filters.dateRange.end, 'MMM d') : 'End'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange?.end}
                        onSelect={(date) => handleDateRangeChange(filters.dateRange?.start, date)}
                        disabled={(date) => 
                          date > new Date() || 
                          (filters.dateRange?.start && date < filters.dateRange.start)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <Separator />

            {/* Division Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Divisions</Label>
              
              {/* Category quick filters */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  {['consulting', 'products', 'services'].map((category) => {
                    const divisionsInCategory = availableDivisions.filter(d => d.category === category);
                    const currentDivisions = filters.divisions || [];
                    const hasAllInCategory = divisionsInCategory.every(
                      div => currentDivisions.includes(div.slug)
                    );
                    
                    return (
                      <Button
                        key={category}
                        variant={hasAllInCategory ? "default" : "outline"}
                        size="sm"
                        className="text-xs capitalize"
                        onClick={() => handleCategoryFilter(category)}
                      >
                        {category}
                      </Button>
                    );
                  })}
                </div>

                {/* Individual division checkboxes */}
                <div className="space-y-3">
                  {Object.entries(groupedDivisions).map(([category, divisions]) => (
                    <div key={category}>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {divisions.map((division) => (
                          <div key={division.slug} className="flex items-center space-x-2">
                            <Checkbox
                              id={division.slug}
                              checked={(filters.divisions || []).includes(division.slug)}
                              onCheckedChange={() => handleDivisionToggle(division.slug)}
                            />
                            <Label 
                              htmlFor={division.slug}
                              className="text-sm cursor-pointer flex items-center gap-2 flex-1"
                            >
                              <div 
                                className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: division.color }}
                              />
                              {division.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Metric Focus */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Primary Metric</Label>
              <Select 
                value={filters.metric || 'revenue'} 
                onValueChange={(value: any) => onFiltersChange({ ...filters, metric: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {metricOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Period Granularity */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Time Period</Label>
              <Select 
                value={filters.period || 'monthly'} 
                onValueChange={(value: any) => onFiltersChange({ ...filters, period: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Save Preset */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Save Current Filters</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Preset name..."
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                />
                <Button
                  onClick={savePreset}
                  disabled={!presetName.trim()}
                  size="sm"
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Preset
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="border-t pt-4 mt-6 space-y-2">
          <div className="flex gap-2">
            <Button onClick={onApply} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          {getActiveFiltersCount() > 0 && (
            <p className="text-xs text-muted-foreground text-center">
              {getActiveFiltersCount()} filter{getActiveFiltersCount() === 1 ? '' : 's'} applied
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}