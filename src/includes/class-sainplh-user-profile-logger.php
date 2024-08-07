<?php

defined('ABSPATH') || exit;

if (!defined('SHUPP_LOG_DIR')) {
  define('SHUPP_LOG_DIR', WP_CONTENT_DIR . '/logs/sainplh-user-profile-plugin');
}

class Sainplh_User_Profile_Logger
{

  const NONE = 0;
  const ERROR = 1;
  const WARN = 2;
  const INFO = 3;
  const DEBUG = 4;

  var $level;
  var $module;
  var $file;
  var $is_debug = false;

  function __construct($module)
  {
    $this->module = $module;
    if (defined('SHUPP_LOG_LEVEL')) {
      $this->level = SHUPP_LOG_LEVEL;
    } else {
      $this->level = (int) get_option('shupp_log_level', self::WARN);
    }

    $this->is_debug = $this->level == self::DEBUG;

    if (!wp_mkdir_p(SHUPP_LOG_DIR)) {
      $this->level = self::NONE;
    }

    $this->file = SHUPP_LOG_DIR . '/' . $module . '-' . date('Y-m') . '.txt';
  }

  /**
   * 
   * @param string|WP_Error|array|stdClass $text
   * @param int $level
   */
  function log($text, $stacktrace, $level = self::WARN)
  {
    global $current_user;

    if ($level != self::ERROR && $this->level < $level) {
      return;
    }

    if (defined('DOING_CRON') && DOING_CRON) {
      $user = '[cron]';
    } else if ($current_user) {
      $user = $current_user->user_login;
    } else {
      $user = '[no user]';
    }

    $time = date('d-m-Y H:i:s');
    $time .= ';' . $this->module;
    
    switch ($level) {
      case self::ERROR:
        $time .= ';ERROR';
        break;
      case self::WARN:
        $time .= ';WARN';
        break;
      case self::INFO:
        $time .= ';INFO ';
        break;
      case self::DEBUG:
        $time .= ';DEBUG';
        break;
    }
    if (is_wp_error($text)) {
      /* @var $text WP_Error */
      $text = $text->get_error_message() . ' (' . $text->get_error_code() . ') - ' . print_r($text->get_error_data(), true);
    } else {
      if (is_array($text) || is_object($text)) {
        $text = print_r($text, true);
      }
    }

    $memory_limit = size_format(wp_convert_hr_to_bytes(ini_get('memory_limit')));

    // The "logs" dir is created on constructor.
    $res = @file_put_contents($this->file, $time . ';' . SHRP_VERSION . ';' . size_format(memory_get_usage(), 1) . '/' . $memory_limit . ';' . $user . ';' . $text . ';' . $stacktrace . "\n", FILE_APPEND);
    if ($res === false) {
      // $this->level = self::NONE;
    }
  }


  function debug($text)
  {
    $this->log($text, null, self::DEBUG);
  }

  function info($text)
  {
    $this->log($text, null, self::INFO);
  }

  function warn($text, $stacktrace = null)
  {
    self::log($text, $stacktrace, self::WARN);
  }

  function error($text, $stacktrace = null)
  {
    $this->log($text, $stacktrace, self::ERROR);
  }
}