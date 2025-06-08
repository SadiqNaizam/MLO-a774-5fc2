import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Search, MoreHorizontal, PlusCircle, FileText } from 'lucide-react';

// Placeholder order data
const sampleOrders = [
  { id: "ORD001", customer: "Alice Wonderland", email: "alice@example.com", date: "2024-07-28", total: 150.00, status: "Shipped", items: [{name: "Toy Train", qty: 1}, {name: "Doll House", qty: 1}], shippingAddress: "123 Fantasy Lane" },
  { id: "ORD002", customer: "Bob The Builder", email: "bob@example.com", date: "2024-07-27", total: 75.50, status: "Processing", items: [{name: "Building Blocks", qty: 2}], shippingAddress: "456 Construction Rd" },
  { id: "ORD003", customer: "Charlie Brown", email: "charlie@example.com", date: "2024-07-26", total: 220.00, status: "Pending", items: [{name: "Kite", qty: 1}, {name: "Snoopy Plush", qty: 1}], shippingAddress: "789 Comic Strip Ave" },
  { id: "ORD004", customer: "Diana Prince", email: "diana@example.com", date: "2024-07-25", total: 99.99, status: "Delivered", items: [{name: "Lasso of Truth Replica", qty: 1}], shippingAddress: "Themyscira Island" },
];

const OrdersManagementPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof sampleOrders[0] | null>(null);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);

  console.log('OrdersManagementPage loaded');

  const filteredOrders = sampleOrders.filter(order =>
    (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === "all" || order.status.toLowerCase() === statusFilter)
  );

  const handleViewOrder = (order: typeof sampleOrders[0]) => {
    setSelectedOrder(order);
    setIsViewOrderDialogOpen(true);
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shipped': return 'default'; // Or a custom blue-like color if defined
      case 'processing': return 'secondary'; // Yellow-ish
      case 'pending': return 'outline'; // Grey-ish
      case 'delivered': return 'default'; // Green (using default as success)
      case 'cancelled': return 'destructive'; // Red
      default: return 'outline';
    }
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
            <h1 className="text-2xl font-semibold">Orders Management</h1>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Order
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search orders by ID or customer..."
                    className="pl-8 w-full md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.status) as any}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                              <FileText className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredOrders.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">No orders found.</div>
              )}
            </CardContent>
            <CardFooter>
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>

          {selectedOrder && (
            <Dialog open={isViewOrderDialogOpen} onOpenChange={setIsViewOrderDialogOpen}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                  <DialogDescription>
                    Customer: {selectedOrder.customer} ({selectedOrder.email})
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p><strong>Date:</strong> {selectedOrder.date}</p>
                  <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                  <p><strong>Status:</strong> <Badge variant={getStatusBadgeVariant(selectedOrder.status) as any}>{selectedOrder.status}</Badge></p>
                  <div>
                    <strong>Items:</strong>
                    <ul className="list-disc pl-5">
                      {selectedOrder.items.map(item => <li key={item.name}>{item.name} (Qty: {item.qty})</li>)}
                    </ul>
                  </div>
                  <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsViewOrderDialogOpen(false)}>Close</Button>
                  <Button type="button">Update Status</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

        </main>
      </div>
    </div>
  );
};

export default OrdersManagementPage;