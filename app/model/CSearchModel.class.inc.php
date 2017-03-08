<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 15/ene/2017
 * Time: 19:05
 */
require_once CLASSES . 'CDatabase.class.inc.php';

class SearchModel extends Database
{
    private static $object = null;
    private static $products_table = 'productos';

    /**
     * @return null|SearchModel
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    /**
     * @param null $category
     * @param null $brand
     * @return array|bool
     */
    public function getProducts($category = null, $brand = null)
    {
        if (!$this->connect()) {
            return false;
        }

        $filter = '';

        if (!is_null($category)) {
            $filter .= " AND " . self::$products_table . ".id_categoria = " . $category;
        }

        if (!is_null($brand)) {
            $filter .= " AND " . self::$products_table . ".id_marca = " . $brand;
        }

        $result_array = array();

        // TODO Remove LIMIT 10
        $query = "SELECT " . self::$products_table . ".id_producto,
        " . self::$products_table . ".id_categoria, " . self::$products_table . ".id_marca, precio,
        marcas.descuento,iva,tipo_cambio.moneda,tipo_cambio.tipo_cambio, " . self::$products_table . ".codigo_interno
        FROM " . self::$products_table . " INNER JOIN categorias
        ON " . self::$products_table . ".id_categoria = categorias.id_categoria 
        INNER JOIN marcas
        ON " . self::$products_table . ".id_marca = marcas.id_marca
        INNER JOIN tipo_cambio
        ON " . self::$products_table . ".moneda = tipo_cambio.id_tipo_cambio
        WHERE  1 = 1 " . $filter . " 
        AND " . self::$products_table . ".status = true 
        AND categorias.status = true and marcas.status = true LIMIT 10";

        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
    }

    public function getProductsByQuery($query = null)
    {
        if (is_null($query)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $filter = "AND (" . self::$products_table . ".codigo_interno LIKE '%" . $query . "%' OR categorias.nombre LIKE '%" . $query . "%'
        OR marcas.nombre LIKE '%" . $query . "%') ";
        $result_array = array();

        // TODO Remove LIMIT 10
        $query = "SELECT " . self::$products_table . ".id_producto, " . self::$products_table . ".nombre,
        " . self::$products_table . ".id_categoria, " . self::$products_table . ".id_marca, precio,
        marcas.descuento,iva,tipo_cambio.moneda,tipo_cambio.tipo_cambio, " . self::$products_table . ".codigo_interno,
        categorias.nombre as categoria, marcas.nombre as marca
        FROM " . self::$products_table . " INNER JOIN categorias
        ON " . self::$products_table . ".id_categoria = categorias.id_categoria
        INNER JOIN marcas
        ON " . self::$products_table . ".id_marca = marcas.id_marca
        INNER JOIN tipo_cambio
        ON " . self::$products_table . ".moneda = tipo_cambio.id_tipo_cambio
        WHERE  1 = 1 " . $filter . "
        AND " . self::$products_table . ".status = true
        AND categorias.status = true and marcas.status = true LIMIT 10";

        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
    }
}