<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 28/ene/2017
 * Time: 20:23
 */
require_once CLASSES . 'CDatabase.class.inc.php';

class LikesProductsModel extends Database
{
    private static $object = null;
    private static $table = 'likes_productos';

    /**
     * @return LikesProductsModel|null
     */
    public static function singleton()
    {
        if(is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    /**
     * @param array $data
     * @return bool|int|string
     */
    public function add($data = array())
    {
        if (empty($data)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        if (!$this->insert($data, self::$table)) {
            return false;
        }

        $this->close_connection();

        return true;
    }

    public function getByIdProduct($id_likes = '', $id_products = '')
    {
        if (empty($id_likes) || empty($id_products)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT id FROM " . self::$table . " WHERE id_likes = '" . $id_likes . "' AND id_producto = '" . $id_products . "' ";

        if (!$result = $this->query($query)) {
            return false;
        }

        $this->close_connection();

        while ($row = $this->fetch_assoc($result)) {
            $result_array = $row;
        }

        return $result_array;
    }

}