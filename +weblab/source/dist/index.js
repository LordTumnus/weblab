var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$2;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = freeGlobal || freeSelf || Function('return this')();

var _root = root$2;

var root$1 = _root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root$1.Date.now();
};

var now_1 = now$1;

/** Used to match a single whitespace character. */

var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex$1(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex$1;

var trimmedEndIndex = _trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim$1(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim$1;

var root = _root;

/** Built-in value references. */
var Symbol$3 = root.Symbol;

var _Symbol = Symbol$3;

var Symbol$2 = _Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$1 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var baseTrim = _baseTrim,
    isObject$1 = isObject_1,
    isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var isObject = isObject_1,
    now = now_1,
    toNumber = toNumber_1;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

var debounce$1 = /*@__PURE__*/getDefaultExportFromCjs(debounce_1);

let connector = undefined;
let components = [];
let preIds = [];
let evtQueue = [];
const debouncedPublish = debounce$1(() => {
    connector.Data = evtQueue;
    evtQueue = [];
}, 50, { leading: false, trailing: true });
var connector$1 = {
    /**
     * Send an event to matlab
     * @param {string} id The identifier of the component publishing the event
     * @param  { {name: string, data: any} } event  The info to be passed
     */
    publish(id, event) {
        evtQueue.push({ id: id, name: event.name, data: event.data });
        debouncedPublish();
    },
    /**
     * Store the element with its ID
     * @param {Component} element The component itself
     */
    register(element) {
        components.push(element);
        const idx = preIds.findIndex((e) => { return e.id === element.id; });
        if (idx !== -1) {
            preIds[idx].events.forEach((ev) => {
                element.handleEvent(ev.name, ev.data);
            });
            preIds.splice(idx, 1);
        }
    },
    /**
     *
     * @param {string} id
     */
    preregister(id) {
        preIds.push({ id: id, events: [] });
    },
    /**
     * Setup
     * @param {HTMLConnector} html The html component
     */
    setup(html) {
        connector = html;
        connector.addEventListener("DataChanged", () => {
            html.Data.forEach((ev) => {
                handleMatlabEvent(ev.id, ev.name, ev.data);
            });
        });
    }
};
/**
 *
 * @param {string} id
 * @param {string} name
 * @param {any} data
 */
function handleMatlabEvent(id, name, data) {
    let src = components.find((e) => { return e.id === id; });
    if (src !== undefined) {
        src.handleEvent(name, data);
        return;
    }
    let pre = preIds.find((e) => { return e.id === id; });
    if (pre !== undefined) {
        pre.events.push({ name: name, data: data });
        return;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

/*
  cssobj v1.3.6
  Thu Mar 22 2018 09:41:25 GMT+0800 (CST)
  commit 5199e3a94197a9cfdd0ecc4576dcaed71b01458d

  https://github.com/cssobj/cssobj
  Released under the MIT License.

  Components version info:
  - cssobj-core@1.1.9
    319d94d9d6c0ee455ed0dfe0c7f796298a145250
  - cssobj-plugin-cssom@4.1.4
    18b665ff6051ae754c0956ea1c278d0a4cda112c
  - cssobj-plugin-localize@3.3.2
    90529430922b4b3bbb27c70264157f1fae71eb62
*/

// helper functions for cssobj

// check n is numeric, or string of numeric
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function isPrimitive(val) {
  return val == null || (typeof val !== 'function' && typeof val !== 'object')
}

function own(o, k) {
  return {}.hasOwnProperty.call(o, k)
}

// set default option (not deeply)
function defaults(options, defaultOption) {
  options = options || {};
  for (var i in defaultOption) {
    if (own(defaultOption, i) && !(i in options)) options[i] = defaultOption[i];
  }
  return options
}

// Object.assgin polyfill
function _assign (target, source) {
  var s, from, key;
  var to = Object(target);
  for (s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (key in from) {
      if (own(from, key)) {
        to[key] = from[key];
      }
    }
  }
  return to
}
var assign = Object.assign || _assign;
// console.log(assign({}, {a:1}, {a:2}, {b:3}))

// convert js prop into css prop (dashified)
function dashify(str) {
  return str.replace(/[A-Z]/g, function(m) {
    return '-' + m.toLowerCase()
  })
}

// capitalize str
function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

// random string, should used across all cssobj plugins
var random = (function () {
  var count = 0;
  return function (prefix) {
    count++;
    return '_' + (prefix||'') + Math.floor(Math.random() * Math.pow(2, 32)).toString(36) + count + '_'
  }
})();

function isString(value) {
  return typeof value === 'string'
}
// var obj={a:{b:{c:1}}};
// objSet(obj, {} ,{x:1});
// objSet(obj,'a.b.c.d.e',{x:1});
// objSet(obj,'a.f.d.s'.split('.'), {y:1});
// console.log(JSON.stringify(obj))


// return object path with only object type
function objGetObj(obj, _key) {
  var key = Array.isArray(_key) ? _key : String(_key).split('.');
  var p, n, ok=1;
  var ret = {ok:ok, path:key, obj:obj};
  for(p=0; p<key.length; p++) {
    n = key[p];
    if(!obj.hasOwnProperty(n) || isPrimitive(obj[n])) {
      ok = 0;
      break
    }
    obj = obj[n];
  }
  ret.ok= ok;
  ret.path = key.slice(0,p);
  ret.obj=obj;
  return ret
}
// var obj={a:{b:{c:1}}};
// console.log(objGetObj(obj))
// console.log(objGetObj(obj, []))
// console.log(objGetObj(obj, 'a'))
// console.log(objGetObj(obj, 'a.b'))
// console.log(objGetObj(obj, 'a.b.c.e'))

// extend obj from source, if it's no key in obj, create one
function extendObj (obj, key, source) {
  obj[key] = obj[key] || {};
  for(var args = arguments, i = 2; i < args.length; i++) {
    source = args[i];
    for (var k in source)
      if (own(source, k)) obj[key][k] = source[k];
  }
  return obj[key]
}

// ensure obj[k] as array, then push v into it
function arrayKV (obj, k, v, reverse, unique) {
  var d = obj[k];
  d = obj[k] = k in obj ? (Array.isArray(d) ? d : [d]) : [];
  if(unique && d.indexOf(v)>-1) return
  reverse ? d.unshift(v) : d.push(v);
}

// get parents array from node (when it's passed the test)
function getParents (node, test, key, childrenKey, parentKey) {
  var i, v, p = node, path = [];
  while (p) {
    if (test(p)) {
      if (childrenKey) {
        for (i = 0; i < path.length; i++) {
          arrayKV(p, childrenKey, path[i], false, true);
        }
      }
      if (path[0] && parentKey) {
        path[0][parentKey] = p;
      }
      path.unshift(p);
    }
    p = p.parent;
  }
  for (i = 0; i < path.length; i++) {
    v = path[i];
    path[i] = key ? v[key] : v;
  }

  return path
}

// split selector with splitter, aware of css attributes
function splitSelector (sel, splitter, inBracket) {
  if (sel.indexOf(splitter) < 0) return [sel]
  for (var c, i = 0, n = 0, instr = '', prev = 0, d = []; c = sel.charAt(i); i++) {
    if (instr) {
      if (c == instr && sel.charAt(i-1)!='\\') instr = '';
      continue
    }
    if (c == '"' || c == '\'') instr = c;
    /* istanbul ignore if  */
    if(!inBracket){
      if (c == '(' || c == '[') n++;
      if (c == ')' || c == ']') n--;
    }
    if (!n && c == splitter) d.push(sel.substring(prev, i)), prev = i + 1;
  }
  return d.concat(sel.substring(prev))
}

// checking for valid css value
function isValidCSSValue (val) {
  // falsy: '', NaN, Infinity, [], {}
  return typeof val=='string' && val || typeof val=='number' && isFinite(val)
}

// using var as iteral to help optimize
var KEY_ID = '$id';
var KEY_ORDER = '$order';
var KEY_TEST = '$test';

var TYPE_GROUP = 'group';

// helper function
var keys = Object.keys;

// type check helpers
var type = {}.toString;
var ARRAY = type.call([]);
var OBJECT = type.call({});

// only array, object now treated as iterable
function isIterable (v) {
  return type.call(v) == OBJECT || type.call(v) == ARRAY
}

// check if it's function
function isFunction (v) {
  return typeof v == 'function'
}

// regexp constants
// @page rule: CSSOM:
//   IE returned: not implemented error
//   FF, Chrome actually is not groupRule(not cssRules), same as @font-face rule
//   https://developer.mozilla.org/en-US/docs/Web/API/CSSGroupingRule
//   CSSPageRule is listed as derived from CSSGroupingRule, but not implemented yet.
//   Here added @page as GroupRule, but plugin should take care of this.
var reGroupRule = /^@(media|document|supports|page|[\w-]*keyframes)/i;
var reAtRule = /^\s*@/i;

/**
 * convert simple Object into node data
 *
 input data format:
 {"a":{"b":{"c":{"":[{color:1}]}}}, "abc":123, '@import':[2,3,4], '@media (min-width:320px)':{ d:{ok:1} }}
 *        1. every key is folder node
 *        2. "":[{rule1}, {rule2}] will split into several rules
 *        3. & will replaced by parent, \\& will escape
 *        4. all prop should be in dom.style camelCase
 *
 * @param {object|array} d - simple object data, or array
 * @param {object} result - the reulst object to store config and root node
 * @param {object} [previousNode] - also act as parent for next node
 * @param {boolean} init whether it's the root call
 * @returns {object} node data object
 */
function parseObj (d, result, node, init) {
  if (init) {
    result.nodes = [];
    result.ref = {};
    if (node) result.diff = {};
  }

  node = node || {};

  node.obj = d;

  if (type.call(d) == ARRAY) {
    var nodes = [];
    /* for array type, each children have a parent that not on the virtual tree,
       see test case of @media-array for example, the array node obj=Array, but have node.selPart(no selText)
       So have to set the right node.at/node.type from the node.key, to get right selText for children */
    node.at = reAtRule.exec(node.key);
    for(var i = 0; i < d.length; i++) {
      var prev = node[i];
      var n = parseObj(d[i], result, node[i] || {parent: node, src: d, parentNode: nodes, index: i});
      if(result.diff && prev!=n) arrayKV(result.diff, n ? 'added' : 'removed', n||prev);
      nodes.push(n);
    }
    return nodes
  } else {
    if (d[KEY_ID]) result.ref[d[KEY_ID]] = node;
    // it's no need to check (type.call(d) == OBJECT)
    // isIterable will filter only ARRAY/OBJECT
    // other types will goto parseProp function
    var prevVal = node.prevVal = node.lastVal;
    // at first stage check $test
    if (KEY_TEST in d) {
      var test = isFunction(d[KEY_TEST]) ? d[KEY_TEST](!node.disabled, node, result) : d[KEY_TEST];
      // if test false, remove node completely
      // if it's return function, going to stage 2 where all prop rendered
      if(!test) {
        return
      }
      node.test = test;
    }
    var children = node.children = node.children || {};
    node.lastRaw = node.rawVal || {};
    node.lastVal = {};
    node.rawVal = {};
    node.prop = {};
    node.diff = {};
    var order = d[KEY_ORDER] | 0;
    var funcArr = [];

    var processObj = function (obj, k, nodeObj) {
      var haveOldChild = k in children;
      var newNode = extendObj(children, k, nodeObj);
      // don't overwrite selPart for previous node
      newNode.selPart = newNode.selPart || splitSelector(k, ',');
      var n = parseObj(obj, result, newNode);
      if(n) children[k] = n;
      // it's new added node
      if (prevVal) !haveOldChild
        ? n && arrayKV(result.diff, 'added', n)
        : !n && arrayKV(result.diff, 'removed', children[k]);
      // for first time check, remove from parent (no diff)
      if(!n) delete nodeObj.parent.children[k];
    };

    // only there's no selText, getSel
    if(!('selText' in node)) getSel(node, result);

    for (var k in d) {
      // here $key start with $ is special
      // k[0] == '$' ... but the core will calc it into node.
      // Plugins should take $ with care and mark as a special case. e.g. ignore it
      if (!own(d, k)) continue
      if (!isIterable(d[k]) || type.call(d[k]) == ARRAY && !isIterable(d[k][0])) {

        // it's inline at-rule: @import etc.
        if (k[0]=='@') {
          processObj(
            // map @import: [a,b,c] into {a:1, b:1, c:1}
            [].concat(d[k]).reduce(function(prev, cur) {
              prev[cur] = ';';
              return prev
            }, {}), k, {parent: node, src: d, key: k, inline:true});
          continue
        }

        var r = function (_k) {
          // skip $test key
          if(_k != KEY_TEST) parseProp(node, d, _k, result);
        };
        order
          ? funcArr.push([r, k])
          : r(k);
      } else {
        processObj(d[k], k, {parent: node, src: d, key: k});
      }
    }

    // when it's second time visit node
    if (prevVal) {
      // children removed
      for (k in children) {
        if (!(k in d)) {
          arrayKV(result.diff, 'removed', children[k]);
          delete children[k];
        }
      }

      // prop changed
      var diffProp = function () {
        var newKeys = keys(node.lastVal);
        var removed = keys(prevVal).filter(function (x) { return newKeys.indexOf(x) < 0 });
        if (removed.length) node.diff.removed = removed;
        if (keys(node.diff).length) arrayKV(result.diff, 'changed', node);
      };
      order
        ? funcArr.push([diffProp, null])
        : diffProp();
    }

    if (order) arrayKV(result, '_order', {order: order, func: funcArr});
    result.nodes.push(node);
    return node
  }

}

function getSel(node, result) {

  var opt = result.config;

  // array index don't have key,
  // fetch parent key as ruleNode
  var ruleNode = getParents(node, function (v) {
    return v.key
  }).pop();

  node.parentRule = getParents(node.parent, function (n) {
    return n.type == TYPE_GROUP
  }).pop() || null;

  if (ruleNode) {
    var isMedia, sel = ruleNode.key;
    var groupRule = sel.match(reGroupRule);
    if (groupRule) {
      node.type = TYPE_GROUP;
      node.at = groupRule.pop();
      isMedia = node.at == 'media';

      // only media allow nested and join, and have node.selPart
      if (isMedia) node.selPart = splitSelector(sel.replace(reGroupRule, ''), ',');

      // combinePath is array, 'str' + array instead of array.join(',')
      node.groupText = isMedia
        ? '@' + node.at + combinePath(getParents(node, function (v) {
          return v.type == TYPE_GROUP
        }, 'selPart', 'selChild', 'selParent'), '', ' and')
      : sel;

      node.selText = getParents(node, function (v) {
        return v.selText && !v.at
      }, 'selText').pop() || '';
    } else if (reAtRule.test(sel)) {
      node.type = 'at';
      node.selText = sel;
    } else {
      node.selText = '' + combinePath(getParents(ruleNode, function (v) {
        return v.selPart && !v.at
      }, 'selPart', 'selChild', 'selParent'), '', ' ', true);
    }

    node.selText = applyPlugins(opt, 'selector', node.selText, node, result);
    if (node.selText) node.selTextPart = splitSelector(node.selText, ',');

    if (node !== ruleNode) node.ruleNode = ruleNode;
  }

}

/**
 * Parse property of object d's key, with propKey as a candidate key name
 * @param {} node: v-node of cssobj
 * @param {} d: source object
 * @param {} key: any numeric will be ignored, then converted to string
 * @param {} result: cssobj result object
 * @param {} propKey: candidate prop key name

 Accept only key as string, numeric will be ignored

 color: function(){return ['red', 'blue']} will expand
 color: function(){return {fontSize: '12px', float:'right'}} will be replaced

 */
function parseProp (node, d, key, result, propKey) {
  var prevVal = node.prevVal;
  var lastVal = node.lastVal;

  // the prop name get from object key or candidate key
  var propName = isNumeric(key) ? propKey : key;

  // NEXT: propName can be changed by user
  // now it's not used, since propName ensure exists
  // corner case: propKey==='' ?? below line will do wrong!!
  // if(!propName) return

  var raw = node.lastRaw[propName],
      prev = prevVal && prevVal[propName],
      argObj = {node:node, result:result};

  if (raw) argObj.raw = raw[0];

  ![].concat(d[key]).forEach(function (v) {
    // prepare value function args
    argObj.cooked = prev;

    // pass lastVal if it's function
    argObj.raw = raw = isFunction(v)
        ? v(argObj)
        : v;

    var val = applyPlugins(result.config, 'value', raw, propName, node, result, propKey);

    // check and merge only format as Object || Array of Object, other format not accepted!
    if (isIterable(val)) {
      for (var k in val) {
        if (own(val, k)) parseProp(node, val, k, result, propName);
      }
    } else {
      arrayKV (
        node.rawVal,
        propName,
        raw,
        true
      );
      if (isValidCSSValue(val)) {
        // only valid val can enter node.prop and lastVal
        // push every val to prop
        arrayKV(
          node.prop,
          propName,
          val,
          true
        );
        prev = lastVal[propName] = val;
      }
    }
  });
  if (prevVal) {
    if (!(propName in prevVal)) {
      arrayKV(node.diff, 'added', propName);
    } else if (prevVal[propName] != lastVal[propName]) {
      arrayKV(node.diff, 'changed', propName);
    }
  }
}

function combinePath (array, parentSel, seperator, replaceAmpersand) {
  return !array.length ? parentSel : array[0].reduce(function (result, value) {
    var part, str = parentSel ? parentSel + seperator : parentSel;
    if (replaceAmpersand) {
      part = splitSelector( value, '&' );
      str = part.length > 1 ? part.join(parentSel) : str + value;
    } else {
      str += value;
    }
    return result.concat(combinePath(array.slice(1), str, seperator, replaceAmpersand))
  }, [])
}

function applyPlugins (opt, type) {
  var args = [].slice.call(arguments, 2);
  var plugin = opt.plugins;
  // plugin is always Array, so here we don't check it
  return [].concat(plugin).reduce(
    function (pre, plugin) { return plugin[type] ? plugin[type].apply(null, [pre].concat(args)) : pre },
    args.shift()
  )
}

function applyOrder (opt) {
  if (opt._order==null) return
  opt._order
    .sort(function (a, b) {
      return a.order - b.order
    })
    .forEach(function (v) {
      v.func.forEach(function (f) {
        f[0](f[1]);
      });
    });
  opt._order = [];
}

function cssobj (config) {

  config = defaults(config, {
    plugins: [],
    intros: []
  });

  return function (initObj, initState) {
    var updater = function (obj, state) {
      if (arguments.length>1) result.state = state || {};
      if (obj) result.obj = isFunction(obj) ? obj() : obj;
      result.root = parseObj(extendObj({}, '', result.intro, result.obj), result, result.root, true);
      applyOrder(result);
      result = applyPlugins(config, 'post', result);
      isFunction(config.onUpdate) && config.onUpdate(result);
      return result
    };

    var result = {
      intro: {},
      update: updater,
      config: config
    };

    ![].concat(config.intros).forEach(
      function(v) {
        extendObj(result, 'intro', isFunction(v) ? v(result) : v);
      }
    );

    updater(initObj, initState || config.state);

    return result
  }
}

// plugin for cssobj

function createDOM (rootDoc, id, option) {
  var el = rootDoc.getElementById(id);
  var head = rootDoc.getElementsByTagName('head')[0];
  if(el) {
    if(option.append) return el
    el.parentNode && el.parentNode.removeChild(el);
  }
  el = rootDoc.createElement('style');
  head.appendChild(el);
  el.setAttribute('id', id);
  if (option.attrs)
    for (var i in option.attrs) {
      el.setAttribute(i, option.attrs[i]);
    }
  return el
}

var addCSSRule = function (parent, selector, body, node) {
  var isImportRule = /@import/i.test(node.selText);
  var rules = parent.cssRules || parent.rules;
  var index=0;

  var omArr = [];
  var str = node.inline
      ? body.map(function(v) {
        return [node.selText, ' ', v]
      })
      : [[selector, '{', body.join(''), '}']];

  str.forEach(function(text) {
    if (parent.cssRules) {
      try {
        index = isImportRule ? 0 : rules.length;
        parent.appendRule
          ? parent.appendRule(text.join(''))  // keyframes.appendRule return undefined
          : parent.insertRule(text.join(''), index); //firefox <16 also return undefined...

        omArr.push(rules[index]);

      } catch(e) {
        // modern browser with prefix check, now only -webkit-
        // http://shouldiprefix.com/#animations
        // if(selector && selector.indexOf('@keyframes')==0) for(var ret, i = 0, len = cssPrefixes.length; i < len; i++) {
        //   ret = addCSSRule(parent, selector.replace('@keyframes', '@-'+cssPrefixes[i].toLowerCase()+'-keyframes'), body, node)
        //   if(ret.length) return ret
        // }
        // the rule is not supported, fail silently
        // console.log(e, selector, body, pos)
      }
    } else if (parent.addRule) {
[].concat(selector).forEach(function (sel) {
        try {
          // remove ALL @-rule support for old IE
          if(isImportRule) {
            index = parent.addImport(text[2]);
            omArr.push(parent.imports[index]);

            // IE addPageRule() return: not implemented!!!!
            // } else if (/@page/.test(sel)) {
            //   index = parent.addPageRule(sel, text[2], -1)
            //   omArr.push(rules[rules.length-1])

          } else if (!/^\s*@/.test(sel)) {
            parent.addRule(sel, text[2], rules.length);
            // old IE have bug: addRule will always return -1!!!
            omArr.push(rules[rules.length-1]);
          }
        } catch(e) {
          // console.log(e, selector, body)
        }
      });
    }
  });

  return omArr
};

function getBodyCss (node) {
  // get cssText from prop
  var prop = node.prop;
  return Object.keys(prop).map(function (k) {
    // skip $prop, e.g. $id, $order
    if(k[0]=='$') return ''
    for (var v, ret='', i = prop[k].length; i--;) {
      v = prop[k][i];

      // value expand & merge should be done as value function/plugin in cssobj-core >=0.5.0
      ret += node.inline ? k : prefixProp(k, true) + ':' + v + ';';
    }
    return ret
  })
}

// vendor prefix support
// borrowed from jQuery 1.12
var	cssPrefixes = [ "Webkit", "Moz", "ms", "O" ];
var cssPrefixesReg = new RegExp('^(?:' + cssPrefixes.join('|') + ')[A-Z]');
var	emptyStyle = document.createElement( "div" ).style;
var testProp  = function (list) {
  for(var i = list.length; i--;) {
    if(list[i] in emptyStyle) return list[i]
  }
};

//
/**
 * cache cssProps
 * the value is JS format, will be used:
 * 1. diff & patch properties for CSSOM
 * 2. vendorPrefix property name checking
 */
var	cssProps = {
  // normalize float css property
  'float': testProp(['styleFloat', 'cssFloat', 'float'])
};


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

  // shortcut for names that are not vendor prefixed
  // when name already have '-' as first char, don't prefix
  if ( name in emptyStyle || name[0] == '-') return

  // check for vendor prefixed names
  var preName, capName = capitalize(name);
  var i = cssPrefixes.length;

  while ( i-- ) {
    preName = cssPrefixes[ i ] + capName;
    if ( preName in emptyStyle ) return preName
  }
}

// apply prop to get right vendor prefix
// inCSS false=camelcase; true=dashed
function prefixProp (name, inCSS) {
  // $prop will skip
  if(name[0]=='$') return ''
  // find name and cache the name for next time use
  var retName = cssProps[ name ] ||
      ( cssProps[ name ] = vendorPropName( name ) || name);
  return inCSS   // if hasPrefix in prop
    ? dashify(cssPrefixesReg.test(retName) ? capitalize(retName) : name=='float' && name || retName)  // fix float in CSS, avoid return cssFloat
  : retName
}

/**
 * Get value and important flag from value str
 * @param {CSSStyleRule} rule css style rule object
 * @param {string} prop prop to set
 * @param {string} val value string
 */
function setCSSProperty (styleObj, prop, val) {
  var value;
  var important = /^(.*)!(important)\s*$/i.exec(val);
  var propCamel = prefixProp(prop);
  var propDash = prefixProp(prop, true);
  if(important) {
    value = important[1];
    important = important[2];
    if(styleObj.setProperty) styleObj.setProperty(propDash, value, important);
    else {
      // for old IE, cssText is writable, and below is valid for contain !important
      // don't use styleObj.setAttribute since it's not set important
      // should do: delete styleObj[propCamel], but not affect result

      // only work on <= IE8: s.style['FONT-SIZE'] = '12px!important'
      styleObj[propDash.toUpperCase()] = val;
      // refresh cssText, the whole rule!
      styleObj.cssText = styleObj.cssText;
    }
  } else {
    styleObj[propCamel] = val;
  }
}

function cssobj_plugin_post_cssom (option) {
  option = option || {};

  // prefixes array can change the global default vendor prefixes
  if(option.vendors) cssPrefixes = option.vendors;

  var id = option.id || 'cssobj' + random();

  var frame = option.frame;
  var rootDoc = frame ? frame.contentDocument||frame.contentWindow.document : document;
  var dom = createDOM(rootDoc, id, option);
  var sheet = dom.sheet || dom.styleSheet;

  // sheet.insertRule ("@import url('test.css');", 0)  // it's ok to insert @import, but only at top
  // sheet.insertRule ("@charset 'UTF-8';", 0)  // throw SyntaxError https://www.w3.org/Bugs/Public/show_bug.cgi?id=22207

  // IE has a bug, first comma rule not work! insert a dummy here
  // addCSSRule(sheet, 'html,body', [], {})

  // helper regexp & function
  // @page in FF not allowed pseudo @page :first{}, with SyntaxError: An invalid or illegal string was specified
  var reWholeRule = /page/i;
  var atomGroupRule = function (node) {
    return !node ? false : reWholeRule.test(node.at) || node.parentRule && reWholeRule.test(node.parentRule.at)
  };

  var getParent = function (node) {
    var p = 'omGroup' in node ? node : node.parentRule;
    return p && p.omGroup || sheet
  };

  var validParent = function (node) {
    return !node.parentRule || node.parentRule.omGroup !== null
  };

  var removeRule = function(parent, rule, index) {
    return parent.deleteRule
        ? parent.deleteRule(rule.keyText || index)
        : parent.removeRule(index)
  };

  var clearRoot = function (root) {
    var rules = root.cssRules || root.rules;
    // console.log('clearRoot', sheet, rules)
    for(var i=rules.length; i--;){
      removeRule(root, rules[i], i);
      // console.log('clear rule', i, rules[i])
    }
  };
  var removeOneRule = function (rule) {
    if (!rule) return
    var parent = rule.parentRule || sheet;
    var rules = parent.cssRules || parent.rules;
    var removeFunc = function (v, i) {
      if((v===rule)) {
        removeRule(parent, rule, i);
        return true
      }
    }
    // sheet.imports have bugs in IE:
    // > sheet.removeImport(0)  it's work, then again
    // > sheet.removeImport(0)  it's not work!!!
    //
    // parent.imports && [].some.call(parent.imports, removeFunc)
    ;[].some.call(rules, removeFunc);
  };

  function removeNode (node) {
    // remove mediaStore for old IE
    var groupIdx = mediaStore.indexOf(node);
    if (groupIdx > -1) {
      // before remove from mediaStore
      // don't forget to remove all children, by a walk
      node.mediaEnabled = false;
      walk(node);
      mediaStore.splice(groupIdx, 1);
    }
[node.omGroup].concat(node.omRule).forEach(removeOneRule);
  }

  // helper function for addNormalrule
  var addNormalRule = function (node, selText, cssText) {
    if(!cssText) return
    // get parent to add
    var parent = getParent(node);
    var parentRule = node.parentRule;
    if (validParent(node))
      return node.omRule = addCSSRule(parent, selText, cssText, node)
    else if (parentRule) {
      // for old IE not support @media, check mediaEnabled, add child nodes
      if (parentRule.mediaEnabled) {
        [].concat(node.omRule).forEach(removeOneRule);
        return node.omRule = addCSSRule(parent, selText, cssText, node)
      } else if (node.omRule) {
        node.omRule.forEach(removeOneRule);
        delete node.omRule;
      }
    }
  };

  var mediaStore = [];

  var checkMediaList = function () {
    mediaStore.forEach(function (v) {
      v.mediaEnabled = v.mediaTest(rootDoc);
      walk(v);
    });
  };

  if (window.attachEvent) {
    window.attachEvent('onresize', checkMediaList);
  } else if (window.addEventListener) {
    window.addEventListener('resize', checkMediaList, true);
  }

  var walk = function (node, store) {
    if (!node) return

    // cssobj generate vanilla Array, it's safe to use constructor, fast
    if (node.constructor === Array) return node.map(function (v) {walk(v, store);})

    // skip $key node
    if(node.key && node.key[0]=='$' || !node.prop) return

    // nested media rule will pending proceed
    if(node.at=='media' && node.selParent && node.selParent.postArr) {
      return node.selParent.postArr.push(node)
    }

    node.postArr = [];
    var children = node.children;
    var isGroup = node.type == 'group';

    if (atomGroupRule(node)) store = store || [];

    if (isGroup) {
      // if it's not @page, @keyframes (which is not groupRule in fact)
      if (!atomGroupRule(node)) {
        var $groupTest = node.obj.$groupTest;
        var presetMedia = node.at=='media' && option.media;
        if ($groupTest || presetMedia) {
          // console.log('start test media', presetMedia, $groupTest)
          node.omGroup = null;
        // when add media rule failed, build test function then check on window.resize
        // if (!old) {
          // build test function from @media rule

          var mediaTest = $groupTest 
          || (presetMedia && function(doc) {
              var media = option.media;
              return media ? node.selPart.some(function(part){
                return new RegExp(media, 'i').test(part.trim())
              }) : true
            })
          || function(){return true};

          try {
            // first test if it's valid function
            var mediaEnabled = mediaTest(rootDoc);
            node.mediaTest = mediaTest;
            node.mediaEnabled = mediaEnabled;
            mediaStore.push(node);
          } catch(e) {}
        // }

        } else {
          
          [''].concat(cssPrefixes).some(function (v) {
            return node.omGroup = addCSSRule(
              // all groupRule will be added to root sheet
              sheet,
              '@' + (v ? '-' + v.toLowerCase() + '-' : v) + node.groupText.slice(1), [], node
            ).pop() || null
          });
        }

      }
    }

    var selText = node.selTextPart;
    var cssText = getBodyCss(node);

    // it's normal css rule
    if (cssText.join('')) {
      if (!atomGroupRule(node)) {
        addNormalRule(node, selText, cssText);
      }
      store && store.push(selText ? selText + ' {' + cssText.join('') + '}' : cssText);
    }

    for (var c in children) {
      // empty key will pending proceed
      if (c === '') node.postArr.push(children[c]);
      else walk(children[c], store);
    }

    if (isGroup) {
      // if it's @page, @keyframes
      if (atomGroupRule(node) && validParent(node)) {
        addNormalRule(node, node.groupText, store);
        store = null;
      }
    }

    // media rules need a stand alone block
    var postArr = node.postArr;
    delete node.postArr;
    postArr.map(function (v) {
      walk(v, store);
    });
  };

  var prevMedia = option.media;
  return {
    post: function (result) {
      var mediaChanged = prevMedia!=option.media;
      prevMedia = option.media;
      checkMediaList();

      result.set = function(cssPath, newObj){
        var path = Array.isArray(cssPath) ? cssPath : [cssPath];
        var srcObj = result.obj;
        if(isString(path[0]) && path[0][0]==='$') {
          srcObj = result.ref[path.shift().slice(1)].obj;
        }
        var ret = objGetObj( srcObj, path );
        if(ret.ok){
          assign(ret.obj, newObj);
        }
        result.update();
      };

      result.cssdom = dom;
      if (!result.diff || mediaChanged) {
        // it's first time render
        if(mediaChanged) {
          // if media changed, reinit, clear all rules
          // console.log('clearRoot', prevMedia, option.media)
          mediaStore = [];
          clearRoot(sheet);
        }
        walk(result.root);
      } else {
        // it's not first time, patch the diff result to CSSOM
        var diff = result.diff;

        // node added
        if (diff.added) diff.added.forEach(function (node) {
          walk(node);
        });

        // node removed
        if (diff.removed) diff.removed.forEach(function (node) {
          // also remove all child group & sel
          node.selChild && node.selChild.forEach(removeNode);
          removeNode(node);
        });

        // node changed, find which part should be patched
        if (diff.changed) diff.changed.forEach(function (node) {
          var om = node.omRule;
          var diff = node.diff;

          if (!om) om = addNormalRule(node, node.selTextPart, getBodyCss(node))

          // added have same action as changed, can be merged... just for clarity
          ;[].concat(diff.added, diff.changed).forEach(function (v) {
            v && om && om.forEach(function (rule) {
              try{
                setCSSProperty(rule.style, v, node.prop[v][0]);
              }catch(e){}
            });
          });

          diff.removed && diff.removed.forEach(function (v) {
            var prefixV = prefixProp(v, true);
            prefixV && om && om.forEach(function (rule) {
              try{
                rule.style.removeProperty
                  ? rule.style.removeProperty(prefixV)
                  : rule.style.removeAttribute(prefixV);
              }catch(e){}
            });
          });
        });
      }

      return result
    }
  }
}

// cssobj plugin

var classNameRe = /[ \~\\@$%^&\*\(\)\+\=,/';\:"?><[\]\\{}|`]/;

function cssobj_plugin_selector_localize(option) {

  option = option || {};

  var space = option.space = typeof option.space!=='string'
      ? (typeof option.random == 'function' ?  option.random() : random())
      : option.space;

  var localNames = option.localNames = option.localNames || {};

  var localize = function(name) {
    return name[0]=='!'
      ? name.substr(1)
      : (name in localNames
         ? localNames[name]
         : name + space)
  };

  var parseSel = function(str) {
    if(!isString(str)) return str
    var part = splitSelector(str, '.', true);
    var sel=part[0];
    for(var i = 1, p, pos, len = part.length; i < len; i++) {
      p = part[i];
      if(!p) {
        sel += '.';
        continue
      }
      pos = p.search(classNameRe);
      sel += '.' + (pos<0 ? localize(p) : localize(p.substr(0,pos)) + p.substr(pos));
    }
    return sel
  };

  var mapClass = function(str) {
    return isString(str)
      ? parseSel(str.replace(/\s+\.?/g, '.').replace(/^([^:\s.])/i, '.$1')).replace(/\./g, ' ').trim()
      : str
  };

  var setResult = function(result) {
    result.space = space;
    result.localNames = localNames;
    result.mapSel = parseSel;
    result.mapClass = mapClass;
    return result
  };

  return {
    selector: function localizeName (sel, node, result) {
      // don't touch at rule's selText
      // it's copied from parent, which already localized
      if(node.at) return sel
      if(!result.mapSel) setResult(result);
      return parseSel(sel)
    },
    post: setResult
  }
}

// cssobj is simply an intergration for cssobj-core, cssom

function cssobj$1 (obj, config, state) {
  config = config || {};

  var local = config.local;
  config.local = !local
    ? {space: ''}
  : local && typeof local === 'object' ? local : {};

  config.plugins = [].concat(
    config.plugins || [],
    cssobj_plugin_selector_localize(config.local),
    cssobj_plugin_post_cssom(config.cssom)
  );

  return cssobj(config)(obj, state)
}

cssobj$1.version = '1.3.6';

// COMPONENT
class Component extends HTMLElement {
    constructor() {
        super();
        /**
         * Map between event names (received from Matlab) and their callback functions
         * @type {{[key: string]: Function}}
         */
        this.subscriptions = {};
        this.subscribe("wb__dirty_prop", (data) => { this.setDirtyProperty(data); });
        this.cssResult = cssobj$1({ ".styleable": {} }, { local: true });
        this.classList.add(this.cssResult.mapClass(".styleable"));
    }
    /**
     * Send an event to Matlab
     * @param {string} name The name of the event
     * @param {any} data Any information shared with Matlab
     */
    publish(name, data) {
        connector$1.publish(this.id, { name: name, data: data });
    }
    /**
     * Execute the specified callback whenever an event is received from Matlab
     * @param {string} name The name of the event
     * @param {Function} callback The function to be executed upon receiving the event
     */
    subscribe(name, callback) {
        this.subscriptions[name] = callback;
    }
    /**
     * Call the individual setter of all the properties marked as dirty (stained) in Maltab
     * @param {{ name: string, value:any }} prop
     */
    setDirtyProperty(prop) {
        this[prop.name] = prop.value;
    }
    /**
     * Upon receiving an event, checks if the component is subscribed to it and, if it is,
     * executes the stored callback
     * @param {string} name
     * @param {any} data
     */
    handleEvent(name, data) {
        if (this.subscriptions[name] !== undefined) {
            this.subscriptions[name](data);
        }
    }
    /**
     * Update the style of the element
     * @param {any} s The style from matlab
     */
    set css_style(s) {
        this.cssResult.update({ ".styleable": s });
    }
}

/**
 * Dynamically import the component in JS mapped to the Matlab class passed
 * as an inpur argument
 * @param {string} className
 * @returns {Promise<{default: typeof Component}|undefined>}
 */
function mapComponent(className) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (className) {
            case 'weblab.components.Tree':
                return yield import('./index-4a9bbf45.js').then(function (n) { return n.i; });
            case 'weblab.components.TagBar':
                return yield import('./index-9ccaa4cc.js');
            case 'weblab.components.TagFilterTree':
                return yield import('./index-2426ba64.js');
            default:
                return;
        }
    });
}

class ComponentContainer extends Component {
    constructor() {
        super();
        /**
         * Children components from this container
         * @type {Array<Component>}
         */
        this.components = [];
        this.subscribe("wb__insert", (data) => {
            this.insertComponent(data);
        });
        this.subscribe("wb__childevent", (ev) => {
            let src = this.components.find((e) => { return e.id === ev.id; });
            if (src) {
                src.handleEvent(ev.name, ev.data);
            }
        });
    }
    /**
     * Append an existing element into the container
     * @param {Component} el The element added to the component
     */
    appendComponent(el) {
        this.appendChild(el);
        this.components.push(el);
        connector$1.register(el);
    }
    /**
     * Dynamically insert a new component
     * @async
     * @param {{id:string, class:string}} data Object containing the id and class of the inserted element
     * @returns {Promise<Component>} A promise resolving to the inserted element
     */
    insertComponent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            connector$1.preregister(data.id);
            const myImport = yield mapComponent(data.class);
            if (myImport) {
                let el = new (myImport.default)();
                el.id = data.id;
                this.appendComponent(el);
                return el;
            }
        });
    }
}

// FRAME
class Frame extends ComponentContainer {
}
customElements.define('weblab-frame', Frame);

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "body {\n    margin: 0;\n}\n\nweblab-frame {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 1fr;\n    margin: 0;\n    padding: 0;\n}";
n(css,{});

let frame = new Frame();
frame.id = "wb__frame";
connector$1.register(frame);
document.body.appendChild(frame);
window["setup"] = function (html) {
    connector$1.setup(html);
};

export { ComponentContainer as C, __classPrivateFieldGet as _, _baseGetTag as a, _root as b, isObjectLike_1 as c, debounce$1 as d, _freeGlobal as e, _Symbol as f, getDefaultExportFromCjs as g, isSymbol_1 as h, isObject_1 as i, Component as j, __classPrivateFieldSet as k, commonjsGlobal as l, n };
