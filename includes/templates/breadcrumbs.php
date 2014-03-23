<?php if ($page != 'home') { ?>
    <ul id="breadcrumbs-3" class="xbreadcrumbs breadcrumb six columns offset-by-one">
        <li id="br-home">
            <?php anchor("", "Home"); ?>
        </li>
<?php if ($base_template != 'page') { ?>     
         <li>
              <a id="br-opere" href="#">Opere</a>
              <ul>
                   <li><?php anchor("opere/poesia", "Poesia"); ?></li>                   
                   <li><?php anchor("opere/narrativa", "Narrativa"); ?></li>
                   <li><?php anchor("opere/critica-letteraria", "Critica Letteraria"); ?></li>
                   <li><?php anchor("opere/storiografia", "Storiografia"); ?></li>                                                         
                   <li><?php anchor("opere/etnografia", "Etnografia"); ?></li>
				   <li><?php anchor("opere/dialettologia", "Dialettologia"); ?></li>
                   <li><?php anchor("opere/linguistica", "Linguistica"); ?></li>
                   <li><?php anchor("opere/giornalismo", "Giornalismo"); ?></li>                   
              </ul>
         </li>
<? } ?>          
         <li class="current">
              <?=$title?>
         </li>
    </ul>
    <br class="clear" />
<? } ?>