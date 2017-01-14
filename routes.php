<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 13/ene/2017
 * Time: 19:39
 */

$app->get('/', function($request, $response, $args){
    global $settings;
    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

    $products = Products::singleton()->getAll();
    #$products = Products::singleton()->getById();

    #echo '<pre>' . print_r($products, 1) . '</pre>';
    return $this->view->render($response, 'main.twig', array('data' => $products,'nombre' => 'Mario', 'settings' => $settings));
});

$app->get('/categoria/{id_categoria}', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';
    require_once __CONTROLLER__ . 'CCategoriesController.class.inc.php';
    $result = Products::singleton()->getByCategory($args);
    $result_category = Categories::singleton()->getById($args);

    return $this->view->render($response, 'products.twig', array('settings' => $settings, 'result' => $result, 'result_category' => $result_category));
});

$app->get('/producto/{id_producto}', function ($request, $response, $args) {
    global $settings;

    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

    $result = Products::singleton()->getById($args);

    #echo print_r($result, 1);
    return $this->view->render($response, 'product.twig', array('settings' => $settings, 'result' => $result));
});

$app->get('/productos/{name}', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'products.twig', array('settings' => $settings));
});

$app->get('/proyectos', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'projects.twig', array('settings' => $settings));
});

$app->get('/quienes-somos', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'brand.twig', array('settings' => $settings));
});
