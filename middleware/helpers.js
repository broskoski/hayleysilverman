const striptags = require('striptags')
const sanitizeHTML = require('sanitize-html')

const shuffle = (xs) => {
  let i = xs.length, tmp, ri;

  while (0 !== i) {
    ri = Math.floor(Math.random() * i);
    i -= 1;
    tmp = xs[i];
    xs[i] = xs[ri];
    xs[ri] = tmp;
  }

  return xs;
}

const rand = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const stripLinks = (str) =>
  str ? striptags(str, ['p', 'em'], '<p>') : ""

const addLinkTarget = (html) => {
  return sanitizeHTML(html, {
    transformTags: {
      'a': sanitizeHTML.simpleTransform('a', {
        target: '_blank' 
      })
    }
  })
}

module.exports = (req, res, next) => {
  res.locals.helpers = {
    shuffle,
    rand,
    stripLinks,
    addLinkTarget,
  };

  next();
};
