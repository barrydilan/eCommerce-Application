import {
  SHOULD_AUTOBATCH,
  T,
  cn,
  combineReducers,
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  defaultMemoize,
  e,
  immer_esm_default,
  init_es,
  init_immer_esm,
  init_redux_toolkit_esm,
  isAllOf,
  isAnyOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isPlainObject,
  isRejected,
  isRejectedWithValue,
  nanoid,
  pn,
  prepareAutoBatched,
  r,
  t
} from "./chunk-2BCGTG6O.js";
import {
  __esm,
  __export
} from "./chunk-ROME4SDB.js";

// node_modules/@reduxjs/toolkit/dist/query/rtk-query.esm.js
var rtk_query_esm_exports = {};
__export(rtk_query_esm_exports, {
  QueryStatus: () => QueryStatus,
  buildCreateApi: () => buildCreateApi,
  copyWithStructuralSharing: () => copyWithStructuralSharing,
  coreModule: () => coreModule,
  createApi: () => createApi,
  defaultSerializeQueryArgs: () => defaultSerializeQueryArgs,
  fakeBaseQuery: () => fakeBaseQuery,
  fetchBaseQuery: () => fetchBaseQuery,
  retry: () => retry,
  setupListeners: () => setupListeners,
  skipSelector: () => skipSelector,
  skipToken: () => skipToken
});
function getRequestStatusFlags(status) {
  return {
    status,
    isUninitialized: status === QueryStatus.uninitialized,
    isLoading: status === QueryStatus.pending,
    isSuccess: status === QueryStatus.fulfilled,
    isError: status === QueryStatus.rejected
  };
}
function isAbsoluteUrl(url) {
  return new RegExp("(^|:)//").test(url);
}
function joinUrls(base, url) {
  if (!base) {
    return url;
  }
  if (!url) {
    return base;
  }
  if (isAbsoluteUrl(url)) {
    return url;
  }
  var delimiter = base.endsWith("/") || !url.startsWith("?") ? "/" : "";
  base = withoutTrailingSlash(base);
  url = withoutLeadingSlash(url);
  return "" + base + delimiter + url;
}
function isOnline() {
  return typeof navigator === "undefined" ? true : navigator.onLine === void 0 ? true : navigator.onLine;
}
function isDocumentVisible() {
  if (typeof document === "undefined") {
    return true;
  }
  return document.visibilityState !== "hidden";
}
function copyWithStructuralSharing(oldObj, newObj) {
  if (oldObj === newObj || !(isPlainObject2(oldObj) && isPlainObject2(newObj) || Array.isArray(oldObj) && Array.isArray(newObj))) {
    return newObj;
  }
  var newKeys = Object.keys(newObj);
  var oldKeys = Object.keys(oldObj);
  var isSameObject = newKeys.length === oldKeys.length;
  var mergeObj = Array.isArray(newObj) ? [] : {};
  for (var _j = 0, newKeys_1 = newKeys; _j < newKeys_1.length; _j++) {
    var key = newKeys_1[_j];
    mergeObj[key] = copyWithStructuralSharing(oldObj[key], newObj[key]);
    if (isSameObject)
      isSameObject = oldObj[key] === mergeObj[key];
  }
  return isSameObject ? oldObj : mergeObj;
}
function stripUndefined(obj) {
  if (!isPlainObject(obj)) {
    return obj;
  }
  var copy = __spreadValues({}, obj);
  for (var _j = 0, _k = Object.entries(copy); _j < _k.length; _j++) {
    var _l = _k[_j], k = _l[0], v = _l[1];
    if (v === void 0)
      delete copy[k];
  }
  return copy;
}
function fetchBaseQuery(_a) {
  var _this = this;
  if (_a === void 0) {
    _a = {};
  }
  var _b = _a, baseUrl = _b.baseUrl, _j = _b.prepareHeaders, prepareHeaders = _j === void 0 ? function(x) {
    return x;
  } : _j, _k = _b.fetchFn, fetchFn = _k === void 0 ? defaultFetchFn : _k, paramsSerializer = _b.paramsSerializer, _l = _b.isJsonContentType, isJsonContentType = _l === void 0 ? defaultIsJsonContentType : _l, _m = _b.jsonContentType, jsonContentType = _m === void 0 ? "application/json" : _m, jsonReplacer = _b.jsonReplacer, defaultTimeout = _b.timeout, globalResponseHandler = _b.responseHandler, globalValidateStatus = _b.validateStatus, baseFetchOptions = __objRest(_b, [
    "baseUrl",
    "prepareHeaders",
    "fetchFn",
    "paramsSerializer",
    "isJsonContentType",
    "jsonContentType",
    "jsonReplacer",
    "timeout",
    "responseHandler",
    "validateStatus"
  ]);
  if (typeof fetch === "undefined" && fetchFn === defaultFetchFn) {
    console.warn("Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments.");
  }
  return function(arg, api) {
    return __async(_this, null, function() {
      var signal, getState, extra, endpoint, forced, type, meta, _a2, url, _j2, headers, _k2, params, _l2, responseHandler, _m2, validateStatus, _o, timeout, rest, config, _p, isJsonifiable, divider, query, request, requestClone, response, timedOut, timeoutId, e_1, responseClone, resultData, responseText, handleResponseError_1, e_2;
      return __generator(this, function(_q) {
        switch (_q.label) {
          case 0:
            signal = api.signal, getState = api.getState, extra = api.extra, endpoint = api.endpoint, forced = api.forced, type = api.type;
            _a2 = typeof arg == "string" ? { url: arg } : arg, url = _a2.url, _j2 = _a2.headers, headers = _j2 === void 0 ? new Headers(baseFetchOptions.headers) : _j2, _k2 = _a2.params, params = _k2 === void 0 ? void 0 : _k2, _l2 = _a2.responseHandler, responseHandler = _l2 === void 0 ? globalResponseHandler != null ? globalResponseHandler : "json" : _l2, _m2 = _a2.validateStatus, validateStatus = _m2 === void 0 ? globalValidateStatus != null ? globalValidateStatus : defaultValidateStatus : _m2, _o = _a2.timeout, timeout = _o === void 0 ? defaultTimeout : _o, rest = __objRest(_a2, [
              "url",
              "headers",
              "params",
              "responseHandler",
              "validateStatus",
              "timeout"
            ]);
            config = __spreadValues(__spreadProps(__spreadValues({}, baseFetchOptions), {
              signal
            }), rest);
            headers = new Headers(stripUndefined(headers));
            _p = config;
            return [4, prepareHeaders(headers, {
              getState,
              extra,
              endpoint,
              forced,
              type
            })];
          case 1:
            _p.headers = _q.sent() || headers;
            isJsonifiable = function(body) {
              return typeof body === "object" && (isPlainObject(body) || Array.isArray(body) || typeof body.toJSON === "function");
            };
            if (!config.headers.has("content-type") && isJsonifiable(config.body)) {
              config.headers.set("content-type", jsonContentType);
            }
            if (isJsonifiable(config.body) && isJsonContentType(config.headers)) {
              config.body = JSON.stringify(config.body, jsonReplacer);
            }
            if (params) {
              divider = ~url.indexOf("?") ? "&" : "?";
              query = paramsSerializer ? paramsSerializer(params) : new URLSearchParams(stripUndefined(params));
              url += divider + query;
            }
            url = joinUrls(baseUrl, url);
            request = new Request(url, config);
            requestClone = request.clone();
            meta = { request: requestClone };
            timedOut = false, timeoutId = timeout && setTimeout(function() {
              timedOut = true;
              api.abort();
            }, timeout);
            _q.label = 2;
          case 2:
            _q.trys.push([2, 4, 5, 6]);
            return [4, fetchFn(request)];
          case 3:
            response = _q.sent();
            return [3, 6];
          case 4:
            e_1 = _q.sent();
            return [2, {
              error: {
                status: timedOut ? "TIMEOUT_ERROR" : "FETCH_ERROR",
                error: String(e_1)
              },
              meta
            }];
          case 5:
            if (timeoutId)
              clearTimeout(timeoutId);
            return [
              7
              /*endfinally*/
            ];
          case 6:
            responseClone = response.clone();
            meta.response = responseClone;
            responseText = "";
            _q.label = 7;
          case 7:
            _q.trys.push([7, 9, , 10]);
            return [4, Promise.all([
              handleResponse(response, responseHandler).then(function(r2) {
                return resultData = r2;
              }, function(e2) {
                return handleResponseError_1 = e2;
              }),
              responseClone.text().then(function(r2) {
                return responseText = r2;
              }, function() {
              })
            ])];
          case 8:
            _q.sent();
            if (handleResponseError_1)
              throw handleResponseError_1;
            return [3, 10];
          case 9:
            e_2 = _q.sent();
            return [2, {
              error: {
                status: "PARSING_ERROR",
                originalStatus: response.status,
                data: responseText,
                error: String(e_2)
              },
              meta
            }];
          case 10:
            return [2, validateStatus(response, resultData) ? {
              data: resultData,
              meta
            } : {
              error: {
                status: response.status,
                data: resultData
              },
              meta
            }];
        }
      });
    });
  };
  function handleResponse(response, responseHandler) {
    return __async(this, null, function() {
      var text;
      return __generator(this, function(_j2) {
        switch (_j2.label) {
          case 0:
            if (typeof responseHandler === "function") {
              return [2, responseHandler(response)];
            }
            if (responseHandler === "content-type") {
              responseHandler = isJsonContentType(response.headers) ? "json" : "text";
            }
            if (!(responseHandler === "json"))
              return [3, 2];
            return [4, response.text()];
          case 1:
            text = _j2.sent();
            return [2, text.length ? JSON.parse(text) : null];
          case 2:
            return [2, response.text()];
        }
      });
    });
  }
}
function defaultBackoff(attempt, maxRetries) {
  if (attempt === void 0) {
    attempt = 0;
  }
  if (maxRetries === void 0) {
    maxRetries = 5;
  }
  return __async(this, null, function() {
    var attempts, timeout;
    return __generator(this, function(_j) {
      switch (_j.label) {
        case 0:
          attempts = Math.min(attempt, maxRetries);
          timeout = ~~((Math.random() + 0.4) * (300 << attempts));
          return [4, new Promise(function(resolve) {
            return setTimeout(function(res) {
              return resolve(res);
            }, timeout);
          })];
        case 1:
          _j.sent();
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function fail(e2) {
  throw Object.assign(new HandledError({ error: e2 }), {
    throwImmediately: true
  });
}
function setupListeners(dispatch, customHandler) {
  function defaultHandler() {
    var handleFocus = function() {
      return dispatch(onFocus());
    };
    var handleFocusLost = function() {
      return dispatch(onFocusLost());
    };
    var handleOnline = function() {
      return dispatch(onOnline());
    };
    var handleOffline = function() {
      return dispatch(onOffline());
    };
    var handleVisibilityChange = function() {
      if (window.document.visibilityState === "visible") {
        handleFocus();
      } else {
        handleFocusLost();
      }
    };
    if (!initialized) {
      if (typeof window !== "undefined" && window.addEventListener) {
        window.addEventListener("visibilitychange", handleVisibilityChange, false);
        window.addEventListener("focus", handleFocus, false);
        window.addEventListener("online", handleOnline, false);
        window.addEventListener("offline", handleOffline, false);
        initialized = true;
      }
    }
    var unsubscribe = function() {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      initialized = false;
    };
    return unsubscribe;
  }
  return customHandler ? customHandler(dispatch, { onFocus, onFocusLost, onOffline, onOnline }) : defaultHandler();
}
function isQueryDefinition(e2) {
  return e2.type === DefinitionType.query;
}
function isMutationDefinition(e2) {
  return e2.type === DefinitionType.mutation;
}
function calculateProvidedBy(description, result, error, queryArg, meta, assertTagTypes) {
  if (isFunction(description)) {
    return description(result, error, queryArg, meta).map(expandTagDescription).map(assertTagTypes);
  }
  if (Array.isArray(description)) {
    return description.map(expandTagDescription).map(assertTagTypes);
  }
  return [];
}
function isFunction(t2) {
  return typeof t2 === "function";
}
function expandTagDescription(description) {
  return typeof description === "string" ? { type: description } : description;
}
function isNotNullish(v) {
  return v != null;
}
function buildInitiate(_j) {
  var serializeQueryArgs = _j.serializeQueryArgs, queryThunk = _j.queryThunk, mutationThunk = _j.mutationThunk, api = _j.api, context = _j.context;
  var runningQueries = /* @__PURE__ */ new Map();
  var runningMutations = /* @__PURE__ */ new Map();
  var _k = api.internalActions, unsubscribeQueryResult = _k.unsubscribeQueryResult, removeMutationResult = _k.removeMutationResult, updateSubscriptionOptions = _k.updateSubscriptionOptions;
  return {
    buildInitiateQuery,
    buildInitiateMutation,
    getRunningQueryThunk,
    getRunningMutationThunk,
    getRunningQueriesThunk,
    getRunningMutationsThunk,
    getRunningOperationPromises,
    removalWarning
  };
  function removalWarning() {
    throw new Error("This method had to be removed due to a conceptual bug in RTK.\n       Please see https://github.com/reduxjs/redux-toolkit/pull/2481 for details.\n       See https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering for new guidance on SSR.");
  }
  function getRunningOperationPromises() {
    if (typeof process !== "undefined" && true) {
      removalWarning();
    } else {
      var extract = function(v) {
        return Array.from(v.values()).flatMap(function(queriesForStore) {
          return queriesForStore ? Object.values(queriesForStore) : [];
        });
      };
      return __spreadArray(__spreadArray([], extract(runningQueries)), extract(runningMutations)).filter(isNotNullish);
    }
  }
  function getRunningQueryThunk(endpointName, queryArgs) {
    return function(dispatch) {
      var _a;
      var endpointDefinition = context.endpointDefinitions[endpointName];
      var queryCacheKey = serializeQueryArgs({
        queryArgs,
        endpointDefinition,
        endpointName
      });
      return (_a = runningQueries.get(dispatch)) == null ? void 0 : _a[queryCacheKey];
    };
  }
  function getRunningMutationThunk(_endpointName, fixedCacheKeyOrRequestId) {
    return function(dispatch) {
      var _a;
      return (_a = runningMutations.get(dispatch)) == null ? void 0 : _a[fixedCacheKeyOrRequestId];
    };
  }
  function getRunningQueriesThunk() {
    return function(dispatch) {
      return Object.values(runningQueries.get(dispatch) || {}).filter(isNotNullish);
    };
  }
  function getRunningMutationsThunk() {
    return function(dispatch) {
      return Object.values(runningMutations.get(dispatch) || {}).filter(isNotNullish);
    };
  }
  function middlewareWarning(dispatch) {
    if (true) {
      if (middlewareWarning.triggered)
        return;
      var registered = dispatch(api.internalActions.internal_probeSubscription({
        queryCacheKey: "DOES_NOT_EXIST",
        requestId: "DUMMY_REQUEST_ID"
      }));
      middlewareWarning.triggered = true;
      if (typeof registered !== "boolean") {
        throw new Error('Warning: Middleware for RTK-Query API at reducerPath "' + api.reducerPath + '" has not been added to the store.\nYou must add the middleware for RTK-Query to function correctly!');
      }
    }
  }
  function buildInitiateQuery(endpointName, endpointDefinition) {
    var queryAction = function(arg, _j2) {
      var _k2 = _j2 === void 0 ? {} : _j2, _l = _k2.subscribe, subscribe = _l === void 0 ? true : _l, forceRefetch = _k2.forceRefetch, subscriptionOptions = _k2.subscriptionOptions, _m = forceQueryFnSymbol, forceQueryFn = _k2[_m];
      return function(dispatch, getState) {
        var _j3;
        var _a;
        var queryCacheKey = serializeQueryArgs({
          queryArgs: arg,
          endpointDefinition,
          endpointName
        });
        var thunk = queryThunk((_j3 = {
          type: "query",
          subscribe,
          forceRefetch,
          subscriptionOptions,
          endpointName,
          originalArgs: arg,
          queryCacheKey
        }, _j3[forceQueryFnSymbol] = forceQueryFn, _j3));
        var selector = api.endpoints[endpointName].select(arg);
        var thunkResult = dispatch(thunk);
        var stateAfter = selector(getState());
        middlewareWarning(dispatch);
        var requestId = thunkResult.requestId, abort = thunkResult.abort;
        var skippedSynchronously = stateAfter.requestId !== requestId;
        var runningQuery = (_a = runningQueries.get(dispatch)) == null ? void 0 : _a[queryCacheKey];
        var selectFromState = function() {
          return selector(getState());
        };
        var statePromise = Object.assign(forceQueryFn ? thunkResult.then(selectFromState) : skippedSynchronously && !runningQuery ? Promise.resolve(stateAfter) : Promise.all([runningQuery, thunkResult]).then(selectFromState), {
          arg,
          requestId,
          subscriptionOptions,
          queryCacheKey,
          abort,
          unwrap: function() {
            return __async(this, null, function() {
              var result;
              return __generator(this, function(_j4) {
                switch (_j4.label) {
                  case 0:
                    return [4, statePromise];
                  case 1:
                    result = _j4.sent();
                    if (result.isError) {
                      throw result.error;
                    }
                    return [2, result.data];
                }
              });
            });
          },
          refetch: function() {
            return dispatch(queryAction(arg, { subscribe: false, forceRefetch: true }));
          },
          unsubscribe: function() {
            if (subscribe)
              dispatch(unsubscribeQueryResult({
                queryCacheKey,
                requestId
              }));
          },
          updateSubscriptionOptions: function(options) {
            statePromise.subscriptionOptions = options;
            dispatch(updateSubscriptionOptions({
              endpointName,
              requestId,
              queryCacheKey,
              options
            }));
          }
        });
        if (!runningQuery && !skippedSynchronously && !forceQueryFn) {
          var running_1 = runningQueries.get(dispatch) || {};
          running_1[queryCacheKey] = statePromise;
          runningQueries.set(dispatch, running_1);
          statePromise.then(function() {
            delete running_1[queryCacheKey];
            if (!Object.keys(running_1).length) {
              runningQueries.delete(dispatch);
            }
          });
        }
        return statePromise;
      };
    };
    return queryAction;
  }
  function buildInitiateMutation(endpointName) {
    return function(arg, _j2) {
      var _k2 = _j2 === void 0 ? {} : _j2, _l = _k2.track, track = _l === void 0 ? true : _l, fixedCacheKey = _k2.fixedCacheKey;
      return function(dispatch, getState) {
        var thunk = mutationThunk({
          type: "mutation",
          endpointName,
          originalArgs: arg,
          track,
          fixedCacheKey
        });
        var thunkResult = dispatch(thunk);
        middlewareWarning(dispatch);
        var requestId = thunkResult.requestId, abort = thunkResult.abort, unwrap = thunkResult.unwrap;
        var returnValuePromise = thunkResult.unwrap().then(function(data) {
          return { data };
        }).catch(function(error) {
          return { error };
        });
        var reset = function() {
          dispatch(removeMutationResult({ requestId, fixedCacheKey }));
        };
        var ret = Object.assign(returnValuePromise, {
          arg: thunkResult.arg,
          requestId,
          abort,
          unwrap,
          unsubscribe: reset,
          reset
        });
        var running = runningMutations.get(dispatch) || {};
        runningMutations.set(dispatch, running);
        running[requestId] = ret;
        ret.then(function() {
          delete running[requestId];
          if (!Object.keys(running).length) {
            runningMutations.delete(dispatch);
          }
        });
        if (fixedCacheKey) {
          running[fixedCacheKey] = ret;
          ret.then(function() {
            if (running[fixedCacheKey] === ret) {
              delete running[fixedCacheKey];
              if (!Object.keys(running).length) {
                runningMutations.delete(dispatch);
              }
            }
          });
        }
        return ret;
      };
    };
  }
}
function defaultTransformResponse(baseQueryReturnValue) {
  return baseQueryReturnValue;
}
function buildThunks(_j) {
  var _this = this;
  var reducerPath = _j.reducerPath, baseQuery = _j.baseQuery, endpointDefinitions = _j.context.endpointDefinitions, serializeQueryArgs = _j.serializeQueryArgs, api = _j.api;
  var patchQueryData = function(endpointName, args, patches) {
    return function(dispatch) {
      var endpointDefinition = endpointDefinitions[endpointName];
      dispatch(api.internalActions.queryResultPatched({
        queryCacheKey: serializeQueryArgs({
          queryArgs: args,
          endpointDefinition,
          endpointName
        }),
        patches
      }));
    };
  };
  var updateQueryData = function(endpointName, args, updateRecipe) {
    return function(dispatch, getState) {
      var _j2, _k;
      var currentState = api.endpoints[endpointName].select(args)(getState());
      var ret = {
        patches: [],
        inversePatches: [],
        undo: function() {
          return dispatch(api.util.patchQueryData(endpointName, args, ret.inversePatches));
        }
      };
      if (currentState.status === QueryStatus.uninitialized) {
        return ret;
      }
      if ("data" in currentState) {
        if (t(currentState.data)) {
          var _l = cn(currentState.data, updateRecipe), patches = _l[1], inversePatches = _l[2];
          (_j2 = ret.patches).push.apply(_j2, patches);
          (_k = ret.inversePatches).push.apply(_k, inversePatches);
        } else {
          var value = updateRecipe(currentState.data);
          ret.patches.push({ op: "replace", path: [], value });
          ret.inversePatches.push({
            op: "replace",
            path: [],
            value: currentState.data
          });
        }
      }
      dispatch(api.util.patchQueryData(endpointName, args, ret.patches));
      return ret;
    };
  };
  var upsertQueryData = function(endpointName, args, value) {
    return function(dispatch) {
      var _j2;
      return dispatch(api.endpoints[endpointName].initiate(args, (_j2 = {
        subscribe: false,
        forceRefetch: true
      }, _j2[forceQueryFnSymbol] = function() {
        return {
          data: value
        };
      }, _j2)));
    };
  };
  var executeEndpoint = function(_0, _1) {
    return __async(_this, [_0, _1], function(arg, _j2) {
      var endpointDefinition, transformResponse, result, baseQueryApi_1, forceQueryFn, what, err, _k, _l, key, _m, error_1, catchedError, transformErrorResponse, _o, e_4;
      var _p, _q;
      var signal = _j2.signal, abort = _j2.abort, rejectWithValue = _j2.rejectWithValue, fulfillWithValue = _j2.fulfillWithValue, dispatch = _j2.dispatch, getState = _j2.getState, extra = _j2.extra;
      return __generator(this, function(_r) {
        switch (_r.label) {
          case 0:
            endpointDefinition = endpointDefinitions[arg.endpointName];
            _r.label = 1;
          case 1:
            _r.trys.push([1, 8, , 13]);
            transformResponse = defaultTransformResponse;
            result = void 0;
            baseQueryApi_1 = {
              signal,
              abort,
              dispatch,
              getState,
              extra,
              endpoint: arg.endpointName,
              type: arg.type,
              forced: arg.type === "query" ? isForcedQuery(arg, getState()) : void 0
            };
            forceQueryFn = arg.type === "query" ? arg[forceQueryFnSymbol] : void 0;
            if (!forceQueryFn)
              return [3, 2];
            result = forceQueryFn();
            return [3, 6];
          case 2:
            if (!endpointDefinition.query)
              return [3, 4];
            return [4, baseQuery(endpointDefinition.query(arg.originalArgs), baseQueryApi_1, endpointDefinition.extraOptions)];
          case 3:
            result = _r.sent();
            if (endpointDefinition.transformResponse) {
              transformResponse = endpointDefinition.transformResponse;
            }
            return [3, 6];
          case 4:
            return [4, endpointDefinition.queryFn(arg.originalArgs, baseQueryApi_1, endpointDefinition.extraOptions, function(arg2) {
              return baseQuery(arg2, baseQueryApi_1, endpointDefinition.extraOptions);
            })];
          case 5:
            result = _r.sent();
            _r.label = 6;
          case 6:
            if (typeof process !== "undefined" && true) {
              what = endpointDefinition.query ? "`baseQuery`" : "`queryFn`";
              err = void 0;
              if (!result) {
                err = what + " did not return anything.";
              } else if (typeof result !== "object") {
                err = what + " did not return an object.";
              } else if (result.error && result.data) {
                err = what + " returned an object containing both `error` and `result`.";
              } else if (result.error === void 0 && result.data === void 0) {
                err = what + " returned an object containing neither a valid `error` and `result`. At least one of them should not be `undefined`";
              } else {
                for (_k = 0, _l = Object.keys(result); _k < _l.length; _k++) {
                  key = _l[_k];
                  if (key !== "error" && key !== "data" && key !== "meta") {
                    err = "The object returned by " + what + " has the unknown property " + key + ".";
                    break;
                  }
                }
              }
              if (err) {
                console.error("Error encountered handling the endpoint " + arg.endpointName + ".\n              " + err + "\n              It needs to return an object with either the shape `{ data: <value> }` or `{ error: <value> }` that may contain an optional `meta` property.\n              Object returned was:", result);
              }
            }
            if (result.error)
              throw new HandledError(result.error, result.meta);
            _m = fulfillWithValue;
            return [4, transformResponse(result.data, result.meta, arg.originalArgs)];
          case 7:
            return [2, _m.apply(void 0, [_r.sent(), (_p = {
              fulfilledTimeStamp: Date.now(),
              baseQueryMeta: result.meta
            }, _p[SHOULD_AUTOBATCH] = true, _p)])];
          case 8:
            error_1 = _r.sent();
            catchedError = error_1;
            if (!(catchedError instanceof HandledError))
              return [3, 12];
            transformErrorResponse = defaultTransformResponse;
            if (endpointDefinition.query && endpointDefinition.transformErrorResponse) {
              transformErrorResponse = endpointDefinition.transformErrorResponse;
            }
            _r.label = 9;
          case 9:
            _r.trys.push([9, 11, , 12]);
            _o = rejectWithValue;
            return [4, transformErrorResponse(catchedError.value, catchedError.meta, arg.originalArgs)];
          case 10:
            return [2, _o.apply(void 0, [_r.sent(), (_q = { baseQueryMeta: catchedError.meta }, _q[SHOULD_AUTOBATCH] = true, _q)])];
          case 11:
            e_4 = _r.sent();
            catchedError = e_4;
            return [3, 12];
          case 12:
            if (typeof process !== "undefined" && true) {
              console.error('An unhandled error occurred processing a request for the endpoint "' + arg.endpointName + '".\nIn the case of an unhandled error, no tags will be "provided" or "invalidated".', catchedError);
            } else {
              console.error(catchedError);
            }
            throw catchedError;
          case 13:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  };
  function isForcedQuery(arg, state) {
    var _a, _b, _c, _d;
    var requestState = (_b = (_a = state[reducerPath]) == null ? void 0 : _a.queries) == null ? void 0 : _b[arg.queryCacheKey];
    var baseFetchOnMountOrArgChange = (_c = state[reducerPath]) == null ? void 0 : _c.config.refetchOnMountOrArgChange;
    var fulfilledVal = requestState == null ? void 0 : requestState.fulfilledTimeStamp;
    var refetchVal = (_d = arg.forceRefetch) != null ? _d : arg.subscribe && baseFetchOnMountOrArgChange;
    if (refetchVal) {
      return refetchVal === true || (Number(/* @__PURE__ */ new Date()) - Number(fulfilledVal)) / 1e3 >= refetchVal;
    }
    return false;
  }
  var queryThunk = createAsyncThunk(reducerPath + "/executeQuery", executeEndpoint, {
    getPendingMeta: function() {
      var _j2;
      return _j2 = { startedTimeStamp: Date.now() }, _j2[SHOULD_AUTOBATCH] = true, _j2;
    },
    condition: function(queryThunkArgs, _j2) {
      var getState = _j2.getState;
      var _a, _b, _c;
      var state = getState();
      var requestState = (_b = (_a = state[reducerPath]) == null ? void 0 : _a.queries) == null ? void 0 : _b[queryThunkArgs.queryCacheKey];
      var fulfilledVal = requestState == null ? void 0 : requestState.fulfilledTimeStamp;
      var currentArg = queryThunkArgs.originalArgs;
      var previousArg = requestState == null ? void 0 : requestState.originalArgs;
      var endpointDefinition = endpointDefinitions[queryThunkArgs.endpointName];
      if (isUpsertQuery(queryThunkArgs)) {
        return true;
      }
      if ((requestState == null ? void 0 : requestState.status) === "pending") {
        return false;
      }
      if (isForcedQuery(queryThunkArgs, state)) {
        return true;
      }
      if (isQueryDefinition(endpointDefinition) && ((_c = endpointDefinition == null ? void 0 : endpointDefinition.forceRefetch) == null ? void 0 : _c.call(endpointDefinition, {
        currentArg,
        previousArg,
        endpointState: requestState,
        state
      }))) {
        return true;
      }
      if (fulfilledVal) {
        return false;
      }
      return true;
    },
    dispatchConditionRejection: true
  });
  var mutationThunk = createAsyncThunk(reducerPath + "/executeMutation", executeEndpoint, {
    getPendingMeta: function() {
      var _j2;
      return _j2 = { startedTimeStamp: Date.now() }, _j2[SHOULD_AUTOBATCH] = true, _j2;
    }
  });
  var hasTheForce = function(options) {
    return "force" in options;
  };
  var hasMaxAge = function(options) {
    return "ifOlderThan" in options;
  };
  var prefetch = function(endpointName, arg, options) {
    return function(dispatch, getState) {
      var force = hasTheForce(options) && options.force;
      var maxAge = hasMaxAge(options) && options.ifOlderThan;
      var queryAction = function(force2) {
        if (force2 === void 0) {
          force2 = true;
        }
        return api.endpoints[endpointName].initiate(arg, { forceRefetch: force2 });
      };
      var latestStateValue = api.endpoints[endpointName].select(arg)(getState());
      if (force) {
        dispatch(queryAction());
      } else if (maxAge) {
        var lastFulfilledTs = latestStateValue == null ? void 0 : latestStateValue.fulfilledTimeStamp;
        if (!lastFulfilledTs) {
          dispatch(queryAction());
          return;
        }
        var shouldRetrigger = (Number(/* @__PURE__ */ new Date()) - Number(new Date(lastFulfilledTs))) / 1e3 >= maxAge;
        if (shouldRetrigger) {
          dispatch(queryAction());
        }
      } else {
        dispatch(queryAction(false));
      }
    };
  };
  function matchesEndpoint(endpointName) {
    return function(action) {
      var _a, _b;
      return ((_b = (_a = action == null ? void 0 : action.meta) == null ? void 0 : _a.arg) == null ? void 0 : _b.endpointName) === endpointName;
    };
  }
  function buildMatchThunkActions(thunk, endpointName) {
    return {
      matchPending: isAllOf(isPending(thunk), matchesEndpoint(endpointName)),
      matchFulfilled: isAllOf(isFulfilled(thunk), matchesEndpoint(endpointName)),
      matchRejected: isAllOf(isRejected(thunk), matchesEndpoint(endpointName))
    };
  }
  return {
    queryThunk,
    mutationThunk,
    prefetch,
    updateQueryData,
    upsertQueryData,
    patchQueryData,
    buildMatchThunkActions
  };
}
function calculateProvidedByThunk(action, type, endpointDefinitions, assertTagType) {
  return calculateProvidedBy(endpointDefinitions[action.meta.arg.endpointName][type], isFulfilled(action) ? action.payload : void 0, isRejectedWithValue(action) ? action.payload : void 0, action.meta.arg.originalArgs, "baseQueryMeta" in action.meta ? action.meta.baseQueryMeta : void 0, assertTagType);
}
function updateQuerySubstateIfExists(state, queryCacheKey, update) {
  var substate = state[queryCacheKey];
  if (substate) {
    update(substate);
  }
}
function getMutationCacheKey(id) {
  var _a;
  return (_a = "arg" in id ? id.arg.fixedCacheKey : id.fixedCacheKey) != null ? _a : id.requestId;
}
function updateMutationSubstateIfExists(state, id, update) {
  var substate = state[getMutationCacheKey(id)];
  if (substate) {
    update(substate);
  }
}
function buildSlice(_j) {
  var reducerPath = _j.reducerPath, queryThunk = _j.queryThunk, mutationThunk = _j.mutationThunk, _k = _j.context, definitions = _k.endpointDefinitions, apiUid = _k.apiUid, extractRehydrationInfo = _k.extractRehydrationInfo, hasRehydrationInfo = _k.hasRehydrationInfo, assertTagType = _j.assertTagType, config = _j.config;
  var resetApiState = createAction(reducerPath + "/resetApiState");
  var querySlice = createSlice({
    name: reducerPath + "/queries",
    initialState,
    reducers: {
      removeQueryResult: {
        reducer: function(draft, _j2) {
          var queryCacheKey = _j2.payload.queryCacheKey;
          delete draft[queryCacheKey];
        },
        prepare: prepareAutoBatched()
      },
      queryResultPatched: function(draft, _j2) {
        var _k2 = _j2.payload, queryCacheKey = _k2.queryCacheKey, patches = _k2.patches;
        updateQuerySubstateIfExists(draft, queryCacheKey, function(substate) {
          substate.data = pn(substate.data, patches.concat());
        });
      }
    },
    extraReducers: function(builder) {
      builder.addCase(queryThunk.pending, function(draft, _j2) {
        var meta = _j2.meta, arg = _j2.meta.arg;
        var _a, _b;
        var upserting = isUpsertQuery(arg);
        if (arg.subscribe || upserting) {
          (_b = draft[_a = arg.queryCacheKey]) != null ? _b : draft[_a] = {
            status: QueryStatus.uninitialized,
            endpointName: arg.endpointName
          };
        }
        updateQuerySubstateIfExists(draft, arg.queryCacheKey, function(substate) {
          substate.status = QueryStatus.pending;
          substate.requestId = upserting && substate.requestId ? substate.requestId : meta.requestId;
          if (arg.originalArgs !== void 0) {
            substate.originalArgs = arg.originalArgs;
          }
          substate.startedTimeStamp = meta.startedTimeStamp;
        });
      }).addCase(queryThunk.fulfilled, function(draft, _j2) {
        var meta = _j2.meta, payload = _j2.payload;
        updateQuerySubstateIfExists(draft, meta.arg.queryCacheKey, function(substate) {
          var _a;
          if (substate.requestId !== meta.requestId && !isUpsertQuery(meta.arg))
            return;
          var merge = definitions[meta.arg.endpointName].merge;
          substate.status = QueryStatus.fulfilled;
          if (merge) {
            if (substate.data !== void 0) {
              var fulfilledTimeStamp_1 = meta.fulfilledTimeStamp, arg_1 = meta.arg, baseQueryMeta_1 = meta.baseQueryMeta, requestId_1 = meta.requestId;
              var newData = immer_esm_default(substate.data, function(draftSubstateData) {
                return merge(draftSubstateData, payload, {
                  arg: arg_1.originalArgs,
                  baseQueryMeta: baseQueryMeta_1,
                  fulfilledTimeStamp: fulfilledTimeStamp_1,
                  requestId: requestId_1
                });
              });
              substate.data = newData;
            } else {
              substate.data = payload;
            }
          } else {
            substate.data = ((_a = definitions[meta.arg.endpointName].structuralSharing) != null ? _a : true) ? copyWithStructuralSharing(r(substate.data) ? e(substate.data) : substate.data, payload) : payload;
          }
          delete substate.error;
          substate.fulfilledTimeStamp = meta.fulfilledTimeStamp;
        });
      }).addCase(queryThunk.rejected, function(draft, _j2) {
        var _k2 = _j2.meta, condition = _k2.condition, arg = _k2.arg, requestId = _k2.requestId, error = _j2.error, payload = _j2.payload;
        updateQuerySubstateIfExists(draft, arg.queryCacheKey, function(substate) {
          if (condition) {
          } else {
            if (substate.requestId !== requestId)
              return;
            substate.status = QueryStatus.rejected;
            substate.error = payload != null ? payload : error;
          }
        });
      }).addMatcher(hasRehydrationInfo, function(draft, action) {
        var queries = extractRehydrationInfo(action).queries;
        for (var _j2 = 0, _k2 = Object.entries(queries); _j2 < _k2.length; _j2++) {
          var _l = _k2[_j2], key = _l[0], entry = _l[1];
          if ((entry == null ? void 0 : entry.status) === QueryStatus.fulfilled || (entry == null ? void 0 : entry.status) === QueryStatus.rejected) {
            draft[key] = entry;
          }
        }
      });
    }
  });
  var mutationSlice = createSlice({
    name: reducerPath + "/mutations",
    initialState,
    reducers: {
      removeMutationResult: {
        reducer: function(draft, _j2) {
          var payload = _j2.payload;
          var cacheKey = getMutationCacheKey(payload);
          if (cacheKey in draft) {
            delete draft[cacheKey];
          }
        },
        prepare: prepareAutoBatched()
      }
    },
    extraReducers: function(builder) {
      builder.addCase(mutationThunk.pending, function(draft, _j2) {
        var meta = _j2.meta, _k2 = _j2.meta, requestId = _k2.requestId, arg = _k2.arg, startedTimeStamp = _k2.startedTimeStamp;
        if (!arg.track)
          return;
        draft[getMutationCacheKey(meta)] = {
          requestId,
          status: QueryStatus.pending,
          endpointName: arg.endpointName,
          startedTimeStamp
        };
      }).addCase(mutationThunk.fulfilled, function(draft, _j2) {
        var payload = _j2.payload, meta = _j2.meta;
        if (!meta.arg.track)
          return;
        updateMutationSubstateIfExists(draft, meta, function(substate) {
          if (substate.requestId !== meta.requestId)
            return;
          substate.status = QueryStatus.fulfilled;
          substate.data = payload;
          substate.fulfilledTimeStamp = meta.fulfilledTimeStamp;
        });
      }).addCase(mutationThunk.rejected, function(draft, _j2) {
        var payload = _j2.payload, error = _j2.error, meta = _j2.meta;
        if (!meta.arg.track)
          return;
        updateMutationSubstateIfExists(draft, meta, function(substate) {
          if (substate.requestId !== meta.requestId)
            return;
          substate.status = QueryStatus.rejected;
          substate.error = payload != null ? payload : error;
        });
      }).addMatcher(hasRehydrationInfo, function(draft, action) {
        var mutations = extractRehydrationInfo(action).mutations;
        for (var _j2 = 0, _k2 = Object.entries(mutations); _j2 < _k2.length; _j2++) {
          var _l = _k2[_j2], key = _l[0], entry = _l[1];
          if (((entry == null ? void 0 : entry.status) === QueryStatus.fulfilled || (entry == null ? void 0 : entry.status) === QueryStatus.rejected) && key !== (entry == null ? void 0 : entry.requestId)) {
            draft[key] = entry;
          }
        }
      });
    }
  });
  var invalidationSlice = createSlice({
    name: reducerPath + "/invalidation",
    initialState,
    reducers: {},
    extraReducers: function(builder) {
      builder.addCase(querySlice.actions.removeQueryResult, function(draft, _j2) {
        var queryCacheKey = _j2.payload.queryCacheKey;
        for (var _k2 = 0, _l = Object.values(draft); _k2 < _l.length; _k2++) {
          var tagTypeSubscriptions = _l[_k2];
          for (var _m = 0, _o = Object.values(tagTypeSubscriptions); _m < _o.length; _m++) {
            var idSubscriptions = _o[_m];
            var foundAt = idSubscriptions.indexOf(queryCacheKey);
            if (foundAt !== -1) {
              idSubscriptions.splice(foundAt, 1);
            }
          }
        }
      }).addMatcher(hasRehydrationInfo, function(draft, action) {
        var _a, _b, _c, _d;
        var provided = extractRehydrationInfo(action).provided;
        for (var _j2 = 0, _k2 = Object.entries(provided); _j2 < _k2.length; _j2++) {
          var _l = _k2[_j2], type = _l[0], incomingTags = _l[1];
          for (var _m = 0, _o = Object.entries(incomingTags); _m < _o.length; _m++) {
            var _p = _o[_m], id = _p[0], cacheKeys = _p[1];
            var subscribedQueries = (_d = (_b = (_a = draft[type]) != null ? _a : draft[type] = {})[_c = id || "__internal_without_id"]) != null ? _d : _b[_c] = [];
            for (var _q = 0, cacheKeys_1 = cacheKeys; _q < cacheKeys_1.length; _q++) {
              var queryCacheKey = cacheKeys_1[_q];
              var alreadySubscribed = subscribedQueries.includes(queryCacheKey);
              if (!alreadySubscribed) {
                subscribedQueries.push(queryCacheKey);
              }
            }
          }
        }
      }).addMatcher(isAnyOf(isFulfilled(queryThunk), isRejectedWithValue(queryThunk)), function(draft, action) {
        var _a, _b, _c, _d;
        var providedTags = calculateProvidedByThunk(action, "providesTags", definitions, assertTagType);
        var queryCacheKey = action.meta.arg.queryCacheKey;
        for (var _j2 = 0, _k2 = Object.values(draft); _j2 < _k2.length; _j2++) {
          var tagTypeSubscriptions = _k2[_j2];
          for (var _l = 0, _m = Object.values(tagTypeSubscriptions); _l < _m.length; _l++) {
            var idSubscriptions = _m[_l];
            var foundAt = idSubscriptions.indexOf(queryCacheKey);
            if (foundAt !== -1) {
              idSubscriptions.splice(foundAt, 1);
            }
          }
        }
        for (var _o = 0, providedTags_1 = providedTags; _o < providedTags_1.length; _o++) {
          var _p = providedTags_1[_o], type = _p.type, id = _p.id;
          var subscribedQueries = (_d = (_b = (_a = draft[type]) != null ? _a : draft[type] = {})[_c = id || "__internal_without_id"]) != null ? _d : _b[_c] = [];
          var alreadySubscribed = subscribedQueries.includes(queryCacheKey);
          if (!alreadySubscribed) {
            subscribedQueries.push(queryCacheKey);
          }
        }
      });
    }
  });
  var subscriptionSlice = createSlice({
    name: reducerPath + "/subscriptions",
    initialState,
    reducers: {
      updateSubscriptionOptions: function(d, a) {
      },
      unsubscribeQueryResult: function(d, a) {
      },
      internal_probeSubscription: function(d, a) {
      }
    }
  });
  var internalSubscriptionsSlice = createSlice({
    name: reducerPath + "/internalSubscriptions",
    initialState,
    reducers: {
      subscriptionsUpdated: {
        reducer: function(state, action) {
          return pn(state, action.payload);
        },
        prepare: prepareAutoBatched()
      }
    }
  });
  var configSlice = createSlice({
    name: reducerPath + "/config",
    initialState: __spreadValues({
      online: isOnline(),
      focused: isDocumentVisible(),
      middlewareRegistered: false
    }, config),
    reducers: {
      middlewareRegistered: function(state, _j2) {
        var payload = _j2.payload;
        state.middlewareRegistered = state.middlewareRegistered === "conflict" || apiUid !== payload ? "conflict" : true;
      }
    },
    extraReducers: function(builder) {
      builder.addCase(onOnline, function(state) {
        state.online = true;
      }).addCase(onOffline, function(state) {
        state.online = false;
      }).addCase(onFocus, function(state) {
        state.focused = true;
      }).addCase(onFocusLost, function(state) {
        state.focused = false;
      }).addMatcher(hasRehydrationInfo, function(draft) {
        return __spreadValues({}, draft);
      });
    }
  });
  var combinedReducer = combineReducers({
    queries: querySlice.reducer,
    mutations: mutationSlice.reducer,
    provided: invalidationSlice.reducer,
    subscriptions: internalSubscriptionsSlice.reducer,
    config: configSlice.reducer
  });
  var reducer = function(state, action) {
    return combinedReducer(resetApiState.match(action) ? void 0 : state, action);
  };
  var actions = __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, configSlice.actions), querySlice.actions), subscriptionSlice.actions), internalSubscriptionsSlice.actions), mutationSlice.actions), {
    unsubscribeMutationResult: mutationSlice.actions.removeMutationResult,
    resetApiState
  });
  return { reducer, actions };
}
function buildSelectors(_j) {
  var serializeQueryArgs = _j.serializeQueryArgs, reducerPath = _j.reducerPath;
  var selectSkippedQuery = function(state) {
    return defaultQuerySubState;
  };
  var selectSkippedMutation = function(state) {
    return defaultMutationSubState;
  };
  return { buildQuerySelector, buildMutationSelector, selectInvalidatedBy };
  function withRequestFlags(substate) {
    return __spreadValues(__spreadValues({}, substate), getRequestStatusFlags(substate.status));
  }
  function selectInternalState(rootState) {
    var state = rootState[reducerPath];
    if (true) {
      if (!state) {
        if (selectInternalState.triggered)
          return state;
        selectInternalState.triggered = true;
        console.error("Error: No data found at `state." + reducerPath + "`. Did you forget to add the reducer to the store?");
      }
    }
    return state;
  }
  function buildQuerySelector(endpointName, endpointDefinition) {
    return function(queryArgs) {
      var serializedArgs = serializeQueryArgs({
        queryArgs,
        endpointDefinition,
        endpointName
      });
      var selectQuerySubstate = function(state) {
        var _a, _b, _c;
        return (_c = (_b = (_a = selectInternalState(state)) == null ? void 0 : _a.queries) == null ? void 0 : _b[serializedArgs]) != null ? _c : defaultQuerySubState;
      };
      var finalSelectQuerySubState = queryArgs === skipToken ? selectSkippedQuery : selectQuerySubstate;
      return createSelector(finalSelectQuerySubState, withRequestFlags);
    };
  }
  function buildMutationSelector() {
    return function(id) {
      var _a;
      var mutationId;
      if (typeof id === "object") {
        mutationId = (_a = getMutationCacheKey(id)) != null ? _a : skipToken;
      } else {
        mutationId = id;
      }
      var selectMutationSubstate = function(state) {
        var _a2, _b, _c;
        return (_c = (_b = (_a2 = selectInternalState(state)) == null ? void 0 : _a2.mutations) == null ? void 0 : _b[mutationId]) != null ? _c : defaultMutationSubState;
      };
      var finalSelectMutationSubstate = mutationId === skipToken ? selectSkippedMutation : selectMutationSubstate;
      return createSelector(finalSelectMutationSubstate, withRequestFlags);
    };
  }
  function selectInvalidatedBy(state, tags) {
    var _a;
    var apiState = state[reducerPath];
    var toInvalidate = /* @__PURE__ */ new Set();
    for (var _j2 = 0, _k = tags.map(expandTagDescription); _j2 < _k.length; _j2++) {
      var tag = _k[_j2];
      var provided = apiState.provided[tag.type];
      if (!provided) {
        continue;
      }
      var invalidateSubscriptions = (_a = tag.id !== void 0 ? provided[tag.id] : flatten(Object.values(provided))) != null ? _a : [];
      for (var _l = 0, invalidateSubscriptions_1 = invalidateSubscriptions; _l < invalidateSubscriptions_1.length; _l++) {
        var invalidate = invalidateSubscriptions_1[_l];
        toInvalidate.add(invalidate);
      }
    }
    return flatten(Array.from(toInvalidate.values()).map(function(queryCacheKey) {
      var querySubState = apiState.queries[queryCacheKey];
      return querySubState ? [
        {
          queryCacheKey,
          endpointName: querySubState.endpointName,
          originalArgs: querySubState.originalArgs
        }
      ] : [];
    }));
  }
}
function buildCreateApi() {
  var modules = [];
  for (var _j = 0; _j < arguments.length; _j++) {
    modules[_j] = arguments[_j];
  }
  return function baseCreateApi(options) {
    var extractRehydrationInfo = defaultMemoize(function(action) {
      var _a, _b;
      return (_b = options.extractRehydrationInfo) == null ? void 0 : _b.call(options, action, {
        reducerPath: (_a = options.reducerPath) != null ? _a : "api"
      });
    });
    var optionsWithDefaults = __spreadProps(__spreadValues({
      reducerPath: "api",
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false
    }, options), {
      extractRehydrationInfo,
      serializeQueryArgs: function(queryArgsApi) {
        var finalSerializeQueryArgs = defaultSerializeQueryArgs;
        if ("serializeQueryArgs" in queryArgsApi.endpointDefinition) {
          var endpointSQA_1 = queryArgsApi.endpointDefinition.serializeQueryArgs;
          finalSerializeQueryArgs = function(queryArgsApi2) {
            var initialResult = endpointSQA_1(queryArgsApi2);
            if (typeof initialResult === "string") {
              return initialResult;
            } else {
              return defaultSerializeQueryArgs(__spreadProps(__spreadValues({}, queryArgsApi2), {
                queryArgs: initialResult
              }));
            }
          };
        } else if (options.serializeQueryArgs) {
          finalSerializeQueryArgs = options.serializeQueryArgs;
        }
        return finalSerializeQueryArgs(queryArgsApi);
      },
      tagTypes: __spreadArray([], options.tagTypes || [])
    });
    var context = {
      endpointDefinitions: {},
      batch: function(fn) {
        fn();
      },
      apiUid: nanoid(),
      extractRehydrationInfo,
      hasRehydrationInfo: defaultMemoize(function(action) {
        return extractRehydrationInfo(action) != null;
      })
    };
    var api = {
      injectEndpoints,
      enhanceEndpoints: function(_j2) {
        var addTagTypes = _j2.addTagTypes, endpoints = _j2.endpoints;
        if (addTagTypes) {
          for (var _k = 0, addTagTypes_1 = addTagTypes; _k < addTagTypes_1.length; _k++) {
            var eT = addTagTypes_1[_k];
            if (!optionsWithDefaults.tagTypes.includes(eT)) {
              ;
              optionsWithDefaults.tagTypes.push(eT);
            }
          }
        }
        if (endpoints) {
          for (var _l = 0, _m = Object.entries(endpoints); _l < _m.length; _l++) {
            var _o = _m[_l], endpointName = _o[0], partialDefinition = _o[1];
            if (typeof partialDefinition === "function") {
              partialDefinition(context.endpointDefinitions[endpointName]);
            } else {
              Object.assign(context.endpointDefinitions[endpointName] || {}, partialDefinition);
            }
          }
        }
        return api;
      }
    };
    var initializedModules = modules.map(function(m) {
      return m.init(api, optionsWithDefaults, context);
    });
    function injectEndpoints(inject) {
      var evaluatedEndpoints = inject.endpoints({
        query: function(x) {
          return __spreadProps(__spreadValues({}, x), { type: DefinitionType.query });
        },
        mutation: function(x) {
          return __spreadProps(__spreadValues({}, x), { type: DefinitionType.mutation });
        }
      });
      for (var _j2 = 0, _k = Object.entries(evaluatedEndpoints); _j2 < _k.length; _j2++) {
        var _l = _k[_j2], endpointName = _l[0], definition = _l[1];
        if (!inject.overrideExisting && endpointName in context.endpointDefinitions) {
          if (typeof process !== "undefined" && true) {
            console.error("called `injectEndpoints` to override already-existing endpointName " + endpointName + " without specifying `overrideExisting: true`");
          }
          continue;
        }
        context.endpointDefinitions[endpointName] = definition;
        for (var _m = 0, initializedModules_1 = initializedModules; _m < initializedModules_1.length; _m++) {
          var m = initializedModules_1[_m];
          m.injectEndpoint(endpointName, definition);
        }
      }
      return api;
    }
    return api.injectEndpoints({ endpoints: options.endpoints });
  };
}
function fakeBaseQuery() {
  return function() {
    throw new Error("When using `fakeBaseQuery`, all queries & mutations must use the `queryFn` definition syntax.");
  };
}
function isObjectEmpty(obj) {
  for (var k in obj) {
    return false;
  }
  return true;
}
function buildMiddleware(input) {
  var reducerPath = input.reducerPath, queryThunk = input.queryThunk, api = input.api, context = input.context;
  var apiUid = context.apiUid;
  var actions = {
    invalidateTags: createAction(reducerPath + "/invalidateTags")
  };
  var isThisApiSliceAction = function(action) {
    return !!action && typeof action.type === "string" && action.type.startsWith(reducerPath + "/");
  };
  var handlerBuilders = [
    buildDevCheckHandler,
    buildCacheCollectionHandler,
    buildInvalidationByTagsHandler,
    buildPollingHandler,
    buildCacheLifecycleHandler,
    buildQueryLifecycleHandler
  ];
  var middleware = function(mwApi) {
    var initialized2 = false;
    var internalState = {
      currentSubscriptions: {}
    };
    var builderArgs = __spreadProps(__spreadValues({}, input), {
      internalState,
      refetchQuery
    });
    var handlers = handlerBuilders.map(function(build) {
      return build(builderArgs);
    });
    var batchedActionsHandler = buildBatchedActionsHandler(builderArgs);
    var windowEventsHandler = buildWindowEventHandler(builderArgs);
    return function(next) {
      return function(action) {
        if (!initialized2) {
          initialized2 = true;
          mwApi.dispatch(api.internalActions.middlewareRegistered(apiUid));
        }
        var mwApiWithNext = __spreadProps(__spreadValues({}, mwApi), { next });
        var stateBefore = mwApi.getState();
        var _j = batchedActionsHandler(action, mwApiWithNext, stateBefore), actionShouldContinue = _j[0], hasSubscription = _j[1];
        var res;
        if (actionShouldContinue) {
          res = next(action);
        } else {
          res = hasSubscription;
        }
        if (!!mwApi.getState()[reducerPath]) {
          windowEventsHandler(action, mwApiWithNext, stateBefore);
          if (isThisApiSliceAction(action) || context.hasRehydrationInfo(action)) {
            for (var _k = 0, handlers_1 = handlers; _k < handlers_1.length; _k++) {
              var handler = handlers_1[_k];
              handler(action, mwApiWithNext, stateBefore);
            }
          }
        }
        return res;
      };
    };
  };
  return { middleware, actions };
  function refetchQuery(querySubState, queryCacheKey, override) {
    if (override === void 0) {
      override = {};
    }
    return queryThunk(__spreadValues({
      type: "query",
      endpointName: querySubState.endpointName,
      originalArgs: querySubState.originalArgs,
      subscribe: false,
      forceRefetch: true,
      queryCacheKey
    }, override));
  }
}
function assertCast(v) {
}
function safeAssign(target) {
  var args = [];
  for (var _j = 1; _j < arguments.length; _j++) {
    args[_j - 1] = arguments[_j];
  }
  Object.assign.apply(Object, __spreadArray([target], args));
}
var __generator, __spreadArray, __defProp, __defProps, __getOwnPropDescs, __getOwnPropSymbols, __hasOwnProp, __propIsEnum, __defNormalProp, __spreadValues, __spreadProps, __objRest, __async, QueryStatus, withoutTrailingSlash, withoutLeadingSlash, flatten, isPlainObject2, defaultFetchFn, defaultValidateStatus, defaultIsJsonContentType, HandledError, EMPTY_OPTIONS, retryWithBackoff, retry, onFocus, onFocusLost, onOnline, onOffline, initialized, DefinitionType, forceQueryFnSymbol, isUpsertQuery, initialState, skipToken, skipSelector, initialSubState, defaultQuerySubState, defaultMutationSubState, cache, defaultSerializeQueryArgs, THIRTY_TWO_BIT_MAX_TIMER_SECONDS, buildCacheCollectionHandler, buildInvalidationByTagsHandler, buildPollingHandler, buildWindowEventHandler, neverResolvedError, buildCacheLifecycleHandler, buildQueryLifecycleHandler, buildDevCheckHandler, promise, queueMicrotaskShim, buildBatchedActionsHandler, coreModuleName, coreModule, createApi;
var init_rtk_query_esm = __esm({
  "node_modules/@reduxjs/toolkit/dist/query/rtk-query.esm.js"() {
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_immer_esm();
    init_redux_toolkit_esm();
    init_immer_esm();
    init_immer_esm();
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_es();
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_redux_toolkit_esm();
    init_immer_esm();
    init_immer_esm();
    __generator = function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t2[0] & 1)
          throw t2[1];
        return t2[1];
      }, trys: [], ops: [] }, f, y, t2, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done)
              return t2;
            if (y = 0, t2)
              op = [op[0] & 2, t2.value];
            switch (op[0]) {
              case 0:
              case 1:
                t2 = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t2[1]) {
                  _.label = t2[1];
                  t2 = op;
                  break;
                }
                if (t2 && _.label < t2[2]) {
                  _.label = t2[2];
                  _.ops.push(op);
                  break;
                }
                if (t2[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e2) {
            op = [6, e2];
            y = 0;
          } finally {
            f = t2 = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    __spreadArray = function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    __defProp = Object.defineProperty;
    __defProps = Object.defineProperties;
    __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols = Object.getOwnPropertySymbols;
    __hasOwnProp = Object.prototype.hasOwnProperty;
    __propIsEnum = Object.prototype.propertyIsEnumerable;
    __defNormalProp = function(obj, key, value) {
      return key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    };
    __spreadValues = function(a, b) {
      for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      if (__getOwnPropSymbols)
        for (var _j = 0, _k = __getOwnPropSymbols(b); _j < _k.length; _j++) {
          var prop = _k[_j];
          if (__propIsEnum.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps = function(a, b) {
      return __defProps(a, __getOwnPropDescs(b));
    };
    __objRest = function(source, exclude) {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols)
        for (var _j = 0, _k = __getOwnPropSymbols(source); _j < _k.length; _j++) {
          var prop = _k[_j];
          if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
            target[prop] = source[prop];
        }
      return target;
    };
    __async = function(__this, __arguments, generator) {
      return new Promise(function(resolve, reject) {
        var fulfilled = function(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        };
        var rejected = function(value) {
          try {
            step(generator.throw(value));
          } catch (e2) {
            reject(e2);
          }
        };
        var step = function(x) {
          return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(__this, __arguments)).next());
      });
    };
    (function(QueryStatus2) {
      QueryStatus2["uninitialized"] = "uninitialized";
      QueryStatus2["pending"] = "pending";
      QueryStatus2["fulfilled"] = "fulfilled";
      QueryStatus2["rejected"] = "rejected";
    })(QueryStatus || (QueryStatus = {}));
    withoutTrailingSlash = function(url) {
      return url.replace(/\/$/, "");
    };
    withoutLeadingSlash = function(url) {
      return url.replace(/^\//, "");
    };
    flatten = function(arr) {
      return [].concat.apply([], arr);
    };
    isPlainObject2 = isPlainObject;
    defaultFetchFn = function() {
      var args = [];
      for (var _j = 0; _j < arguments.length; _j++) {
        args[_j] = arguments[_j];
      }
      return fetch.apply(void 0, args);
    };
    defaultValidateStatus = function(response) {
      return response.status >= 200 && response.status <= 299;
    };
    defaultIsJsonContentType = function(headers) {
      return /ion\/(vnd\.api\+)?json/.test(headers.get("content-type") || "");
    };
    HandledError = /** @class */
    function() {
      function HandledError2(value, meta) {
        if (meta === void 0) {
          meta = void 0;
        }
        this.value = value;
        this.meta = meta;
      }
      return HandledError2;
    }();
    EMPTY_OPTIONS = {};
    retryWithBackoff = function(baseQuery, defaultOptions) {
      return function(args, api, extraOptions) {
        return __async(void 0, null, function() {
          var possibleMaxRetries, maxRetries, defaultRetryCondition, options, retry2, result, e_3;
          return __generator(this, function(_j) {
            switch (_j.label) {
              case 0:
                possibleMaxRetries = [
                  5,
                  (defaultOptions || EMPTY_OPTIONS).maxRetries,
                  (extraOptions || EMPTY_OPTIONS).maxRetries
                ].filter(function(x) {
                  return x !== void 0;
                });
                maxRetries = possibleMaxRetries.slice(-1)[0];
                defaultRetryCondition = function(_, __, _j2) {
                  var attempt = _j2.attempt;
                  return attempt <= maxRetries;
                };
                options = __spreadValues(__spreadValues({
                  maxRetries,
                  backoff: defaultBackoff,
                  retryCondition: defaultRetryCondition
                }, defaultOptions), extraOptions);
                retry2 = 0;
                _j.label = 1;
              case 1:
                if (false)
                  return [3, 7];
                _j.label = 2;
              case 2:
                _j.trys.push([2, 4, , 6]);
                return [4, baseQuery(args, api, extraOptions)];
              case 3:
                result = _j.sent();
                if (result.error) {
                  throw new HandledError(result);
                }
                return [2, result];
              case 4:
                e_3 = _j.sent();
                retry2++;
                if (e_3.throwImmediately) {
                  if (e_3 instanceof HandledError) {
                    return [2, e_3.value];
                  }
                  throw e_3;
                }
                if (e_3 instanceof HandledError && !options.retryCondition(e_3.value.error, args, {
                  attempt: retry2,
                  baseQueryApi: api,
                  extraOptions
                })) {
                  return [2, e_3.value];
                }
                return [4, options.backoff(retry2, options.maxRetries)];
              case 5:
                _j.sent();
                return [3, 6];
              case 6:
                return [3, 1];
              case 7:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
    };
    retry = Object.assign(retryWithBackoff, { fail });
    onFocus = createAction("__rtkq/focused");
    onFocusLost = createAction("__rtkq/unfocused");
    onOnline = createAction("__rtkq/online");
    onOffline = createAction("__rtkq/offline");
    initialized = false;
    (function(DefinitionType2) {
      DefinitionType2["query"] = "query";
      DefinitionType2["mutation"] = "mutation";
    })(DefinitionType || (DefinitionType = {}));
    forceQueryFnSymbol = Symbol("forceQueryFn");
    isUpsertQuery = function(arg) {
      return typeof arg[forceQueryFnSymbol] === "function";
    };
    initialState = {};
    skipToken = Symbol.for("RTKQ/skipToken");
    skipSelector = skipToken;
    initialSubState = {
      status: QueryStatus.uninitialized
    };
    defaultQuerySubState = immer_esm_default(initialSubState, function() {
    });
    defaultMutationSubState = immer_esm_default(initialSubState, function() {
    });
    cache = WeakMap ? /* @__PURE__ */ new WeakMap() : void 0;
    defaultSerializeQueryArgs = function(_j) {
      var endpointName = _j.endpointName, queryArgs = _j.queryArgs;
      var serialized = "";
      var cached = cache == null ? void 0 : cache.get(queryArgs);
      if (typeof cached === "string") {
        serialized = cached;
      } else {
        var stringified = JSON.stringify(queryArgs, function(key, value) {
          return isPlainObject(value) ? Object.keys(value).sort().reduce(function(acc, key2) {
            acc[key2] = value[key2];
            return acc;
          }, {}) : value;
        });
        if (isPlainObject(queryArgs)) {
          cache == null ? void 0 : cache.set(queryArgs, stringified);
        }
        serialized = stringified;
      }
      return endpointName + "(" + serialized + ")";
    };
    THIRTY_TWO_BIT_MAX_TIMER_SECONDS = 2147483647 / 1e3 - 1;
    buildCacheCollectionHandler = function(_j) {
      var reducerPath = _j.reducerPath, api = _j.api, context = _j.context, internalState = _j.internalState;
      var _k = api.internalActions, removeQueryResult = _k.removeQueryResult, unsubscribeQueryResult = _k.unsubscribeQueryResult;
      function anySubscriptionsRemainingForKey(queryCacheKey) {
        var subscriptions = internalState.currentSubscriptions[queryCacheKey];
        return !!subscriptions && !isObjectEmpty(subscriptions);
      }
      var currentRemovalTimeouts = {};
      var handler = function(action, mwApi, internalState2) {
        var _a;
        if (unsubscribeQueryResult.match(action)) {
          var state = mwApi.getState()[reducerPath];
          var queryCacheKey = action.payload.queryCacheKey;
          handleUnsubscribe(queryCacheKey, (_a = state.queries[queryCacheKey]) == null ? void 0 : _a.endpointName, mwApi, state.config);
        }
        if (api.util.resetApiState.match(action)) {
          for (var _j2 = 0, _k2 = Object.entries(currentRemovalTimeouts); _j2 < _k2.length; _j2++) {
            var _l = _k2[_j2], key = _l[0], timeout = _l[1];
            if (timeout)
              clearTimeout(timeout);
            delete currentRemovalTimeouts[key];
          }
        }
        if (context.hasRehydrationInfo(action)) {
          var state = mwApi.getState()[reducerPath];
          var queries = context.extractRehydrationInfo(action).queries;
          for (var _m = 0, _o = Object.entries(queries); _m < _o.length; _m++) {
            var _p = _o[_m], queryCacheKey = _p[0], queryState = _p[1];
            handleUnsubscribe(queryCacheKey, queryState == null ? void 0 : queryState.endpointName, mwApi, state.config);
          }
        }
      };
      function handleUnsubscribe(queryCacheKey, endpointName, api2, config) {
        var _a;
        var endpointDefinition = context.endpointDefinitions[endpointName];
        var keepUnusedDataFor = (_a = endpointDefinition == null ? void 0 : endpointDefinition.keepUnusedDataFor) != null ? _a : config.keepUnusedDataFor;
        if (keepUnusedDataFor === Infinity) {
          return;
        }
        var finalKeepUnusedDataFor = Math.max(0, Math.min(keepUnusedDataFor, THIRTY_TWO_BIT_MAX_TIMER_SECONDS));
        if (!anySubscriptionsRemainingForKey(queryCacheKey)) {
          var currentTimeout = currentRemovalTimeouts[queryCacheKey];
          if (currentTimeout) {
            clearTimeout(currentTimeout);
          }
          currentRemovalTimeouts[queryCacheKey] = setTimeout(function() {
            if (!anySubscriptionsRemainingForKey(queryCacheKey)) {
              api2.dispatch(removeQueryResult({ queryCacheKey }));
            }
            delete currentRemovalTimeouts[queryCacheKey];
          }, finalKeepUnusedDataFor * 1e3);
        }
      }
      return handler;
    };
    buildInvalidationByTagsHandler = function(_j) {
      var reducerPath = _j.reducerPath, context = _j.context, endpointDefinitions = _j.context.endpointDefinitions, mutationThunk = _j.mutationThunk, api = _j.api, assertTagType = _j.assertTagType, refetchQuery = _j.refetchQuery;
      var removeQueryResult = api.internalActions.removeQueryResult;
      var isThunkActionWithTags = isAnyOf(isFulfilled(mutationThunk), isRejectedWithValue(mutationThunk));
      var handler = function(action, mwApi) {
        if (isThunkActionWithTags(action)) {
          invalidateTags(calculateProvidedByThunk(action, "invalidatesTags", endpointDefinitions, assertTagType), mwApi);
        }
        if (api.util.invalidateTags.match(action)) {
          invalidateTags(calculateProvidedBy(action.payload, void 0, void 0, void 0, void 0, assertTagType), mwApi);
        }
      };
      function invalidateTags(tags, mwApi) {
        var rootState = mwApi.getState();
        var state = rootState[reducerPath];
        var toInvalidate = api.util.selectInvalidatedBy(rootState, tags);
        context.batch(function() {
          var _a;
          var valuesArray = Array.from(toInvalidate.values());
          for (var _j2 = 0, valuesArray_1 = valuesArray; _j2 < valuesArray_1.length; _j2++) {
            var queryCacheKey = valuesArray_1[_j2].queryCacheKey;
            var querySubState = state.queries[queryCacheKey];
            var subscriptionSubState = (_a = state.subscriptions[queryCacheKey]) != null ? _a : {};
            if (querySubState) {
              if (Object.keys(subscriptionSubState).length === 0) {
                mwApi.dispatch(removeQueryResult({
                  queryCacheKey
                }));
              } else if (querySubState.status !== QueryStatus.uninitialized) {
                mwApi.dispatch(refetchQuery(querySubState, queryCacheKey));
              }
            }
          }
        });
      }
      return handler;
    };
    buildPollingHandler = function(_j) {
      var reducerPath = _j.reducerPath, queryThunk = _j.queryThunk, api = _j.api, refetchQuery = _j.refetchQuery, internalState = _j.internalState;
      var currentPolls = {};
      var handler = function(action, mwApi) {
        if (api.internalActions.updateSubscriptionOptions.match(action) || api.internalActions.unsubscribeQueryResult.match(action)) {
          updatePollingInterval(action.payload, mwApi);
        }
        if (queryThunk.pending.match(action) || queryThunk.rejected.match(action) && action.meta.condition) {
          updatePollingInterval(action.meta.arg, mwApi);
        }
        if (queryThunk.fulfilled.match(action) || queryThunk.rejected.match(action) && !action.meta.condition) {
          startNextPoll(action.meta.arg, mwApi);
        }
        if (api.util.resetApiState.match(action)) {
          clearPolls();
        }
      };
      function startNextPoll(_j2, api2) {
        var queryCacheKey = _j2.queryCacheKey;
        var state = api2.getState()[reducerPath];
        var querySubState = state.queries[queryCacheKey];
        var subscriptions = internalState.currentSubscriptions[queryCacheKey];
        if (!querySubState || querySubState.status === QueryStatus.uninitialized)
          return;
        var lowestPollingInterval = findLowestPollingInterval(subscriptions);
        if (!Number.isFinite(lowestPollingInterval))
          return;
        var currentPoll = currentPolls[queryCacheKey];
        if (currentPoll == null ? void 0 : currentPoll.timeout) {
          clearTimeout(currentPoll.timeout);
          currentPoll.timeout = void 0;
        }
        var nextPollTimestamp = Date.now() + lowestPollingInterval;
        var currentInterval = currentPolls[queryCacheKey] = {
          nextPollTimestamp,
          pollingInterval: lowestPollingInterval,
          timeout: setTimeout(function() {
            currentInterval.timeout = void 0;
            api2.dispatch(refetchQuery(querySubState, queryCacheKey));
          }, lowestPollingInterval)
        };
      }
      function updatePollingInterval(_j2, api2) {
        var queryCacheKey = _j2.queryCacheKey;
        var state = api2.getState()[reducerPath];
        var querySubState = state.queries[queryCacheKey];
        var subscriptions = internalState.currentSubscriptions[queryCacheKey];
        if (!querySubState || querySubState.status === QueryStatus.uninitialized) {
          return;
        }
        var lowestPollingInterval = findLowestPollingInterval(subscriptions);
        if (!Number.isFinite(lowestPollingInterval)) {
          cleanupPollForKey(queryCacheKey);
          return;
        }
        var currentPoll = currentPolls[queryCacheKey];
        var nextPollTimestamp = Date.now() + lowestPollingInterval;
        if (!currentPoll || nextPollTimestamp < currentPoll.nextPollTimestamp) {
          startNextPoll({ queryCacheKey }, api2);
        }
      }
      function cleanupPollForKey(key) {
        var existingPoll = currentPolls[key];
        if (existingPoll == null ? void 0 : existingPoll.timeout) {
          clearTimeout(existingPoll.timeout);
        }
        delete currentPolls[key];
      }
      function clearPolls() {
        for (var _j2 = 0, _k = Object.keys(currentPolls); _j2 < _k.length; _j2++) {
          var key = _k[_j2];
          cleanupPollForKey(key);
        }
      }
      function findLowestPollingInterval(subscribers) {
        if (subscribers === void 0) {
          subscribers = {};
        }
        var lowestPollingInterval = Number.POSITIVE_INFINITY;
        for (var key in subscribers) {
          if (!!subscribers[key].pollingInterval) {
            lowestPollingInterval = Math.min(subscribers[key].pollingInterval, lowestPollingInterval);
          }
        }
        return lowestPollingInterval;
      }
      return handler;
    };
    buildWindowEventHandler = function(_j) {
      var reducerPath = _j.reducerPath, context = _j.context, api = _j.api, refetchQuery = _j.refetchQuery, internalState = _j.internalState;
      var removeQueryResult = api.internalActions.removeQueryResult;
      var handler = function(action, mwApi) {
        if (onFocus.match(action)) {
          refetchValidQueries(mwApi, "refetchOnFocus");
        }
        if (onOnline.match(action)) {
          refetchValidQueries(mwApi, "refetchOnReconnect");
        }
      };
      function refetchValidQueries(api2, type) {
        var state = api2.getState()[reducerPath];
        var queries = state.queries;
        var subscriptions = internalState.currentSubscriptions;
        context.batch(function() {
          for (var _j2 = 0, _k = Object.keys(subscriptions); _j2 < _k.length; _j2++) {
            var queryCacheKey = _k[_j2];
            var querySubState = queries[queryCacheKey];
            var subscriptionSubState = subscriptions[queryCacheKey];
            if (!subscriptionSubState || !querySubState)
              continue;
            var shouldRefetch = Object.values(subscriptionSubState).some(function(sub) {
              return sub[type] === true;
            }) || Object.values(subscriptionSubState).every(function(sub) {
              return sub[type] === void 0;
            }) && state.config[type];
            if (shouldRefetch) {
              if (Object.keys(subscriptionSubState).length === 0) {
                api2.dispatch(removeQueryResult({
                  queryCacheKey
                }));
              } else if (querySubState.status !== QueryStatus.uninitialized) {
                api2.dispatch(refetchQuery(querySubState, queryCacheKey));
              }
            }
          }
        });
      }
      return handler;
    };
    neverResolvedError = new Error("Promise never resolved before cacheEntryRemoved.");
    buildCacheLifecycleHandler = function(_j) {
      var api = _j.api, reducerPath = _j.reducerPath, context = _j.context, queryThunk = _j.queryThunk, mutationThunk = _j.mutationThunk, internalState = _j.internalState;
      var isQueryThunk = isAsyncThunkAction(queryThunk);
      var isMutationThunk = isAsyncThunkAction(mutationThunk);
      var isFulfilledThunk = isFulfilled(queryThunk, mutationThunk);
      var lifecycleMap = {};
      var handler = function(action, mwApi, stateBefore) {
        var cacheKey = getCacheKey(action);
        if (queryThunk.pending.match(action)) {
          var oldState = stateBefore[reducerPath].queries[cacheKey];
          var state = mwApi.getState()[reducerPath].queries[cacheKey];
          if (!oldState && state) {
            handleNewKey(action.meta.arg.endpointName, action.meta.arg.originalArgs, cacheKey, mwApi, action.meta.requestId);
          }
        } else if (mutationThunk.pending.match(action)) {
          var state = mwApi.getState()[reducerPath].mutations[cacheKey];
          if (state) {
            handleNewKey(action.meta.arg.endpointName, action.meta.arg.originalArgs, cacheKey, mwApi, action.meta.requestId);
          }
        } else if (isFulfilledThunk(action)) {
          var lifecycle = lifecycleMap[cacheKey];
          if (lifecycle == null ? void 0 : lifecycle.valueResolved) {
            lifecycle.valueResolved({
              data: action.payload,
              meta: action.meta.baseQueryMeta
            });
            delete lifecycle.valueResolved;
          }
        } else if (api.internalActions.removeQueryResult.match(action) || api.internalActions.removeMutationResult.match(action)) {
          var lifecycle = lifecycleMap[cacheKey];
          if (lifecycle) {
            delete lifecycleMap[cacheKey];
            lifecycle.cacheEntryRemoved();
          }
        } else if (api.util.resetApiState.match(action)) {
          for (var _j2 = 0, _k = Object.entries(lifecycleMap); _j2 < _k.length; _j2++) {
            var _l = _k[_j2], cacheKey2 = _l[0], lifecycle = _l[1];
            delete lifecycleMap[cacheKey2];
            lifecycle.cacheEntryRemoved();
          }
        }
      };
      function getCacheKey(action) {
        if (isQueryThunk(action))
          return action.meta.arg.queryCacheKey;
        if (isMutationThunk(action))
          return action.meta.requestId;
        if (api.internalActions.removeQueryResult.match(action))
          return action.payload.queryCacheKey;
        if (api.internalActions.removeMutationResult.match(action))
          return getMutationCacheKey(action.payload);
        return "";
      }
      function handleNewKey(endpointName, originalArgs, queryCacheKey, mwApi, requestId) {
        var endpointDefinition = context.endpointDefinitions[endpointName];
        var onCacheEntryAdded = endpointDefinition == null ? void 0 : endpointDefinition.onCacheEntryAdded;
        if (!onCacheEntryAdded)
          return;
        var lifecycle = {};
        var cacheEntryRemoved = new Promise(function(resolve) {
          lifecycle.cacheEntryRemoved = resolve;
        });
        var cacheDataLoaded = Promise.race([
          new Promise(function(resolve) {
            lifecycle.valueResolved = resolve;
          }),
          cacheEntryRemoved.then(function() {
            throw neverResolvedError;
          })
        ]);
        cacheDataLoaded.catch(function() {
        });
        lifecycleMap[queryCacheKey] = lifecycle;
        var selector = api.endpoints[endpointName].select(endpointDefinition.type === DefinitionType.query ? originalArgs : queryCacheKey);
        var extra = mwApi.dispatch(function(_, __, extra2) {
          return extra2;
        });
        var lifecycleApi = __spreadProps(__spreadValues({}, mwApi), {
          getCacheEntry: function() {
            return selector(mwApi.getState());
          },
          requestId,
          extra,
          updateCachedData: endpointDefinition.type === DefinitionType.query ? function(updateRecipe) {
            return mwApi.dispatch(api.util.updateQueryData(endpointName, originalArgs, updateRecipe));
          } : void 0,
          cacheDataLoaded,
          cacheEntryRemoved
        });
        var runningHandler = onCacheEntryAdded(originalArgs, lifecycleApi);
        Promise.resolve(runningHandler).catch(function(e2) {
          if (e2 === neverResolvedError)
            return;
          throw e2;
        });
      }
      return handler;
    };
    buildQueryLifecycleHandler = function(_j) {
      var api = _j.api, context = _j.context, queryThunk = _j.queryThunk, mutationThunk = _j.mutationThunk;
      var isPendingThunk = isPending(queryThunk, mutationThunk);
      var isRejectedThunk = isRejected(queryThunk, mutationThunk);
      var isFullfilledThunk = isFulfilled(queryThunk, mutationThunk);
      var lifecycleMap = {};
      var handler = function(action, mwApi) {
        var _a, _b, _c;
        if (isPendingThunk(action)) {
          var _j2 = action.meta, requestId = _j2.requestId, _k = _j2.arg, endpointName_1 = _k.endpointName, originalArgs_1 = _k.originalArgs;
          var endpointDefinition = context.endpointDefinitions[endpointName_1];
          var onQueryStarted = endpointDefinition == null ? void 0 : endpointDefinition.onQueryStarted;
          if (onQueryStarted) {
            var lifecycle_1 = {};
            var queryFulfilled = new Promise(function(resolve, reject) {
              lifecycle_1.resolve = resolve;
              lifecycle_1.reject = reject;
            });
            queryFulfilled.catch(function() {
            });
            lifecycleMap[requestId] = lifecycle_1;
            var selector_1 = api.endpoints[endpointName_1].select(endpointDefinition.type === DefinitionType.query ? originalArgs_1 : requestId);
            var extra = mwApi.dispatch(function(_, __, extra2) {
              return extra2;
            });
            var lifecycleApi = __spreadProps(__spreadValues({}, mwApi), {
              getCacheEntry: function() {
                return selector_1(mwApi.getState());
              },
              requestId,
              extra,
              updateCachedData: endpointDefinition.type === DefinitionType.query ? function(updateRecipe) {
                return mwApi.dispatch(api.util.updateQueryData(endpointName_1, originalArgs_1, updateRecipe));
              } : void 0,
              queryFulfilled
            });
            onQueryStarted(originalArgs_1, lifecycleApi);
          }
        } else if (isFullfilledThunk(action)) {
          var _l = action.meta, requestId = _l.requestId, baseQueryMeta = _l.baseQueryMeta;
          (_a = lifecycleMap[requestId]) == null ? void 0 : _a.resolve({
            data: action.payload,
            meta: baseQueryMeta
          });
          delete lifecycleMap[requestId];
        } else if (isRejectedThunk(action)) {
          var _m = action.meta, requestId = _m.requestId, rejectedWithValue = _m.rejectedWithValue, baseQueryMeta = _m.baseQueryMeta;
          (_c = lifecycleMap[requestId]) == null ? void 0 : _c.reject({
            error: (_b = action.payload) != null ? _b : action.error,
            isUnhandledError: !rejectedWithValue,
            meta: baseQueryMeta
          });
          delete lifecycleMap[requestId];
        }
      };
      return handler;
    };
    buildDevCheckHandler = function(_j) {
      var api = _j.api, apiUid = _j.context.apiUid, reducerPath = _j.reducerPath;
      return function(action, mwApi) {
        var _a, _b;
        if (api.util.resetApiState.match(action)) {
          mwApi.dispatch(api.internalActions.middlewareRegistered(apiUid));
        }
        if (typeof process !== "undefined" && true) {
          if (api.internalActions.middlewareRegistered.match(action) && action.payload === apiUid && ((_b = (_a = mwApi.getState()[reducerPath]) == null ? void 0 : _a.config) == null ? void 0 : _b.middlewareRegistered) === "conflict") {
            console.warn('There is a mismatch between slice and middleware for the reducerPath "' + reducerPath + '".\nYou can only have one api per reducer path, this will lead to crashes in various situations!' + (reducerPath === "api" ? "\nIf you have multiple apis, you *have* to specify the reducerPath option when using createApi!" : ""));
          }
        }
      };
    };
    queueMicrotaskShim = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : globalThis) : function(cb) {
      return (promise || (promise = Promise.resolve())).then(cb).catch(function(err) {
        return setTimeout(function() {
          throw err;
        }, 0);
      });
    };
    buildBatchedActionsHandler = function(_j) {
      var api = _j.api, queryThunk = _j.queryThunk, internalState = _j.internalState;
      var subscriptionsPrefix = api.reducerPath + "/subscriptions";
      var previousSubscriptions = null;
      var dispatchQueued = false;
      var _k = api.internalActions, updateSubscriptionOptions = _k.updateSubscriptionOptions, unsubscribeQueryResult = _k.unsubscribeQueryResult;
      var actuallyMutateSubscriptions = function(mutableState, action) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        if (updateSubscriptionOptions.match(action)) {
          var _j2 = action.payload, queryCacheKey = _j2.queryCacheKey, requestId = _j2.requestId, options = _j2.options;
          if ((_a = mutableState == null ? void 0 : mutableState[queryCacheKey]) == null ? void 0 : _a[requestId]) {
            mutableState[queryCacheKey][requestId] = options;
          }
          return true;
        }
        if (unsubscribeQueryResult.match(action)) {
          var _k2 = action.payload, queryCacheKey = _k2.queryCacheKey, requestId = _k2.requestId;
          if (mutableState[queryCacheKey]) {
            delete mutableState[queryCacheKey][requestId];
          }
          return true;
        }
        if (api.internalActions.removeQueryResult.match(action)) {
          delete mutableState[action.payload.queryCacheKey];
          return true;
        }
        if (queryThunk.pending.match(action)) {
          var _l = action.meta, arg = _l.arg, requestId = _l.requestId;
          if (arg.subscribe) {
            var substate = (_c = mutableState[_b = arg.queryCacheKey]) != null ? _c : mutableState[_b] = {};
            substate[requestId] = (_e = (_d = arg.subscriptionOptions) != null ? _d : substate[requestId]) != null ? _e : {};
            return true;
          }
        }
        if (queryThunk.rejected.match(action)) {
          var _m = action.meta, condition = _m.condition, arg = _m.arg, requestId = _m.requestId;
          if (condition && arg.subscribe) {
            var substate = (_g = mutableState[_f = arg.queryCacheKey]) != null ? _g : mutableState[_f] = {};
            substate[requestId] = (_i = (_h = arg.subscriptionOptions) != null ? _h : substate[requestId]) != null ? _i : {};
            return true;
          }
        }
        return false;
      };
      return function(action, mwApi) {
        var _a, _b;
        if (!previousSubscriptions) {
          previousSubscriptions = JSON.parse(JSON.stringify(internalState.currentSubscriptions));
        }
        if (api.util.resetApiState.match(action)) {
          previousSubscriptions = internalState.currentSubscriptions = {};
          return [true, false];
        }
        if (api.internalActions.internal_probeSubscription.match(action)) {
          var _j2 = action.payload, queryCacheKey = _j2.queryCacheKey, requestId = _j2.requestId;
          var hasSubscription = !!((_a = internalState.currentSubscriptions[queryCacheKey]) == null ? void 0 : _a[requestId]);
          return [false, hasSubscription];
        }
        var didMutate = actuallyMutateSubscriptions(internalState.currentSubscriptions, action);
        if (didMutate) {
          if (!dispatchQueued) {
            queueMicrotaskShim(function() {
              var newSubscriptions = JSON.parse(JSON.stringify(internalState.currentSubscriptions));
              var _j3 = cn(previousSubscriptions, function() {
                return newSubscriptions;
              }), patches = _j3[1];
              mwApi.next(api.internalActions.subscriptionsUpdated(patches));
              previousSubscriptions = newSubscriptions;
              dispatchQueued = false;
            });
            dispatchQueued = true;
          }
          var isSubscriptionSliceAction = !!((_b = action.type) == null ? void 0 : _b.startsWith(subscriptionsPrefix));
          var isAdditionalSubscriptionAction = queryThunk.rejected.match(action) && action.meta.condition && !!action.meta.arg.subscribe;
          var actionShouldContinue = !isSubscriptionSliceAction && !isAdditionalSubscriptionAction;
          return [actionShouldContinue, false];
        }
        return [true, false];
      };
    };
    coreModuleName = Symbol();
    coreModule = function() {
      return {
        name: coreModuleName,
        init: function(api, _j, context) {
          var baseQuery = _j.baseQuery, tagTypes = _j.tagTypes, reducerPath = _j.reducerPath, serializeQueryArgs = _j.serializeQueryArgs, keepUnusedDataFor = _j.keepUnusedDataFor, refetchOnMountOrArgChange = _j.refetchOnMountOrArgChange, refetchOnFocus = _j.refetchOnFocus, refetchOnReconnect = _j.refetchOnReconnect;
          T();
          assertCast(serializeQueryArgs);
          var assertTagType = function(tag) {
            if (typeof process !== "undefined" && true) {
              if (!tagTypes.includes(tag.type)) {
                console.error("Tag type '" + tag.type + "' was used, but not specified in `tagTypes`!");
              }
            }
            return tag;
          };
          Object.assign(api, {
            reducerPath,
            endpoints: {},
            internalActions: {
              onOnline,
              onOffline,
              onFocus,
              onFocusLost
            },
            util: {}
          });
          var _k = buildThunks({
            baseQuery,
            reducerPath,
            context,
            api,
            serializeQueryArgs
          }), queryThunk = _k.queryThunk, mutationThunk = _k.mutationThunk, patchQueryData = _k.patchQueryData, updateQueryData = _k.updateQueryData, upsertQueryData = _k.upsertQueryData, prefetch = _k.prefetch, buildMatchThunkActions = _k.buildMatchThunkActions;
          var _l = buildSlice({
            context,
            queryThunk,
            mutationThunk,
            reducerPath,
            assertTagType,
            config: {
              refetchOnFocus,
              refetchOnReconnect,
              refetchOnMountOrArgChange,
              keepUnusedDataFor,
              reducerPath
            }
          }), reducer = _l.reducer, sliceActions = _l.actions;
          safeAssign(api.util, {
            patchQueryData,
            updateQueryData,
            upsertQueryData,
            prefetch,
            resetApiState: sliceActions.resetApiState
          });
          safeAssign(api.internalActions, sliceActions);
          var _m = buildMiddleware({
            reducerPath,
            context,
            queryThunk,
            mutationThunk,
            api,
            assertTagType
          }), middleware = _m.middleware, middlewareActions = _m.actions;
          safeAssign(api.util, middlewareActions);
          safeAssign(api, { reducer, middleware });
          var _o = buildSelectors({
            serializeQueryArgs,
            reducerPath
          }), buildQuerySelector = _o.buildQuerySelector, buildMutationSelector = _o.buildMutationSelector, selectInvalidatedBy = _o.selectInvalidatedBy;
          safeAssign(api.util, { selectInvalidatedBy });
          var _p = buildInitiate({
            queryThunk,
            mutationThunk,
            api,
            serializeQueryArgs,
            context
          }), buildInitiateQuery = _p.buildInitiateQuery, buildInitiateMutation = _p.buildInitiateMutation, getRunningMutationThunk = _p.getRunningMutationThunk, getRunningMutationsThunk = _p.getRunningMutationsThunk, getRunningQueriesThunk = _p.getRunningQueriesThunk, getRunningQueryThunk = _p.getRunningQueryThunk, getRunningOperationPromises = _p.getRunningOperationPromises, removalWarning = _p.removalWarning;
          safeAssign(api.util, {
            getRunningOperationPromises,
            getRunningOperationPromise: removalWarning,
            getRunningMutationThunk,
            getRunningMutationsThunk,
            getRunningQueryThunk,
            getRunningQueriesThunk
          });
          return {
            name: coreModuleName,
            injectEndpoint: function(endpointName, definition) {
              var _a, _b;
              var anyApi = api;
              (_b = (_a = anyApi.endpoints)[endpointName]) != null ? _b : _a[endpointName] = {};
              if (isQueryDefinition(definition)) {
                safeAssign(anyApi.endpoints[endpointName], {
                  name: endpointName,
                  select: buildQuerySelector(endpointName, definition),
                  initiate: buildInitiateQuery(endpointName, definition)
                }, buildMatchThunkActions(queryThunk, endpointName));
              } else if (isMutationDefinition(definition)) {
                safeAssign(anyApi.endpoints[endpointName], {
                  name: endpointName,
                  select: buildMutationSelector(),
                  initiate: buildInitiateMutation(endpointName)
                }, buildMatchThunkActions(mutationThunk, endpointName));
              }
            }
          };
        }
      };
    };
    createApi = buildCreateApi(coreModule());
  }
});

export {
  QueryStatus,
  copyWithStructuralSharing,
  fetchBaseQuery,
  retry,
  setupListeners,
  skipToken,
  skipSelector,
  defaultSerializeQueryArgs,
  buildCreateApi,
  fakeBaseQuery,
  coreModule,
  rtk_query_esm_exports,
  init_rtk_query_esm
};
//# sourceMappingURL=chunk-SJDOG6BG.js.map
