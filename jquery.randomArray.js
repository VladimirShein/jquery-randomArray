/**
* Name: jQuery.randomArray
* Description: returns random positive array of int without excluded elements
* By: vladimir.shein@axamit.com
* Version 0.1.1
* Last Modified: 04/09/2013
*
* Augments:
*      arrayLength - length of returned array
*      maxValue - maximal value of elements
*      exclude - element that should be excluded from target array
 * Example:
 *      $({arrayLength: 4, maxValue: 7}).randomArray() == [4, 3, 5, 0]
*/
(function($){
    var options = {
        arrayLength: 3,
        maxValue: 99,
        exclude: null
    };
    var randomizer = {
        array: null,
        randomArray: function () {
            this._checkFields();
            this.array = [];
            while (this.array.length < options.arrayLength) {
                var element = this._randomNumber();
                if (this._isElementValid(element))
                    this.array.push(element)
            }
            return this.array;
        },
        _isElementValid: function (element) {
            var isExcludedElement =  options.exclude && element == options.exclude;
            var isInArray =    this.array.indexOf(element) > -1;
            return !isExcludedElement && !isInArray;
        },
        _randomNumber: function () {
            return Math.floor(Math.random() * options.maxValue);
        },
        _checkFields: function () {
            if (options.maxValue <= 0)
                throw 'too small max value ' + options.maxValue;
            else if (options.arrayLength > options.maxValue - 1)
                throw 'big array and too small values ' + options.maxValue;
            else if (options.exclude && options.arrayLength > options.maxValue)
                throw 'big array and too small values';
        }
    };
    $.fn.randomArray = function(obj){
        $.extend(options, obj || this[0] || {});
        return randomizer.randomArray();
    };
})(jQuery);