<?php
    session_start();
    $date=date_create();
    $_SESSION['startTime'] = date_timestamp_get($date);
?>