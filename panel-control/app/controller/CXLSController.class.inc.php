<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 12/feb/2017
 * Time: 11:49
 */

require_once __CONTROLLER__ . 'CBaseController.class.inc.php';
require_once __CONTROLLER__ . 'CProductsController.class.inc.php';

class XLS extends BaseController
{
    private $file = '';
    private $objReader = null;
    private $excelReader = null;
    private $workSheet = null;
    private static $object = null;
    private $dir = null;


    private $parameters = array(
        'codigo_interno' => 'CLAVE',
        'descripcion' => 'DESCRIPCION',
        'precio_compra' => 'PRECIO COMPRA',
        'precio' => 'PRECIO 1',
        'moneda' => 'MONEDA',
        'clave_alterna' => 'CLAVE ALTERNA',
        'departamento' => 'DEPARTAMENTO'
    );

    private $param = array();

    private function setDir()
    {
        $this->dir = FILES;
    }

    /**
     * @return null|XLS
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    public function read()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $this->setDir();

        if (!$this->upload()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!$this->setReader()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $this->loadFile();

        $this->setWorkSheet();

        $this->addData();

        return json_encode($this->getResponse());
    }

    private function setReader()
    {
        if ($this->file == '') {
            return false;
        }

        $inputFileType = PHPExcel_IOFactory::identify($this->file);
        $this->objReader = PHPExcel_IOFactory::createReader($inputFileType);
        $this->objReader->setReadDataOnly(true);

        return true;
    }

    private function loadFile()
    {
        $this->excelReader = $this->objReader->load($this->file);
    }

    private function setWorkSheet()
    {
        $this->workSheet = $this->excelReader->getSheet(0)->toArray();
    }

    private function addData()
    {
        $i = 0;
        $j = 0;
        $parameters = array();

        foreach ($this->workSheet as $key => $value) {
            foreach ($value as $name) {
                if ($i != 0) {
                    $title = $this->workSheet[0][$j];
                    if (in_array($title, $this->parameters)) {
                        $array_key = array_search($title, $this->parameters);
                        if($array_key === 'precio' || $array_key === 'precio_compra'){
                            if (!preg_match(getRegularExpresion(TYPE_FLOAT),$name)){
                                $name = 0;
                            }
                            $parameters[$array_key] = number_format($name,2,'.','');
                        }
                        else {
                            $parameters[$array_key] = $name;
                        }
                    }
                }
                $j++;
            }
            if ($i != 0 && $parameters) {
                if (isset($parameters['codigo_interno'])) {
                    if ($result = Products::singleton()->getByCodigoInterno($parameters['codigo_interno'])) {
                        $parameters['id_producto'] = $result['id_producto'];
                        Products::singleton()->editXLS($parameters);
                    } else {
                        Products::singleton()->addXLS($parameters);
                    }
                } else {
                    Products::singleton()->addXLS($parameters);
                }
            }
            $j = 0;
            $i++;
            $parameters = array();
        }
    }

    private function upload()
    {
        if (empty($this->param)) {
            return false;
        }

        ini_set('memory_limit', 20000000000);

        if (!move_uploaded_file($this->param['files']['tmp_name'][0], $this->dir . $this->param['files']['name'][0])) {
            return false;
        }
        chmod($this->dir . $this->param['files']['name'][0], 0777);

        $this->file = $this->dir . $this->param['files']['name'][0];

        ini_restore('memory_limit');

        return true;
    }

    private function _setParameters()
    {
        if (!isset($_FILES) || empty($_FILES)) {
            return false;
        }

        foreach ($_FILES as $key => $value) {
            $this->param[$key] = $value;
        }

        return true;
    }
}