<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 15/ene/2017
 * Time: 18:58
 */
require_once __CONTROLLER__ . 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CSearchModel.class.inc.php';

class Search extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $validParameters = array(
        'category' => TYPE_INT,
        'brand' => TYPE_INT,
        'price' => TYPE_INT
    );

    private $prices = array(
        1 => array(0 => 0, 1 => 5000),
        2 => array(0 => 5000, 1 => 10000),
        3 => array(0 => 10000, 1 => 20000),
        4 => array(0 => 20000, 1 => 30000),
        5 => array(0 => 30000, 1 => 40000),
        6 => array(0 => 40000, 1 => 50000),
        7 => array(0 => 50000, 1 => 60000),
        8 => array(0 => 60000, 1 => 70000),
        9 => array(0 => 70000, 1 => 80000),
        10 => array(0 => 8000, 1 => 90000),
        11 => array(0 => 90000, 1 => 100000)
    );

    /**
     * @return null|Search
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    /**
     * @return string
     */
    public function getProducts()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }

        $category = null;
        $brand = null;
        $price = null;

        if (isset($this->parameters['category'])) {
            $category = $this->parameters['category'];
        }

        if (isset($this->parameters['brand'])) {
            $brand = $this->parameters['brand'];
        }

        if (isset($this->parameters['price'])) {
            $price = $this->parameters['price'];
        }

        if (!$result = SearchModel::singleton()->getProducts($category, $brand)) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }

        $row_array = array();
        $result_all = array();
        $i = 0;

        foreach ($result as $key) {
            foreach ($key as $value => $result) {
                $row_array[$value] = $result;
            }
            if (!is_null($price)) {
                $total = $this->getPrice($row_array);
                if (!($total >= $this->prices[$price][0] && $total < $this->prices[$price][1])) {
                    continue;
                }
            }
            $result_all[$i]['id_producto'] = $row_array['id_producto'];
            $result_all[$i]['nombre'] = $row_array['nombre'];
            $i++;
        }

        if (!$result_all) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }
        return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $this->UTF8Converter($result_all)));
    }

    /**
     * @param array $array
     * @return bool
     */
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