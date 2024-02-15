<?php
    session_start();
    include('../db.php');
    if ( isset( $_SESSION['wallet']) ){
        $wallet = $_SESSION['wallet'];
        $username = htmlspecialchars($_POST['username']);
        $stmt = $bdd->prepare('SELECT `username` FROM `users` WHERE `username`= :username');
        $stmt->bindValue(':username',$username,PDO::PARAM_STR);
        $stmt->execute();
        $found = false;
        while($don=$stmt->fetch()){
            $found = true;            
        }
        if ( !$found ){
            $sql = "UPDATE users  SET username = :username WHERE wallet= :wallet";
            $stmt = $bdd->prepare($sql);
            $stmt->bindValue(':username',$username,PDO::PARAM_STR);
            $stmt->bindValue(':wallet',$wallet,PDO::PARAM_STR);
            $stmt->execute();
        }
    }
    
    header('Location:../');
?>