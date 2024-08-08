<?php

defined('ABSPATH') || exit;

class Sainplh_User_Profile_Public
{
  private static $instance;

  private $plugin_name;
  private $version;
  private $loader;

  private function __construct($plugin_name, $version, $loader)
  {
    $this->plugin_name = $plugin_name;
    $this->version = $version;
    $this->loader = $loader;
    $this->load_dependencies();
    $this->load();
  }

  public static function get_instance($plugin_name, $version, $loader)
  {
    if (null == self::$instance) {
      self::$instance = new self($plugin_name, $version, $loader);
    }

    return self::$instance;
  }

  private function load_dependencies()
  {
    // nothing to do here
  }

  private function load()
  {
    // Scripts
    $this->loader->add_action('wp_enqueue_scripts', $this, 'enqueue_styles');
    $this->loader->add_action('wp_enqueue_scripts', $this, 'enqueue_scripts');

    $this->loader->add_action('wp_enqueue_scripts', $this, 'add_inline_scripts');
    // $this->loader->add_action('wp_footer', $this, 'default_display');
  }

  public function enqueue_styles()
  {
    wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/index.css', [], $this->version, 'all');
  }

  public function enqueue_scripts()
  {
    wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/index.js', [], $this->version, false);
  }

  public function add_inline_scripts()
  {
    // For futur feature toggling on client side
    $booleanExample = true;
    $pluginName = 'sainplementhealthy-user-profile-plugin';

    wp_add_inline_script($this->plugin_name, 'const sainplementhealthy_user_profile_plugin_public_properties = ' . json_encode(
      [
        // 'admin_ajax' => esc_js(get_rest_url(null, '/cookies-made-simple-plugin/v1/')),
        'pluginUrl' => SHUPP_PLUGIN_ROOT_URL,
      ]
    ), 'before');
  }

  /**
   * This function generated default DOM elements that will be manipulated by Javascript.
   */
  public function default_display()
  {
    ?>
    <div id="shupp-root">
      <?php
      include_once plugin_dir_path(__FILE__) . 'partials/header.php';
      include_once plugin_dir_path(__FILE__) . 'partials/content.php';
      include_once plugin_dir_path(__FILE__) . 'partials/footer.php';
      ?>
    </div>

    <?php
  }
}