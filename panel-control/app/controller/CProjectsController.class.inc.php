<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 01/feb/2017
 * Time: 20:20
 */
require_once __CONTROLLER__ . 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CProjectsModel.class.inc.php';

class Projects extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $log = array();

    private $validParameters = array(
        'id_caso_exito' => TYPE_INT,
        'titulo' => TYPE_ALPHA,
        'subtitulo' => TYPE_ALPHA,
        'contenido' => TYPE_ALPHA,
        'status' => TYPE_INT,
        'fecha_alta' => TYPE_DATE,
        'fecha_modifica' => TYPE_DATE,
        'fecha' => TYPE_ALPHA,
        'usuario_alta' => TYPE_INT,
        'usuario_modifica' => TYPE_INT,
        'num_imagenes' => TYPE_INT
    );

    /**
     * @return null|Projects
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
        if (!$result = ProjectsModel::singleton()->getAll()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }
        return json_encode(UTF8Converter($result));
    }

    /**
     * @return string
     */
    public function getById()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $result = ProjectsModel::singleton()->getById($this->parameters['id_caso_exito']);

        return json_encode(UTF8Converter($result));
    }

    /**
     * @return string
     */
    public function add()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }


        $this->parameters['status'] = 1;
        $this->parameters['fecha_alta'] = date('Y-m-d H:i:s');
        $this->parameters['fecha_modifica'] = date('Y-m-d H:i:s');

        if (!ProjectsModel::singleton()->add($this->parameters)) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        return json_encode($this->getResponse());
    }

    /**
     * @return string
     */
    public function edit()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $id = $this->parameters['id_caso_exito'];

        unset($this->parameters['id_caso_exito']);

        $this->parameters['fecha_modifica'] = 'Y-m-d H:i:s';
        if (!ProjectsModel::singleton()->edit($this->parameters, $id)) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        return json_encode($this->getResponse());
    }

    /**
     * @return string
     */
    public function delete()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $id = $this->parameters['id_caso_exito'];

        unset($this->parameters['id_caso_exito']);

        if (!ProjectsModel::singleton()->edit($this->parameters, $id)) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        return json_encode($this->getResponse());
    }

    public function addFakeData($data)
    {
        foreach ($data as $key => $value) {
            $this->parameters[$key] = $value;
        }

        $result = ProjectsModel::singleton()->add($this->parameters);

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
            if($key == 'fecha'){
                $this->parameters[$key] = dateInput($value);
            }
            else {
                $this->parameters[$key] = $value;
            }
        }
        return true;
    }
}