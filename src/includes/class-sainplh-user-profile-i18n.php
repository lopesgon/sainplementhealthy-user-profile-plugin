<?php

defined('ABSPATH') || exit;

class Sainplh_User_Profile_I18N
{

  public function load_plugin_textdomain()
  {
    load_plugin_textdomain(
      'plugin-name',
      false,
      dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
    );
  }
}