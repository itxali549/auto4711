-- Create storage bucket for bill uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('bill-uploads', 'bill-uploads', false);

-- Create policies for bill uploads
CREATE POLICY "Users can upload their own bills" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own bills" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own bills" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own bills" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);