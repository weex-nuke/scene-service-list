'use strict';

import G from '$util/global.js';
import qs from 'qs';

export default function (param, APIMAP) {
  if (!(G.env && G.env === 'local')) {
    try {
      const url = APIMAP.product[param.name].value;
      if (param.data) {
        param.data.timestamp = Date.now();
      }
      const queryString = qs.stringify(param.data);
      param.url = `${url}?${queryString}`;

      return fetch(param.url, param)
        .then(response => response.json())
        .catch((err) => {
          console.log('fetch error >>>>>', err);
        });
    } catch (error) {
      throw new Error(error, 'product url is undefined in apimap.js');
    }
  }
}
