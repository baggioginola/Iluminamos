<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 15/ene/2017
 * Time: 14:54
 */

require_once 'CBaseController.class.inc.php';
require_once __MODEL__ . 'CBannerModel.class.inc.php';
require_once __CONTROLLER__ . 'CImagesController.class.inc.php';

class Banner extends BaseController
{
    private static $object = null;

    private $parameters = array();


    /**
     * @return Banner|null
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
    public function getMain()
    {
        $result = BannerModel::singleton()->getMain();

        $result_images = Images::singleton()->getBannerMainUrl($result['numero_imagenes']);

        return $result_images;
    }

    public function getTop()
    {
        $result = BannerModel::singleton()->getTop();

        $result_images = Images::singleton()->getBannerTopUrl($result['numero_imagenes']);

        return $result_images;
    }
}