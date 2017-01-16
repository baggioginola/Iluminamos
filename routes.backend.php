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