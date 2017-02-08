<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 30/ene/2017
 * Time: 21:41
 */

$app->get('/', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'main.twig', array('settings' => $settings));
});

$app->get('/usuarios', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'users.twig', array('settings' => $settings));
});

$app->get('/categorias', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'categories.twig', array('settings' => $settings));
});

$app->get('/marcas', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'brands.twig', array('settings' => $settings));
});

$app->get('/productos', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'products.twig', array('settings' => $settings));
});

$app->get('/tipo-cambio', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'change.twig', array('settings' => $settings));
});

$app->get('/proyectos', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'projects.twig', array('settings' => $settings));
});

$app->get('/reportes', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'report.twig', array('settings' => $settings));
});

$app->get('/login', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'login.twig', array('settings' => $settings));
});