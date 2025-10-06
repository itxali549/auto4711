-- Create employees table
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  employee_code TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  reason_for_hiring TEXT,
  monthly_salary DECIMAL(10, 2) NOT NULL,
  daily_salary DECIMAL(10, 2) GENERATED ALWAYS AS (monthly_salary / 30) STORED,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, employee_code)
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for employees
CREATE POLICY "Users can view their own employees"
ON public.employees
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own employees"
ON public.employees
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own employees"
ON public.employees
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own employees"
ON public.employees
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_employee_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_employee_updated_at_column();

-- Create salary_payments table to track salary payments
CREATE TABLE public.salary_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('daily', 'monthly', 'advance')),
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for salary_payments
ALTER TABLE public.salary_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for salary_payments
CREATE POLICY "Users can view their own salary payments"
ON public.salary_payments
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own salary payments"
ON public.salary_payments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_employees_user_id ON public.employees(user_id);
CREATE INDEX idx_employees_active ON public.employees(user_id, is_active);
CREATE INDEX idx_salary_payments_user_id ON public.salary_payments(user_id);
CREATE INDEX idx_salary_payments_employee_id ON public.salary_payments(employee_id);