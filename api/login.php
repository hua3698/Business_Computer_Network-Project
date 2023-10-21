<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try
{
    $dsn = "mysql:host=localhost;dbname=network;charset=utf8";
    $conn = new PDO($dsn,'root','immgt');
    
    $sql = 'select * from user where username = :username and password = :password';
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':username', $_POST['user']);
    $stmt->bindParam(':password', $_POST['password']);

    $stmt->execute();
    $result = $stmt->fetchAll();

    if(isset($result[0])) {
        echo 'success';
    }
    else {
        echo 'fail';
    }

}
catch(Exception $e) {

}