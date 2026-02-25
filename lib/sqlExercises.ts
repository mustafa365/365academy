// ─── Database schemas ──────────────────────────────────────────────────────

export const MOVIES_DB = `
CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT,
  year INTEGER,
  length_minutes INTEGER
);
INSERT INTO movies VALUES
  (1,  'Toy Story',           'John Lasseter',  1995, 81),
  (2,  'A Bug''s Life',       'John Lasseter',  1998, 95),
  (3,  'Toy Story 2',         'John Lasseter',  1999, 93),
  (4,  'Monsters, Inc.',      'Pete Docter',    2001, 92),
  (5,  'Finding Nemo',        'Andrew Stanton', 2003, 107),
  (6,  'The Incredibles',     'Brad Bird',      2004, 116),
  (7,  'Cars',                'John Lasseter',  2006, 117),
  (8,  'Ratatouille',         'Brad Bird',      2007, 111),
  (9,  'WALL-E',              'Andrew Stanton', 2008, 98),
  (10, 'Up',                  'Pete Docter',    2009, 101),
  (11, 'Toy Story 3',         'Lee Unkrich',    2010, 103),
  (12, 'Cars 2',              'John Lasseter',  2011, 120),
  (13, 'Brave',               'Brenda Chapman', 2012, 102),
  (14, 'Monsters University', 'Dan Scanlon',    2013, 110);
`;

export const MOVIES_BOXOFFICE_DB = `
CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT,
  year INTEGER,
  length_minutes INTEGER
);
CREATE TABLE IF NOT EXISTS boxoffice (
  movie_id INTEGER PRIMARY KEY,
  rating REAL,
  domestic_sales INTEGER,
  international_sales INTEGER
);
INSERT INTO movies VALUES
  (1,  'Toy Story',           'John Lasseter',  1995, 81),
  (2,  'A Bug''s Life',       'John Lasseter',  1998, 95),
  (3,  'Toy Story 2',         'John Lasseter',  1999, 93),
  (4,  'Monsters, Inc.',      'Pete Docter',    2001, 92),
  (5,  'Finding Nemo',        'Andrew Stanton', 2003, 107),
  (6,  'The Incredibles',     'Brad Bird',      2004, 116),
  (7,  'Cars',                'John Lasseter',  2006, 117),
  (8,  'Ratatouille',         'Brad Bird',      2007, 111),
  (9,  'WALL-E',              'Andrew Stanton', 2008, 98),
  (10, 'Up',                  'Pete Docter',    2009, 101),
  (11, 'Toy Story 3',         'Lee Unkrich',    2010, 103),
  (12, 'Cars 2',              'John Lasseter',  2011, 120),
  (13, 'Brave',               'Brenda Chapman', 2012, 102),
  (14, 'Monsters University', 'Dan Scanlon',    2013, 110);
INSERT INTO boxoffice VALUES
  (5,  8.2, 380843261,  555900000),
  (14, 7.4, 268492764,  475066843),
  (8,  8.0, 206445654,  417277164),
  (12, 6.2, 191452396,  368400000),
  (3,  7.9, 245852179,  239163000),
  (6,  8.0, 261441092,  370001000),
  (9,  8.5, 223808164,  297503696),
  (11, 8.4, 415004880,  648167031),
  (1,  8.3, 191796233,  170162503),
  (7,  7.2, 244082982,  217900167),
  (10, 8.3, 293004164,  438338580),
  (4,  8.1, 289916256,  272900000),
  (2,  7.2, 162798565,  200600000),
  (13, 7.2, 237283207,  301700000);
`;

export const EMPLOYEES_DB = `
CREATE TABLE IF NOT EXISTS buildings (
  building_name TEXT PRIMARY KEY,
  capacity INTEGER
);
CREATE TABLE IF NOT EXISTS employees (
  role TEXT,
  name TEXT,
  building TEXT,
  years_employed INTEGER
);
INSERT INTO buildings VALUES
  ('1e', 24), ('1w', 32), ('2e', 16), ('2w', 20);
INSERT INTO employees VALUES
  ('Engineer', 'Becky A.',   '1e', 4),
  ('Engineer', 'Dan B.',     '1e', 2),
  ('Engineer', 'Sharon F.',  '1e', 6),
  ('Engineer', 'Dan M.',     '1e', 4),
  ('Engineer', 'Malcom S.',  '1e', 1),
  ('Artist',   'Tylar S.',   '2w', 2),
  ('Artist',   'Sherman D.', '2w', 8),
  ('Artist',   'Jakob J.',   '2w', 6),
  ('Artist',   'Lillia A.',  '2w', 7),
  ('Artist',   'Brandon J.', '2w', 7),
  ('Manager',  'Scott K.',   '1e', 9),
  ('Manager',  'Shirlee M.', '1e', 3),
  ('Manager',  'Daria O.',   '2w', 6),
  ('Engineer', 'Yancy I.',   NULL, 0),
  ('Artist',   'Oliver P.',  NULL, 0);
`;

export const CITIES_DB = `
CREATE TABLE IF NOT EXISTS north_american_cities (
  city TEXT,
  country TEXT,
  population INTEGER,
  latitude REAL,
  longitude REAL
);
INSERT INTO north_american_cities VALUES
  ('Guadalajara', 'Mexico', 1500800, 20.659699, -103.349609),
  ('Toronto',     'Canada', 2795060, 43.653226, -79.383184),
  ('Houston',     'USA',    2195914, 29.760427, -95.369803),
  ('New York',    'USA',    8405837, 40.712784, -74.005941),
  ('Philadelphia','USA',    1553165, 39.952584, -75.165222),
  ('Havana',      'Cuba',   2106146, 23.054070, -82.345189),
  ('Mexico City', 'Mexico', 8555500, 19.432608, -99.133208),
  ('Phoenix',     'USA',    1513367, 33.448377, -112.074037),
  ('Los Angeles', 'USA',    3884307, 34.052234, -118.243685),
  ('Ecatepec de Morelos', 'Mexico', 1742000, 19.601841, -99.050674),
  ('Montreal',    'Canada', 1717767, 45.501689, -73.567256),
  ('Chicago',     'USA',    2718782, 41.878114, -87.629798);
`;

// ─── Exercise type ─────────────────────────────────────────────────────────

export type Exercise = {
  id: string;
  prompt: string;
  hint?: string;
  checkSql: string;
};

export type LessonExercises = {
  database: string;
  exercises: Exercise[];
};

// ─── Exercises mapped by lesson ID ────────────────────────────────────────

export const EXERCISES: Record<string, LessonExercises> = {
  // Lesson 2 — SELECT basics
  "sql-l2": {
    database: MOVIES_DB,
    exercises: [
      {
        id: "l2-e1",
        prompt: "Find the title of each Pixar film.",
        hint: "Use SELECT with the 'title' column.",
        checkSql: "SELECT title FROM movies;",
      },
      {
        id: "l2-e2",
        prompt: "Find the director of each Pixar film.",
        hint: "Select only the 'director' column.",
        checkSql: "SELECT director FROM movies;",
      },
      {
        id: "l2-e3",
        prompt: "Find the title and director of each film.",
        hint: "Select two columns separated by a comma.",
        checkSql: "SELECT title, director FROM movies;",
      },
      {
        id: "l2-e4",
        prompt: "Find the title and year of each film.",
        hint: "Select the 'title' and 'year' columns.",
        checkSql: "SELECT title, year FROM movies;",
      },
      {
        id: "l2-e5",
        prompt: "Find ALL information about each film.",
        hint: "Use the * wildcard to select every column.",
        checkSql: "SELECT * FROM movies;",
      },
    ],
  },

  // Lesson 3 — WHERE (numbers)
  "sql-l3": {
    database: MOVIES_DB,
    exercises: [
      {
        id: "l3-e1",
        prompt: "Find the movie with id = 6.",
        hint: "Use WHERE id = 6",
        checkSql: "SELECT * FROM movies WHERE id = 6;",
      },
      {
        id: "l3-e2",
        prompt: "Find movies released between 2000 and 2010 (inclusive).",
        hint: "Use BETWEEN ... AND ...",
        checkSql: "SELECT * FROM movies WHERE year BETWEEN 2000 AND 2010;",
      },
      {
        id: "l3-e3",
        prompt: "Find movies NOT released between 2000 and 2010.",
        hint: "Use NOT BETWEEN",
        checkSql: "SELECT * FROM movies WHERE year NOT BETWEEN 2000 AND 2010;",
      },
      {
        id: "l3-e4",
        prompt: "Find the first 5 Pixar movies — show title and year only.",
        hint: "Use WHERE id <= 5, or LIMIT 5",
        checkSql: "SELECT title, year FROM movies WHERE id <= 5;",
      },
    ],
  },

  // Lesson 4 — ORDER BY / DISTINCT / LIMIT
  "sql-l4": {
    database: MOVIES_DB,
    exercises: [
      {
        id: "l4-e1",
        prompt: "List all directors alphabetically, without duplicates.",
        hint: "Use SELECT DISTINCT director and ORDER BY",
        checkSql: "SELECT DISTINCT director FROM movies ORDER BY director ASC;",
      },
      {
        id: "l4-e2",
        prompt: "List the 4 most recently released Pixar movies.",
        hint: "ORDER BY year DESC and LIMIT 4",
        checkSql: "SELECT * FROM movies ORDER BY year DESC LIMIT 4;",
      },
      {
        id: "l4-e3",
        prompt: "List the first 5 movies alphabetically by title.",
        hint: "ORDER BY title ASC and LIMIT 5",
        checkSql: "SELECT * FROM movies ORDER BY title ASC LIMIT 5;",
      },
      {
        id: "l4-e4",
        prompt: "List the next 5 movies alphabetically (movies 6–10).",
        hint: "Use LIMIT 5 OFFSET 5",
        checkSql: "SELECT * FROM movies ORDER BY title ASC LIMIT 5 OFFSET 5;",
      },
    ],
  },

  // Lesson 5 — INSERT / UPDATE / DELETE
  "sql-l5": {
    database: MOVIES_DB,
    exercises: [
      {
        id: "l5-e1",
        prompt: "Add a new movie: 'Inside Out', directed by 'Pete Docter', released 2015, 95 minutes. Then select all movies to verify.",
        hint: "INSERT INTO movies (title, director, year, length_minutes) VALUES (...);",
        checkSql: "INSERT INTO movies (title, director, year, length_minutes) VALUES ('Inside Out', 'Pete Docter', 2015, 95); SELECT * FROM movies;",
      },
      {
        id: "l5-e2",
        prompt: "The movie with id=9 (WALL-E) actually runs 98 minutes. Correct it, then check.",
        hint: "UPDATE movies SET length_minutes = 98 WHERE id = 9;",
        checkSql: "UPDATE movies SET length_minutes = 98 WHERE id = 9; SELECT id, title, length_minutes FROM movies WHERE id = 9;",
      },
      {
        id: "l5-e3",
        prompt: "Delete all movies directed by 'John Lasseter', then count how many movies remain.",
        hint: "DELETE FROM movies WHERE director = 'John Lasseter'; then SELECT COUNT(*)",
        checkSql: "DELETE FROM movies WHERE director = 'John Lasseter'; SELECT COUNT(*) AS remaining FROM movies;",
      },
    ],
  },

  // Lesson 7 — INNER JOIN
  "sql-l7": {
    database: MOVIES_BOXOFFICE_DB,
    exercises: [
      {
        id: "l7-e1",
        prompt: "Find domestic and international sales for each movie.",
        hint: "JOIN movies with boxoffice ON movies.id = boxoffice.movie_id",
        checkSql: "SELECT title, domestic_sales, international_sales FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id;",
      },
      {
        id: "l7-e2",
        prompt: "Find movies where international sales were GREATER than domestic sales.",
        hint: "Add a WHERE clause comparing the two sales columns.",
        checkSql: "SELECT title FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id WHERE international_sales > domestic_sales;",
      },
      {
        id: "l7-e3",
        prompt: "List all movies sorted by rating in descending order.",
        hint: "JOIN with boxoffice and ORDER BY rating DESC",
        checkSql: "SELECT title, rating FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id ORDER BY rating DESC;",
      },
    ],
  },

  // Lesson 8 — OUTER JOIN (employees/buildings)
  "sql-l8": {
    database: EMPLOYEES_DB,
    exercises: [
      {
        id: "l8-e1",
        prompt: "Find all buildings and the distinct employee roles in each (including empty buildings).",
        hint: "LEFT JOIN buildings with employees ON building_name = building",
        checkSql: "SELECT DISTINCT building_name, role FROM buildings LEFT JOIN employees ON buildings.building_name = employees.building;",
      },
      {
        id: "l8-e2",
        prompt: "Find all employees and their building (including those without a building).",
        hint: "LEFT JOIN employees with buildings",
        checkSql: "SELECT name, role, building FROM employees LEFT JOIN buildings ON employees.building = buildings.building_name;",
      },
    ],
  },

  // Lesson 8 (OUTER) maps to sql-l8 above, and we use sql-l6 for NULL
  "sql-l6": {
    database: EMPLOYEES_DB,
    exercises: [
      {
        id: "l6-e1",
        prompt: "Find employees with no building assigned (building is NULL).",
        hint: "WHERE building IS NULL",
        checkSql: "SELECT name, role FROM employees WHERE building IS NULL;",
      },
      {
        id: "l6-e2",
        prompt: "Find buildings that have no employees assigned.",
        hint: "Use LEFT JOIN and check for NULL employee",
        checkSql: "SELECT building_name FROM buildings LEFT JOIN employees ON buildings.building_name = employees.building WHERE employees.name IS NULL;",
      },
    ],
  },

  // Lesson 9 — GROUP BY / Aggregates (uses employees)
  "sql-l9": {
    database: EMPLOYEES_DB,
    exercises: [
      {
        id: "l9-e1",
        prompt: "Find the longest tenure of any single employee.",
        hint: "Use MAX(years_employed)",
        checkSql: "SELECT MAX(years_employed) AS max_tenure FROM employees;",
      },
      {
        id: "l9-e2",
        prompt: "For each role, find the average number of years employed.",
        hint: "GROUP BY role and use AVG()",
        checkSql: "SELECT role, AVG(years_employed) AS avg_years FROM employees GROUP BY role;",
      },
      {
        id: "l9-e3",
        prompt: "Find the total years employed for all employees in each building.",
        hint: "GROUP BY building and use SUM()",
        checkSql: "SELECT building, SUM(years_employed) AS total_years FROM employees GROUP BY building;",
      },
      {
        id: "l9-e4",
        prompt: "Count the number of employees in each role — only show roles with more than 4 employees.",
        hint: "GROUP BY role, COUNT(*), then HAVING COUNT(*) > 4",
        checkSql: "SELECT role, COUNT(*) AS count FROM employees GROUP BY role HAVING COUNT(*) > 4;",
      },
    ],
  },

  // Lesson 10 — CASE expressions (uses movies)
  "sql-l10": {
    database: MOVIES_DB,
    exercises: [
      {
        id: "l10-e1",
        prompt: "Label each movie as 'Classic' (before 2000) or 'Modern' (2000 and after).",
        hint: "Use a CASE expression on the year column.",
        checkSql: "SELECT title, year, CASE WHEN year < 2000 THEN 'Classic' ELSE 'Modern' END AS era FROM movies;",
      },
      {
        id: "l10-e2",
        prompt: "Count how many Classic vs Modern movies there are.",
        hint: "Wrap the CASE in a GROUP BY subquery or use COUNT with CASE.",
        checkSql: "SELECT CASE WHEN year < 2000 THEN 'Classic' ELSE 'Modern' END AS era, COUNT(*) FROM movies GROUP BY era;",
      },
    ],
  },

  // Lesson 11 — String & Date functions
  "sql-l11": {
    database: MOVIES_DB,
    exercises: [
      {
        id: "l11-e1",
        prompt: "Show each movie title in UPPERCASE.",
        hint: "Use UPPER(title)",
        checkSql: "SELECT UPPER(title) AS title_upper FROM movies;",
      },
      {
        id: "l11-e2",
        prompt: "Find all movies whose title contains the word 'Toy'.",
        hint: "Use LIKE '%Toy%'",
        checkSql: "SELECT * FROM movies WHERE title LIKE '%Toy%';",
      },
      {
        id: "l11-e3",
        prompt: "Show each movie's title length alongside its title.",
        hint: "Use LENGTH(title)",
        checkSql: "SELECT title, LENGTH(title) AS title_length FROM movies ORDER BY title_length DESC;",
      },
    ],
  },

  // Lesson 12 — CTEs
  "sql-l12": {
    database: MOVIES_BOXOFFICE_DB,
    exercises: [
      {
        id: "l12-e1",
        prompt: "Using a CTE called 'blockbusters', find movies where domestic_sales > 250000000. Show their titles and sales.",
        hint: "WITH blockbusters AS (SELECT ... FROM movies JOIN boxoffice ...) SELECT ... FROM blockbusters",
        checkSql: "WITH blockbusters AS (SELECT title, domestic_sales FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id WHERE domestic_sales > 250000000) SELECT * FROM blockbusters ORDER BY domestic_sales DESC;",
      },
      {
        id: "l12-e2",
        prompt: "Using a CTE, find the average rating, then list all movies rated above that average.",
        hint: "WITH avg_rating AS (SELECT AVG(rating) ...) SELECT ... WHERE rating > (SELECT ...)",
        checkSql: "WITH avg_rating AS (SELECT AVG(rating) AS avg FROM boxoffice) SELECT title, rating FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id WHERE rating > (SELECT avg FROM avg_rating);",
      },
    ],
  },

  // Lesson 13 — Window functions
  "sql-l13": {
    database: MOVIES_BOXOFFICE_DB,
    exercises: [
      {
        id: "l13-e1",
        prompt: "Rank all movies by their rating from highest to lowest using ROW_NUMBER().",
        hint: "ROW_NUMBER() OVER (ORDER BY rating DESC)",
        checkSql: "SELECT title, rating, ROW_NUMBER() OVER (ORDER BY rating DESC) AS rank FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id;",
      },
      {
        id: "l13-e2",
        prompt: "Show each movie's domestic sales alongside the running total of domestic sales (ordered by year).",
        hint: "SUM(domestic_sales) OVER (ORDER BY year ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
        checkSql: "SELECT title, year, domestic_sales, SUM(domestic_sales) OVER (ORDER BY year) AS running_total FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id ORDER BY year;",
      },
    ],
  },

  // Lesson 1 — What is SQL? (explore the database)
  "sql-l1": {
    database: MOVIES_DB,
    exercises: [
      {
        id: "l1-e1",
        prompt: "Run a query to see ALL the data in the movies table. This is your first SQL query!",
        hint: "Use SELECT * FROM movies;",
        checkSql: "SELECT * FROM movies;",
      },
      {
        id: "l1-e2",
        prompt: "Count how many movies are in the database using COUNT(*).",
        hint: "SELECT COUNT(*) FROM movies;",
        checkSql: "SELECT COUNT(*) FROM movies;",
      },
      {
        id: "l1-e3",
        prompt: "Show only the title and year columns for all movies.",
        hint: "SELECT title, year FROM movies;",
        checkSql: "SELECT title, year FROM movies;",
      },
    ],
  },

  // Lesson 14 — Indexes (create and verify)
  "sql-l14": {
    database: MOVIES_BOXOFFICE_DB,
    exercises: [
      {
        id: "l14-e1",
        prompt: "Create an index called 'idx_year' on the movies table for the 'year' column. Then select all movies released after 2005.",
        hint: "CREATE INDEX idx_year ON movies (year); SELECT * FROM movies WHERE year > 2005;",
        checkSql: "CREATE INDEX idx_year ON movies (year); SELECT * FROM movies WHERE year > 2005 ORDER BY year;",
      },
      {
        id: "l14-e2",
        prompt: "Create an index called 'idx_director' on the movies table for the 'director' column. Then find all movies by 'John Lasseter'.",
        hint: "CREATE INDEX idx_director ON movies (director); SELECT * FROM movies WHERE director = 'John Lasseter';",
        checkSql: "CREATE INDEX idx_director ON movies (director); SELECT * FROM movies WHERE director = 'John Lasseter' ORDER BY year;",
      },
    ],
  },

  // Lesson 15 — Transactions
  "sql-l15": {
    database: `
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  balance REAL NOT NULL
);
INSERT INTO accounts VALUES
  (1, 'Alice', 1000.00),
  (2, 'Bob',   500.00),
  (3, 'Carol', 750.00);
`,
    exercises: [
      {
        id: "l15-e1",
        prompt: "Use a transaction to transfer $200 from Alice (id=1) to Bob (id=2). Deduct from Alice, add to Bob, then SELECT all accounts to verify.",
        hint: "BEGIN; UPDATE accounts SET balance = balance - 200 WHERE id = 1; UPDATE accounts SET balance = balance + 200 WHERE id = 2; COMMIT; SELECT * FROM accounts;",
        checkSql: "BEGIN; UPDATE accounts SET balance = balance - 200 WHERE id = 1; UPDATE accounts SET balance = balance + 200 WHERE id = 2; COMMIT; SELECT * FROM accounts ORDER BY id;",
      },
      {
        id: "l15-e2",
        prompt: "Start a transaction, try to give Carol (id=3) a $1000 bonus, then ROLLBACK. Select all accounts — Carol's balance should be unchanged.",
        hint: "BEGIN; UPDATE accounts SET balance = balance + 1000 WHERE id = 3; ROLLBACK; SELECT * FROM accounts;",
        checkSql: "BEGIN; UPDATE accounts SET balance = balance + 1000 WHERE id = 3; ROLLBACK; SELECT * FROM accounts ORDER BY id;",
      },
    ],
  },

  // Lesson 16 — Creating Tables & Constraints
  "sql-l16": {
    database: `SELECT 1;`,
    exercises: [
      {
        id: "l16-e1",
        prompt: "Create a table called 'students' with columns: id (INTEGER PRIMARY KEY), name (TEXT NOT NULL), grade (TEXT), score (REAL DEFAULT 0). Then insert one student: (1, 'Ahmed', 'A', 95.5). Select all students.",
        hint: "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, grade TEXT, score REAL DEFAULT 0); INSERT INTO students VALUES (1, 'Ahmed', 'A', 95.5); SELECT * FROM students;",
        checkSql: "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, grade TEXT, score REAL DEFAULT 0); INSERT INTO students VALUES (1, 'Ahmed', 'A', 95.5); SELECT * FROM students;",
      },
      {
        id: "l16-e2",
        prompt: "Create a 'products' table with: id (INTEGER PRIMARY KEY), name (TEXT NOT NULL UNIQUE), price (REAL NOT NULL), stock (INTEGER DEFAULT 0). Insert two products: (1, 'Laptop', 999.99, 50) and (2, 'Mouse', 29.99, 200). Select all products ordered by price.",
        hint: "CREATE TABLE products (...); INSERT INTO products VALUES (...), (...); SELECT * FROM products ORDER BY price;",
        checkSql: "CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, price REAL NOT NULL, stock INTEGER DEFAULT 0); INSERT INTO products VALUES (1, 'Laptop', 999.99, 50); INSERT INTO products VALUES (2, 'Mouse', 29.99, 200); SELECT * FROM products ORDER BY price;",
      },
    ],
  },

  // Lesson 17 — Normalization (create related tables)
  "sql-l17": {
    database: `SELECT 1;`,
    exercises: [
      {
        id: "l17-e1",
        prompt: "Create two normalized tables: 'authors' (id INTEGER PRIMARY KEY, name TEXT NOT NULL) and 'books' (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author_id INTEGER). Insert: author (1, 'George Orwell'), books (1, '1984', 1) and (2, 'Animal Farm', 1). Then JOIN to show book title with author name.",
        hint: "CREATE TABLE authors ...; CREATE TABLE books ...; INSERT ...; SELECT books.title, authors.name FROM books JOIN authors ON books.author_id = authors.id;",
        checkSql: "CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL); CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author_id INTEGER); INSERT INTO authors VALUES (1, 'George Orwell'); INSERT INTO books VALUES (1, '1984', 1); INSERT INTO books VALUES (2, 'Animal Farm', 1); SELECT books.title, authors.name FROM books JOIN authors ON books.author_id = authors.id ORDER BY books.title;",
      },
    ],
  },

  // Lesson 18 — Views
  "sql-l18": {
    database: MOVIES_BOXOFFICE_DB,
    exercises: [
      {
        id: "l18-e1",
        prompt: "Create a VIEW called 'top_rated' that shows movie title and rating for movies with rating > 7.5. Then SELECT everything from the view.",
        hint: "CREATE VIEW top_rated AS SELECT title, rating FROM movies JOIN boxoffice ...; SELECT * FROM top_rated;",
        checkSql: "CREATE VIEW top_rated AS SELECT title, rating FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id WHERE rating > 7.5; SELECT * FROM top_rated ORDER BY rating DESC;",
      },
      {
        id: "l18-e2",
        prompt: "Create a VIEW called 'revenue_summary' that shows each movie's title, year, and total revenue (domestic + international sales). SELECT all from it, ordered by total revenue descending.",
        hint: "CREATE VIEW revenue_summary AS SELECT title, year, domestic_sales + international_sales AS total_revenue FROM ...; SELECT * FROM revenue_summary ORDER BY total_revenue DESC;",
        checkSql: "CREATE VIEW revenue_summary AS SELECT title, year, domestic_sales + international_sales AS total_revenue FROM movies JOIN boxoffice ON movies.id = boxoffice.movie_id; SELECT * FROM revenue_summary ORDER BY total_revenue DESC;",
      },
    ],
  },
};

// ─── Playground preset databases ──────────────────────────────────────────

export const PLAYGROUND_DATABASES: Record<string, { label: string; sql: string; description: string }> = {
  movies: {
    label: "🎬 Pixar Movies",
    description: "14 Pixar films with title, director, year, and runtime",
    sql: MOVIES_DB,
  },
  movies_boxoffice: {
    label: "💰 Movies + Box Office",
    description: "Movies with ratings and domestic/international sales",
    sql: MOVIES_BOXOFFICE_DB,
  },
  employees: {
    label: "👥 Employees & Buildings",
    description: "Employee roles, names, and building assignments",
    sql: EMPLOYEES_DB,
  },
  cities: {
    label: "🌎 North American Cities",
    description: "12 cities with population and coordinates",
    sql: CITIES_DB,
  },
};
