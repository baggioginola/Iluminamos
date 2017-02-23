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

require_once FRAMEWORK . 'conekta-php-master/lib/Conekta.php';

class PaymentOxxo extends BaseController
{
    private static $object = null;
    private $key = 'key_Shvr6xXR7HCvU24kYno8kA';
    private $line_items = array();
    private $currency = '';
    private $customer_info = array();
    private $charges = array();
    private $tax_lines = array();

    /**
     * @return PaymentOxxo|null
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    private function _setKey()
    {
        \Conekta\Conekta::setApiKey($this->key);
        \Conekta\Conekta::setApiVersion("2.0.0");
    }

    public function charge()
    {
        $this->_setKey();

        $session_id = session_id();
        if (!$result = CartModel::singleton()->getBySessionId($session_id)) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }
        if (!$result_cart = $this->getCartById($result['id_cart'])) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }

        $this->setCurrency();

        $this->setCharges();

        if (!$this->setLineItems($result_cart)) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }

        if (!$this->setTaxLines($result_cart)) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }

        if (!$this->setCustomerInfo()) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }

        try {
            $order = \Conekta\Order::create(
                array(
                    "line_items" => $this->line_items,
                    "tax_lines" => $this->tax_lines,
                    "currency" => $this->currency,
                    "customer_info" => $this->customer_info,
                    "charges" => $this->charges
                )
            );
        } catch (\Conekta\Error $e) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, $e->getMessage()));
        }

        return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $order));
    }

    public function saveTransaction($reference_code = null)
    {
        if (is_null($reference_code)) {
            return false;
        }

        $session_id = session_id();
        if (!$result = CartModel::singleton()->getBySessionId($session_id)) {
            return false;
        }


        if (!$user_info = Session::singleton()->getCustomerInfo()) {
            return false;
        }

        $result['reference_code'] = $reference_code;
        $result['email'] = $user_info['e_mail'];

        if (!PaymentOxxoModel::singleton()->add($result)) {
            return false;
        }
        return true;
    }

    private function setLineItems($array = array())
    {
        if (!$array) {
            return false;
        }

        $line_items_array = array();

        foreach ($array as $key) {

            $line_items_array['name'] = $key['codigo_interno'];
            $line_items_array['unit_price'] = getPrice($key) * 100;
            $line_items_array['quantity'] = $key['numero_productos'];

            $this->line_items[] = $line_items_array;
        }
        return true;
    }

    private function setTaxLines($array = array())
    {
        if (!$array) {
            return false;
        }

        $tax_items_array = array();

        foreach ($array as $key) {
            $tax_items_array['description'] = 'IVA';
            $price = number_format(getPrice($key) * $key['iva'], 2, '.', '');

            $tax_items_array['amount'] = $price * $key['numero_productos'] * 100;

            $this->tax_lines[] = $tax_items_array;
        }
        return true;
    }

    private function setCustomerInfo()
    {
        if (!$result = Session::singleton()->getCustomerInfo()) {
            return false;
        }

        if (strlen(trim($result['phone'])) < 10) {
            $result['phone'] = '+5212224160811';
        } else {
            $result['phone'] = '+521' . trim($result['phone']);
        }
        $this->customer_info = array(
            'name' => $result['name'] . " " . $result['last_name'],
            'email' => $result['e_mail'],
            'phone' => $result['phone'] . ''
        );

        return true;
    }

    /**
     * @return string
     */
    private function getCartById($id = null)
    {
        if (is_null($id)) {
            return false;
        }

        $result = CartModel::singleton()->getById($id);

        return $result;
    }

    private function setCurrency()
    {
        $this->currency = 'MXN';
    }

    private function setCharges()
    {
        $this->charges = array(
            array(
                "payment_method" => array(
                    "type" => "oxxo_cash"
                )
            ));
    }
}