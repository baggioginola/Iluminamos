<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 16/ene/2017
 * Time: 21:13
 */
require_once __CONTROLLER__ . 'CBaseController.class.inc.php';
require_once __CONTROLLER__ . 'CCartProductsController.class.inc.php';

require_once __MODEL__ . 'CCartModel.class.inc.php';

class Cart extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $validParameters = array(
        'id_producto' => TYPE_INT
    );

    /**
     * @return Cart|null
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    public function getAllProducts()
    {
        $session_id = session_id();
        if (!$result = CartModel::singleton()->getBySessionId($session_id)) {
            return false;
        }

        if (!$result_cart = $this->getById($result['id_cart'])) {
            return false;
        }

        $total_products = 0;
        foreach ($result_cart as $key) {
            foreach ($key as $value => $result) {
                $row_array[$value] = $result;
            }
            $total_products = $total_products + $row_array['numero_productos'];
        }

        return $total_products;
    }
    /**
     * @return string
     */
    public function getAll()
    {
        $session_id = session_id();
        if (!$result = CartModel::singleton()->getBySessionId($session_id)) {
            return false;
        }

        if (!$result_cart = $this->getById($result['id_cart'])) {
            return false;
        }

        $row_array = array();
        $result_all = array();
        $i = 0;
        $total = 0;
        foreach ($result_cart as $key) {
            foreach ($key as $value => $result) {
                $row_array[$value] = $result;
            }
            $total = $total + $this->getTotal($row_array);
            $result_all[$i]['id_producto'] = $row_array['id_producto'];
            $result_all[$i]['nombre'] = $row_array['nombre'];
            $result_all[$i]['numero_productos'] = $row_array['numero_productos'];
            $result_all[$i]['precio_total'] = number_format($this->getTotal($row_array), 2);
            $result_all[$i]['precio'] = number_format($this->getPrice($row_array), 2);
            $i++;
        }

        $result_array = array('result_all' => $result_all, 'total' => number_format($total, 2));
        return $result_array;
    }

    /**
     * @return string
     */
    public function add()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $session_id = session_id();
        $id = null;

        if (!$result = CartModel::singleton()->getBySessionId($session_id)) {
            if (!$this->parameters['id_cart'] = CartModel::singleton()->add(array('variable_sesion' => $session_id, 'fecha' => date('Y-m-d H:i:s')))) {
                return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
            }
        } else {
            $this->parameters['id_cart'] = $result['id_cart'];
        }

        if (!CartProducts::singleton()->add($this->parameters)) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!$result_cart = $this->getById($this->parameters['id_cart'])) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $row_array = array();
        $total = 0;
        $total_products = 0;

        foreach ($result_cart as $key) {
            foreach ($key as $value => $result) {
                $row_array[$value] = $result;
            }
            $total = $total + $this->getTotal($row_array);
            $total_products = $total_products + $row_array['numero_productos'];
        }

        $result_total = array();
        $result_total['total'] = number_format($total, 2);
        $result_total['total_products'] = $total_products;

        return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $result_total));
    }

    private function getTotal($array = array())
    {
        if (!$array) {
            return false;
        }

        $total = $array['total'] * $array['tipo_cambio'];
        $total = $total - ($total * ($array['descuento'] / 100));
        $total = $total + ($total * $array['iva']);

        return $total;
    }

    private function getPrice($array = array())
    {
        if (!$array) {
            return false;
        }

        $total = $array['precio'] * $array['tipo_cambio'];
        $total = $total - ($total * ($array['descuento'] / 100));
        $total = $total + ($total * $array['iva']);

        return $total;
    }

    /**
     * @return string
     */
    private function getById($id = null)
    {
        if (is_null($id)) {
            return false;
        }

        $result = CartModel::singleton()->getById($id);

        return $result;
    }

    /**
     * @return bool
     */
    private function _setParameters()
    {
        if (!isset($_POST) || empty($_POST)) {
            return false;
        }

        if (!$this->validateParameters($_POST, $this->validParameters)) {
            return false;
        }

        foreach ($_POST as $key => $value) {
            $this->parameters[$key] = $value;
        }

        return true;
    }
}