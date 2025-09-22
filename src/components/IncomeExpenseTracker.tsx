import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import logoImage from '../assets/zb-autocare-logo.jpg';

// Data structure for tracker entries
interface TrackerEntry {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  customer?: string;
  contact?: string;
  car?: string;
  note?: string;
  timestamp: number;
  customerCode?: string;
  customerSource?: string;
  newCustomerDiscount?: {
    eligible: boolean;
    used: boolean;
    applied: boolean;
  };
}

// Customer data structure
interface Customer {
  code: string;
  name: string;
  phone: string;
  totalEntries: number;
  totalAmount: number;
}

// LocalStorage data structure: { 'YYYY-MM-DD': TrackerEntry[] }
type TrackerData = Record<string, TrackerEntry[]>;

const IncomeExpenseTracker: React.FC = () => {
  const { userRole, signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [trackerData, setTrackerData] = useState<TrackerData>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryType, setEntryType] = useState<'income' | 'expense'>('income');
  const [formData, setFormData] = useState({
    customer: '',
    contact: '',
    car: '',
    note: '',
    amount: '',
    customerSource: ''
  });
  const [customerDiscountData, setCustomerDiscountData] = useState<Record<string, { eligible: boolean; used: boolean; applied: boolean }>>({});
  const [customerCodes, setCustomerCodes] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Customer | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [monthlySearchQuery, setMonthlySearchQuery] = useState('');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('zb-tracker-data');
    const savedCodes = localStorage.getItem('zb-customer-codes');
    if (savedData) {
      setTrackerData(JSON.parse(savedData));
    }
    if (savedCodes) {
      setCustomerCodes(JSON.parse(savedCodes));
    }
  }, []);

  // Save data to localStorage whenever trackerData changes
  useEffect(() => {
    localStorage.setItem('zb-tracker-data', JSON.stringify(trackerData));
  }, [trackerData]);

  // Save customer codes to localStorage
  useEffect(() => {
    localStorage.setItem('zb-customer-codes', JSON.stringify(customerCodes));
  }, [customerCodes]);

  // Load and save customer discount data
  useEffect(() => {
    const savedDiscountData = localStorage.getItem('zb-customer-discounts');
    if (savedDiscountData) {
      setCustomerDiscountData(JSON.parse(savedDiscountData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('zb-customer-discounts', JSON.stringify(customerDiscountData));
  }, [customerDiscountData]);

  // Generate unique customer code and check if new customer
  const generateCustomerCode = (customerName: string, phone: string): { code: string; isNewCustomer: boolean } => {
    const key = `${customerName}-${phone}`.toLowerCase();
    if (customerCodes[key]) {
      return { code: customerCodes[key], isNewCustomer: false };
    }
    
    const code = `ZB${String(Object.keys(customerCodes).length + 1).padStart(4, '0')}`;
    setCustomerCodes(prev => ({ ...prev, [key]: code }));
    
    // Initialize discount data for new customer
    setCustomerDiscountData(prev => ({
      ...prev,
      [key]: { eligible: true, used: false, applied: false }
    }));
    
    return { code, isNewCustomer: true };
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  // Get date string in YYYY-MM-DD format
  const getDateString = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1; // Fix: add 1 since getMonth() returns 0-11
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = month.toString().padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  };

  // Check if a date has income or expense entries
  const getDateIndicators = (day: number) => {
    const dateStr = getDateString(day);
    const entries = trackerData[dateStr] || [];
    const hasIncome = entries.some(entry => entry.type === 'income');
    const hasExpense = entries.some(entry => entry.type === 'expense');
    return { hasIncome, hasExpense };
  };

  // Calculate monthly summary
  const getMonthlyStats = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    let totalIncome = 0;
    let totalExpense = 0;
    let savedDates = 0;

    Object.entries(trackerData).forEach(([dateStr, entries]) => {
      const entryDate = new Date(dateStr);
      if (entryDate.getFullYear() === year && entryDate.getMonth() === month) {
        if (entries.length > 0) savedDates++;
        entries.forEach(entry => {
          if (entry.type === 'income') {
            totalIncome += entry.amount;
          } else {
            totalExpense += entry.amount;
          }
        });
      }
    });

    return {
      income: totalIncome,
      expense: totalExpense,
      profit: totalIncome - totalExpense,
      savedDates
    };
  };

  // Get unique customers from income entries
  const getCustomers = () => {
    const customers: Record<string, Customer> = {};
    
    Object.entries(trackerData).forEach(([date, entries]) => {
      entries.forEach(entry => {
        if (entry.type === 'income' && entry.customer && entry.contact) {
          const key = `${entry.customer}-${entry.contact}`;
          if (!customers[key]) {
            customers[key] = {
              code: entry.customerCode || '',
              name: entry.customer,
              phone: entry.contact,
              totalEntries: 0,
              totalAmount: 0
            };
          }
          customers[key].totalEntries++;
          customers[key].totalAmount += entry.amount;
        }
      });
    });
    
    return Object.values(customers);
  };

  // Handle date click
  const handleDateClick = (day: number) => {
    const dateStr = getDateString(day);
    setSelectedDate(dateStr);
  };

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  // Add new entry
  const handleAddEntry = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) return;

    let customerCode = '';
    let customerDiscount = undefined;
    
    if (entryType === 'income' && formData.customer && formData.contact) {
      const { code, isNewCustomer } = generateCustomerCode(formData.customer, formData.contact);
      customerCode = code;
      
      const customerKey = `${formData.customer}-${formData.contact}`.toLowerCase();
      const discountData = customerDiscountData[customerKey];
      
      if (discountData) {
        customerDiscount = {
          eligible: discountData.eligible,
          used: discountData.used,
          applied: discountData.applied
        };
      }
    }

    const newEntry: TrackerEntry = {
      id: Date.now().toString(),
      type: entryType,
      amount: parseFloat(formData.amount),
      customer: formData.customer,
      contact: formData.contact,
      car: formData.car,
      note: formData.note,
      timestamp: Date.now(),
      customerCode,
      customerSource: formData.customerSource,
      newCustomerDiscount: customerDiscount
    };

    setTrackerData(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEntry]
    }));

    // Reset form
    setFormData({
      customer: '',
      contact: '',
      car: '',
      note: '',
      amount: '',
      customerSource: ''
    });
    setEntryType('income');
  };

  // Delete entry
  const handleDeleteEntry = (entryId: string) => {
    setTrackerData(prev => ({
      ...prev,
      [selectedDate]: (prev[selectedDate] || []).filter(entry => entry.id !== entryId)
    }));
  };

  // Clear all entries for selected date
  const handleClearAll = () => {
    setTrackerData(prev => ({
      ...prev,
      [selectedDate]: []
    }));
  };

  // Search customer by code or phone
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    let foundCustomer: Customer | null = null;

    // Search through all entries to find customer history
    const customerEntries: TrackerEntry[] = [];
    Object.entries(trackerData).forEach(([date, entries]) => {
      entries.forEach(entry => {
        if (entry.type === 'income') {
          const matchesCode = entry.customerCode?.toLowerCase() === query;
          const matchesPhone = entry.contact?.toLowerCase().includes(query);
          
          if (matchesCode || matchesPhone) {
            customerEntries.push({ ...entry, timestamp: new Date(date).getTime() });
            if (!foundCustomer) {
              foundCustomer = {
                code: entry.customerCode || '',
                name: entry.customer || '',
                phone: entry.contact || '',
                totalEntries: 0,
                totalAmount: 0
              };
            }
          }
        }
      });
    });

    if (foundCustomer && customerEntries.length > 0) {
      foundCustomer.totalEntries = customerEntries.length;
      foundCustomer.totalAmount = customerEntries.reduce((sum, entry) => sum + entry.amount, 0);
      setSearchResults(foundCustomer);
      setShowInvoice(true);
    } else {
      setSearchResults(null);
    }
  };

  // Generate invoice for income entries
  const handleInvoice = (entry: TrackerEntry) => {
    const invoiceContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #f6cf92, #bf7410); }
            .invoice-container { max-width: 800px; margin: 0 auto; background: #fff3e0; border-radius: 20px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f6cf92, #bf7410); padding: 30px; position: relative; }
            .header::after { content: ''; position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: #bf7410; border-radius: 50% 0 0 50%; }
            .logo { font-size: 28px; font-weight: bold; color: #333; }
            .subtitle { color: #666; font-size: 14px; }
            .invoice-info { position: absolute; top: 30px; right: 30px; text-align: right; z-index: 2; }
            .invoice-number { font-size: 18px; font-weight: bold; color: #333; }
            .dates { font-size: 14px; color: #666; margin-top: 10px; }
            .content { padding: 30px; }
            .section-title { font-size: 16px; font-weight: bold; color: #bf7410; margin: 20px 0 10px 0; border-bottom: 2px solid #bf7410; padding-bottom: 5px; }
            .customer-info, .vehicle-info { margin: 20px 0; }
            .info-item { margin: 5px 0; font-size: 14px; }
            .services-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .services-table th { background: #bf7410; color: white; padding: 15px; text-align: left; border-radius: 10px 10px 0 0; }
            .services-table td { padding: 15px; border-bottom: 1px solid #ddd; }
            .services-table tr:nth-child(even) { background: #f9f9f9; }
            .total-section { text-align: right; margin: 30px 0; }
            .total-amount { background: #bf7410; color: white; padding: 15px 30px; border-radius: 25px; display: inline-block; font-size: 18px; font-weight: bold; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; }
            .contact-info { display: flex; justify-content: space-around; align-items: center; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="logo">ZB AUTOCARE</div>
              <div class="subtitle">خدمات سیارے میں</div>
              <div class="invoice-info">
                <div class="invoice-number">INVOICE NO.: ${entry.customerCode || 'N/A'}</div>
                <div class="dates">
                  <div>Date of Issue: ${selectedDate}</div>
                  <div>Due Date: ${new Date(Date.now() + 17*24*60*60*1000).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            
            <div class="content">
              <div class="section-title">Customer Information</div>
              <div class="customer-info">
                <div class="info-item"><strong>Name:</strong> ${entry.customer}</div>
                <div class="info-item"><strong>Phone:</strong> ${entry.contact}</div>
              </div>

              <div class="section-title">Vehicle Information</div>
              <div class="vehicle-info">
                <div class="info-item"><strong>Make/Model:</strong> ${entry.car}</div>
              </div>

              <table class="services-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Service / Repair</th>
                    <th>Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>${entry.note}</td>
                    <td>Rs ${entry.amount}</td>
                  </tr>
                </tbody>
              </table>

              <div class="total-section">
                <div class="total-amount">Total Amount: Rs ${entry.amount}</div>
              </div>

              <div style="margin-top: 40px;">
                <div><strong>Payment Method:</strong> JazzCash / Cash</div>
                <div><strong>Name:</strong> Zulfaqar Ali</div>
                <div><strong>Account No:</strong> 03002846528</div>
              </div>

              <div style="margin-top: 30px;">
                <div><strong>Notes</strong></div>
                <ul style="margin: 10px 0;">
                  <li>Includes labor fees only where applicable.</li>
                  <li>For questions, contact our service +92-3331385571</li>
                </ul>
              </div>

              <div style="text-align: right; margin-top: 40px; border-top: 2px solid #333; padding-top: 20px;">
                <div>Service Manager</div>
              </div>
            </div>

            <div class="footer">
              <div class="contact-info">
                <div>📞 +92-3331385571</div>
                <div>🌐 facebook.com/zbautocare</div>
              </div>
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

  // Generate invoice for customer history
  const generateCustomerInvoice = () => {
    if (!searchResults) return;

    const query = searchQuery.toLowerCase().trim();
    const customerEntries: (TrackerEntry & { date: string })[] = [];
    
    Object.entries(trackerData).forEach(([date, entries]) => {
      entries.forEach(entry => {
        if (entry.type === 'income') {
          const matchesCode = entry.customerCode?.toLowerCase() === query;
          const matchesPhone = entry.contact?.toLowerCase().includes(query);
          
          if (matchesCode || matchesPhone) {
            customerEntries.push({ ...entry, date });
          }
        }
      });
    });

    const invoiceContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #f6cf92, #bf7410); }
            .invoice-container { max-width: 800px; margin: 0 auto; background: #fff3e0; border-radius: 20px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f6cf92, #bf7410); padding: 30px; position: relative; }
            .header::after { content: ''; position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: #bf7410; border-radius: 50% 0 0 50%; }
            .logo { font-size: 28px; font-weight: bold; color: #333; }
            .subtitle { color: #666; font-size: 14px; }
            .invoice-info { position: absolute; top: 30px; right: 30px; text-align: right; z-index: 2; }
            .invoice-number { font-size: 18px; font-weight: bold; color: #333; }
            .dates { font-size: 14px; color: #666; margin-top: 10px; }
            .content { padding: 30px; }
            .section-title { font-size: 16px; font-weight: bold; color: #bf7410; margin: 20px 0 10px 0; border-bottom: 2px solid #bf7410; padding-bottom: 5px; }
            .customer-info, .vehicle-info { margin: 20px 0; }
            .info-item { margin: 5px 0; font-size: 14px; }
            .services-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .services-table th { background: #bf7410; color: white; padding: 15px; text-align: left; border-radius: 10px 10px 0 0; }
            .services-table td { padding: 15px; border-bottom: 1px solid #ddd; }
            .services-table tr:nth-child(even) { background: #f9f9f9; }
            .total-section { text-align: right; margin: 30px 0; }
            .total-amount { background: #bf7410; color: white; padding: 15px 30px; border-radius: 25px; display: inline-block; font-size: 18px; font-weight: bold; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; }
            .contact-info { display: flex; justify-content: space-around; align-items: center; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="logo">ZB AUTOCARE</div>
              <div class="subtitle">خدمات سیارے میں</div>
              <div class="invoice-info">
                <div class="invoice-number">CUSTOMER HISTORY: ${searchResults.code}</div>
                <div class="dates">
                  <div>Generated: ${new Date().toLocaleDateString()}</div>
                  <div>Total Entries: ${searchResults.totalEntries}</div>
                </div>
              </div>
            </div>
            
            <div class="content">
              <div class="section-title">Customer Information</div>
              <div class="customer-info">
                <div class="info-item"><strong>Name:</strong> ${searchResults.name}</div>
                <div class="info-item"><strong>Phone:</strong> ${searchResults.phone}</div>
                <div class="info-item"><strong>Customer Code:</strong> ${searchResults.code}</div>
              </div>

              <table class="services-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Service / Repair</th>
                    <th>Date</th>
                    <th>Charges</th>
                  </tr>
                </thead>
                <tbody>
                  ${customerEntries.map((entry, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${entry.note || 'Service'} ${entry.car ? `(${entry.car})` : ''}</td>
                      <td>${entry.date}</td>
                      <td>Rs ${entry.amount}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="total-section">
                <div class="total-amount">Total Amount: Rs ${searchResults.totalAmount}</div>
              </div>

              <div style="margin-top: 40px;">
                <div><strong>Payment Method:</strong> JazzCash / Cash</div>
                <div><strong>Name:</strong> Zulfaqar Ali</div>
                <div><strong>Account No:</strong> 03002846528</div>
              </div>

              <div style="margin-top: 30px;">
                <div><strong>Notes</strong></div>
                <ul style="margin: 10px 0;">
                  <li>Complete customer service history.</li>
                  <li>For questions, contact our service +92-3331385571</li>
                </ul>
              </div>

              <div style="text-align: right; margin-top: 40px; border-top: 2px solid #333; padding-top: 20px;">
                <div>Service Manager</div>
              </div>
            </div>

            <div class="footer">
              <div class="contact-info">
                <div>📞 +92-3331385571</div>
                <div>🌐 facebook.com/zbautocare</div>
              </div>
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

  // Export data
  const handleExport = () => {
    const dataToExport = {
      customers: getCustomers(),
      trackerData,
      customerCodes
    };
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'zb-tracker-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import data
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (importedData.trackerData) {
            setTrackerData(importedData.trackerData);
          }
          if (importedData.customerCodes) {
            setCustomerCodes(importedData.customerCodes);
          }
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle viewing day entries
  const handleViewDay = () => {
    const entries = trackerData[selectedDate] || [];
    if (entries.length === 0) {
      alert('No entries found for this date.');
      return;
    }
    
    // You could open a modal or navigate to a detailed view
    console.log('Day entries:', entries);
  };

  const today = new Date().toISOString().split('T')[0];
  const monthlyStats = getMonthlyStats();
  const selectedDateEntries = trackerData[selectedDate] || [];
  const incomeEntries = selectedDateEntries.filter(entry => entry.type === 'income');
  const expenseEntries = selectedDateEntries.filter(entry => entry.type === 'expense');
  
  // Calculate daily totals for selected date
  const dailyIncome = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const dailyExpense = expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const grossDailyProfit = dailyIncome - dailyExpense;
  const marketingBudget = Math.max(0, grossDailyProfit * 0.2); // 20% of profit, only if profit is positive
  const dailyProfit = grossDailyProfit - marketingBudget;

  // Filter entries based on monthly search
  const getFilteredMonthlyEntries = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    let filteredEntries: (TrackerEntry & { date: string })[] = [];

    Object.entries(trackerData).forEach(([dateStr, entries]) => {
      const entryDate = new Date(dateStr);
      if (entryDate.getFullYear() === year && entryDate.getMonth() === month) {
        entries.forEach(entry => {
          if (!monthlySearchQuery || 
              entry.customer?.toLowerCase().includes(monthlySearchQuery.toLowerCase()) ||
              entry.note?.toLowerCase().includes(monthlySearchQuery.toLowerCase()) ||
              entry.car?.toLowerCase().includes(monthlySearchQuery.toLowerCase()) ||
              entry.contact?.toLowerCase().includes(monthlySearchQuery.toLowerCase())) {
            filteredEntries.push({ ...entry, date: dateStr });
          }
        });
      }
    });

    return filteredEntries;
  };

  const filteredMonthlyEntries = getFilteredMonthlyEntries();

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] min-h-screen">
        {/* Left Panel */}
        <div className="bg-card border-r border-border p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
          {/* Brand Logo */}
          <div className="flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="ZB Autocare Logo" 
              className="w-24 h-24 object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ZB Tracker
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                  {userRole}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => signOut()}
                  className="h-8 w-8 p-0"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Income & Expense • Single file</p>
          </div>

          {/* Search Bar */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Customer Search</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Enter customer code or phone number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch} className="w-full">
                  Search Customer
                </Button>
                {searchResults && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <div className="text-sm space-y-1">
                      <div><strong>Code:</strong> {searchResults.code}</div>
                      {userRole !== 'staff' && (
                        <>
                          <div><strong>Name:</strong> {searchResults.name}</div>
                          <div><strong>Phone:</strong> {searchResults.phone}</div>
                        </>
                      )}
                      {userRole === 'owner' && (
                        <div><strong>Total Amount:</strong> Rs {searchResults.totalAmount}</div>
                      )}
                    </div>
                    {userRole === 'owner' && (
                      <Button
                        onClick={generateCustomerInvoice}
                        className="w-full mt-2"
                        size="sm"
                      >
                        Print History Invoice
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  ←
                </button>
                <h3 className="font-semibold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  →
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-xs font-medium text-muted-foreground mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center p-1">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="p-2"></div>;
                  }
                  
                  const dateStr = getDateString(day);
                  const isToday = dateStr === today;
                  const isSelected = dateStr === selectedDate;
                  const { hasIncome, hasExpense } = getDateIndicators(day);
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`p-2 text-sm rounded-lg border transition-all relative ${
                        isToday
                          ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg'
                          : isSelected
                          ? 'bg-primary/20 border-primary'
                          : 'hover:bg-muted border-transparent'
                      }`}
                    >
                      {day}
                      <div className="flex gap-1 justify-center mt-1">
                        {hasIncome && <div className="w-1 h-1 bg-primary rounded-full"></div>}
                        {hasExpense && <div className="w-1 h-1 bg-destructive rounded-full"></div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          {userRole === 'owner' && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Card>
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground">Income</div>
                  <div className="font-bold text-income">Rs {monthlyStats.income}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground">Expense</div>
                  <div className="font-bold text-expense">Rs {monthlyStats.expense}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground">Profit</div>
                  <div className={`font-bold ${monthlyStats.profit >= 0 ? 'text-income' : 'text-expense'}`}>
                    Rs {monthlyStats.profit}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground">Saved Dates</div>
                  <div className="font-bold">{monthlyStats.savedDates}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Customer List */}
          {userRole !== 'staff' && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Customer List</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {getCustomers().slice(0, 5).map((customer, index) => (
                    <div key={index} className="text-sm p-2 bg-muted rounded">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {customer.code} • {userRole === 'owner' ? customer.phone : ''}
                      </div>
                    </div>
                  ))}
                </div>
                {userRole === 'owner' && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={handleExport}>
                      Export
                    </Button>
                    <label className="cursor-pointer">
                      <Button size="sm" variant="outline" asChild>
                        <span>Import</span>
                      </Button>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Main */}
        <div className="flex flex-col">
          {/* Top Bar */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
              </div>
              
              {/* Monthly Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                <Input
                  placeholder="Search monthly entries..."
                  value={monthlySearchQuery}
                  onChange={(e) => setMonthlySearchQuery(e.target.value)}
                  className="w-full sm:w-64"
                />
                <div className="flex gap-2">
                  {(userRole === 'owner' || userRole === 'editor') && (
                    <Button onClick={() => setIsModalOpen(true)} size="sm">
                      New Entry
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleViewDay} size="sm">
                    View Day
                  </Button>
                  {userRole === 'owner' && (
                    <Button variant="destructive" onClick={handleClearAll} size="sm">
                      Clear All
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Day Panel */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {/* Daily Summary */}
            {userRole === 'owner' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Daily Income</div>
                    <div className="text-xl font-bold text-income">Rs {dailyIncome}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Daily Expense</div>
                    <div className="text-xl font-bold text-expense">Rs {dailyExpense}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Marketing Budget</div>
                    <div className="text-xl font-bold text-orange-600">Rs {marketingBudget.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground mt-1">20% of gross profit</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Net Profit</div>
                    <div className={`text-xl font-bold ${dailyProfit >= 0 ? 'text-income' : 'text-expense'}`}>
                      Rs {dailyProfit.toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">After marketing budget</div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div className="space-y-6">
              {/* Income Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-income">Income Table</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Customer</th>
                          {userRole !== 'staff' && <th className="text-left p-3 text-sm font-medium text-muted-foreground">Contact</th>}
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Car</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Note</th>
                          {userRole === 'owner' && <th className="text-left p-3 text-sm font-medium text-muted-foreground">Charge</th>}
                          {userRole === 'owner' && <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {incomeEntries.map(entry => (
                          <tr key={entry.id} className="border-b border-border">
                            <td className="p-3 text-sm">{entry.customer}</td>
                            {userRole !== 'staff' && <td className="p-3 text-sm">{entry.contact}</td>}
                            <td className="p-3 text-sm">{entry.car}</td>
                            <td className="p-3 text-sm">{entry.note}</td>
                            {userRole === 'owner' && <td className="p-3 text-sm font-medium text-income">Rs {entry.amount}</td>}
                            {userRole === 'owner' && (
                              <td className="p-3">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => handleInvoice(entry)}>
                                    Invoice
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDeleteEntry(entry.id)}>
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                        {incomeEntries.length === 0 && (
                          <tr>
                            <td colSpan={userRole === 'owner' ? 6 : userRole === 'staff' ? 3 : 4} className="p-6 text-center text-muted-foreground italic">
                              No income entries for this date
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Expense Table */}
              {userRole === 'owner' && (
                <Card>
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-expense">Expense Table</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">Title</th>
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">Charge</th>
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenseEntries.map(entry => (
                            <tr key={entry.id} className="border-b border-border">
                              <td className="p-3 text-sm">{entry.note || 'Expense'}</td>
                              <td className="p-3 text-sm font-medium text-expense">Rs {entry.amount}</td>
                              <td className="p-3">
                                <Button size="sm" variant="destructive" onClick={() => handleDeleteEntry(entry.id)}>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {expenseEntries.length === 0 && (
                            <tr>
                              <td colSpan={3} className="p-6 text-center text-muted-foreground italic">
                                No expense entries for this date
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Monthly Search Results */}
            {monthlySearchQuery && (
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Search Results for "{monthlySearchQuery}"</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {filteredMonthlyEntries.map((entry, index) => (
                      <div key={`${entry.date}-${entry.id}`} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {entry.type === 'income' ? `${entry.customer} - ${entry.note}` : entry.note}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {entry.date} • {entry.type === 'income' ? entry.contact : ''}
                            </div>
                          </div>
                          <div className={`font-medium ${entry.type === 'income' ? 'text-income' : 'text-expense'}`}>
                            Rs {entry.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredMonthlyEntries.length === 0 && (
                      <div className="text-center text-muted-foreground italic py-4">
                        No entries found for "{monthlySearchQuery}"
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tip Note */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground italic">
                💡 Tip: Click on any date to add entries. Use the search bar to find customer history by code or phone number.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Entry Modal */}
      {(userRole === 'owner' || userRole === 'editor') && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Entry - {selectedDate}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={entryType} onValueChange={(value: 'income' | 'expense') => setEntryType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  {userRole === 'owner' && <SelectItem value="expense">Expense</SelectItem>}
                </SelectContent>
              </Select>

            {entryType === 'income' && (
              <>
                <Input
                  placeholder="Customer Name"
                  value={formData.customer}
                  onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                />
                <Input
                  placeholder="Contact/Phone"
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                />
                <Input
                  placeholder="Car Details"
                  value={formData.car}
                  onChange={(e) => setFormData(prev => ({ ...prev, car: e.target.value }))}
                />
              </>
            )}

            <Input
              placeholder={entryType === 'income' ? 'Service Note' : 'Expense Title'}
              value={formData.note}
              onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
            />

            {/* Customer Source Radio Buttons for Income */}
            {entryType === 'income' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  How did customer find us?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Google Search', 'Facebook Post', 'Referral (by someone)', 'Walk-in'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 text-sm">
                      <input
                        type="radio"
                        name="customerSource"
                        value={option}
                        checked={formData.customerSource === option}
                        onChange={(e) => setFormData(prev => ({ ...prev, customerSource: e.target.value }))}
                        className="text-primary"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* New Customer Discount Section */}
            {entryType === 'income' && formData.customer && formData.contact && (() => {
              const customerKey = `${formData.customer}-${formData.contact}`.toLowerCase();
              const discountData = customerDiscountData[customerKey];
              const isNewCustomer = !customerCodes[customerKey];
              const showDiscount = isNewCustomer || (discountData && discountData.eligible && !discountData.used);
              
              if (showDiscount) {
                return (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎉</span>
                      <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                        New Customer - 10% Discount Available!
                      </h4>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      This customer is eligible for a 10% new customer discount
                    </p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          const key = `${formData.customer}-${formData.contact}`.toLowerCase();
                          setCustomerDiscountData(prev => ({
                            ...prev,
                            [key]: { eligible: true, used: true, applied: true }
                          }));
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Discount Given
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const key = `${formData.customer}-${formData.contact}`.toLowerCase();
                          setCustomerDiscountData(prev => ({
                            ...prev,
                            [key]: { eligible: true, used: false, applied: false }
                          }));
                        }}
                      >
                        Not Given
                      </Button>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            <Input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            />

            <div className="flex gap-2">
              <Button onClick={handleAddEntry} className="flex-1">
                Add Entry
              </Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      )}
    </div>
  );
};

export default IncomeExpenseTracker;