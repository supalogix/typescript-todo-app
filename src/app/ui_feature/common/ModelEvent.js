var ModelEvent = (function () {
    function ModelEvent() {
    }
    /**
     * Make an Abstract Method
     *
     * Typescript does not have abstract methods. Throw an error if a subclass
     * tries to execute this function. This will inform the developer to override
     * the function in a subclass.
     */
    ModelEvent.getName = function () {
        throw Error("override me");
    };
    return ModelEvent;
})();
