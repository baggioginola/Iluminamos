<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 28/ene/2017
 * Time: 20:13
 */

require_once __CONTROLLER__ . 'CLikesProductsController.class.inc.php';
require_once __CONTROLLER__ . 'CProductsController.class.inc.php';
require_once __CONTROLLER__ . 'CBaseController.class.inc.php';

require_once __MODEL__ . 'CLikeModel.class.inc.php';

class Like extends BaseController
{
    private static $object = null;

    private $parameters = array();

    private $validParameters = array(
        'id_producto' => TYPE_INT
    );

    /**
     * @return Like|null
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    /**
     * @return string
     */
    public function add()
    {
        if (!$this->_setParameters()) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        $session_id = session_id();
        $id = null;

        if (!$result = LikeModel::singleton()->getBySessionId($session_id)) {
            if (!$this->parameters['id_likes'] = LikeModel::singleton()->add(array('variable_session' => $session_id, 'fecha' => date('Y-m-d H:i:s')))) {
                return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
            }
        } else {
            $this->parameters['id_likes'] = $result['id'];
        }

        if (!LikesProducts::singleton()->add($this->parameters)) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        if (!Products::singleton()->updateLikes($this->parameters['id_producto'])) {
            return json_encode($this->getResponse(STATUS_FAILURE_INTERNAL, MESSAGE_ERROR));
        }

        return json_encode($this->getResponse(STATUS_SUCCESS, MESSAGE_SUCCESS));
    }

    public function getByIdProduct($id_product = null)
    {
        if (is_null($id_product)) {
            return false;
        }

        $session_id = session_id();

        if (!$result = LikeModel::singleton()->getBySessionId($session_id)) {
            return false;
        }

        if (!LikesProducts::singleton()->getByIdProduct($result['id'], $id_product)) {
            return false;
        }

        return true;
    }

    /**
     * @return bool
     */
    private function _setParameters()
    {
        if (!isset($_POST) || empty($_POST)) {
            return false;
        }

        if (!$this->validateParameters($_POST, $this->validParameters)) {
            return false;
        }

        foreach ($_POST as $key => $value) {
            $this->parameters[$key] = $value;
        }

        return true;
    }
}