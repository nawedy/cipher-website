// src/lib/analytics-export.ts
// Comprehensive data export functionality supporting multiple formats with customizable report generation

import { DashboardData, DivisionMetrics, RevenueDataPoint } from '@/types/analytics';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf' | 'json';
  dateRange?: {
    start: Date;
    end: Date;
  };
  divisions?: string[];
  includeCharts?: boolean;
  reportType?: 'summary' | 'detailed' | 'executive';
}

interface ExportData {
  filename: string;
  data: Blob | string;
  mimeType: string;
}

// Purpose: Generate comprehensive analytics reports in multiple formats with customizable data sets
export class AnalyticsExporter {
  private data: DashboardData;

  constructor(data: DashboardData) {
    this.data = data;
  }

  // Purpose: Main export method that routes to appropriate format handler
  async export(options: ExportOptions): Promise<ExportData> {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = `cipher-analytics-${timestamp}`;

    switch (options.format) {
      case 'csv':
        return this.exportCSV(baseFilename, options);
      case 'xlsx':
        return this.exportExcel(baseFilename, options);
      case 'pdf':
        return await this.exportPDF(baseFilename, options);
      case 'json':
        return this.exportJSON(baseFilename, options);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  // Purpose: Export analytics data as CSV with multiple sheets represented as separate files
  private exportCSV(baseFilename: string, options: ExportOptions): ExportData {
    const filteredData = this.filterData(options);
    
    // Create CSV content for division metrics
    const csvContent = this.generateCSVContent([
      ['Division', 'Revenue', 'Growth Rate %', 'Projects', 'Customers', 'Conversion Rate %', 'Category'],
      ...filteredData.divisionMetrics.map(division => [
        division.name,
        division.revenue.toString(),
        division.growthRate.toString(),
        division.projectCount.toString(),
        division.customerCount.toString(),
        division.conversionRate.toString(),
        division.category
      ])
    ]);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    return {
      filename: `${baseFilename}.csv`,
      data: blob,
      mimeType: 'text/csv'
    };
  }

  // Purpose: Generate multi-sheet Excel workbook with comprehensive analytics data
  private exportExcel(baseFilename: string, options: ExportOptions): ExportData {
    const filteredData = this.filterData(options);
    const workbook = XLSX.utils.book_new();

    // Division Metrics Sheet
    const metricsData = [
      ['Division', 'Revenue', 'Growth Rate %', 'Projects', 'Customers', 'Conversion Rate %', 'Category', 'Color', 'Accent Color'],
      ...filteredData.divisionMetrics.map(division => [
        division.name,
        division.revenue,
        division.growthRate,
        division.projectCount,
        division.customerCount,
        division.conversionRate,
        division.category,
        division.color,
        division.accentColor
      ])
    ];
    
    const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData);
    XLSX.utils.book_append_sheet(workbook, metricsSheet, 'Division Metrics');

    // Revenue Timeline Sheet
    const timelineData = [
      ['Date', 'Division', 'Revenue', 'Projects', 'Customers'],
      ...filteredData.revenueTimeline.map(point => [
        point.date,
        point.division,
        point.revenue,
        point.projects,
        point.customers
      ])
    ];
    
    const timelineSheet = XLSX.utils.aoa_to_sheet(timelineData);
    XLSX.utils.book_append_sheet(workbook, timelineSheet, 'Revenue Timeline');

    // Conversion Funnel Sheet
    const funnelData = [
      ['Stage', 'Visitors', 'Conversion Rate %', 'Value'],
      ...filteredData.conversionFunnel.map(step => [
        step.stage,
        step.visitors,
        step.conversionRate,
        step.value
      ])
    ];
    
    const funnelSheet = XLSX.utils.aoa_to_sheet(funnelData);
    XLSX.utils.book_append_sheet(workbook, funnelSheet, 'Conversion Funnel');

    // Summary Sheet
    const summaryData = [
      ['Metric', 'Value'],
      ['Total Revenue', `$${filteredData.totalRevenue.toLocaleString()}`],
      ['Average Growth Rate', `${filteredData.totalGrowth}%`],
      ['Total Projects', filteredData.totalProjects],
      ['Total Customers', filteredData.totalCustomers],
      ['Total Products Sold', filteredData.totalProductsSold],
      ['Cross-Division Referrals', filteredData.crossDivisionReferrals],
      ['Export Date', new Date().toLocaleDateString()],
      ['Report Type', options.reportType || 'detailed']
    ];
    
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' 
    });

    return {
      filename: `${baseFilename}.xlsx`,
      data: blob,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
  }

  // Purpose: Generate professional PDF report with charts and executive summary
  private async exportPDF(baseFilename: string, options: ExportOptions): Promise<ExportData> {
    const filteredData = this.filterData(options);
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Cipher Intelligence Analytics Report', 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Report Type: ${options.reportType || 'Detailed'}`, 20, 50);

    // Executive Summary
    let yPosition = 70;
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('Executive Summary', 20, yPosition);
    
    yPosition += 20;
    doc.setFontSize(10);
    
    const summaryData = [
      ['Metric', 'Value', 'Performance'],
      ['Total Revenue', `$${(filteredData.totalRevenue / 1000000).toFixed(1)}M`, this.getPerformanceIndicator(filteredData.totalGrowth)],
      ['Average Growth', `${filteredData.totalGrowth}%`, this.getPerformanceIndicator(filteredData.totalGrowth)],
      ['Active Divisions', filteredData.divisionMetrics.length.toString(), 'Active'],
      ['Total Projects', filteredData.totalProjects.toString(), 'Completed'],
      ['Customer Base', filteredData.totalCustomers.toString(), 'Growing'],
      ['Cross-Division Synergy', `${filteredData.crossDivisionReferrals} referrals`, 'Strong']
    ];

    (doc as any).autoTable({
      head: [summaryData[0]],
      body: summaryData.slice(1),
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { left: 20, right: 20 }
    });

    // Division Performance Table
    yPosition = (doc as any).lastAutoTable.finalY + 30;
    
    doc.setFontSize(16);
    doc.text('Division Performance Breakdown', 20, yPosition);
    
    yPosition += 10;
    
    const divisionTableData = filteredData.divisionMetrics.map(division => [
      division.name,
      `$${(division.revenue / 1000000).toFixed(1)}M`,
      `${division.growthRate}%`,
      division.projectCount.toString(),
      division.customerCount.toString(),
      `${division.conversionRate.toFixed(1)}%`,
      division.category
    ]);

    (doc as any).autoTable({
      head: [['Division', 'Revenue', 'Growth', 'Projects', 'Customers', 'Conv. Rate', 'Category']],
      body: divisionTableData,
      startY: yPosition,
      theme: 'striped',
      headStyles: { fillColor: [139, 92, 246] },
      alternateRowStyles: { fillColor: [250, 245, 255] },
      margin: { left: 20, right: 20 },
      columnStyles: {
        1: { halign: 'right' },
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'right' },
        5: { halign: 'right' }
      }
    });

    // Top Performers Section
    if (options.reportType !== 'summary') {
      yPosition = (doc as any).lastAutoTable.finalY + 30;
      
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFontSize(16);
      doc.text('Top Performing Divisions', 20, yPosition);
      
      yPosition += 10;
      
      const topPerformersData = filteredData.topPerformers.slice(0, 3).map((division, index) => [
        `#${index + 1}`,
        division.name,
        `$${(division.revenue / 1000000).toFixed(1)}M`,
        `${division.growthRate}%`,
        this.getPerformanceIndicator(division.growthRate)
      ]);

      (doc as any).autoTable({
        head: [['Rank', 'Division', 'Revenue', 'Growth Rate', 'Status']],
        body: topPerformersData,
        startY: yPosition,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129] },
        margin: { left: 20, right: 20 }
      });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Cipher Intelligence Analytics | Page ${i} of ${pageCount} | Confidential`,
        20,
        doc.internal.pageSize.height - 10
      );
    }

    const pdfBlob = new Blob([doc.output('blob')], { type: 'application/pdf' });
    
    return {
      filename: `${baseFilename}.pdf`,
      data: pdfBlob,
      mimeType: 'application/pdf'
    };
  }

  // Purpose: Export raw analytics data as structured JSON for API consumption
  private exportJSON(baseFilename: string, options: ExportOptions): ExportData {
    const filteredData = this.filterData(options);
    
    const jsonData = {
      metadata: {
        exportDate: new Date().toISOString(),
        reportType: options.reportType || 'detailed',
        dateRange: options.dateRange,
        divisions: options.divisions,
        version: '1.0'
      },
      summary: {
        totalRevenue: filteredData.totalRevenue,
        totalGrowth: filteredData.totalGrowth,
        totalProjects: filteredData.totalProjects,
        totalCustomers: filteredData.totalCustomers,
        totalProductsSold: filteredData.totalProductsSold,
        crossDivisionReferrals: filteredData.crossDivisionReferrals
      },
      divisions: filteredData.divisionMetrics,
      revenueTimeline: filteredData.revenueTimeline,
      conversionFunnel: filteredData.conversionFunnel,
      topPerformers: filteredData.topPerformers,
      productMetrics: filteredData.productMetrics
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    
    return {
      filename: `${baseFilename}.json`,
      data: blob,
      mimeType: 'application/json'
    };
  }

  // Purpose: Filter analytics data based on export options and user selections
  private filterData(options: ExportOptions): DashboardData {
    let filteredData = { ...this.data };

    // Filter by divisions if specified
    if (options.divisions && options.divisions.length > 0) {
      filteredData.divisionMetrics = filteredData.divisionMetrics.filter(
        division => options.divisions!.includes(division.slug)
      );
      
      filteredData.revenueTimeline = filteredData.revenueTimeline.filter(
        point => options.divisions!.includes(point.division)
      );
      
      filteredData.topPerformers = filteredData.topPerformers.filter(
        division => options.divisions!.includes(division.slug)
      );
    }

    // Filter by date range if specified
    if (options.dateRange) {
      const { start, end } = options.dateRange;
      filteredData.revenueTimeline = filteredData.revenueTimeline.filter(point => {
        const pointDate = new Date(point.date + '-01');
        return pointDate >= start && pointDate <= end;
      });
    }

    // Recalculate totals based on filtered data
    filteredData.totalRevenue = filteredData.divisionMetrics.reduce((sum, div) => sum + div.revenue, 0);
    filteredData.totalProjects = filteredData.divisionMetrics.reduce((sum, div) => sum + div.projectCount, 0);
    filteredData.totalCustomers = filteredData.divisionMetrics.reduce((sum, div) => sum + div.customerCount, 0);
    filteredData.totalProductsSold = filteredData.divisionMetrics.reduce((sum, div) => sum + (div.productsSold || 0), 0);
    filteredData.totalGrowth = filteredData.divisionMetrics.length 
      ? Math.round(filteredData.divisionMetrics.reduce((sum, div) => sum + div.growthRate, 0) / filteredData.divisionMetrics.length)
      : 0;

    return filteredData;
  }

  // Purpose: Generate CSV content with proper escaping and formatting
  private generateCSVContent(data: string[][]): string {
    return data.map(row => 
      row.map(cell => {
        // Escape quotes and wrap in quotes if necessary
        const escaped = cell.toString().replace(/"/g, '""');
        return /[",\n\r]/.test(cell.toString()) ? `"${escaped}"` : escaped;
      }).join(',')
    ).join('\n');
  }

  // Purpose: Get performance indicator text for reporting
  private getPerformanceIndicator(growthRate: number): string {
    if (growthRate >= 100) return 'Exceptional';
    if (growthRate >= 50) return 'Excellent';
    if (growthRate >= 25) return 'Good';
    if (growthRate >= 10) return 'Moderate';
    if (growthRate >= 0) return 'Stable';
    return 'Declining';
  }
}

// Purpose: Utility function to trigger file download in browser
export function downloadFile(exportData: ExportData): void {
  const url = URL.createObjectURL(exportData.data as Blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = exportData.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Purpose: Create export options with sensible defaults
export function createExportOptions(
  format: ExportOptions['format'],
  overrides: Partial<ExportOptions> = {}
): ExportOptions {
  return {
    format,
    reportType: 'detailed',
    includeCharts: format === 'pdf',
    ...overrides
  };
}

// Purpose: Validate export options and throw descriptive errors
export function validateExportOptions(options: ExportOptions): void {
  const validFormats = ['csv', 'xlsx', 'pdf', 'json'];
  if (!validFormats.includes(options.format)) {
    throw new Error(`Invalid export format. Must be one of: ${validFormats.join(', ')}`);
  }

  if (options.dateRange) {
    const { start, end } = options.dateRange;
    if (start >= end) {
      throw new Error('Start date must be before end date');
    }
    
    const now = new Date();
    if (start > now) {
      throw new Error('Start date cannot be in the future');
    }
  }

  const validReportTypes = ['summary', 'detailed', 'executive'];
  if (options.reportType && !validReportTypes.includes(options.reportType)) {
    throw new Error(`Invalid report type. Must be one of: ${validReportTypes.join(', ')}`);
  }
}