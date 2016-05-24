<div class="content-header offset-by-one">				
		<?php
			require_once('includes/lib/classTextile.php');
			$textile = new Textile();
			$in = file_get_contents('content/'.$page.'/header.txt');
			echo $textile->TextileThis($in);
		?>
</div>