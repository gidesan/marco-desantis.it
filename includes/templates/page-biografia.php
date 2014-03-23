
<? require_once('header.php'); ?>

<img class="four columns offset-by-one" src="images/marco-ignazio-de-santis.jpg" />
<div class="nine columns offset-by-one roffset-by-one description">

<?php
	require_once('includes/lib/classTextile.php');
	$textile = new Textile();
	$in = file_get_contents('content/'.$page.'.txt');
	echo $textile->TextileThis($in);
?>

</div>					
<? require_once('footer.php'); ?>