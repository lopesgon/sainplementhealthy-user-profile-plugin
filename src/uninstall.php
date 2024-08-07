<?php
defined('ABSPATH') || exit;

if (!defined('WP_UNINSTALL_PLUGIN')) {
  exit;
}

$option_cookies_activated = 'cookies-made-simple-enabled_cookies';
delete_option($option_cookies_activated);