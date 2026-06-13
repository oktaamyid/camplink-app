# Stage 1: Build frontend assets
FROM node:22-alpine AS frontend
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# Install dependencies first (caching layer)
COPY package.json pnpm-lock.yaml ./
RUN pnpm config set ignore-scripts true && pnpm install --frozen-lockfile

# Copy the rest of the application and build
COPY . .
RUN pnpm run build


# Stage 2: Build PHP application
FROM php:8.2-apache
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Configure Apache DocumentRoot
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . .

# Copy built frontend assets from stage 1
COPY --from=frontend /app/public/build public/build

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 80
EXPOSE 80

# Start Apache (and run migrations first)
CMD php artisan storage:link && php artisan migrate --force && php artisan db:seed --force && apache2-foreground
