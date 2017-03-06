/**
 * Common factory
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.factory('commonFactory', [
		function () {
			'use strict';


			function resolveObject(key, resObject, defaultValue) {
				if (!angular.isString(key) || !angular.isObject(resObject)) {
					return angular.isDefined(defaultValue) ? defaultValue : null;
				}

			  var result = resObject,
				curKey = null,
				keyParts = key.split('.');

				while (keyParts.length) {
					curKey = keyParts.shift();
					if (result && angular.isDefined(result[curKey])) {
						result = result[curKey];
					} else {
						return defaultValue;
					}
				}

				return result;
			}

			function flatToNested(flat, config) {
				var cfg = config = config || {};

				cfg.id = config.id || 'id';
				cfg.parent = config.parent || 'parent';
				cfg.children = config.children || 'children';

				cfg.rootParentValue = config.rootParentValue || 0;
				cfg.rootKey = config.rootKey || 'is_first_level';

				var index = 0,
					len,
					temp = {},
					roots = [],
					id,
					parent,
					nested = [],
					pendingChildOf = {},
					flatEl;

				for (index, len = flat.length; index < len; index++) {
					flatEl = flat[index];
					id = flatEl[cfg.id];
					parent = flatEl[cfg.parent];
					temp[id] = flatEl;

					if (parent === cfg.rootParentValue) {
						// Current object has no parent, so it's a root element.
						flatEl[cfg.rootKey] = true;
						roots.push(flatEl);
					} else {
						if (temp[parent] !== undefined) {
							// Parent is already in temp, adding the current object to its children array.
							_initPush(cfg.children, temp[parent], flatEl);
						} else {
							// Parent for this object is not yet in temp, adding it to pendingChildOf.
							_initPush(parent, pendingChildOf, flatEl);
						}
						delete flatEl[cfg.parent];
					}
					if (pendingChildOf[id] !== undefined) {
						// Current object has children pending for it. Adding these to the object.
						_multiInitPush(cfg.children, flatEl, pendingChildOf[id]);
					}
				}

				if (roots.length) {
					nested = roots;
				}

				return nested;
			}

			/* flatToNested helper method */
			function _initPush(arrayName, obj, toPush) {
				if (obj[arrayName] === undefined) {
					obj[arrayName] = [];
				}
				obj[arrayName].push(toPush);
			}

			/* flatToNested helper method */
			function _multiInitPush(arrayName, obj, toPushArray) {
				var len = toPushArray.length;

				if (obj[arrayName] === undefined) {
					obj[arrayName] = [];
				}

				while (len-- > 0) {
					obj[arrayName].push(toPushArray.shift());
				}
			}


			function findNested(obj, searchedData, memo) {
				var element,
					searchedElement;

				if (!angular.isArray(memo)) {
					memo = [];
				}

				for (element in obj) {
					if (obj.hasOwnProperty(element) && (angular.isArray(obj[element]) || angular.isObject(obj[element])) ) {

						searchedElement = _checkIfExist(obj[element], searchedData)

						if (searchedElement) {
							memo.push(angular.copy(searchedElement));
							searchedElement = false;
						} else {
							findNested(obj[element], searchedData, memo);
						}
					}
				}

				return memo;
			}

			/* findNested helper method */
			function _checkIfExist(obj, searchedData) {
				var keys = Object.keys(searchedData);

				if (!angular.isObject(searchedData) || !angular.isObject(obj)) {
					return false;
				}

				for (var index = 0, oLength = keys.length; index < oLength; index++) {
					if (typeof obj[keys[index]] === 'undefined' || obj[keys[index]] !== searchedData[keys[index]]) {
						return false;
					}
				}

				return obj;
			}

			return {
				resolveObject: resolveObject,
				flatToNested: flatToNested,
				findNested: findNested
			};
		}
	]);

})(window.angular);
