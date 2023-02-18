CREATE TABLE todo
(
    id          serial not null,
    title       varchar(128),
    description text,
    due_to_date timestamp,
    done        boolean,
    created_at  timestamp,
    created_by  varchar(32),
    primary key (id)
);

create index todo_title_idx on todo (title);
create index todo_description_idx on todo (description);
create index todo_created_by_idx on todo (created_by);
create index todo_done_idx on todo (done);