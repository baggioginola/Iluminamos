<?php
/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 7/8/2016
 * Time: 4:33 PM
 */

require_once 'CBaseController.class.inc.php';
require_once __CONTROLLER__ . 'CBannerController.class.inc.php';
require_once CLASSES . 'CDir.class.inc.php';
require_once CLASSES . 'CFile.class.inc.php';

class Images extends BaseController
{
    public static $object = null;

    private $parameters = array();

    private $sizes = array(
        'categorias' => array('0' => array('width' => 115, 'height' => 95),
            '1' => array('width' => 115, 'height' => 95)),
        'productos' => array('0' => array('width' => 640, 'height' => 530),
            '1' => array('width' => 640, 'height' => 530),
            '2' => array('width' => 640, 'height' => 530),
            '3' => array('width' => 640, 'height' => 530),
            '4' => array('width' => 640, 'height' => 530),
            '5' => array('width' => 640, 'height' => 530)
        ),
        'proyectos' => array('0' => array('width' => 1200, 'height' => 900),
            '1' => array('width' => 1200, 'height' => 900),
            '2' => array('width' => 1200, 'height' => 900),
            '3' => array('width' => 1200, 'height' => 900),
            '4' => array('width' => 1200, 'height' => 900),
            '5' => array('width' => 1200, 'height' => 900)
        ),
        'banner_big' => array('0' => array('width' => 1200, 'height' => 900),
            '1' => array('width' => 1200, 'height' => 900),
            '2' => array('width' => 1200, 'height' => 900),
            '3' => array('width' => 1200, 'height' => 900),
            '4' => array('width' => 1200, 'height' => 900),
            '5' => array('width' => 1200, 'height' => 900)
        ),
        'banner_top' => array('0' => array('width' => 1200, 'height' => 445),
            '1' => array('width' => 1200, 'height' => 445),
            '2' => array('width' => 1200, 'height' => 445),
            '3' => array('width' => 1200, 'height' => 445),
            '4' => array('width' => 1200, 'height' => 445),
            '5' => array('width' => 1200, 'height' => 600)
        ),
        'banner_brands' => array('0' => array('width' => 1200, 'height' => 445),
            '1' => array('width' => 667, 'height' => 445),
            '2' => array('width' => 667, 'height' => 227),
            '3' => array('width' => 667, 'height' => 227),
            '4' => array('width' => 667, 'height' => 227),
            '5' => array('width' => 667, 'height' => 227),
            '6' => array('width' => 667, 'height' => 227),
            '7' => array('width' => 667, 'height' => 227),
            '8' => array('width' => 667, 'height' => 227),
            '9' => array('width' => 667, 'height' => 227),
            '10' => array('width' => 667, 'height' => 227),
            '11' => array('width' => 667, 'height' => 227),
            '12' => array('width' => 667, 'height' => 227),
            '13' => array('width' => 667, 'height' => 227),
            '14' => array('width' => 667, 'height' => 227),
            '15' => array('width' => 667, 'height' => 227),
            '16' => array('width' => 667, 'height' => 227),
            '17' => array('width' => 667, 'height' => 227),
            '18' => array('width' => 667, 'height' => 227),
            '19' => array('width' => 667, 'height' => 227),
            '20' => array('width' => 667, 'height' => 227),
            '21' => array('width' => 667, 'height' => 227),
            '22' => array('width' => 667, 'height' => 227),
            '23' => array('width' => 667, 'height' => 227),
            '24' => array('width' => 667, 'height' => 227),
            '25' => array('width' => 667, 'height' => 227),
            '26' => array('width' => 667, 'height' => 227),
            '27' => array('width' => 667, 'height' => 227),
            '28' => array('width' => 667, 'height' => 227),
            '29' => array('width' => 667, 'height' => 227),
            '30' => array('width' => 667, 'height' => 227)
        )
    );

    private $num_images;
    private $tmp_name = 'tmpImage';
    private $name = '';
    private $id;

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

        if ($this->getName() == 'banner') {
            if (!$this->setId()) {
                return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
            }
            if (!Banner::singleton()->edit($this->getId(), $this->getNumImages())) {
                return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
            }
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

    private function getNumImages()
    {
        return $this->num_images;
    }

    private function setName()
    {
        if (!isset($_REQUEST['name']) || empty($_REQUEST['name'])) {
            return false;
        }

        $this->name = $_REQUEST['name'];

        return true;
    }

    private function setId()
    {
        if (!isset($_REQUEST['id']) || empty($_REQUEST['id'])) {
            return false;
        }

        $this->id = $_REQUEST['id'];

        return true;
    }

    private function getId()
    {
        return $this->id;
    }

    private function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function edit()
    {
        if (!$this->setName()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!CDir::singleton()->setDir()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        /*
        if (!CDir::singleton()->edit($this->name)) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }
        */

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

                        if ($i == 1) {
                            $name = $this->name . "." . strtolower($ext[$lastElement - 1]);
                        } else {
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