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

$('#copy-link').on('click', function(event) {
  // Prevent the default action of the link
  event.preventDefault();
  // Get the email address from the link's text
  var email = $('#email').text();
  // Copy the email address to the clipboard
  navigator.clipboard.writeText(email).then(function() {
      // If the copy was successful, update the link text to "copied"
      $('#copy-link').text('(Copied!)');
      // Optionally, reset the link text back to original after 2 seconds
      setTimeout(function() {
          $('#copy-link').text('(⌘C)');
      }, 2000);
  }, function(err) {
      // If there was an error copying, you can handle it here
      console.error('Async: Could not copy text: ', err);
  });
});