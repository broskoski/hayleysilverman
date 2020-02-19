const axios = require("axios");
const { flattenDeep } = require("lodash");

API_BASE = "https://api.are.na/v2";

module.exports = class Arena {
  url(path) {
    return [API_BASE, path].join("/");
  }

  channel(id) {
    return axios.get(this.url(`channels/${id}`)).then(({ data }) => data);
  }

  block(id) {
    return axios.get(this.url(`blocks/${id}`)).then(({ data }) => data);
  }

  fullChannel(id) {
    const PER = 100;
    const mergedContents = [];
    const getChannelPage = page =>
      axios.get(this.url(`channels/${id}?page=${page}&per=${PER}`));

    return getChannelPage(1)
      .then(({ data }) => {
        mergedContents.push(data.contents);

        const totalPages = Math.ceil((data.length - 1) / PER);
        return Array(totalPages)
          .fill(undefined)
          .map((_, pageN) => pageN + 2)
          .reduce(
            (promise, pageN) =>
              promise
                .then(() => getChannelPage(pageN))
                .then(({ data }) => mergedContents.push(data.contents)),
            Promise.resolve()
          )
          .then(_ => {
            const entireChannel = Object.assign({}, data, {
              contents: flattenDeep(mergedContents)
            });
            console.log("entireChannel", entireChannel.contents.length);
            return entireChannel;
          });
      })
      .catch(e => {
        console.log("error", e);
      });
  }
};
