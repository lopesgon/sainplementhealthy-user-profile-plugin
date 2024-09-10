<?php
defined('ABSPATH') || exit;

/**
 * The plugin bootstrap file
 *
 * @wordpress-plugin
 * Plugin Name:       SainplementHealthy - User Profile
 * Plugin URI:        https://github.com/lopesgon/sainplh-user-profile
 * Description:       A plugin to add user related features to the SainplementHealthy website.
 * Version:           1.0.2
 * Author:            lopesgon
 * Author URI:        https://github.com/lopesgon/sainplh-user-profile
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:       /languages
 */

$result = require plugin_dir_path( __FILE__ ) . 'config.php';

if (is_array($result)) {
  foreach ($result as $key => $value) {
    define($key, $value);
  }
}

define('SHUPP_VERSION', '1.0.2');
define('SHUPP_PLUGIN_NAME', 'sainplh-user-profile');
define('SHUPP_DEV_MODE', __SHUPP_DEV_MODE__);
define('SHUPP_PLUGIN_ROOT_URL', plugin_dir_url(__FILE__));
define('SHUPP_PLUGIN_ROOT_PATH', plugin_dir_path(__FILE__));

class Sainplh_User_Profile_Root
{
  private static $instance;

  protected $plugin_name;
  protected $version;

  private function __construct()
  {
    defined('SHUPP_VERSION') ?
      $this->version = SHUPP_VERSION
      : $this->version = '0.0.0-' . time();

    defined('SHUPP_PLUGIN_NAME') ?
      $this->plugin_name = SHUPP_PLUGIN_NAME
      : $this->plugin_name = 'undefined_sainplh-user-profile';

    register_activation_hook(__FILE__, [$this, 'activation_hook']);
    register_deactivation_hook(__FILE__, [$this, 'deactivation_hook']);

    require plugin_dir_path(__FILE__) . 'includes/class-sainplh-user-profile-core.php';

    $plugin = Sainplh_User_Profile_Core::get_instance();
    $plugin->run();
  }

  public static function get_instance()
  {
    if (null == self::$instance) {
      self::$instance = new self();
    }

    return self::$instance;
  }

  public function activation_hook()
  {
    require plugin_dir_path(__FILE__) . 'includes/class-sainplh-user-profile-activator.php';
    Sainplh_User_Profile_Activator::activate();
  }
  public function deactivation_hook()
  {
    require plugin_dir_path(__FILE__) . 'includes/class-sainplh-user-profile-deactivator.php';
    Sainplh_User_Profile_Deactivator::deactivate();
  }
}

Sainplh_User_Profile_Root::get_instance();
