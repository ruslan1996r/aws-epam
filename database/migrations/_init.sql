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

CREATE TABLE IF NOT EXISTS public.users (
	name TEXT UNIQUE NOT NULL,
	password TEXT DEFAULT NULL,
	CONSTRAINT users_pk PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS public.carts (
	id uuid default gen_random_uuid(),
	created_at DATE DEFAULT NOW() NOT NULL,
	updated_at DATE DEFAULT NOW() NOT NULL,
	user_name TEXT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_name) 
		REFERENCES public.users(name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS public.cart_items (
	cart_id uuid NOT NULL,
	product_id uuid default gen_random_uuid(),
	count integer DEFAULT 0,
	CONSTRAINT cart_fk
		FOREIGN KEY (cart_id)
			REFERENCES public.carts(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS public.orders (
	id uuid default gen_random_uuid(),
	user_id text,
	cart_id uuid,
	payment JSON,
	delivery JSON,
	comments TEXT,
	status TEXT,
	total integer DEFAULT 0,
	CONSTRAINT cart_fk
		FOREIGN KEY (cart_id)
			REFERENCES public.carts(id) ON DELETE CASCADE ON UPDATE CASCADE
);
