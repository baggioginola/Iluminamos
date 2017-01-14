<?php
/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 7/18/2016
 * Time: 5:02 PM
 */

require_once 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CProductsModel.class.inc.php';

class Products extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $validParameters = array(
        'id_producto' => TYPE_INT,
        'id_categoria' => TYPE_INT,
    );

    /**
     * @return null|Products
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
    public function getAll()
    {
        if ($result = ProductsModel::singleton()->getAll()) {
            return $result;
            #return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $result));
        }
        return false;
        #return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
    }

    /**
     * @return string
     */
    public function getById($parameters)
    {
        if (!$this->_setParameters($parameters)) {
            return false;
        }

        if ($result = ProductsModel::singleton()->getById($this->parameters['id_producto'])) {
            return $result;
        }
        return false;
    }

    /**
     * @return string
     */
    public function getByCategory($parameters)
    {
        if (!$this->_setParameters($parameters)) {
            return false;
        }

        if (!$result = ProductsModel::singleton()->getByCategory($this->parameters['id_categoria'])) {
            return false;
        }

        return $result;
    }

    /**
     * @return string
     */
    public function getByName()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if ($result = ProductsModel::singleton()->getByName($this->parameters['key_nombre'], $this->parameters['id_categoria'])) {
            return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $result));
        }

        return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
    }

    /**
     * @return bool
     */
    private function _setParameters($parameters)
    {
        if (!isset($parameters) || empty($parameters)) {
            return false;
        }

        if (!$this->validateParameters($parameters, $this->validParameters)) {
            return false;
        }

        foreach ($parameters as $key => $value) {
            $this->parameters[$key] = $value;
        }

        return true;
    }

    public function __destruct()
    {

    }
}