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
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  AlertCircle,
  Package,
  Scale,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const Support = () => {
  const [newTicket, setNewTicket] = useState({
    type: "",
    subject: "",
    description: "",
    orderId: "",
    priority: "medium",
  });

  const tickets = [
    {
      id: "TKT-2025-001",
      type: "Delivery Issue",
      subject: "Package not delivered",
      orderId: "ORD-12345",
      status: "Open",
      priority: "High",
      createdAt: "2025-01-15",
      updatedAt: "2025-01-16",
      sla: "2 days remaining",
    },
    {
      id: "TKT-2025-002",
      type: "Weight Dispute",
      subject: "Incorrect weight charged",
      orderId: "ORD-12340",
      status: "Resolved",
      priority: "Medium",
      createdAt: "2025-01-10",
      updatedAt: "2025-01-12",
      sla: "Resolved",
    },
    {
      id: "TKT-2025-003",
      type: "Lost/Damaged",
      subject: "Package damaged in transit",
      orderId: "ORD-12335",
      status: "In Progress",
      priority: "High",
      createdAt: "2025-01-14",
      updatedAt: "2025-01-15",
      sla: "1 day remaining",
    },
  ];

  const disputes = [
    {
      id: "DSP-001",
      type: "Weight Dispute",
      orderId: "ORD-12340",
      declaredWeight: "0.5 kg",
      chargedWeight: "0.8 kg",
      amount: 150.0,
      status: "Resolved",
      resolution: "Refund processed",
      date: "2025-01-12",
    },
    {
      id: "DSP-002",
      type: "Weight Dispute",
      orderId: "ORD-12338",
      declaredWeight: "1.0 kg",
      chargedWeight: "1.5 kg",
      amount: 250.0,
      status: "Under Review",
      resolution: null,
      date: "2025-01-15",
    },
  ];

  const handleCreateTicket = () => {
    if (!newTicket.type || !newTicket.subject || !newTicket.description) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Support ticket created successfully");
    setNewTicket({
      type: "",
      subject: "",
      description: "",
      orderId: "",
      priority: "medium",
    });
  };

  const handleViewTicketDetails = (ticketId: string) => {
    toast.info(`Viewing ticket ${ticketId} - Feature coming soon`);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string; icon: any }> = {
      Open: {
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      "In Progress": {
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Clock,
      },
      Resolved: {
        className: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle2,
      },
      Closed: {
        className: "bg-gray-100 text-gray-800 border-gray-200",
        icon: XCircle,
      },
    };
    const badgeConfig = config[status] || { className: "", icon: Clock };
    const Icon = badgeConfig.icon;
    return (
      <Badge variant="outline" className={badgeConfig.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, string> = {
      High: "bg-red-100 text-red-800 border-red-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Low: "bg-green-100 text-green-800 border-green-200",
    };
    return (
      <Badge variant="outline" className={config[priority] || ""}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Support & Disputes
          </h1>
          <p className="text-gray-600 text-lg">
            Raise tickets and manage disputes
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Raise Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll help you resolve it
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Issue Type *
                </label>
                <Select
                  value={newTicket.type}
                  onValueChange={(value) =>
                    setNewTicket({ ...newTicket, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delivery">Delivery Issue</SelectItem>
                    <SelectItem value="weight">Weight Dispute</SelectItem>
                    <SelectItem value="lost">Lost/Damaged Shipment</SelectItem>
                    <SelectItem value="courier">Courier Escalation</SelectItem>
                    <SelectItem value="billing">Billing Issue</SelectItem>
                    <SelectItem value="pickuping">Pickuping Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Order ID (if applicable)
                </label>
                <Input
                  placeholder="ORD-12345"
                  value={newTicket.orderId}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, orderId: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject *
                </label>
                <Input
                  placeholder="Brief description of the issue"
                  value={newTicket.subject}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, subject: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description *
                </label>
                <Textarea
                  placeholder="Provide detailed information about the issue"
                  rows={5}
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Priority
                </label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) =>
                    setNewTicket({ ...newTicket, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCreateTicket}
                className="w-full bg-gradient-to-r from-[hsl(210_100%_60%)] to-[hsl(207,97%,45%)] hover:from-[hsl(210_100%_60%)]/90 hover:to-[hsl(207,97%,45%)]/90 text-white shadow-lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="history">Support History</TabsTrigger>
        </TabsList>

        {/* Support Tickets Tab */}
        <TabsContent value="tickets" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                Track and manage your support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>SLA</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">
                          {ticket.id}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.type}</Badge>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <a href="#" className="text-blue-600 hover:underline">
                            {ticket.orderId}
                          </a>
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(ticket.priority)}
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">
                            {ticket.sla}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewTicketDetails(ticket.id)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Disputes</CardTitle>
              <CardDescription>Weight and other disputes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dispute ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Declared Weight</TableHead>
                      <TableHead>Charged Weight</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Resolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">
                          {dispute.id}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            <Scale className="w-3 h-3 mr-1" />
                            {dispute.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <a href="#" className="text-blue-600 hover:underline">
                            {dispute.orderId}
                          </a>
                        </TableCell>
                        <TableCell>{dispute.declaredWeight}</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          {dispute.chargedWeight}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{dispute.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {dispute.status === "Resolved" ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Resolved
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              Under Review
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {dispute.resolution || "Pending"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support History Tab */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Support History</CardTitle>
              <CardDescription>
                Complete history of all support interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                Support history will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
