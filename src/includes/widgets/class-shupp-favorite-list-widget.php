<?php
defined('ABSPATH') || exit;

class Shupp_Favorite_List_Widget extends WP_Widget
{

  public function __construct()
  {
    parent::__construct(
      'shupp_favorite_list_widget',
      'Shupp Favorite List Widget',
      [
        'description' => __('Displays user\'s favorites list.', 'shupp')
      ]
    );
  }

  /**
   * Front-end display of widget.
   *
   * @see WP_Widget::widget()
   *
   * @param array $args     Widget arguments.
   * @param array $instance Saved values from database.
   */
  public function widget($args, $instance)
  {
    extract($args);

    echo $before_widget;

    if (!empty($title)) {
      echo $before_title . esc_html($title) . $after_title;
    }

    // Display the cards
    if (shortcode_exists('shupp-favorites')) {
      echo do_shortcode('[shupp-favorites]');
    }

    echo $after_widget;
    // echo $args['after_widget'];
  }

  /**
   * Back-end widget form.
   *
   * @see WP_Widget::form()
   *
   * @param array $instance Previously saved values from database.
   */
  public function form($instance)
  {
    // nothing here
    // return $instance;
  }

  /**
   * Sanitize widget form values as they are saved.
   *
   * @see WP_Widget::update()
   *
   * @param array $new_instance Values just sent to be saved.
   * @param array $old_instance Previously saved values from database.
   *
   * @return array Updated safe values to be saved.
   */
  public function update($new_instance, $old_instance)
  {
    // $instance = [];
    // $instance['title'] = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
    // return $instance;
  }
}


function shupp_favorite_list_widget_registers()
{
  register_widget('Shupp_Favorite_List_Widget');
}
add_action('widgets_init', 'shupp_favorite_list_widget_registers');
