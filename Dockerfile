FROM php:8.2-apache

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libzip-dev \
    libssl-dev \
    && docker-php-ext-install zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar proyecto
COPY . /var/www/html/

# Instalar dependencias PHP
RUN composer install

# Activar mod_rewrite (por si acaso)
RUN a2enmod rewrite

# Permisos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80