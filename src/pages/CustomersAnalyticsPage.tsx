import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import KPIWidget from '@/components/KPIWidget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Users, UserPlus, Activity, TrendingUp, Search } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Placeholder data for charts
const customerTrendData = [
  { month: 'Jan', new: 20, total: 120 }, { month: 'Feb', new: 30, total: 150 },
  { month: 'Mar', new: 25, total: 175 }, { month: 'Apr', new: 40, total: 215 },
  { month: 'May', new: 35, total: 250 }, { month: 'Jun', new: 50, total: 300 },
];

const ltvData = [
  { cohort: 'Jan', ltv: 150 }, { cohort: 'Feb', ltv: 180 },
  { cohort: 'Mar', ltv: 165 }, { cohort: 'Apr', ltv: 200 },
];

// Placeholder customer data
const sampleCustomers = [
  { id: "CUST001", name: "Alice Wonderland", email: "alice@example.com", joinDate: "2024-01-15", totalSpent: 1250.75, orders: 5 },
  { id: "CUST002", name: "Bob The Builder", email: "bob@example.com", joinDate: "2024-02-10", totalSpent: 850.00, orders: 3 },
  { id: "CUST003", name: "Charlie Brown", email: "charlie@example.com", joinDate: "2024-03-05", totalSpent: 2100.50, orders: 8 },
  { id: "CUST004", name: "Diana Prince", email: "diana@example.com", joinDate: "2024-04-20", totalSpent: 550.25, orders: 2 },
  { id: "CUST005", name: "Edward Scissorhands", email: "edward@example.com", joinDate: "2024-05-01", totalSpent: 300.00, orders: 1 },
];

const CustomersAnalyticsPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  console.log('CustomersAnalyticsPage loaded');

  const filteredCustomers = sampleCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <main className="flex-1 p-4 md:p-6 lg:p-8 gap-6">
          <h1 className="text-2xl font-semibold mb-6">Customer Analytics</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <KPIWidget title="Total Customers" value="300" description="Active customer base" icon={Users} />
            <KPIWidget title="New Customers (This Month)" value="50" description="+15% from last month" icon={UserPlus} trend="up" trendValue="+15%" />
            <KPIWidget title="Avg. Customer LTV" value="$450.75" description="Lifetime value projection" icon={TrendingUp} />
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth Trend</CardTitle>
                <CardDescription>New vs. Total Customers Over Time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="new" name="New Customers" stroke="#8884d8" />
                    <Line type="monotone" dataKey="total" name="Total Customers" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value (LTV) by Cohort</CardTitle>
                <CardDescription>Average LTV for customer cohorts.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ltvData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cohort" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ltv" name="Average LTV" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>Browse and search your customers.</CardDescription>
              <div className="relative mt-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search customers by name or email..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell className="text-right">{customer.orders}</TableCell>
                      <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredCustomers.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">No customers found matching your search.</div>
              )}
            </CardContent>
            <CardFooter>
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CustomersAnalyticsPage;