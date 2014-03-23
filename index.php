<?php
require 'helpers/init.php';
require 'includes/lib/Slim/Slim.php';

$app = new Slim(array(
    'templates.path' => 'includes/templates/'
));


/**
 * application routes
 *
 * The routes below work with PHP >= 5.3.
 */

$app->get('/', function () use ($app) {
    $app->render('home.php', array('title' => 'Home Page', 'page' => 'home'));
});

$app->get('/opere/:category', function ($category) use ($app) {
	$title = ucwords(str_replace('-', ' ', $category)); 	
	$child_template = 'works-'.$category.'.php';
	
	if (file_exists($app->config('templates.path').$child_template)) { 
		$app->render($child_template, array('title' => $title, 'page' => $category, 'base_template' => 'works'));	
	} else {
		$app->render('works.php', array('title' => $title, 'page' => $category, 'base_template' => 'works'));		
	}
});

$app->get('/:page', function ($page) use ($app) {
	$title = ucwords(str_replace('-', ' ', $page)); 

//	if (file_exists($app->config('templates.path').'page-'.$page.'.php')) { //singola pagina: es. biografia
            $app->render('page-'.$page.'.php', array('title' => $title, 'page' => $page, 'base_template' => 'page'));	
//	}

});


$app->run();