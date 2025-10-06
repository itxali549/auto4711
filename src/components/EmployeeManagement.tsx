import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2 } from 'lucide-react';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { EmployeeCard } from './EmployeeCard';

type Employee = {
  id: string;
  employee_code: string;
  name: string;
  role: string;
  reason_for_hiring: string | null;
  salary_type: 'monthly' | 'daily' | 'mixed';
  monthly_salary: number;
  daily_wage: number | null;
  weekly_off_day: string | null;
  is_active: boolean;
  created_at: string;
};

export const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchEmployees = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees((data || []) as Employee[]);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: 'Error',
        description: 'Failed to load employees',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeAdded = () => {
    fetchEmployees();
    setIsAddDialogOpen(false);
  };

  const handlePaySalary = async (employeeId: string, amount: number, paymentType: 'daily' | 'monthly') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const employee = employees.find(e => e.id === employeeId);
      if (!employee) throw new Error('Employee not found');

      // Record salary payment
      const { error: paymentError } = await supabase
        .from('salary_payments')
        .insert({
          user_id: user.id,
          employee_id: employeeId,
          amount,
          payment_type: paymentType,
          payment_date: new Date().toISOString().split('T')[0],
        });

      if (paymentError) throw paymentError;

      toast({
        title: 'Success',
        description: `${paymentType === 'daily' ? 'Daily' : 'Monthly'} salary of ₹${amount} paid to ${employee.name}`,
      });

      fetchEmployees();
    } catch (error) {
      console.error('Error paying salary:', error);
      toast({
        title: 'Error',
        description: 'Failed to process salary payment',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update({ is_active: false })
        .eq('id', employeeId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Employee removed successfully',
      });

      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove employee',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Employee Management</CardTitle>
            <Button onClick={() => setIsAddDialogOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {employees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No employees added yet</p>
              <p className="text-sm mt-2">Click "Add Employee" to get started</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onPaySalary={handlePaySalary}
                  onDelete={handleDeleteEmployee}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddEmployeeDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </>
  );
};
