import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Scale,
  Truck,
  Save,
  ArrowLeft,
  FileText,
  Download,
  Receipt,
  FileCheck,
  Upload,
  Calendar,
  Clock,
  Building2,
  X,
  Info,
  Box,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();
  // Load persisted mode from localStorage, default to "b2c"
  const [orderType, setOrderType] = useState<"b2c" | "b2b">(() => {
    const saved = localStorage.getItem("createOrderMode");
    return (saved === "b2c" || saved === "b2b" ? saved : "b2c") as "b2c" | "b2b";
  });

  // Persist mode selection
  useEffect(() => {
    localStorage.setItem("createOrderMode", orderType);
  }, [orderType]);

  const [orderData, setOrderData] = useState({
    // Customer Details
    customerName: "",
    customerPhone: "",
    customerEmail: "",

    // Pickup Address
    pickupName: "",
    pickupAddress: "",
    pickupCity: "",
    pickupState: "",
    pickupPincode: "",
    pickupPhone: "",
    pickupEmail: "",

    // Shipping Address
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPincode: "",

    // Order Details
    orderId: "",
    productName: "",
    quantity: "1",
    numberOfBoxes: "1",
    weight: "",
    boxLength: "",
    boxHeight: "",
    boxBreadth: "",
    totalWeight: "",
    declaredValue: "",
    paymentMode: "prepaid",
    codAmount: "",

    // B2B Specific Fields
    companyName: "",
    gstNumber: "",
    invoiceNumber: "",
    ewayBillNumber: "",
    slotDate: "",
    slotTime: "",
    podFile: null as File | null,
    invoiceFile: null as File | null,
    ewayBillFile: null as File | null,

    // B2C Specific Fields
    giftWrap: false,

    // Courier Selection
    courier: "auto",
    serviceType: "standard",

    // Additional
    notes: "",
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedDocuments, setGeneratedDocuments] = useState({
    manifest: false,
    gst: false,
    awb: false,
    label: false,
  });
  const [podFileName, setPodFileName] = useState<string>("");
  const [invoiceFileName, setInvoiceFileName] = useState<string>("");
  const [ewayBillFileName, setEwayBillFileName] = useState<string>("");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "pod" | "invoice" | "ewayBill"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG, and PDF files are allowed");
        return;
      }
      if (type === "pod") {
      setOrderData({ ...orderData, podFile: file });
      setPodFileName(file.name);
      } else if (type === "invoice") {
        setOrderData({ ...orderData, invoiceFile: file });
        setInvoiceFileName(file.name);
      } else if (type === "ewayBill") {
        setOrderData({ ...orderData, ewayBillFile: file });
        setEwayBillFileName(file.name);
      }
      toast.success("File uploaded successfully");
    }
  };

  const handleRemoveFile = (type: "pod" | "invoice" | "ewayBill") => {
    if (type === "pod") {
    setOrderData({ ...orderData, podFile: null });
    setPodFileName("");
    } else if (type === "invoice") {
      setOrderData({ ...orderData, invoiceFile: null });
      setInvoiceFileName("");
    } else if (type === "ewayBill") {
      setOrderData({ ...orderData, ewayBillFile: null });
      setEwayBillFileName("");
    }
    toast.info("File removed");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
    toast.success("Order created successfully!");
  };

  const handleConfirmOrder = () => {
    toast.success("Order confirmed!");
    navigate("/dashboard/orders");
  };

  const handleGenerateDocument = (
    type: "manifest" | "gst" | "awb" | "label"
  ) => {
    setGeneratedDocuments({ ...generatedDocuments, [type]: true });
    toast.success(`${type.toUpperCase()} generated successfully!`);
  };

  // Autosave pickup address to pickup management
  const autosavePickupAddress = () => {
    if (
      orderData.pickupAddress &&
      orderData.pickupCity &&
      orderData.pickupPincode
    ) {
      const savedAddresses = JSON.parse(
        localStorage.getItem("pickupAddresses") || "[]"
      );
      const newAddress = {
        id: Date.now(),
        name:
          orderData.pickupName || `Pickup ${new Date().toLocaleDateString()}`,
        address: orderData.pickupAddress,
        city: orderData.pickupCity,
        state: orderData.pickupState,
        pincode: orderData.pickupPincode,
        phone: orderData.pickupPhone,
        email: orderData.pickupEmail,
        isDefault: savedAddresses.length === 0,
        status: "Active",
      };

      const exists = savedAddresses.some(
        (addr: any) =>
          addr.address === newAddress.address &&
          addr.pincode === newAddress.pincode
      );

      if (!exists) {
        savedAddresses.push(newAddress);
        localStorage.setItem("pickupAddresses", JSON.stringify(savedAddresses));
        toast.success("Pickup address auto-saved to Pickup Management!");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        orderData.pickupAddress &&
        orderData.pickupCity &&
        orderData.pickupPincode
      ) {
        autosavePickupAddress();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    orderData.pickupAddress,
    orderData.pickupCity,
    orderData.pickupState,
    orderData.pickupPincode,
    orderData.pickupPhone,
    orderData.pickupEmail,
    orderData.pickupName,
  ]);

  // Compute total weight
  useEffect(() => {
    const L = parseFloat(orderData.boxLength || "0");
    const H = parseFloat(orderData.boxHeight || "0");
    const B = parseFloat(orderData.boxBreadth || "0");
    const numBoxes = parseInt(orderData.numberOfBoxes || "0") || 0;
    const perBoxWeightInput = parseFloat(orderData.weight || "0") || 0;

    const volumetricPerBox = L && H && B ? (L * H * B) / 5000 : 0;
    const perBoxComputed = Math.max(perBoxWeightInput, volumetricPerBox);
    const total = numBoxes > 0 ? perBoxComputed * numBoxes : perBoxComputed;
    const totalRounded = isFinite(total) && total > 0 ? total.toFixed(2) : "";

    if (totalRounded !== orderData.totalWeight) {
      setOrderData((prev) => ({ ...prev, totalWeight: totalRounded }));
    }
  }, [
    orderData.boxLength,
    orderData.boxHeight,
    orderData.boxBreadth,
    orderData.weight,
    orderData.numberOfBoxes,
  ]);

  const handleExportCSV = () => {
    const invoiceNum =
      orderType === "b2b" ? orderData.invoiceNumber : `INV-${Date.now()}`;
    const slotInfo =
      orderType === "b2b" ? `${orderData.slotDate} ${orderData.slotTime}` : "";

    const csvContent = [
      "Order Type,Order ID,Customer Name,Phone,Email,From Address,From City,From State,From Pincode,To Address,To City,To State,To Pincode,Product Name,Quantity,Number of Boxes,Weight per Box (kg),Box Length (cm),Box Height (cm),Box Breadth (cm),Total Weight (kg),Declared Value,Payment Mode,COD Amount,Invoice Number,Pickup Slot",
      `"${orderType.toUpperCase()}","${orderData.orderId || "AUTO"}","${
        orderData.customerName
      }","${orderData.customerPhone}","${orderData.customerEmail}","${
        orderData.pickupAddress
      }","${orderData.pickupCity}","${orderData.pickupState}","${
        orderData.pickupPincode
      }","${orderData.shippingAddress}","${orderData.shippingCity}","${
        orderData.shippingState
      }","${orderData.shippingPincode}","${orderData.productName}","${
        orderData.quantity
      }","${orderData.numberOfBoxes}","${orderData.weight}","${
        orderData.boxLength
      }","${orderData.boxHeight}","${orderData.boxBreadth}","${
        orderData.totalWeight
      }","${orderData.declaredValue}","${orderData.paymentMode}","${
        orderData.codAmount || "0"
      }","${invoiceNum}","${slotInfo}"`,
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    a.download = `order_${orderType}_${
      orderData.orderId || "export"
    }_${dateStr}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("CSV exported successfully!");
  };

  const escapeHtml = (str: any) => {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const handleGenerateInvoice = () => {
    const invoiceNum =
      orderData.orderId || orderData.invoiceNumber || `INV-${Date.now()}`;
    const dateStr = new Date().toLocaleString();

    const rows: Array<{ label: string; value: string }> = [];
    const fieldLabels: Record<string, string> = {
      orderId: "Order ID",
      invoiceNumber: "Invoice Number",
      customerName: "Customer Name",
      customerPhone: "Phone",
      customerEmail: "Email",
      pickupAddress: "Pickup Address",
      pickupCity: "Pickup City",
      pickupState: "Pickup State",
      pickupPincode: "Pickup Pincode",
      shippingAddress: "Shipping Address",
      shippingCity: "Shipping City",
      shippingState: "Shipping State",
      shippingPincode: "Shipping Pincode",
      productName: "Product",
      quantity: "Quantity",
      numberOfBoxes: "Number of Boxes",
      weight: "Weight per Box (kg)",
      boxLength: "Box Length (cm)",
      boxHeight: "Box Height (cm)",
      boxBreadth: "Box Breadth (cm)",
      totalWeight: "Total Weight (kg)",
      declaredValue: "Declared Value (₹)",
      paymentMode: "Payment Mode",
      codAmount: "COD Amount (₹)",
      courier: "Courier",
      serviceType: "Service Type",
      notes: "Notes",
    };

    for (const key of Object.keys(orderData)) {
      const val = (orderData as any)[key];
      if (val === null || val === undefined || val === "") continue;
      if (key === "podFile" || key === "invoiceFile" || key === "ewayBillFile") {
        if (val) rows.push({ label: key, value: (val as File).name || key });
        continue;
      }
      const label = fieldLabels[key] || key;
      rows.push({ label, value: String(val) });
    }

    const html = `<!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Invoice - ${escapeHtml(invoiceNum)}</title>
      <style>
        body { font-family: Inter, Arial, sans-serif; padding: 24px; color: #0f172a; }
        .invoice { max-width: 800px; margin: 0 auto; border: 1px solid #e6edf3; padding: 24px; }
        .header { display:flex; justify-content:space-between; align-items:center; }
        h1 { margin:0; font-size:24px; }
        table { width:100%; border-collapse:collapse; margin-top:16px; }
        td, th { padding:8px 10px; border:1px solid #e6edf3; text-align:left; }
        .meta { margin-top:8px; font-size:14px; }
        .print { margin-top:16px; display:flex; gap:8px; }
        .btn { padding:8px 12px; background:#0ea5e9; color:white; border-radius:6px; text-decoration:none; }
      </style>
    </head>
    <body>
      <div class="invoice">
        <div class="header">
          <div>
            <h1>Swiftora - Invoice</h1>
            <div class="meta">Invoice: <strong>${escapeHtml(
              invoiceNum
            )}</strong></div>
            <div class="meta">Date: ${escapeHtml(dateStr)}</div>
          </div>
          <div style="text-align:right">
            <div><strong>Swiftora</strong></div>
            <div>Address: 123 Logistics Park</div>
            <div>Contact: support@swiftora.example</div>
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Field</th><th>Value</th></tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (r) =>
                  `<tr><td>${escapeHtml(r.label)}</td><td>${escapeHtml(
                    r.value
                  )}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
        <div class="print">
          <a href="#" class="btn" onclick="window.print();return false;">Print Invoice</a>
        </div>
      </div>
    </body>
    </html>`;

    const w = window.open("", "_blank");
    if (!w) {
      toast.error("Popup blocked: allow popups for this site to generate invoice.");
      return;
    }
    w.document.write(html);
    w.document.close();
  };

  const handleSaveDraft = () => {
    toast.success("Order saved as draft!");
  };

  // Segmented Control Component
  const SegmentedControl = () => (
        <div className={`flex items-center gap-2 p-1.5 rounded-xl border-2 transition-all duration-300 ${
          orderType === "b2c" 
            ? "bg-blue-100 border-blue-300" 
            : "bg-slate-200 border-slate-400"
        }`}>
          <button
            type="button"
            onClick={() => setOrderType("b2c")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
              orderType === "b2c"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "text-blue-700 hover:text-blue-800 bg-transparent"
            }`}
          >
            <Box className="w-4 h-4" />
            B2C (Retail Shipments)
          </button>
          <button
            type="button"
            onClick={() => setOrderType("b2b")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
              orderType === "b2b"
                ? "bg-slate-800 text-white shadow-lg scale-105"
                : "text-slate-700 hover:text-slate-900 bg-transparent"
            }`}
          >
            <Building2 className="w-4 h-4" />
            B2B (Bulk / GST Shipments)
          </button>
        </div>
  );

  return (
    <div
      className={`space-y-8 transition-colors duration-500 ${
        orderType === "b2c" ? "bg-blue-50" : "bg-slate-100"
      }`}
    >
      {/* Header with Segmented Control */}
      <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hover:bg-blue-50 border border-blue-200 rounded-xl text-blue-600 hover:shadow-md transition-all"
        >
          <Link to="/dashboard/orders">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-4xl font-bold mb-2">
              <span className="text-gray-900">Create New </span>
              <span
                className={`${
                  orderType === "b2c"
                    ? "text-blue-600"
                    : "text-slate-700"
                }`}
              >
                {orderType === "b2c" ? "Shipment" : "Consignment"}
            </span>
          </h1>
            <p className="text-gray-600 text-lg">
              {orderType === "b2c"
                ? "Quick and simple retail shipment creation"
                : "Enterprise bulk shipment with GST compliance"}
          </p>
        </div>
      </div>

        {/* Prominent Segmented Control */}
        <div className="max-w-2xl">
          <SegmentedControl />
          {orderType === "b2c" && (
            <p className="text-sm text-gray-500 mt-3 ml-2">
              Best for individual customers and small parcels
            </p>
          )}
        </div>

        {/* B2B Info Banner */}
        {orderType === "b2b" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="bg-amber-50 border-amber-200">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>B2B shipments require GST, invoice, and compliance details.</strong> Please ensure all documents are ready before proceeding.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {orderType === "b2c" ? (
            <motion.div
              key="b2c"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* B2C Main Form - Lightweight */}
          <div className="lg:col-span-2 space-y-6">
                {/* Customer Details - Minimal */}
                <Card className="bg-white border-2 border-blue-300 rounded-3xl shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-3xl">
                    <CardTitle className="flex items-center gap-3 text-blue-900 font-bold">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center border-2 border-blue-600 shadow-md">
                        <User className="w-6 h-6 text-white" />
                  </div>
                      Customer Information
                </CardTitle>
                    <CardDescription className="text-blue-700 font-medium">
                      Recipient details for delivery
                </CardDescription>
              </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                        <Label className="text-blue-900 font-semibold">Customer Name *</Label>
                    <Input
                      required
                      value={orderData.customerName}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          customerName: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                          className="border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 rounded-xl"
                    />
                  </div>
                  <div>
                        <Label className="text-blue-900 font-semibold">Phone Number *</Label>
                    <Input
                      required
                      type="tel"
                      value={orderData.customerPhone}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          customerPhone: e.target.value,
                        })
                      }
                      placeholder="+91 98765 43210"
                          className="border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                      <Label className="text-blue-900 font-semibold">Email Address</Label>
                  <Input
                    type="email"
                    value={orderData.customerEmail}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                        customerEmail: e.target.value,
                      })
                    }
                    placeholder="customer@example.com"
                        className="border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

                {/* Delivery Address - Simple */}
                <Card className="bg-white border-2 border-blue-300 rounded-3xl shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-3xl">
                    <CardTitle className="flex items-center gap-3 text-blue-900 font-bold">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center border-2 border-blue-600 shadow-md">
                        <MapPin className="w-6 h-6 text-white" />
                  </div>
                      Delivery Address
                </CardTitle>
              </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                <div>
                      <Label className="text-blue-900 font-semibold">Address *</Label>
                  <Textarea
                    required
                        value={orderData.shippingAddress}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                            shippingAddress: e.target.value,
                      })
                    }
                    placeholder="Street address, building, apartment"
                    rows={3}
                        className="border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                        <Label className="text-blue-900 font-semibold">City *</Label>
                    <Input
                      required
                          value={orderData.shippingCity}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                              shippingCity: e.target.value,
                        })
                      }
                      placeholder="Mumbai"
                          className="border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 rounded-xl"
                    />
                  </div>
                  <div>
                        <Label className="text-blue-900 font-semibold">State *</Label>
                    <Input
                      required
                          value={orderData.shippingState}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                              shippingState: e.target.value,
                        })
                      }
                      placeholder="Maharashtra"
                          className="border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 rounded-xl"
                    />
                  </div>
                  <div>
                        <Label className="text-blue-900 font-semibold">Pincode *</Label>
                    <Input
                      required
                          value={orderData.shippingPincode}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                              shippingPincode: e.target.value,
                        })
                      }
                      placeholder="400001"
                      maxLength={6}
                          className="border-2 border-blue-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 rounded-xl"
                    />
                  </div>
                </div>
                  </CardContent>
                </Card>

                {/* Product & Payment - Compact */}
                <Card className="bg-white border-2 border-blue-300 rounded-3xl shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-3xl">
                    <CardTitle className="flex items-center gap-3 text-blue-900 font-bold">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center border-2 border-blue-600 shadow-md">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      Product & Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                  <div>
                      <Label className="text-gray-700">Product Name *</Label>
                    <Input
                        required
                        value={orderData.productName}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                            productName: e.target.value,
                        })
                      }
                        placeholder="Product description"
                        className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                    <div className="grid grid-cols-2 gap-4">
                  <div>
                        <Label className="text-gray-700">Weight (kg) *</Label>
                    <Input
                          required
                          type="number"
                          step="0.1"
                          value={orderData.weight}
                          onChange={(e) =>
                            setOrderData({ ...orderData, weight: e.target.value })
                          }
                          placeholder="0.5"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700">Declared Value (₹) *</Label>
                        <Input
                          required
                          type="number"
                          value={orderData.declaredValue}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                              declaredValue: e.target.value,
                        })
                      }
                          placeholder="1000"
                          className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                    <div>
                      <Label className="text-gray-700">Payment Type *</Label>
                      <RadioGroup
                        value={orderData.paymentMode}
                        onValueChange={(value) =>
                          setOrderData({ ...orderData, paymentMode: value })
                        }
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="prepaid" id="prepaid" />
                          <Label htmlFor="prepaid" className="cursor-pointer text-gray-700">
                            Prepaid
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="cursor-pointer text-gray-700">
                            COD
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {orderData.paymentMode === "cod" && (
                      <div>
                        <Label className="text-gray-700">COD Amount (₹) *</Label>
                        <Input
                          required
                          type="number"
                          value={orderData.codAmount}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              codAmount: e.target.value,
                            })
                          }
                          placeholder="Enter COD amount"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="giftWrap"
                        checked={orderData.giftWrap}
                        onCheckedChange={(checked) =>
                          setOrderData({ ...orderData, giftWrap: !!checked })
                        }
                      />
                      <Label htmlFor="giftWrap" className="cursor-pointer text-gray-700">
                        Add gift wrap (extra ₹50)
                      </Label>
                </div>
              </CardContent>
            </Card>
              </div>

              {/* B2C Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4 bg-white border-2 border-blue-400 rounded-3xl shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-3xl">
                    <CardTitle className="text-white font-bold text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="p-4 bg-blue-100 rounded-xl border-2 border-blue-400 shadow-md">
                      <Badge className="bg-blue-600 text-white text-sm font-bold px-3 py-1">B2C Shipment</Badge>
                  </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping Charges</span>
                      <span className="font-semibold text-blue-600">
                        ₹{orderData.weight ? (parseFloat(orderData.weight) * 50).toFixed(2) : "0.00"}
                      </span>
                    </div>
                    {orderData.paymentMode === "cod" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">COD Charges</span>
                        <span className="font-semibold text-blue-600">
                          ₹{orderData.codAmount ? (parseFloat(orderData.codAmount) * 0.02).toFixed(2) : "0.00"}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-blue-200 pt-3">
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-blue-600">
                          ₹{orderData.weight
                            ? (
                                parseFloat(orderData.weight) * 50 +
                                (orderData.paymentMode === "cod" && orderData.codAmount
                                  ? parseFloat(orderData.codAmount) * 0.02
                                  : 0)
                              ).toFixed(2)
                            : "0.00"}
                        </span>
                      </div>
                    </div>
                    {!orderConfirmed ? (
                      <div className="space-y-2 pt-4 border-t-2 border-blue-300">
                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all font-bold text-base py-6 rounded-xl"
                        >
                          <Save className="w-5 h-5 mr-2" />
                          Create Shipment
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-gray-300 hover:bg-blue-50"
                          onClick={handleSaveDraft}
                        >
                          Save as Draft
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-4 border-t border-blue-200">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm font-semibold text-green-800">
                            Shipment Created Successfully!
                          </p>
                        </div>
                        <Button
                          type="button"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={handleConfirmOrder}
                        >
                          Confirm & Finish
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="b2b"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* B2B Main Form - Structured, enterprise-heavy */}
              <div className="lg:col-span-2 space-y-6">
                {/* Company & GST Details */}
                <Card className="bg-white border border-slate-300 rounded-md shadow-sm">
                  <CardHeader className="bg-slate-900 border-b border-slate-800">
                    <CardTitle className="flex items-center gap-3 text-slate-50 font-semibold text-base">
                      <div className="w-10 h-10 bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Building2 className="w-5 h-5 text-slate-100" />
                      </div>
                      Company & GST Details
                </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Business information and tax compliance
                </CardDescription>
              </CardHeader>
                  <CardContent className="space-y-4 pt-6 bg-slate-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Company Name *
                        </Label>
                        <Input
                    required
                          value={orderData.companyName}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                              companyName: e.target.value,
                      })
                    }
                          placeholder="Company Pvt. Ltd."
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                  />
                </div>
                  <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          GST Number *
                        </Label>
                    <Input
                      required
                          value={orderData.gstNumber}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                              gstNumber: e.target.value,
                        })
                      }
                          placeholder="27AAAAA0000A1Z5"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Customer Name *
                        </Label>
                    <Input
                      required
                          value={orderData.customerName}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                              customerName: e.target.value,
                        })
                      }
                          placeholder="Contact person name"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                  <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Phone Number *
                        </Label>
                    <Input
                      required
                          type="tel"
                          value={orderData.customerPhone}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                              customerPhone: e.target.value,
                        })
                      }
                          placeholder="+91 98765 43210"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                </div>
                    <div>
                      <Label className="text-slate-900 font-semibold text-xs">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        value={orderData.customerEmail}
                        onChange={(e) =>
                          setOrderData({
                            ...orderData,
                            customerEmail: e.target.value,
                          })
                        }
                        placeholder="contact@company.com"
                        className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                      />
                </div>
              </CardContent>
            </Card>

                {/* Pickup & Drop Warehouses */}
                <Card className="bg-white border border-slate-300 rounded-md shadow-sm">
                  <CardHeader className="bg-slate-900 border-b border-slate-800">
                    <CardTitle className="flex items-center gap-3 text-slate-50 font-semibold text-base">
                      <div className="w-10 h-10 bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Truck className="w-5 h-5 text-slate-100" />
                  </div>
                      Pickup & Drop Warehouses
                </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Origin and destination warehouse details
                </CardDescription>
              </CardHeader>
                  <CardContent className="space-y-6 pt-6 bg-slate-50">
                <div>
                      <h4 className="text-xs font-semibold text-slate-800 mb-3 uppercase tracking-wide">
                        Pickup Address *
                      </h4>
                      <div className="space-y-4 pl-4 border-l border-slate-300">
                        <div>
                          <Label className="text-slate-700 text-xs">
                            Location Name
                  </Label>
                  <Input
                            value={orderData.pickupName}
                    onChange={(e) =>
                              setOrderData({ ...orderData, pickupName: e.target.value })
                    }
                            placeholder="Main Warehouse"
                            className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                  />
                </div>
                  <div>
                          <Label className="text-slate-700 text-xs">
                            Address *
                          </Label>
                          <Textarea
                            required
                            value={orderData.pickupAddress}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                                pickupAddress: e.target.value,
                        })
                      }
                            placeholder="Warehouse address"
                            rows={3}
                            className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                            <Label className="text-slate-700 text-xs">
                              City *
                            </Label>
                  <Input
                    required
                              value={orderData.pickupCity}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                                  pickupCity: e.target.value,
                      })
                    }
                              placeholder="Mumbai"
                              className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                  />
                </div>
                  <div>
                            <Label className="text-slate-700 text-xs">
                              State *
                            </Label>
                    <Input
                      required
                              value={orderData.pickupState}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                                  pickupState: e.target.value,
                        })
                      }
                              placeholder="Maharashtra"
                              className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                  <div>
                            <Label className="text-slate-700 text-xs">
                              Pincode *
                    </Label>
                    <Input
                      required
                              value={orderData.pickupPincode}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                                  pickupPincode: e.target.value,
                        })
                      }
                              placeholder="400001"
                              maxLength={6}
                              className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                </div>
                    </div>
                    </div>
                  <div>
                      <h4 className="text-xs font-semibold text-slate-800 mb-3 uppercase tracking-wide">
                        Delivery Address *
                      </h4>
                      <div className="space-y-4 pl-4 border-l border-slate-300">
                        <div>
                          <Label className="text-slate-700 text-xs">
                            Address *
                          </Label>
                          <Textarea
                      required
                            value={orderData.shippingAddress}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                                shippingAddress: e.target.value,
                        })
                      }
                            placeholder="Delivery warehouse address"
                            rows={3}
                            className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                            <Label className="text-slate-700 text-xs">
                              City *
                            </Label>
                    <Input
                              required
                              value={orderData.shippingCity}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                                  shippingCity: e.target.value,
                        })
                      }
                              placeholder="Delhi"
                              className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                  <div>
                            <Label className="text-slate-700 text-xs">
                              State *
                            </Label>
                    <Input
                              required
                              value={orderData.shippingState}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                                  shippingState: e.target.value,
                        })
                      }
                              placeholder="Delhi"
                              className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                  <div>
                            <Label className="text-slate-700 text-xs">
                              Pincode *
                            </Label>
                    <Input
                              required
                              value={orderData.shippingPincode}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                                  shippingPincode: e.target.value,
                        })
                      }
                              placeholder="110001"
                              className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                    />
                  </div>
                </div>
                      </div>
                </div>
              </CardContent>
            </Card>

                {/* Invoice & E-way Bill Upload */}
                <Card className="bg-white border border-slate-300 rounded-md shadow-sm">
                  <CardHeader className="bg-slate-900 border-b border-slate-800">
                    <CardTitle className="flex items-center gap-3 text-slate-50 font-semibold text-base">
                      <div className="w-10 h-10 bg-slate-800 flex items-center justify-center border border-slate-700">
                        <FileText className="w-5 h-5 text-slate-100" />
                    </div>
                      Invoice & E-way Bill Upload
                  </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Upload compliance documents
                  </CardDescription>
                </CardHeader>
                  <CardContent className="space-y-6 pt-6 bg-slate-50">
                  <div>
                      <Label className="text-slate-900 font-semibold text-xs">
                        Invoice Number *
                    </Label>
                        <Input
                        required
                        value={orderData.invoiceNumber}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                            invoiceNumber: e.target.value,
                            })
                          }
                        placeholder="INV-2025-001"
                        className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                      </div>
                      <div>
                      <Label className="text-slate-900 font-semibold text-xs">
                        E-way Bill Number
                        </Label>
                        <Input
                        value={orderData.ewayBillNumber}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                            ewayBillNumber: e.target.value,
                            })
                          }
                        placeholder="EWB-XXXXXXXXXX"
                        className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Invoice Upload *
                        </Label>
                        {!orderData.invoiceFile ? (
                          <div className="mt-2">
                            <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-slate-400 rounded-sm cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-slate-600" />
                                <p className="mb-2 text-sm text-slate-600">
                                  <span className="font-semibold">Click to upload</span> invoice
                                </p>
                                <p className="text-xs text-slate-500">PNG, JPG, PDF (MAX. 5MB)</p>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,image/jpg,application/pdf"
                                onChange={(e) => handleFileUpload(e, "invoice")}
                              />
                            </label>
                          </div>
                        ) : (
                            <div className="mt-2 p-4 border border-slate-300 rounded-sm bg-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-slate-600" />
                              <div>
                                <p className="text-sm font-medium text-slate-900">{invoiceFileName}</p>
                                <p className="text-xs text-slate-600">
                                  {(orderData.invoiceFile!.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="hover:bg-slate-200"
                              onClick={() => handleRemoveFile("invoice")}
                            >
                              <X className="w-4 h-4 text-slate-600" />
                            </Button>
                    </div>
                        )}
                  </div>
                  <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          E-way Bill Upload
                        </Label>
                        {!orderData.ewayBillFile ? (
                      <div className="mt-2">
                            <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-slate-400 rounded-sm cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-slate-600" />
                                <p className="mb-2 text-sm text-slate-600">
                                  <span className="font-semibold">Click to upload</span> e-way bill
                                </p>
                                <p className="text-xs text-slate-500">PNG, JPG, PDF (MAX. 5MB)</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg,application/pdf"
                                onChange={(e) => handleFileUpload(e, "ewayBill")}
                          />
                        </label>
                      </div>
                    ) : (
                          <div className="mt-2 p-4 border border-slate-300 rounded-sm bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-slate-600" />
                          <div>
                                <p className="text-sm font-medium text-slate-900">{ewayBillFileName}</p>
                                <p className="text-xs text-slate-600">
                                  {(orderData.ewayBillFile!.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                              className="hover:bg-slate-200"
                              onClick={() => handleRemoveFile("ewayBill")}
                        >
                              <X className="w-4 h-4 text-slate-600" />
                        </Button>
                      </div>
                    )}
                      </div>
                  </div>
                </CardContent>
              </Card>

                {/* Shipment Dimensions / Boxes */}
                <Card className="bg-white border border-slate-300 rounded-md shadow-sm">
                  <CardHeader className="bg-slate-900 border-b border-slate-800">
                    <CardTitle className="flex items-center gap-3 text-slate-50 font-semibold text-base">
                      <div className="w-10 h-10 bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Scale className="w-5 h-5 text-slate-100" />
                  </div>
                      Shipment Dimensions / Boxes
                </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Product details and dimensions
                </CardDescription>
              </CardHeader>
                  <CardContent className="space-y-4 pt-6 bg-slate-50">
                <div>
                      <Label className="text-slate-900 font-semibold text-xs">
                        Order ID (Manual Booking)
                      </Label>
                      <Input
                        value={orderData.orderId}
                        onChange={(e) =>
                          setOrderData({ ...orderData, orderId: e.target.value })
                        }
                        placeholder="Enter Order ID"
                        className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                      />
                </div>
                <div>
                      <Label className="text-slate-900 font-semibold text-xs">
                        Product Name *
                      </Label>
                      <Input
                        required
                        value={orderData.productName}
                        onChange={(e) =>
                          setOrderData({
                            ...orderData,
                            productName: e.target.value,
                          })
                        }
                        placeholder="Product description"
                        className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                      />
                </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Quantity *
                        </Label>
                        <Input
                          required
                          type="number"
                          min="1"
                          value={orderData.quantity}
                          onChange={(e) =>
                            setOrderData({ ...orderData, quantity: e.target.value })
                          }
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                  </div>
                <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Number of Boxes *
                        </Label>
                        <Input
                          required
                          type="number"
                          min="1"
                          value={orderData.numberOfBoxes}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              numberOfBoxes: e.target.value,
                            })
                          }
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                        </div>
                      <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Weight (kg) *
                        </Label>
                        <Input
                          required
                          type="number"
                          step="0.1"
                          value={orderData.weight}
                          onChange={(e) =>
                            setOrderData({ ...orderData, weight: e.target.value })
                          }
                          placeholder="0.5"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                        </div>
                      <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Declared Value (₹) *
                        </Label>
                        <Input
                          required
                          type="number"
                          value={orderData.declaredValue}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              declaredValue: e.target.value,
                            })
                          }
                          placeholder="1000"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Length (cm)
                        </Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={orderData.boxLength}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              boxLength: e.target.value,
                            })
                          }
                          placeholder="30"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                        </div>
                      <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Height (cm)
                        </Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={orderData.boxHeight}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              boxHeight: e.target.value,
                            })
                          }
                          placeholder="20"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                        </div>
                      <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          Breadth (cm)
                        </Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={orderData.boxBreadth}
                          onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              boxBreadth: e.target.value,
                            })
                          }
                          placeholder="15"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                        </div>
                </div>
                    <div>
                      <Label className="text-slate-900 font-semibold text-xs">
                        Total Weight (kg)
                      </Label>
                      <Input
                        readOnly
                        value={orderData.totalWeight}
                        placeholder="Auto-calculated"
                        className="bg-slate-100 border border-slate-300 text-sm rounded-sm"
                      />
                </div>
                    <div>
                      <Label className="text-slate-900 font-semibold text-xs">
                        Payment Mode *
                      </Label>
                      <RadioGroup
                        value={orderData.paymentMode}
                        onValueChange={(value) =>
                          setOrderData({ ...orderData, paymentMode: value })
                        }
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="prepaid" id="b2b-prepaid" />
                            <Label
                              htmlFor="b2b-prepaid"
                              className="cursor-pointer text-slate-800 text-xs"
                            >
                            Prepaid
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cod" id="b2b-cod" />
                            <Label
                              htmlFor="b2b-cod"
                              className="cursor-pointer text-slate-800 text-xs"
                            >
                            COD
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {orderData.paymentMode === "cod" && (
                      <div>
                        <Label className="text-slate-900 font-semibold text-xs">
                          COD Amount (₹) *
                        </Label>
                        <Input
                          required
                          type="number"
                          value={orderData.codAmount}
                  onChange={(e) =>
                            setOrderData({
                              ...orderData,
                              codAmount: e.target.value,
                            })
                          }
                          placeholder="Enter COD amount"
                          className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                        />
                      </div>
                    )}
                    <div>
                      <Label className="text-slate-900 font-semibold text-xs">
                        Pickup Slot Date *
                      </Label>
                      <Input
                        required
                        type="date"
                        value={orderData.slotDate}
                        onChange={(e) =>
                          setOrderData({
                            ...orderData,
                            slotDate: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="border border-slate-300 focus:border-slate-700 focus:ring-1 focus:ring-slate-500 bg-white text-sm rounded-sm"
                      />
                    </div>
              </CardContent>
            </Card>
          </div>

              {/* B2B Sidebar */}
          <div className="lg:col-span-1">
                <Card className="sticky top-4 bg-white border border-slate-300 rounded-md shadow-sm">
                  <CardHeader className="bg-slate-900 rounded-t-md border-b border-slate-800">
                    <CardTitle className="text-slate-50 font-semibold text-base">
                      Order Summary
                    </CardTitle>
              </CardHeader>
                  <CardContent className="space-y-4 pt-6 bg-slate-50">
                    <div className="p-3 bg-slate-900 rounded border border-slate-700">
                      <Badge className="bg-slate-800 text-slate-50 text-[11px] font-semibold px-2.5 py-0.5">
                        B2B Consignment
                      </Badge>
                      {orderData.invoiceNumber && (
                        <div className="text-[11px] text-slate-400 mt-2">
                        Invoice: {orderData.invoiceNumber}
                      </div>
                    )}
                        </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Shipping Charges</span>
                      <span className="font-semibold text-slate-800">
                        ₹{orderData.weight ? (parseFloat(orderData.weight) * 50).toFixed(2) : "0.00"}
                    </span>
                  </div>
                  {orderData.paymentMode === "cod" && (
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">COD Charges</span>
                        <span className="font-semibold text-slate-700">
                          ₹{orderData.codAmount ? (parseFloat(orderData.codAmount) * 0.02).toFixed(2) : "0.00"}
                      </span>
                    </div>
                  )}
                    <div className="border-t border-slate-300 pt-3">
                      <div className="flex justify-between font-semibold text-sm">
                        <span className="text-slate-900">Total</span>
                        <span className="text-slate-900">
                          ₹{orderData.weight
                          ? (
                              parseFloat(orderData.weight) * 50 +
                                (orderData.paymentMode === "cod" && orderData.codAmount
                                ? parseFloat(orderData.codAmount) * 0.02
                                : 0)
                            ).toFixed(2)
                          : "0.00"}
                      </span>
                  </div>
                </div>
                {!orderConfirmed ? (
                      <div className="space-y-2 pt-4 border-t border-slate-300">
                    <Button
                      type="submit"
                          className="w-full bg-slate-900 hover:bg-slate-950 text-white shadow-sm hover:shadow-md transition-all font-semibold text-sm py-3 rounded-sm"
                    >
                      <Save className="w-4 h-4 mr-2" />
                          Create B2B Consignment
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                          className="w-full border-slate-300 hover:bg-slate-100 text-slate-800 text-xs rounded-sm"
                      onClick={handleSaveDraft}
                    >
                      Save as Draft
                    </Button>
                  </div>
                ) : (
                      <div className="space-y-3 pt-4 border-t border-slate-300">
                        <div className="p-3 bg-slate-900 rounded border border-slate-700">
                          <p className="text-xs font-semibold text-slate-50">
                            Consignment Created Successfully!
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                            className="border-slate-300 hover:bg-slate-100 text-slate-800 text-xs rounded-sm"
                        onClick={() => handleGenerateDocument("manifest")}
                        disabled={generatedDocuments.manifest}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Manifest
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                            className="border-slate-300 hover:bg-slate-100 text-slate-800 text-xs rounded-sm"
                        onClick={() => handleGenerateDocument("gst")}
                        disabled={generatedDocuments.gst}
                      >
                        <Receipt className="w-3 h-3 mr-1" />
                        GST
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                            className="border-slate-300 hover:bg-slate-100 text-slate-800 text-xs rounded-sm"
                        onClick={() => handleGenerateDocument("awb")}
                        disabled={generatedDocuments.awb}
                      >
                        <FileCheck className="w-3 h-3 mr-1" />
                        AWB
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                            className="border-slate-300 hover:bg-slate-100 text-slate-800 text-xs rounded-sm"
                        onClick={() => handleGenerateDocument("label")}
                        disabled={generatedDocuments.label}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Label
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                          className="w-full border-slate-300 hover:bg-slate-100 text-slate-800 text-xs rounded-sm"
                      onClick={handleExportCSV}
                    >
                      <Download className="w-4 h-4 mr-2" />
                          Export CSV
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                          className="w-full border-slate-300 hover:bg-slate-100 text-slate-800 text-xs rounded-sm"
                      onClick={handleGenerateInvoice}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Invoice
                    </Button>
                    <Button
                      type="button"
                          className="w-full bg-slate-900 hover:bg-black text-white text-sm rounded-sm"
                      onClick={handleConfirmOrder}
                    >
                      Confirm & Finish
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default CreateOrder;
