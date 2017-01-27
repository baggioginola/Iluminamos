<?php

/**
 * Created by PhpStorm.
 * User: mario.cuevas
 * Date: 9/23/2016
 * Time: 9:22 AM
 */

require_once CLASSES . 'CEncryption.class.inc.php';
require_once __CONTROLLER__ . 'CUserController.class.inc.php';

class Session
{
    private static $object = null;

    public static function singleton()
    {
        if (!isset(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    public function store($token)
    {
        $_SESSION['token'] = $token;
    }

    public function storeUserInfo($name = '', $last_name = '')
    {
        $_SESSION['name'] = $name;
        $_SESSION['last_name'] = $last_name;
    }

    public function destroy()
    {
        if (!isset($_SESSION['token'])) {
            return false;
        }

        if (isset($_SESSION['name'])) {
            unset($_SESSION['name']);
        }

        if (isset($_SESSION['last_name'])) {
            unset($_SESSION['last_name']);
        }

        unset($_SESSION['token']);
        return true;
    }

    public function validate()
    {
        if (!$token = $this->getToken()) {
            return false;
        }

        if (!$result = UserController::singleton()->getByToken($token)) {
            return false;
        }

        if ($result['token_expiration'] < gmdate('Y-m-d H:i:s')) {
            return false;
        }

        return UserController::singleton()->updateToken($result['id'], $result['token']);
    }

    private function getToken()
    {
        if (!isset($_SESSION['token'])) {
            return false;
        }
        return $_SESSION['token'];
    }
}