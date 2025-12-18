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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  MapPin,
  Package,
  DollarSign,
  Truck,
  ArrowRight,
  RefreshCw,
  Download,
} from "lucide-react";
import { toast } from "sonner";

const RateCalculator = () => {
  const [formData, setFormData] = useState({
    originPincode: "",
    destinationPincode: "",
    weight: "",
    paymentMode: "prepaid",
    codAmount: "",
    courier: "auto",
    serviceType: "standard",
  });

  const [calculatedRates, setCalculatedRates] = useState<any[]>([]);

  const couriers = [
    { name: "Delhivery", baseRate: 50, perKg: 30, codCharge: 2.5 },
    { name: "BlueDart", baseRate: 60, perKg: 35, codCharge: 2.0 },

    { name: "DTDC", baseRate: 40, perKg: 28, codCharge: 2.0 },
  ];

  const calculateRates = () => {
    if (
      !formData.originPincode ||
      !formData.destinationPincode ||
      !formData.weight
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (
      formData.originPincode.length !== 6 ||
      formData.destinationPincode.length !== 6
    ) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    const weight = parseFloat(formData.weight);
    if (weight <= 0) {
      toast.error("Weight must be greater than 0");
      return;
    }

    const rates = couriers.map((courier) => {
      let baseCharge = courier.baseRate;
      let weightCharge = 0;

      if (weight > 0.5) {
        const extraWeight = weight - 0.5;
        weightCharge = Math.ceil(extraWeight) * courier.perKg;
      }

      let codCharge = 0;
      if (formData.paymentMode === "cod" && formData.codAmount) {
        codCharge = (parseFloat(formData.codAmount) * courier.codCharge) / 100;
      }

      const total = baseCharge + weightCharge + codCharge;
      const gst = total * 0.18;
      const finalTotal = total + gst;

      return {
        courier: courier.name,
        baseCharge: baseCharge.toFixed(2),
        weightCharge: weightCharge.toFixed(2),
        codCharge: codCharge.toFixed(2),
        subtotal: total.toFixed(2),
        gst: gst.toFixed(2),
        total: finalTotal.toFixed(2),
        estimatedDays:
          courier.name === "BlueDart"
            ? 2
            : courier.name === "Delhivery"
            ? 3
            : 4,
      };
    });

    setCalculatedRates(rates);
    toast.success("Rates calculated successfully");
  };

  const handleReset = () => {
    setFormData({
      originPincode: "",
      destinationPincode: "",
      weight: "",
      paymentMode: "prepaid",
      codAmount: "",
      courier: "auto",
      serviceType: "standard",
    });
    setCalculatedRates([]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[blue-600] to-[orange-600] bg-clip-text text-transparent mb-2">
          Rate Calculator
        </h1>
        <p className="text-foreground/70 text-lg">
          Calculate shipping rates for your shipments
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <Card className="bg-white border border-gray-200 shadow-lg sticky top-4">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Calculator className="w-5 h-5 text-[blue-600]" />
                Calculate Rates
              </CardTitle>
              <CardDescription className="mt-1 text-foreground/70">
                Enter shipment details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <Label className="text-foreground">Origin Pincode *</Label>
                <Input
                  value={formData.originPincode}
                  onChange={(e) =>
                    setFormData({ ...formData, originPincode: e.target.value })
                  }
                  placeholder="400001"
                  maxLength={6}
                  className="bg-background/50 border-gray-200 focus:border-[blue-600] text-foreground"
                />
              </div>
              <div>
                <Label className="text-foreground">Destination Pincode *</Label>
                <Input
                  value={formData.destinationPincode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      destinationPincode: e.target.value,
                    })
                  }
                  placeholder="110001"
                  maxLength={6}
                  className="bg-background/50 border-gray-200 focus:border-[blue-600] text-foreground"
                />
              </div>
              <div>
                <Label className="text-foreground">Weight (kg) *</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  placeholder="0.5"
                  className="bg-background/50 border-gray-200 focus:border-[blue-600] text-foreground"
                />
              </div>
              <div>
                <Label className="text-foreground">Payment Mode *</Label>
                <RadioGroup
                  value={formData.paymentMode}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMode: value })
                  }
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="prepaid"
                      id="prepaid"
                      className="border-gray-200"
                    />
                    <Label
                      htmlFor="prepaid"
                      className="cursor-pointer text-foreground"
                    >
                      Prepaid
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cod"
                      id="cod"
                      className="border-gray-200"
                    />
                    <Label
                      htmlFor="cod"
                      className="cursor-pointer text-foreground"
                    >
                      COD
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.paymentMode === "cod" && (
                <div>
                  <Label className="text-foreground">COD Amount (₹)</Label>
                  <Input
                    type="number"
                    value={formData.codAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, codAmount: e.target.value })
                    }
                    placeholder="1000"
                    className="bg-background/50 border-gray-200 focus:border-[blue-600] text-foreground"
                  />
                </div>
              )}
              <div>
                <Label className="text-foreground">Courier</Label>
                <Select
                  value={formData.courier}
                  onValueChange={(value) =>
                    setFormData({ ...formData, courier: value })
                  }
                >
                  <SelectTrigger className="bg-background/50 border-gray-200 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-gray-200">
                    <SelectItem value="auto">Auto Select (All)</SelectItem>
                    <SelectItem value="delhivery">Delhivery</SelectItem>
                    <SelectItem value="bluedart">BlueDart</SelectItem>
                    {/* <SelectItem value="shiprocket">Shiprocket</SelectItem> */}
                    <SelectItem value="dtdc">DTDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Service Type</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, serviceType: value })
                  }
                >
                  <SelectTrigger className="bg-background/50 border-gray-200 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-gray-200">
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={calculateRates}
                  className="flex-1 bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-gray-200 hover:bg-[blue-600]/10"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {calculatedRates.length > 0 ? (
            <>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        Calculated Rates
                      </CardTitle>
                      <CardDescription className="mt-1 text-foreground/70">
                        {formData.originPincode} → {formData.destinationPincode}{" "}
                        • {formData.weight} kg
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 hover:bg-[blue-600]/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {calculatedRates.map((rate, index) => (
                      <Card
                        key={index}
                        className="border border-gray-200 hover:border-blue-300 transition-colors bg-white"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Truck className="w-5 h-5 text-[blue-600]" />
                                <h3 className="text-lg font-bold text-foreground">
                                  {rate.courier}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className="ml-2 border-gray-200 text-foreground/80"
                                >
                                  {rate.estimatedDays} days
                                </Badge>
                              </div>
                              <div className="text-sm text-foreground/60">
                                {formData.serviceType === "express"
                                  ? "Express Delivery"
                                  : "Standard Delivery"}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-[blue-600]">
                                ₹{rate.total}
                              </div>
                              <div className="text-xs text-foreground/60">
                                incl. GST
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                            <div>
                              <div className="text-xs text-foreground/60">
                                Base Charge
                              </div>
                              <div className="font-semibold text-foreground">
                                ₹{rate.baseCharge}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-foreground/60">
                                Weight Charge
                              </div>
                              <div className="font-semibold text-foreground">
                                ₹{rate.weightCharge}
                              </div>
                            </div>
                            {parseFloat(rate.codCharge) > 0 && (
                              <div>
                                <div className="text-xs text-foreground/60">
                                  COD Charge
                                </div>
                                <div className="font-semibold text-foreground">
                                  ₹{rate.codCharge}
                                </div>
                              </div>
                            )}
                            <div>
                              <div className="text-xs text-foreground/60">
                                GST (18%)
                              </div>
                              <div className="font-semibold text-foreground">
                                ₹{rate.gst}
                              </div>
                            </div>
                          </div>
                          <Button
                            className="w-full mt-4 border-gray-200 hover:bg-[blue-600]/10"
                            variant="outline"
                          >
                            Select This Rate
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <Calculator className="w-16 h-16 mx-auto text-[blue-600]/40 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Rates Calculated
                </h3>
                <p className="text-foreground/60">
                  Enter shipment details and click Calculate to see rates
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateCalculator;
