SET client_min_messages = warning;
-- -------------------------
-- Database blog
-- -------------------------
DROP DATABASE IF EXISTS blog;
--
--
CREATE DATABASE blog;
-- -------------------------
-- Database blog_test
-- -------------------------
DROP DATABASE IF EXISTS blog_test;
--
--
CREATE DATABASE blog_test;
-- -------------------------
-- Role admin
-- -------------------------
DROP ROLE IF EXISTS admin;
--
--
CREATE ROLE admin WITH PASSWORD 'admin';
-- -------------------------
-- Alter Role admin
-- -------------------------
ALTER ROLE admin WITH SUPERUSER CREATEROLE CREATEDB LOGIN;
-- -------------------------
-- Database GRANT PRIVILEGES
-- -------------------------
GRANT ALL PRIVILEGES ON DATABASE blog TO admin;
GRANT ALL PRIVILEGES ON DATABASE blog_test TO admin;
-- -------------------------
-- Connect to blog database
-- -------------------------
\c blog;
-- -------------------------
-- Set Timezone
-- -------------------------
SET TIMEZONE = 'UTC';
-- -------------------------
-- Create Extension uuid
-- -------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- -------------------------
-- Table users
-- -------------------------
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uuid uuid uuid_generate_v4() UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT timezone('UTC', now()),
    updated_at TIMESTAMP DEFAULT timezone('UTC', now()),
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table posts
-- -------------------------
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    uuid uuid uuid_generate_v4() UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT timezone('UTC', now()),
    updated_at TIMESTAMP DEFAULT timezone('UTC', now())
);