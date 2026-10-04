<?php
/**
 * Plugin Name: Enable Application Passwords
 * Description: Re-enables WordPress's built-in Application Passwords feature so trusted tools can connect to this blog through the REST API. Deactivate to turn it back off.
 * Version: 1.0
 * Author: Bella Mia Exclusive Events
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'wp_is_application_passwords_available', '__return_true', 999 );
add_filter( 'wp_is_application_passwords_available_for_user', '__return_true', 999 );
