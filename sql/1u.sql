-- first migration file moving up in the migration history

-- add an extension to the database that will allow to use the citext datatype
create extension if not exists citext;

create table if not exists public.users (
    id bigserial primary key,
    username citext unique not null,
    password text,  -- will be stored password hash, never store a password in plain text
    avatar text,
    is_admin boolean default false,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

-- create the post table
create table if not exists public.posts (
    id bigserial primary key,
    user_id bigint references public.users (id),
    content text,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

-- create the follows table
create table if not exists public.follows(
    user_id bigint not null references public.users (id),
    follower_id bigint not null references public.users (id),
    created_at timestamp default now(),
    updated_at timestamp default now(),
    unique(user_id, follower_id)
);

-- create indexes
create index posts_user_id_index on public.posts (user_id);  -- by putting index on user_id, this should improve performance
create index follows_user_id_index on public.follows (user_id);
create index follows_follower_id_index on public.follows (follower_id);