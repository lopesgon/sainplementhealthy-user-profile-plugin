<?php

$environment = getenv('APP_ENV') ?: 'prod';

// Include the appropriate config file based on the environment
$configFile = plugin_dir_path( __FILE__ ) . "config/config.{$environment}.php";
if (!file_exists($configFile)) {
    throw new Exception("Configuration file for '{$environment}' environment not found.");
}

return require $configFile;