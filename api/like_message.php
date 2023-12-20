<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

date_default_timezone_set("Asia/Taipei");

try
{
    $dsn = "mysql:host=localhost;dbname=network;charset=utf8";
    $conn = new PDO($dsn,'root','immgt123');
    
    $user = $_POST['user'];
    $message_id = $_POST['card_id'];
    $like = $_POST['add_like'];

    $count = get_message_like_count($conn, $message_id);

    if($like == true) 
    {
        $count++;

        $conn->beginTransaction();

        message_add_like($conn, $message_id, $count);
        write_log($conn, $user, $message_id, $count);

        $result = $conn->commit();
        
        $response = new stdClass();
        $response->status = 'success';
        $response->count = $count;


        echo json_encode($response);

    }
    else 
    {

    }
    
}
catch(Exception $e) {

}

function message_add_like ($conn, $message_id, $count) {


    $sql = 'INSERT INTO message_like (`message_id`, `like`) VALUES(?, ?) ON DUPLICATE KEY UPDATE `like` = `like`+1';
    
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(1, $message_id);
    $stmt->bindParam(2, $count);
    
    $stmt->execute();

}

function write_log ($conn, $user, $message_id, $count) {
    $sql = 'insert into message_like_log (username, message_id, like_number, date) values (?, ?, ?, ?)';
    
    $stmt = $conn->prepare($sql);

    $date = date('Y-m-d H:i:s');
    
    $stmt->bindParam(1, $user, PDO::PARAM_STR);
    $stmt->bindParam(2, $message_id, PDO::PARAM_STR);
    $stmt->bindParam(3, $count, PDO::PARAM_STR);
    $stmt->bindParam(4, $date, PDO::PARAM_STR);

    $stmt->execute();

}

function get_message_like_count ($conn, $message_id) {
    
    $sql = 'select `like` from message_like where message_id = ?';
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $message_id);

    $stmt->execute();
    $result = $stmt->fetch();

    return $result['like'] ?? '0';
}
