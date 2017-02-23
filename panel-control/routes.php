<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 30/ene/2017
 * Time: 21:41
 */
require_once CLASSES . 'CSession.class.inc.php';

$name = Session::singleton()->getName();
$last_name = Session::singleton()->getLastName();

$settings['NAME'] = $name;
$settings['LAST_NAME'] = $last_name;

$app->get('/', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'main.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/usuarios', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'users.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/categorias', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'categories.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/marcas', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'brands.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/productos', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'products.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/tipo-cambio', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'change.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/proyectos', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'projects.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/reportes', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'report.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/archivos', function ($request, $response, $args) {
    global $settings;

    return $this->view->render($response, 'files.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/banner', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'banner.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/banner-top', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'banner_top.twig', array('settings' => $settings));
})->add(new CAuth());

$app->get('/login', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'login.twig', array('settings' => $settings));
});

$app->get('/logout', function ($request, $response, $args) {
    require_once __CONTROLLER__ . 'CLoginController.class.inc.php';

    if (Login::singleton()->logout()) {
        return $response->withStatus(200)->withHeader('Location', DOMAIN);
    }
});