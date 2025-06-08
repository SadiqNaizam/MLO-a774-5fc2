import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import KPIWidget from '@/components/KPIWidget';
import ActivityFeedItem from '@/components/ActivityFeedItem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // SheetTrigger might not be needed if Header handles it
import { DollarSign, ShoppingCart, Users, BarChartBig, Package, Clock, UserPlus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'; // Assuming direct recharts usage or shadcn/ui/chart wraps this

// Placeholder data for charts
const salesTrendData = [
  { name: 'Mon', sales: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Tue', sales: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Wed', sales: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Thu', sales: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Fri', sales: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Sat', sales: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Sun', sales: Math.floor(Math.random() * 2000) + 500 },
];

const userActivityData = [
  { name: 'Jan', newUsers: Math.floor(Math.random() * 100) + 10 },
  { name: 'Feb', newUsers: Math.floor(Math.random() * 100) + 10 },
  { name: 'Mar', newUsers: Math.floor(Math.random() * 100) + 10 },
  { name: 'Apr', newUsers: Math.floor(Math.random() * 100) + 10 },
];

// Placeholder data for Activity Feed
const activities = [
  { id: 1, icon: ShoppingCart, title: "New Order #ORD12345", description: "From John Doe, total $125.50", timestamp: "2m ago" },
  { id: 2, icon: UserPlus, userInitials: "AS", title: "New User: Alex Smith", description: "Signed up with email alex.s@example.com", timestamp: "1h ago" },
  { id: 3, icon: Package, title: "Product 'Super Toy X' low stock", description: "Only 5 items left.", timestamp: "3h ago" },
  { id: 4, icon: DollarSign, title: "Payment Received #INV67890", description: "Payment of $49.99 confirmed.", timestamp: "5h ago" },
];

const DashboardOverviewPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  console.log('DashboardOverviewPage loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar className="hidden md:flex" />
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 pt-10 w-64"> {/* Adjust width as needed */}
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 gap-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KPIWidget title="Total Revenue" value="$45,231.89" description="+20.1% from last month" icon={DollarSign} trend="up" trendValue="+20.1%" />
            <KPIWidget title="New Orders" value="1,250" description="+180 since last week" icon={ShoppingCart} trend="up" trendValue="+15%" />
            <KPIWidget title="Active Users" value="857" description="Currently online" icon={Users} trend="neutral" />
            <KPIWidget title="Conversion Rate" value="12.5%" description="+2% from last month" icon={BarChartBig} trend="up" trendValue="+2%" />
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
                <CardDescription>Overview of sales performance.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <ActivityFeedItem
                        key={activity.id}
                        icon={activity.icon}
                        userInitials={activity.userInitials}
                        title={activity.title}
                        description={activity.description}
                        timestamp={activity.timestamp}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
           <Card className="mt-6">
              <CardHeader>
                <CardTitle>User Acquisition (Monthly)</CardTitle>
                 <CardDescription>New users signed up each month.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newUsers" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;