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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Truck,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

const Pickup = () => {
  const [newPickup, setNewPickup] = useState({
    name: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });

  const pickupAddresses = [
    {
      id: 1,
      name: "Main Warehouse",
      address: "123 Logistics Avenue, Suite 500",
      pincode: "400001",
      city: "Mumbai",
      state: "Maharashtra",
      phone: "+91 98765 43210",
      email: "warehouse@company.com",
      isDefault: true,
      status: "Active",
    },
    {
      id: 2,
      name: "Secondary Warehouse",
      address: "456 Industrial Road",
      pincode: "110001",
      city: "Delhi",
      state: "Delhi",
      phone: "+91 98765 43211",
      email: "warehouse2@company.com",
      isDefault: false,
      status: "Active",
    },
  ];

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
      date: "2025-01-15",
      time: "10:00 AM - 2:00 PM",
      courier: "Delhivery",
      status: "Completed",
      orders: 38,
    },
  ];

  const handleAddPickup = () => {
    toast.success("Pickup address added successfully");
    setNewPickup({
      name: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
      phone: "",
      email: "",
    });
  };

  const handleSchedulePickup = (addressId: number) => {
    toast.success("Pickup scheduled successfully");
  };

  const handleEditAddress = (addressId: number) => {
    toast.info(`Edit address ${addressId} - Feature coming soon`);
  };

  const handleSetDefault = (addressId: number) => {
    toast.success(`Address ${addressId} set as default`);
  };

  const handleReschedulePickup = (pickupId: string) => {
    toast.info(`Reschedule pickup ${pickupId} - Feature coming soon`);
  };

  const handleCancelPickup = (pickupId: string) => {
    toast.success(`Pickup ${pickupId} cancelled successfully`);
  };

  const handleViewPickupDetails = (pickupId: string) => {
    toast.info(`Viewing pickup ${pickupId} - Feature coming soon`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Pickup Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage pickup addresses and schedule pickups
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg ">
              <Plus className="w-4 h-4 mr-2" />
              Add Pickup Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Pickup Address</DialogTitle>
              <DialogDescription>
                Add a new pickup location for courier pickups
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Location Name
                </label>
                <Input
                  placeholder="e.g., Main Warehouse"
                  value={newPickup.name}
                  onChange={(e) =>
                    setNewPickup({ ...newPickup, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Address
                </label>
                <Input
                  placeholder="Street address"
                  value={newPickup.address}
                  onChange={(e) =>
                    setNewPickup({ ...newPickup, address: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Pincode
                  </label>
                  <Input
                    placeholder="400001"
                    value={newPickup.pincode}
                    onChange={(e) =>
                      setNewPickup({ ...newPickup, pincode: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <Input
                    placeholder="Mumbai"
                    value={newPickup.city}
                    onChange={(e) =>
                      setNewPickup({ ...newPickup, city: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">State</label>
                <Input
                  placeholder="Maharashtra"
                  value={newPickup.state}
                  onChange={(e) =>
                    setNewPickup({ ...newPickup, state: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Phone
                  </label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={newPickup.phone}
                    onChange={(e) =>
                      setNewPickup({ ...newPickup, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="warehouse@company.com"
                    value={newPickup.email}
                    onChange={(e) =>
                      setNewPickup({ ...newPickup, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button onClick={handleAddPickup} className="w-full">
                Add Address
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pickup Addresses */}
      <Card>
        <CardHeader>
          <CardTitle>Pickup Addresses</CardTitle>
          <CardDescription>Manage your pickup locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pickupAddresses.map((address) => (
              <Card key={address.id} className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{address.name}</CardTitle>
                    {address.isDefault && (
                      <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                        Default
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="text-sm">
                      <div>{address.address}</div>
                      <div className="text-gray-600">
                        {address.city}, {address.state} - {address.pincode}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {address.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {address.email}
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSchedulePickup(address.id)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Pickup
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAddress(address.id)}
                    >
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Pickups */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Pickups</CardTitle>
          <CardDescription>Upcoming and past pickup schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pickup ID</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Courier</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledPickups.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">{pickup.id}</TableCell>
                    <TableCell>{pickup.address}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{pickup.date}</div>
                        <div className="text-gray-500">{pickup.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{pickup.courier}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {pickup.orders}
                    </TableCell>
                    <TableCell>
                      {pickup.status === "Completed" ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          <Clock className="w-3 h-3 mr-1" />
                          Scheduled
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {pickup.status === "Scheduled" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReschedulePickup(pickup.id)}
                              title="Reschedule"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancelPickup(pickup.id)}
                              title="Cancel"
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewPickupDetails(pickup.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pickup;
