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
  str ? str.replace(/(<a href=")?((https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi, function () {
    return '<span>' + (arguments[7] || arguments[2]) + '</span>'
  }) : ""

module.exports = (req, res, next) => {
  res.locals.helpers = {
    shuffle,
    rand,
    stripLinks,
  };

  next();
};
