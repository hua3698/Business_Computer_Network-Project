<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try
{
    $dsn = "mysql:host=localhost;dbname=network;charset=utf8";
    $conn = new PDO($dsn,'root','immgt');
    
    $sql = 'select * from board';
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if(isset($result[0])) {
        echo json_encode($result);
    }
    else {
        echo '';
    }

}
catch(Exception $e) {

}