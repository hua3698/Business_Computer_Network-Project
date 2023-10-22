<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

date_default_timezone_set("Asia/Taipei");

try
{
    $dsn = "mysql:host=localhost;dbname=network;charset=utf8";
    $conn = new PDO($dsn,'root','immgt');
    
    $sql = 'insert into board (`username`, `name`, `title`, `content`, `date`) values (?, ?, ?, ?, ?)';
    $stmt = $conn->prepare($sql);

    $date = date('Y-m-d H:i:s');
    
    $stmt->bindParam(1, $_POST['cookie'], PDO::PARAM_STR);
    $stmt->bindParam(2, $_POST['name'], PDO::PARAM_STR);
    $stmt->bindParam(3, $_POST['title'], PDO::PARAM_STR);
    $stmt->bindParam(4, $_POST['content'], PDO::PARAM_STR);
    $stmt->bindParam(5, $date, PDO::PARAM_STR);

    $conn->beginTransaction();
    $stmt->execute();
    $result = $conn->commit();

    if(isset($result) && $result == true) {
        echo 'success';
    }
    else {
        echo 'fail';
    }

}
catch(Exception $e) {
    $conn->rollback();
}