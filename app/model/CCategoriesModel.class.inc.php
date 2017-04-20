<?php
/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 6/24/2016
 * Time: 4:50 PM
 */
require_once CLASSES . 'CDatabase.class.inc.php';

class CategoriesModel extends Database
{
    private static $object = null;
    private static $table = 'categorias';

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
    public function getAll()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT id_categoria,nombre FROM " . self::$table . " WHERE status = true";

        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
    }

    public function getById($id = '')
    {
        if (empty($id)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT id_categoria,nombre FROM " . self::$table . " WHERE id_categoria = '" . $id . "' ";

        if (!$result = $this->query($query)) {
            return false;
        }

        $this->close_connection();

        while ($row = $this->fetch_assoc($result)) {
            $result_array = $row;
        }

        return $result_array;
    }

    public function getCategoriesById($id = null)
    {
        if (is_null($id)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT id_categoria,nombre FROM " . self::$table . " WHERE id_categoria_padre = '" . $id . "' ";

        if (!$result = $this->query($query)) {
            return false;
        }

        $this->close_connection();

        while ($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
    }
}