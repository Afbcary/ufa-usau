#### people
- id bigint NOT NULL
- created_at timestamp with time zone
- updated_at timestamp with time zone
- deleted_at timestamp with time zone
- first_name text
- last_name text
- name text
- slug text
- hometown text

#### rosters
- id bigint NOT NULL
- created_at timestamp with time zone
- updated_at timestamp with time zone
- deleted_at timestamp with time zone
- seed integer
- team_id bigint
- team_slug text
- tournament_id bigint

#### tournaments
- id bigint NOT NULL
- created_at timestamp with time zone
- updated_at timestamp with time zone
- deleted_at timestamp with time zone
- name text
- url text
- slug text
- division smallint
- gender smallint
- date timestamp with time zone
- end_date timestamp with time zone
- city text
- state text

#### person_rosters
- person_id bigint NOT NULL
- roster_id bigint NOT NULL
- role text NOT NULL
- number text

#### teams
- id bigint NOT NULL
- created_at timestamp with time zone
- updated_at timestamp with time zone
- deleted_at timestamp with time zone
- name text
- nickname text
- slug text
- location text
- gender smallint
  - 2: womens
  - 1: mixed
  - 0: open
- division smallint
  - 1: club
- twitter text
- facebook text
- website text