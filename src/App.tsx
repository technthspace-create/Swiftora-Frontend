import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Tracking from "./pages/Tracking";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import Orders from "./pages/dashboard/Orders";
import Analytics from "./pages/dashboard/Analytics";
import Billing from "./pages/dashboard/Billing";
import TrackingDashboard from "./pages/dashboard/Tracking";
import Pickup from "./pages/dashboard/Pickup";
import Support from "./pages/dashboard/Support";
import Settings from "./pages/dashboard/Settings";
import CreateOrder from "./pages/dashboard/CreateOrder";
import RateCalculator from "./pages/dashboard/RateCalculator";
import RateCard from "./pages/dashboard/RateCard";
import PincodeServiceability from "./pages/dashboard/PincodeServiceability";
import RestrictedItems from "./pages/dashboard/RestrictedItems";
import RTOPredictor from "./pages/dashboard/RTOPredictor";
import TermsAndConditions from "./pages/dashboard/TermsAndConditions";
import Remittance from "./pages/dashboard/Remittance";
import AnalyticsReports from "./pages/dashboard/AnalyticsReports";
import BusinessSuccessRate from "./pages/dashboard/BusinessSuccessRate";
import AllProducts from "./pages/dashboard/AllProducts";
import Services from "./pages/dashboard/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/new" element={<CreateOrder />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="analytics-reports" element={<AnalyticsReports />} />
            <Route path="billing" element={<Billing />} />
            <Route path="tracking" element={<TrackingDashboard />} />
            <Route path="pickup" element={<Pickup />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
            <Route path="services" element={<Services />} />
            <Route path="settings/users" element={<Settings />} />
            <Route path="settings/courier" element={<Settings />} />
            <Route path="settings/integrations" element={<Settings />} />
            <Route path="settings/notifications" element={<Settings />} />
            <Route path="settings/automation" element={<Settings />} />
            <Route path="settings/security" element={<Settings />} />
            <Route path="settings/tax" element={<Settings />} />
            <Route path="settings/bank" element={<Settings />} />
            <Route path="settings/invoices" element={<Settings />} />
            <Route path="rate-calculator" element={<RateCalculator />} />
            <Route path="rate-card" element={<RateCard />} />
            <Route
              path="pincode-serviceability"
              element={<PincodeServiceability />}
            />
            <Route path="restricted-items" element={<RestrictedItems />} />
            <Route path="rto-predictor" element={<RTOPredictor />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="remittance" element={<Remittance />} />
            <Route
              path="business-success-rate"
              element={<BusinessSuccessRate />}
            />
            <Route path="all-products" element={<AllProducts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
