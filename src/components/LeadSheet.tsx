import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ArrowLeft, FileText } from 'lucide-react';

interface TrackerEntry {
  id: string;
  type: 'income' | 'expense' | 'monthly-income' | 'monthly-expense';
  amount: number;
  customer?: string;
  contact?: string;
  car?: string;
  note?: string;
  timestamp: number;
  customerCode?: string;
}

interface Customer {
  id: string;
  name: string;
  contact: string;
  code: string;
  services: Array<{
    date: string;
    car: string;
    service: string;
    amount: number;
  }>;
  recentVisitDate: string;
}

interface LeadSheetProps {
  trackerData: Record<string, TrackerEntry[]>;
  onBack: () => void;
}

const LeadSheet: React.FC<LeadSheetProps> = ({ trackerData, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  // Extract and sort customers alphabetically
  const customers = useMemo(() => {
    const customerMap = new Map<string, Customer>();

    Object.entries(trackerData).forEach(([date, entries]) => {
      entries.forEach(entry => {
        if (entry.type === 'income' && entry.customer && entry.contact) {
          const key = `${entry.customer}-${entry.contact}`;
          
          if (!customerMap.has(key)) {
            customerMap.set(key, {
              id: key,
              name: entry.customer,
              contact: entry.contact,
              code: entry.customerCode || '',
              services: [],
              recentVisitDate: date
            });
          }

          const customer = customerMap.get(key)!;
          customer.services.push({
            date,
            car: entry.car || '',
            service: entry.note || '',
            amount: entry.amount
          });

          // Update recent visit date
          if (new Date(date) > new Date(customer.recentVisitDate)) {
            customer.recentVisitDate = date;
          }
        }
      });
    });

    // Sort by name alphabetically
    return Array.from(customerMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, [trackerData]);

  // Filter customers based on search query
  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    
    const query = searchQuery.toLowerCase();
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(query) ||
      customer.contact.toLowerCase().includes(query) ||
      customer.code.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

  // Generate invoice for customer service history
  const generateServiceHistory = (customer: Customer) => {
    const invoiceContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #f6cf92, #bf7410); }
            .invoice-container { max-width: 800px; margin: 0 auto; background: #fff3e0; border-radius: 20px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f6cf92, #bf7410); padding: 30px; position: relative; }
            .logo { font-size: 28px; font-weight: bold; color: #333; }
            .subtitle { color: #666; font-size: 14px; }
            .content { padding: 30px; }
            .section-title { font-size: 16px; font-weight: bold; color: #bf7410; margin: 20px 0 10px 0; border-bottom: 2px solid #bf7410; padding-bottom: 5px; }
            .customer-info { margin: 20px 0; }
            .info-item { margin: 5px 0; font-size: 14px; }
            .services-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .services-table th { background: #bf7410; color: white; padding: 15px; text-align: left; }
            .services-table td { padding: 15px; border-bottom: 1px solid #ddd; }
            .services-table tr:nth-child(even) { background: #f9f9f9; }
            .total-section { text-align: right; margin: 30px 0; }
            .total-amount { background: #bf7410; color: white; padding: 15px 30px; border-radius: 25px; display: inline-block; font-size: 18px; font-weight: bold; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="logo">ZB AUTOCARE</div>
              <div class="subtitle">خدمات سیارے میں</div>
            </div>
            
            <div class="content">
              <div class="section-title">Customer Information</div>
              <div class="customer-info">
                <div class="info-item"><strong>Name:</strong> ${customer.name}</div>
                <div class="info-item"><strong>Phone:</strong> ${customer.contact}</div>
                <div class="info-item"><strong>Customer Code:</strong> ${customer.code}</div>
                <div class="info-item"><strong>Total Services:</strong> ${customer.services.length}</div>
              </div>

              <div class="section-title">Service History</div>
              <table class="services-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Date</th>
                    <th>Vehicle</th>
                    <th>Service</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${customer.services.map((service, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${service.date}</td>
                      <td>${service.car}</td>
                      <td>${service.service}</td>
                      <td>Rs ${service.amount}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="total-section">
                <div class="total-amount">Total: Rs ${customer.services.reduce((sum, s) => sum + s.amount, 0)}</div>
              </div>
            </div>

            <div class="footer">
              <div>📞 +92-3331385571</div>
              <div>🌐 facebook.com/zbautocare</div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(invoiceContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Lead Sheet
          </h1>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <Input
              placeholder="Search by name, contact, or customer code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Customer Table */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">All Customers ({filteredCustomers.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Contact</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Total Services</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Recent Visit</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map(customer => (
                    <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3 text-sm font-mono">{customer.code}</td>
                      <td className="p-3 text-sm font-medium">{customer.name}</td>
                      <td className="p-3 text-sm">{customer.contact}</td>
                      <td className="p-3 text-sm">{customer.services.length}</td>
                      <td className="p-3 text-sm">
                        {new Date(customer.recentVisitDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setShowHistoryDialog(true);
                          }}
                          className="flex items-center gap-1"
                        >
                          <FileText className="h-3 w-3" />
                          History
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-muted-foreground italic">
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Service History - {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Customer Code</div>
                  <div className="font-semibold">{selectedCustomer.code}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Contact</div>
                  <div className="font-semibold">{selectedCustomer.contact}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Services</div>
                  <div className="font-semibold">{selectedCustomer.services.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Recent Visit</div>
                  <div className="font-semibold">
                    {new Date(selectedCustomer.recentVisitDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-sm font-medium">Date</th>
                      <th className="text-left p-2 text-sm font-medium">Vehicle</th>
                      <th className="text-left p-2 text-sm font-medium">Service</th>
                      <th className="text-left p-2 text-sm font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomer.services
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((service, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="p-2 text-sm">{service.date}</td>
                          <td className="p-2 text-sm">{service.car}</td>
                          <td className="p-2 text-sm">{service.service}</td>
                          <td className="p-2 text-sm font-medium">Rs {service.amount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                <div className="text-sm font-medium">Total Amount</div>
                <div className="text-lg font-bold">
                  Rs {selectedCustomer.services.reduce((sum, s) => sum + s.amount, 0)}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => generateServiceHistory(selectedCustomer)} className="flex-1">
                  Print Service History
                </Button>
                <Button variant="outline" onClick={() => setShowHistoryDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadSheet;
