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

    return $this->view->render($response, 'main.twig', array('data' => $products,'nombre' => 'Mario', 'settings' => $settings));
});

$app->get('/categoria/{id_categoria}', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';
    require_once __CONTROLLER__ . 'CCategoriesController.class.inc.php';
    require_once  __CONTROLLER__ . 'CBrandsController.class.inc.php';
    $result_brands = Brands::singleton()->getAll();
    $result_categories = Categories::singleton()->getAll();

    $result = Products::singleton()->getByCategory($args);
    $result_category = Categories::singleton()->getById($args);

    return $this->view->render($response, 'products.twig', array('settings' => $settings, 'result' => $result, 'result_category' => $result_category, 'result_brands' => $result_brands, 'result_categories' => $result_categories));
});

$app->get('/producto/{id_producto}', function ($request, $response, $args) {
    global $settings;

    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

    $result = Products::singleton()->getById($args);

    #echo print_r($result, 1);
    return $this->view->render($response, 'product.twig', array('settings' => $settings, 'result' => $result));
});

$app->get('/producto_test/{id_producto}', function ($request, $response, $args) {
    global $settings;

    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

    $result = Products::singleton()->getById($args);

    #echo print_r($result, 1);
    return $this->view->render($response, 'product_test.twig', array('settings' => $settings, 'result' => $result));
});

$app->get('/proyectos', function ($request, $response, $args) {
    global $settings;

    require_once __CONTROLLER__ . 'CProjectsController.class.inc.php';

    $result = Projects::singleton()->getAll();

    return $this->view->render($response, 'projects.twig', array('settings' => $settings, 'result' => $result));
});

$app->get('/proyecto/{id_proyecto}', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'project.twig', array('settings' => $settings));
});

$app->get('/quienes-somos', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'brand.twig', array('settings' => $settings));
});

$app->get('/cart', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    $result = Cart::singleton()->getAll();

    return $this->view->render($response, 'cart.twig', array('settings' => $settings, 'result' => $result['result_all'], 'total' => $result['total'], 'total_products' => $total_products));
});

/* ----------------------------------- */
$app->get('/productos/{name}', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'products.twig', array('settings' => $settings));
});

