<?php
/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 7/18/2016
 * Time: 5:08 PM
 */
require_once CLASSES . 'CDatabase.class.inc.php';

class ProductsModel extends Database
{
    private static $object = null;
    private static $table = 'productos';

    /**
     * @return null|ProductsModel
     */
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

        $query = "SELECT * FROM " . self::$table . ";";

        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
    }

    /**
     * @param string $id
     * @return array|bool|null
     */
    public function getById($id = '')
    {
        if (empty($id)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT * FROM  " . self::$table . " WHERE id_producto = '" . $id . "' ";

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
     * @param string $name
     * @param string $id_categoy
     * @return array|bool|null
     */
    public function getByName($name = '', $id_category = '')
    {
        if (empty($name) || empty($id_category)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT " . self::$table . ".id, " . self::$table . ".nombre, " . self::$table . ".key_nombre, " . self::$table . ".imagenes,
                    " .self::$table . ".descripcion, " . self::$table . ".especificaciones, " . self::$table . ".precio, categoria.key_nombre as categoria
                    FROM " . self::$table . "
                    INNER JOIN categoria on " . self::$table . ".id_categoria = categoria.id
                    WHERE producto.key_nombre = '" . $name . "' and producto.active = true and categoria.id = " .$id_category;

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
     * @param string $id_category
     * @return array|bool
     */
    public function getByCategory($id_category = '')
    {
        if(empty($id_category)) {
            return false;
        }

        if(!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT " . self::$table . ".nombre, " . self::$table . ".key_nombre as key_nombre, categoria.key_nombre as categoria
                    FROM " . self::$table . "
                    INNER JOIN categoria ON " . self::$table . ".id_categoria = categoria.id
                    WHERE categoria.id = " . $id_category . " AND producto.active = true";

        Logs::singleton()->setLog($query,__METHOD__,__LINE__);
        if (!$result = $this->query($query)) {
            return false;
        }

        $this->close_connection();

        while($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        Logs::singleton()->setLog($result_array,__METHOD__,__LINE__);
        return $result_array;
    }
}