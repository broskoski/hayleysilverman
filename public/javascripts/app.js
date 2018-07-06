'use strict';

imagesLoaded('.Grid', ({ images }) => {
  images.map(({ img }) =>
    img.classList.add('img--loaded')
  );
});