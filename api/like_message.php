<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

date_default_timezone_set("Asia/Taipei");

try
{
    $dsn = "mysql:host=localhost;dbname=network;charset=utf8";
    $conn = new PDO($dsn,'root','immgt');
    
    $user = $_POST['user'];
    $message_id = $_POST['card_id'];
    $like = $_POST['add_like'];

    $count = get_message_like_count($conn, $message_id);

    if($like == true) 
    {
        $count++;

        message_add_like($conn, $message_id, $count);
        // write_log($user, $message_id, $like);

        
        $response = new stdClass();
        $response->status = 'success';
        $response->count = $count;

        echo json_encode($response);

    }
    else 
    {

    }
    
    
    // $sql = 'select * from board order by date desc';

    // $stmt = $conn->prepare($sql);
    // $stmt->execute();
    // $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // if(isset($result[0])) {
    //     echo json_encode($result);
    // }
    // else {
    //     echo '';
    // }

}
catch(Exception $e) {

}

function message_add_like ($conn, $message_id, $count) {


    $sql = 'INSERT INTO message_like (`message_id`, `like`) VALUES(?, ?) ON DUPLICATE KEY UPDATE `like` = `like`+1';
    
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(1, $message_id);
    $stmt->bindParam(2, $count);
    
    $conn->beginTransaction();
    $stmt->execute();
    $result = $conn->commit();

}

function write_log ($conn, $user, $message_id, $like) {
    $sql = 'insert into message_like () values ()';
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


}

function get_message_like_count ($conn, $message_id) {
    
    $sql = 'select `like` from message_like where message_id = ?';
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $message_id);

    $stmt->execute();
    $result = $stmt->fetch();

    return $result['like'] ?? '0';
}