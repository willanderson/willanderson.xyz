
import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery',
  children: '.item',
  pswpModule: () => import('https://unpkg.com/photoswipe'),
});

lightbox.init();

console.log("Hello World!");