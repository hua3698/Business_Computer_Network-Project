<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try
{
    $dsn = "mysql:host=localhost;dbname=network;charset=utf8";
    $conn = new PDO($dsn,'root','immgt');
    
    $sql = 'insert into user (`username`, `password`, `status`) values (?, ?, ?)';
    $stmt = $conn->prepare($sql);

    $status = 1;
    
    $stmt->bindParam(1, $_POST['user'], PDO::PARAM_STR);
    $stmt->bindParam(2, $_POST['password'], PDO::PARAM_STR);
    $stmt->bindParam(3, $status, PDO::PARAM_INT);

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