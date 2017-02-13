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

    private $parameters = array(
        'codigo_interno' => 'CLAVE',
        'descripcion' => 'DESCRIPCION',
        'precio_compra' => 'PRECIO COMPRA',
        'precio' => 'PRECIO 1',
        'moneda' => 'MONEDA'
    );

    private $param = array();

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
        if(!$this->_setParameters()){
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $this->setFile();

        $this->setReader();

        $this->loadFile();

        $this->setWorkSheet();

        $this->addData();

        return json_encode($this->getResponse());
    }

    private function setReader()
    {
        $inputFileType = PHPExcel_IOFactory::identify($this->file);
        $this->objReader = PHPExcel_IOFactory::createReader($inputFileType);
        $this->objReader->setReadDataOnly(true);
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
                        $parameters[$array_key] = $name;
                    }
                }
                $j++;
            }
            if ($i != 0 && $parameters) {
                $id = Products::singleton()->addXLS($parameters);
            }
            $j = 0;
            $i++;
            $parameters = array();
        }

    }

    private function setFile()
    {
        $this->file = FILES . 'test.xls';
    }

    private function _setParameters()
    {
        if (!isset($_FILES) || empty($_FILES)) {
            return false;
        }

        echo print_r($_FILES,1);

        /*
        if (!$this->validateParameters($_POST, $this->validParameters)) {
            return false;
        }

        foreach ($_POST as $key => $value) {
            $this->parameters[$key] = $value;
        }
        */
        return true;
    }
}