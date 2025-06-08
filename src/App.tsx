import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import OrdersManagementPage from "./pages/OrdersManagementPage";
import ProductsSummaryPage from "./pages/ProductsSummaryPage";
import CustomersAnalyticsPage from "./pages/CustomersAnalyticsPage";
import AnalyticsReportsPage from "./pages/AnalyticsReportsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardOverviewPage />} />
          <Route path="/orders" element={<OrdersManagementPage />} />
          <Route path="/products" element={<ProductsSummaryPage />} />
          <Route path="/customers" element={<CustomersAnalyticsPage />} />
          <Route path="/analytics" element={<AnalyticsReportsPage />} />
          {/* Add other routes here if any */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;