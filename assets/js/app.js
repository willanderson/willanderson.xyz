$(window).scroll(function() {
    var scrollVal = $(this).scrollTop();
    if (scrollVal > 22) { /* Adjust as needed */
      $("#lastName").css('top', '0px');
    } else {
      $("#lastName").css('top', '22px'); /* Return to original position */
    }
  });