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

$app->get('/productos', function ($request, $response, $args) {
    global $settings;
    return $this->view->render($response, 'products.twig', array('settings' => $settings));
});