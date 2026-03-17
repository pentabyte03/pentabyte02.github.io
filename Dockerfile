FROM php:8.2-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libzip-dev \
    libssl-dev \
    && docker-php-ext-install zip bcmath

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar el proyecto
COPY . /var/www/html/

# Instalar dependencias PHP
RUN composer install --no-dev --optimize-autoloader

# Activar mod_rewrite
RUN a2enmod rewrite

# Permisos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
