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
import { User, Trash2, IndianRupee, Calendar } from 'lucide-react';

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

type EmployeeCardProps = {
  employee: Employee;
  onPaySalary: (employeeId: string, amount: number, paymentType: 'daily' | 'monthly') => void;
  onDelete: (employeeId: string) => void;
};

export const EmployeeCard = ({ employee, onPaySalary, onDelete }: EmployeeCardProps) => {
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
                {employee.employee_code}
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
            <span className="text-muted-foreground">Salary Type:</span>
            <Badge variant="secondary" className="text-xs">
              {employee.salary_type === 'mixed' ? 'Monthly + Daily' : 
               employee.salary_type === 'monthly' ? 'Monthly' : 'Daily Wage'}
            </Badge>
          </div>

          {(employee.salary_type === 'monthly' || employee.salary_type === 'mixed') && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Salary:</span>
              <span className="font-medium">PKR {employee.monthly_salary.toLocaleString('en-PK')}</span>
            </div>
          )}
          
          {(employee.salary_type === 'daily' || employee.salary_type === 'mixed') && employee.daily_wage && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {employee.salary_type === 'mixed' ? 'Daily Bonus:' : 'Daily Wage:'}
              </span>
              <span className="font-medium">PKR {employee.daily_wage.toLocaleString('en-PK')}</span>
            </div>
          )}

          {employee.weekly_off_day && employee.weekly_off_day !== 'none' && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weekly Off:</span>
              <span className="font-medium capitalize">{employee.weekly_off_day}</span>
            </div>
          )}

          {employee.reason_for_hiring && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                {employee.reason_for_hiring}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {employee.salary_type === 'monthly' && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onPaySalary(employee.id, employee.monthly_salary, 'monthly')}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Pay Monthly
            </Button>
          )}
          
          {employee.salary_type === 'daily' && employee.daily_wage && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onPaySalary(employee.id, employee.daily_wage!, 'daily')}
            >
              <IndianRupee className="h-3 w-3 mr-1" />
              Pay Daily
            </Button>
          )}

          {employee.salary_type === 'mixed' && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onPaySalary(employee.id, employee.daily_wage!, 'daily')}
              >
                <IndianRupee className="h-3 w-3 mr-1" />
                Daily
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => onPaySalary(employee.id, employee.monthly_salary, 'monthly')}
              >
                <Calendar className="h-3 w-3 mr-1" />
                Monthly
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
