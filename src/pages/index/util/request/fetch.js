'use strict';

import DataSource from '$util/data-source';
import APIMAP from '../apimap';

export default function (param) {
  return DataSource(param, APIMAP);
}
