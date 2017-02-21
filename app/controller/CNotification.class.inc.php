<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 19/feb/2017
 * Time: 18:01
 */
require_once __CONTROLLER__ . 'CBaseController.class.inc.php';

class Notification extends BaseController
{
    private static $object = null;
    private $header = 'From:  Sitio Web <informes@iluminamos.com.mx>';
    private $subject = 'Notificación de Pago';
    private $send_to = 'informes@iluminamos.com.mx';
    /**
     * @return Notification|null
     */
    public static function singleton()
    {
        if (is_null(self::$object)) {
            self::$object = new self();
        }
        return self::$object;
    }

    public function charge()
    {
        $body = @file_get_contents('php://input');
        $data = json_decode($body, true);

        if ($data['type'] == 'charge.paid'){
            if(isset($data['data']['object']['payment_method']['reference'])){
                $msg = "Se ha pagado una orden de compra con el siguiente número de Referencia de OXXO: " . $data['data']['object']['payment_method']['reference'];
            }
            else{
                $msg = "Se ha pagado una orden de compra por medio de OXXO, favor de revisar.";
            }
            $msg_hook = "Data: " . print_r($data, 1);
            mail("mariocuevas88@gmail.com", "Webhook Charge", $msg_hook, $this->header);
            mail($this->send_to, $this->subject, $msg, $this->header);
        }

        return true;
    }
}