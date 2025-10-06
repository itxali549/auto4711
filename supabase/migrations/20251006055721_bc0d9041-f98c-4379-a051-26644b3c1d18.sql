-- Add new columns to employees table
ALTER TABLE public.employees 
ADD COLUMN salary_type TEXT NOT NULL DEFAULT 'monthly' CHECK (salary_type IN ('monthly', 'daily', 'mixed')),
ADD COLUMN daily_wage DECIMAL(10, 2),
ADD COLUMN weekly_off_day TEXT CHECK (weekly_off_day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'));

-- Drop the old daily_salary computed column
ALTER TABLE public.employees DROP COLUMN daily_salary;

-- Update existing records to have salary_type
UPDATE public.employees SET salary_type = 'monthly' WHERE salary_type IS NULL;