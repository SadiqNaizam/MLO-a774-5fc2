import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Search, PlusCircle, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


// Placeholder product data
const sampleProducts = [
  { id: "PROD001", name: "Interactive Robot Dog", sku: "RD-001", stock: 75, price: 129.99, status: "Active", imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop", category: "Electronics" },
  { id: "PROD002", name: "Wooden Dollhouse Set", sku: "DH-005", stock: 30, price: 89.50, status: "Active", imageUrl: "https://images.unsplash.com/photo-1596461404969-9a755f057955?q=80&w=200&auto=format&fit=crop", category: "Toys" },
  { id: "PROD003", name: "Educational Tablet for Kids", sku: "ET-K02", stock: 15, price: 199.00, status: "Low Stock", imageUrl: "https://images.unsplash.com/photo-1565326411128-00b5994a1500?q=80&w=200&auto=format&fit=crop", category: "Electronics" },
  { id: "PROD004", name: "Plush Teddy Bear Large", sku: "TB-L01", stock: 120, price: 45.00, status: "Active", imageUrl: "https://images.unsplash.com/photo-1546015003-951e3eb6810f?q=80&w=200&auto=format&fit=crop", category: "Toys" },
  { id: "PROD005", name: "Building Bricks Classic Set", sku: "BB-C20", stock: 0, price: 59.99, status: "Out of Stock", imageUrl: "https://images.unsplash.com/photo-1585366080648-6a8fd3e3103b?q=80&w=200&auto=format&fit=crop", category: "Toys" },
];

const ProductsSummaryPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  console.log('ProductsSummaryPage loaded');

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStockProgressColor = (stock: number) => {
    if (stock === 0) return "bg-red-500"; // Out of stock
    if (stock < 20) return "bg-yellow-500"; // Low stock
    return "bg-green-500"; // In stock
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default'; // Greenish
      case 'low stock': return 'secondary'; // Yellowish
      case 'out of stock': return 'destructive'; // Red
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
            <h1 className="text-2xl font-semibold">Products Summary</h1>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products by name or SKU..."
                    className="pl-8 w-full md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Add filters for category or status if needed */}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="w-[150px]">Stock</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={product.imageUrl} alt={product.name} />
                          <AvatarFallback>{product.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <Progress value={product.stock} className="h-2 w-[80px]" indicatorClassName={getStockProgressColor(product.stock)} />
                           <span>{product.stock} units</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(product.status) as any}>{product.status}</Badge>
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
                            <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Product</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete Product</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredProducts.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">No products found.</div>
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

export default ProductsSummaryPage;