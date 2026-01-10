# Patient Registration Challenge

This project is a patient registration application built with **Laravel** and **Inertia.js (React)**, using **Docker** (Laravel Sail) for the development environment develop as part of an interview challenge with the company Light-It.

## Tech Stack


| PHP | TypeScript | Laravel | Octane Swoole | React | PostgreSQL | Redis | 
| ------ | ------ | ---------- | ---------- | ---------- | ---------- | ---------- |
| <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/php.png"> | <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png"> | <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/laravel.png"> | <img height="60" src="https://camo.githubusercontent.com/e5d274f08de89d04898659513a2fcfef5b0df3333ed52e850036ba8395568f02/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f73792d7265636f7264732f73746174696366696c652f696d616765732f73776f6f6c652f6c6f676f2e706e67"> | <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png"> | <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png"> | <img height="60" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/redis.png"> | 

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running.
- **No local PHP or Node.js required!** (Everything runs inside Docker).

## 🚀 Getting Started

Follow these steps to set up the project on a new machine.

### 1. Set Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

### 2. Install PHP Dependencies

This project relies on Laravel Sail. To install dependencies without having PHP installed locally, run:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs
```
*(Note for Windows PowerShell: Use `${PWD}` instead of `$(pwd)`.)*

### 3. Start the Application

Start the Docker containers (including Laravel Octane/Swoole, PostgreSQL, and Redis):

```bash
./vendor/bin/sail up -d --build
```
*Note: The `--build` flag is recommended on the first run to ensure the Swoole extension is correctly compiled.*

### 4. Setup Application

Generate the application key and run migrations:

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
```

### 5. Install Frontend Dependencies & Build

Install Node.js dependencies and build the assets:

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run build
```

### 6. Access the Application

The application should now be accessible at:
**http://localhost**

## Octane & Swoole
This application runs on **Laravel Octane** with the **Swoole** server for high performance.
The server automatically starts when you run `sail up`.

You can check the status:
```bash
./vendor/bin/sail artisan octane:status
```

## 🛠 Development Usage

### Frontend Development
To enable hot-reloading for React/Inertia (so you don't have to build every time):

```bash
./vendor/bin/sail npm run dev
```

### Running Commands
You can run any Artisan, Composer, or NPM command via Sail:

```bash
./vendor/bin/sail artisan migrate
./vendor/bin/sail composer require ...
./vendor/bin/sail npm install ...
```

### Stopping the Environment
```bash
./vendor/bin/sail down
```
