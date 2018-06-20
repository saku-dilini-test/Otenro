
module.exports = {
    /**
     * Generate a Random number with specific length
     * @param length - length of the random number
     * @param callback - callback function
     **/
    generateRandomNumber: function (length, callback) {
        function pinGenerator() {
            this.length = length;
            this.timestamp = +new Date;
            var _getRandomInt = function( min, max ) {
                return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
            };
            this.generate = function() {
                var ts = this.timestamp.toString();
                var parts = ts.split( "" ).reverse();
                var random = "";
                for( var i = 0; i < this.length; ++i ) {
                    var index = _getRandomInt( 0, parts.length - 1 );
                    random += parts[index];
                }
                return random;
            }
        }
        var pGenerator = new pinGenerator();
        var randomNumber = pGenerator.generate();
        if (!randomNumber) {
            sails.log.error('Error occurred while generating random number.');
            callback({ message: 'error'});
        } else {
            sails.log.debug('Successfully generated random number, randomNumber : ' + randomNumber);
            callback({ message: 'success', number: randomNumber});
        }
    }
};