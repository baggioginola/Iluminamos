<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 01/feb/2017
 * Time: 20:20
 */
require_once __CONTROLLER__ . 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CBannerModel.class.inc.php';

class Banner extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $log = array();

    private $validParameters = array(
        'id_caso_exito' => TYPE_INT
    );

    /**
     * @return null|Banner
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
    public function edit($id = null, $num_imagenes = null)
    {
        if (is_null($id) || is_null($num_imagenes)) {
            return false;
        }

        $array = array();
        $array['numero_imagenes'] = $num_imagenes;

        if (!BannerModel::singleton()->edit($array, $id)) {
            return false;
        }

        return true;
    }
}