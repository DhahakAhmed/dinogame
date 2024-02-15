<?php
    session_start();
    $wallet = $_POST['wallet'];
    $password=hash('ripemd160', $_POST["password"]);
    $password2=hash('ripemd160', $_POST["password2"]);

    include("../db.php");

    if( strlen($wallet) >= 32 && strlen($wallet) <= 50 && $password2 == $password ){
        $walletIsUsed = false;

        $reponse = $bdd->query('SELECT * FROM `users` ');
        while($don=$reponse->fetch()){
            if($wallet==$don['wallet'] ){
                $walletIsUsed=true;
                $usedPassword = $don['password'];
            }
        }

        if( !$walletIsUsed ){
            $req=$bdd->prepare('INSERT INTO `users`(`wallet`,`password`) 
            VALUES (:wallet,:password)');
            $req->execute(array(
                'wallet'=> $wallet,
                'password'=>$password,
            )); 

            $_SESSION['wallet'] = $wallet;
        }
        else if ( $walletIsUsed && $usedPassword == NULL ){
            $sql = "UPDATE users  SET password = :password WHERE wallet= :wallet";
            $stmt = $bdd->prepare($sql);
            $stmt->bindValue(':password',$password,PDO::PARAM_STR);
            $stmt->bindValue(':wallet',$wallet,PDO::PARAM_STR);
            $stmt->execute();
            $_SESSION['wallet'] = $wallet;
        }
        
    }

    header('Location:../');
?>