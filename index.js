'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
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
*/


function identity(value) {
    return value;
}
module.exports.identity = identity;

/*
typeof: Returns the type of any value in the form of a string. Can be used
to find the type of strings, numbers, booleans, undefined, null, a function, arrays,
or objects.

@param {any value} value: The value for which return the value type
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
first: Takes an array and returns the first however many number of items in an array,
if number is specified. If the number is not specifed or a value other than a
number is input, it returns only the first item in the array.

@param {Array} array: The array for which to returns the first however many items
@param {Number} number: The number of items to return from the start of the array.
*/

function first(array, number) {
   if (!Array.isArray(array)) {
       return [];
   } else if (!number) {
       return array[0];
   } else if(number > array.length){
       return array;
   } else {
       var items = [];
       for (var i = 0; i < number; i++) {
           items.push(array[i]);
       }
       return items;
   }
}
module.exports.first = first;

/*
last: Takes an array and returns the last however many number of items in an array,
if number is specified. If the number is not specifed or a value other than a
number is input, it returns only the last item in the array.

@param {Array} array: The array for which to return the last however many items
@param {Number} number: The number of items to return from the end of the array.
*/

function last(array, number) {
    const output = [];
    if (!Array.isArray(array)) {
        return [];
    } else if (!number) {
        return array[array.length-1];
    } else if (number > array.length) {
            return array;
    } else {
        for (let i = array.length - number; i < array.length; i++) {
            output.push(array[i]);
        }
    }
        return output;
}
module.exports.last = last;

/*
indexOf: Takes an array and any value. Loops through the array to find the given
value, and returns the index at which the value was found.  Returns the number
-1 if the value is not found in the given array.

@param {Array} array: The array to search through
@param {Any Value} value: The value for which to search through the given array
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

@param {Array} array: The array through which to loop
@param {Any Value} value: The value to search for within the array
*/

function contains(array, value) {
    return (indexOf(array, value) !== -1) ? true : false;
}
module.exports.contains = contains;

/*
unique: Takes an array and returns a new array with any duplicate values from
the original array removed (so that there is only one of each).

@param {Array} array: The array for which to remove any duplicates
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
filter: Takes an array and a function. Applies a test function to every
element in the array and returns true if the value passes the test, 
and false otherwise. Then, it returns a new array containing the elements that 
passed the test.

@param {Array} array: The array containing the elements to which to apply the function
@param {Function} func: The function to apply to each element in the array
*/

function filter(array, func) {
    const output = [];
    each(array, function(val, i, col) {
        if (func(val, i, col)) {
            output.push(val);
        }
    });
    return output;
}
module.exports.filter = filter;

/*
reject: Takes an array and a function. Applies a test function to every
element in the array and returns false if the value does not the test, 
and true otherwise. Then, it returns a new array containing the elements that 
did not pass the test.

@param {Array} array: The array containing the elements to which to apply the function
@param {Function} func: The function to apply to each element in the array
*/

function reject(array, func) {
    return filter(array, function(val, i, col) {
        if (!func(val, i, col)) {
            return val;
        }
    });
}
module.exports.reject = reject;

/*
partition: Takes an array and a function. Applies a test function to each
element in the array. Returns true if the element passes the test, and false
otherwise. It pushes elements that return pass the test to one subarray and
elements that do not pass the test into another subarray. It then returns an 
array containing values that passed the test at index 0 and the values that
did not pass the test at index 1.

@param {Array} array: The array containing the elements to which to apply the function
@param {Function} func: The function to apply to each element in the array
*/

function partition(array, func) {
    const output = [];
    const truthy = [];
    const falsy = [];
    each(array, function(val, i, arr) {
        if (func(val, i, arr)) {
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
element in the given array. Then, it returns an array containing the new values
produced by the function.

@param {Array or Object} collection: The array or object containing the elements
to which to apply the function
@param {Function} func: The function to apply to each element in the array
*/

function map(collection, func) {
    const output = [];
    each(collection, function(val, i, col) {
        output.push(func(val, i, col));
    });
    return output;
}
module.exports.map = map;

/*
pluck: Takes an array containing objects and a property. Returns an array containing
the values for the property of each element in the given array.

@param {Array} array: An array containing objects
@param {Property} prop: The property for which to search each object in the array
*/

function pluck(array, prop) {
    return map(array, function(object){
        return object[prop];
    });
}
module.exports.pluck = pluck;

