import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Copy,
  Share2,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const Tracking = () => {
  const [trackingQuery, setTrackingQuery] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  const shipments = [
    {
      awb: "DEL123456789",
      orderId: "ORD-12345",
      phone: "9876543210",
      status: "In Transit",
      currentLocation: "Mumbai, MH",
      destination: "Delhi, DL",
      estimatedDelivery: "2025-01-18",
      timeline: [
        {
          status: "Booked",
          location: "Mumbai, MH",
          timestamp: "2025-01-15 10:30 AM",
          completed: true,
        },
        {
          status: "Picked Up",
          location: "Mumbai, MH",
          timestamp: "2025-01-15 2:45 PM",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Mumbai, MH",
          timestamp: "2025-01-16 9:00 AM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Delhi, DL",
          timestamp: "Expected",
          completed: false,
        },
        {
          status: "Delivered",
          location: "Delhi, DL",
          timestamp: "Pending",
          completed: false,
        },
      ],
      ndrStatus: null,
      rtoStatus: false,
    },
    {
      awb: "BLU987654321",
      orderId: "ORD-12346",
      phone: "9988776655",
      status: "NDR",
      currentLocation: "Delhi, DL",
      destination: "Delhi, DL",
      estimatedDelivery: "2025-01-19",
      timeline: [
        {
          status: "Booked",
          location: "Mumbai, MH",
          timestamp: "2025-01-14 11:00 AM",
          completed: true,
        },
        {
          status: "Picked Up",
          location: "Mumbai, MH",
          timestamp: "2025-01-14 3:00 PM",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Delhi, DL",
          timestamp: "2025-01-15 10:00 AM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Delhi, DL",
          timestamp: "2025-01-16 2:00 PM",
          completed: true,
        },
        {
          status: "NDR",
          location: "Delhi, DL",
          timestamp: "2025-01-16 4:00 PM",
          completed: true,
          reason: "Address Issue",
        },
        {
          status: "Delivered",
          location: "Delhi, DL",
          timestamp: "Pending",
          completed: false,
        },
      ],
      ndrStatus: {
        attempts: 1,
        reason: "Address Issue",
        action: "Contact Customer",
      },
      rtoStatus: false,
    },
    {
      awb: "SRT456789123",
      orderId: "ORD-12347",
      phone: "9123456789",
      status: "Delivered",
      currentLocation: "Delivered",
      destination: "Bangalore, KA",
      estimatedDelivery: "2025-01-14",
      timeline: [
        {
          status: "Booked",
          location: "Mumbai, MH",
          timestamp: "2025-01-12 9:00 AM",
          completed: true,
        },
        {
          status: "Picked Up",
          location: "Mumbai, MH",
          timestamp: "2025-01-12 1:00 PM",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Bangalore, KA",
          timestamp: "2025-01-13 8:00 AM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Bangalore, KA",
          timestamp: "2025-01-14 10:00 AM",
          completed: true,
        },
        {
          status: "Delivered",
          location: "Bangalore, KA",
          timestamp: "2025-01-14 3:30 PM",
          completed: true,
          pod: "Signed by: John Doe",
        },
      ],
      ndrStatus: null,
      rtoStatus: false,
    },
  ];

  const handleTrack = () => {
    if (!trackingQuery.trim()) {
      toast.error("Please enter AWB, Order ID or Mobile Number");
      return;
    }
    const shipment = shipments.find(
      (s) =>
        s.awb === trackingQuery ||
        s.orderId === trackingQuery ||
        s.phone === trackingQuery
    );
    if (shipment) {
      setSelectedShipment(shipment);
      toast.success("Tracking information found");
    } else {
      toast.error("No shipment found with this AWB, Order ID or Mobile Number");
    }
  };

  const handleCopyTrackingLink = (awb: string) => {
    const link = `${window.location.origin}/tracking?awb=${awb}`;
    navigator.clipboard.writeText(link);
    toast.success("Tracking link copied to clipboard");
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string }> = {
      Delivered: {
        className: "bg-[blue-600]/20 text-[blue-600] border-gray-200",
      },
      "In Transit": {
        className: "bg-[blue-600]/20 text-[blue-600] border-gray-200",
      },
      "Out for Delivery": {
        className: "bg-[blue-600]/20 text-[blue-600] border-gray-200",
      },
      NDR: {
        className: "bg-[orange-600]/20 text-[orange-600] border-orange-200",
      },
      RTO: {
        className:
          "bg-[orange-600]/30 text-[orange-600] border-[orange-600]/40",
      },
      "Picked Up": {
        className: "bg-[blue-600]/20 text-[blue-600] border-gray-200",
      },
    };
    const badgeConfig = config[status] || {
      className: "bg-foreground/10 text-foreground/60 border-foreground/20",
    };
    return (
      <Badge variant="outline" className={badgeConfig.className}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[blue-600] to-[orange-600] bg-clip-text text-transparent mb-2">
          Shipment Tracking
        </h1>
        <p className="text-foreground/70 text-lg">
          Track your shipments in real-time using AWB, Order ID or mobile number
        </p>
      </div>

      {/* Search Bar */}
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Track Shipment</CardTitle>
          <CardDescription className="text-foreground/70">
            Enter AWB number, Order ID or Mobile Number to track
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                placeholder="Enter AWB / Order ID / Mobile (e.g., DEL123456789 or ORD-12345 or 9876543210)"
                value={trackingQuery}
                onChange={(e) => setTrackingQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                className="pl-10 bg-background/50 border-gray-200 focus:border-[blue-600] text-foreground"
              />
            </div>
            <Button
              onClick={handleTrack}
              className="bg-gradient-to-r from-[blue-600] to-[orange-600] hover:from-[blue-600]/90 hover:to-[orange-600]/90 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Track
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-[blue-600]/10 border-gray-200">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[blue-600]/20 data-[state=active]:text-foreground"
          >
            All Shipments
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-[blue-600]/20 data-[state=active]:text-foreground"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="ndr"
            className="data-[state=active]:bg-[blue-600]/20 data-[state=active]:text-foreground"
          >
            NDR
          </TabsTrigger>
          <TabsTrigger
            value="rto"
            className="data-[state=active]:bg-[blue-600]/20 data-[state=active]:text-foreground"
          >
            RTO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {shipments.map((shipment) => (
            <Card
              key={shipment.awb}
              className="bg-white border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="w-5 h-5 text-[blue-600]" />
                        <span className="font-bold text-lg text-foreground">
                          {shipment.awb}
                        </span>
                        {getStatusBadge(shipment.status)}
                      </div>
                      <div className="text-sm text-foreground/70">
                        Order:{" "}
                        <span className="font-medium">{shipment.orderId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 hover:bg-[blue-600]/10"
                      onClick={() => handleCopyTrackingLink(shipment.awb)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 hover:bg-[blue-600]/10"
                      asChild
                    >
                      <a
                        href={`/tracking?awb=${shipment.awb}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Page
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[blue-600]" />
                      <div>
                        <div className="text-xs text-foreground/60">
                          Current Location
                        </div>
                        <div className="font-medium text-foreground">
                          {shipment.currentLocation}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[orange-600]" />
                      <div>
                        <div className="text-xs text-foreground/60">
                          Destination
                        </div>
                        <div className="font-medium text-foreground">
                          {shipment.destination}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[blue-600]" />
                      <div>
                        <div className="text-xs text-foreground/60">
                          Estimated Delivery
                        </div>
                        <div className="font-medium text-foreground">
                          {shipment.estimatedDelivery}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NDR Status */}
                  {shipment.ndrStatus && (
                    <div className="bg-[orange-600]/10 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-[orange-600]" />
                        <span className="font-semibold text-[orange-600]">
                          NDR Status
                        </span>
                      </div>
                      <div className="text-sm space-y-1 text-foreground/80">
                        <div>
                          <span className="font-medium">Attempts: </span>
                          {shipment.ndrStatus.attempts}
                        </div>
                        <div>
                          <span className="font-medium">Reason: </span>
                          {shipment.ndrStatus.reason}
                        </div>
                        <div>
                          <span className="font-medium">Action Required: </span>
                          {shipment.ndrStatus.action}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="mt-3 bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg"
                        onClick={() =>
                          toast.info("Resolve NDR - Feature coming soon")
                        }
                      >
                        Resolve NDR
                      </Button>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold mb-4 text-foreground">
                      Shipment Timeline
                    </h4>
                    <div className="space-y-4">
                      {shipment.timeline.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? "bg-gradient-to-br from-[blue-600] to-[orange-600] text-white"
                                  : "bg-foreground/10 text-foreground/40"
                              }`}
                            >
                              {step.completed ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            {index < shipment.timeline.length - 1 && (
                              <div
                                className={`w-0.5 h-16 ${
                                  step.completed
                                    ? "bg-gradient-to-b from-[blue-600] to-[orange-600]"
                                    : "bg-foreground/20"
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-foreground">
                                {step.status}
                              </span>
                              <span className="text-sm text-foreground/60">
                                {step.timestamp}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-foreground/70">
                              <MapPin className="w-3 h-3" />
                              {step.location}
                            </div>
                            {step.reason && (
                              <div className="text-sm text-[orange-600] mt-1">
                                Reason: {step.reason}
                              </div>
                            )}
                            {step.pod && (
                              <div className="text-sm text-[blue-600] mt-1">
                                {step.pod}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="text-center py-12 text-foreground/60">
            Active shipments will appear here
          </div>
        </TabsContent>

        <TabsContent value="ndr" className="mt-6">
          <div className="space-y-4">
            {shipments
              .filter((s) => s.status === "NDR")
              .map((shipment) => (
                <Card
                  key={shipment.awb}
                  className="bg-white border border-gray-200"
                >
                  <CardContent className="pt-6">
                    <div className="text-sm text-foreground/70">
                      NDR shipments: {shipment.awb}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="rto" className="mt-6">
          <div className="text-center py-12 text-foreground/60">
            RTO shipments will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tracking;
