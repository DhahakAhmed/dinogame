<?php
try
{
    //$bdd = new PDO('mysql:host=localhost;dbname=dinorunner;charset=utf8','ahmed','ahmeddb123' );
    $bdd = new PDO('mysql:host=localhost;dbname=dinorunner;charset=utf8','root','' );
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}

?>
