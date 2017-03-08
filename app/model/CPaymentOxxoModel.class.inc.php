<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 21/feb/2017
 * Time: 21:09
 */
require_once CLASSES . 'CDatabase.class.inc.php';

class PaymentOxxoModel extends Database
{
    private static $object = null;
    private static $table = 'compra_oxxo';

    /**
     * @return PaymentOxxoModel|null
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

    public function getTransaction($reference_code = '')
    {
        if (empty($reference_code)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT id, reference_code, id_cart, email FROM " . self::$table . " WHERE reference_code = '" . $reference_code . "' ORDER BY id DESC ";

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