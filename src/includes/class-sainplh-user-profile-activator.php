<?php

defined('ABSPATH') || exit;

class Sainplh_User_Profile_Activator
{
  protected $plugin_name;
  protected $version;

  public function __construct() {
    if (defined('SHUPP_VERSION')) {
      $this->version = SHUPP_VERSION;
    } else {
      $this->version = '0.0.0';
    }

    if (defined('SHUPP_PLUGIN_NAME')) {
      $this->plugin_name = SHUPP_PLUGIN_NAME;
    } else {
      $this->plugin_name = 'undefined_sainplh-user-profile';
    }
  }

  public static function activate()
  {
    $option_cookies_activated = 'cookies-made-simple-enabled_cookies';
  }
}