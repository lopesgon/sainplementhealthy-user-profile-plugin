<?php
defined('ABSPATH') || exit;

class Shupp_Add_Favorite_Shortcode
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
    add_shortcode('shupp-add-favorite', [$this, 'render_shortcode']);
  }

  public function render_shortcode($atts)
  {
    $atts = shortcode_atts([
      'icon' => 'Mes favoris',
      // 'favorite_icon' => plugins_url('assets/hearth-red.svg'),
      'favorite_icon' => SHUPP_PLUGIN_ROOT_URL . 'assets/like.svg',
    ], $atts);

    extract($atts);
    global $post;

    // Get post-specific data
    $post_id = $post->ID;
    $title = esc_attr($post->post_title);
    $url = esc_url(get_permalink($post));
    $thumbnail_url = esc_url(get_the_post_thumbnail_url($post, 'thumbnail'));

    // <img src='" . esc_url($favorite_icon) . "'>
    $result = "<div class='shupp-add-favorite-button'
      data-post-id='{$post_id}'
      data-title='{$title}'
      data-url='{$url}'
      data-thumbnail='{$thumbnail_url}'>";

    $svg_path = SHUPP_PLUGIN_ROOT_PATH . 'assets/like.svg';
    if (file_exists($svg_path)) {
      $svg_content = file_get_contents($svg_path);
      $result .= $svg_content;
    } else {
      // Handle the error if the file doesn't exist
      $result .= 'SVG file not found.';
    }
    $result .= "</div>";

    ob_start();
    echo $result;
    return ob_get_clean();
  }
}

Shupp_Add_Favorite_Shortcode::get_instance();