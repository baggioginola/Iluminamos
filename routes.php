<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 13/ene/2017
 * Time: 19:39
 */

$app->get('/', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    $result = Products::singleton()->getRandomAll();

    return $this->view->render($response, 'main.twig', array('result' => $result, 'settings' => $settings, 'total_products' => $total_products));
});

$app->get('/categoria/{id_categoria}', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';
    require_once __CONTROLLER__ . 'CCategoriesController.class.inc.php';
    require_once __CONTROLLER__ . 'CBrandsController.class.inc.php';
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    $result_brands = Brands::singleton()->getAll();
    $result_categories = Categories::singleton()->getAll();

    $result_category = Categories::singleton()->getById($args);

    if (!$result_category) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }

    $result = Products::singleton()->getByCategory($args);

    return $this->view->render($response, 'products.twig', array('settings' => $settings, 'result' => $result, 'result_category' => $result_category, 'result_brands' => $result_brands, 'result_categories' => $result_categories, 'total_products' => $total_products));
});

$app->get('/producto/{id_producto}', function ($request, $response, $args) {
    global $settings;

    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    $result = Products::singleton()->getById($args);

    if (!$result) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }

    return $this->view->render($response, 'product.twig', array('settings' => $settings, 'result' => $result, 'total_products' => $total_products));
});

$app->get('/proyectos', function ($request, $response, $args) {
    global $settings;

    require_once __CONTROLLER__ . 'CProjectsController.class.inc.php';
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    $result = Projects::singleton()->getAll();

    return $this->view->render($response, 'projects.twig', array('settings' => $settings, 'result' => $result, 'total_products' => $total_products));
});

$app->get('/proyecto/{id_proyecto}', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    return $this->view->render($response, 'project.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/quienes-somos', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    return $this->view->render($response, 'brand.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/confirmar-paypal', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CPaypalController.class.inc.php';
    $result = Paypal::singleton()->pay();

    if (!$result) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }

    return $response->withStatus(200)->withHeader('Location', $result);
});

$app->get('/cart', function ($request, $response, $args) use ($app) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    if ($total_products == 0) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }

    $result = Cart::singleton()->getAll();

    return $this->view->render($response, 'cart.twig', array('settings' => $settings, 'result' => $result['result_all'], 'total' => $result['total'], 'total_products' => $total_products));
});

$app->get('/registro', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    return $this->view->render($response, 'register.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/terminos-condiciones', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    return $this->view->render($response, 'terms_conditions.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/pagar-paypal', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    return $this->view->render($response, 'paypal.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/contacto', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    return $this->view->render($response, 'contact.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/login', function ($request, $response, $args) {
    global $settings;
    require_once __CONTROLLER__ . 'CCartController.class.inc.php';
    $total_products = Cart::singleton()->getAllProducts();

    return $this->view->render($response, 'login.twig', array('settings' => $settings, 'total_products' => $total_products));
});

