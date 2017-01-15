<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 15/ene/2017
 * Time: 11:30
 */

require_once CLASSES . 'CDatabase.class.inc.php';

class ProjectsModel extends Database
{
    private static $object = null;
    private static $table = 'casos_exito';

    /**
     * @return null|ProjectsModel
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
    public function getAll()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT " . self::$table . ".id_caso_exito, " . self::$table . ".titulo, " .self::$table . ".subtitulo,
         " . self::$table . ".contenido
         FROM " . self::$table . " WHERE " . self::$table . ".status = true;";

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

        $query = "SELECT " . self::$table . ".id_producto, " . self::$table . ".id_categoria, " . self::$table . ".nombre, 
        " . self::$table . ".descripcion,
        " . self::$table . ".detalles_tecnicos, " . self::$table . ".precio, " . self::$table . ".moneda, 
        " . self::$table . ".codigo_interno, categorias.nombre as categoria, marcas.nombre as marca
            FROM  " . self::$table . " 
            INNER JOIN categorias
             ON " . self::$table . ".id_categoria = categorias.id_categoria
             INNER JOIN marcas
             ON " . self::$table . ".id_marca = marcas.id_marca
            WHERE id_producto = '" . $id . "' and " . self::$table . ".STATUS = true;";

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

        $query = "SELECT " . self::$table . " . id, " . self::$table . " . nombre, " . self::$table . " . key_nombre, " . self::$table . " . imagenes,
                    " .self::$table . " . descripcion, " . self::$table . " . especificaciones, " . self::$table . " . precio, categoria . key_nombre as categoria
                    FROM " . self::$table . "
                    INNER JOIN categoria on " . self::$table . " . id_categoria = categoria . id
                    WHERE producto . key_nombre = '" . $name . "' and producto . active = true and categoria . id = " .$id_category;

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

        $query = "SELECT " . self::$table . " . nombre, " . self::$table . " . id_producto
                    FROM " . self::$table . "
                    INNER JOIN categorias ON " . self::$table . " . id_categoria = categorias . id_categoria
                    WHERE categorias . id_categoria = " . $id_category . " AND " . self::$table . " . status = true";

        if (!$result = $this->query($query)) {
            return false;
        }

        $this->close_connection();

        while($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
    }
}