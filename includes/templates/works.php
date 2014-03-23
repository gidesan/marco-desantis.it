<?php require_once('header.php'); ?>	

<?php 
$files = glob('content/'.$page.'/*.txt');
$has_features = count($files) > 0;
$has_list = file_exists('content/'.$page.'.txt');

if ($has_features && $has_list) {
	require_once('switcher.php');
}
if ($has_features)
{
	require_once('feature.php');
}
if ($has_list) {
	require_once('list.php');
} 
?>	

<?php require_once('footer.php'); ?>