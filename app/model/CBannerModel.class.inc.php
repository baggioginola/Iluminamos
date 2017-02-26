<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 15/ene/2017
 * Time: 14:55
 */

require_once CLASSES . 'CDatabase.class.inc.php';

class BannerModel extends Database
{
    private static $object = null;
    private static $table = 'banner_inicio';

    public static function singleton()
    {
        if(is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    /**
     * @return array|bool
     */
    public function getMain()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT id_banner_inicio,numero_imagenes FROM " . self::$table . " WHERE id_banner_inicio = 1";

        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array = $row;
        }

        return $result_array;
    }

    public function getTop()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT id_banner_inicio,numero_imagenes FROM " . self::$table . " WHERE id_banner_inicio = 2";

        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array = $row;
        }

        return $result_array;
    }
}