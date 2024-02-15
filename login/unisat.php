<?php
    session_start();

    $wallet = htmlspecialchars($_GET['a']);

    include('../db.php');

    $accountCreated = false;

    $reponse = $bdd->query('SELECT `wallet` FROM `users` ');
    while($don=$reponse->fetch()){
        if($wallet==$don['wallet'] ){
            $accountCreated = true;
        }
    }

    if( !$accountCreated ){
        $req=$bdd->prepare('INSERT INTO `users`(`wallet`) 
        VALUES (:wallet)');
        $req->execute(array(
            'wallet'=> $wallet,
        )); 
    }



    $_SESSION['wallet'] = $wallet;
    header('Location:../');

?>