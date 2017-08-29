const isFunction = isType('Function');

const OPTIONSPOOLS = {};

function isType(type) {
  return obj => Object.prototype.toString.call(obj) === `[object ${type}]`;
}

/**
 * Check if there is an array for holding event options in the options pool object, create one if not.
 * @param  {Object} optionsPool Options pool object
 * @param  {String} ev          Event name
 * @return {Array}              Options array of event
 */
function checkOptions(optionsPool, ev) {
  optionsPool[ev] = optionsPool[ev] || [];

  return optionsPool[ev];
}

/**
 * Delete event options at indexes.
 * @param  {Array} options      Options array
 * @param  {Array}  indexes     Array of indexes to be deleted
 */
function deleteOptionsAtIndexes(options = [], indexes = []) {
  // Make indexes decrease and collaborate with `splice` to delete correctely

  indexes.sort().reverse().forEach((index) => {
    options.splice(index, 1);
  });
}

/**
 * Create a TypeError of callback
 * @param  {String} ev Event name
 * @return {TypeError}
 */
function callbackTypeError(ev) {
  return new TypeError(`Event callback for ${ev} must be function.`);
}

/**
 * Register event
 * @param  {String}   ev              Event name
 * @param  {Function} callback        Event callback when event is emitted
 * @param  {Object}   settings        Register settings
 * @param  {Boolean}  settings.once   Indicate if callback can only be emitted once
 * @return {Boolean|Error}
 */
export const EmitOn = function (ev, callback, settings = {}) {
  const options = checkOptions(OPTIONSPOOLS, ev);
  if (isFunction(callback)) {
    const option = Object.assign({ notify: callback }, settings);
    options.push(option);
    return true;
  }
  const error = callbackTypeError(ev);
  return error;
};

/**
 * Unregister event
 * @param  {String}   ev              Event name
 * @param  {Function} callback        Event callback to be unregistered
 * @return {Boolean|Error}
 */
export const EmitOff = function (ev, callback) {
  const options = checkOptions(OPTIONSPOOLS, ev);

  // Unregister all callbacks if no callback argument.
  if (!callback) {
    OPTIONSPOOLS[ev] = [];
    return true;
  }

  if (isFunction(callback)) {
    const indexes = [];
    options.forEach((o, i) => {
      if (o.notify !== callback) return;
      indexes.push(i);
    });
    deleteOptionsAtIndexes(options, indexes);
    return true;
  }
  const error = callbackTypeError(ev);
  return error;
};

/**
 * Register event only once, automaticlly unregistered after the event is emitted.
 * @param  {String}   ev              Event name
 * @param  {Function} callback        Event callback when event is emitted
 * @return {Boolean|Error}
 */
export const EmitOnce = function (ev, callback) {
  return this.on(ev, callback, { once: true });
};

/**
 * Emit event
 * @param  {String} ev   Event name
 * @param  {Any}    arg[0] 1st arg passed to notify callback.
 * @param  {Any}    arg[1] 2nd arg passed to notify callback.
 * @param  {Any}    ...
 * @param  {Any}    arg[n] nth arg passed to notify callback.
 * @return {Boolean}
 */
export const Emit = function (ev, ...args) {
  const options = checkOptions(OPTIONSPOOLS, ev);
  const indexes = [];
  options.forEach((o, i) => {
    isFunction(o.notify) && o.notify(...args);
    o.once && indexes.push(i);
  });
  // Delete once options
  deleteOptionsAtIndexes(options, indexes);
  return true;
};
