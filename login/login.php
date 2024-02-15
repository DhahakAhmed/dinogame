<?php
    session_start();
    $username = $_POST['username'];
    $password=hash('ripemd160', $_POST["password"]);
    include("../db.php");

    $reponse = $bdd->query('SELECT * FROM `users` ');
    while($don=$reponse->fetch()){
        if($username==$don['username'] && $don['password'] == $password && $password != NULL){
            $_SESSION['wallet'] = $don['wallet'];
        }
    }

    header('Location:../');
?>