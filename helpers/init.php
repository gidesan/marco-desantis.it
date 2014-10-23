<?php
function get_domain() {
	$domain = '/';
	if (strpos($_SERVER['HTTP_HOST'],'localhost') !== false) {
	    $domain .= 'marco-desantis.it/';
	}
	return $domain;
}

function favicons() {
	echo '<link rel="shortcut icon" href="' . get_domain() . 'images/favicon.ico" />';
	echo '<link rel="apple-touch-icon" href="' . get_domain() . 'images/apple-touch-icon.png" />';
	echo '<link rel="apple-touch-icon" sizes="72x72" href="' . get_domain() . 'images/apple-touch-icon-72x72.png" />';
	echo '<link rel="apple-touch-icon" sizes="114x114" href="' . get_domain() . 'images/apple-touch-icon-114x114.png" />';

}

function css($relative_path) {
    echo '<link rel="stylesheet" href="' . get_domain() . 'stylesheets/' . $relative_path . '.css" />';
}

function js($relative_path) {
    echo '<script type="text/javascript" src="' . get_domain() . 'javascripts/' . $relative_path . '.js"></script>';
}

function parse_extras($rule) {
	if ($rule[0] == "#") //1
	{
		$id = substr($rule,1,strlen($rule)); //2
		$data = ' id="' . $id . '"'; //3
		return $data;
	}
	if ($rule[0] == ".") //4
	{
		$class = substr($rule,1,strlen($rule));
		$data = ' class="' . $class . '"';
		return $data;
	}
	if ($rule[0] == "_") //5
	{
		$data = ' target="' . $rule . '"';
		return $data;
	}
}

function anchor($link, $text, $title = null, $extras = null) {
	$domain = get_domain();
	$link = $domain . $link;
	$data = '<a href="' . $link . '"';
	if ($title)
	{
		$data .= ' title="' . $title . '"';
	}
	else
	{
		$data .= ' title="' . $text . '"';
	}
	if (is_array($extras))//2
	{
		foreach($extras as $rule)//3
		{
			$data .= parse_extras($rule);//4
		}
	}
	if (is_string($extras))//5
	{
		$data .= parse_extras($extras);//6
	}
	$data.= '>';
	$data .= $text;
	$data .= "</a>";
	echo $data;
}