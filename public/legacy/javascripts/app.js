$(document).ready(function () {
  // switcher
  var $switcher = $("#switcher");
  var hasSwitcher = $switcher.length > 0;
  if (hasSwitcher) {
    $listWrapper = $("#list-wrapper");
    $listWrapper.hide();
    $switcher.click(function () {
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

  $(".fancybox").fancybox();

  //$('.dropdown-toggle').dropdown();

  $("#breadcrumbs-3").xBreadcrumbs();

  $("#list-wrapper").elpaginator({
    style: "pages",
    list: "ol" /*,
    	paginationHTML: '<div class="pagination offset-by-three roffset-by-three"><ul class="page-list"></ul></div>'*/,
  });
});
