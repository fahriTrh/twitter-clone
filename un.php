<?php

// Get Project path
define('_PATH', dirname(__FILE__));

if(isset($_GET['zip'])){
	$zip=$_GET['zip'];
}else{
	echo "not get zip";
	return 0;
}

// Zip file name
$filename = $zip;
$zip = new ZipArchive;
$res = $zip->open($filename);
if ($res === TRUE) {

 // Unzip path
 $path = _PATH;

 // Extract file
 $zip->extractTo($path);
 $zip->close();

 echo 'Unzip! '.$filename;
 unlink($filename);
} else {
 echo 'failed!';
}

?>