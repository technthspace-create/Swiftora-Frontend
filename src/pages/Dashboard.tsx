import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface CardType {
  title: string;
  value: string;
  info: string;
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
// import IndiaShipmentMap from "@/components/IndiaShipmentMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Truck,
  Activity,
  Users,
  Settings,
  Bell,
  Calendar,
  FileText,
  ShoppingCart,
  Wallet,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import IndiaCoverageMap from "@/components/IndiaCoverageMap";

type DashboardOutletContext = { activeDashboard: "b2c" | "b2b" };

const Dashboard = () => {
  const { activeDashboard } = useOutletContext<DashboardOutletContext>();
  const isB2B = activeDashboard === "b2b";
  const [dateRange, setDateRange] = useState("7d");

  const handleSearchOrders = () => {
    toast.info("Search orders - Navigate to Orders page");
  };

  const handleFilterOrders = () => {
    toast.info("Filter orders - Navigate to Orders page");
  };

  const handleSyncOrders = () => {
    toast.info("Syncing orders from vendors...");
    // Simulate sync process
    setTimeout(() => {
      toast.success("Orders synced successfully from all vendors!");
    }, 2000);
  };

  // Wallet Balance
  const walletBalance = {
    available: "₹1,25,680.50",
    pending: "₹12,450.00",
    total: "₹1,38,130.50",
  };

  // const DashboardCarousel: React.FC = () => {
  // const cards: CardType[] = [
  //   { title: "Total Orders", value: "12,345", info: "+12.5% from last month" },
  //   { title: "RTO", value: "1.2%", info: "-0.1% from last month" },
  //   { title: "In Transit", value: "200", info: "+12 from last week" },
  //   { title: "Pending", value: "25", info: "+2 from last week" },
  //   { title: "Bad Orders", value: "25", info: "+13 from last week" },
  // ];

  // Monthly Shipment Volume Data
  const monthlyShipmentData = [
    { month: "Jan", shipments: 4000 },
    { month: "Feb", shipments: 3000 },
    { month: "Mar", shipments: 5000 },
    { month: "Apr", shipments: 4500 },
    { month: "May", shipments: 6000 },
    { month: "Jun", shipments: 5500 },
    { month: "Jul", shipments: 7000 },
    { month: "Aug", shipments: 6500 },
    { month: "Sep", shipments: 7500 },
    { month: "Oct", shipments: 8000 },
    { month: "Nov", shipments: 9000 },
    { month: "Dec", shipments: 8500 },
  ];

  // India coverage data (example only, can be wired to real API later)
  const indiaCoverageData = [
    {
      stateCode: "MH",
      name: "Maharashtra",
      shipments: 2400,
      couriers: ["Delhivery", "BlueDart"],
    },
    {
      stateCode: "DL",
      name: "Delhi",
      shipments: 1900,
      couriers: ["Delhivery", "Ecom Express"],
    },
    {
      stateCode: "KA",
      name: "Karnataka",
      shipments: 1500,
      couriers: ["BlueDart"],
    },
    {
      stateCode: "TS",
      name: "Telangana",
      shipments: 1200,
      couriers: ["Delhivery"],
    },
    {
      stateCode: "TN",
      name: "Tamil Nadu",
      shipments: 900,
      couriers: ["DTDC"],
    },
    {
      stateCode: "GJ",
      name: "Gujarat",
      shipments: 800,
      couriers: ["Delhivery", "Shadowfax"],
    },
    {
      stateCode: "WB",
      name: "West Bengal",
      shipments: 700,
      couriers: ["Ecom Express"],
    },
  ];

  const statesCovered = indiaCoverageData.filter((d) => d.shipments > 0).length;
  const topState =
    indiaCoverageData.length > 0
      ? indiaCoverageData.reduce((max, d) =>
          d.shipments > max.shipments ? d : max
        )
      : null;
  const activeCouriersCount = Array.from(
    new Set(
      indiaCoverageData.flatMap((d: any) => (d.couriers ? d.couriers : []))
    )
  ).length;

  // Scheduled Pickups
  const scheduledPickups = [
    {
      id: "PU-001",
      address: "Main Warehouse",
      date: "2025-01-18",
      time: "10:00 AM - 2:00 PM",
      courier: "Delhivery",
      status: "Scheduled",
      orders: 45,
    },
    {
      id: "PU-002",
      address: "Secondary Warehouse",
      date: "2025-01-19",
      time: "11:00 AM - 3:00 PM",
      courier: "BlueDart",
      status: "Scheduled",
      orders: 32,
    },
    {
      id: "PU-003",
      address: "Main Warehouse",
      date: "2025-01-20",
      time: "10:00 AM - 2:00 PM",
      courier: "Delhivery",
      status: "Scheduled",
      orders: 28,
    },
  ];

  // Recent Transactions Data
  const recentTransactions = [
    {
      id: "TXN-12345",
      user: "John Doe",
      service: "API Processing",
      status: "Completed",
      amount: "$1,250",
      date: "2025-01-15",
      provider: "Cloud Service A",
    },
    {
      id: "TXN-12346",
      user: "Jane Smith",
      service: "Data Analytics",
      status: "In Progress",
      amount: "$890",
      date: "2025-01-15",
      provider: "Cloud Service B",
    },
    {
      id: "TXN-12347",
      user: "Mike Johnson",
      service: "ML Processing",
      status: "Processing",
      amount: "$2,100",
      date: "2025-01-14",
      provider: "Cloud Service C",
    },
    {
      id: "TXN-12348",
      user: "Sarah Williams",
      service: "Storage Sync",
      status: "Completed",
      amount: "$750",
      date: "2025-01-14",
      provider: "Cloud Service A",
    },
    {
      id: "TXN-12349",
      user: "David Brown",
      service: "Compute Task",
      status: "Pending",
      amount: "$1,500",
      date: "2025-01-13",
      provider: "Cloud Service B",
    },
  ];

  // const DashboardCarousel = () => {
  // const cards = [
  //   { title: "Total Orders", value: "12,345", info: "+12.5% from last month" },
  //   { title: "RTO", value: "1.2%", info: "-0.1% from last month" },
  //   { title: "In Transit", value: "200", info: "+12 from last week" },
  //   { title: "Pending", value: "25", info: "+2 from last week" },
  //   { title: "Bad Orders", value: "25", info: "+13 from last week" },
  // ];

  const whatsNew = [
    {
      id: "NWS-001",
      title: "Bulk Order Upload: CSV support",
      date: "2025-11-28",
      summary:
        "You can now upload orders in bulk using CSV files to speed up onboarding.",
    },
    {
      id: "NWS-002",
      title: "New Courier Integration: QuickShip",
      date: "2025-11-26",
      summary:
        "QuickShip courier integration added for faster pick up scheduling.",
    },
    {
      id: "NWS-003",
      title: "Dashboard Performance Improvements",
      date: "2025-11-20",
      summary:
        "Charts and maps now load faster thanks to lazy-loading optimizations.",
    },
    {
      id: "NWS-004",
      title: "New: Rate Card Export",
      date: "2025-11-18",
      summary: "Export your rate cards to CSV for offline analysis.",
    },
    {
      id: "NWS-005",
      title: "Pincode Serviceability Enhancements",
      date: "2025-11-15",
      summary: "Improved matching for rural pincodes and faster lookups.",
    },
    {
      id: "NWS-006",
      title: "New: Auto-RTO Detection",
      date: "2025-11-12",
      summary:
        "System now suggests likely RTO cases based on historical trends.",
    },
    {
      id: "NWS-007",
      title: "Support Chat: In-App Messaging",
      date: "2025-11-08",
      summary: "Reach support directly from the dashboard for faster help.",
    },
    {
      id: "NWS-008",
      title: "Security Update: 2FA",
      date: "2025-11-05",
      summary:
        "Optional Two-Factor Authentication is now available for accounts.",
    },
    {
      id: "NWS-009",
      title: "Analytics Export Improvements",
      date: "2025-11-02",
      summary:
        "Exports now include breakdowns by courier and destination state.",
    },
    {
      id: "NWS-010",
      title: "UI Tweaks: Compact List Mode",
      date: "2025-10-30",
      summary: "Enable compact list mode for a denser overview of orders.",
    },
  ];

  const orders = [
    {
      id: "ORD-12345",
      orderId: "12345",
      customer: "John Doe",
      phone: "+91 98765 43210",
      destination: "Mumbai, MH - 400001",
      status: "Delivered",
      codAmount: "₹0",
      weight: "0.5 kg",
      courier: "Delhivery",
      channel: "Shopify",
      date: "2025-01-15",
      deliveryDate: "2025-01-17",
      awb: "DEL123456789",
      trackingDetails: [
        { status: "Order Placed", date: "2025-01-15", time: "10:30 AM" },
        { status: "Picked Up", date: "2025-01-15", time: "2:45 PM" },
        { status: "In Transit", date: "2025-01-16", time: "9:15 AM" },
        { status: "Out for Delivery", date: "2025-01-17", time: "8:00 AM" },
        { status: "Delivered", date: "2025-01-17", time: "3:20 PM" },
      ],
      type: "forward",
    },
    {
      id: "ORD-12346",
      orderId: "12346",
      customer: "Jane Smith",
      phone: "+91 98765 43211",
      destination: "Delhi, DL - 110001",
      status: "In Transit",
      codAmount: "₹890",
      weight: "0.8 kg",
      courier: "BlueDart",
      channel: "Amazon",
      date: "2025-01-15",
      deliveryDate: "2025-01-18",
      awb: "BLU987654321",
      trackingDetails: [
        { status: "Order Placed", date: "2025-01-15", time: "11:00 AM" },
        { status: "Picked Up", date: "2025-01-15", time: "4:30 PM" },
        { status: "In Transit", date: "2025-01-16", time: "10:00 AM" },
      ],
      type: "forward",
    },
    {
      id: "ORD-12347",
      orderId: "12347",
      customer: "Mike Johnson",
      phone: "+91 98765 43212",
      destination: "Bangalore, KA - 560001",
      status: "Processing",
      codAmount: "₹0",
      weight: "1.2 kg",
      courier: "Delhivery",
      channel: "WooCommerce",
      date: "2025-01-14",
      deliveryDate: "-",
      awb: "-",
      trackingDetails: [],
      type: "forward",
    },
    {
      id: "RTO-12348",
      orderId: "12348",
      customer: "Sarah Williams",
      phone: "+91 98765 43213",
      destination: "Pune, MH - 411001",
      status: "RTO",
      codAmount: "₹750",
      weight: "0.3 kg",
      courier: "Delhivery",
      channel: "Flipkart",
      date: "2025-01-14",
      deliveryDate: "-",
      awb: "DEL987654321",
      trackingDetails: [
        { status: "Order Placed", date: "2025-01-14", time: "9:00 AM" },
        { status: "Picked Up", date: "2025-01-14", time: "3:00 PM" },
        { status: "RTO Initiated", date: "2025-01-16", time: "11:00 AM" },
      ],
      type: "reverse",
    },
    {
      id: "ORD-12349",
      orderId: "12349",
      customer: "David Brown",
      phone: "+91 98765 43214",
      destination: "Chennai, TN - 600001",
      status: "Pending",
      codAmount: "₹0",
      weight: "0.9 kg",
      courier: "BlueDart",
      channel: "Manual",
      date: "2025-01-13",
      deliveryDate: "-",
      awb: "-",
      trackingDetails: [],
      type: "forward",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string }> = {
      Completed: { className: "bg-green-100 text-green-800 border-green-200" },
      "In Progress": { className: "bg-blue-100 text-blue-800 border-blue-200" },
      Processing: {
        className: "bg-orange-100 text-orange-800 border-orange-200",
      },
      Pending: { className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    };
    const config = statusConfig[status] || {
      className: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <Badge variant="outline" className={config.className}>
        {status}
      </Badge>
    );
  };

  return (
    <div
      className={`space-y-8 p-4 sm:p-6 lg:p-8 rounded-xl ${
        isB2B
          ? "bg-slate-100"
          : "bg-gradient-to-br from-gray-50 to-blue-50 bg-slate-100"
      }`}
    >
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            {isB2B ? "B2B Dashboard" : "B2C Dashboard"}
          </h1>
          <p className="text-gray-600 text-lg">
            {isB2B
              ? "Manage bulk consignments, GST workflows and enterprise tools."
              : "Quick view of your retail shipments and wallet activity."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!isB2B && (
            <Button
              onClick={handleSyncOrders}
              className="bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Orders
            </Button>
          )}
          <Button
            asChild
            className="bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg"
          >
            <Link to="/dashboard/orders/new">
              <Plus className="w-4 h-4 mr-2" />
              {isB2B ? "New B2B Consignment" : "New Order"}
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {/* Top Stats Cards */}
      {isB2B ? (
        <>
          {/* B2B top stats: financial/compliance focus */}
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-slate-900 text-slate-50 border border-slate-700 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      B2B Consignments
                    </CardTitle>
                    <Package className="w-4 h-4 text-slate-300" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">320</div>
                    <p className="text-xs text-emerald-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +8.2% vs last month
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-slate-900 text-slate-50 border border-slate-700 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending GST Invoices
                    </CardTitle>
                    <FileText className="w-4 h-4 text-slate-300" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">14</div>
                    <p className="text-xs text-amber-300 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Action required this week
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-slate-900 text-slate-50 border border-slate-700 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Credit Utilisation
                    </CardTitle>
                    <Wallet className="w-4 h-4 text-slate-300" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-xs text-slate-300">
                      of monthly credit limit
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-slate-900 text-slate-50 border border-slate-700 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      SLA Breaches
                    </CardTitle>
                    <XCircle className="w-4 h-4 text-slate-300" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-rose-300">
                      Investigate impacted accounts
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* B2B analytics: no playful gradients, more structured */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 bg-white border border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Invoice Status Overview
                </CardTitle>
                <CardDescription className="text-xs text-slate-600">
                  Breakdown of GST invoice lifecycle
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Generated</span>
                  <span className="font-semibold">128</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Submitted</span>
                  <span className="font-semibold">114</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pending filing</span>
                  <span className="font-semibold text-amber-600">14</span>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Monthly B2B Shipment Volume
                </CardTitle>
                <CardDescription className="text-xs text-slate-600">
                  Consignments processed over the past year
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyShipmentData}>
                    <CartesianGrid stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="month" stroke="#6B7280" fontSize={11} />
                    <YAxis stroke="#6B7280" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        borderColor: "#1E293B",
                        color: "white",
                      }}
                      labelStyle={{ color: "white", fontWeight: "bold" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="shipments"
                      stroke="#0F172A"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "#0F172A" }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Total Orders
                    </CardTitle>
                    <Package className="w-4 h-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      12,345
                    </div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5% from last month
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      RTO
                    </CardTitle>
                    <TrendingDown className="w-4 h-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">10</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      -0.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      In Transit
                    </CardTitle>
                    <Truck className="w-3 h-3 mr-1 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">200</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      12 from last week
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Pending
                    </CardTitle>
                    <XCircle className="w-4 h-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">25</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingDown className="w-3 h-3 mr-1" />2 from last week
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Incomplete Address
                    </CardTitle>
                    <XCircle className="w-4 h-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">25</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      13 from last week
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-xl text-card-foreground duration-300 lg:col-span-1 bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center p-6">
              <h3 className="tracking-tight text-lg font-bold text-gray-900 mb-4">
                Overall Success
              </h3>
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#067adf] to-purple-500 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    98.2%
                  </span>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4">
                Your delivery success rate is outstanding.
              </p>
            </div>

            {/* Line Chart */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-[#067adf] to-purple-200 border border-white/10 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">
                  Monthly Shipment Volume
                </CardTitle>
                <CardDescription className="mt-1 text-gray-200">
                  Number of shipments over the past year
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyShipmentData}>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        borderColor: "#067adf",
                        color: "white",
                      }}
                      itemStyle={{ color: "white" }}
                      labelStyle={{ color: "white", fontWeight: "bold" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="shipments"
                      stroke="white"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "white" }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Scheduled Pickups */}
      <div className="mb-8">
        {/* Scheduled Pickups Card */}
        <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Scheduled Pickups
                </CardTitle>
                <CardDescription className="mt-1 text-gray-600">
                  Upcoming pickup schedules
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/dashboard/pickup"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {scheduledPickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        {pickup.id}
                      </span>
                    </div>
                    <Badge
                      className={
                        pickup.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {pickup.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {pickup.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {pickup.date} • {pickup.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-3 h-3" />
                      {pickup.orders} orders • {pickup.courier}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* India Coverage Map */}
      <Card className="lg:col-span-3 bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-gray-900">
            India Shipping Coverage
          </CardTitle>
          <CardDescription className="mt-1 text-gray-600">
            Where your shipments are moving across India
          </CardDescription>
        </CardHeader>
        <CardContent className="h-88">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Left: metrics + legend */}
            <div className="lg:w-2/5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      States Covered
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      {statesCovered}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Top State by Volume
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {topState ? topState.name : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Active Courier Partners
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      {activeCouriersCount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>Lower volume</span>
                <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-[hsl(210,80%,92%)] to-[hsl(210,100%,45%)]" />
                <span>Higher volume</span>
              </div>
            </div>

            {/* Right: enlarged map */}
            <div className="lg:w-3/5 flex items-center justify-center">
              <div className="w-full max-w-2xl h-72">
                <IndiaCoverageMap data={indiaCoverageData} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Pickups */}
      {/* <div className="mb-8">
         Scheduled Pickups Card 
        <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Scheduled Pickups
                </CardTitle>
                <CardDescription className="mt-1 text-gray-600">
                  Upcoming pickup schedules
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/dashboard/pickup"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {scheduledPickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        {pickup.id}
                      </span>
                    </div>
                    <Badge
                      className={
                        pickup.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {pickup.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {pickup.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {pickup.date} • {pickup.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-3 h-3" />
                      {pickup.orders} orders • {pickup.courier}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  Recent Orders
                </CardTitle>
                <CardDescription className="mt-1 text-gray-600">
                  Latest 5 transactions from your account
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={handleSearchOrders}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={handleFilterOrders}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-900">
                      Transaction ID
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      User
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Service
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Amount
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                    >
                      <TableCell className="font-semibold">
                        <Link
                          to={`/dashboard/orders/${transaction.id}`}
                          className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                        >
                          {transaction.id}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {transaction.user}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-sm text-gray-600">
                            {transaction.service}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(transaction.status)}
                      </TableCell>
                      <TableCell className="font-bold text-gray-900">
                        {transaction.amount}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {transaction.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50"
                asChild
              >
                <Link to="/dashboard/orders">View All Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  What's New
                </CardTitle>
                <CardDescription className="mt-1 text-gray-600">
                  Latest product updates and announcements
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {whatsNew.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.summary}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-900">
            {activeDashboard === "b2b" ? "B2B Quick Actions" : "Quick Actions"}
          </CardTitle>
          <CardDescription className="mt-1 text-gray-600">
            {activeDashboard === "b2b"
              ? "Key tools for managing business shipments."
              : "Common tasks and shortcuts for retail shipping."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {activeDashboard === "b2b" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-28 flex-col bg-white border-gray-200 hover:border-slate-600 hover:bg-slate-50 transition-all group"
                asChild
              >
                <Link to="/dashboard/orders/new">
                  <Plus className="w-7 h-7 mb-2 text-slate-800 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-900">
                    Create B2B Consignment
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-28 flex-col bg-white border-gray-200 hover:border-slate-600 hover:bg-slate-50 transition-all group"
                asChild
              >
                <Link to="/dashboard/billing">
                  <FileText className="w-7 h-7 mb-2 text-slate-800 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-900">
                    GST & Invoices
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-28 flex-col bg-white border-gray-200 hover:border-slate-600 hover:bg-slate-50 transition-all group"
                asChild
              >
                <Link to="/dashboard/services">
                  <Truck className="w-7 h-7 mb-2 text-slate-800 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-900">
                    Bulk Shipment Tools
                  </span>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-28 flex-col bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                asChild
              >
                <Link to="/dashboard/orders/new">
                  <Plus className="w-7 h-7 mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-900">
                    Create Order
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-28 flex-col bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                asChild
              >
                <Link to="/dashboard/tracking">
                  <Truck className="w-7 h-7 mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-900">
                    Track Shipment
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-28 flex-col bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                asChild
              >
                <Link to="/dashboard/settings">
                  <Settings className="w-7 h-7 mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-gray-900">Settings</span>
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* <h1>India Shipment Status Dashboard</h1>
      <p>Hover over a state to see the delivery metrics.</p>
       Pass the state name from your image to highlight it 
      <IndiaShipmentMap highlightedState="Andhra Pradesh" /> */}
    </div>
  );
};

export default Dashboard;
