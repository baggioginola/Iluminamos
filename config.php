<?php
/**
 * Created by PhpStorm.
 * User: mariocue
 * Date: 02/01/2017
 * Time: 10:45 AM
 */

define('ENVIRONMENT', 'test'); # must be production or test.
define('__ROOT__', dirname(__FILE__));
define('PROJECT', 'Github/iluminamos/');
define('DOMAIN', 'http://' . $_SERVER['HTTP_HOST'] . '/' . PROJECT);

define('FRAMEWORK', __ROOT__ . '/core/framework/');

define('__CONTROLLER__', __ROOT__ . '/app/controller/');
define('__MODEL__', __ROOT__ . '/app/model/');
define('__VIEW__', __ROOT__ . '/app/view/');

define('TWIG_TEMPLATES', __ROOT__ . '/app/view');

define('CSS', DOMAIN . 'includes/public/css/');
define('JS', DOMAIN . 'includes/public/js');