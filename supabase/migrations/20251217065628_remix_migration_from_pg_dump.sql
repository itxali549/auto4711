CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql" WITH SCHEMA "pg_catalog";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'user'
);


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.employees (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    salary numeric DEFAULT 0 NOT NULL,
    phone text,
    email text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: marketing_expenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.marketing_expenses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    title text NOT NULL,
    amount numeric NOT NULL,
    category text,
    expense_date date DEFAULT CURRENT_DATE NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: salary_payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.salary_payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    employee_id uuid NOT NULL,
    amount numeric NOT NULL,
    payment_date date DEFAULT CURRENT_DATE NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role DEFAULT 'user'::public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: marketing_expenses marketing_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marketing_expenses
    ADD CONSTRAINT marketing_expenses_pkey PRIMARY KEY (id);


--
-- Name: salary_payments salary_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salary_payments
    ADD CONSTRAINT salary_payments_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: employees update_employees_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: employees employees_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: marketing_expenses marketing_expenses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.marketing_expenses
    ADD CONSTRAINT marketing_expenses_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: salary_payments salary_payments_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salary_payments
    ADD CONSTRAINT salary_payments_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- Name: salary_payments salary_payments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.salary_payments
    ADD CONSTRAINT salary_payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: employees Users can delete their own employees; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own employees" ON public.employees FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: marketing_expenses Users can delete their own marketing expenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own marketing expenses" ON public.marketing_expenses FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: salary_payments Users can delete their own salary payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own salary payments" ON public.salary_payments FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: employees Users can insert their own employees; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own employees" ON public.employees FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: marketing_expenses Users can insert their own marketing expenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own marketing expenses" ON public.marketing_expenses FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: salary_payments Users can insert their own salary payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own salary payments" ON public.salary_payments FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: employees Users can update their own employees; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own employees" ON public.employees FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: marketing_expenses Users can update their own marketing expenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own marketing expenses" ON public.marketing_expenses FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: salary_payments Users can update their own salary payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own salary payments" ON public.salary_payments FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: employees Users can view their own employees; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own employees" ON public.employees FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: marketing_expenses Users can view their own marketing expenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own marketing expenses" ON public.marketing_expenses FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: salary_payments Users can view their own salary payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own salary payments" ON public.salary_payments FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: employees; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

--
-- Name: marketing_expenses; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.marketing_expenses ENABLE ROW LEVEL SECURITY;

--
-- Name: salary_payments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.salary_payments ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


