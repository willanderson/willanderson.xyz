$(window).scroll(function() {
    var scrollVal = $(this).scrollTop();
    if (scrollVal > 22) { /* Adjust as needed */
      $("#lastName").css('top', '0px');
    } else {
      $("#lastName").css('top', '22px'); /* Return to original position */
    }
});
  
document.addEventListener('DOMContentLoaded', (event) => {
  const videos = document.querySelectorAll('.lazy-video');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
        console.log('Video is playing:', entry.target.currentSrc); // Log when video starts playing
      } else {
        entry.target.pause();
        console.log('Video is paused:', entry.target.currentSrc); // Log when video is paused
      }
    });
  }, { threshold: 0.25 }); // Adjust threshold based on requirement

  videos.forEach(video => {
    observer.observe(video);
  });
});