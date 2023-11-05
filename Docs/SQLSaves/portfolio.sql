
-- Drop table

-- DROP TABLE portfolio.default_variables;

CREATE TABLE portfolio.default_variables (
	id uuid NOT NULL DEFAULT "GoTest".uuid_generate_v4(),
	s_name varchar NOT NULL,
	CONSTRAINT default_variables_pk PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE portfolio.projects;

CREATE TABLE portfolio.projects (
	id uuid NOT NULL DEFAULT "GoTest".uuid_generate_v4(),
	"name" varchar NOT NULL DEFAULT ''::character varying,
	link_location varchar NOT NULL DEFAULT ''::character varying,
	short_description varchar NOT NULL DEFAULT ''::character varying,
	image_link varchar NOT NULL DEFAULT ''::character varying,
	place int4 NULL,
	CONSTRAINT projects_pk PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE portfolio.css_variables;

CREATE TABLE portfolio.css_variables (
	id uuid NOT NULL DEFAULT "GoTest".uuid_generate_v4(),
	s_name varchar NOT NULL DEFAULT ''::character varying,
	s_value varchar NOT NULL DEFAULT ''::character varying,
	id_project uuid NOT NULL,
	CONSTRAINT css_variables_pk PRIMARY KEY (id),
	CONSTRAINT css_variables_fk FOREIGN KEY (id_project) REFERENCES portfolio.projects(id)
);
