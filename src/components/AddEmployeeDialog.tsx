import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type AddEmployeeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmployeeAdded: () => void;
};

export const AddEmployeeDialog = ({
  open,
  onOpenChange,
  onEmployeeAdded,
}: AddEmployeeDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    reason_for_hiring: '',
    monthly_salary: '',
  });
  const { toast } = useToast();

  const generateEmployeeCode = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { count } = await supabase
      .from('employees')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    const nextNumber = (count || 0) + 1;
    return `EMP${String(nextNumber).padStart(4, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const employeeCode = await generateEmployeeCode();

      const { error } = await supabase.from('employees').insert({
        user_id: user.id,
        employee_code: employeeCode,
        name: formData.name.trim(),
        role: formData.role.trim(),
        reason_for_hiring: formData.reason_for_hiring.trim() || null,
        monthly_salary: parseFloat(formData.monthly_salary),
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Employee ${formData.name} added with code ${employeeCode}`,
      });

      setFormData({
        name: '',
        role: '',
        reason_for_hiring: '',
        monthly_salary: '',
      });

      onEmployeeAdded();
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add employee',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Employee Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter employee name"
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role/Position *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Mechanic, Helper, Cleaner"
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly_salary">Monthly Salary (₹) *</Label>
            <Input
              id="monthly_salary"
              type="number"
              step="0.01"
              min="0"
              value={formData.monthly_salary}
              onChange={(e) => setFormData({ ...formData, monthly_salary: e.target.value })}
              placeholder="Enter monthly salary"
              required
            />
            {formData.monthly_salary && (
              <p className="text-sm text-muted-foreground">
                Daily Salary: ₹{(parseFloat(formData.monthly_salary) / 30).toFixed(2)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Hiring</Label>
            <Textarea
              id="reason"
              value={formData.reason_for_hiring}
              onChange={(e) => setFormData({ ...formData, reason_for_hiring: e.target.value })}
              placeholder="Optional: Why was this person hired?"
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Add Employee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
