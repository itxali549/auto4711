# ZB AutoCare Income & Expense Tracker - Complete Recreation Prompt

## Project Overview
Create a full-stack Income & Expense Tracker application for ZB AutoCare, an auto service business. The app manages daily income/expense entries, customer data, service history, invoicing, and business analytics. It uses React + TypeScript + Tailwind CSS + Supabase (Lovable Cloud) with role-based authentication.

---

## 1. AUTHENTICATION & USER ROLES

### Supabase Setup
1. Enable Lovable Cloud with Supabase
2. Create a `user_roles` table:
```sql
CREATE TABLE public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TYPE app_role AS ENUM ('owner', 'editor', 'staff');

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Owners can view all roles" ON public.user_roles
  FOR SELECT USING (has_role(auth.uid(), 'owner'::app_role));

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Helper function
CREATE OR REPLACE FUNCTION has_role(user_id UUID, check_role app_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = $1 AND user_roles.role = $2
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

3. Create a storage bucket for bill uploads:
```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('bill-uploads', 'bill-uploads', false);

-- Storage RLS policies
CREATE POLICY "Users can view their own bills" ON storage.objects
  FOR SELECT USING (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own bills" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### Auth Context (`src/contexts/AuthContext.tsx`)
Create an AuthContext that:
- Manages user authentication state
- Fetches user role from `user_roles` table
- Provides `signIn()` and `signOut()` functions
- Exposes `user`, `loading`, and `userRole` to the app
- Defaults to 'staff' role if no role is found
- Sets loading to false immediately to show login form without delay

### Login Component (`src/components/Login.tsx`)
- Display ZB AutoCare logo (from `src/assets/zb-autocare-logo.jpg`)
- Email and password input fields
- "Sign In" button with loading state
- Error message display
- Card-based centered layout with gradient background

### App Structure (`src/App.tsx`)
- Wrap app in `AuthProvider`
- Show loading spinner while checking auth
- Show Login component if not authenticated
- Show main app (IncomeExpenseTracker) if authenticated
- Include Toaster components for notifications

---

## 2. DESIGN SYSTEM

### Color Scheme (Dark Theme with Gold Accents)
Define in `src/index.css`:
```css
:root {
  --background: 222 24% 8%;
  --foreground: 210 40% 98%;
  --card: 222 20% 12%;
  --card-foreground: 210 40% 98%;
  --primary: 45 84% 60%; /* Gold */
  --primary-foreground: 222 47% 11%;
  --secondary: 222 16% 18%;
  --secondary-foreground: 210 40% 98%;
  --muted: 222 16% 18%;
  --muted-foreground: 215 20% 65%;
  --destructive: 0 63% 31%;
  --border: 222 16% 18%;
  --gold-start: 45 84% 76%;
  --gold-end: 40 75% 37%;
  --gold-gradient: linear-gradient(135deg, hsl(var(--gold-start)), hsl(var(--gold-end)));
  --income: 45 84% 60%; /* Gold for income */
  --expense: 0 75% 55%; /* Red for expense */
}
```

### Tailwind Config
Extend with custom colors in `tailwind.config.ts`:
- income: "hsl(var(--income))"
- expense: "hsl(var(--expense))"
- gold.start and gold.end

---

## 3. DATA STRUCTURES & STORAGE

### LocalStorage Keys
- `zb-tracker-data`: Main tracker data
- `zb-customer-codes`: Customer code mappings
- `zb-customer-discounts`: Discount eligibility data

### TrackerEntry Interface
```typescript
interface TrackerEntry {
  id: string;
  type: 'income' | 'expense' | 'monthly-income' | 'monthly-expense' | 'marketing';
  amount: number;
  customer?: string;
  contact?: string;
  car?: string;
  note?: string;
  timestamp: number;
  customerCode?: string;
  customerSource?: string;
  billFile?: {
    name: string;
    path: string;
    url: string;
  };
  newCustomerDiscount?: {
    eligible: boolean;
    used: boolean;
    applied: boolean;
  };
  monthYear?: string; // For monthly entries: "YYYY-MM"
}
```

### TrackerData Structure
```typescript
type TrackerData = Record<string, TrackerEntry[]>; // { 'YYYY-MM-DD': TrackerEntry[] }
```

---

## 4. MAIN TRACKER COMPONENT

### Layout (Two-Panel Design)
**Left Panel (340px fixed width):**
- ZB AutoCare logo (24x24, rounded)
- Header with title "ZB Tracker" and user role badge
- Logout button
- Customer Search section
- Monthly Summary Card showing:
  - Total Income (gold color)
  - Total Expense (red color)
  - Gross Profit
  - Marketing Budget (20% of gross profit if positive)
  - Net Profit
  - Saved Dates count
- Calendar grid for current month
- Month navigation (< Previous | Month Year | Next >)
- Quick Actions:
  - "Monthly Income" button (owner/editor only)
  - "Monthly Expense" button (owner/editor only)
  - "Marketing Budget" button (owner/editor only)
  - "Lead Sheet" button (owner only) with Users icon
- Export/Import buttons (owner only)

**Right Panel (Main Content Area):**
- Selected date display with color indicators
- Daily summary for selected date:
  - Daily Income
  - Daily Expense
  - Gross Daily Profit
  - Marketing Budget (20%)
  - Net Daily Profit
- Add Entry buttons (Income/Expense) - owner/editor only
- Income entries table
- Marketing Budget entries table (when entries exist)
- Expense entries table
- Monthly search with filter input
- Monthly entries listing

### Calendar Features
- Grid layout (7 columns for days of week)
- Each day shows:
  - Day number
  - Income indicator (gold dot if has income)
  - Expense indicator (red dot if has expense)
- Today highlighted with gold gradient border
- Selected date has primary background
- Click day to select it

### Customer Code Generation
- Format: `ZB0001`, `ZB0002`, etc.
- Generate unique code for each new customer (based on name + phone)
- Store in localStorage as `customerName-phoneNumber` key mapping

---

## 5. ENTRY MANAGEMENT

### Daily Income Entry Form Fields:
- Customer Name (required, auto-capitalize words)
- Contact (required, exactly 11 digits, numeric only)
- Car/Vehicle (auto-capitalize words)
- Service/Note (auto-capitalize words)
- Amount (required, number)
- Customer Source (dropdown: Direct, Facebook, Instagram, WhatsApp, Referral, Other)
- Bill Upload (optional, image file to Supabase storage)

### Daily Expense Entry Form Fields:
- Note/Description (auto-capitalize words)
- Amount (required, number)
- Bill Upload (optional, image file to Supabase storage)

### Monthly Entry Form Fields:
- Type: Monthly Income or Monthly Expense
- Note/Description (auto-capitalize words)
- Amount (required, number)
- Bill Upload (optional)
- **No Limit**: Users can add multiple monthly income and monthly expense entries
- Stored with `monthYear` field as "YYYY-MM"
- Added to the 1st day of the month in tracker data

### Marketing Budget Entry Form Fields:
- Description (auto-capitalize words) - e.g., "Buying Shirts", "Installing Billboard"
- Amount (required, number)
- Bill Upload (optional)
- Added to selected date in tracker data
- Type: 'marketing'

### Input Validation Rules:
1. **Auto-Capitalize**: Customer, Car, and Note fields auto-capitalize first letter of every word
2. **Contact Field**: 
   - Exactly 11 digits
   - Strip non-numeric characters
   - Disable submit button if not exactly 11 digits
   - maxLength={11}
3. **Amount**: Must be positive number

### File Upload to Supabase
- Upload to `bill-uploads` bucket
- Path: `{user_id}/{timestamp}.{ext}`
- Generate signed URL (1 year expiry) for storage
- When viewing, generate fresh signed URL (1 hour expiry)
- Store billFile object with name, path, and url

---

## 6. CUSTOMER SEARCH & INVOICING

### Customer Search
- Search by customer code (e.g., "ZB0001"), phone number, or customer name
- Display results showing:
  - Customer Code
  - Customer Name
  - Phone Number
  - Total Entries
  - Total Amount
- "Generate Invoice" button to print complete customer history

### Invoice Generation (Two Types)

**1. Single Entry Invoice** (triggered from income entry row)
HTML template with:
- Header: "ZB AUTOCARE" logo with Urdu subtitle "خدمات سیارے میں"
- Gold gradient background (#f6cf92 to #bf7410)
- Invoice number (customer code)
- Date of Issue and Due Date (17 days from today)
- Customer Information section
- Vehicle Information section
- Services table with S.NO, Service/Repair, Charges
- Total Amount in gold badge
- Payment Method: JazzCash / Cash
- Account details: Name: Zulfaqar Ali, Account: 03002846528
- Notes section
- Footer with phone (+92-3331385571) and Facebook link
- Print on window.open()

**2. Customer History Invoice** (from search results)
Same template but:
- Shows all services for that customer
- Multiple rows in services table with dates
- Total across all services
- Generated date instead of due date

---

## 7. LEAD SHEET FEATURE

### Separate Component (`src/components/LeadSheet.tsx`)
- Accessible via "Lead Sheet" button (owner only)
- Shows all customers from income entries
- **Always sorted alphabetically by name**

### Columns:
1. **ID**: Customer Code (e.g., ZB0001)
2. **Name**: Customer name
3. **Contact**: Phone number
4. **Total Services**: Count of service visits
5. **Recent Visit**: Most recent service date
6. **Actions**: "History" button

### Search Functionality:
- Search by name, contact, or customer code
- Real-time filtering

### Service History Dialog:
When clicking "History" button:
- Show customer details (code, contact, total services, recent visit)
- Table of all services with Date, Vehicle, Service, Amount
- Sorted by date (newest first)
- Total amount calculation
- "Print Service History" button

### Service History Print Template:
Similar to invoice but:
- Title: "Customer Information"
- Full service history table
- Total services count
- Complete service breakdown

---

## 8. MONTHLY ANALYTICS

### Calculations:
1. **Total Income**: Sum all income + monthly-income for current month
2. **Total Expense**: Sum all expense + monthly-expense for current month
3. **Gross Profit**: Income - Expense
4. **Marketing Budget**: Sum of all 'marketing' type entries for current month
5. **Net Profit**: Gross Profit - Marketing Budget
6. **Saved Dates**: Count of dates with at least one entry

### Marketing Budget Section:
- Separate entry type: 'marketing'
- Users can add multiple marketing expenses per day/month
- Examples: Buying shirts, Installing billboards, etc.
- Tracked separately from general expenses
- Displays in its own table when entries exist
- Affects Net Profit calculation

### Monthly Search/Filter:
- Input field to filter entries by customer, note, car, or contact
- Shows filtered results from current month
- Displays in a list with date, type, customer, amount

---

## 9. DATA IMPORT/EXPORT

### Export Feature (Owner only):
- Creates JSON file with:
  - customers array
  - trackerData object
  - customerCodes object
- Downloads as `zb-tracker-export.json`

### Import Feature (Owner only):
- File input to select JSON file
- Reads and parses JSON
- Merges trackerData and customerCodes into state
- Updates localStorage

---

## 10. ROLE-BASED PERMISSIONS

### Owner Role:
- Full access to all features
- Can add/delete income and expense entries
- Can add monthly entries
- Can access Lead Sheet
- Can export/import data
- Can view all analytics

### Editor Role:
- Can add/delete income and expense entries
- Can add monthly entries
- Can search customers
- Can generate invoices
- Cannot access Lead Sheet
- Cannot export/import data

### Staff Role:
- View-only access
- Can search customers
- Can view entries
- Cannot add/delete entries
- Cannot access Lead Sheet
- Cannot export/import

---

## 11. UI/UX DETAILS

### Icons (from lucide-react):
- LogOut: Logout button
- Upload: File upload
- Eye: View bill image
- FileImage: Bill indicator
- Users: Lead Sheet button
- Trash2: Delete entry
- Download: Export button
- Upload: Import button
- FileText: History button in Lead Sheet

### Responsive Design:
- Two-column layout on large screens (lg:grid-cols-[340px_1fr])
- Single column on mobile (stack left panel above right panel)
- Horizontal scroll for tables on mobile
- Touch-friendly button sizes

### Loading States:
- File upload shows loading indicator
- Disable buttons during operations
- Show spinner during authentication check

### Color Indicators:
- Income: Gold color (hsl(var(--income)))
- Expense: Red color (hsl(var(--expense)))
- Profit: Green if positive, red if negative
- Marketing Budget: Muted gold

### Bill Image Viewing:
- Dialog with full-screen image display
- Shows bill name in dialog title
- Fetches fresh signed URL when opening

---

## 12. SPECIFIC BUSINESS LOGIC

### Marketing Budget Calculation:
- Sum of all 'marketing' type entries
- Tracked separately as individual expenses
- Can add unlimited marketing entries
- Examples: shirts, billboards, ads, etc.
- Net profit = Gross profit - Marketing budget

### New Customer Discount Tracking:
- Store discount eligibility in localStorage
- Track if discount was used and applied
- Stored per customer (key: name-phone)
- Initial state: { eligible: true, used: false, applied: false }

### Date Handling:
- All dates in YYYY-MM-DD format
- Monthly entries stored on 1st of month
- monthYear field for monthly entries: "YYYY-MM"
- Recent visit = latest date with service entry

---

## 13. ESSENTIAL FILES TO CREATE

1. **src/contexts/AuthContext.tsx** - Authentication context
2. **src/components/Login.tsx** - Login form
3. **src/components/IncomeExpenseTracker.tsx** - Main tracker component
4. **src/components/LeadSheet.tsx** - Lead sheet feature
5. **src/App.tsx** - App wrapper with routing
6. **src/pages/Index.tsx** - Main page (renders IncomeExpenseTracker)
7. **src/index.css** - Design system with colors
8. **tailwind.config.ts** - Extended Tailwind config
9. **src/assets/zb-autocare-logo.jpg** - Company logo (create/provide)

---

## 14. TECHNICAL REQUIREMENTS

### Dependencies (already in Lovable):
- React 18
- TypeScript
- Tailwind CSS
- @supabase/supabase-js
- lucide-react (icons)
- shadcn/ui components
- date-fns (for date handling)

### Shadcn Components Used:
- Button
- Input
- Select
- Dialog
- Card
- Alert
- Label
- Separator
- Toaster

### Browser Storage:
- localStorage for all tracker data (client-side only)
- Supabase Storage for bill images only
- No database tables for tracker entries (all in localStorage)

---

## 15. STYLING GUIDELINES

### Use Semantic Tokens:
- NEVER use direct colors like `text-white`, `bg-white`, `text-black`
- ALWAYS use design system tokens:
  - `text-foreground`, `bg-background`
  - `text-primary`, `bg-primary`
  - `text-muted-foreground`, `bg-muted`
  - `border-border`
  - `text-income`, `text-expense`

### Gradients:
- Primary gradient: `bg-gradient-to-r from-primary to-accent`
- Gold gradient: Use for income indicators
- Background: Dark theme with subtle gradients

### Borders & Shadows:
- Card borders: `border-border`
- Rounded corners: Use Tailwind's rounded utilities
- Shadows: subtle on cards

---

## 16. PRINT INVOICE STYLING

All invoices use inline HTML/CSS with:
- Body background: linear-gradient(135deg, #f6cf92, #bf7410)
- Container: max-width 800px, #fff3e0 background, rounded 20px
- Header: Gold gradient with logo
- Content: 30px padding
- Tables: Full width, collapsed borders
- Table headers: #bf7410 background, white text
- Footer: #333 background, white text
- Contact info: Centered with icons (📞 🌐)
- Opens in new window with window.open() and auto-triggers print()

---

## 17. EDGE CASES & VALIDATION

1. **Empty States**:
   - Show "No entries found" for empty dates
   - Show "No customers found" in Lead Sheet search
   - Show "No results" for customer search

2. **No Duplicate Restrictions**:
   - Users can add unlimited monthly income and expense entries
   - Users can add unlimited marketing budget entries

3. **File Upload Errors**:
   - Handle upload failures gracefully
   - Show error if file upload fails
   - Don't block entry creation if upload fails

4. **Date Boundaries**:
   - Handle month navigation correctly
   - Handle year boundaries in calendar

5. **Number Formatting**:
   - Display amounts with "Rs" prefix
   - Show negative profits in red

---

## 18. ADDITIONAL FEATURES NOTES

### Customer Source Tracking:
Dropdown options:
- Direct
- Facebook
- Instagram
- WhatsApp
- Referral
- Other

### View Bill Feature:
- Eye icon button next to entries with bills
- Opens dialog with image
- Generates fresh signed URL (1 hour expiry)

### Delete Functionality:
- Trash icon on each entry (owner/editor only)
- No confirmation dialog (direct delete)
- Updates localStorage immediately

### Clear All:
- Button to clear all entries for selected date
- Owner/editor only

---

## FINAL NOTES

This app is designed for a single-user auto service business with optional multi-user support. All business data is stored locally in the browser's localStorage, making it fast and offline-capable. Supabase is only used for authentication, user roles, and bill image storage.

The color scheme is professional with gold accents representing quality auto service. The dark theme reduces eye strain during long work sessions. All invoices are designed to be printable and professional-looking for customer distribution.

Focus on data persistence, user role enforcement, and smooth UX with proper loading states and validation. Make the calendar intuitive, the search fast, and the invoice generation seamless.
