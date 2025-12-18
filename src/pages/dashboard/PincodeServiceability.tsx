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
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Search,
  Truck,
  AlertCircle,
  Download,
} from "lucide-react";
import { toast } from "sonner";

const PincodeServiceability = () => {
  const [startPincode, setStartPincode] = useState("");
  const [destinationPincode, setDestinationPincode] = useState("");
  const [results, setResults] = useState<any>(null);

  const checkServiceability = () => {
    if (!startPincode || startPincode.length !== 6) {
      toast.error("Please enter a valid 6-digit start pincode");
      return;
    }

    if (!destinationPincode || destinationPincode.length !== 6) {
      toast.error("Please enter a valid 6-digit destination pincode");
      return;
    }

    // Simulate serviceability check
    const couriers = [
      { name: "Delhivery", serviceable: true, cod: true, estimatedDays: 3 },
      { name: "BlueDart", serviceable: true, cod: true, estimatedDays: 2 },
      { name: "DTDC", serviceable: true, cod: true, estimatedDays: 5 },
    ];

    setResults({
      startPincode,
      destinationPincode,
      serviceable: true,
      couriers,
    });
    toast.success("Serviceability checked successfully");
  };

  const handleBulkCheck = () => {
    toast.info("Bulk pincode check - Feature coming soon");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[blue-600] to-[orange-600] bg-clip-text text-transparent mb-2">
          Pincode Serviceability
        </h1>
        <p className="text-foreground/70 text-lg">
          Check if a pincode is serviceable by our courier partners
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-white border border-gray-200 border-gray-200 shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
              <MapPin className="w-5 h-5 text-[blue-600]" />
              Check Serviceability
            </CardTitle>
            <CardDescription className="mt-1 text-foreground/70">
              Enter pincode to check
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label className="text-foreground">Start Pincode (From)</Label>
              <Input
                value={startPincode}
                onChange={(e) =>
                  setStartPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit start pincode"
                maxLength={6}
                className="bg-background/50 border-gray-200 focus:border-[blue-600] text-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground">
                Destination Pincode (To)
              </Label>
              <Input
                value={destinationPincode}
                onChange={(e) =>
                  setDestinationPincode(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="Enter 6-digit destination pincode"
                maxLength={6}
                className="bg-background/50 border-gray-200 focus:border-[blue-600] text-foreground"
              />
            </div>
            <Button
              onClick={checkServiceability}
              className="w-full bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg"
            >
              <Search className="w-4 h-4 mr-2" />
              Check Serviceability
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:bg-[blue-600]/10"
              onClick={handleBulkCheck}
            >
              <Download className="w-4 h-4 mr-2" />
              Bulk Check (CSV)
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {results ? (
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      Serviceability Results
                    </CardTitle>
                    <CardDescription className="mt-1 text-foreground/70">
                      From: {results.startPincode} → To:{" "}
                      {results.destinationPincode}
                    </CardDescription>
                  </div>
                  <Badge
                    className={
                      results.serviceable
                        ? "bg-[blue-600]/20 text-[blue-600] border-gray-200"
                        : "bg-[orange-600]/20 text-[orange-600] border-orange-200"
                    }
                  >
                    {results.serviceable ? "Serviceable" : "Not Serviceable"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {results.couriers.map((courier: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors bg-white "
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Truck className="w-5 h-5 text-[blue-600]" />
                          <h3 className="font-semibold text-lg text-foreground">
                            {courier.name}
                          </h3>
                        </div>
                        {courier.serviceable ? (
                          <CheckCircle2 className="w-5 h-5 text-[blue-600]" />
                        ) : (
                          <XCircle className="w-5 h-5 text-[orange-600]" />
                        )}
                      </div>
                      {courier.serviceable && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                          <div>
                            <div className="text-xs text-foreground/60">
                              COD Available
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                courier.cod
                                  ? "bg-[blue-600]/20 text-[blue-600] border-gray-200"
                                  : "bg-foreground/10 text-foreground/60 border-foreground/20"
                              }
                            >
                              {courier.cod ? "Yes" : "No"}
                            </Badge>
                          </div>
                          <div>
                            <div className="text-xs text-foreground/60">
                              Estimated Delivery
                            </div>
                            <div className="font-semibold text-foreground">
                              {courier.estimatedDays} days
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-foreground/60">
                              Status
                            </div>
                            <Badge className="bg-[blue-600]/20 text-[blue-600] border-gray-200">
                              Serviceable
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <MapPin className="w-16 h-16 mx-auto text-[blue-600]/40 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Results
                </h3>
                <p className="text-foreground/60">
                  Enter a pincode and click Check Serviceability
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PincodeServiceability;
