<?php
/**
 * Created by PhpStorm.
 * User: mariocue
 * Date: 02/01/2017
 * Time: 10:48 AM
 */

require_once __DIR__ . '/../config.php';
require_once FRAMEWORK . 'slim/vendor/autoload.php';

$public_files = array(
    'CSS' => CSS,
    'JS' => JS,
    'IMG' => IMG,
    'DOMAIN' => DOMAIN
);

$app = new \Slim\App;

$container = $app->getContainer();

$container['view'] = function($container) {
    $view = new \Slim\Views\Twig(TWIG_TEMPLATES);


    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));
    return $view;
};

$app->get('/', function($request, $response, $args){
    global $public_files;
    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

    $products = Products::singleton()->getAll();
    #$products = Products::singleton()->getById();

    #echo '<pre>' . print_r($products, 1) . '</pre>';
    return $this->view->render($response, 'main.twig', array('data' => $products,'nombre' => 'Mario', 'public' => $public_files));
});


// Define app routes
$app->get('/productos/{name}', function ($request, $response, $args) {
    global $public_files;
    return $this->view->render($response, 'products.twig', array('public' => $public_files));
});

$app->get('/producto/{name}', function ($request, $response, $args) {
    global $public_files;
    return $this->view->render($response, 'product.twig', array('public' => $public_files));
});


$app->get('/proyectos', function ($request, $response, $args) {
    global $public_files;
    return $this->view->render($response, 'projects.twig', array('public' => $public_files));
});

$app->get('/quienes-somos', function ($request, $response, $args) {
    global $public_files;
    return $this->view->render($response, 'brand.twig', array('public' => $public_files));
});


$app->run();