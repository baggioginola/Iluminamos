<?php
/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 7/8/2016
 * Time: 4:33 PM
 */

require_once 'CBaseController.class.inc.php';
require_once CLASSES . 'CDir.class.inc.php';
require_once CLASSES . 'CFile.class.inc.php';

class Images extends BaseController
{
    public static $object = null;

    private $parameters = array();

    private $sizes = array(
        'categorias' => array('0' => array('width' => 285, 'height' => 210),
            '1' => array('width' => 350, 'height' => 291)),
        'productos' => array('0' => array('width' => 640, 'height' => 530),
            '1' => array('width' => 640, 'height' => 530),
            '2' => array('width' => 640, 'height' => 530),
            '3' => array('width' => 640, 'height' => 530),
            '4' => array('width' => 640, 'height' => 530),
            '5' => array('width' => 640, 'height' => 530)
        ),
        'proyectos' => array('0' => array('width' => 1245, 'height' => 830),
            '1' => array('width' => 1245, 'height' => 830),
            '2' => array('width' => 1245, 'height' => 830),
            '3' => array('width' => 1245, 'height' => 830),
            '4' => array('width' => 1245, 'height' => 830),
            '5' => array('width' => 1245, 'height' => 830)
        )
    );

    private $num_images;
    private $tmp_name = 'tmpImage';
    private $name = '';

    /**
     * @return Images|null
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
        if (!CDir::singleton()->setDir()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!$this->setName()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!$this->setNumImages()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!$this->upload()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        return json_encode($this->getResponse());
    }

    private function setNumImages()
    {
        if (!isset($_REQUEST['num_imagenes']) || empty($_REQUEST['num_imagenes'])) {
            return false;
        }

        $this->num_images = $_REQUEST['num_imagenes'];

        return true;
    }

    private function setName()
    {
        if (!isset($_REQUEST['name']) || empty($_REQUEST['name'])) {
            return false;
        }

        $this->name = $_REQUEST['name'];

        return true;
    }

    /**
     * @return string
     */
    public function edit()
    {
        if (!$this->setName()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!CDir::singleton()->edit($this->name)) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!$this->upload()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        return json_encode($this->getResponse());
    }

    public function rename()
    {
        if (!isset($_POST) || empty($_POST)) {
            return false;
        }

        if (!CDir::singleton()->setDir()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $name = $_POST['name'];

        CFile::singleton()->rename(CDir::singleton()->getDir(), $name);
        return json_encode($this->getResponse());
    }

    /**
     * @return bool
     */
    private function upload()
    {
        if (empty($this->parameters)) {
            return false;
        }

        $dir = CDir::singleton()->getDir();

        ini_set('memory_limit', 20000000000);
        foreach ($this->parameters as $parameter => $value) {
            if (!move_uploaded_file($this->parameters[$parameter]['tmp_name'], $dir . $this->parameters[$parameter]['name'])) {
                return false;
            }
            chmod($dir . $this->parameters[$parameter]['name'], 0777);
        }

        $type = CDir::singleton()->_getType();
        foreach ($this->parameters as $parameter => $value) {
            resizeImage($dir . $this->parameters[$parameter]['name'], $this->sizes[$type][$parameter]['height'], $this->sizes[$type][$parameter]['width'], $this->parameters[$parameter]['extension']);
        }

        ini_restore('memory_limit');

        return true;
    }

    /**
     * @return bool
     */
    private function _setParameters()
    {
        if (!isset($_FILES) || empty($_FILES)) {
            return false;
        }

        $i = 1;
        foreach ($_FILES as $key => $value) {
            foreach ($value as $item => $val) {
                foreach ($val as $tmp => $name) {
                    if ($item == 'name') {
                        $ext = explode(".", $name);
                        $lastElement = sizeof($ext);

                        if($i == 1){
                            $name = $this->name . "." . strtolower($ext[$lastElement - 1]);
                        }
                        else{
                            $name = $this->name . "_" . $i . "." . strtolower($ext[$lastElement - 1]);
                        }
                        $this->parameters[$i]['extension'] = strtolower($ext[$lastElement - 1]);
                    }
                    $this->parameters[$i][$item] = $name;
                    $i++;
                }
                $i = 1;
            }
        }
        return true;
    }
}