import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MarketingExpense {
  id: string;
  expense_date: string;
  title: string;
  amount: number;
  notes: string | null;
  category: string | null;
}

interface MarketingBudgetProps {
  monthlyMarketingBudget: number;
  currentMonth: Date;
}

const MarketingBudget: React.FC<MarketingBudgetProps> = ({ monthlyMarketingBudget, currentMonth }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<MarketingExpense[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    amount: '',
    notes: ''
  });

  // Load marketing expenses for current month
  useEffect(() => {
    loadExpenses();
  }, [currentMonth]);

  const loadExpenses = async () => {
    if (!user) return;

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

    const { data, error } = await supabase
      .from('marketing_expenses')
      .select('*')
      .eq('user_id', user.id)
      .gte('expense_date', startDate)
      .lte('expense_date', endDate)
      .order('expense_date', { ascending: false });

    if (error) {
      console.error('Error loading marketing expenses:', error);
      toast({
        title: 'Error',
        description: 'Failed to load marketing expenses',
        variant: 'destructive'
      });
      return;
    }

    setExpenses(data || []);
  };

  const handleAddExpense = async () => {
    if (!user || !formData.title || !formData.amount || parseFloat(formData.amount) <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields with valid values',
        variant: 'destructive'
      });
      return;
    }

    const { error } = await supabase
      .from('marketing_expenses')
      .insert([{
        user_id: user.id,
        expense_date: formData.date,
        title: formData.title,
        amount: parseFloat(formData.amount),
        notes: formData.notes || null
      }]);

    if (error) {
      console.error('Error adding marketing expense:', error);
      toast({
        title: 'Error',
        description: 'Failed to add marketing expense',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Marketing expense added successfully'
    });

    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      amount: '',
      notes: ''
    });
    setIsAddModalOpen(false);
    loadExpenses();
  };

  const handleDeleteExpense = async (id: string) => {
    const { error } = await supabase
      .from('marketing_expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting marketing expense:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete marketing expense',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Marketing expense deleted successfully'
    });

    loadExpenses();
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const remainingBudget = monthlyMarketingBudget - totalSpent;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{monthlyMarketingBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">20% of monthly profit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹{totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{expenses.length} entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-primary' : 'text-destructive'}`}>
              ₹{remainingBudget.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {remainingBudget >= 0 ? 'Available' : 'Over budget'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Marketing Expenses</h3>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {expenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No marketing expenses recorded for this month
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.expense_date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell className="font-semibold">₹{Number(expense.amount).toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {expense.notes || '-'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Marketing Expense</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Title *</label>
              <Input
                placeholder="e.g., Facebook Ads, Google Ads"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Amount (₹) *</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Additional details about this expense"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExpense}>
                Add Expense
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketingBudget;
