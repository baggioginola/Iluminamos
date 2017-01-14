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

        $query = "SELECT key_nombre,nombre FROM " . self::$table . " WHERE active = true and id != 4";

        $log[] = $query;

        Logs::singleton()->setLog($log,__METHOD__,__LINE__);

        if (!$result = $this->query($query)) {
            Logs::singleton()->addLogs('Categories');
            return false;
        }
        Logs::singleton()->addLogs('Categories');

        while ($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
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

    public function getByName($name = '')
    {
        if (empty($name)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT id,nombre, nombre_descripcion, key_nombre, descripcion FROM " . self::$table . " WHERE key_nombre = '" . $name . "' and active = true";

        if (!$result = $this->query($query)) {
            return false;
        }

        $this->close_connection();

        while ($row = $this->fetch_assoc($result)) {
            $result_array = $row;
        }

        return $result_array;
    }

    /**
     * @param array $data
     * @return bool|int|string
     */
    public function edit($data = array(), $id = '')
    {
        if (empty($data) || empty($id)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        if (!$result = $this->update($data, $id, self::$table)) {
            return false;
        }

        $this->close_connection();

        return $result;
    }
}