<?php
/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 5/12/2016
 * Time: 9:53 AM
 */
require_once CLASSES . 'CDatabase.class.inc.php';

class BrandsModel extends Database
{
    private static $object = null;
    private static $table = 'marcas';
    private static $key = 'id_marca';

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
    public function getAll()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT id_marca,nombre,descuento FROM " . self::$table . " WHERE status = true";

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

        $query = "SELECT id_marca,nombre,descuento FROM " . self::$table . " WHERE id_marca = '" . $id . "' ";

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

        $name = stripExcessWhitespace(sanitizeVariable(trim($name)));

        $array_name = UTF8Converter(array($name));

        echo print_r($array_name,1);
        $query = "SELECT id_marca,nombre,descuento FROM " . self::$table . " WHERE nombre LIKE '%" . $array_name[0] . "%';";

        echo $query . "\n";
        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array = $row;
        }

        $this->close_connection();

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

        $user_id = $this->getLastId();

        $this->close_connection();

        return $user_id;
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

        if (!$result = $this->update($data, $id, self::$table, self::$key)) {
            return false;
        }

        $this->close_connection();

        return $result;
    }
}