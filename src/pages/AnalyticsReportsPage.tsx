import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CalendarDays, Download, BarChartHorizontalBig, PieChart, TrafficCone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell, PieChart as RechartsPieChart } from 'recharts';
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

// Placeholder data
const salesReportData = [
  { date: "2024-07-01", orders: 10, revenue: 500 }, { date: "2024-07-02", orders: 12, revenue: 650 },
  { date: "2024-07-03", orders: 8, revenue: 400 }, { date: "2024-07-04", orders: 15, revenue: 800 },
];
const trafficSourceData = [
  { name: 'Organic Search', value: 400 }, { name: 'Direct', value: 300 },
  { name: 'Referral', value: 200 }, { name: 'Social Media', value: 100 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsReportsPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [reportType, setReportType] = useState("daily");

  console.log('AnalyticsReportsPage loaded');

  const handleGenerateReport = () => {
    console.log("Generating report for:", reportType, dateRange);
    // Actual report generation logic would go here
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar className="hidden md:flex" />
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 pt-10 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Analytics & Reports</h1>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export All Reports
            </Button>
          </div>

          <Tabs defaultValue="sales">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
              <TabsTrigger value="sales">Sales Reports</TabsTrigger>
              <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
              <TabsTrigger value="product">Product Performance</TabsTrigger>
            </TabsList>

            {/* Common Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Report Filters</CardTitle>
                <CardDescription>Customize your report parameters.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label htmlFor="reportType" className="text-sm font-medium">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="reportType" className="w-full md:w-[200px] mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Trends</SelectItem>
                      <SelectItem value="monthly">Monthly Overview</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                    <label htmlFor="dateRange" className="text-sm font-medium">Date Range</label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="dateRange"
                            variant={"outline"}
                            className="w-full md:w-[300px] justify-start text-left font-normal mt-1"
                        >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                            dateRange.to ? (
                                <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
                            ) : (
                                format(dateRange.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date range</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <Button onClick={handleGenerateReport} className="w-full md:w-auto">
                    <BarChartHorizontalBig className="mr-2 h-4 w-4" /> Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Sales Report Tab */}
            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>Overview of sales data for the selected period.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                        <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesReportData.map((row) => (
                        <TableRow key={row.date}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.orders}</TableCell>
                          <TableCell className="text-right">${row.revenue.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Traffic Analysis Tab */}
            <TabsContent value="traffic">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Breakdown of website traffic origins.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie data={trafficSourceData} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {trafficSourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Could add a table for traffic source details */}
                     <p className="text-center text-muted-foreground">Detailed traffic table coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Product Performance Tab */}
            <TabsContent value="product">
               <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Sales and views for popular products.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for product performance chart/table */}
                  <p className="text-center text-muted-foreground py-10">Product performance data will be displayed here. (e.g., top sellers, most viewed)</p>
                  <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Units Sold</TableHead>
                            <TableHead className="text-right">Total Revenue</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Example Row - map actual data here */}
                        <TableRow>
                            <TableCell>Interactive Robot Dog</TableCell>
                            <TableCell>RD-001</TableCell>
                            <TableCell>150</TableCell>
                            <TableCell className="text-right">$19,498.50</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Wooden Dollhouse Set</TableCell>
                            <TableCell>DH-005</TableCell>
                            <TableCell>95</TableCell>
                            <TableCell className="text-right">$8,502.50</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsReportsPage;