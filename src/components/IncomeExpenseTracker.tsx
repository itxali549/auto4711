import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent } from './ui/card';

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
}

// LocalStorage data structure: { 'YYYY-MM-DD': TrackerEntry[] }
type TrackerData = Record<string, TrackerEntry[]>;

const IncomeExpenseTracker: React.FC = () => {
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
    amount: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('zb-tracker-data');
    if (savedData) {
      setTrackerData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever trackerData changes
  useEffect(() => {
    localStorage.setItem('zb-tracker-data', JSON.stringify(trackerData));
  }, [trackerData]);

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
    const month = currentMonth.getMonth();
    return new Date(year, month, day).toISOString().split('T')[0];
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
    const customers = new Set<string>();
    Object.values(trackerData).forEach(entries => {
      entries.forEach(entry => {
        if (entry.type === 'income' && entry.customer) {
          customers.add(entry.customer);
        }
      });
    });
    return Array.from(customers);
  };

  // Handle date selection
  const handleDateClick = (day: number) => {
    const dateStr = getDateString(day);
    setSelectedDate(dateStr);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleAddEntry = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) return;

    const newEntry: TrackerEntry = {
      id: Date.now().toString(),
      type: entryType,
      amount: parseFloat(formData.amount),
      ...(entryType === 'income' && {
        customer: formData.customer,
        contact: formData.contact,
        car: formData.car,
        note: formData.note
      }),
      ...(entryType === 'expense' && {
        note: formData.note
      }),
      timestamp: Date.now()
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
      amount: ''
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

  // Generate invoice for income entries
  const handleInvoice = (entry: TrackerEntry) => {
    const invoiceContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="text-align: center; color: #bf7410;">ZB Tracker Invoice</h1>
        <div style="border: 1px solid #ccc; padding: 20px; margin: 20px 0;">
          <h3>Invoice Details</h3>
          <p><strong>Customer:</strong> ${entry.customer}</p>
          <p><strong>Contact:</strong> ${entry.contact}</p>
          <p><strong>Car:</strong> ${entry.car}</p>
          <p><strong>Note:</strong> ${entry.note}</p>
          <p><strong>Amount:</strong> $${entry.amount}</p>
          <p><strong>Date:</strong> ${selectedDate}</p>
        </div>
      </div>
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
      trackerData
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
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const monthlyStats = getMonthlyStats();
  const selectedDateEntries = trackerData[selectedDate] || [];
  const incomeEntries = selectedDateEntries.filter(entry => entry.type === 'income');
  const expenseEntries = selectedDateEntries.filter(entry => entry.type === 'expense');

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] h-screen">
        {/* Left Panel */}
        <div className="bg-card border-r border-border p-6 overflow-y-auto">
          {/* Brand Logo */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-start to-gold-end rounded-lg flex items-center justify-center mb-3 shadow-[var(--shadow-gold)]">
              <span className="text-2xl font-bold text-primary-foreground">ZB</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">ZB Tracker</h1>
            <p className="text-sm text-muted-foreground">Income & Expense • Single file</p>
          </div>

          {/* Calendar */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                >
                  ←
                </Button>
                <h3 className="font-semibold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                >
                  →
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-muted-foreground font-medium p-1">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="h-8"></div>;
                  }
                  
                  const dateStr = getDateString(day);
                  const isToday = dateStr === today;
                  const isSelected = dateStr === selectedDate;
                  const { hasIncome, hasExpense } = getDateIndicators(day);
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`h-8 text-xs rounded transition-all duration-200 relative ${
                        isToday
                          ? 'bg-gradient-to-br from-gold-start to-gold-end text-primary-foreground font-bold shadow-[var(--shadow-gold)]'
                          : isSelected
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-accent/50 text-foreground'
                      }`}
                    >
                      {day}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                        {hasIncome && <div className="w-1 h-1 bg-income rounded-full"></div>}
                        {hasExpense && <div className="w-1 h-1 bg-expense rounded-full"></div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card>
              <CardContent className="p-3">
                <div className="text-sm text-muted-foreground">Income</div>
                <div className="text-lg font-bold text-income">${monthlyStats.income}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-sm text-muted-foreground">Expense</div>
                <div className="text-lg font-bold text-expense">${monthlyStats.expense}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-sm text-muted-foreground">Profit</div>
                <div className={`text-lg font-bold ${monthlyStats.profit >= 0 ? 'text-income' : 'text-expense'}`}>
                  ${monthlyStats.profit}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-sm text-muted-foreground">Saved Dates</div>
                <div className="text-lg font-bold text-foreground">{monthlyStats.savedDates}</div>
              </CardContent>
            </Card>
          </div>

          {/* Customer List */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Customers</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleExport}>
                    Export
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <label htmlFor="import-file" className="cursor-pointer">
                      Import
                    </label>
                  </Button>
                  <input
                    id="import-file"
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImport}
                  />
                </div>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {getCustomers().map(customer => (
                  <div key={customer} className="text-sm text-muted-foreground p-1 rounded hover:bg-accent/50">
                    {customer}
                  </div>
                ))}
                {getCustomers().length === 0 && (
                  <div className="text-sm text-muted-foreground italic">No customers yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col">
          {/* Top Bar */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              <div className="flex gap-2">
                <Button onClick={() => setIsModalOpen(true)}>New Entry</Button>
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>View Day</Button>
                <Button variant="destructive" onClick={handleClearAll}>Clear All</Button>
              </div>
            </div>
          </div>

          {/* Day Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Income Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-income">Income Entries</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Customer</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Contact</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Car</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Note</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Charge</th>
                          <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incomeEntries.map(entry => (
                          <tr key={entry.id} className="border-b border-border">
                            <td className="p-3 text-sm">{entry.customer}</td>
                            <td className="p-3 text-sm">{entry.contact}</td>
                            <td className="p-3 text-sm">{entry.car}</td>
                            <td className="p-3 text-sm">{entry.note}</td>
                            <td className="p-3 text-sm font-medium text-income">${entry.amount}</td>
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
                          </tr>
                        ))}
                        {incomeEntries.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-6 text-center text-muted-foreground italic">
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
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-expense">Expense Entries</h3>
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
                            <td className="p-3 text-sm">{entry.note}</td>
                            <td className="p-3 text-sm font-medium text-expense">${entry.amount}</td>
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
            </div>

            {/* Tip Note */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Click on any calendar date to add new income or expense entries. 
                Use the Export feature to backup your data and Import to restore it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding/Viewing Entries */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Entry Type</label>
              <Select value={entryType} onValueChange={(value: 'income' | 'expense') => setEntryType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {entryType === 'income' && (
              <>
                <div>
                  <label className="text-sm font-medium">Customer</label>
                  <Input
                    value={formData.customer}
                    onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact</label>
                  <Input
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="Phone or email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Car</label>
                  <Input
                    value={formData.car}
                    onChange={(e) => setFormData(prev => ({ ...prev, car: e.target.value }))}
                    placeholder="Car details"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-medium">
                {entryType === 'income' ? 'Note' : 'Title'}
              </label>
              <Input
                value={formData.note}
                onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                placeholder={entryType === 'income' ? 'Additional notes' : 'Expense title'}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Amount ($)</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddEntry} className="flex-1">
                Add Entry
              </Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomeExpenseTracker;