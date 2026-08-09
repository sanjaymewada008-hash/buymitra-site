create table if not exists public.categories (
	id text primary key,
	name text not null,
	slug text not null unique,
	enabled boolean not null default true,
	subcategories jsonb not null default '[]'::jsonb
);

create table if not exists public.products (
	id text primary key,
	name text not null,
	sku text not null unique,
	brand text not null default 'BUYMITRA',
	category text not null references public.categories(id),
	subcategory text,
	short_description text,
	full_description text,
	price numeric(12,2) not null,
	mrp numeric(12,2) not null,
	stock integer not null default 0,
	low_stock_limit integer not null default 10,
	status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
	tags jsonb not null default '[]'::jsonb,
	variants jsonb not null default '[]'::jsonb,
	attributes jsonb not null default '{}'::jsonb,
	emoji text,
	accent text,
	image text,
	powder_image text,
	images jsonb not null default '[]'::jsonb,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.orders (
	id text primary key,
	customer_identifier text,
	items jsonb not null default '[]'::jsonb,
	subtotal numeric(12,2) not null default 0,
	total numeric(12,2) not null default 0,
	status text not null default 'pending',
	created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Public can read enabled categories" on public.categories;
create policy "Public can read enabled categories" on public.categories for select using (enabled = true);
drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products" on public.products for select using (status = 'published');

create index if not exists products_category_idx on public.products(category);
create index if not exists products_status_idx on public.products(status);
create index if not exists orders_created_at_idx on public.orders(created_at desc);