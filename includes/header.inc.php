<?php
/**
 * Created by PhpStorm.
 * User: mariocue
 * Date: 02/01/2017
 * Time: 10:48 AM
 */

require_once __DIR__ . '/../config.php';
require_once FRAMEWORK . 'slim/vendor/autoload.php';
require_once __DIR__ . '/../auth.php';
session_start();
$settings = array(
    'CSS' => CSS,
    'JS' => JS,
    'IMG' => IMG,
    'DOMAIN' => DOMAIN,
    'PRODUCT_IMG' => PRODUCT_IMG,
    'PROJECT_IMG' => PROJECT_IMG,
    'BANNER_IMG' => BANNER_IMG
);

$app = new \Slim\App;

$container = $app->getContainer();

$container['view'] = function($container) {
    $view = new \Slim\Views\Twig(TWIG_TEMPLATES);
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));
    return $view;
};