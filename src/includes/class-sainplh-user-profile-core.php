<?php

defined('ABSPATH') || exit;

class Sainplh_User_Profile_Core
{
  private static $instance;

  private $plugin_name;
  protected $loader;
  protected $cookies_made_simple;
  protected $version;

  private function __construct()
  {
    defined('SHUPP_VERSION') ?
      $this->version = SHUPP_VERSION
      : $this->version = '0.0.0-' . time();

    defined('SHUPP_PLUGIN_NAME') ?
      $this->plugin_name = SHUPP_PLUGIN_NAME
      : $this->plugin_name = 'undefined_sainplh-user-profile';

    $this->load_dependencies();
    // $this->set_locale();
    $this->define_admin_hooks();
    $this->define_public_hooks();
  }

  public static function get_instance()
  {
    if (null == self::$instance) {
      self::$instance = new self();
    }

    return self::$instance;
  }

  private function load_dependencies()
  {
    /**
     * The class responsible for orchestrating the actions and filters of the
     * core plugin.
     */
    require 'class-sainplh-user-profile-loader.php';

    /**
     * The class responsible for defining internationalization functionality
     * of the plugin.
     */
    // require_once plugin_dir_path(dirname(__FILE__)) . 'includes/CookiesMadeSimpleI18N.php';

    /**
     * The class responsible for defining all actions that occur in the admin area.
     */
    // require_once plugin_dir_path(dirname(__FILE__)) . 'admin/CookiesMadeSimpleAdmin.php';

    /**
     * The class responsible for defining all actions that occur in the public-facing
     * side of the site.
     */
    require plugin_dir_path(dirname(__FILE__)) . 'public/class-sainplh-user-profile-public.php';


    require 'shortcodes/index.php';
    // require 'widgets/class-shupp-favorite-list-widget.php';

    $this->loader = new Sainplh_User_Profile_Loader();
  }

  private function set_locale()
  {
    // $plugin_i18n = new CookiesMadeSimpleI18N();
    // $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
  }

  private function define_admin_hooks()
  {
    // new CookiesMadeSimpleAdmin($this->get_plugin_name(), $this->get_version(), $this->get_loader());
  }

  private function define_public_hooks()
  {
    Sainplh_User_Profile_Public::get_instance($this->get_plugin_name(), $this->get_version(), $this->get_loader());
  }

  public function run()
  {
    $this->loader->run();
  }

  public function get_plugin_name()
  {
    return $this->plugin_name;
  }

  public function get_loader()
  {
    return $this->loader;
  }

  public function get_version()
  {
    return $this->version;
  }
}