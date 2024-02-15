<?php
    session_start();

    $wallet = $_SESSION['wallet'];

    if( isset($_SESSION['wallet']) && isset($_SESSION['startTime'])){
        $score = $_POST["score"];
    
        $date=date_create();
        $duration = (int)date_timestamp_get($date) - (int)$_SESSION['startTime'];
        $correctDuration = $score * 0.055;
        if ( $score > 99999 || $duration < $correctDuration){
            $score = -1;
        }
    
        include("./db.php");
        include('./gameParam/tournament.php');
    
        $reponse = $bdd->query('SELECT * FROM `users` ');
        while($don=$reponse->fetch()){
            if($wallet==$don['wallet'] ){
                $exScore = $don["score"];
                $username = $don['username'];
            }
        }

        if( $score > $exScore ){
            $sql = "UPDATE users  SET score = :score WHERE wallet= :wallet";
            $stmt = $bdd->prepare($sql);
            $stmt->bindValue(':score',$score,PDO::PARAM_STR);
            $stmt->bindValue(':wallet',$wallet,PDO::PARAM_STR);
            $stmt->execute();
        }

        $req=$bdd->prepare('INSERT INTO `games`(`wallet`,`username`,`score`,`date`) 
        VALUES (:wallet,:username,:score,:date)');
        $req->execute(array(
            'wallet'=> $wallet,
            'username'=>$username,
            'score'=>$score,
            'date'=>date("d/m/Y").''
        )); 

    }
    unset($_SESSION["startTime"])

?>