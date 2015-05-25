/// <reference path="ModelEvent.ts"/>
var Delegate = (function () {
    function Delegate() {
    }
    /**
     * Make an Abstract Method
     *
     * Typescript does not have abstract methods. If a subclass does not
     * override this method then it will throw an error. This will force the
     * implementor to override this function.
     */
    Delegate.prototype.execute = function (ev) {
        throw Error("override me");
    };
    return Delegate;
})();
