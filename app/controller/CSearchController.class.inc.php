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

        if (!$result = SearchModel::singleton()->getProducts($category, $brand, $price)) {
            return json_encode($this->getResponse(STATUS_FAILURE_CLIENT, MESSAGE_ERROR));
        }

        return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $this->UTF8Converter($result)));

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