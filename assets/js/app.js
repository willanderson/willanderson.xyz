const lastName = document.querySelector('#lastName');

const updateHeaderName = () => {
  lastName?.classList.toggle('is-visible', window.scrollY > 22);
};

window.addEventListener('scroll', updateHeaderName, { passive: true });
updateHeaderName();
  
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

const copyLink = document.querySelector('#copy-link');
const emailAddress = document.querySelector('#email');

copyLink?.addEventListener('click', (event) => {
  event.preventDefault();
  const email = emailAddress?.textContent;

  if (!email) return;

  navigator.clipboard.writeText(email).then(() => {
      copyLink.textContent = '(Copied!)';
      setTimeout(() => {
          copyLink.textContent = '(⌘C)';
      }, 2000);
  }).catch((error) => {
      console.error('Could not copy email address: ', error);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('#selected-work-carousel');
  const projectSets = [...(carousel?.querySelectorAll('.selected-work-set') || [])];
  const projectSet = projectSets[0];

  if (!carousel || !projectSet) return;

  const shuffledProjectUrls = [...projectSet.children]
    .map((card) => card.querySelector('a')?.getAttribute('href'))
    .filter(Boolean);

  for (let index = shuffledProjectUrls.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledProjectUrls[index], shuffledProjectUrls[randomIndex]] =
      [shuffledProjectUrls[randomIndex], shuffledProjectUrls[index]];
  }

  projectSets.forEach((set) => {
    const cardsByUrl = new Map(
      [...set.children].map((card) => [card.querySelector('a')?.getAttribute('href'), card])
    );

    shuffledProjectUrls.forEach((url) => set.append(cardsByUrl.get(url)));
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoScrollSpeed = 14;
  const resumeDelay = 2500;
  let isAutoScrolling = !prefersReducedMotion;
  let resumeTimer;
  let previousFrameTime = performance.now();

  const resetCarouselPosition = () => {
    const setWidth = projectSet.offsetWidth;

    if (carousel.scrollLeft >= setWidth) {
      carousel.scrollLeft -= setWidth;
    }
  };

  const pauseAutoScroll = () => {
    isAutoScrolling = false;
    window.clearTimeout(resumeTimer);
  };

  const resumeAutoScroll = () => {
    if (prefersReducedMotion) return;

    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      previousFrameTime = performance.now();
      isAutoScrolling = true;
    }, resumeDelay);
  };

  const autoScroll = (currentFrameTime) => {
    const elapsedSeconds = Math.min(currentFrameTime - previousFrameTime, 50) / 1000;

    if (isAutoScrolling) {
      carousel.scrollLeft += autoScrollSpeed * elapsedSeconds;
    }

    previousFrameTime = currentFrameTime;
    window.requestAnimationFrame(autoScroll);
  };

  carousel.addEventListener('scroll', resetCarouselPosition, { passive: true });
  carousel.addEventListener('pointerdown', pauseAutoScroll);
  carousel.addEventListener('pointerup', resumeAutoScroll);
  carousel.addEventListener('pointercancel', resumeAutoScroll);
  carousel.addEventListener('wheel', () => {
    pauseAutoScroll();
    resumeAutoScroll();
  }, { passive: true });
  window.addEventListener('resize', () => {
    carousel.scrollLeft = 0;
  });

  window.requestAnimationFrame(autoScroll);
});
