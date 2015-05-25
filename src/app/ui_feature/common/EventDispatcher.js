/// <reference path="Delegate.ts" />
/// <reference path="ModelEvent.ts" />
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.delegates = {};
    }
    /**
     * Add a Delegate
     *
     * If a module cares about certain events then they can define a delegate for
     * particular events. Use this function to make this class execute the
     * delegate when someone uses this class to publish the event
     *
     * @param eventName the unique identifier you want to associate with a
     * 	delegate
     * @param delegate the delegate that you want this class to execute when
     * 	someone uses this class to publish an event
     */
    EventDispatcher.prototype.addDelegate = function (eventName, delegate) {
        if (!this.delegates[eventName])
            this.delegates[eventName] = [];
        this.delegates[eventName].push(delegate);
    };
    /**
     * Publish an Event
     *
     * A caller will use this function to publish an event.
     *
     * @param eventName the unique identifier that you want to associate with the
     * 	event you want to publish
     * @param ev the event that you want to publish.
     */
    EventDispatcher.prototype.publish = function (eventName, ev) {
        if (!this.delegates[eventName])
            return;
        this.delegates[eventName].forEach(function (delegate) {
            delegate.execute(ev);
        });
    };
    return EventDispatcher;
})();
