import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  Copy,
  MoreVertical,
  MapPin,
  Package,
  Truck,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpDown,
  Calendar,
  RefreshCw,
  Navigation,
  Ticket,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");

  // Sample orders data
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
      status: "Order Placed",
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
      type: "readytoship",
    },
    {
      id: "ORD-1236",
      orderId: "1346",
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
      type: "readytoship",
    },
    {
      id: "ORD-6532",
      orderId: "5432",
      customer: "kane Smith",
      phone: "+91 98765 43211",
      destination: "Mumbai, MI - 110001",
      status: "Deliverd",
      codAmount: "₹890",
      weight: "0.8 kg",
      courier: "BlueDart",
      channel: "Amazon",
      // date: "2025-01-15",
      deliveryDate: "2025-01-18",
      awb: "BLU987654321",
      trackingDetails: [
        { status: "Order Placed", date: "2025-01-15", time: "11:00 AM" },
        { status: "Picked Up", date: "2025-01-15", time: "4:30 PM" },
        { status: "In Transit", date: "2025-01-16", time: "10:00 AM" },
      ],
      type: "Delivered",
    },
    {
      id: "ORD-6432",
      orderId: "5431",
      customer: "kane Smith",
      phone: "+91 98765 43211",
      destination: "Mumbai, MI - 110001",
      status: "Deliverd",
      codAmount: "₹890",
      weight: "0.8 kg",
      courier: "BlueDart",
      channel: "Amazon",
      // date: "2025-01-15",
      deliveryDate: "2025-01-18",
      awb: "BLU987654321",
      trackingDetails: [
        { status: "Order Placed", date: "2025-01-15", time: "11:00 AM" },
        { status: "Picked Up", date: "2025-01-15", time: "4:30 PM" },
        { status: "In Transit", date: "2025-01-16", time: "10:00 AM" },
      ],
      type: "Delivered",
    },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string }> = {
      Delivered: { className: "bg-green-100 text-green-800 border-green-200" },
      "In Transit": { className: "bg-blue-100 text-blue-800 border-blue-200" },
      Processing: {
        className: "bg-orange-100 text-orange-800 border-orange-200",
      },
      Pending: { className: "bg-orange-100 text-orange-800 border-orange-200" },
      RTO: { className: "bg-orange-200 text-orange-900 border-orange-300" },
      Cancelled: { className: "bg-gray-100 text-gray-800 border-gray-200" },
    };
    const badgeConfig = config[status] || {
      className: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <Badge variant="outline" className={badgeConfig.className}>
        {status}
      </Badge>
    );
  };

  const handleBulkAction = (action: string) => {
    toast.success(`Bulk ${action} action initiated`);
  };

  const handleCloneOrder = (orderId: string) => {
    toast.success(
      `Order ${orderId} cloned successfully. Redirecting to create order...`
    );
    // In real app, would navigate to create order page with cloned data
    setTimeout(() => {
      window.location.href = "/dashboard/orders/new";
    }, 1000);
  };

  const handleRaiseTicket = (orderId: string) => {
    const ticketId = `TKT-${Date.now()}`;
    toast.success(`Ticket raised for order ${orderId}. Ticket ID: ${ticketId}`);
  };

  const handleViewTracking = (orderId: string, awb: string) => {
    if (awb !== "-") {
      const trackingUrl = `/dashboard/tracking?awb=${awb}`;
      window.location.href = trackingUrl;
    } else {
      toast.info(
        "AWB number not available yet. Tracking will be available once order is picked up."
      );
    }
  };

  const handleCancelOrder = (orderId: string) => {
    toast.success(`Order ${orderId} cancellation requested`);
  };

  const handleGenerateLabel = (orderId: string) => {
    toast.success(`Label generated for order ${orderId}`);
  };

  const pickupManifest = () => {
    toast.success("Pickup & Manifest is generated for selected orders");
  };

  const handleReadyToShip = (orderId: string) => {
    toast.success(`Order id ${orderId} Ready to Ship`);
  };

  const handleGenerateManifest = () => {
    toast.success("Manifest generated successfully");
  };

  const handleDownloadTemplate = () => {
    // Create CSV template
    const csvContent =
      "Order ID,Customer Name,Phone,Address,City,State,Pincode,Product,Weight,Amount,Payment Mode,COD Amount\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk_order_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Template downloaded successfully");
  };

  const handleBulkUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error("File size must be less than 10MB");
          return;
        }
        toast.success(
          `File ${file.name} uploaded successfully. Processing orders...`
        );
        setTimeout(() => {
          toast.success("Orders processed successfully!");
        }, 2000);
      }
    };
    input.click();
  };

  const handleProcessReturn = (orderId: string) => {
    toast.success(`Return order ${orderId} processing initiated`);
  };

  const handleExportCSV = () => {
    const csvContent = filteredOrders
      .map(
        (order) =>
          `${order.id},${order.customer},${order.phone},${order.destination},${order.status},${order.codAmount},${order.date}`
      )
      .join("\n");
    const header =
      "Order ID,Customer,Phone,Destination,Status,COD Amount,Date\n";
    const blob = new Blob([header + csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    a.download = `orders_export_${dateStr}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Orders exported successfully");
  };

  const handleExportDeliveries = () => {
    const csvContent = filteredOrders
      .map(
        (order) =>
          `${order.id},${order.customer},${order.codAmount},${order.destination},${order.status},${order.codAmount},${order.deliveryDate}`
      )
      .join("\n");
    const header =
      "Order ID,Customer,Phone,Destination,Status,COD Amount,Date\n";
    const blob = new Blob([header + csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    a.download = `orders_export_${dateStr}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Orders exported successfully");
  };

  const handleViewOrderDetails = (orderId: string) => {
    // Navigate to order details page
    window.location.href = `/dashboard/orders/${orderId}`;
  };

  // Remove orders from pending when courier performs (status changes from Pending)
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.awb.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesChannel =
      channelFilter === "all" || order.channel === channelFilter;

    // If filtering by "Pending", exclude orders that have been picked up by courier
    // (i.e., status has changed from Pending to Processing/In Transit)
    const isPending = statusFilter === "Pending";
    const wasPickedUp = order.status !== "Pending" && order.awb !== "-";

    return (
      matchesSearch &&
      matchesStatus &&
      matchesChannel &&
      !(isPending && wasPickedUp)
    );
  });

  // Calculate status distribution for bar chart
  const statusData = [
    {
      status: "Pending",
      count: orders.filter((o) => o.status === "Pending" && o.awb === "-")
        .length,
    },
    {
      status: "Processing",
      count: orders.filter((o) => o.status === "Processing").length,
    },
    {
      status: "In Transit",
      count: orders.filter((o) => o.status === "In Transit").length,
    },
    {
      status: "Delivered",
      count: orders.filter((o) => o.status === "Delivered").length,
    },
    { status: "RTO", count: orders.filter((o) => o.status === "RTO").length },
    {
      status: "Cancelled",
      count: orders.filter((o) => o.status === "Cancelled").length,
    },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Tracking Button - Right Corner */}
      <Link
        to="/dashboard/tracking"
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Track Orders"
      >
        <Navigation className="w-6 h-6" />
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600 text-lg">
            Manage all your shipping orders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-gray-200">
              <DialogHeader>
                <DialogTitle className="text-gray-900">
                  Bulk Order Upload
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Upload a CSV file with your orders. Download the template for
                  reference.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV Template
                </Button>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop CSV file here
                  </p>
                  <p className="text-xs text-gray-500">or</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-gray-300 hover:bg-gray-50"
                    onClick={handleBulkUpload}
                  >
                    Browse Files
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold mb-2">Supported formats:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>CSV (Comma-separated values)</li>
                    <li>Excel (.xlsx, .xls)</li>
                    <li>Maximum file size: 10MB</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            asChild
            className="bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg with w-fulltext-white "
          >
            <Link to="/dashboard/orders/new">
              <Plus className="w-4 h-4 mr-2" />
              Create Order
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Total Orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {orders.length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Pending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[orange-600]">
              {
                orders.filter((o) => o.status === "Pending" && o.awb === "-")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              In Transit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "In Transit").length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Delivered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "Delivered").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Total Orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {orders.length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Pending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[orange-600]">
              {
                orders.filter((o) => o.status === "Pending" && o.awb === "-")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              In Transit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "In Transit").length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardDescription className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Delivered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "Delivered").length}
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Filters and Search */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-900">
            Order Management
          </CardTitle>
          <CardDescription className="mt-1 text-gray-600">
            Search, filter, and manage your orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by Order ID, Customer, Phone, or AWB..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300 focus:border-blue-500 text-gray-900"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-background border-gray-300">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="RTO">RTO</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent className="bg-background border-gray-300">
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="Shopify">Shopify</SelectItem>
                  <SelectItem value="Amazon">Amazon</SelectItem>
                  <SelectItem value="WooCommerce">WooCommerce</SelectItem>
                  <SelectItem value="Flipkart">Flipkart</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent className="bg-background border-gray-300">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-blue-50"
                onClick={() => handleBulkAction("Label Generation")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Labels
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-blue-50"
                onClick={handleGenerateManifest}
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Manifest
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-blue-50"
                onClick={() => {
                  toast.info("Fetching AWB numbers for selected orders...");
                  setTimeout(() => {
                    toast.success("AWB numbers fetched successfully");
                  }, 2000);
                }}
              >
                <Package className="w-4 h-4 mr-2" />
                Fetch AWB
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-blue-50"
                onClick={handleExportCSV}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-blue-50"
                onClick={pickupManifest}
              >
                <FileText className="w-4 h-4 mr-2" />
                Pickup & Manifest
              </Button>
              {/* <Button
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-blue-50"
                onClick={handleReadyToShip}
              >
                <FileText className="w-4 h-4 mr-2" />
                Ready to Ship
              </Button> */}
            </div>

            {/* Orders Table */}
            <Tabs defaultValue="forward" className="w-full">
              <TabsList className="bg-blue-50 border-gray-300">
                <TabsTrigger
                  value="forward"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  Forward Orders
                </TabsTrigger>
                <TabsTrigger
                  value="reverse"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  Reverse Orders (Returns)
                </TabsTrigger>
                <TabsTrigger
                  value="readytoship"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  Ready to Ship
                </TabsTrigger>
                <TabsTrigger
                  value="Delivered"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  Orders Delivered
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forward" className="mt-4">
                <div className="rounded-md  overflow-x-auto bg-white border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50 border-b border-blue-200">
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </TableHead>
                        <TableHead className="text-gray-900">
                          Order ID
                        </TableHead>
                        <TableHead className="text-gray-900">
                          Customer
                        </TableHead>
                        <TableHead className="text-gray-900">
                          Destination
                        </TableHead>
                        <TableHead className="text-gray-900">Status</TableHead>
                        <TableHead className="text-gray-900">COD</TableHead>
                        <TableHead className="text-gray-900">Courier</TableHead>
                        <TableHead className="text-gray-900">Channel</TableHead>
                        <TableHead className="text-gray-900">
                          Order Date
                        </TableHead>
                        <TableHead className="text-gray-900">
                          Delivery Date
                        </TableHead>
                        <TableHead className="text-gray-900">AWB</TableHead>
                        <TableHead className="text-gray-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter((o) => o.type === "forward")
                        .map((order) => (
                          <TableRow
                            key={order.id}
                            className="hover:bg-blue-50 border-b border-gray-200"
                          >
                            <TableCell>
                              <input
                                type="checkbox"
                                className="rounded border-gray-300"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <Link
                                to={`/dashboard/orders/${order.id}`}
                                className="text-blue-600 hover:underline"
                              >
                                {order.id}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {order.customer}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {order.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-700">
                                <MapPin className="w-3 h-3 text-blue-600" />
                                {order.destination}
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            <TableCell className="font-semibold text-gray-900">
                              {order.codAmount}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-700"
                              >
                                {order.courier}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-blue-50 border-gray-300 text-gray-700"
                              >
                                {order.channel}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {order.date}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {order.deliveryDate !== "-" ? (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-blue-600" />
                                  {order.deliveryDate}
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {order.awb !== "-" ? (
                                <Link
                                  to={`/dashboard/tracking?awb=${order.awb}`}
                                  className="text-[blue-600] hover:underline text-sm"
                                >
                                  {order.awb}
                                </Link>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-blue-50"
                                  onClick={() =>
                                    handleViewTracking(order.id, order.awb)
                                  }
                                  title="View Tracking Details"
                                >
                                  <Eye className="w-4 h-4 text-gray-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-blue-50"
                                  onClick={() => handleCloneOrder(order.id)}
                                  title="Clone Order"
                                >
                                  <Copy className="w-4 h-4 text-gray-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-orange-50"
                                  onClick={() => handleRaiseTicket(order.id)}
                                  title="Raise Ticket"
                                >
                                  <Ticket className="w-4 h-4 text-orange-600" />
                                </Button>
                                {order.status === "Pending" && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-orange-50"
                                    onClick={() => handleCancelOrder(order.id)}
                                    title="Cancel Order"
                                  >
                                    <X className="w-4 h-4 text-orange-600" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="reverse" className="mt-4">
                <div className="rounded-md overflow-x-auto bg-white border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50 border-b border-blue-200">
                        <TableHead className="text-gray-900">
                          Return ID
                        </TableHead>
                        <TableHead className="text-gray-900">
                          Original Order
                        </TableHead>
                        <TableHead className="text-gray-900">
                          Customer
                        </TableHead>
                        <TableHead className="text-gray-900">Status</TableHead>
                        <TableHead className="text-gray-900">
                          Return Reason
                        </TableHead>
                        <TableHead className="text-gray-900">Date</TableHead>
                        <TableHead className="text-gray-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter((o) => o.type === "reverse")
                        .map((order) => (
                          <TableRow
                            key={order.id}
                            className="hover:bg-blue-50 border-b border-gray-200"
                          >
                            <TableCell className="font-medium">
                              <Link
                                to={`/dashboard/orders/${order.id}`}
                                className="text-blue-600 hover:underline"
                              >
                                {order.id}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/dashboard/orders/ORD-${order.orderId}`}
                                className="text-[blue-600] hover:underline text-sm"
                              >
                                ORD-{order.orderId}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {order.customer}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {order.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              Customer Return
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {order.date}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:bg-blue-50"
                                onClick={() => handleProcessReturn(order.id)}
                              >
                                Process Return
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="readytoship" className="mt-4">
                <div className="rounded-md  overflow-x-auto bg-white border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50 border-b border-blue-200">
                        <TableHead className="text-gray-900">
                          Return ID
                        </TableHead>
                        <TableHead className="text-gray-900">
                          Original Order
                        </TableHead>
                        <TableHead className="text-gray-900">
                          Customer
                        </TableHead>
                        <TableHead className="text-gray-900">Status</TableHead>
                        {/* <TableHead className="text-gray-900">
                          Return Reason
                        </TableHead> */}
                        <TableHead className="text-gray-900">
                          Shipping Date
                        </TableHead>
                        <TableHead className="text-gray-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter((o) => o.type === "readytoship")
                        .map((order) => (
                          <TableRow
                            key={order.id}
                            className="hover:bg-blue-50 border-b border-gray-200"
                          >
                            <TableCell className="font-medium">
                              <Link
                                to={`/dashboard/orders/${order.id}`}
                                className="text-blue-600 hover:underline"
                              >
                                {order.id}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/dashboard/orders/ORD-${order.orderId}`}
                                className="text-[blue-600] hover:underline text-sm"
                              >
                                ORD-{order.orderId}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {order.customer}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {order.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            {/* <TableCell className="text-sm text-gray-600">
                              Customer Return
                            </TableCell> */}
                            <TableCell className="text-sm text-gray-600">
                              {order.date}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:bg-blue-50"
                                onClick={() => handleReadyToShip(order.id)}
                              >
                                Ready to ship
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="Delivered" className="mt-4">
                <div className="rounded-md  boverflow-x-auto bg-white border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50 border-b border-blue-200">
                        <TableHead className="text-gray-900">
                          Order ID
                        </TableHead>
                        {/* <TableHead className="text-gray-900">
                          Original Order
                        </TableHead> */}
                        <TableHead className="text-gray-900">
                          Customer
                        </TableHead>
                        <TableHead className="text-gray-900">Status</TableHead>
                        <TableHead className="text-gray-900">Amount</TableHead>
                        <TableHead className="text-gray-900">
                          Delivered Date
                        </TableHead>

                        <TableHead className="text-gray-900">Actions</TableHead>
                        <TableHead className="text-gray-900">
                          Download Data
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter((o) => o.type === "Delivered")
                        .map((order) => (
                          <TableRow
                            key={order.id}
                            className="hover:bg-blue-50 border-b border-gray-200"
                          >
                            <TableCell className="font-medium">
                              <Link
                                to={`/dashboard/orders/${order.id}`}
                                className="text-blue-600 hover:underline"
                              >
                                {order.id}
                              </Link>
                            </TableCell>
                            {/* <TableCell>
                              <Link
                                to={`/dashboard/orders/ORD-${order.orderId}`}
                                className="text-[blue-600] hover:underline text-sm"
                              >
                                ORD-{order.orderId}
                              </Link>
                            </TableCell> */}
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {order.customer}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {order.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {order.codAmount}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {order.deliveryDate}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:bg-blue-50"
                                onClick={() => handleProcessReturn(order.id)}
                              >
                                Delivered
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:bg-blue-50"
                                onClick={handleExportDeliveries}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Export Data
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Bar Chart */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-900">
            Order Status Distribution
          </CardTitle>
          <CardDescription className="text-gray-600">
            Visual representation of order statuses
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="status"
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
              />
              <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="count"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
                name="Number of Orders"
                cursor="pointer"
                onClick={(data) => {
                  setStatusFilter(data.status);
                  toast.info(`Filtered by status: ${data.status}`);
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
