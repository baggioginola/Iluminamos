<?php
/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 5/12/2016
 * Time: 9:53 AM
 */
require_once CLASSES . 'CDatabase.class.inc.php';

class ReportssModel extends Database
{
    private static $object = null;

    /**
     * @return null|ReportssModel
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    /**
     * @return array|bool
     */
    public function getProductLikes()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT nombre,likes FROM productos WHERE status = true ORDER BY likes DESC LIMIT 10;";

        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
    }
}