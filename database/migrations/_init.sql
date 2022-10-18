CREATE TABLE IF NOT EXISTS migrations (
  id SERIAL,
  file TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE extension if not exists pgcrypto;
SELECT gen_random_uuid();

CREATE TABLE IF NOT EXISTS public.products (
  id uuid default gen_random_uuid(),
  description text NULL,
	title text NOT NULL,
	price integer NULL,
	CONSTRAINT products_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.stocks (
	product_id uuid NOT NULL,
	count integer DEFAULT 0,
	CONSTRAINT stocks_fk 
		FOREIGN KEY (product_id) 
			REFERENCES public.products(id) ON DELETE CASCADE ON UPDATE CASCADE
);
