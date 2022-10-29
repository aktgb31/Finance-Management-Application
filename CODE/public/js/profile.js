$(document).ready(function() {
  
    //Calculating height and making the sidenav responsive for all the devices ,as soon as the Document loaded 
    sidenavHeight();
    //Sidenavbar is made responsive for both all types of devices
    function sidenavHeight() {
      var contemt_main = $("#contemt-main").height();
      var nav = $(".sidenav").height();
        if (nav <= contemt_main) {
          $(".sidenav").css("height", contemt_main);
          $("#loader").css("height", contemt_main);
        } else {
          $(".sidenav").css("height", nav);
          $("#loader").css("height", contemt_main);
        }
    }
  
    //Calculating height and making the sidenav responsive whenever their is change in window size
    $(window).resize(function() {
      sidenavHeight();
    });
    $(window).on("orientationchange",function() {
      sidenavHeight();
    });
    $(window).on("load",function() {
      sidenavHeight();
    });
  });
  