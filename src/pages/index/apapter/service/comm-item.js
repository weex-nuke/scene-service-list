'use strict';

import { Http } from '../../util/index';
import CommItemDataAdapter from '../data/comm-item';

export default {
  invoke: () => Http.fetch({
    name: 'get-comm-list',
    data: {},
  }).then((result) => {
    const payload = CommItemDataAdapter.formatData(result);
    return payload;
  }),
};
