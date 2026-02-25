export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  content: string;
  readingTime?: string;
  realWorld?: string;
};

export type Section = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz;
};

export type Quiz = {
  id: string;
  questions: Question[];
};

export type Question = {
  id: string;
  type: "MCQ" | "SQL";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  totalXP: number;
  sections: Section[];
};

export const COURSES: Course[] = [
  {
    id: "sql",
    title: "SQL from Zero to Hero",
    slug: "sql",
    description: "Master SQL from basics to advanced — queries, joins, indexes, optimization.",
    icon: "🗄️",
    color: "#00e5ff",
    totalXP: 4200,
    sections: [
      // ─────────────────────────────────────────
      // SECTION 0: SQL Careers in IT
      // ─────────────────────────────────────────
      {
        id: "sql-s0",
        title: "SQL Careers in IT",
        description: "Why SQL matters, who uses it, and what your career can look like",
        lessons: [
          {
            id: "sql-l0",
            title: "Why Every Tech Career Needs SQL",
            description: "SQL is the language of data — and data is everywhere",
            duration: "8 min",
            xp: 50,
            readingTime: "8 min",
            realWorld: `## Alex's First Day at Meta

Alex just started as a Junior Data Engineer at Meta. On his very first morning, his manager sends a Slack message:

> "Hey Alex, can you pull the number of new users who signed up in each country last week?"

Alex opens his laptop, connects to the internal MySQL database, and writes:

\`\`\`sql
SELECT country, COUNT(*) AS new_users
FROM users
WHERE signup_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY country
ORDER BY new_users DESC;
\`\`\`

Within 30 seconds, he has the answer. His manager is impressed.

**That's SQL.** A simple skill that lets you talk to databases and get answers that drive real business decisions — at Meta, at startups, and everywhere in between.

This is what you're learning. Let's go.`,
            content: `# Why Every Tech Career Needs SQL

You've decided to learn SQL. That's one of the best decisions you can make in tech.

Here's why: **SQL is the language of data**, and data is the backbone of every modern company.

## What Is SQL, Really?

SQL (Structured Query Language) is how you talk to databases. Think of a database as a massive spreadsheet that can hold millions — or billions — of rows. SQL is the tool that lets you ask questions and get answers instantly.

> "How many users signed up last week?" → SQL.
> "Which products are selling the most?" → SQL.
> "What's our revenue by region this quarter?" → SQL.

## Who Uses SQL Every Day?

### 1. Data Engineer
Data Engineers build and maintain the data pipelines that move information around. They write SQL to transform, clean, and load data into warehouses. Companies like Meta, Google, and Amazon have hundreds of data engineers.

**Average salary:** $120,000–$160,000/year

### 2. Data Analyst
Data Analysts use SQL to dig into data and answer business questions. They write queries to find trends, build reports, and help teams make decisions.

**Average salary:** $70,000–$110,000/year

### 3. Database Administrator (DBA)
DBAs design and maintain the database systems themselves — making sure they're fast, secure, and always running. SQL is their primary tool.

**Average salary:** $90,000–$130,000/year

### 4. Software Engineer / Backend Developer
Almost every web app or API talks to a database. Whether you're building a login system or an e-commerce platform, you need SQL to read and write user data.

**Average salary:** $100,000–$150,000/year

### 5. Business Intelligence (BI) Developer
BI developers create dashboards and reports using tools like Power BI, Tableau, or Looker — all of which run on SQL underneath.

## The Tools That Run on SQL

These are all the major database systems you'll encounter:

| System | Used By |
|--------|---------|
| MySQL | Web apps (Instagram, Twitter, Airbnb) |
| PostgreSQL | Startups, data teams, cloud |
| SQL Server | Enterprise, Microsoft ecosystem |
| BigQuery | Google Cloud, data warehouses |
| Snowflake | Modern data teams |
| SQLite | Mobile apps, local development |

They all speak SQL. Learn it once, use it everywhere.

## What This Course Will Teach You

By the end of this course, you will:

- Write SELECT queries to retrieve and filter data
- Use JOINs to combine data from multiple tables
- Aggregate data with GROUP BY and functions like COUNT, SUM, AVG
- Design your own database tables
- Optimize queries for performance
- Read and write SQL like a professional

You'll go from zero SQL knowledge to writing real queries used at companies like Meta, Amazon, and Netflix.

## A Realistic Timeline

- **Week 1**: SQL Basics — SELECT, WHERE, ORDER BY (Sections 1)
- **Week 2**: Intermediate SQL — JOINs, GROUP BY, subqueries (Section 2)
- **Week 3**: Advanced SQL — window functions, CTEs, performance (Section 3)
- **Week 4**: Database Design — schema design, normalization (Section 4)

Commit 30–60 minutes a day and you'll be writing real SQL confidently within a month.

## Let's Start

The best way to learn SQL is by writing it. Every lesson in this course has interactive exercises where you type real SQL and see results instantly.

No setup required. No downloads. Just open a lesson and start querying.

**You're already ahead of most people just by being here.** Let's go.`,
          },
          {
            id: "sql-l0b",
            title: "How Databases Work",
            description: "Tables, rows, columns, and how data is organized",
            duration: "6 min",
            xp: 50,
            readingTime: "6 min",
            realWorld: `## Alex's Data Model at Meta

When Alex joined Meta's Data Engineering team, one of the first things he had to understand was how the data was organized.

Meta has billions of users. All that user data lives in tables — not one giant file, but dozens of related tables:

- **users** — one row per user, with columns like user_id, name, email, country, signup_date
- **posts** — one row per post, with columns like post_id, user_id, content, created_at
- **likes** — one row per like, connecting users to posts
- **sessions** — one row per login session, tracking activity

When Alex's manager asks "how many users posted at least once this week?", he has to JOIN the users table with the posts table to get the answer.

Understanding how tables relate to each other is the foundation of everything Alex does as a data engineer. And it all starts with the simple concepts in this lesson.`,
            content: `# How Databases Work

Before you write your first SQL query, let's understand what you're querying.

## What Is a Database?

A database is an organized collection of data stored in a computer. Instead of one big file, data is split into **tables** — each one focused on a specific type of information.

Think of it like a filing cabinet. Each drawer holds a different type of record. Each record is a row. Each piece of information on that record is a column.

## Tables, Rows, and Columns

Every database is made of **tables**. A table is like a spreadsheet:

- **Rows** (also called records) = one entry of data
- **Columns** (also called fields) = one type of information

### Example: The employees table

| id | name         | department  | salary | hire_date  |
|----|--------------|-------------|--------|------------|
| 1  | Alice Smith  | Engineering | 85000  | 2021-03-15 |
| 2  | Bob Jones    | Marketing   | 62000  | 2020-07-22 |
| 3  | Carol White  | Engineering | 91000  | 2019-11-01 |
| 4  | David Lee    | HR          | 58000  | 2022-01-10 |

- The table has **4 rows** (4 employees)
- The table has **5 columns** (id, name, department, salary, hire_date)
- Alice Smith is one **row** (record)
- The **salary** column holds all salary values

## Primary Keys

Every table should have a **primary key** — a column (or combination of columns) that uniquely identifies each row. In the employees table, **id** is the primary key.

- Primary keys are always unique
- Primary keys are never NULL
- They're used to link tables together

## Multiple Tables (Relational Databases)

Real databases have multiple tables that are related to each other. Instead of repeating information, you store it once and link to it.

### Example: departments table

| id | name        | location      |
|----|-------------|---------------|
| 1  | Engineering | San Francisco |
| 2  | Marketing   | New York      |
| 3  | HR          | Chicago       |

The employees table would store a **department_id** (a number) instead of the full department name. This saves space and keeps data consistent.

## How SQL Fits In

SQL is the language you use to:

- **Ask questions** — "Show me all employees in Engineering"
- **Add data** — "Add a new employee named Sam"
- **Update data** — "Give Alice a raise"
- **Delete data** — "Remove the HR department"

Every SQL query you write targets one or more tables in a database.

## Your Practice Database

Throughout this course, you'll practice on a database with these tables:

- **employees** — employee records (id, name, department, salary, hire_date)
- **departments** — department info (id, name, location, budget)
- **projects** — project records (id, name, start_date, end_date, status)
- **employee_projects** — which employees work on which projects

By the end of Section 1, you'll be querying all of these confidently.`,
          },
        ],
        quiz: {
          id: "sql-q0",
          questions: [
            {
              id: "sq0-q1",
              type: "MCQ",
              question: "Which role primarily builds and maintains data pipelines using SQL?",
              options: ["UX Designer", "Data Engineer", "DevOps Engineer", "Frontend Developer"],
              correctAnswer: "Data Engineer",
              explanation: "Data Engineers build pipelines that move, transform, and load data. SQL is their primary tool.",
            },
            {
              id: "sq0-q2",
              type: "MCQ",
              question: "In a database table, what does a 'row' represent?",
              options: ["A type of data (e.g. salary)", "A single entry or record", "A table name", "A database connection"],
              correctAnswer: "A single entry or record",
              explanation: "Each row (also called a record) represents one complete entry — like one employee or one order.",
            },
            {
              id: "sq0-q3",
              type: "MCQ",
              question: "What is a Primary Key?",
              options: [
                "The most important column in a query",
                "A column that uniquely identifies each row",
                "The first column in a table",
                "A special password for the database",
              ],
              correctAnswer: "A column that uniquely identifies each row",
              explanation: "A primary key uniquely identifies each row in a table. It must be unique and cannot be NULL.",
            },
          ],
        },
      },

      // ─────────────────────────────────────────
      // SECTION 1: SQL Basics
      // ─────────────────────────────────────────
      {
        id: "sql-s1",
        title: "SQL Basics",
        description: "Learn the fundamentals: SELECT, WHERE, ORDER BY, INSERT, UPDATE, DELETE",
        lessons: [
          {
            id: "sql-l1",
            title: "What is SQL?",
            description: "Introduction to databases and SQL",
            duration: "12 min",
            xp: 50,
            readingTime: "12 min",
            realWorld: `## Alex Gets His First Ticket

It's Alex's second week at Meta. His manager drops a ticket in Jira:

> **Task:** Find the top 5 countries where users signed up most in Q1 2024.

Alex opens MySQL Workbench, connects to the analytics database, and thinks for a second. He knows users are stored in a table called \`users\`. He knows each row is one user. He knows there's a \`country\` column and a \`signup_date\` column.

He writes:

\`\`\`sql
SELECT country, COUNT(*) AS signups
FROM users
WHERE signup_date BETWEEN '2024-01-01' AND '2024-03-31'
GROUP BY country
ORDER BY signups DESC
LIMIT 5;
\`\`\`

The results come back instantly. India, USA, Brazil, Indonesia, Philippines.

He pastes the results into Slack. His manager reacts with a 🔥.

That's what SQL does for you. It takes a question that would take hours to answer manually and answers it in seconds. Alex didn't need to download any data, open Excel, or write any Python. He just wrote one query.

**This is why SQL is the first thing every data professional learns.**`,
            content: `# What is SQL?

SQL (Structured Query Language) is the standard language for managing and querying relational databases. It's one of the most in-demand skills in tech.

## Why Learn SQL?

- Used in virtually every company on the planet
- Powers web apps, analytics, business intelligence, and reporting
- Works across PostgreSQL, MySQL, SQL Server, SQLite, and more
- Easy to learn, incredibly powerful in practice

## Key Concepts

- **Database**: A collection of organized data stored in tables
- **Table**: Data arranged in rows and columns (like a spreadsheet)
- **Row** (also called a Record): A single entry in a table
- **Column** (also called a Field): A category of data
- **Primary Key**: A unique identifier for each row

## Example Table: employees

| id | name         | department  | salary |
|----|--------------|-------------|--------|
| 1  | Alice Smith  | Engineering | 85000  |
| 2  | Bob Jones    | Marketing   | 62000  |
| 3  | Carol White  | Engineering | 91000  |

## Relational Databases

Relational databases store data in multiple tables that can be linked together. This prevents duplication and keeps data consistent.

## Popular Database Systems

- **PostgreSQL** — powerful, open-source, enterprise-grade
- **MySQL / MariaDB** — most popular for web apps
- **SQL Server** — Microsoft's enterprise database
- **SQLite** — lightweight, great for small apps and mobile`,
          },
          {
            id: "sql-l2",
            title: "Your First SELECT Statement",
            description: "How to retrieve data from a table",
            duration: "15 min",
            xp: 50,
            readingTime: "15 min",
            realWorld: `## Alex Explores a New Dataset

Alex has been asked to start exploring Meta's internal \`ad_impressions\` table — a massive table that tracks every time an ad is shown to a user.

Before he writes any complex logic, he always starts the same way:

\`\`\`sql
-- Step 1: What does this table look like?
SELECT * FROM ad_impressions LIMIT 10;
\`\`\`

He sees the columns: \`impression_id\`, \`user_id\`, \`ad_id\`, \`country\`, \`device_type\`, \`shown_at\`, \`clicked\`.

\`\`\`sql
-- Step 2: Just the columns I care about
SELECT ad_id, country, device_type, clicked
FROM ad_impressions
LIMIT 100;
\`\`\`

\`\`\`sql
-- Step 3: Rename columns to make the output cleaner
SELECT
  ad_id AS "Ad ID",
  country AS "Country",
  clicked AS "Was Clicked?"
FROM ad_impressions
LIMIT 100;
\`\`\`

This is Alex's routine every time he encounters a new table: SELECT *, look at the structure, then narrow down to what matters.

**That's the real power of SELECT — it's your first move in any data investigation.**`,
            content: `# The SELECT Statement

The SELECT statement is the most fundamental SQL command. It retrieves data from one or more tables.

## Basic Syntax

\`\`\`sql
SELECT column1, column2 FROM table_name;
\`\`\`

## Selecting All Columns

Use the asterisk (*) wildcard to select every column:

\`\`\`sql
SELECT * FROM employees;
\`\`\`

## Selecting Specific Columns

Only pull the columns you need — this is better practice:

\`\`\`sql
SELECT name, salary FROM employees;
\`\`\`

## Column Aliases

Rename columns in your output using AS:

\`\`\`sql
SELECT name AS employee_name, salary AS annual_salary
FROM employees;
\`\`\`

## Removing Duplicates with DISTINCT

\`\`\`sql
SELECT DISTINCT department FROM employees;
\`\`\`

## Limiting Results

Only return a certain number of rows:

\`\`\`sql
SELECT * FROM employees LIMIT 5;
\`\`\`

## Practical Examples

\`\`\`sql
-- Get first 10 employees
SELECT id, name, department FROM employees LIMIT 10;

-- Get unique departments
SELECT DISTINCT department FROM employees;

-- Rename columns
SELECT name AS "Employee Name", salary AS "Salary (USD)" FROM employees;
\`\`\``,
          },
          {
            id: "sql-l3",
            title: "Filtering with WHERE",
            description: "Filter rows using conditions",
            duration: "18 min",
            xp: 75,
            readingTime: "18 min",
            realWorld: `## Alex Investigates a Drop in Ad Revenue

One Monday morning, Alex's manager sends a Slack message:

> "Revenue from mobile ads dropped 18% last week in Germany. Can you figure out why?"

This is a real investigation. Alex starts with WHERE to slice the data:

\`\`\`sql
-- Step 1: Look at German mobile ad impressions from last week
SELECT *
FROM ad_impressions
WHERE country = 'DE'
  AND device_type = 'mobile'
  AND shown_at >= '2024-03-18'
  AND shown_at < '2024-03-25'
LIMIT 50;
\`\`\`

Something looks off — a lot of these ads have \`clicked = 0\` and \`revenue = 0\`. He narrows further:

\`\`\`sql
-- Step 2: Show me only the zero-revenue rows
SELECT ad_id, COUNT(*) AS impressions
FROM ad_impressions
WHERE country = 'DE'
  AND device_type = 'mobile'
  AND revenue = 0
  AND shown_at >= '2024-03-18'
GROUP BY ad_id
ORDER BY impressions DESC;
\`\`\`

He finds that one specific ad campaign (ad_id = 8821) accounts for 80% of zero-revenue impressions. He checks — that campaign had a broken landing page URL.

**Without WHERE, Alex would have been staring at millions of rows. WHERE let him zoom in on exactly what was wrong.**`,
            content: `# The WHERE Clause

WHERE filters rows based on a condition. Only rows that satisfy the condition are returned.

## Basic Syntax

\`\`\`sql
SELECT * FROM employees WHERE salary > 50000;
\`\`\`

## Comparison Operators

| Operator | Meaning           |
|----------|-------------------|
| =        | Equal to          |
| != or <> | Not equal to      |
| >        | Greater than      |
| <        | Less than         |
| >=       | Greater or equal  |
| <=       | Less or equal     |

## Multiple Conditions

### AND — both must be true

\`\`\`sql
SELECT * FROM employees
WHERE salary > 50000 AND department = 'Engineering';
\`\`\`

### OR — at least one must be true

\`\`\`sql
SELECT * FROM employees
WHERE department = 'Engineering' OR department = 'Marketing';
\`\`\`

### NOT — negate a condition

\`\`\`sql
SELECT * FROM employees WHERE NOT department = 'HR';
\`\`\`

## BETWEEN — range check

\`\`\`sql
SELECT * FROM employees WHERE salary BETWEEN 60000 AND 90000;
\`\`\`

## IN — match a list of values

\`\`\`sql
SELECT * FROM employees
WHERE department IN ('Engineering', 'Product', 'Design');
\`\`\`

## LIKE — pattern matching

\`\`\`sql
-- Names starting with 'A'
SELECT * FROM employees WHERE name LIKE 'A%';

-- Names ending with 'son'
SELECT * FROM employees WHERE name LIKE '%son';

-- Names containing 'ar'
SELECT * FROM employees WHERE name LIKE '%ar%';
\`\`\`

% matches any number of characters, _ matches exactly one character.`,
          },
          {
            id: "sql-l4",
            title: "Sorting with ORDER BY",
            description: "Sort your query results",
            duration: "10 min",
            xp: 50,
            readingTime: "10 min",
            realWorld: `## Alex Builds a Daily Revenue Report

Every morning at 9 AM, Alex's team gets a Slack digest of the previous day's top performing ads. Alex built the query that powers it:

\`\`\`sql
-- Top 10 ads by revenue yesterday
SELECT
  ad_id,
  campaign_name,
  SUM(revenue) AS total_revenue,
  COUNT(*) AS impressions
FROM ad_impressions
WHERE DATE(shown_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
GROUP BY ad_id, campaign_name
ORDER BY total_revenue DESC
LIMIT 10;
\`\`\`

The \`ORDER BY total_revenue DESC\` is critical — without it, the results would come back in random order and the team wouldn't know which ads were actually performing best.

He also built a "worst performers" view:

\`\`\`sql
-- Lowest revenue ads (to flag for review)
SELECT
  ad_id,
  campaign_name,
  SUM(revenue) AS total_revenue
FROM ad_impressions
WHERE DATE(shown_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
GROUP BY ad_id, campaign_name
ORDER BY total_revenue ASC
LIMIT 5;
\`\`\`

**ORDER BY is how you make data tell a story — from best to worst, newest to oldest, A to Z.**`,
            content: `# ORDER BY

ORDER BY sorts your results. Without it, row order is not guaranteed.

## Ascending (default)

\`\`\`sql
SELECT name, salary FROM employees ORDER BY salary;
-- or explicitly:
SELECT name, salary FROM employees ORDER BY salary ASC;
\`\`\`

## Descending

\`\`\`sql
SELECT name, salary FROM employees ORDER BY salary DESC;
\`\`\`

## Multiple Sort Columns

Sort by department first, then by salary descending within each department:

\`\`\`sql
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;
\`\`\`

## Sorting with Aliases

\`\`\`sql
SELECT name, salary * 1.1 AS new_salary
FROM employees
ORDER BY new_salary DESC;
\`\`\`

## LIMIT with ORDER BY

Get the top 5 highest paid employees:

\`\`\`sql
SELECT name, salary FROM employees
ORDER BY salary DESC
LIMIT 5;
\`\`\`

## OFFSET — skip rows (pagination)

Get employees 11–20 (page 2 with 10 per page):

\`\`\`sql
SELECT name, salary FROM employees
ORDER BY name ASC
LIMIT 10 OFFSET 10;
\`\`\``,
          },
          {
            id: "sql-l5",
            title: "INSERT, UPDATE, DELETE",
            description: "Modify data in your tables",
            duration: "20 min",
            xp: 100,
            readingTime: "20 min",
            realWorld: `## Alex Manages a Reference Table

Part of Alex's job is maintaining a \`campaigns\` reference table. This is where all ad campaign metadata lives — names, budgets, statuses, owners.

When a new campaign launches, the marketing team sends Alex a Jira ticket:

> "Please add Campaign #9045 — 'Summer Promo Europe' — budget $50,000, status active, owner sarah@meta.com"

Alex writes:

\`\`\`sql
INSERT INTO campaigns (campaign_id, name, budget, status, owner_email, created_at)
VALUES (9045, 'Summer Promo Europe', 50000, 'active', 'sarah@meta.com', NOW());
\`\`\`

Two weeks later, the budget gets increased:

\`\`\`sql
-- Always check first with SELECT
SELECT campaign_id, name, budget FROM campaigns WHERE campaign_id = 9045;

-- Then update
UPDATE campaigns
SET budget = 75000
WHERE campaign_id = 9045;
\`\`\`

At end of quarter, old campaigns get archived:

\`\`\`sql
-- Check before deleting
SELECT COUNT(*) FROM campaigns WHERE status = 'completed' AND created_at < '2024-01-01';

-- Then delete
DELETE FROM campaigns WHERE status = 'completed' AND created_at < '2024-01-01';
\`\`\`

**Alex's golden rule: always SELECT before UPDATE or DELETE. One wrong WHERE clause on a production database can ruin your day — and your month.**`,
            content: `# Modifying Data

SQL isn't just for reading data — you can insert, update, and delete rows too.

## INSERT — add new rows

### Insert a single row

\`\`\`sql
INSERT INTO employees (name, department, salary)
VALUES ('David Lee', 'Engineering', 78000);
\`\`\`

### Insert multiple rows at once

\`\`\`sql
INSERT INTO employees (name, department, salary)
VALUES
  ('Emma Brown', 'Marketing', 65000),
  ('Frank Chen', 'Engineering', 92000),
  ('Grace Kim', 'HR', 58000);
\`\`\`

## UPDATE — modify existing rows

Always use WHERE with UPDATE — without it you'll change every row!

\`\`\`sql
-- Give Engineering a 10% raise
UPDATE employees
SET salary = salary * 1.10
WHERE department = 'Engineering';

-- Update multiple columns
UPDATE employees
SET salary = 95000, department = 'Senior Engineering'
WHERE name = 'Alice Smith';
\`\`\`

## DELETE — remove rows

Always use WHERE with DELETE — without it you'll delete every row!

\`\`\`sql
-- Delete one employee
DELETE FROM employees WHERE id = 5;

-- Delete all employees in a department
DELETE FROM employees WHERE department = 'Temp';
\`\`\`

## TRUNCATE — remove all rows (faster)

\`\`\`sql
TRUNCATE TABLE temp_data;
\`\`\`

## Safety tip

Before running UPDATE or DELETE, first run a SELECT with the same WHERE clause to verify you're targeting the right rows:

\`\`\`sql
-- Check first
SELECT * FROM employees WHERE department = 'Temp';
-- Then delete
DELETE FROM employees WHERE department = 'Temp';
\`\`\``,
          },
          {
            id: "sql-l6",
            title: "NULL Values & COALESCE",
            description: "Handle missing data properly",
            duration: "15 min",
            xp: 75,
            readingTime: "15 min",
            realWorld: `## Alex Discovers Why His Averages Are Wrong

Alex is calculating average revenue per ad impression for a weekly report. He runs:

\`\`\`sql
SELECT AVG(revenue) AS avg_revenue FROM ad_impressions
WHERE shown_at >= '2024-03-18';
\`\`\`

The result is $0.34. But his manager says it should be closer to $0.52 based on last week.

Alex digs in. He checks for NULLs:

\`\`\`sql
SELECT
  COUNT(*) AS total_rows,
  COUNT(revenue) AS non_null_revenue,
  COUNT(*) - COUNT(revenue) AS null_revenue_count
FROM ad_impressions
WHERE shown_at >= '2024-03-18';
\`\`\`

Result: 12,000 rows have NULL revenue. These are impressions where the ad loaded but didn't get a revenue signal (a common tracking issue).

He uses COALESCE to treat NULLs as 0:

\`\`\`sql
SELECT AVG(COALESCE(revenue, 0)) AS avg_revenue_including_nulls
FROM ad_impressions
WHERE shown_at >= '2024-03-18';
\`\`\`

Now the average is $0.29 — even lower, because he's now including the zero-revenue rows. He reports both numbers and explains the difference to his manager. The root cause was a broken tracking pixel on a landing page.

**NULLs in real data are everywhere. If you don't handle them deliberately, your calculations will silently be wrong.**`,
            content: `# NULL Values

NULL means "no value" or "unknown". It's different from 0 or an empty string ''.

## Checking for NULL

\`\`\`sql
-- Find employees with no manager
SELECT * FROM employees WHERE manager_id IS NULL;

-- Find employees who do have a manager
SELECT * FROM employees WHERE manager_id IS NOT NULL;
\`\`\`

## NULL in comparisons

NULL cannot be compared with = or !=. This returns no results:

\`\`\`sql
SELECT * FROM employees WHERE manager_id = NULL;   -- WRONG
SELECT * FROM employees WHERE manager_id IS NULL;  -- CORRECT
\`\`\`

## COALESCE — return the first non-NULL value

\`\`\`sql
-- Show manager_id, or 'No Manager' if NULL
SELECT name, COALESCE(CAST(manager_id AS VARCHAR), 'No Manager') AS manager
FROM employees;

-- Use a fallback salary
SELECT name, COALESCE(bonus, 0) AS bonus FROM employees;
\`\`\`

## NULLIF — return NULL if two values are equal

\`\`\`sql
-- Avoid division by zero
SELECT name, total_sales / NULLIF(months_worked, 0) AS monthly_avg
FROM sales_reps;
\`\`\`

## NULL in aggregates

Most aggregate functions (SUM, AVG, COUNT) ignore NULL values automatically.

\`\`\`sql
-- COUNT(*) counts all rows including NULLs
-- COUNT(column) counts only non-NULL values
SELECT COUNT(*) AS total_rows, COUNT(manager_id) AS with_manager
FROM employees;
\`\`\``,
          },
        ],
        quiz: {
          id: "sql-q1",
          questions: [
            {
              id: "sq1-q1",
              type: "MCQ",
              question: "Which SQL statement is used to retrieve data from a database?",
              options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
              correctAnswer: "SELECT",
              explanation: "SELECT is used to query and retrieve data from one or more tables.",
            },
            {
              id: "sq1-q2",
              type: "MCQ",
              question: "What does SELECT * FROM employees return?",
              options: [
                "Only the first column",
                "All columns and all rows from employees",
                "The count of all rows",
                "Only distinct rows",
              ],
              correctAnswer: "All columns and all rows from employees",
              explanation: "The asterisk (*) wildcard selects all columns, and no WHERE clause means all rows are returned.",
            },
            {
              id: "sq1-q3",
              type: "MCQ",
              question: "Which clause is used to filter rows in a SELECT statement?",
              options: ["FILTER", "HAVING", "WHERE", "LIMIT"],
              correctAnswer: "WHERE",
              explanation: "WHERE is used to filter rows based on a specified condition before grouping.",
            },
            {
              id: "sq1-q4",
              type: "MCQ",
              question: "How do you find employees where the manager_id column has no value?",
              options: [
                "WHERE manager_id = NULL",
                "WHERE manager_id IS NULL",
                "WHERE manager_id = ''",
                "WHERE manager_id = 0",
              ],
              correctAnswer: "WHERE manager_id IS NULL",
              explanation: "NULL cannot be compared with = or !=. You must use IS NULL or IS NOT NULL.",
            },
            {
              id: "sq1-q5",
              type: "MCQ",
              question: "Which SQL statement would delete all rows from a table called 'temp' without any conditions?",
              options: [
                "DELETE temp",
                "REMOVE * FROM temp",
                "DELETE FROM temp",
                "TRUNCATE TABLE temp",
              ],
              correctAnswer: "DELETE FROM temp",
              explanation: "DELETE FROM temp (without WHERE) deletes all rows. TRUNCATE TABLE temp also works but is faster and different in behavior.",
            },
            {
              id: "sq1-q6",
              type: "MCQ",
              question: "What does COALESCE(bonus, 0) return when bonus is NULL?",
              options: ["NULL", "bonus", "0", "Error"],
              correctAnswer: "0",
              explanation: "COALESCE returns the first non-NULL argument. When bonus is NULL, it returns 0.",
            },
          ],
        },
      },

      // ─────────────────────────────────────────
      // SECTION 2: Intermediate SQL
      // ─────────────────────────────────────────
      {
        id: "sql-s2",
        title: "Intermediate SQL",
        description: "JOIN, GROUP BY, aggregates, CASE expressions, and string/date functions",
        lessons: [
          {
            id: "sql-l7",
            title: "JOIN — Combining Tables",
            description: "Merge data from multiple tables",
            duration: "25 min",
            xp: 100,
            readingTime: "25 min",
            realWorld: `## Alex Links Users to Their Ad Clicks

Alex is asked: "What percentage of users who saw ads last week actually clicked?"

The problem: clicks are in the \`ad_impressions\` table, but user details (like country and age group) are in the \`users\` table. He needs to JOIN them:

\`\`\`sql
-- How many users clicked at least one ad last week, by country
SELECT
  u.country,
  COUNT(DISTINCT u.user_id) AS users_who_clicked
FROM users u
INNER JOIN ad_impressions ai ON u.user_id = ai.user_id
WHERE ai.clicked = 1
  AND ai.shown_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY u.country
ORDER BY users_who_clicked DESC;
\`\`\`

He also needs to find users who saw ads but never clicked (to understand disengagement):

\`\`\`sql
-- Users who had impressions but ZERO clicks
SELECT
  u.user_id,
  u.country,
  COUNT(ai.impression_id) AS impressions_seen
FROM users u
LEFT JOIN ad_impressions ai ON u.user_id = ai.user_id AND ai.clicked = 1
WHERE ai.impression_id IS NULL  -- no matching click
  AND u.signup_date >= '2024-01-01'
GROUP BY u.user_id, u.country
ORDER BY impressions_seen DESC
LIMIT 100;
\`\`\`

**JOINs are the most important SQL skill for data engineers. Real data is always spread across multiple tables — JOINs are how you bring it together.**`,
            content: `# SQL JOINs

JOINs combine rows from two or more tables based on a related column.

## INNER JOIN

Returns only rows that have matching values in BOTH tables.

\`\`\`sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
\`\`\`

## LEFT JOIN

Returns ALL rows from the left table, and matched rows from the right. Non-matching right rows get NULL.

\`\`\`sql
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
-- Shows all employees, even those with no department
\`\`\`

## RIGHT JOIN

Returns ALL rows from the right table. Rarely used — a LEFT JOIN written differently.

## FULL OUTER JOIN

Returns all rows from both tables, with NULLs where there's no match.

\`\`\`sql
SELECT e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
\`\`\`

## Joining Multiple Tables

\`\`\`sql
SELECT e.name, d.department_name, l.city
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
INNER JOIN locations l ON d.location_id = l.id;
\`\`\`

## Self Join

Join a table to itself — common for hierarchical data:

\`\`\`sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\``,
          },
          {
            id: "sql-l8",
            title: "GROUP BY and Aggregates",
            description: "Summarize data with COUNT, SUM, AVG, MIN, MAX",
            duration: "20 min",
            xp: 100,
            readingTime: "20 min",
            realWorld: `## Alex Builds the Weekly Revenue Dashboard

Every Friday, Alex sends a revenue summary to his team. It's powered by one GROUP BY query:

\`\`\`sql
SELECT
  country,
  device_type,
  COUNT(*) AS total_impressions,
  SUM(revenue) AS total_revenue,
  ROUND(AVG(revenue), 4) AS avg_revenue_per_impression,
  SUM(clicked) AS total_clicks,
  ROUND(SUM(clicked) / COUNT(*) * 100, 2) AS click_through_rate_pct
FROM ad_impressions
WHERE shown_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY country, device_type
HAVING total_impressions > 1000   -- only show meaningful segments
ORDER BY total_revenue DESC;
\`\`\`

This single query replaces what would have taken hours in Excel. It groups by both country AND device type, so Alex can see "US Mobile" vs "US Desktop" vs "DE Mobile" as separate rows — each with their own revenue total and click rate.

His manager uses this table every week to decide which markets to invest more ad budget in.

**GROUP BY is what turns millions of individual rows into business intelligence. It's the heart of data analysis in SQL.**`,
            content: `# GROUP BY & Aggregate Functions

GROUP BY groups rows that have the same values in specified columns, so you can apply aggregate functions to each group.

## Aggregate Functions

| Function   | Description                  |
|------------|------------------------------|
| COUNT()    | Number of rows               |
| SUM()      | Total of a numeric column    |
| AVG()      | Average of a numeric column  |
| MIN()      | Smallest value               |
| MAX()      | Largest value                |

## Basic GROUP BY

\`\`\`sql
SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
\`\`\`

## HAVING — filter groups

WHERE filters rows before grouping. HAVING filters groups after grouping.

\`\`\`sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 70000;
\`\`\`

## ORDER + GROUP + HAVING

\`\`\`sql
SELECT department,
       COUNT(*) AS headcount,
       SUM(salary) AS total_payroll,
       MAX(salary) AS top_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 3
ORDER BY total_payroll DESC;
\`\`\`

## ROLLUP — subtotals

\`\`\`sql
SELECT department, job_title, SUM(salary)
FROM employees
GROUP BY ROLLUP(department, job_title);
\`\`\`

## Filtering within aggregates

\`\`\`sql
-- Count only Engineering employees
SELECT COUNT(*) FILTER (WHERE department = 'Engineering') AS eng_count
FROM employees;
\`\`\``,
          },
          {
            id: "sql-l9",
            title: "Subqueries",
            description: "Queries inside queries",
            duration: "22 min",
            xp: 100,
            readingTime: "22 min",
            realWorld: `## Alex Finds Above-Average Performing Ads

Alex's team wants to know: which ad campaigns performed above the average revenue per impression for their country?

This requires comparing each row to a calculated average — exactly what subqueries solve:

\`\`\`sql
-- Find ads that beat their country's average revenue per impression
SELECT
  ad_id,
  campaign_name,
  country,
  AVG(revenue) AS this_ad_avg
FROM ad_impressions
GROUP BY ad_id, campaign_name, country
HAVING AVG(revenue) > (
  -- Subquery: what's the average for this country overall?
  SELECT AVG(revenue)
  FROM ad_impressions ai2
  WHERE ai2.country = ad_impressions.country
)
ORDER BY this_ad_avg DESC;
\`\`\`

He also uses a subquery in the FROM clause to pre-aggregate data before joining:

\`\`\`sql
-- Get users whose total lifetime ad revenue exceeds $100
SELECT u.user_id, u.country, rev.total_revenue
FROM users u
JOIN (
  SELECT user_id, SUM(revenue) AS total_revenue
  FROM ad_impressions
  GROUP BY user_id
) AS rev ON u.user_id = rev.user_id
WHERE rev.total_revenue > 100
ORDER BY rev.total_revenue DESC;
\`\`\`

**Subqueries let you use the result of one query as the input to another. They're essential when you need to filter based on an aggregate value.**`,
            content: `# Subqueries

A subquery is a query nested inside another query. They're enclosed in parentheses.

## Subquery in WHERE

\`\`\`sql
-- Employees earning above the average salary
SELECT name, salary FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
\`\`\`

## Subquery in SELECT

\`\`\`sql
-- Show each employee's salary and the company average
SELECT name,
       salary,
       (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees;
\`\`\`

## Subquery in FROM (derived table)

\`\`\`sql
SELECT dept_stats.department, dept_stats.avg_salary
FROM (
  SELECT department, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department
) AS dept_stats
WHERE dept_stats.avg_salary > 70000;
\`\`\`

## EXISTS — check if subquery returns any rows

\`\`\`sql
-- Departments that have at least one employee
SELECT name FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e WHERE e.department_id = d.id
);
\`\`\`

## IN with subquery

\`\`\`sql
-- Employees in departments located in London
SELECT name FROM employees
WHERE department_id IN (
  SELECT id FROM departments WHERE city = 'London'
);
\`\`\`

## Correlated Subquery

A subquery that references the outer query. Runs once per row:

\`\`\`sql
-- Highest paid employee in each department
SELECT e.name, e.salary, e.department
FROM employees e
WHERE e.salary = (
  SELECT MAX(salary) FROM employees
  WHERE department = e.department
);
\`\`\``,
          },
          {
            id: "sql-l10",
            title: "CASE Expressions",
            description: "Add conditional logic to your queries",
            duration: "18 min",
            xp: 100,
            readingTime: "18 min",
            realWorld: `## Alex Segments Users by Engagement Level

Marketing asks Alex to categorize users by how engaged they are with ads — high, medium, or low — based on their click rate.

\`\`\`sql
SELECT
  u.user_id,
  u.country,
  COUNT(ai.impression_id) AS impressions,
  SUM(ai.clicked) AS clicks,
  CASE
    WHEN COUNT(ai.impression_id) = 0 THEN 'No Exposure'
    WHEN SUM(ai.clicked) / COUNT(ai.impression_id) >= 0.10 THEN 'High Engagement'
    WHEN SUM(ai.clicked) / COUNT(ai.impression_id) >= 0.03 THEN 'Medium Engagement'
    ELSE 'Low Engagement'
  END AS engagement_level
FROM users u
LEFT JOIN ad_impressions ai ON u.user_id = ai.user_id
  AND ai.shown_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.user_id, u.country
ORDER BY clicks DESC;
\`\`\`

The result: each user now has an \`engagement_level\` label. Marketing can use this to target high-engagement users with premium campaigns and low-engagement users with re-engagement ads.

Alex also uses CASE to bucket revenue into tiers for a histogram:

\`\`\`sql
SELECT
  CASE
    WHEN revenue = 0 THEN '$0'
    WHEN revenue < 0.01 THEN '$0–$0.01'
    WHEN revenue < 0.05 THEN '$0.01–$0.05'
    WHEN revenue < 0.10 THEN '$0.05–$0.10'
    ELSE '$0.10+'
  END AS revenue_bucket,
  COUNT(*) AS impressions
FROM ad_impressions
GROUP BY revenue_bucket
ORDER BY MIN(revenue);
\`\`\`

**CASE expressions turn raw numbers into human-readable categories. They're used in almost every data analysis report.**`,
            content: `# CASE Expressions

CASE is SQL's way of writing IF/ELSE logic directly in a query.

## Simple CASE

\`\`\`sql
SELECT name,
  CASE department
    WHEN 'Engineering' THEN 'Tech'
    WHEN 'Marketing'   THEN 'Business'
    WHEN 'HR'          THEN 'People'
    ELSE 'Other'
  END AS dept_category
FROM employees;
\`\`\`

## Searched CASE (more powerful)

\`\`\`sql
SELECT name, salary,
  CASE
    WHEN salary >= 100000 THEN 'Senior'
    WHEN salary >= 70000  THEN 'Mid-Level'
    WHEN salary >= 50000  THEN 'Junior'
    ELSE 'Entry Level'
  END AS seniority
FROM employees;
\`\`\`

## CASE in GROUP BY and aggregates

\`\`\`sql
-- Count employees by salary band
SELECT
  CASE
    WHEN salary >= 100000 THEN 'Senior'
    WHEN salary >= 70000  THEN 'Mid-Level'
    ELSE 'Junior'
  END AS band,
  COUNT(*) AS count
FROM employees
GROUP BY band
ORDER BY MIN(salary) DESC;
\`\`\`

## CASE for pivot-style reporting

\`\`\`sql
SELECT
  department,
  SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) AS male_count,
  SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) AS female_count
FROM employees
GROUP BY department;
\`\`\`

## CASE in ORDER BY

\`\`\`sql
SELECT name, department FROM employees
ORDER BY
  CASE department
    WHEN 'Engineering' THEN 1
    WHEN 'Product' THEN 2
    ELSE 3
  END;
\`\`\``,
          },
          {
            id: "sql-l11",
            title: "String & Date Functions",
            description: "Manipulate text and work with dates",
            duration: "22 min",
            xp: 100,
            readingTime: "22 min",
            realWorld: `## Alex Cleans Messy Data and Slices Timestamps

Real data is messy. Alex regularly gets CSV uploads from marketing agencies where:
- Email addresses have inconsistent casing (ALEX@Meta.com vs alex@meta.com)
- Campaign names have trailing spaces
- Dates are stored as strings

Here's how he handles it:

\`\`\`sql
-- Standardize email addresses before de-duplicating
SELECT
  LOWER(TRIM(email)) AS clean_email,
  COUNT(*) AS occurrences
FROM imported_contacts
GROUP BY LOWER(TRIM(email))
HAVING occurrences > 1;  -- find duplicates
\`\`\`

For date analysis, Alex constantly slices timestamps:

\`\`\`sql
-- Revenue by hour of day (to find peak ad performance times)
SELECT
  HOUR(shown_at) AS hour_of_day,
  COUNT(*) AS impressions,
  SUM(revenue) AS revenue
FROM ad_impressions
WHERE DATE(shown_at) = CURDATE() - INTERVAL 1 DAY
GROUP BY HOUR(shown_at)
ORDER BY hour_of_day;
\`\`\`

\`\`\`sql
-- Week-over-week growth
SELECT
  YEARWEEK(shown_at) AS week,
  SUM(revenue) AS weekly_revenue
FROM ad_impressions
GROUP BY YEARWEEK(shown_at)
ORDER BY week DESC
LIMIT 8;
\`\`\`

**String and date functions are the "cleanup crew" of SQL. In real data engineering, you spend 30% of your time just cleaning data — these functions are your tools.**`,
            content: `# String Functions

## Common String Functions

\`\`\`sql
-- Length of a string
SELECT LENGTH('Hello World');  -- 11

-- Uppercase / Lowercase
SELECT UPPER(name), LOWER(email) FROM employees;

-- Trim whitespace
SELECT TRIM('  hello  ');        -- 'hello'
SELECT LTRIM('  hello');         -- 'hello'
SELECT RTRIM('hello  ');         -- 'hello'

-- Concatenate strings
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;
-- Or use the || operator (PostgreSQL / SQLite):
SELECT first_name || ' ' || last_name AS full_name FROM employees;

-- Substring
SELECT SUBSTRING(email, 1, 5) FROM employees;  -- first 5 chars

-- Replace
SELECT REPLACE(phone, '-', '') FROM employees;  -- remove dashes

-- Position of a character
SELECT POSITION('@' IN email) FROM employees;
\`\`\`

# Date Functions (PostgreSQL)

\`\`\`sql
-- Current date and time
SELECT NOW();           -- 2025-01-15 14:30:00
SELECT CURRENT_DATE;   -- 2025-01-15
SELECT CURRENT_TIME;   -- 14:30:00

-- Extract parts of a date
SELECT EXTRACT(YEAR FROM hire_date)  AS hire_year FROM employees;
SELECT EXTRACT(MONTH FROM hire_date) AS hire_month FROM employees;
SELECT EXTRACT(DOW FROM hire_date)   AS day_of_week FROM employees;

-- Date arithmetic
SELECT name, hire_date,
  NOW() - hire_date AS tenure,
  EXTRACT(YEAR FROM AGE(hire_date)) AS years_employed
FROM employees;

-- Add / subtract intervals
SELECT hire_date + INTERVAL '90 days' AS probation_end FROM employees;

-- Format a date
SELECT TO_CHAR(hire_date, 'Month DD, YYYY') FROM employees;
-- → 'January 15, 2025'

-- Cast string to date
SELECT CAST('2025-01-15' AS DATE);
SELECT '2025-01-15'::DATE;  -- PostgreSQL shorthand
\`\`\``,
          },
        ],
        quiz: {
          id: "sql-q2",
          questions: [
            {
              id: "sq2-q1",
              type: "MCQ",
              question: "Which JOIN returns only rows that have matches in both tables?",
              options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
              correctAnswer: "INNER JOIN",
              explanation: "INNER JOIN returns only rows where there is a match in both tables. Non-matching rows are excluded.",
            },
            {
              id: "sq2-q2",
              type: "MCQ",
              question: "What is the difference between WHERE and HAVING?",
              options: [
                "No difference",
                "WHERE filters rows before grouping, HAVING filters after grouping",
                "HAVING filters rows before grouping, WHERE filters after grouping",
                "WHERE works with aggregate functions, HAVING does not",
              ],
              correctAnswer: "WHERE filters rows before grouping, HAVING filters after grouping",
              explanation: "WHERE filters individual rows before GROUP BY runs. HAVING filters the groups produced by GROUP BY.",
            },
            {
              id: "sq2-q3",
              type: "MCQ",
              question: "Which aggregate function counts all rows including NULL values?",
              options: ["COUNT(column)", "COUNT(*)", "SUM(*)", "TOTAL()"],
              correctAnswer: "COUNT(*)",
              explanation: "COUNT(*) counts all rows regardless of NULL values. COUNT(column) only counts non-NULL values in that column.",
            },
            {
              id: "sq2-q4",
              type: "MCQ",
              question: "What does a correlated subquery do?",
              options: [
                "Runs once for the entire query",
                "References a column from the outer query and runs once per outer row",
                "Returns multiple result sets",
                "Only works with EXISTS",
              ],
              correctAnswer: "References a column from the outer query and runs once per outer row",
              explanation: "Correlated subqueries reference the outer query's columns and re-execute for each row of the outer query.",
            },
            {
              id: "sq2-q5",
              type: "MCQ",
              question: "In a CASE expression, what does the ELSE clause do?",
              options: [
                "It's required in every CASE",
                "It throws an error for unmatched rows",
                "It returns NULL if omitted and no condition matches",
                "It exits the query",
              ],
              correctAnswer: "It returns NULL if omitted and no condition matches",
              explanation: "ELSE is optional. If no condition matches and ELSE is omitted, the CASE expression returns NULL.",
            },
            {
              id: "sq2-q6",
              type: "MCQ",
              question: "Which function would you use to concatenate 'John' and 'Doe' into 'John Doe'?",
              options: [
                "JOIN('John', ' ', 'Doe')",
                "CONCAT('John', ' ', 'Doe')",
                "MERGE('John', 'Doe')",
                "COMBINE('John Doe')",
              ],
              correctAnswer: "CONCAT('John', ' ', 'Doe')",
              explanation: "CONCAT() joins strings together. In PostgreSQL you can also use the || operator: 'John' || ' ' || 'Doe'.",
            },
          ],
        },
      },

      // ─────────────────────────────────────────
      // SECTION 3: Advanced SQL
      // ─────────────────────────────────────────
      {
        id: "sql-s3",
        title: "Advanced SQL",
        description: "CTEs, Window Functions, Indexes, and Query Optimization",
        lessons: [
          {
            id: "sql-l12",
            title: "Common Table Expressions (CTEs)",
            description: "Write cleaner, readable queries with CTEs",
            duration: "20 min",
            xp: 125,
            readingTime: "20 min",
            realWorld: `## Alex Refactors a Nightmare Query

Alex inherited a query from a previous engineer. It's 80 lines long, uses 4 nested subqueries, and nobody can read it. His manager asks him to make it maintainable.

Here's what the old version looked like (simplified):

\`\`\`sql
-- Old: Nested subquery mess
SELECT country, total_rev, total_users,
  total_rev / total_users AS rev_per_user
FROM (
  SELECT country, SUM(revenue) AS total_rev
  FROM ad_impressions GROUP BY country
) r
JOIN (
  SELECT country, COUNT(*) AS total_users
  FROM users GROUP BY country
) u USING (country)
WHERE total_users > 500;
\`\`\`

Alex rewrites it with CTEs:

\`\`\`sql
-- New: Clean CTEs
WITH revenue_by_country AS (
  SELECT country, SUM(revenue) AS total_rev
  FROM ad_impressions
  GROUP BY country
),
users_by_country AS (
  SELECT country, COUNT(*) AS total_users
  FROM users
  GROUP BY country
),
combined AS (
  SELECT
    r.country,
    r.total_rev,
    u.total_users,
    r.total_rev / u.total_users AS rev_per_user
  FROM revenue_by_country r
  JOIN users_by_country u USING (country)
  WHERE u.total_users > 500
)
SELECT * FROM combined
ORDER BY rev_per_user DESC;
\`\`\`

His team can now read every step. When someone asks "what does this query do?", Alex can point to each CTE and explain it in one sentence.

**CTEs are the difference between a query you'll understand in 6 months and one you'll never touch again.**`,
            content: `# Common Table Expressions (CTEs)

CTEs make complex queries more readable using the WITH keyword. Think of them as temporary named result sets.

## Basic CTE

\`\`\`sql
WITH high_earners AS (
  SELECT name, salary, department
  FROM employees
  WHERE salary > 80000
)
SELECT * FROM high_earners
ORDER BY salary DESC;
\`\`\`

## Multiple CTEs

\`\`\`sql
WITH
dept_averages AS (
  SELECT department, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department
),
above_avg AS (
  SELECT e.name, e.salary, e.department, d.avg_sal
  FROM employees e
  JOIN dept_averages d ON e.department = d.department
  WHERE e.salary > d.avg_sal
)
SELECT * FROM above_avg ORDER BY department, salary DESC;
\`\`\`

## CTE vs Subquery

CTEs are not necessarily faster — they have the same performance as equivalent subqueries in most databases. Their power is readability and reusability within a query.

## Recursive CTE

Used for hierarchical data like org charts or category trees:

\`\`\`sql
WITH RECURSIVE org_chart AS (
  -- Base case: top-level employees (no manager)
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: employees reporting to someone
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT level, name FROM org_chart
ORDER BY level, name;
\`\`\``,
          },
          {
            id: "sql-l13",
            title: "Window Functions",
            description: "ROW_NUMBER, RANK, LAG, LEAD, running totals",
            duration: "28 min",
            xp: 150,
            readingTime: "28 min",
            realWorld: `## Alex Calculates Week-Over-Week Revenue Growth

Alex's VP asks: "For each week, what was our revenue growth compared to the previous week?"

Without window functions, this would require two subqueries and a self-join. With LAG, it's one clean query:

\`\`\`sql
WITH weekly_revenue AS (
  SELECT
    YEARWEEK(shown_at) AS week,
    SUM(revenue) AS revenue
  FROM ad_impressions
  GROUP BY YEARWEEK(shown_at)
)
SELECT
  week,
  revenue,
  LAG(revenue) OVER (ORDER BY week) AS prev_week_revenue,
  ROUND(
    (revenue - LAG(revenue) OVER (ORDER BY week))
    / LAG(revenue) OVER (ORDER BY week) * 100, 1
  ) AS growth_pct
FROM weekly_revenue
ORDER BY week DESC
LIMIT 12;
\`\`\`

He also uses RANK to find the top ad per country:

\`\`\`sql
WITH ranked_ads AS (
  SELECT
    country,
    ad_id,
    SUM(revenue) AS total_revenue,
    RANK() OVER (PARTITION BY country ORDER BY SUM(revenue) DESC) AS rnk
  FROM ad_impressions
  GROUP BY country, ad_id
)
SELECT country, ad_id, total_revenue
FROM ranked_ads
WHERE rnk = 1;
\`\`\`

**Window functions are what separate junior SQL writers from senior data engineers. Once you learn them, you'll wonder how you ever lived without them.**`,
            content: `# Window Functions

Window functions perform calculations across a set of rows related to the current row — without collapsing rows like GROUP BY does.

## Syntax

\`\`\`sql
function_name() OVER (
  PARTITION BY column   -- optional: divide into groups
  ORDER BY column       -- optional: define row order
  ROWS BETWEEN ...      -- optional: define frame
)
\`\`\`

## Ranking Functions

\`\`\`sql
SELECT name, salary, department,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS overall_rank,
  RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_dense_rank
FROM employees;
\`\`\`

- **ROW_NUMBER()**: Unique sequential number (1, 2, 3, 4...)
- **RANK()**: Same value gets same rank, skips next (1, 2, 2, 4...)
- **DENSE_RANK()**: Same value gets same rank, no skip (1, 2, 2, 3...)

## Lead and Lag

Access values from other rows:

\`\`\`sql
SELECT name, salary, hire_date,
  LAG(salary)  OVER (ORDER BY hire_date) AS prev_employee_salary,
  LEAD(salary) OVER (ORDER BY hire_date) AS next_employee_salary,
  salary - LAG(salary) OVER (ORDER BY hire_date) AS salary_diff
FROM employees;
\`\`\`

## Running Totals

\`\`\`sql
SELECT name, salary,
  SUM(salary) OVER (ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM employees;
\`\`\`

## Department Percentiles

\`\`\`sql
SELECT name, salary, department,
  PERCENT_RANK() OVER (PARTITION BY department ORDER BY salary) AS pct_rank,
  NTILE(4)       OVER (PARTITION BY department ORDER BY salary) AS quartile
FROM employees;
\`\`\``,
          },
          {
            id: "sql-l14",
            title: "Indexes & Query Optimization",
            description: "Make your queries blazing fast",
            duration: "30 min",
            xp: 150,
            readingTime: "30 min",
            realWorld: `## Alex Fixes a Query That's Killing Production

At 2 PM on a Tuesday, Alex gets a PagerDuty alert: the MySQL database is at 99% CPU. The culprit is one query running every 5 minutes from a dashboard.

He runs EXPLAIN on it:

\`\`\`sql
EXPLAIN SELECT user_id, SUM(revenue)
FROM ad_impressions
WHERE country = 'US'
  AND shown_at >= '2024-03-01'
GROUP BY user_id;
\`\`\`

The output shows: **type: ALL** (full table scan), **rows: 842,000,000**. It's scanning 842 million rows every 5 minutes with no index.

Alex adds a composite index:

\`\`\`sql
CREATE INDEX idx_country_date ON ad_impressions (country, shown_at);
\`\`\`

He runs EXPLAIN again. Now: **type: range**, **rows: 1,200,000**. The query now scans 1.2 million rows instead of 842 million — a 700x improvement.

Query time drops from 45 seconds to 0.3 seconds. CPU drops from 99% to 8%. The PagerDuty alert resolves itself.

Alex's manager sends a 🚀 emoji in Slack.

**Indexes are one of the highest-leverage skills in SQL. A well-placed index can turn a minutes-long query into one that runs in milliseconds. At scale, this is the difference between a working product and a crashed one.**`,
            content: `# SQL Indexes & Optimization

Indexes are data structures that speed up data retrieval. Think of them like the index in a book.

## Creating Indexes

\`\`\`sql
-- Basic index on a single column
CREATE INDEX idx_employee_email ON employees(email);

-- Composite index (multi-column)
CREATE INDEX idx_dept_salary ON employees(department, salary);

-- Unique index
CREATE UNIQUE INDEX idx_email_unique ON employees(email);

-- Partial index (only index rows meeting a condition)
CREATE INDEX idx_active_employees ON employees(name)
WHERE status = 'active';
\`\`\`

## When to Use Indexes

✅ Use indexes on:
- Columns frequently used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY or GROUP BY
- Foreign key columns

❌ Avoid indexes on:
- Small tables
- Columns rarely queried
- Columns with very few distinct values (like boolean)

## EXPLAIN ANALYZE

See exactly how PostgreSQL executes your query:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM employees WHERE email = 'alice@company.com';
\`\`\`

Look for **Seq Scan** (slow — full table scan) vs **Index Scan** (fast).

## Common Optimization Tips

\`\`\`sql
-- BAD: function on indexed column disables the index
SELECT * FROM employees WHERE LOWER(email) = 'alice@company.com';

-- GOOD: store email already lowercased, or use expression index
CREATE INDEX idx_email_lower ON employees(LOWER(email));
SELECT * FROM employees WHERE LOWER(email) = 'alice@company.com';

-- BAD: SELECT * in production (fetches unused columns)
SELECT * FROM employees WHERE department = 'Engineering';

-- GOOD: select only what you need
SELECT id, name, salary FROM employees WHERE department = 'Engineering';
\`\`\``,
          },
          {
            id: "sql-l15",
            title: "Transactions & ACID",
            description: "Keep your data safe and consistent",
            duration: "20 min",
            xp: 125,
            readingTime: "20 min",
            realWorld: `## Alex Prevents a Double-Payment Bug

Meta's ad billing system charges advertisers once per month. A bug report comes in: some advertisers are being charged twice.

Alex investigates. The charge operation involves two steps:
1. Insert a payment record into \`payments\`
2. Update the campaign's \`balance\` to 0

If the server crashes between step 1 and step 2, the payment is recorded but the balance isn't cleared. On retry, it charges again.

The fix: wrap it in a transaction:

\`\`\`sql
START TRANSACTION;

-- Step 1: Record the charge
INSERT INTO payments (campaign_id, amount, charged_at, status)
VALUES (9045, 50000.00, NOW(), 'completed');

-- Step 2: Clear the balance
UPDATE campaigns
SET balance = 0, last_charged_at = NOW()
WHERE campaign_id = 9045;

-- Only commit if BOTH steps succeed
COMMIT;

-- If anything fails between START and COMMIT, rollback:
-- ROLLBACK;
\`\`\`

With this transaction, the database guarantees: either BOTH changes happen, or NEITHER does. There's no in-between state.

The double-charge bug is fixed. Alex deploys the fix. No more angry advertiser emails.

**Transactions protect your data from partial failures. In any system that handles money, orders, or critical state changes, they're not optional — they're essential.**`,
            content: `# Transactions & ACID

A transaction is a sequence of SQL operations that are treated as a single unit of work.

## ACID Properties

- **Atomicity**: All operations succeed, or none do (all-or-nothing)
- **Consistency**: Data is always in a valid state
- **Isolation**: Concurrent transactions don't interfere with each other
- **Durability**: Committed data survives system failures

## Basic Transaction

\`\`\`sql
BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- If both succeeded:
COMMIT;

-- If something went wrong:
-- ROLLBACK;
\`\`\`

## ROLLBACK on error

\`\`\`sql
BEGIN;

UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 42;

-- Check if we went negative (an error condition)
-- In application code you'd check the result and ROLLBACK if needed

COMMIT;
\`\`\`

## SAVEPOINT — partial rollbacks

\`\`\`sql
BEGIN;

INSERT INTO orders (customer_id, total) VALUES (1, 250);
SAVEPOINT order_saved;

INSERT INTO order_items (order_id, product_id) VALUES (LASTVAL(), 99);
-- If this fails, roll back only to the savepoint:
ROLLBACK TO SAVEPOINT order_saved;

COMMIT;
\`\`\`

## Isolation Levels

| Level            | Dirty Read | Non-repeatable Read | Phantom Read |
|------------------|------------|---------------------|--------------|
| READ UNCOMMITTED | ✓ Yes      | ✓ Yes               | ✓ Yes        |
| READ COMMITTED   | ✗ No       | ✓ Yes               | ✓ Yes        |
| REPEATABLE READ  | ✗ No       | ✗ No                | ✓ Yes        |
| SERIALIZABLE     | ✗ No       | ✗ No                | ✗ No         |

PostgreSQL defaults to READ COMMITTED.

\`\`\`sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\``,
          },
        ],
        quiz: {
          id: "sql-q3",
          questions: [
            {
              id: "sq3-q1",
              type: "MCQ",
              question: "What keyword starts a CTE definition?",
              options: ["DEFINE", "WITH", "CTE", "TEMP"],
              correctAnswer: "WITH",
              explanation: "CTEs are defined using the WITH keyword followed by the CTE name and its SELECT query in parentheses.",
            },
            {
              id: "sq3-q2",
              type: "MCQ",
              question: "What is the difference between RANK() and DENSE_RANK()?",
              options: [
                "They are identical",
                "RANK() skips rank numbers after ties, DENSE_RANK() does not",
                "DENSE_RANK() skips rank numbers after ties, RANK() does not",
                "RANK() only works with PARTITION BY",
              ],
              correctAnswer: "RANK() skips rank numbers after ties, DENSE_RANK() does not",
              explanation: "If two rows tie at rank 2, RANK() gives both rank 2 then skips to 4. DENSE_RANK() gives both rank 2 then continues with 3.",
            },
            {
              id: "sq3-q3",
              type: "MCQ",
              question: "What is the primary purpose of a database index?",
              options: [
                "To enforce data integrity",
                "To speed up data retrieval",
                "To compress data",
                "To encrypt columns",
              ],
              correctAnswer: "To speed up data retrieval",
              explanation: "Indexes create data structures (like B-trees) that allow faster row lookup without scanning the entire table.",
            },
            {
              id: "sq3-q4",
              type: "MCQ",
              question: "In ACID properties, what does Atomicity mean?",
              options: [
                "Transactions run simultaneously",
                "Data is always valid after a transaction",
                "All operations in a transaction succeed or none do",
                "Committed data is permanently saved",
              ],
              correctAnswer: "All operations in a transaction succeed or none do",
              explanation: "Atomicity means a transaction is all-or-nothing. If any part fails, the entire transaction is rolled back.",
            },
            {
              id: "sq3-q5",
              type: "MCQ",
              question: "Which window function gives you access to the previous row's value?",
              options: ["PREV()", "BEFORE()", "LAG()", "BACK()"],
              correctAnswer: "LAG()",
              explanation: "LAG() returns a value from a previous row in the result set. LEAD() gives the next row's value.",
            },
            {
              id: "sq3-q6",
              type: "MCQ",
              question: "What command would you use to undo an in-progress transaction?",
              options: ["UNDO", "REVERT", "ROLLBACK", "CANCEL"],
              correctAnswer: "ROLLBACK",
              explanation: "ROLLBACK undoes all changes made in the current transaction, restoring the database to its state before BEGIN.",
            },
          ],
        },
      },

      // ─────────────────────────────────────────
      // SECTION 4: Database Design
      // ─────────────────────────────────────────
      {
        id: "sql-s4",
        title: "Database Design",
        description: "Schema design, normalization, constraints, and real-world projects",
        lessons: [
          {
            id: "sql-l16",
            title: "Creating Tables & Constraints",
            description: "Define schemas with proper data types and constraints",
            duration: "25 min",
            xp: 125,
            readingTime: "25 min",
            realWorld: `## Alex Designs a New Analytics Table

Meta's data science team asks Alex to create a new table to store daily user engagement metrics by product feature. They need to track: user, feature, date, time spent, actions taken, and whether they returned the next day.

Alex designs the schema carefully:

\`\`\`sql
CREATE TABLE feature_engagement (
  engagement_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id       BIGINT UNSIGNED NOT NULL,
  feature_name  VARCHAR(100)    NOT NULL,
  event_date    DATE            NOT NULL,
  time_spent_sec INT UNSIGNED   NOT NULL DEFAULT 0,
  action_count  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  returned_next_day TINYINT(1)  NOT NULL DEFAULT 0,  -- 0 or 1 (boolean)
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  UNIQUE KEY uq_user_feature_date (user_id, feature_name, event_date),
  INDEX idx_feature_date (feature_name, event_date),
  INDEX idx_user_date (user_id, event_date)
);
\`\`\`

Decisions he made:
- **BIGINT** for user_id because Meta has billions of users
- **UNIQUE constraint** on (user_id, feature_name, event_date) to prevent duplicate rows
- **Indexes** on the columns he'll filter and group by most often
- **SMALLINT** for action_count (max 32,767) — enough, uses less space than INT
- **TINYINT(1)** as a boolean flag — standard MySQL pattern

**Schema design is where bugs get prevented or introduced. The constraints and indexes you add at creation time determine how reliable and fast your database will be for years.**`,
            content: `# Creating Tables & Constraints

## CREATE TABLE

\`\`\`sql
CREATE TABLE employees (
  id          SERIAL        PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  UNIQUE NOT NULL,
  department  VARCHAR(50),
  salary      DECIMAL(10,2) DEFAULT 0,
  hire_date   DATE          DEFAULT CURRENT_DATE,
  is_active   BOOLEAN       DEFAULT TRUE,
  manager_id  INT           REFERENCES employees(id)
);
\`\`\`

## Common Data Types

| Type             | Use for                        |
|------------------|--------------------------------|
| INT / BIGINT     | Whole numbers                  |
| SERIAL / BIGSERIAL | Auto-incrementing ID         |
| DECIMAL(p,s)     | Exact decimals (money)         |
| FLOAT / REAL     | Approximate decimals           |
| VARCHAR(n)       | Variable-length text           |
| TEXT             | Unlimited text                 |
| BOOLEAN          | True/false                     |
| DATE             | Year-month-day                 |
| TIMESTAMP        | Date and time                  |
| UUID             | Universally unique identifier  |
| JSONB            | JSON data (PostgreSQL)         |

## Constraints

\`\`\`sql
-- NOT NULL: column must have a value
name VARCHAR(100) NOT NULL,

-- UNIQUE: no duplicate values
email VARCHAR(150) UNIQUE,

-- CHECK: custom validation
salary DECIMAL(10,2) CHECK (salary >= 0),
age INT CHECK (age BETWEEN 18 AND 100),

-- FOREIGN KEY: references another table
department_id INT REFERENCES departments(id) ON DELETE SET NULL,

-- PRIMARY KEY (can be composite)
PRIMARY KEY (order_id, product_id)
\`\`\`

## Modifying Tables

\`\`\`sql
-- Add a column
ALTER TABLE employees ADD COLUMN phone VARCHAR(20);

-- Remove a column
ALTER TABLE employees DROP COLUMN phone;

-- Change a column type
ALTER TABLE employees ALTER COLUMN salary TYPE BIGINT;

-- Rename a table
ALTER TABLE employees RENAME TO staff;

-- Drop a table
DROP TABLE IF EXISTS temp_table;
\`\`\``,
          },
          {
            id: "sql-l17",
            title: "Normalization",
            description: "Design clean, efficient database schemas",
            duration: "25 min",
            xp: 150,
            readingTime: "25 min",
            realWorld: `## Alex Fixes a Denormalized Mess

When Alex joined, the legacy \`ad_reports\` table looked like this:

\`\`\`
ad_id | advertiser_name | advertiser_email | campaign_name | campaign_budget | revenue
------+-----------------+------------------+---------------+----------------+---------
1001  | Acme Corp       | billing@acme.com | Summer Sale   | 50000          | 340.50
1002  | Acme Corp       | billing@acme.com | Summer Sale   | 50000          | 120.00
1003  | Acme Corp       | billing@acme.com | Winter Push   | 30000          | 89.75
\`\`\`

Problems:
- Acme Corp's email is repeated thousands of times. If it changes, you have to update thousands of rows.
- The campaign budget is repeated for every ad. Inconsistency risk is high.
- Storage is wasted.

Alex normalized it into 3 tables:

\`\`\`sql
-- Table 1: advertisers (one row per advertiser)
CREATE TABLE advertisers (
  advertiser_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Table 2: campaigns (one row per campaign)
CREATE TABLE campaigns (
  campaign_id INT PRIMARY KEY AUTO_INCREMENT,
  advertiser_id INT NOT NULL REFERENCES advertisers(advertiser_id),
  name VARCHAR(255) NOT NULL,
  budget DECIMAL(12,2) NOT NULL
);

-- Table 3: ad_reports (one row per ad)
CREATE TABLE ad_reports (
  ad_id INT PRIMARY KEY,
  campaign_id INT NOT NULL REFERENCES campaigns(campaign_id),
  revenue DECIMAL(10,4) NOT NULL DEFAULT 0
);
\`\`\`

Now to get the full picture, you JOIN the tables. But each piece of data is stored exactly once, in the right place.

**Normalization is the principle that prevents databases from turning into unmaintainable swamps. Every professional database schema is built on these ideas.**`,
            content: `# Database Normalization

Normalization is the process of organizing a database to reduce redundancy and improve data integrity.

## First Normal Form (1NF)

Each column contains atomic (single) values. No repeating groups.

❌ BAD:
\`\`\`
| id | name  | phone_numbers          |
|----|-------|------------------------|
| 1  | Alice | 555-1234, 555-5678     |
\`\`\`

✅ GOOD:
\`\`\`
| id | name  |     | employee_id | phone      |
|----|-------|     |-------------|------------|
| 1  | Alice |     | 1           | 555-1234   |
                    | 1           | 555-5678   |
\`\`\`

## Second Normal Form (2NF)

All non-key columns depend on the entire primary key (no partial dependencies). Applies to composite keys.

## Third Normal Form (3NF)

No transitive dependencies — non-key columns don't depend on other non-key columns.

❌ BAD (department_name depends on dept_id, not employee id):
\`\`\`
employees: id, name, dept_id, department_name
\`\`\`

✅ GOOD — split into two tables:
\`\`\`sql
CREATE TABLE departments (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  department_id INT REFERENCES departments(id)
);
\`\`\`

## Real-World Example: E-commerce Schema

\`\`\`sql
CREATE TABLE customers (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0)
);

CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  customer_id INT  REFERENCES customers(id),
  order_date  DATE DEFAULT CURRENT_DATE,
  status      VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INT            REFERENCES orders(id),
  product_id INT            REFERENCES products(id),
  quantity   INT            NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2)  NOT NULL
);
\`\`\``,
          },
          {
            id: "sql-l18",
            title: "Views & Stored Procedures",
            description: "Save and reuse complex queries",
            duration: "20 min",
            xp: 125,
            readingTime: "20 min",
            realWorld: `## Alex Gives His Team a Self-Service Dashboard

After months of getting the same data requests ("can you pull revenue by country?", "can you get me user counts for this week?"), Alex creates views so his team can query the data themselves without needing to understand the underlying schema.

\`\`\`sql
-- View: daily revenue summary (easy for anyone to query)
CREATE VIEW daily_revenue_summary AS
SELECT
  DATE(ai.shown_at) AS report_date,
  ai.country,
  ai.device_type,
  COUNT(*) AS impressions,
  SUM(ai.revenue) AS total_revenue,
  SUM(ai.clicked) AS clicks
FROM ad_impressions ai
GROUP BY DATE(ai.shown_at), ai.country, ai.device_type;
\`\`\`

Now any teammate can run:

\`\`\`sql
SELECT * FROM daily_revenue_summary
WHERE report_date = CURDATE() - INTERVAL 1 DAY
  AND country = 'US'
ORDER BY total_revenue DESC;
\`\`\`

They don't need to know about \`ad_impressions\` or how to write a GROUP BY. The complexity is hidden inside the view.

Alex also creates a stored procedure to automate the monthly billing report:

\`\`\`sql
DELIMITER //
CREATE PROCEDURE GenerateMonthlyBillingReport(IN target_month VARCHAR(7))
BEGIN
  SELECT
    c.campaign_id,
    c.name AS campaign_name,
    a.name AS advertiser,
    SUM(ai.revenue) AS monthly_revenue
  FROM campaigns c
  JOIN advertisers a ON c.advertiser_id = a.advertiser_id
  JOIN ad_reports ar ON ar.campaign_id = c.campaign_id
  JOIN ad_impressions ai ON ai.ad_id = ar.ad_id
  WHERE DATE_FORMAT(ai.shown_at, '%Y-%m') = target_month
  GROUP BY c.campaign_id, c.name, a.name
  ORDER BY monthly_revenue DESC;
END //
DELIMITER ;

-- Call it:
CALL GenerateMonthlyBillingReport('2024-03');
\`\`\`

**Views and stored procedures are how data engineers scale their work — instead of writing the same query 50 times, they write it once and share it.**`,
            content: `# Views

A VIEW is a saved SQL query that you can use like a table.

## Creating a View

\`\`\`sql
CREATE VIEW active_employees AS
SELECT id, name, department, salary
FROM employees
WHERE is_active = TRUE;

-- Use it like a table
SELECT * FROM active_employees WHERE department = 'Engineering';
\`\`\`

## Updating a View

\`\`\`sql
CREATE OR REPLACE VIEW active_employees AS
SELECT id, name, department, salary, hire_date
FROM employees
WHERE is_active = TRUE;
\`\`\`

## Drop a View

\`\`\`sql
DROP VIEW IF EXISTS active_employees;
\`\`\`

## Materialized Views (PostgreSQL)

A materialized view stores the query result physically — great for expensive queries:

\`\`\`sql
CREATE MATERIALIZED VIEW dept_summary AS
SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- Refresh when data changes
REFRESH MATERIALIZED VIEW dept_summary;
\`\`\`

# Functions (PostgreSQL)

\`\`\`sql
-- Create a simple function
CREATE OR REPLACE FUNCTION get_employee_count(dept TEXT)
RETURNS INT AS $$
  SELECT COUNT(*) FROM employees WHERE department = dept;
$$ LANGUAGE SQL;

-- Use it
SELECT get_employee_count('Engineering');  -- returns 15
\`\`\`

# Triggers

Triggers automatically run SQL when INSERT, UPDATE, or DELETE occurs:

\`\`\`sql
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
\`\`\``,
          },
        ],
        quiz: {
          id: "sql-q4",
          questions: [
            {
              id: "sq4-q1",
              type: "MCQ",
              question: "Which constraint ensures a column cannot store duplicate values?",
              options: ["NOT NULL", "UNIQUE", "PRIMARY KEY", "FOREIGN KEY"],
              correctAnswer: "UNIQUE",
              explanation: "UNIQUE ensures all values in a column are distinct. Note: PRIMARY KEY also implies UNIQUE but also NOT NULL.",
            },
            {
              id: "sq4-q2",
              type: "MCQ",
              question: "What is the main goal of database normalization?",
              options: [
                "Make queries run faster",
                "Reduce data redundancy and improve integrity",
                "Add more indexes",
                "Encrypt sensitive data",
              ],
              correctAnswer: "Reduce data redundancy and improve integrity",
              explanation: "Normalization organizes tables to eliminate redundant data and prevent update/insert/delete anomalies.",
            },
            {
              id: "sq4-q3",
              type: "MCQ",
              question: "What is a VIEW in SQL?",
              options: [
                "A copy of a table",
                "A saved SQL query treated like a table",
                "An index on multiple columns",
                "A temporary table that expires after a session",
              ],
              correctAnswer: "A saved SQL query treated like a table",
              explanation: "A VIEW is a stored SQL query. When you query a view, the underlying SELECT runs. It doesn't store data itself (unless it's a materialized view).",
            },
            {
              id: "sq4-q4",
              type: "MCQ",
              question: "What data type would you use to store currency values accurately in PostgreSQL?",
              options: ["FLOAT", "REAL", "DECIMAL(10,2)", "INT"],
              correctAnswer: "DECIMAL(10,2)",
              explanation: "DECIMAL (or NUMERIC) stores exact values, crucial for money. FLOAT/REAL use floating-point approximation which can cause rounding errors.",
            },
            {
              id: "sq4-q5",
              type: "MCQ",
              question: "In Third Normal Form (3NF), what must be eliminated?",
              options: [
                "All NULL values",
                "Transitive dependencies (non-key columns depending on other non-key columns)",
                "Columns with only one distinct value",
                "All foreign keys",
              ],
              correctAnswer: "Transitive dependencies (non-key columns depending on other non-key columns)",
              explanation: "3NF requires that all non-key columns depend only on the primary key, not on other non-key columns.",
            },
            {
              id: "sq4-q6",
              type: "MCQ",
              question: "What is the difference between a regular VIEW and a MATERIALIZED VIEW?",
              options: [
                "No difference",
                "A VIEW stores results physically; MATERIALIZED VIEW does not",
                "A MATERIALIZED VIEW stores results physically; regular VIEW runs the query each time",
                "MATERIALIZED VIEW can only be used with aggregates",
              ],
              correctAnswer: "A MATERIALIZED VIEW stores results physically; regular VIEW runs the query each time",
              explanation: "Materialized views cache the query result on disk, making reads faster but requiring periodic REFRESH to stay current.",
            },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // AZURE COURSE
  // ═══════════════════════════════════════════════════════════
  {
    id: "azure",
    title: "Azure Admin Zero to Hero",
    slug: "azure",
    description: "Go from zero to confidently managing Azure infrastructure. Full AZ-104 prep.",
    icon: "☁️",
    color: "#7c3aed",
    totalXP: 4500,
    sections: [
      // ─────────────────────────────────────────
      // SECTION 0: Azure Careers in IT
      // ─────────────────────────────────────────
      {
        id: "az-s0",
        title: "Azure Careers in IT",
        description: "Why cloud skills matter, who uses Azure, and what your career can look like",
        lessons: [
          {
            id: "az-l0",
            title: "Why Azure is the #1 Cloud Skill in IT",
            description: "The cloud has changed IT forever — here's why Azure leads the market",
            duration: "10 min",
            xp: 50,
            readingTime: "10 min",
            realWorld: `## Sarah Gets the Azure Job

Sarah had been working in on-premises IT support for 3 years. Her company was migrating everything to Azure. Her manager gave her a choice: learn Azure in 3 months or face redundancy.

She passed the AZ-104 exam 10 weeks later.

Her new job title: **Cloud Infrastructure Engineer**. Salary went from £38,000 to £65,000.

> "The exam felt intimidating at first. But once I understood how Azure is organized — subscriptions, resource groups, services — everything clicked. The hardest part was just getting started."

Her day now involves:
- Deploying VMs and web apps for internal teams
- Managing Azure AD for 800 employees
- Monitoring costs and setting budget alerts
- Setting up VPNs and private networks
- Running CI/CD pipelines for the dev team

**This course will take you from zero to everything Sarah does every day.**`,
            content: `# Why Azure is the #1 Cloud Skill in IT

Cloud computing has completely transformed IT. Companies don't buy physical servers anymore — they rent computing power, storage, and services from cloud providers and pay only for what they use.

Microsoft Azure is the #2 cloud provider in the world (behind AWS) and the #1 choice in enterprise environments — banks, governments, hospitals, and Fortune 500 companies all run on Azure.

**If you work in IT, Azure knowledge is no longer optional.**

## The Azure Job Market

Azure skills are among the most in-demand in the entire technology industry. Here's why:

- **Microsoft is everywhere** — 90% of Fortune 500 companies already use Microsoft products. Azure is the natural cloud choice.
- **Enterprise-first** — companies with existing Microsoft licenses (Office 365, Windows Server, SQL Server) get huge discounts moving to Azure
- **Government cloud** — Azure has dedicated government cloud regions, making it dominant in public sector IT
- **Hybrid cloud** — Azure Arc lets companies manage on-premises servers alongside cloud resources, which is unique to Azure

## Azure Career Paths

### 1. Cloud/Azure Administrator
Manages Azure infrastructure — VMs, networking, storage, identity. This is the AZ-104 role.

**Average salary:** £55,000–£90,000 / $80,000–$130,000

### 2. Cloud Architect
Designs cloud solutions for enterprises. Requires AZ-104 + AZ-305.

**Average salary:** £80,000–£130,000 / $120,000–$180,000

### 3. Cloud Security Engineer
Secures cloud workloads. Uses Azure Defender, Sentinel, and Policy.

**Average salary:** £75,000–£120,000 / $110,000–$160,000

### 4. DevOps Engineer
Automates deployments using Azure DevOps, Pipelines, and AKS.

**Average salary:** £70,000–£115,000 / $100,000–$155,000

### 5. Cloud Data Engineer
Builds data pipelines in Azure Data Factory, Synapse, and Databricks.

**Average salary:** £70,000–£110,000 / $100,000–$150,000

## The AZ-104 Certification

This course prepares you for the **AZ-104: Microsoft Azure Administrator** exam — the most valuable entry-level Azure certification.

What it proves:
- You can deploy and manage Azure resources
- You understand Azure identity and governance
- You can configure storage and networking
- You can monitor and back up Azure workloads

**Passing AZ-104 typically increases salary by 15–30%.**

## What This Course Covers

| Section | Topics |
|---------|--------|
| Section 1 | Cloud fundamentals, Azure Portal, subscriptions, cost management |
| Section 2 | Virtual Machines, Virtual Networks, Load Balancing |
| Section 3 | Azure AD (Entra ID), RBAC, Monitor, Backup |
| Section 4 | Storage, App Service, Key Vault, Azure DevOps |

By the end, you'll be able to manage Azure infrastructure from scratch and be ready for the AZ-104 exam.

## A Note on Pricing

Azure has a **free account** that gives you:
- 12 months of popular free services
- $200 credit for 30 days
- 55+ always-free services

Sign up at azure.microsoft.com/free to follow along hands-on. Everything in this course works within the free tier.

**Let's start building.**`,
          },
        ],
        quiz: {
          id: "az-q0",
          questions: [
            {
              id: "azq0-q1",
              type: "MCQ",
              question: "Which Azure certification is designed for administrators managing Azure infrastructure?",
              options: ["AZ-900", "AZ-104", "AZ-305", "AZ-400"],
              correctAnswer: "AZ-104",
              explanation: "AZ-104 (Microsoft Azure Administrator) is the core admin certification covering VMs, networking, storage, identity, and governance.",
            },
            {
              id: "azq0-q2",
              type: "MCQ",
              question: "Why is Azure particularly dominant in enterprise environments?",
              options: [
                "It is the cheapest cloud provider",
                "It has the most data centers globally",
                "Most enterprises already use Microsoft products like Office 365 and Windows",
                "It only works on Windows machines",
              ],
              correctAnswer: "Most enterprises already use Microsoft products like Office 365 and Windows",
              explanation: "Azure integrates deeply with Microsoft's existing ecosystem, making it the natural choice for organisations already using Microsoft products.",
            },
            {
              id: "azq0-q3",
              type: "MCQ",
              question: "What does the Azure free account provide?",
              options: [
                "Unlimited free usage forever",
                "12 months of popular free services plus $200 credit for 30 days",
                "Only $200 credit with no free services",
                "Free access only if you pass AZ-900",
              ],
              correctAnswer: "12 months of popular free services plus $200 credit for 30 days",
              explanation: "The Azure free account includes 12 months of popular services, $200 in credits for the first 30 days, and 55+ always-free services.",
            },
          ],
        },
      },

      // ─────────────────────────────────────────
      // SECTION 1: Azure Fundamentals
      // ─────────────────────────────────────────
      {
        id: "az-s1",
        title: "Azure Fundamentals",
        description: "Core cloud concepts, the Azure portal, subscriptions, and management",
        lessons: [
          {
            id: "az-l1",
            title: "What is Cloud Computing?",
            description: "IaaS, PaaS, SaaS, and cloud deployment models explained",
            duration: "15 min",
            xp: 50,
            readingTime: "15 min",
            realWorld: `## Sarah's Company Asks: "Should We Move to the Cloud?"

Sarah's manager calls a meeting. The on-premises data centre lease is up for renewal — £120,000 per year just for the physical space, plus hardware maintenance, cooling, and a dedicated ops team.

Someone suggests: **what if we move to Azure?**

Sarah is asked to prepare a comparison. She looks at three options:

**Option A — Stay on-premises (IaaS equivalent)**
- Buy new servers: £80,000 upfront
- Maintain them: £20,000/year
- Full control, but all risk is on us

**Option B — Azure IaaS (VMs)**
- Rent virtual machines: ~£3,000/month
- No hardware to manage, we still control the OS
- Scale up during busy periods, scale down when quiet

**Option C — Azure PaaS (App Service + Azure SQL)**
- Just deploy the code, Microsoft manages the platform
- ~£1,200/month
- No OS patching, auto-scaling built in

Her recommendation: **Option C for the web app, Option B for the legacy system that can't be refactored yet**.

The company saves £75,000 in year one. Sarah gets a promotion.

**Understanding IaaS vs PaaS vs SaaS isn't just theory — it determines how much you pay and how much you manage.**`,
            content: `# Cloud Computing Fundamentals

Cloud computing delivers computing services — servers, storage, databases, networking, software — over the internet ("the cloud").

## Service Models

### IaaS — Infrastructure as a Service
You rent virtualized hardware. You manage the OS, middleware, and apps.
- **Example**: Azure Virtual Machines, Azure Disk Storage
- **You control**: OS, runtime, middleware, data, apps
- **Azure manages**: servers, networking, virtualization, storage

### PaaS — Platform as a Service
You deploy your application; Azure manages the platform.
- **Example**: Azure App Service, Azure SQL Database, Azure Functions
- **You control**: application code and data
- **Azure manages**: OS, runtime, middleware, servers

### SaaS — Software as a Service
Fully managed software you just use.
- **Example**: Microsoft 365, Dynamics 365, Azure DevOps
- **You control**: data and user access only
- **Azure manages**: everything else

## Cloud Deployment Models

- **Public Cloud** — Resources owned and operated by a cloud provider (Azure, AWS, GCP). Shared infrastructure, accessed via internet.
- **Private Cloud** — Cloud infrastructure operated solely for one organization. More control, more cost.
- **Hybrid Cloud** — Mix of public and private cloud, with data and apps shared between them.
- **Multi-cloud** — Using multiple public cloud providers simultaneously.

## Benefits of Cloud Computing

- **On-demand self-service**: Provision resources without human interaction
- **Broad network access**: Available from anywhere via internet
- **Resource pooling**: Shared infrastructure scaled across customers
- **Rapid elasticity**: Scale up or down instantly
- **Measured service**: Pay only for what you use (pay-as-you-go)

## CapEx vs OpEx

- **CapEx** (Capital Expenditure): Upfront hardware investment (traditional data centers)
- **OpEx** (Operational Expenditure): Pay as you go (cloud) — lower risk, predictable costs`,
          },
          {
            id: "az-l2",
            title: "Azure Portal & Core Services",
            description: "Navigate Azure and understand the core service categories",
            duration: "20 min",
            xp: 75,
            readingTime: "20 min",
            realWorld: `## Sarah's First Week on the Azure Portal

Day 1. Sarah logs into portal.azure.com for the first time. She's met with a dashboard full of tiles, graphs, and a left sidebar with dozens of services.

Her task: find out how many virtual machines the company currently has running.

She clicks "Virtual machines" in the sidebar. Sees 12 VMs. Notes 3 of them have names like "vm-test-old" and "vm-dev-temp" — clearly forgotten. She flags them to be shut down. That saves £180/month instantly.

By end of week 1 she has:
- Pinned her most-used resources to the dashboard (VMs, Resource Groups, Cost Management)
- Installed the Azure mobile app to get cost alerts on her phone
- Discovered the **Cloud Shell** (bash/PowerShell in the browser) — she uses this for quick CLI tasks without installing anything locally
- Set up a **Resource Group** for each project: \`rg-finance\`, \`rg-hr-portal\`, \`rg-devops\`

One thing she learned the hard way: **always use Resource Groups to organise everything**. Resources without a group become impossible to track and delete later.

**The Azure Portal is your control centre. Learn to navigate it fast and you'll save your company money within the first week.**`,
            content: `# The Azure Portal

The Azure portal (portal.azure.com) is a web-based unified console for managing all Azure resources.

## Key Terms

- **Resource**: Any Azure service you create (VM, storage account, database, etc.)
- **Resource Group**: A logical container for related resources that share the same lifecycle
- **Subscription**: A billing and access management boundary
- **Tenant**: Your Azure Active Directory (Entra ID) directory instance
- **Management Group**: Container for organizing multiple subscriptions

## Azure Global Infrastructure

Azure operates across:
- **60+ regions** worldwide (e.g., East US, West Europe, Southeast Asia)
- **Availability Zones**: Physically separate datacenters within a region (high availability)
- **Region Pairs**: Each region is paired with another region ~300 miles away for disaster recovery

## Azure Service Categories

| Category     | Examples                                   |
|-------------|---------------------------------------------|
| Compute      | Virtual Machines, App Service, Functions   |
| Networking   | VNet, Load Balancer, VPN Gateway, DNS      |
| Storage      | Blob Storage, Files, Queues, Tables        |
| Database     | Azure SQL, Cosmos DB, PostgreSQL           |
| Identity     | Azure AD (Entra ID), RBAC                 |
| Security     | Key Vault, Defender for Cloud              |
| Monitoring   | Azure Monitor, Log Analytics, App Insights |

## Azure CLI

The Azure CLI lets you manage resources from the terminal:

\`\`\`bash
# Login
az login

# Create a resource group
az group create --name myRG --location eastus

# List all VMs
az vm list --output table

# Get help on any command
az vm create --help
\`\`\`

## Azure PowerShell

\`\`\`powershell
# Login
Connect-AzAccount

# Create a resource group
New-AzResourceGroup -Name myRG -Location "East US"
\`\`\``,
          },
          {
            id: "az-l3",
            title: "Subscriptions & Management Groups",
            description: "Organize and govern Azure resources at scale",
            duration: "18 min",
            xp: 75,
            readingTime: "18 min",
            realWorld: `## Sarah Reorganises a Billing Nightmare

Six months into her role, Sarah inherits a mess. The company has one Azure subscription. Finance, HR, DevOps, and Marketing all use the same subscription. Nobody knows who owns what. The monthly bill arrives as one number and nobody can explain it.

The CFO emails: "We need to know how much each department is spending on cloud."

Sarah's solution: **separate subscriptions per department, under one Management Group**.

She creates:

\`\`\`
Contoso Bank Management Group
├── Production Subscription (prod workloads)
│   ├── rg-finance-prod
│   ├── rg-hr-prod
│   └── rg-devops-prod
├── Development Subscription (dev/test — cheaper)
│   ├── rg-finance-dev
│   └── rg-hr-dev
└── Shared Services Subscription (networking, monitoring)
    └── rg-shared-infra
\`\`\`

Now:
- Each subscription has its own billing
- Policies applied at the Management Group level flow down to all subscriptions (e.g., "all resources must be in UK South region")
- Dev subscription has spending limits to prevent accidents

The CFO now has a clear monthly breakdown. Finance is spending 42% of the cloud budget. That triggers a separate review.

**Management Groups and Subscriptions are how real organisations stay organised and in control of cloud spending.**`,
            content: `# Azure Subscriptions & Management Groups

## Azure Management Hierarchy

\`\`\`
Root Management Group
└── Management Group (e.g., "Corp")
    ├── Management Group (e.g., "Production")
    │   ├── Subscription A
    │   │   ├── Resource Group 1
    │   │   │   ├── VM
    │   │   │   └── Storage Account
    │   │   └── Resource Group 2
    │   └── Subscription B
    └── Management Group (e.g., "Dev/Test")
        └── Subscription C
\`\`\`

## Subscriptions

- **Billing boundary**: Each subscription gets its own invoice
- **Access boundary**: RBAC policies applied per subscription
- **Limit boundary**: Azure service limits apply per subscription

### Subscription types
- **Pay-As-You-Go**: Billed monthly, no commitment
- **Enterprise Agreement (EA)**: Large organization discount pricing
- **Visual Studio / Dev/Test**: Reduced rates for development

## Management Groups

Management groups allow you to apply governance at scale across multiple subscriptions:

\`\`\`
Apply Azure Policy to Management Group
→ Inherited by all subscriptions within it
→ Inherited by all resource groups
→ Inherited by all resources
\`\`\`

## Resource Groups

Best practices:
- Group resources by **lifecycle** (resources deployed together, deleted together)
- Name them clearly: \`rg-prod-webapp-eastus\`
- Use **tags** for cost tracking:

\`\`\`bash
az group create \\
  --name rg-prod-webapp \\
  --location eastus \\
  --tags Environment=Production CostCenter=Marketing
\`\`\`

## Azure Policy

Policies enforce organizational standards:

- **Deny**: Prevent non-compliant resources from being created
- **Audit**: Log non-compliant resources
- **Append**: Add required settings to resources
- **Deploy if not exists**: Automatically remediate

Example: "All VMs must use approved VM sizes"`,
          },
          {
            id: "az-l4",
            title: "Azure Cost Management & Pricing",
            description: "Understand and control your Azure spending",
            duration: "15 min",
            xp: 75,
            readingTime: "15 min",
            realWorld: `## Sarah Gets the £47,000 Bill Shock

It's the 5th of the month. Sarah opens her email and sees the Azure invoice: **£47,382**.

Last month it was £12,400. She has 20 minutes before her manager calls.

She opens **Azure Cost Management + Billing** and filters by "Last month vs previous month". The culprit: a single Virtual Machine — \`vm-ml-training-01\` — an A100 GPU instance that a data scientist spun up for a machine learning experiment and forgot to stop. It ran 24/7 for 30 days at £48/hour.

£48 × 24 × 30 = **£34,560** from one forgotten VM.

Sarah immediately:
1. **Shuts down the VM** — stops the bleeding
2. **Sets up a budget alert**: email her when spend exceeds £15,000/month
3. **Creates an Azure Policy**: VMs larger than Standard_D4s_v3 require manager approval tag
4. **Enables auto-shutdown** on all dev/test VMs at 7pm daily

She also identifies they can save £3,200/month by switching production VMs from Pay-As-You-Go to **Reserved Instances** (1-year commitment, 40% cheaper).

Her manager is annoyed but impressed. The bill next month: £11,800.

**Cost management is one of the most valuable Azure skills. Cloud bills can spiral fast — knowing how to monitor, alert, and cut costs makes you indispensable.**`,
            content: `# Azure Cost Management

Understanding costs is essential for any Azure administrator.

## Azure Pricing Factors

- **Compute**: VM size, hours running, OS license
- **Storage**: Amount stored, access tier, redundancy option, operations
- **Networking**: Outbound data transfer (egress), load balancer rules
- **Region**: Prices vary by region (East US is typically cheapest)
- **Redundancy**: LRS < ZRS < GRS < GZRS (increasing cost)

## Azure Pricing Calculator

Use the pricing calculator at azure.microsoft.com/pricing/calculator to estimate costs before deploying.

## Cost Reduction Strategies

### Reserved Instances
Commit to 1 or 3 years → up to 72% savings vs pay-as-you-go

### Azure Hybrid Benefit
Use your existing Windows Server or SQL Server licenses in Azure → up to 40% savings

### Azure Spot VMs
Use unused Azure capacity → up to 90% savings (can be evicted with 30s notice)

### Right-sizing
Scale VM sizes to match actual usage. Azure Advisor recommends right-sizing.

## Azure Cost Management + Billing

\`\`\`
Azure Portal → Cost Management + Billing
├── Cost Analysis: View spending by service, resource, tag
├── Budgets: Set spending alerts
├── Advisor: Get recommendations to reduce costs
└── Invoices: Download billing statements
\`\`\`

## Tagging for Cost Allocation

\`\`\`bash
# Tag a resource
az resource tag \\
  --tags CostCenter=Marketing Environment=Production \\
  --ids /subscriptions/{sub-id}/resourceGroups/myRG/providers/...
\`\`\`

Tags let you filter Cost Analysis by team, project, or environment.`,
          },
        ],
        quiz: {
          id: "az-q1",
          questions: [
            {
              id: "aq1-q1",
              type: "MCQ",
              question: "Which cloud service model gives you the most control over the infrastructure?",
              options: ["SaaS", "PaaS", "IaaS", "FaaS"],
              correctAnswer: "IaaS",
              explanation: "IaaS provides virtualized computing infrastructure. You manage the OS, middleware, and applications. Azure manages the physical hardware.",
            },
            {
              id: "aq1-q2",
              type: "MCQ",
              question: "What is an Azure Resource Group?",
              options: [
                "A billing account",
                "A logical container for related Azure resources",
                "A type of virtual machine",
                "An Azure region",
              ],
              correctAnswer: "A logical container for related Azure resources",
              explanation: "Resource Groups are containers that hold related resources for an Azure solution and share a lifecycle.",
            },
            {
              id: "aq1-q3",
              type: "MCQ",
              question: "What is the correct Azure management hierarchy from top to bottom?",
              options: [
                "Subscription > Management Group > Resource Group > Resource",
                "Management Group > Subscription > Resource Group > Resource",
                "Resource Group > Subscription > Management Group > Resource",
                "Resource > Resource Group > Subscription > Management Group",
              ],
              correctAnswer: "Management Group > Subscription > Resource Group > Resource",
              explanation: "The hierarchy is: Management Groups → Subscriptions → Resource Groups → Resources.",
            },
            {
              id: "aq1-q4",
              type: "MCQ",
              question: "Which Azure pricing option offers the biggest discount for committing to 1 or 3 years?",
              options: [
                "Pay-As-You-Go",
                "Azure Spot VMs",
                "Reserved Instances",
                "Azure Hybrid Benefit",
              ],
              correctAnswer: "Reserved Instances",
              explanation: "Reserved Instances offer up to 72% savings over pay-as-you-go by committing to 1 or 3 years upfront.",
            },
            {
              id: "aq1-q5",
              type: "MCQ",
              question: "What are Azure Availability Zones?",
              options: [
                "Different Azure cloud regions",
                "Physically separate datacenters within the same region",
                "Logical network segments",
                "Resource group boundaries",
              ],
              correctAnswer: "Physically separate datacenters within the same region",
              explanation: "Availability Zones are unique physical locations within a region with independent power, cooling, and networking for high availability.",
            },
            {
              id: "aq1-q6",
              type: "MCQ",
              question: "Microsoft 365 is an example of which cloud service model?",
              options: ["IaaS", "PaaS", "SaaS", "CaaS"],
              correctAnswer: "SaaS",
              explanation: "SaaS delivers fully managed software over the internet. Microsoft 365 is a classic example — you just use it, Microsoft manages everything.",
            },
          ],
        },
      },

      // ─────────────────────────────────────────
      // SECTION 2: Virtual Machines & Networking
      // ─────────────────────────────────────────
      {
        id: "az-s2",
        title: "Virtual Machines & Networking",
        description: "Deploy VMs, configure VNets, NSGs, and load balancers",
        lessons: [
          {
            id: "az-l5",
            title: "Azure Virtual Machines",
            description: "Create and manage VMs — Azure's core compute service",
            duration: "30 min",
            xp: 125,
            readingTime: "30 min",
            realWorld: `## Sarah Deploys the Company's First Production VM

The HR team needs a new application server. It runs a legacy Windows app that can't be containerised. Sarah needs to provision a VM that will run 24/7, handle 50 concurrent users, and be accessible only from the office network.

Her checklist before clicking "Create":

**Region:** UK South (company data must stay in UK for compliance)
**Image:** Windows Server 2022 Datacenter
**Size:** Standard_D4s_v3 (4 vCPUs, 16GB RAM — right-sized based on the app's requirements)
**Authentication:** Password (stored in Azure Key Vault, not in her head)
**Disk:** Premium SSD for the OS, Standard HDD for data
**Networking:** Place in \`vnet-hr-prod\`, subnet \`snet-app\`, NO public IP

She deliberately does NOT give it a public IP — the VM is only accessible through the company VPN. This is a security requirement for anything touching HR data.

After deployment, she:
- Enables **Azure Backup** (daily backups, 30-day retention)
- Sets up **auto-shutdown at midnight** (the app isn't used outside business hours — saves 33% on compute cost)
- Tags it: \`Environment: Production\`, \`Owner: hr-team\`, \`CostCentre: HR-2024\`
- Installs the **Azure Monitor agent** so she gets alerts if CPU or disk goes above 80%

The HR team is live in 2 hours. On-premises, this would have taken 3 weeks.

**Virtual Machines are the building block of cloud infrastructure. Knowing how to size, secure, and monitor them properly separates a junior admin from a senior one.**`,
            content: `# Azure Virtual Machines

Virtual Machines (VMs) are the core IaaS compute offering in Azure. They give you full control over the OS and software stack.

## VM Key Concepts

- **VM Size**: Determines CPU cores, RAM, and storage (e.g., Standard_D2s_v5 = 2 vCPUs, 8 GB RAM)
- **OS Disk**: The boot disk (required)
- **Data Disk**: Additional storage disks
- **VM Image**: Base OS image (Windows Server, Ubuntu, RHEL, etc.)
- **Public IP**: Optional — exposes the VM to the internet

## VM Size Families

| Series | Purpose                            |
|--------|------------------------------------|
| B      | Burstable (dev/test)               |
| D      | General purpose (apps, databases)  |
| E      | Memory optimized                   |
| F      | Compute optimized                  |
| M      | Large memory (SAP workloads)       |
| N      | GPU (AI, rendering)                |
| L      | Storage optimized                  |

## Create a VM via CLI

\`\`\`bash
az vm create \\
  --resource-group myRG \\
  --name myVM \\
  --image Ubuntu2204 \\
  --size Standard_B2s \\
  --admin-username azureuser \\
  --generate-ssh-keys \\
  --location eastus
\`\`\`

## High Availability Options

### Availability Sets
- Protects against hardware failures within a datacenter
- VMs spread across **fault domains** (different racks) and **update domains**
- 99.95% SLA

### Availability Zones
- Protects against entire datacenter failures
- VMs spread across 3 physically separate datacenters in a region
- 99.99% SLA

## VM Scale Sets (VMSS)

Automatically scale VM count based on demand:

\`\`\`bash
az vmss create \\
  --resource-group myRG \\
  --name myScaleSet \\
  --image Ubuntu2204 \\
  --instance-count 2 \\
  --upgrade-policy-mode automatic
\`\`\`

## Common VM Operations

\`\`\`bash
# Start a VM
az vm start --resource-group myRG --name myVM

# Stop (deallocate — stops billing for compute)
az vm deallocate --resource-group myRG --name myVM

# Get VM status
az vm show --resource-group myRG --name myVM --query powerState
\`\`\``,
          },
          {
            id: "az-l6",
            title: "Virtual Networks (VNets)",
            description: "Private networking in Azure — VNets, subnets, and NSGs",
            duration: "25 min",
            xp: 125,
            readingTime: "25 min",
            realWorld: `## Sarah Designs a Network That Passes a Security Audit

Contoso Bank has a penetration test scheduled. The security consultant's report from last year flagged: "Database server is reachable from the internet on port 1433. Critical risk."

Sarah redesigns the network architecture before the audit:

**Before (insecure):**
\`\`\`
Internet → VM (web) → Azure SQL (public endpoint) ← anyone can try to connect
\`\`\`

**After (Sarah's design):**
\`\`\`
VNet: 10.0.0.0/16
├── snet-web (10.0.1.0/24)     — Web servers, public-facing
│     NSG: Allow port 443 inbound from Internet
│     NSG: Allow port 80 (redirect to 443)
│     NSG: Deny everything else inbound
├── snet-app (10.0.2.0/24)     — App servers
│     NSG: Allow port 8080 from snet-web only
│     NSG: Deny all internet inbound
└── snet-data (10.0.3.0/24)   — Database servers
      NSG: Allow port 1433 from snet-app only
      NSG: Deny everything else
      Azure SQL: Private Endpoint only (no public access)
\`\`\`

The database is now completely isolated. The only path to it: web → app → database. No direct internet access possible.

The pen test report comes back: **0 critical findings** related to network exposure.

**Network Security Groups are your firewall rules in Azure. A well-designed VNet with proper NSG rules is the difference between passing and failing a security audit.**`,
            content: `# Azure Virtual Networks (VNets)

VNets are the foundation of private networking in Azure. Every resource in Azure that needs network connectivity lives in a VNet.

## VNet Key Concepts

- **VNet**: Your private network space in Azure (e.g., 10.0.0.0/16)
- **Subnet**: A subdivision of a VNet (e.g., 10.0.1.0/24 for web tier, 10.0.2.0/24 for DB tier)
- **NSG** (Network Security Group): Firewall rules controlling traffic
- **Public IP**: Assigns a public internet-routable address to a resource

## Create a VNet

\`\`\`bash
az network vnet create \\
  --resource-group myRG \\
  --name myVNet \\
  --address-prefix 10.0.0.0/16 \\
  --subnet-name WebSubnet \\
  --subnet-prefix 10.0.1.0/24
\`\`\`

## Network Security Groups (NSGs)

NSGs are stateful firewalls with inbound and outbound rules.

\`\`\`bash
# Create NSG
az network nsg create --resource-group myRG --name myNSG

# Allow SSH (port 22) from anywhere
az network nsg rule create \\
  --resource-group myRG \\
  --nsg-name myNSG \\
  --name Allow-SSH \\
  --priority 100 \\
  --protocol Tcp \\
  --destination-port-range 22 \\
  --access Allow

# Allow HTTP (port 80)
az network nsg rule create \\
  --resource-group myRG \\
  --nsg-name myNSG \\
  --name Allow-HTTP \\
  --priority 110 \\
  --protocol Tcp \\
  --destination-port-range 80 \\
  --access Allow
\`\`\`

## NSG Rule Priority

Lower numbers = higher priority. Rules are processed from lowest to highest number. Default rules (65000-65500) allow/deny all traffic.

## VNet Peering

Connect two VNets for private communication — even across regions:

\`\`\`bash
az network vnet peering create \\
  --resource-group myRG \\
  --vnet-name VNet1 \\
  --name VNet1-to-VNet2 \\
  --remote-vnet VNet2 \\
  --allow-vnet-access
\`\`\`

Peered VNets communicate over Azure's backbone network — no internet, no encryption needed.`,
          },
          {
            id: "az-l7",
            title: "Azure Load Balancing",
            description: "Distribute traffic with Load Balancer, App Gateway, and Front Door",
            duration: "22 min",
            xp: 100,
            readingTime: "22 min",
            realWorld: `## Sarah Stops the Website Crashing on Payday

Every month on payday, Contoso Bank's employee portal crashes. 800 employees all log in simultaneously to check their payslips. The single web server can't handle it.

Sarah's fix: **Azure Application Gateway + VM Scale Set**.

She sets up:
- **VM Scale Set**: starts at 2 VMs, auto-scales to 8 when CPU > 70%
- **Application Gateway**: routes incoming HTTPS traffic across all VMs
- **Health probes**: if a VM stops responding, Application Gateway removes it from rotation automatically
- **Session affinity**: disabled (the app is stateless, so users can hit any VM)
- **WAF (Web Application Firewall)**: enabled on the App Gateway — blocks SQL injection, XSS, and common attacks

Result: first payday after the change — 800 users log in simultaneously. The Scale Set spins up 6 VMs in 3 minutes. Average response time: 280ms (previously it was timing out). Zero downtime.

Sarah also uses **Azure Front Door** for their public-facing website — it routes users to the nearest Azure region automatically, so UK users hit UK South and US users hit East US.

**Load balancing turns a single point of failure into a resilient, scalable system. This is one of the first things you'll build for any production workload.**`,
            content: `# Azure Load Balancing

Azure offers several load balancing services. Choose based on whether your traffic is internal/external and what OSI layer you need.

## Decision Guide

| Service            | Layer | Scope    | Use Case                       |
|--------------------|-------|----------|--------------------------------|
| Load Balancer      | 4     | Regional | TCP/UDP load balancing for VMs |
| Application Gateway| 7     | Regional | HTTP/HTTPS with WAF            |
| Azure Front Door   | 7     | Global   | Global web app with CDN        |
| Traffic Manager    | DNS   | Global   | DNS routing between regions    |

## Azure Load Balancer (Layer 4)

Distributes TCP/UDP traffic to backend VMs. Simple and high-performance.

\`\`\`bash
# Create a public load balancer
az network lb create \\
  --resource-group myRG \\
  --name myLB \\
  --sku Standard \\
  --public-ip-address myPublicIP \\
  --frontend-ip-name myFrontEnd \\
  --backend-pool-name myBackEnd
\`\`\`

## Application Gateway (Layer 7)

Advanced HTTP/HTTPS load balancing with:
- **SSL termination**: Decrypt HTTPS at the gateway
- **URL-based routing**: Route /api to one backend, /images to another
- **Cookie-based session affinity**: Sticky sessions
- **Web Application Firewall (WAF)**: Protect against OWASP threats

## Azure Front Door

Global HTTP load balancer with:
- Automatic failover between regions
- Built-in CDN for static content
- WAF protection
- URL path routing and rewriting

## Traffic Manager

DNS-based routing to different Azure regions or external endpoints. Routing methods:
- **Priority**: Primary + failover
- **Weighted**: Split traffic percentage
- **Performance**: Route to lowest-latency endpoint
- **Geographic**: Route based on user location`,
          },
        ],
        quiz: {
          id: "az-q2",
          questions: [
            {
              id: "aq2-q1",
              type: "MCQ",
              question: "What protects Azure VMs from entire datacenter-level failures?",
              options: ["Availability Sets", "Availability Zones", "Resource Groups", "NSGs"],
              correctAnswer: "Availability Zones",
              explanation: "Availability Zones are physically separate datacenters in a region, each with independent power and cooling.",
            },
            {
              id: "aq2-q2",
              type: "MCQ",
              question: "What is a Network Security Group (NSG)?",
              options: [
                "A VPN gateway",
                "A load balancer",
                "A stateful firewall that controls inbound and outbound traffic",
                "A type of storage account",
              ],
              correctAnswer: "A stateful firewall that controls inbound and outbound traffic",
              explanation: "NSGs contain security rules that allow or deny network traffic. They're stateful — return traffic is automatically allowed.",
            },
            {
              id: "aq2-q3",
              type: "MCQ",
              question: "Which Azure service provides Layer 7 (HTTP/HTTPS) load balancing with a Web Application Firewall?",
              options: ["Azure Load Balancer", "Traffic Manager", "Application Gateway", "VNet Peering"],
              correctAnswer: "Application Gateway",
              explanation: "Application Gateway operates at Layer 7, supporting SSL termination, URL-based routing, and built-in WAF capabilities.",
            },
            {
              id: "aq2-q4",
              type: "MCQ",
              question: "What happens to billing when you 'deallocate' (stop) a VM in Azure?",
              options: [
                "You still pay the same",
                "Compute charges stop, but storage charges continue",
                "All charges stop completely",
                "Only network charges stop",
              ],
              correctAnswer: "Compute charges stop, but storage charges continue",
              explanation: "Deallocated VMs don't incur compute costs, but you still pay for the OS disk and any attached data disks.",
            },
            {
              id: "aq2-q5",
              type: "MCQ",
              question: "What does Azure VM Scale Sets provide?",
              options: [
                "Manual VM configuration",
                "Automatic scaling of identical VMs based on demand",
                "Database replication",
                "Storage tiering",
              ],
              correctAnswer: "Automatic scaling of identical VMs based on demand",
              explanation: "VM Scale Sets let you create and manage a group of identical VMs that automatically scale in or out based on demand or schedule.",
            },
            {
              id: "aq2-q6",
              type: "MCQ",
              question: "In NSG rules, what does a lower priority number mean?",
              options: [
                "The rule is less important",
                "The rule is processed first (higher priority)",
                "The rule only applies to outbound traffic",
                "The rule overrides Azure's default rules",
              ],
              correctAnswer: "The rule is processed first (higher priority)",
              explanation: "NSG rules are processed from lowest to highest number. Rule 100 is evaluated before rule 200. The first matching rule applies.",
            },
          ],
        },
      },

      // ─────────────────────────────────────────
      // SECTION 3: Identity, Security & Governance
      // ─────────────────────────────────────────
      {
        id: "az-s3",
        title: "Identity, Security & Governance",
        description: "Azure AD (Entra ID), RBAC, Azure Policy, and monitoring",
        lessons: [
          {
            id: "az-l8",
            title: "Azure Active Directory (Entra ID)",
            description: "Cloud identity and access management",
            duration: "25 min",
            xp: 125,
            readingTime: "25 min",
            realWorld: `## Sarah Onboards 200 New Employees in One Morning

Contoso Bank acquires a smaller firm. 200 employees need Azure AD accounts, email, and access to the right SharePoint sites and apps — by Monday.

Sarah's old approach would be: create each user manually in the portal. 200 × 5 minutes = 16 hours. Not happening.

Her actual approach:

**Step 1**: Get the HR spreadsheet with all names, emails, departments, job titles.

**Step 2**: Use PowerShell to bulk-create users:
\`\`\`powershell
Import-Csv "new_users.csv" | ForEach-Object {
  New-AzureADUser \`
    -DisplayName $_.Name \`
    -UserPrincipalName $_.Email \`
    -Department $_.Department \`
    -PasswordProfile (New-Object -TypeName Microsoft.Open.AzureAD.Model.PasswordProfile \`
      -Property @{Password="TempPass2024!"; ForceChangePasswordNextLogin=$true})
}
\`\`\`

**Step 3**: Add users to the right Security Groups (which already control app access):
- \`grp-finance-users\` → gets access to finance apps
- \`grp-all-staff\` → gets basic SharePoint and email

**Step 4**: Enable **Multi-Factor Authentication** for all new accounts via Conditional Access policy.

Total time: 45 minutes. Sarah's colleague who did this manually last time took 3 days.

She also adds the new employees' on-premises AD to Azure AD via **Azure AD Connect** — so they use the same password for both.

**Azure AD is the identity backbone of every Microsoft cloud environment. Managing it efficiently is one of the highest-value skills an Azure admin can have.**`,
            content: `# Azure Active Directory (Microsoft Entra ID)

Azure AD (now rebranded as Microsoft Entra ID) is Azure's cloud-based identity and access management service.

## Key Concepts

- **Users**: Individual identity accounts
- **Groups**: Collections of users (Security Groups, Microsoft 365 Groups)
- **Service Principals**: Identity for applications and services
- **Managed Identities**: Automatically managed identity for Azure resources (no passwords to manage)
- **Tenant**: Your organization's Azure AD directory

## Azure AD vs On-premises AD

| Feature              | Azure AD        | On-premises AD |
|---------------------|-----------------|----------------|
| Protocol             | OAuth, OIDC, SAML | Kerberos, NTLM |
| Access type         | Cloud/internet  | Corporate network |
| Multi-factor auth   | Built-in        | Requires extra setup |
| Self-service        | Yes             | Limited |

## Multi-Factor Authentication (MFA)

Require a second factor after password entry:
- Authenticator app (recommended)
- SMS code
- Phone call
- Hardware token

## Conditional Access

Grant access only when specific conditions are met:

\`\`\`
IF user = external contractor
AND location = outside corporate network
AND device = unmanaged
THEN require MFA AND block access to sensitive apps
\`\`\`

Conditional Access policies are the Zero Trust enforcement point in Azure AD.

## Managed Identities

Instead of storing credentials in your app, use a managed identity:

\`\`\`bash
# Create a VM with a system-assigned managed identity
az vm create \\
  --resource-group myRG \\
  --name myVM \\
  --assign-identity \\
  --image Ubuntu2204

# Grant the VM's identity access to Key Vault
az keyvault set-policy \\
  --name myKeyVault \\
  --object-id <vm-identity-object-id> \\
  --secret-permissions get list
\`\`\``,
          },
          {
            id: "az-l9",
            title: "Role-Based Access Control (RBAC)",
            description: "Control who can do what in Azure",
            duration: "20 min",
            xp: 125,
            readingTime: "20 min",
            realWorld: `## Sarah Locks Down Access After a Scary Incident

On a Friday afternoon, Sarah gets a Slack message from a junior developer:

> "Hey, I accidentally deleted the production resource group. I thought it was dev. Is that bad?"

It is bad. Very bad. The production finance application is gone.

Azure Backup gets it restored in 4 hours. But the incident triggers a full access review.

Sarah audits who has what access across all subscriptions. She finds:
- 6 developers have **Owner** role on the production subscription (they should have **Contributor** at most)
- 3 contractors have **Contributor** on resource groups they stopped working on 8 months ago
- The service account for the deployment pipeline has **Owner** on everything (it only needs **Contributor** on two specific resource groups)

She applies the **principle of least privilege**:

| Person/Service | Old Role | New Role | Scope |
|---|---|---|---|
| Developers | Owner (subscription) | Contributor (dev RG only) | Resource Group |
| Contractors | Contributor | Removed | — |
| Deploy pipeline | Owner (subscription) | Contributor | 2 specific RGs |
| Sarah | Owner | Owner | Subscription (she needs it) |

She also enables **Privileged Identity Management (PIM)** — now anyone who needs temporary elevated access must request it, and it expires automatically after 8 hours.

The junior developer who caused the incident? They can now only read production. Delete is off the table.

**RBAC is your "who can do what" system. After any security incident, access review is always the first step.**`,
            content: `# Azure Role-Based Access Control (RBAC)

RBAC controls access to Azure resources by assigning roles to users, groups, or service principals at a specific scope.

## RBAC Components

- **Security Principal**: Who gets access (user, group, service principal, managed identity)
- **Role Definition**: What they can do (list of allowed actions)
- **Scope**: Where the role applies (management group, subscription, resource group, or resource)

## Built-in Roles

| Role                      | Permissions                                      |
|---------------------------|--------------------------------------------------|
| Owner                     | Full access + manage access (assign roles)       |
| Contributor               | Full access — create/manage everything, no RBAC  |
| Reader                    | View-only                                        |
| User Access Administrator | Manage access only                               |

## Assign a Role via CLI

\`\`\`bash
# Grant Alice 'Contributor' on a resource group
az role assignment create \\
  --assignee alice@company.com \\
  --role "Contributor" \\
  --scope /subscriptions/{sub-id}/resourceGroups/myRG

# Grant a VM's managed identity access to storage
az role assignment create \\
  --assignee <managed-identity-object-id> \\
  --role "Storage Blob Data Reader" \\
  --scope /subscriptions/{sub-id}/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/myStorage
\`\`\`

## Scope Hierarchy

Roles assigned at a higher scope are inherited downward:

\`\`\`
Management Group ──→ inherited by all subscriptions below
  └── Subscription ──→ inherited by all resource groups
        └── Resource Group ──→ inherited by all resources
              └── Resource
\`\`\`

## Principle of Least Privilege

Always grant the minimum permissions needed. Prefer:
- Resource-group scope over subscription scope
- Specific roles (e.g., "Storage Blob Data Reader") over broad roles (e.g., "Contributor")

## Custom Roles

Create custom roles when built-in roles don't fit:

\`\`\`bash
az role definition create --role-definition @my-custom-role.json
\`\`\``,
          },
          {
            id: "az-l10",
            title: "Azure Monitor & Backup",
            description: "Monitor, alert, and protect your Azure resources",
            duration: "22 min",
            xp: 125,
            readingTime: "22 min",
            realWorld: `## Sarah Gets Paged at 2am — and Fixes It Before Anyone Notices

It's 2:07am on a Tuesday. Sarah's phone buzzes. **Azure Monitor alert: "vm-finance-app01 — CPU 98% for 15 minutes."**

She opens the Azure mobile app. The VM is maxing out. She checks the metrics: CPU started spiking at 1:55am. She looks at the connected Log Analytics workspace and searches for what happened at that time.

She finds it: a scheduled batch job that processes end-of-month statements ran at 2am. It always did. But this month's data volume was 3x larger due to the acquisition.

She has two options:
1. Wait for the batch to finish (it'll take another 2 hours, VM barely functioning)
2. Resize the VM on the spot

She resizes from Standard_D4s_v3 (4 vCPU) to Standard_D8s_v3 (8 vCPU) — Azure makes this a 3-minute operation. CPU drops from 98% to 41%.

Batch finishes at 3:15am. She resizes back to D4s_v3 at 3:20am.

Total cost of the larger VM for 1.5 hours: £1.80.

In the morning she also:
- Sets the batch job VM to auto-resize on a schedule for end-of-month
- Checks Azure Backup — confirming the finance VM has a 7am backup from yesterday ready if needed
- Creates a new alert: "if batch job takes >3 hours, page Sarah AND the on-call developer"

Nobody knew anything happened. That's what good monitoring looks like.

**Azure Monitor is your eyes and ears. Without it, you're flying blind. With it, you can fix problems before users notice them.**`,
            content: `# Azure Monitor

Azure Monitor is the central observability service that collects, analyzes, and acts on telemetry from Azure resources.

## Data Types Collected

- **Metrics**: Numerical measurements sampled over time (CPU %, memory, request count)
- **Logs**: Detailed timestamped records (activity logs, resource logs, Azure AD logs)
- **Traces**: End-to-end distributed transaction tracking

## Key Components

### Log Analytics Workspace
Central repository for all log data. Write queries in KQL (Kusto Query Language):

\`\`\`kusto
-- Find all failed sign-ins in the last 24 hours
SigninLogs
| where TimeGenerated > ago(24h)
| where ResultType != 0
| summarize count() by UserPrincipalName, ResultDescription
| order by count_ desc
\`\`\`

### Alerts

\`\`\`bash
# Create a metric alert (CPU > 90%)
az monitor metrics alert create \\
  --name "High CPU" \\
  --resource-group myRG \\
  --scopes /subscriptions/{sub}/resourceGroups/myRG/providers/Microsoft.Compute/virtualMachines/myVM \\
  --condition "avg Percentage CPU > 90" \\
  --window-size 5m \\
  --evaluation-frequency 1m \\
  --action myActionGroup
\`\`\`

### Application Insights

Automatic application performance monitoring (APM):
- Request rates, response times, failure rates
- Dependency calls (databases, external APIs)
- Custom events and metrics from your code

## Azure Backup

\`\`\`bash
# Create a Recovery Services Vault
az backup vault create \\
  --resource-group myRG \\
  --name myVault \\
  --location eastus

# Enable VM backup
az backup protection enable-for-vm \\
  --resource-group myRG \\
  --vault-name myVault \\
  --vm myVM \\
  --policy-name DefaultPolicy
\`\`\`

## Azure Site Recovery

Disaster recovery — continuously replicates workloads from primary to secondary region:
- **RTO** (Recovery Time Objective): Target time to restore service
- **RPO** (Recovery Point Objective): Target maximum data loss`,
          },
        ],
        quiz: {
          id: "az-q3",
          questions: [
            {
              id: "aq3-q1",
              type: "MCQ",
              question: "What is a Managed Identity in Azure?",
              options: [
                "A type of user account",
                "An automatically managed identity for Azure resources — no credentials to manage",
                "A hardware security token",
                "A type of NSG rule",
              ],
              correctAnswer: "An automatically managed identity for Azure resources — no credentials to manage",
              explanation: "Managed Identities eliminate the need to store credentials in code. Azure automatically handles the identity lifecycle.",
            },
            {
              id: "aq3-q2",
              type: "MCQ",
              question: "Which RBAC role allows full access to resources but cannot assign roles to others?",
              options: ["Owner", "Reader", "Contributor", "User Access Administrator"],
              correctAnswer: "Contributor",
              explanation: "Contributor has full access to create and manage resources but cannot grant access to other users (no RBAC management).",
            },
            {
              id: "aq3-q3",
              type: "MCQ",
              question: "What is Conditional Access in Azure AD?",
              options: [
                "A type of RBAC role",
                "A policy that grants or blocks access based on conditions like location, device, or user risk",
                "A network firewall rule",
                "A backup policy",
              ],
              correctAnswer: "A policy that grants or blocks access based on conditions like location, device, or user risk",
              explanation: "Conditional Access is the Zero Trust enforcement engine in Azure AD — it evaluates signals and makes access decisions.",
            },
            {
              id: "aq3-q4",
              type: "MCQ",
              question: "What does Azure Application Insights monitor?",
              options: [
                "VM CPU performance",
                "Network traffic between subnets",
                "Application performance, requests, errors, and dependencies",
                "Storage account usage",
              ],
              correctAnswer: "Application performance, requests, errors, and dependencies",
              explanation: "Application Insights is an Application Performance Monitoring (APM) service for live web applications.",
            },
            {
              id: "aq3-q5",
              type: "MCQ",
              question: "At which RBAC scope should you assign roles to follow the Principle of Least Privilege?",
              options: [
                "Always at the management group level",
                "At the subscription level for simplicity",
                "At the narrowest scope that meets the requirement",
                "Always at the resource level",
              ],
              correctAnswer: "At the narrowest scope that meets the requirement",
              explanation: "Least privilege means granting access at the most specific scope needed. Avoid broad scopes like subscription when resource-group level suffices.",
            },
            {
              id: "aq3-q6",
              type: "MCQ",
              question: "What is Azure Site Recovery used for?",
              options: [
                "Backing up individual files",
                "Replicating VMs to another region for disaster recovery",
                "Monitoring application performance",
                "Managing Azure AD users",
              ],
              correctAnswer: "Replicating VMs to another region for disaster recovery",
              explanation: "Azure Site Recovery continuously replicates workloads to a secondary region, enabling fast failover if the primary region fails.",
            },
          ],
        },
      },

      // ─────────────────────────────────────────
      // SECTION 4: Storage, Apps & DevOps
      // ─────────────────────────────────────────
      {
        id: "az-s4",
        title: "Storage, Apps & DevOps",
        description: "Azure Storage, App Service, Key Vault, and DevOps essentials",
        lessons: [
          {
            id: "az-l11",
            title: "Azure Storage",
            description: "Blob, Files, Queues, and Table storage explained",
            duration: "25 min",
            xp: 125,
            readingTime: "25 min",
            realWorld: `## Sarah Migrates 2TB of Files to Azure and Cuts Costs by 60%

Contoso Bank has a file server. It's a physical NAS device costing £800/month in hosting, with 2TB of data. Half of it hasn't been touched in 3 years — old scanned documents, archived statements, compliance records.

Sarah's migration plan:

**Active files (accessed weekly)** → Azure Files (SMB share, mapped as a network drive)
- Staff open files in Windows Explorer exactly as before, no retraining needed
- 500GB, Hot tier: ~£8/month

**Recent documents (accessed monthly)** → Azure Blob Storage, Cool tier
- Accessed via internal portal
- 1TB, Cool tier: ~£12/month

**Archive records (3+ years old, rarely accessed)** → Azure Blob Storage, Archive tier
- Compliance requirement: must keep for 7 years
- 500GB, Archive tier: ~£0.50/month (rehydrate takes hours, that's fine for compliance docs)

She sets up a **Lifecycle Management policy**:
\`\`\`
If blob hasn't been accessed in 30 days → move to Cool
If blob hasn't been accessed in 180 days → move to Archive
If blob is older than 7 years → delete
\`\`\`

This runs automatically. She never has to think about it again.

Total monthly cost after migration: **£320/month** (was £800/month).

She also enables **Soft Delete** (30-day recycle bin) and **versioning** — if anyone overwrites or deletes a file accidentally, she can recover it.

**Understanding Azure Storage tiers is one of the fastest ways to cut cloud costs. Most companies overpay by putting everything in Hot storage.**`,
            content: `# Azure Storage

Azure Storage is Microsoft's cloud storage solution. A single storage account can contain multiple types of storage.

## Storage Account Types

| Type           | Use Case                                         |
|----------------|--------------------------------------------------|
| Blob Storage   | Unstructured data: images, videos, backups       |
| Azure Files    | Managed file shares (SMB/NFS protocol)           |
| Queue Storage  | Messaging between app components                 |
| Table Storage  | NoSQL key-attribute store (semi-structured data) |

## Redundancy Options

| Type | Description                                    | Copies |
|------|------------------------------------------------|--------|
| LRS  | Locally Redundant Storage — 1 region, 1 zone   | 3      |
| ZRS  | Zone-Redundant Storage — 1 region, 3 zones     | 3      |
| GRS  | Geo-Redundant Storage — 2 regions              | 6      |
| GZRS | Geo-Zone-Redundant — best of both              | 6      |

## Create a Storage Account

\`\`\`bash
az storage account create \\
  --name mystorageacct \\
  --resource-group myRG \\
  --location eastus \\
  --sku Standard_GRS \\
  --kind StorageV2
\`\`\`

## Blob Storage Tiers

| Tier    | Cost     | Access Speed | Use Case                    |
|---------|----------|-------------|------------------------------|
| Hot     | Highest  | Instant     | Frequently accessed data     |
| Cool    | Medium   | Instant     | Infrequently accessed (30d+) |
| Cold    | Lower    | Instant     | Rarely accessed (90d+)       |
| Archive | Lowest   | Hours       | Long-term backup, compliance |

## Blob Lifecycle Management

Automatically move blobs between tiers:

\`\`\`json
{
  "rules": [{
    "name": "archiveOldBlobs",
    "type": "Lifecycle",
    "definition": {
      "actions": {
        "baseBlob": {
          "tierToCool": { "daysAfterModificationGreaterThan": 30 },
          "tierToArchive": { "daysAfterModificationGreaterThan": 90 }
        }
      },
      "filters": { "blobTypes": ["blockBlob"] }
    }
  }]
}
\`\`\`

## Shared Access Signatures (SAS)

Grant time-limited access to specific storage resources without sharing account keys:

\`\`\`bash
az storage blob generate-sas \\
  --account-name mystorageacct \\
  --container-name mycontainer \\
  --name myfile.pdf \\
  --permissions r \\
  --expiry 2025-12-31
\`\`\``,
          },
          {
            id: "az-l12",
            title: "Azure App Service",
            description: "Deploy web apps and APIs without managing servers",
            duration: "25 min",
            xp: 125,
            readingTime: "25 min",
            realWorld: `## Sarah Deploys the Customer Portal in 20 Minutes

The development team finishes the new customer-facing portal. It's a .NET 8 web app. They hand it to Sarah to deploy to production.

Old approach: provision a Windows VM, install IIS, install .NET runtime, configure SSL, set up monitoring, configure auto-scaling. Takes a day.

**Sarah's approach with App Service:**

1. Creates an App Service Plan: **P2v3** (2 vCPU, 8GB RAM), UK South
2. Creates the Web App, selects .NET 8 runtime
3. Developer runs: \`git push azure main\` — that's the entire deployment
4. Enables **custom domain** (customerportal.contosob.com) and a free managed SSL certificate
5. Sets up **deployment slots**: Production slot + Staging slot
6. Configures **auto-scale**: 1 to 5 instances based on CPU

Total time: **22 minutes**.

The staging slot is her favourite feature. When developers want to push an update:
1. They deploy to Staging first
2. Sarah runs smoke tests against the staging URL
3. She clicks **Swap** — Staging becomes Production with zero downtime (Azure swaps them instantly)
4. If something's wrong, she swaps back in 30 seconds

She also configures the App Service to pull its database connection string from **Azure Key Vault** — no secrets in the app settings or code.

**App Service removes all the server management overhead. You focus on the app, Azure manages the platform.**`,
            content: `# Azure App Service

App Service is a PaaS offering for hosting web applications, REST APIs, and mobile backends. You manage your app; Azure manages the platform.

## Supported Languages & Runtimes

- .NET / .NET Core
- Node.js
- Python
- Java
- PHP
- Ruby
- Docker containers

## App Service Plans

The plan defines the compute resources for your app:

| Tier        | Use Case                           | Features                    |
|-------------|------------------------------------|-----------------------------|
| Free/Shared | Dev/test only                      | No custom domain, no SLA    |
| Basic (B)   | Low-traffic production             | Custom domains, manual scale|
| Standard (S)| Most production apps               | Auto-scale, staging slots   |
| Premium (P) | High-performance production        | VNet integration, more scale|
| Isolated    | Enterprise, compliance             | Dedicated environment (ASE) |

## Deploy an App Service

\`\`\`bash
# Create an App Service Plan
az appservice plan create \\
  --name myPlan \\
  --resource-group myRG \\
  --sku S1 \\
  --is-linux

# Create a web app
az webapp create \\
  --resource-group myRG \\
  --plan myPlan \\
  --name myUniqueAppName \\
  --runtime "NODE:20-lts"
\`\`\`

## Deployment Slots

Deployment slots let you deploy to staging first, then swap to production with zero downtime:

\`\`\`bash
# Create a staging slot
az webapp deployment slot create \\
  --name myApp \\
  --resource-group myRG \\
  --slot staging

# Swap staging → production
az webapp deployment slot swap \\
  --name myApp \\
  --resource-group myRG \\
  --slot staging
\`\`\`

## App Service Configuration

\`\`\`bash
# Set environment variables (App Settings)
az webapp config appsettings set \\
  --name myApp \\
  --resource-group myRG \\
  --settings DATABASE_URL="postgresql://..." NODE_ENV="production"
\`\`\`

## Auto-scaling

\`\`\`bash
az monitor autoscale create \\
  --resource-group myRG \\
  --resource myPlan \\
  --resource-type Microsoft.Web/serverfarms \\
  --name myAutoscale \\
  --min-count 1 \\
  --max-count 5 \\
  --count 2
\`\`\``,
          },
          {
            id: "az-l13",
            title: "Azure Key Vault",
            description: "Store and manage secrets, keys, and certificates securely",
            duration: "20 min",
            xp: 100,
            readingTime: "20 min",
            realWorld: `## Sarah Finds Passwords in Source Code — and Fixes It

During a routine code review, Sarah spots something alarming in the company's GitHub repository:

\`\`\`csharp
// config.cs — committed to git 8 months ago
var connectionString = "Server=prod-sql.contoso.com;Database=FinanceDB;User=sa;Password=C0nt0s0Pr0d2023!";
var apiKey = "sk-live-8f3a9b2c1d4e5f6a7b8c9d0e";
\`\`\`

A real password and a real API key — in a public-facing GitHub repo. For 8 months.

Sarah's immediate actions:
1. **Rotate the database password** — assume it's compromised
2. **Revoke and regenerate the API key** — same assumption
3. Check Azure AD sign-in logs for any suspicious access

Then she fixes the root cause using **Azure Key Vault**:

\`\`\`
kv-contoso-prod (Key Vault)
├── Secrets
│   ├── SqlConnectionString → "Server=...;Password=<new-rotated-password>"
│   ├── PaymentApiKey → "sk-live-<new-key>"
│   └── SendgridApiKey → "SG.<key>"
├── Keys
│   └── DataEncryptionKey → RSA 2048 (used to encrypt sensitive data at rest)
└── Certificates
    └── contoso-tls → auto-renews via DigiCert integration
\`\`\`

The app now retrieves secrets at runtime from Key Vault using **Managed Identity** — no passwords anywhere in code or config files. Managed Identity means the app authenticates to Key Vault as itself, no credentials required.

She adds a **Git pre-commit hook** that scans for secrets before any commit is pushed. It rejects commits containing patterns that look like passwords or API keys.

**Key Vault should be the first thing you set up in any Azure project. Secrets in code is the most common and most dangerous mistake in cloud deployments.**`,
            content: `# Azure Key Vault

Key Vault is Azure's centralized secrets management service. Never hardcode passwords or connection strings in your code.

## What Key Vault Stores

- **Secrets**: API keys, passwords, connection strings
- **Keys**: Cryptographic keys for encryption/decryption
- **Certificates**: SSL/TLS certificates with automatic renewal

## Create a Key Vault

\`\`\`bash
az keyvault create \\
  --name myUniqueVaultName \\
  --resource-group myRG \\
  --location eastus
\`\`\`

## Store and Retrieve Secrets

\`\`\`bash
# Store a secret
az keyvault secret set \\
  --vault-name myVault \\
  --name DatabasePassword \\
  --value "SuperSecret123!"

# Retrieve a secret
az keyvault secret show \\
  --vault-name myVault \\
  --name DatabasePassword \\
  --query value -o tsv
\`\`\`

## Access Policies vs RBAC

**Access Policies** (older model):
\`\`\`bash
az keyvault set-policy \\
  --name myVault \\
  --upn user@company.com \\
  --secret-permissions get list set delete
\`\`\`

**RBAC** (recommended — granular, consistent with other Azure RBAC):
\`\`\`bash
az role assignment create \\
  --role "Key Vault Secrets User" \\
  --assignee user@company.com \\
  --scope /subscriptions/.../resourceGroups/.../providers/Microsoft.KeyVault/vaults/myVault
\`\`\`

## Use Key Vault in App Service

Reference Key Vault secrets in App Settings using Key Vault references:

\`\`\`
@Microsoft.KeyVault(VaultName=myVault;SecretName=DatabasePassword)
\`\`\`

Your App Service's managed identity must have Key Vault Secrets User role on the vault.

## Soft Delete & Purge Protection

\`\`\`bash
# Enable soft-delete (keeps deleted secrets for 90 days)
az keyvault update --name myVault --enable-soft-delete true

# Enable purge protection (prevents permanent deletion)
az keyvault update --name myVault --enable-purge-protection true
\`\`\``,
          },
          {
            id: "az-l14",
            title: "Azure DevOps & CI/CD",
            description: "Automate builds, tests, and deployments with Azure Pipelines",
            duration: "30 min",
            xp: 150,
            readingTime: "30 min",
            realWorld: `## Sarah Ends "It Works on My Machine" Forever

Every deployment is a nightmare. The developer builds locally, creates a zip, sends it to Sarah over Teams, and she manually uploads it to the server. This happens 3–4 times a week.

Last month, a developer accidentally sent Sarah the wrong version. Wrong zip. She deployed it. Production was broken for 40 minutes. The post-mortem said: "human error in the deployment process."

Sarah sets up a proper CI/CD pipeline using **Azure DevOps**:

**The pipeline (azure-pipelines.yml):**
\`\`\`yaml
trigger:
  branches:
    include:
      - main

stages:
- stage: Build
  jobs:
  - job: BuildAndTest
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - task: DotNetCoreCLI@2
      inputs:
        command: 'restore'
    - task: DotNetCoreCLI@2
      inputs:
        command: 'build'
    - task: DotNetCoreCLI@2
      inputs:
        command: 'test'  # Pipeline FAILS if any test fails
    - task: DotNetCoreCLI@2
      inputs:
        command: 'publish'
        publishWebProjects: true

- stage: Deploy_Staging
  dependsOn: Build
  jobs:
  - deployment: DeployToStaging
    environment: 'staging'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'Contoso-Production'
              appName: 'contoso-customer-portal'
              slotName: 'staging'

- stage: Deploy_Production
  dependsOn: Deploy_Staging
  condition: succeeded()
  jobs:
  - deployment: SwapToProduction
    environment: 'production'  # Requires approval from Sarah
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureAppServiceManage@0
            inputs:
              Action: 'Swap Slots'
              WebAppName: 'contoso-customer-portal'
              SourceSlot: 'staging'
\`\`\`

**Now the process is:**
1. Developer merges to \`main\`
2. Pipeline builds automatically, runs all tests
3. If tests pass, deploys to Staging
4. Sarah gets a Teams notification: "Staging ready for review. Approve to deploy production?"
5. She approves. Pipeline swaps Staging → Production. Zero downtime.

No more zip files. No more "I deployed the wrong version." No more manual steps.

**CI/CD pipelines are the most impactful automation you can build as an Azure admin. Once set up, deployments are safer, faster, and fully auditable.**`,
            content: `# Azure DevOps

Azure DevOps is a suite of development tools for the full software development lifecycle.

## Azure DevOps Services

| Service         | Description                                   |
|-----------------|-----------------------------------------------|
| Boards          | Work tracking (user stories, bugs, sprints)   |
| Repos           | Git repositories                              |
| Pipelines       | CI/CD automation                              |
| Test Plans      | Manual and automated testing                  |
| Artifacts       | Package management (npm, NuGet, Maven)        |

## CI/CD Concepts

- **CI (Continuous Integration)**: Automatically build and test code on every commit
- **CD (Continuous Deployment)**: Automatically deploy to environments after CI passes
- **Pipeline**: A series of automated steps (stages → jobs → steps)

## Azure Pipelines (YAML)

\`\`\`yaml
# azure-pipelines.yml
trigger:
  branches:
    include:
      - main

pool:
  vmImage: 'ubuntu-latest'

stages:
  - stage: Build
    jobs:
      - job: BuildAndTest
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '20.x'

          - script: npm install
            displayName: 'Install dependencies'

          - script: npm test
            displayName: 'Run tests'

          - task: ArchiveFiles@2
            inputs:
              rootFolderOrFile: '$(Build.SourcesDirectory)'
              archiveFile: '$(Build.ArtifactStagingDirectory)/app.zip'

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: '$(Build.ArtifactStagingDirectory)'

  - stage: Deploy
    dependsOn: Build
    condition: succeeded()
    jobs:
      - deployment: DeployToApp
        environment: 'production'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: AzureWebApp@1
                  inputs:
                    azureSubscription: 'my-service-connection'
                    appName: 'myWebApp'
                    package: '$(Pipeline.Workspace)/**/*.zip'
\`\`\`

## GitHub Actions → Azure

Deploy from GitHub Actions to Azure App Service:

\`\`\`yaml
- name: Deploy to Azure Web App
  uses: azure/webapps-deploy@v3
  with:
    app-name: 'myWebApp'
    publish-profile: \${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
    package: '.'
\`\`\``,
          },
        ],
        quiz: {
          id: "az-q4",
          questions: [
            {
              id: "aq4-q1",
              type: "MCQ",
              question: "Which Azure Storage redundancy option protects against an entire region going offline?",
              options: [
                "LRS (Locally Redundant Storage)",
                "ZRS (Zone-Redundant Storage)",
                "GRS (Geo-Redundant Storage)",
                "SAS (Shared Access Signature)",
              ],
              correctAnswer: "GRS (Geo-Redundant Storage)",
              explanation: "GRS replicates data to a secondary region hundreds of miles away, protecting against regional disasters.",
            },
            {
              id: "aq4-q2",
              type: "MCQ",
              question: "What is the purpose of a Deployment Slot in Azure App Service?",
              options: [
                "A time slot for scheduled maintenance",
                "A separate environment for staging that can be swapped to production with zero downtime",
                "A CPU allocation for your app",
                "A region selector for your app",
              ],
              correctAnswer: "A separate environment for staging that can be swapped to production with zero downtime",
              explanation: "Deployment slots let you deploy and test changes in a staging slot, then swap it with production instantly with no downtime.",
            },
            {
              id: "aq4-q3",
              type: "MCQ",
              question: "What does Azure Key Vault store?",
              options: [
                "Only database backups",
                "Secrets, cryptographic keys, and certificates",
                "Virtual machine snapshots",
                "Network security rules",
              ],
              correctAnswer: "Secrets, cryptographic keys, and certificates",
              explanation: "Key Vault securely stores secrets (API keys, passwords), cryptographic keys, and SSL/TLS certificates.",
            },
            {
              id: "aq4-q4",
              type: "MCQ",
              question: "What is Continuous Integration (CI)?",
              options: [
                "Manually deploying code to production",
                "Automatically building and testing code whenever it's committed",
                "Monitoring production application performance",
                "Backing up source code to Azure Repos",
              ],
              correctAnswer: "Automatically building and testing code whenever it's committed",
              explanation: "CI automatically builds and runs tests on every code commit, catching bugs early before they reach production.",
            },
            {
              id: "aq4-q5",
              type: "MCQ",
              question: "Which Azure Blob Storage tier is best for data that is rarely accessed and can tolerate hours-long retrieval time?",
              options: ["Hot", "Cool", "Cold", "Archive"],
              correctAnswer: "Archive",
              explanation: "Archive tier is the cheapest but data must be 'rehydrated' (takes hours) before access. Best for compliance and long-term backup.",
            },
            {
              id: "aq4-q6",
              type: "MCQ",
              question: "What is a Shared Access Signature (SAS) token in Azure Storage?",
              options: [
                "Your storage account password",
                "A time-limited token granting specific permissions to a storage resource without sharing account keys",
                "An encryption key for blobs",
                "A network firewall rule for storage",
              ],
              correctAnswer: "A time-limited token granting specific permissions to a storage resource without sharing account keys",
              explanation: "SAS tokens provide delegated, time-limited access to specific storage resources with specific permissions, without exposing account credentials.",
            },
          ],
        },
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getSection(courseSlug: string, sectionId: string) {
  const course = getCourse(courseSlug);
  return course?.sections.find((s) => s.id === sectionId);
}

export function getLesson(courseSlug: string, lessonId: string) {
  const course = getCourse(courseSlug);
  for (const section of course?.sections ?? []) {
    const lesson = section.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, section };
  }
  return null;
}
