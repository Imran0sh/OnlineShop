-- Таблица товаров
create table public.products (
  id             bigint primary key,
  slug           text not null unique,
  model          text not null,
  year           integer not null,
  type           text not null check (type in ('Gravel', 'Road', 'City', 'MTB')),
  price          integer not null check (price >= 0),
  image          text[] not null default '{}',
  description    text not null,
  purpose        text[] not null default '{}',
  specifications jsonb not null default '{}',
  sizes          text[] not null default '{}',
  created_at     timestamptz not null default now()
);

-- Включаем защиту строк (без политик доступ закрыт всем)
alter table public.products enable row level security;

-- Разрешаем всем только ЧТЕНИЕ
create policy "Anyone can read products"
  on public.products
  for select
  to anon, authenticated
  using (true);
