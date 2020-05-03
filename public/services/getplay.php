
 <?php
    header("Access-Control-Allow-Origin: *");

    header('Content-type: application/json');

    $playFolderName = "../plays";

    $tableName = $playFolderName . "/" . $_GET['tablename'] . ".json";

    $myfile = fopen($tableName, "r") or die("Unable to open file! :" . $tableName);
    echo fread($myfile, filesize($tableName));
    fclose($myfile);
?>
