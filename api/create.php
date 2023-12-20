<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

date_default_timezone_set("Asia/Taipei");

try
{
    $dsn = "mysql:host=localhost;dbname=network;charset=utf8";
    $conn = new PDO($dsn,'root','immgt123');
    
    $is_not_exist = check_account_exist($conn, $_POST['user']);

    if($is_not_exist) {
        $sql = 'insert into user (`username`, `password`, `status`) values (?, ?, ?)';
        $stmt = $conn->prepare($sql);
        $status = 1;
    
        $stmt->bindParam(1, $_POST['user'], PDO::PARAM_STR);
        $stmt->bindParam(2, $_POST['password'], PDO::PARAM_STR);
        $stmt->bindParam(3, $status, PDO::PARAM_INT);
    
        $conn->beginTransaction();
        $stmt->execute();
        $result = $conn->commit();
    }
    else {
        echo 'exist';
        return;
    }

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

function check_account_exist ($conn, $user) {

    $sql = 'select username from user where username = ?';
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(1, $user, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if(is_array($result) && count($result) >= 1) {
        return false;
    }

    return true;
}