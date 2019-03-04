'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection.
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/*
identity: Returns any input value

@param {any value} value: The value to return

@return {Any Value}: The input value
*/


function identity(value) {
    return value;
}
module.exports.identity = identity;

/*
typeof: Returns the value type of any input value in the form of a string. Can be used
to find the types of strings, numbers, booleans, undefined, null, a function, arrays,
or objects.

@param {any value} value: The value for which to return the value type

@return {String}: A string describing the value type of the given value
*/

function typeOf(value) {
    if (typeof value === 'string') {
        return 'string';
    } else if (typeof value === 'number') {
        return 'number';
    } else if (typeof value === 'boolean') {
        return 'boolean';
    } else if (typeof value === 'function') {
        return 'function';
        
    } else if (value === null) {
        return 'null';
    } else if (value === undefined) {
        return 'undefined';
    } else if (Array.isArray(value)) {
        return 'array';
    } else {
        return 'object';
    }
}
module.exports.typeOf = typeOf;

/*
first: Takes an array and returns an array containing the first however many 
number of items from the input array, if a number is specified. If the argument 
input is not an array, returns an empty array. If the number is not specifed or
a value other than a number is input, it returns only the first item from the
input array.

@param {Array} array: The array from which to returns the first given number of items
@param {Number} num: The number of items to return from the start of the array

@return {Any Value}: returns a new array containing the first given number of items
from the input array
*/

function first(array, num) {
   if (!Array.isArray(array)) {
       return [];
   } else if (!num) {
       return array[0];
   } else if(num > array.length){
       return array;
   } else {
       var items = [];
       for (var i = 0; i < num; i++) {
           items.push(array[i]);
       }
       return items;
   }
}
module.exports.first = first;

/*
last: Takes an array and returns an array containing the last given number of items,
if a number is specified. If the number is not specifed or a value other than a
number is input, it returns only the last item from the input array. If the input
argument is not an array, returns an empty array.

@param {Array} array: The array from which to return the last given number of items
@param {Number} num: The number of items to return from the end of the array.

@return {Any Value}: returns a new array containing the last given number of items
from the input array
*/

function last(array, num) {
    const output = [];
    if (!Array.isArray(array)) {
        return [];
    } else if (!num) {
        return array[array.length-1];
    } else if (num > array.length) {
            return array;
    } else {
        for (let i = array.length - num; i < array.length; i++) {
            output.push(array[i]);
        }
    }
        return output;
}
module.exports.last = last;

/*
indexOf: Takes an array and any value. Loops through the array to find the given
value, and returns the index at which the value was found.  If there exist multiples
of the given value, it returns the index of the first value found. Returns the number
-1 if the value is not found in the given array.

@param {Array} array: The array to search (loop) through
@param {Any Value} value: The value for which to search through the given array

@return {Number}: returns the index at which the given value was found or returns
-1 if that value was not found
*/

function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}
module.exports.indexOf = indexOf;

/*
contains: Takes an array and a value. Searches through the given array for the 
value by calling the function indexOf. If the value is found within the array,
it returns true. If the value is not found within the array, it returns false.

@param {Array} array: The array through which to seach (loop through)
@param {Any Value} value: The value to search for within the given array

@return {Boolean}: returns true if the given value is found in the array, false
otherwise
*/

function contains(array, value) {
    return (indexOf(array, value) !== -1) ? true : false;
}
module.exports.contains = contains;

/*
unique: Takes an array and returns a new array with any duplicate values from
the original array removed (so that there is only one of each value).

@param {Array} array: The array from which to remove any duplicates

@return {Array}: An array containing no duplicate values
*/

function unique(array) {
    const output = [];
    each(array, function(val, i, arr) {
        if (indexOf(output, val) === -1) {
            output.push(val);
        }    
    });
    return output;
}
module.exports.unique = unique;

/*
filter: Takes an array and a function. Applies the test function to each
value in the array and returns true if it passes the test, and false otherwise. 
Then it returns a new array containing the values which passed the test.

@param {Array} array: The array containing the values to which to apply the 
test function
@param {Function} test: The test function to apply to each value in the given array

@returns {Array}: An array containing all the values which passed the given
test function
*/

function filter(array, test) {
    const output = [];
    each(array, function(val, i, col) {
        if (test(val, i, col)) {
            output.push(val);
        }
    });
    return output;
}
module.exports.filter = filter;

/*
filter(array, testFunction() {
    if 
})
*/

/*
reject: Takes an array and a function. Applies the test function to each value in
the array and returns false if the value does not pass the test, and true otherwise. 
Then it returns a new array containing the values that did not pass the test.

@param {Array} array: The array containing the values to which to apply the
test function
@param {Function} test: The test function to apply to each value in the array

@return {Array}: An array containing all the values which did not pass the given
test function
*/

function reject(array, test) {
    return filter(array, function(val, i, col) {
        if (!test(val, i, col)) {
            return val;
        }
    });
}
module.exports.reject = reject;

/*
partition: Takes an array and a test function. Applies the test function to each
value in the array. Returns true if it passes the test and false otherwise. 
It pushes any values that pass the test to one subarray and any that do not pass
the test into another subarray. It then returns an array containing the subarray
of values that passed the test at index 0 and the subarray of values that did
not pass the test at index 1.

@param {Array} array: The array containing the elements to which to apply the
test function
@param {Function} test: The test function to apply to each element in the array

@return {Array}: An array containing a subarray of values that passed the test
function and another subarray of values that failed
*/

function partition(array, test) {
    const output = [];
    const truthy = [];
    const falsy = [];
    each(array, function(val, i, arr) {
        if (test(val, i, arr)) {
            truthy.push(val);
        } else {
            falsy.push(val);
        }
    });
    output.push(truthy, falsy);
    return output;
}
module.exports.partition = partition;

/*
map: Takes an array or an object and a function. Applies the function to each
values from the given array/object. Then, it returns an array containing the new
values produced by the function.

@param {Array or Object} collection: The array or object containing the values
to which to apply the function
@param {Function} action: The function to apply to each value in the array/object

@return {Array}: An array containing the new values created after applying
the function to the given array/object values
*/

function map(collection, action) {
    const output = [];
    each(collection, function(val, i, col) {
        output.push(action(val, i, col));
    });
    return output;
}
module.exports.map = map;

/*
pluck: Takes an array containing objects and a property. Returns an array containing
the values for the given property from each object in the array.

@param {Array} array: An array containing objects
@param {Property} prop: The property for which to search each object in the array

@return {Array}: An array containing the values of the given property for each
object in the input array
*/

function pluck(array, prop) {
    return map(array, function(object){
        return object[prop];
    });
}
module.exports.pluck = pluck;

/*
every: Takes an array or an object and a test function.  Applies the test function
to each value and returns true only if All values pass the test function, and false 
if any values fail. If no test function is given, it returns true if all of the
given values are truthy and false if any values are falsy.

@param {Array or Object} collection: The array or object containing the values
to which to apply the test function
@param {Function} test: The test function to apply to the values in the given
array or object

@return {Boolean}: returns true if ALL values passed the test function,
false if any values failed
*/

function every(collection, test) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (!test && !collection[i]) {
                    return false;
                } else if (test && !test(collection[i], i, collection)) {
                    return false;
            }
        }
        return true;
    } else {
        for (let key in collection) {
            if (!test && !collection[key]) {
                return false;
            } else if (test && !test(collection[key], key, collection)) {
                return false;
            }
        }
        return true;
    }
}
module.exports.every = every;

/*
some: Takes an array or an object and a test function.  Applies the test function
to each value and returns true if ANY values are true for the test function, and
false if all values fail. If no test function is given, it returns true if any of the
given values are truthy and false if all values are falsy.

@param {Array or Object} collection: The array or object containing the values
to which to apply the test function
@param {Function} test: The test function to apply to the values in the given
array or object

@return {Boolean}: returns true if ANY values passed the test function,
false if all values failed
*/

function some(collection, test) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (!test && collection[i]) {
                    return true;
                } else if (test && test(collection[i], i, collection)) {
                    return true;
            }
        }
        return false;
    } else {
        for (let key in collection) {
            if (!test && collection[key]) {
                return true;
            } else if (test && test(collection[key], key, collection)) {
                return true;
            }
        }
        return false;
    }
}
module.exports.some = some;

/*
reduce: Takes an array, a function, and a seed (starting value). Applies the function
to the seed (if given) and the first value in the array to produce a new value. 
If a seed is not given, it applies the function to the first two values in the array. 
It then takes the new value produced and passes it along with the next value in
the array to the given function. It does this until the all values in the array have
been passed to the function and all array values are reduced down to a single value,
which it then returns.

@param {Array} array: The array to reduce down to a single value
@param {Function} action: The function to apply to each value in the given array
@param {Any Value} seed: The first value to which to apply the function; if it
is not specified, the first value in the array becomes the seed

@return {Any Value}: A single value created by applying the given function to 
all values in the input array
*/

function reduce(array, action, seed) {
    let val;
    for (let i = 0; i < array.length - 1; i++) {
        // if there is no seed, assign seed to first element of array
        if (seed === undefined) {
            seed = array[0];
        // continue to next iteration
            i = 1;
        }
        // if val has not been assigned yet, call the function with seed
        if (val === undefined) {
            val = action(seed, array[i], i);
        // if val has already been assigned, call the function using the previous
        // function's result
        } else {
            val = action(val, array[i], i);
        }
    }
    // return the final function call
    return action(val, array[array.length-1], array.length-1);
}
module.exports.reduce = reduce;

/*
extend: Takes an object and an indefinite number of additional objects. Copies
the keys and values of each additional object to the first given object and then
returns the first object containing the new keys and values.

@param {Object} obj: The object to which to copy the keys and values of any other
given objects
@param {Object} arguments: The additional objects give as arguments  from which
to copy values and keys to the first given object

@return {Object}: The first input object now containing the keys and values
of all other objects given as arguments
*/

function extend(obj) {
    for (let i = 1; i < arguments.length; i++) {
        for (let key in arguments[i]) {
            obj[key] = arguments[i][key];
        }
    }
    return obj;
}
module.exports.extend = extend;