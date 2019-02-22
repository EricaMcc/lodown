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


_.identity = function(value) {
    return value;
};

/*
typeof: Returns the type of any value in the form of a string. Can be used
to find the type of strings, numbers, booleans, undefined, null, a function, arrays,
or objects.

@param {any value} value: The value for which return the value type
*/

_.typeOf = function(value) {
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
};

/*
first: Takes an array and returns the first however many number of items in an array,
if number is specified. If the number is not specifed or a value other than a
number is input, it returns only the first item in the array.

@param {Array} array: The array for which to returns the first however many items
@param {Number} number: The number of items to return from the start of the array.
*/

_.first = function (array, number) {
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
};

/*
last: Takes an array and returns the last however many number of items in an array,
if number is specified. If the number is not specifed or a value other than a
number is input, it returns only the last item in the array.

@param {Array} array: The array for which to return the last however many items
@param {Number} number: The number of items to return from the end of the array.
*/

_.last = function(array, number) {
    const output = [];
    if (!Array.isArray(array)) {
        return [];
    } else if (!number) {
        return array[array.length-1];
    } else {
        if (number > array.length) {
            return array;
        } else {
            for (let i = array.length - number; i < array.length; i++) {
                output.push(array[i]);
            }
        }
        return output;
    }
};

/*
indexOf: Takes an array and any value. Loops through the array to find the given
value, and returns the index at which the value was found.  Returns the number
-1 if the value is not found in the given array.

@param {Array} array: The array to search through
@param {Any Value} value: The value for which to search through the given array
*/

_.indexOf = function(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
};

/** _.contains
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
*   3) You must use the ternary operator in your implementation.
* Edge Cases:
*   1) did you use === ?
*   2) what if no <value> is given?
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
*/

/*
contains: Takes an array and a value. Searches through the given array for the 
value by calling the function indexOf. If the value is found within the array,
it returns true. If the value is not found within the array, it returns false.

@param {Array} array: The array through which to loop
@param {Any Value} value: The value to search for within the array
*/

_.contains = function(array, value) {
    return (_.indexOf(array, value) !== -1) ? true : false;
};
