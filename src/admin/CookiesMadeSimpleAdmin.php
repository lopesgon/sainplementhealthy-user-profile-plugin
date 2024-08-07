<?php

defined('ABSPATH') || exit;

class CookiesMadeSimpleAdmin
{
  private $plugin_name;
  private $version;
  private $loader;
  private $menu_slug;

  public function __construct($plugin_name, $version, $loader)
  {
    $this->plugin_name = $plugin_name;
    $this->version = $version;
    $this->loader = $loader;
    $this->menu_slug = 'cookies-made-simple-settings';
    $this->load_dependencies();
    $this->load_admin();
  }

  private function load_dependencies()
  {
    /**
     * The classes responsible to add all nice features for this plugin
     */
    // require_once plugin_dir_path(dirname(__FILE__)) . 'admin/mapper/SainplhRecipeIngredientMapper.php';
  }
  private function load_admin()
  {
    // Scripts
    // $this->loader->add_action('admin_head', $this, 'custom_favicon');
    $this->loader->add_action('admin_enqueue_scripts', $this, 'enqueue_styles');
    $this->loader->add_action('admin_enqueue_scripts', $this, 'enqueue_scripts');
    $this->loader->add_action('admin_enqueue_scripts', $this, 'add_inline_scripts');

    // Menu
    $this->loader->add_action('admin_menu', $this, 'menu_section');

    // REST
    // $this->define_admin_ingredients_rest();

    // OPTIONS
    # $this->loader->add_action('admin_init', $plugin_admin, 'register_settings');
  }

  function custom_favicon()
  {
    /*
    echo '<style>
      .dashicons-cookie {
          background-image: url("' . plugin_dir_url(__FILE__) . '/assets/cookie-icon.png");
          background-repeat: no-repeat;
          background-position: center; 
      }
    </style>';
    */
  }

  public function enqueue_styles()
  {
    wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/main.css', array(), $this->version, 'all');
  }

  public function enqueue_scripts()
  {
    wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/main.js', array(), $this->version, false);
  }

  public function add_inline_scripts()
  {
    if ($this->enqueue_check()) {
      wp_add_inline_script($this->plugin_name, 'const cookies_made_simple_plugin_admin_setting_properties = ' . json_encode(
        array(
          'admin_ajax' => esc_js(get_rest_url(null, '/cookies-made-simple-plugin/v1/')),
        )
      ), 'before');
    }
  }

  private function enqueue_check()
  {
    $current_screen = get_current_screen();
    return $current_screen && 'toplevel_page_' . $this->menu_slug === $current_screen->id;
  }

  //---------------------------------------------------
  // MENU SECTION
  //---------------------------------------------------
  public function menu_section()
  {
    // main item
    add_menu_page('Cookies Made Simple', 'Cookies Made Simple', 'manage_options', $this->menu_slug, array($this, 'menu_section_display'), 'dashicons-cookie', 4);
    // settings item
    add_submenu_page($this->menu_slug, 'Cookies Made Simple Settings', esc_html__('Settings', $this->menu_slug), 'edit_others_posts', $this->menu_slug);
  }

  public function menu_section_display()
  {
    if (current_user_can('manage_options')) {
      ob_start();
      include_once plugin_dir_path(__FILE__) . 'partials/admin-menu-display.php';
      echo ob_get_clean();
    } else {
      echo '<p>' . esc_html__('You do not have adequate permissions for this action!', 'cookies-made-simple-menu') . '</p>';
    }
  }
}