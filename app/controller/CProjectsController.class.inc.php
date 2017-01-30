<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 15/ene/2017
 * Time: 11:27
 */

require_once 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CProjectsModel.class.inc.php';

class Projects extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $validParameters = array(
        'id_proyecto' => TYPE_INT
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
        if ($result = ProjectsModel::singleton()->getAll()) {
            return $result;
        }
        return false;
    }

    /**
     * @return string
     */
    public function getById($parameters)
    {
        if (!$this->_setParameters($parameters)) {
            return false;
        }

        if ($result = ProjectsModel::singleton()->getById($this->parameters['id_proyecto'])) {
            return $result;
        }
        return false;
    }

    public function getImagesById($id = '')
    {
        if ($id == '') {
            return false;
        }
        if (!$result = ProjectsModel::singleton()->getById($id)) {
            return false;
        }

        $i = 1;
        $result_images = array();
        $extension = '.jpg';
        for ($i = 1; $i < $result['num_imagenes']; $i++) {
            if ($i == 1) {
                $result_images[$i] = PROJECT_IMG . $id . $extension;
            } else {
                $result_images[$i] = PROJECT_IMG . $id . '_' . $i . $extension;
            }
        }
        return $result_images;
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

    /**
     * @return bool
     */
    private function _setPostParameters()
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