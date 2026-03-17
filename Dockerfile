FROM php:8.2-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libzip-dev \
    libssl-dev \
    && docker-php-ext-install zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar el proyecto al contenedor
COPY . /var/www/html/

# Instalar dependencias de PHP (esto crea /vendor)
RUN composer install --no-dev --optimize-autoloader

# Activar mod_rewrite (por si usas rutas)
RUN a2enmod rewrite

# Permisos
RUN chown -R www-data:www-data /var/www/html

# Exponer puerto
EXPOSE 80
