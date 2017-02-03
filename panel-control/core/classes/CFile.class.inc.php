<?php

/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 8/17/2016
 * Time: 12:19 PM
 */
class CFile
{
    private static $object = null;
    private $log = array();
    private $dir = null;

    public static function singleton()
    {
        if (!isset(self::$object)) {
            self::$object = new CFile();
        }
        return self::$object;
    }

    public function delete($path = null)
    {
        if (empty($path)) {
            return false;
        }

        $files = glob($path . '*.{jpg,png}', GLOB_BRACE);

        foreach ($files as $key) {
            if (!unlink($key)) {
                return false;
            }
        }
        return true;
    }

    public function rename($path = null, $name = null)
    {
        if (empty($path) || empty($name)) {
            return false;
        }

        $files = glob($path . '*.{jpg,png}', GLOB_BRACE);

        foreach ($files as $key) {
            $index_extension = getIndexExtension($key);

            if (!rename($key, $path . $name . '-' . $index_extension)) {
                return false;
            }
        }
        return true;
    }
}