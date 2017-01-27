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
     * @return array|bool
     */
    public function getRandomAll()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT " . self::$table . ".id_producto, " . self::$table . ".nombre,
        categorias.id_categoria
        FROM " . self::$table . "
        INNER JOIN categorias
        ON " . self::$table . ".id_categoria = categorias.id_categoria
        WHERE categorias.id_categoria IN(12, 11, 5, 1, 3, 4)
        AND  " . self::$table . ".status = true
        ORDER BY rand() LIMIT 6;";

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
        " . self::$table . ".codigo_interno, categorias.nombre as categoria, marcas.nombre as marca,
        marcas.descuento,iva, tipo_cambio.moneda, tipo_cambio.tipo_cambio
            FROM  " . self::$table . " 
            INNER JOIN categorias
             ON " . self::$table . ".id_categoria = categorias.id_categoria
             INNER JOIN marcas
             ON " . self::$table . ".id_marca = marcas.id_marca
             INNER JOIN tipo_cambio
             ON " . self::$table . ".moneda = tipo_cambio.moneda
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
     * @param string $id_category
     * @return array|bool
     */
    public function getByCategory($id_category = '')
    {
        if (empty($id_category)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT " . self::$table . " . nombre, " . self::$table . " . id_producto
                    FROM " . self::$table . "
                    INNER JOIN categorias ON " . self::$table . " . id_categoria = categorias . id_categoria
                    WHERE categorias.id_categoria = " . $id_category . " AND " . self::$table . " . status = true LIMIT 10";

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