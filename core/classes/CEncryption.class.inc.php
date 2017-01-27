<?php

/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 9/22/2016
 * Time: 5:21 PM
 */
class Encryption
{
    private static $object = null;

    public static function singleton()
    {
        if (!isset(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    public function setSalt()
    {
        return $this->generateSalt();
    }

    private function generateSalt()
    {
        return base64_encode(round(microtime(true) * 1000) . rand());
    }

    public function generateToken()
    {
        return base64_encode(round(microtime(true) * 1000) . rand());
    }
}