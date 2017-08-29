'use strict';

import G from '$util/global.js';
import qs from 'qs';

export default function (param, APIMAP) {
  if (!(G.env && G.env == 'local')) {
    const st = new Date();
    try {
      const url = APIMAP.product[param.name].value;
      param.data ? param.data.timestamp = Date.now() : null;
      const queryString = qs.stringify(param.data);
      param.url = `${url}?${queryString}`;

      return fetch(param.url, param).then((response) => {
        const ed = Date.now() - st;
        return response.json();
      }).catch((err) => {
        const ed = Date.now() - st;
        console.log('fetch error >>>>>', err);
      });
    } catch (error) {
      throw new Error(error, 'product url is undefined in apimap.js');
    }
  }
}
