<!doctype html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>

	<!-- Basic Page Needs
  ================================================== -->
	<meta charset="utf-8" />
	<title><?=$title?> || Marco Ignazio de Santis</title>
	<meta name="description" content="">
	<meta name="author" content="">
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<!-- Mobile Specific Metas
  ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> 

<?php /*	
	<!-- CSS
  ================================================== -->
	<link rel="stylesheet" href="stylesheets/base.css" />
	<link rel="stylesheet" href="stylesheets/skeleton.css" />
	<link rel="stylesheet" href="stylesheets/xbreadcrumbs.css" />
    <link rel="stylesheet" href="stylesheets/layout.css" />
	<link rel="stylesheet" href="javascripts/fancybox/jquery.fancybox.css" />
    <!--
	<link rel="stylesheet" href="stylesheets/bootstrap.min.css" />
	-->
                	
	<!-- Favicons
	================================================== -->

	<link rel="shortcut icon" href="images/favicon.ico" />
	<link rel="apple-touch-icon" href="images/apple-touch-icon.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png" />
        
        <script language="javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script language="javascript" src="javascripts/xbreadcrumbs.js"></script>
		<script type="text/javascript" src="javascripts/fancybox/jquery.fancybox.pack.js"></script>
		<script type="text/javascript" src="javascripts/jquery.elpaginator.js"></script>
    <!--
		<script type="text/javascript" src="javascripts/bootstrap-dropdown.js"></script>
    -->
        <script language="javascript" src="javascripts/app.js"></script>
*/?>        

	<?php css('base'); ?>
	<?php css('skeleton'); ?>
	<?php css('xbreadcrumbs'); ?>
	<?php css('layout'); ?>
	<?php echo '<link rel="stylesheet" href="' . get_domain() . 'javascripts/' . 'fancybox/jquery.fancybox' . '.css" />'; ?>
	
	<?php favicons(); ?>
	
	<?php js('jquery.min'); ?>
	<?php js('xbreadcrumbs'); ?>
	
	<?php js('fancybox/jquery.fancybox.pack'); ?>
	<?php js('jquery.elpaginator'); ?>
	<?php js('app'); ?>		
	
</head>
<body class="<?=$page ?>">

	<!-- Primary Page Layout
	================================================== -->

	<div id="body-wrap" class="container">

        <?php require_once('top-menu.php'); ?>

		<div id="wrapper" class="container">
			<div id="header" class="fourteen columns offset-by-one roffset-by-one">
<!--				<div id="welcome">Benvenuto nel sito ufficiale di</div> -->
				<a href="<?=get_domain()?>">
                    <h1>
						<span class="dropcaps">M</span>arco <span class="dropcaps">I</span>gnazio de <span class="dropcaps">S</span>antis
						<div>poeta e scrittore</div>
					</h1>
				</a>
				<hr />

            </div>

            <?php require_once('breadcrumbs.php'); ?>

            <?php //if ($page != 'home') { ?>
                <!-- <h2 class="page-title offset-by-one"><?php //echo $title; ?></h2> -->
            <?php //} ?>


