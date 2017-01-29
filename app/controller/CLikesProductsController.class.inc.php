<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 28/ene/2017
 * Time: 20:22
 */
require_once __CONTROLLER__ . 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CLikesProductsModel.class.inc.php';
class LikesProducts extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $validParameters = array(
        'id_likes' => TYPE_INT,
        'id_producto' => TYPE_INT
    );

    /**
     * @return LikesProducts|null
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
    public function add($parameters)
    {
        if (!$this->_setParameters($parameters)) {
            return false;
        }

        if (!$result = LikesProductsModel::singleton()->add($this->parameters)) {
            return false;
        }

        return true;
    }

    public function getByIdProduct($id_likes = '', $id_product = '')
    {
        if(empty($id_likes) || empty($id_product)) {
            return false;
        }

        if (!$result = LikesProductsModel::singleton()->getByIdProduct($id_likes, $id_product)) {
            return false;
        }

        return true;
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
}