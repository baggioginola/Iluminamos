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
        'id' => TYPE_INT,
        'id_categoria' => TYPE_INT,
        'nombre' => TYPE_ALPHA,
        'active' => TYPE_INT,
        'imagenes' => TYPE_ALPHA,
        'descripcion' => TYPE_ALPHA,
        'precio' => TYPE_FLOAT,
        'especificaciones' => TYPE_ALPHA,
        'key_nombre' => TYPE_ALPHA

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
        if($result = ProductsModel::singleton()->getAll()) {
            return $result;
            #return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $result));
        }
        return false;
        #return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
    }

    /**
     * @return string
     */
    public function getById()
    {
        /*
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }
        */

        if($result = ProductsModel::singleton()->getById(2)) {
            #return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $result));
            return $result;
        }
        return false;
        #return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
    }

    /**
     * @return string
     */
    public function getByCategory()
    {
        if(!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        Logs::singleton()->setLog($this->parameters,__METHOD__,__LINE__);

        if($result = ProductsModel::singleton()->getByCategory($this->parameters['id_categoria'])) {
            return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $result));
        }
        return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
    }

    /**
     * @return string
     */
    public function getByName()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if($result = ProductsModel::singleton()->getByName($this->parameters['key_nombre'], $this->parameters['id_categoria'])) {
            return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS, $result));
        }

        return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
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

    public function __destruct()
    {

    }
}