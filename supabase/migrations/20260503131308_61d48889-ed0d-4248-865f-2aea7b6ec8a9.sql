
-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  role TEXT,
  quote TEXT NOT NULL,
  link TEXT,
  photo_url TEXT,
  video_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
ON public.testimonials FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed real testimonials
INSERT INTO public.testimonials (author, role, quote, link, featured, display_order) VALUES
('Ankur Warikoo', 'Entrepreneur, Content Creator & Author · 3M+ followers', 'Socioverse looks quite cool.', NULL, true, 1),
('Mradul Sharma', 'Founder, Akima Films', 'Socioverse is sick.', NULL, true, 2),
('Norton Wong', 'Founder, Alveek AI & Flow', 'He exceeded every expectation and delivered work that was more polished, disciplined, and thoughtful than many senior developers I have worked with.', 'https://www.upnrunning.in/reviews', true, 3),
('Rohit Iyyer', 'Founder, Clients Forge', 'I told him what my vision was and he made it into a reality within 24 hours — his speed and explanations are insane.', 'https://www.upnrunning.in/reviews', true, 4),
('Karan Bhadauria', 'Founder, DJKC Studios', 'Anshul is fully immersed in the project — once we sit down, it''s all in or nothing, no middle ground.', 'https://www.upnrunning.in/reviews', true, 5),
('Utkarsh Bhatia', 'Founder, DJKC Studios', 'Anshul is exceptionally talented at understanding the project demand and quickly delivering it.', 'https://www.upnrunning.in/reviews', true, 6);

-- Courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  level TEXT DEFAULT 'Beginner',
  category TEXT,
  external_link TEXT,
  price TEXT,
  bullets TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active courses"
ON public.courses FOR SELECT
TO anon, authenticated
USING (active = true);

CREATE POLICY "Admins can read all courses"
ON public.courses FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage courses"
ON public.courses FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for testimonial media
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonial-media', 'testimonial-media', true);

CREATE POLICY "Anyone can view testimonial media"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonial-media');

CREATE POLICY "Admins can upload testimonial media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'testimonial-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update testimonial media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'testimonial-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonial media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'testimonial-media' AND has_role(auth.uid(), 'admin'::app_role));
