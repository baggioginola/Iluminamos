<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 15/ene/2017
 * Time: 14:54
 */

require_once 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CBrandsModel.class.inc.php';

class Brands extends BaseController
{
    private static $object = null;

    private $parameters = array();
    private static $type = 'categorias';
    private $validParameters = array(
        'id_marca' => TYPE_INT
    );

    /**
     * @return Brands|null
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
        $result = BrandsModel::singleton()->getAll();
        return $result;
    }

    /**
     * @return string
     */
    public function getById($parameters)
    {
        if (!$this->_setParameters($parameters)) {
            return false;
        }

        if($result = BrandsModel::singleton()->getById($this->parameters['id_marca'])) {
            return $result;
        }

        return false;
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