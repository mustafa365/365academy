export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  content: string;
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
