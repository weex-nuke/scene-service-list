'use strict';

import APIMAP from '../apimap';
import DataSource from '../data-source';

export default function (param) {
  return DataSource(param, APIMAP);
}
