create table if not exists book_series (
  id uuid primary key default gen_random_uuid(),
  title_th text,
  title_jp text,
  title_en text,
  category text not null,
  thai_publisher text,
  jp_publisher text,
  cover_image_url text,
  latest_volume_th integer default 0,
  latest_volume_jp integer default 0,
  created_at timestamptz default now()
);

create table if not exists book_volumes (
  id uuid primary key default gen_random_uuid(),
  series_id uuid references book_series(id) on delete cascade,
  volume_no integer not null,
  isbn text,
  title text,
  cover_image_url text,
  release_date date,
  source text,
  created_at timestamptz default now(),
  unique (series_id, volume_no)
);

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  name text not null
);

create table if not exists storages (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references locations(id) on delete cascade,
  name text not null
);

create table if not exists shelves (
  id uuid primary key default gen_random_uuid(),
  storage_id uuid references storages(id) on delete cascade,
  name text not null,
  sort_order integer default 0
);

create table if not exists borrowers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  note text
);

create table if not exists my_books (
  id uuid primary key default gen_random_uuid(),
  book_volume_id uuid references book_volumes(id) on delete cascade,
  quantity integer default 1,
  shelf_id uuid references shelves(id),
  status text default 'AVAILABLE',
  borrower_id uuid references borrowers(id),
  note text,
  created_at timestamptz default now()
);

create index if not exists book_series_title_th_idx on book_series using gin (to_tsvector('simple', coalesce(title_th, '')));
create index if not exists book_series_title_en_idx on book_series using gin (to_tsvector('simple', coalesce(title_en, '')));
create index if not exists book_volumes_isbn_idx on book_volumes (isbn);
create index if not exists my_books_status_idx on my_books (status);
