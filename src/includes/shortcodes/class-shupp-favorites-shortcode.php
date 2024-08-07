<?php
defined('ABSPATH') || exit;

class Shupp_Favorites_Shortcode
{
  private static $instance;

  private $plugin_name;
  private $version;
  private $loader;

  private function __construct()
  {
    $this->register_shortcode();
  }

  public static function get_instance()
  {
    if (null == self::$instance) {
      self::$instance = new self();
    }

    return self::$instance;
  }

  public function register_shortcode()
  {
    add_shortcode('shupp-favorites', [$this, 'render_shortcode']);
  }

  public function render_shortcode($atts)
  {
    $atts = shortcode_atts([
      'title' => 'Mes favoris',
      'show_count' => true,
      'show_thumbnails' => true,
      'show_price' => true,
      'show_excerpt' => true
    ], $atts);

    extract($atts);

    ob_start();

    echo "<div id='shupp-favorites'>{$title}</div>";

    return ob_get_clean();
  }
}

Shupp_Favorites_Shortcode::get_instance();