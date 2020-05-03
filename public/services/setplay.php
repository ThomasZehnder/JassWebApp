
 <?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
  header("Access-Control-Allow-Headers: 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept");

  header('Content-type: application/json');

  //avoid to big models, security issue
  $json_txt = file_get_contents('php://input');
  $json_len = strlen($json_txt);
  if ($json_len > 10000) {
    die("not allowed to write!!!".$json_len); 
  }
  
  $json = json_decode($json_txt, true);

  //echo($json['tablename']); 
  //echo("<br>");
  //echo($json['model']); 
  //echo("<br>");

  //JSON Validate
  switch (json_last_error()) {
    case JSON_ERROR_NONE:
      //echo "No errors";
      //echo($json['model']);
      break;
    case JSON_ERROR_DEPTH:
      echo "Maximum stack depth exceeded";
      break;
    case JSON_ERROR_STATE_MISMATCH:
      echo "Invalid or malformed JSON";
      break;
    case JSON_ERROR_CTRL_CHAR:
      echo "Control character error";
      break;
    case JSON_ERROR_SYNTAX:
      echo "Syntax error";
      break;
    case JSON_ERROR_UTF8:
      echo "Malformed UTF-8 characters";
      break;
    default:
      echo "Unknown error";
      break;
  }

  if (json_last_error() != JSON_ERROR_NONE) {
    echo ("<br>");
    echo ($model);
    echo ("<br>");
    die("<br>Don't stored file! JSON Error :" . $tableName);
  }

  // echo($json['tablename']); 
  // echo("<br>");
  // echo($json['model']); 
  //echo("<br>");

  $playFolderName = "../plays";
  $tableName = $playFolderName . "/" . $json['tablename'] . ".json";
  //  echo($tableName);
  //  echo("<br>");


  if (!file_exists($tableName)) {
    echo ("<br>");
    die("Unable to find file and save new content! :" . $tableName);
  }


  //echo("<br>");
  //echo("next open file to write");

  $myfile = fopen($tableName, "w") or die("Unable to open file! :" . $tableName);

  fwrite($myfile, $json['model']);
  fclose($myfile);

  echo ($json['model']);
?>
