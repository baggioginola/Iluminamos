<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 15/ene/2017
 * Time: 18:47
 */
$app->group('/search', function () use($app) {
    $app->post('/products', function() use($app){
        require_once __CONTROLLER__.'CSearchController.class.inc.php';
        $result = Search::singleton()->getProducts();
        echo $result;
    });
});

$app->group('/cart', function () use($app) {
    $app->post('/add', function() use($app){
        require_once __CONTROLLER__.'CCartController.class.inc.php';
        $result = Cart::singleton()->add();
        echo $result;
    });
});

$app->group('/register', function () use($app) {
    $app->post('/add', function() use($app){
        require_once __CONTROLLER__.'CRegisterController.class.inc.php';
        $result = Register::singleton()->add();
        echo $result;
    });
});

$app->group('/paypal', function () use($app) {
    $app->post('/pay', function() use($app){
        require_once __CONTROLLER__. 'CPaypalController.class.inc.php';
        $result = Paypal::singleton()->pay();
        echo print_r($result, 1);
    });
});