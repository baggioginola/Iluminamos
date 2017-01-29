<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 28/ene/2017
 * Time: 20:17
 */

require_once CLASSES . 'CDatabase.class.inc.php';

class LikeModel extends Database
{
    private static $object = null;
    private static $table = 'likes';

    /**
     * @return LikeModel|null
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
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

        $id = $this->getLastId();

        $this->close_connection();

        return $id;
    }


    public function getBySessionId($id = '')
    {
        if (empty($id)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT id FROM " . self::$table . " WHERE variable_session = '" . $id . "' ";

        if (!$result = $this->query($query)) {
            return false;
        }

        $this->close_connection();

        while ($row = $this->fetch_assoc($result)) {
            $result_array = $row;
        }

        return $result_array;
    }

    public function delete($id = '')
    {
        if (empty($id)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $where = "id_cart_productos = " . $id;

        if (!$result = $this->remove('cart_productos', $where)) {
            return false;
        }

        $this->close_connection();

        return true;
    }


}