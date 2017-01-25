<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 19/ene/2017
 * Time: 21:48
 */

require_once __CONTROLLER__ . 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CRegisterModel.class.inc.php';

class Register extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $log = array();

    private $validParameters = array(
        'nombre' => TYPE_ALPHA,
        'apellidos' => TYPE_ALPHA,
        'e_mail' => TYPE_ALPHA,
        'password' => TYPE_PASSWORD,
        'direccion' => TYPE_ALPHA,
        'codigo_postal' => TYPE_ALPHA,
        'estado' => TYPE_ALPHA,
        'ciudad' => TYPE_ALPHA,
        'telefono' => TYPE_ALPHA,
        'celular' => TYPE_ALPHA
    );

    /**
     * @return null|Register
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
    public function add()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!RegisterModel::singleton()->add($this->parameters)) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        return json_encode($this->getResponse());
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
            $this->parameters[$key] = utf8_decode($value);
        }
        $this->parameters['fecha_alta'] = date('Y-m-d H:i:s');
        return true;
    }
}