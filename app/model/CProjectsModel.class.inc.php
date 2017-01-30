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

    public function getById($id = '')
    {
        if (empty($id)) {
            return false;
        }

        if (!$this->connect()) {
            return false;
        }

        $result_array = array();

        $query = "SELECT id_caso_exito, titulo, subtitulo, contenido, num_imagenes FROM " . self::$table . " WHERE id_caso_exito = '" . $id . "' ";

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