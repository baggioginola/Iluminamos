<?php
/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 5/12/2016
 * Time: 9:53 AM
 */
require_once CLASSES . 'CDatabase.class.inc.php';

class ReportsModel extends Database
{
    private static $object = null;

    /**
     * @return null|ReportsModel
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

        $query = "SELECT codigo_interno,likes FROM productos WHERE status = true ORDER BY likes DESC LIMIT 10;";

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
    public function getProductSales()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT codigo_interno,ventas FROM productos WHERE status = true ORDER BY ventas DESC LIMIT 10;";

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
    public function getCustomers()
    {
        if (!$this->connect()) {
            return false;
        }
        $result_array = array();

        $query = "SELECT id_cliente,nombre,apellidos,e_mail,telefono FROM clientes;";

        if (!$result = $this->query($query)) {
            return false;
        }

        while ($row = $this->fetch_assoc($result)) {
            $result_array[] = $row;
        }

        return $result_array;
    }

    public function getCustomerById($id = '')
    {
        if (empty($id)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT id_cliente, nombre, apellidos, e_mail, direccion,
                  codigo_postal, estado, ciudad, telefono, celular FROM clientes WHERE id_cliente = '" . $id . "' ";

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