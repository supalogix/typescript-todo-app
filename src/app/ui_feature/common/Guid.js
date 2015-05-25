var Guid = (function () {
    function Guid() {
    }
    /**
     * Generate a GUID
     *
     * Use this function to generate a guid.
     *
     * @returns a guid
     */
    Guid.create = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    return Guid;
})();
