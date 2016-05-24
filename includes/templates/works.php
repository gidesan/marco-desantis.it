<?php require_once('header.php'); ?>	

<?php 
$files = glob('content/'.$page.'/*.txt');
$has_features = count($files) > 0;
$has_content_page = file_exists('content/' . $page . '.txt');
$has_content_header = file_exists('content/' . $page . '/header.txt');

if ($has_features && $has_content_page) {
	require_once('switcher.php');
}
if ($has_content_header)
{
	require_once('content-header.php');
}
if ($has_features)
{
	require_once('feature.php');
}
if ($has_content_page) {
	require_once('list.php');
} 
?>	

<?php require_once('footer.php'); ?>