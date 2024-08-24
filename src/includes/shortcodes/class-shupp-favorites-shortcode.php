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
      'title' => '',
      'before_title' => '<h3 class="shupp-favorites-title">',
      'after_title' => '</h3>',
    ], $atts);

    extract($atts);

    ob_start();

    echo "<div id='shupp-favorites-root'>
      {$before_title}{$title}{$after_title}
      <div id='shupp-favorites'></div>
    </div>";

    return ob_get_clean();
  }
}

Shupp_Favorites_Shortcode::get_instance();