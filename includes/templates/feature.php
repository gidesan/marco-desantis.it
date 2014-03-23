<div id="features">
<?php 
	//require_once('header.php');
	//$files = glob('content/'.$page.'/*.txt');
	
	require_once('includes/lib/classTextile.php');
	for ($i = 0; $i < count($files); $i++) {
		$image_url = str_replace('.txt', '.jpg', $files[$i]);	
		if ( file_exists($image_url) ) {				
			$thumb_url = 'includes/lib/timthumb.php?src=' . $image_url . '&w=200';
?>	
				
			<br class="clear" />		
	        <div class="four columns offset-by-four book-image">
	            <a class="fancybox" rel="gallery" href="<?=get_domain() . $image_url ?>">
	                <img class="four columns imagedropshadow" src="<?=get_domain() . $image_url /*$thumb_url*/ ?>" />
	            </a>
	        </div>
			<div class="four columns offset-by-one description">

<?php 	} else { ?>

			<br class="clear" />		
			<div class="four columns offset-by-nine description">
		
<?php 	} ?>
			<?php 
				$textile = new Textile();
				$in = file_get_contents($files[$i]);
				echo $textile->TextileThis($in);
			?>					
		</div>			
		<br class="clear" />
<?php 
	}
	//require_once('footer.php'); 
?>	
</div>