// src/components/analytics/export-dialog.tsx
// Interactive export dialog with format selection, filtering options, and progress tracking

"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Table, BarChart3, FileJson, Calendar as CalendarIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { DashboardData } from '@/types/analytics';
import { AnalyticsExporter, downloadFile, createExportOptions, validateExportOptions } from '@/lib/analytics-export';
import { divisionConfig } from '@/lib/analytics-data';
import { cn } from '@/lib/utils';

interface ExportDialogProps {
  data: DashboardData;
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
}

interface ExportState {
  isExporting: boolean;
  progress: number;
  status: 'idle' | 'preparing' | 'generating' | 'complete' | 'error';
  error?: string;
}

// Purpose: Provide comprehensive export interface with format selection, filtering, and progress feedback
export function ExportDialog({ data, trigger, defaultOpen = false }: ExportDialogProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'xlsx' | 'pdf' | 'json'>('xlsx');
  const [reportType, setReportType] = useState<'summary' | 'detailed' | 'executive'>('detailed');
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [exportState, setExportState] = useState<ExportState>({
    isExporting: false,
    progress: 0,
    status: 'idle'
  });

  const formatOptions = [
    {
      value: 'xlsx',
      label: 'Excel Workbook',
      description: 'Multi-sheet workbook with charts and formatting',
      icon: <Table className="h-4 w-4" />,
      recommended: true
    },
    {
      value: 'pdf',
      label: 'PDF Report',
      description: 'Professional report with executive summary',
      icon: <FileText className="h-4 w-4" />,
      recommended: false
    },
    {
      value: 'csv',
      label: 'CSV Data',
      description: 'Raw data for external analysis',
      icon: <BarChart3 className="h-4 w-4" />,
      recommended: false
    },
    {
      value: 'json',
      label: 'JSON Data',
      description: 'Structured data for API integration',
      icon: <FileJson className="h-4 w-4" />,
      recommended: false
    }
  ] as const;

  const reportTypeOptions = [
    {
      value: 'summary',
      label: 'Executive Summary',
      description: 'High-level overview for leadership'
    },
    {
      value: 'detailed',
      label: 'Detailed Analysis',
      description: 'Comprehensive metrics and insights'
    },
    {
      value: 'executive',
      label: 'Executive Dashboard',
      description: 'Visual charts and key performance indicators'
    }
  ] as const;

  const availableDivisions = Object.entries(divisionConfig).map(([slug, config]) => ({
    slug,
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    color: config.accent
  }));

  const handleDivisionToggle = (divisionSlug: string) => {
    setSelectedDivisions(prev => 
      prev.includes(divisionSlug)
        ? prev.filter(d => d !== divisionSlug)
        : [...prev, divisionSlug]
    );
  };

  const getEstimatedFileSize = () => {
    const baseSize = selectedFormat === 'pdf' ? 2.5 : selectedFormat === 'xlsx' ? 1.2 : 0.5;
    const divisionMultiplier = selectedDivisions.length || data.divisionMetrics.length;
    const sizeMultiplier = reportType === 'detailed' ? 1.5 : reportType === 'executive' ? 1.2 : 0.8;
    
    return Math.round(baseSize * (divisionMultiplier / 7) * sizeMultiplier * 10) / 10;
  };

  const simulateProgress = (duration: number) => {
    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 90, 90); // Cap at 90% until complete
      setExportState(prev => ({ ...prev, progress }));

      if (currentStep >= steps) {
        clearInterval(progressInterval);
      }
    }, stepDuration);

    return progressInterval;
  };

  const handleExport = async () => {
    try {
      setExportState({
        isExporting: true,
        progress: 0,
        status: 'preparing'
      });

      // Validate options
      const exportOptions = createExportOptions(selectedFormat, {
        reportType,
        divisions: selectedDivisions.length > 0 ? selectedDivisions : undefined,
        includeCharts: includeCharts && selectedFormat === 'pdf',
        dateRange: dateRange.start && dateRange.end ? {
          start: dateRange.start,
          end: dateRange.end
        } : undefined
      });

      validateExportOptions(exportOptions);

      setExportState(prev => ({ ...prev, status: 'generating' }));

      // Simulate progress for user feedback
      const progressInterval = simulateProgress(2000);

      // Generate export
      const exporter = new AnalyticsExporter(data);
      const exportData = await exporter.export(exportOptions);

      clearInterval(progressInterval);
      
      setExportState(prev => ({ 
        ...prev, 
        progress: 100, 
        status: 'complete' 
      }));

      // Download file
      downloadFile(exportData);

      // Reset after short delay
      setTimeout(() => {
        setExportState({
          isExporting: false,
          progress: 0,
          status: 'idle'
        });
        setOpen(false);
      }, 2000);

    } catch (error) {
      console.error('Export failed:', error);
      setExportState({
        isExporting: false,
        progress: 0,
        status: 'error',
        error: error instanceof Error ? error.message : 'Export failed'
      });
    }
  };

  const getStatusMessage = () => {
    switch (exportState.status) {
      case 'preparing':
        return 'Preparing export data...';
      case 'generating':
        return `Generating ${selectedFormat.toUpperCase()} file...`;
      case 'complete':
        return 'Export complete! Download started.';
      case 'error':
        return `Export failed: ${exportState.error}`;
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (exportState.status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export Analytics Report</DialogTitle>
          <DialogDescription>
            Generate a comprehensive analytics report in your preferred format
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Export Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formatOptions.map((option) => (
                <Card 
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedFormat === option.value 
                      ? "ring-2 ring-primary border-primary" 
                      : "hover:border-primary/50"
                  )}
                  onClick={() => setSelectedFormat(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{option.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{option.label}</h4>
                          {option.recommended && (
                            <Badge variant="secondary" className="text-xs">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Report Type */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Report Type</Label>
            <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Division Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Divisions (leave empty for all)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {availableDivisions.map((division) => (
                <div key={division.slug} className="flex items-center space-x-2">
                  <Checkbox
                    id={division.slug}
                    checked={selectedDivisions.includes(division.slug)}
                    onCheckedChange={() => handleDivisionToggle(division.slug)}
                  />
                  <Label 
                    htmlFor={division.slug}
                    className="text-sm cursor-pointer flex items-center gap-2"
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: division.color }}
                    />
                    {division.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Date Range (optional)
            </Label>
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {dateRange.start ? format(dateRange.start, 'MMM d, yyyy') : 'Start date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.start}
                    onSelect={(date) => setDateRange(prev => ({ ...prev, start: date }))}
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              
              <span className="text-muted-foreground">to</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {dateRange.end ? format(dateRange.end, 'MMM d, yyyy') : 'End date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.end}
                    onSelect={(date) => setDateRange(prev => ({ ...prev, end: date }))}
                                        disabled={(date) => {
                      const today = new Date();
                      const startDate = dateRange.start;
                      if (!startDate) return date > today;
                      return date > today || date < startDate;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Additional Options */}
          {selectedFormat === 'pdf' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-charts"
                checked={includeCharts}
                onCheckedChange={(checked) => setIncludeCharts(checked === true)}
              />
              <Label htmlFor="include-charts" className="text-sm">
                Include charts and visualizations
              </Label>
            </div>
          )}

          {/* Export Progress */}
          {exportState.isExporting && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon()}
                    <span className="text-sm font-medium">{getStatusMessage()}</span>
                  </div>
                  <Progress value={exportState.progress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Export Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-medium">{selectedFormat.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Report Type:</span>
                <span className="font-medium">{reportType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Divisions:</span>
                <span className="font-medium">
                  {selectedDivisions.length === 0 ? 'All' : selectedDivisions.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Size:</span>
                <span className="font-medium">{getEstimatedFileSize()} MB</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={exportState.isExporting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={exportState.isExporting || exportState.status === 'complete'}
          >
            {exportState.isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}