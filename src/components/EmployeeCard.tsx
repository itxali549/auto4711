import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { User, Trash2, IndianRupee, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type Employee = {
  id: string;
  name: string;
  role: string;
  salary: number;
  phone: string | null;
  email: string | null;
  is_active: boolean;
  created_at: string;
};

type SalaryPayment = {
  id: string;
  payment_date: string;
  amount: number;
  notes: string | null;
};

type EmployeeCardProps = {
  employee: Employee;
  onPaySalary: (employeeId: string, amount: number) => void;
  onDelete: (employeeId: string) => void;
};

export const EmployeeCard = ({ employee, onPaySalary, onDelete }: EmployeeCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [salaryPayments, setSalaryPayments] = useState<SalaryPayment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSalaryPayments();
    }
  }, [isOpen, employee.id]);

  const fetchSalaryPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('salary_payments')
        .select('*')
        .eq('employee_id', employee.id)
        .order('payment_date', { ascending: false });
      
      if (error) throw error;
      setSalaryPayments(data || []);
    } catch (error) {
      console.error('Error fetching salary payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-PK', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getCurrentMonthPayments = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return salaryPayments.filter(payment => {
      const paymentDate = new Date(payment.payment_date);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear;
    });
  };

  const currentMonthPayments = getCurrentMonthPayments();
  const totalPaidThisMonth = currentMonthPayments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{employee.name}</CardTitle>
              <Badge variant="outline" className="mt-1 text-xs">
                {employee.role}
              </Badge>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Employee?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove {employee.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(employee.id)}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Role:</span>
            <span className="font-medium">{employee.role}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Salary:</span>
            <span className="font-medium">PKR {Number(employee.salary).toLocaleString('en-PK')}</span>
          </div>

          {employee.phone && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{employee.phone}</span>
            </div>
          )}

          {employee.email && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{employee.email}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onPaySalary(employee.id, Number(employee.salary))}
          >
            <IndianRupee className="h-3 w-3 mr-1" />
            Pay Salary
          </Button>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full mt-2">
              <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              {isOpen ? 'Hide' : 'View'} Payment History
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            {loading ? (
              <p className="text-sm text-muted-foreground text-center py-2">Loading...</p>
            ) : (
              <>
                {currentMonthPayments.length > 0 && (
                  <div className="mb-3 p-2 bg-secondary/50 rounded-md">
                    <p className="text-xs font-medium text-muted-foreground">This Month's Total</p>
                    <p className="text-lg font-bold">PKR {totalPaidThisMonth.toLocaleString('en-PK')}</p>
                  </div>
                )}
                
                {salaryPayments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">No payments recorded</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {salaryPayments.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-2 bg-secondary/30 rounded text-sm">
                        <div>
                          <p className="font-medium">{formatDate(payment.payment_date)}</p>
                          {payment.notes && (
                            <p className="text-xs text-muted-foreground">{payment.notes}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">PKR {Number(payment.amount).toLocaleString('en-PK')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
