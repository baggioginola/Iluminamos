<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 16/feb/2017
 * Time: 20:36
 */

require_once __CONTROLLER__ . 'CBaseController.class.inc.php';
require_once __CONTROLLER__ . 'CCartProductsController.class.inc.php';
require_once __MODEL__ . 'CCartModel.class.inc.php';
require_once __MODEL__ . 'CPaymentOxxoModel.class.inc.php';
require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

class NotificationOxxo extends BaseController
{
    private static $object = null;

    /**
     * @return NotificationOxxo|null
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    public function getTransaction($reference_code = null)
    {
        if (is_null($reference_code)) {
            return false;
        }

        if (!$result_transaction = PaymentOxxoModel::singleton()->getTransaction($reference_code)) {
            return false;
        }

        if (!$result = CartModel::singleton()->getById($result_transaction['id_cart'])) {
            return false;
        }


        foreach($result as $key){
            $id_producto = $key['id_producto'];
            $numero_productos = $key['numero_productos'];

            Products::singleton()->updateSales($id_producto, $numero_productos);
        }

        return array('result_transaction' => $result_transaction, 'result_cart' => $result);
    }
}