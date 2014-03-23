/* 
* Skeleton V1.0.2
* Copyright 2011, Dave Gamache
* www.getskeleton.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 5/20/2011
*/	
	

$(document).ready(function() {
    
    // switcher
    var $switcher = $("#switcher");
    var hasSwitcher = $switcher.length > 0;
    if (hasSwitcher) {
    	$listWrapper = $("#list-wrapper")
    	$listWrapper.hide();
	    $switcher.click(function() {
	    	$features = $("#features");
	    	if ($($listWrapper).is(":visible")) {
				$listWrapper.hide();
				$features.show();	    	
				$switcher.text("Mostra elenco generale");				
	    	} else {
				$listWrapper.show();
				$features.hide();
				$switcher.text("Mostra libri in evidenza");	    	
	    	}	    	
	    });    	
    }
    //
    
    
    var url = window.location.pathname;
    $('#top-menu li a[href="'+url+'"]').parent().addClass('current');    
        
    $('.fancybox').fancybox();

    //$('.dropdown-toggle').dropdown();

    $('#breadcrumbs-3').xBreadcrumbs();

    $("body").css("display", "none"); 

    $('#list-wrapper').elpaginator({
    	style:'pages',
    	list: 'ol'/*,
    	paginationHTML: '<div class="pagination offset-by-three roffset-by-three"><ul class="page-list"></ul></div>'*/
    });

// Create the dropdown base
    $("<select />").prependTo("#body-wrap");

// Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value"   : "",
        "text"    : "Vai a..."
    }).appendTo("#body-wrap select");

// Populate dropdown with menu items
    $("#top-menu > li").each(function() {
        var el = $(this);

        var hasChildren = el.find("ul"),
            children    = el.find("li");

        if (hasChildren.length) {

            $("<optgroup />", {
                "label": el.find("> a").text()
            }).appendTo("#body-wrap select");

            children.each(function() {

                $("<option />", {
                    "value" : $(this).find("> a").attr("href"),
                    "text"  : $(this).text()
                }).appendTo("optgroup:last");

            });

        } else {

            $("<option />", {
                "value"   : el.find("> a").attr("href"),
                "text"    : el.text()
            }).appendTo("#body-wrap select");

        }
    });

    $("#body-wrap select").change(function() {
        window.location = $(this).find("option:selected").val();
    });





//    $("body").fadeIn(200);
 /*
    $("a").click(function(event){
        var linkLocation = new String(this.href);
        alert(linkLocation);
        //if (!linkLocation.match(/#$/)) {
         
            event.preventDefault();
            linkLocation = this.href;
            $("body").fadeOut(200, redirectPage);
            
        //}
        
    });
      */  


	/* Tabs Activiation
	================================================== */
//	var tabs = $('ul.tabs');
//	
//	tabs.each(function(i) {
//		//Get all tabs
//		var tab = $(this).find('> li > a');
//		tab.click(function(e) {
//			
//			//Get Location of tab's content
//			var contentLocation = $(this).attr('href') + "Tab";
//			
//			//Let go if not a hashed one
//			if(contentLocation.charAt(0)=="#") {
//			
//				e.preventDefault();
//			
//				//Make Tab Active
//				tab.removeClass('active');
//				$(this).addClass('active');
//				
//				//Show Tab Content & add active class
//				$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
//				
//			} 
//		});
//	}); 
	
});


$(window).load(function() {
    $("body").fadeIn(100);
});

function redirectPage() {
    window.location = linkLocation;
}
  