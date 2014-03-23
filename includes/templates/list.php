	<div class="offset-by-three roffset-by-three">				
		<div id="list-wrapper">
			<?php
				require_once('includes/lib/classTextile.php');
				$textile = new Textile();
				$in = file_get_contents('content/'.$page.'.txt');
				echo $textile->TextileThis($in);
			?>
		</div>			
	
	</div>			
	<!--
	<div class="pagination">
	    <a href="#" class="first" data-action="first">&laquo;</a>
	    <a href="#" class="previous" data-action="previous">&lsaquo;</a>
	    <input type="text" readonly="readonly" data-max-page="3" />
	    <a href="#" class="next" data-action="next">&rsaquo;</a>
	    <a href="#" class="last" data-action="last">&raquo;</a>
	</div>
	-->