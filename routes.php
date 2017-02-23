<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 13/ene/2017
 * Time: 19:39
 */

require_once __CONTROLLER__ . 'CCartController.class.inc.php';
require_once CLASSES . 'CSession.class.inc.php';

$total_products = Cart::singleton()->getAllProducts();

$name = Session::singleton()->getName();
$last_name = Session::singleton()->getLastName();

$settings['NAME'] = $name;
$settings['LAST_NAME'] = $last_name;

$app->get('/', function ($request, $response, $args) {
    global $settings, $total_products;
    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

    $result = Products::singleton()->getRandomAll();

    return $this->view->render($response, 'main.twig', array('result' => $result, 'settings' => $settings, 'total_products' => $total_products));
});

$app->get('/categoria/{id_categoria}', function ($request, $response, $args) {
    global $settings, $total_products;
    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';
    require_once __CONTROLLER__ . 'CCategoriesController.class.inc.php';
    require_once __CONTROLLER__ . 'CBrandsController.class.inc.php';
    require_once __CONTROLLER__ . 'CImagesController.class.inc.php';

    $result_brands = Brands::singleton()->getAll();
    $result_categories = Categories::singleton()->getAll();
    $result_category = Categories::singleton()->getById($args);

    if (!$result_category) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }
    $result = Products::singleton()->getByCategory($args);

    $result_image = Images::singleton()->getProductsUrl($result);

    return $this->view->render($response, 'products.twig', array('settings' => $settings, 'result' => $result_image, 'result_category' => $result_category, 'result_brands' => $result_brands, 'result_categories' => $result_categories, 'total_products' => $total_products));
});

$app->get('/producto/{id_producto}', function ($request, $response, $args) {
    global $settings, $total_products;

    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';
    require_once __CONTROLLER__ . 'CLikeController.class.inc.php';
    require_once __CONTROLLER__ . 'CImagesController.class.inc.php';
    $result = Products::singleton()->getById($args);

    if (!$result) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }

    $result_image = Images::singleton()->getProductUrl($result);
    $like = Like::singleton()->getByIdProduct($args['id_producto']);

    return $this->view->render($response, 'product.twig', array('settings' => $settings, 'result' => $result_image, 'total_products' => $total_products, 'like' => $like));
});

$app->get('/proyectos', function ($request, $response, $args) {
    global $settings, $total_products;

    require_once __CONTROLLER__ . 'CProjectsController.class.inc.php';
    require_once __CONTROLLER__ . 'CImagesController.class.inc.php';

    $result = Projects::singleton()->getAll();

    $result_image = Images::singleton()->getProjectsUrl($result);
    return $this->view->render($response, 'projects.twig', array('settings' => $settings, 'result' => $result_image, 'total_products' => $total_products));
});

$app->get('/proyecto/{id_proyecto}', function ($request, $response, $args) {
    global $settings, $total_products;

    require_once __CONTROLLER__ . 'CProjectsController.class.inc.php';
    require_once __CONTROLLER__ . 'CImagesController.class.inc.php';

    $result = Projects::singleton()->getById($args);

    if (!$result) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }

    $result_images = Projects::singleton()->getImagesById($args['id_proyecto']);

    return $this->view->render($response, 'project.twig', array('settings' => $settings, 'total_products' => $total_products, 'result' => $result, 'result_images' => $result_images));
});

$app->get('/quienes-somos', function ($request, $response, $args) {
    global $settings, $total_products;

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
    global $settings, $total_products;

    if ($total_products == 0) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }

    $result = Cart::singleton()->getAll();

    return $this->view->render($response, 'cart.twig', array('settings' => $settings, 'result' => $result['result_all'], 'total' => $result['total'], 'total_products' => $total_products));
});

$app->get('/registro', function ($request, $response, $args) {
    global $settings, $total_products;

    return $this->view->render($response, 'register.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/terminos-condiciones', function ($request, $response, $args) {
    global $settings, $total_products;

    return $this->view->render($response, 'terms_conditions.twig', array('settings' => $settings, 'total_products' => $total_products));
})->add(new CAuth());

$app->get('/pago', function ($request, $response, $args) {
    global $settings, $total_products;

    return $this->view->render($response, 'paypal.twig', array('settings' => $settings, 'total_products' => $total_products));
})->add(new CAuth());

$app->get('/contacto', function ($request, $response, $args) {
    global $settings, $total_products;

    return $this->view->render($response, 'contact.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/login', function ($request, $response, $args) {
    global $settings, $total_products;

    return $this->view->render($response, 'login.twig', array('settings' => $settings, 'total_products' => $total_products));
});

$app->get('/buscar', function ($request, $response, $args) {
    global $settings, $total_products;

    require_once __CONTROLLER__ . 'CProductsController.class.inc.php';
    require_once __CONTROLLER__ . 'CCategoriesController.class.inc.php';
    require_once __CONTROLLER__ . 'CBrandsController.class.inc.php';
    require_once __CONTROLLER__ . 'CSearchController.class.inc.php';
    require_once __CONTROLLER__ . 'CImagesController.class.inc.php';

    $result_brands = Brands::singleton()->getAll();
    $result_categories = Categories::singleton()->getAll();

    $result = array();
    $params = $request->getQueryParams();

    $q = $params['q'];
    $result = Search::singleton()->getProductsbyQuery($q);
    $result_image = Images::singleton()->getProductsUrl($result);

    return $this->view->render($response, 'search.twig', array('settings' => $settings, 'result' => $result_image, 'result_brands' => $result_brands, 'result_categories' => $result_categories, 'total_products' => $total_products, 'q' => $q));
});

$app->get('/confirmar-oxxo', function ($request, $response, $args) {
    global $settings, $total_products;

    require_once __CONTROLLER__ . 'CPaymentOxxoController.class.inc.php';
    $result = PaymentOxxo::singleton()->charge();

    $order = json_decode($result, true);

    if ($order['status'] == 404) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN . 'error');
    }

    if (!isset($order['data']['charges']['data'][0]['payment_method']['reference']) || !isset($order['data']['amount']) || !isset($order['data']['currency'])) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN . 'error');
    }

    $reference = $order['data']['charges']['data'][0]['payment_method']['reference'];
    $amount = number_format($order['data']['amount'] / 100, 2);
    $currency = $order['data']['currency'];

    PaymentOxxo::singleton()->saveTransaction($reference);

    return $this->view->render($response, 'receipt_oxxo.twig', array('settings' => $settings, 'total_products' => $total_products, 'reference' => $reference, 'amount' => $amount, 'currency' => $currency));
});

$app->get('/destroy-session', function ($request, $response, $args) {
    global $settings;
    Session::singleton()->destroy();
});

$app->get('/error', function ($request, $response, $args) {
    global $settings, $total_products;
    return $this->view->render($response, 'error.twig', array('settings' => $settings, 'total_products' => $total_products));
});