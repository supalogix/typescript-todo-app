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
/// <reference path="../../common/Guid.ts"/>
var Item = (function () {
    function Item(name, status, guid) {
        this._id = Guid.create();
        this._guid = guid;
        this._name = name;
        this._status = status;
    }
    Object.defineProperty(Item.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "guid", {
        get: function () {
            return this._guid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    Item.prototype.clone = function () {
        return new Item(this._name, this._status, this._guid);
    };
    return Item;
})();
/// <reference path="../../../common/ModelEvent.ts"/>
/// <reference path="../../domain/Item.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ItemAddedEvent = (function (_super) {
    __extends(ItemAddedEvent, _super);
    function ItemAddedEvent(item) {
        _super.call(this);
        this.item = item;
    }
    ItemAddedEvent.getName = function () {
        return "ItemAddedEvent";
    };
    return ItemAddedEvent;
})(ModelEvent);
/// <reference path="../../../common/ModelEvent.ts"/>
/// <reference path="../../domain/Item.ts"/>
var ItemRemovedEvent = (function (_super) {
    __extends(ItemRemovedEvent, _super);
    function ItemRemovedEvent(item) {
        _super.call(this);
        this.item = item;
    }
    ItemRemovedEvent.getName = function () {
        return "ItemRemovedEvent";
    };
    return ItemRemovedEvent;
})(ModelEvent);
/// <reference path="../../../common/ModelEvent.ts"/>
/// <reference path="../../domain/Item.ts"/>
var ItemStatusChangedEvent = (function (_super) {
    __extends(ItemStatusChangedEvent, _super);
    function ItemStatusChangedEvent(item) {
        _super.call(this);
        this.item = item;
    }
    ItemStatusChangedEvent.getName = function () {
        return "ItemStatusChangedEvent";
    };
    return ItemStatusChangedEvent;
})(ModelEvent);
/// <reference path="../../common/EventDispatcher.ts"/>
/// <reference path="../domain/Item.ts"/>
/// <reference path="../notification/item_added/ItemAddedEvent.ts"/>
/// <reference path="../notification/item_removed/ItemRemovedEvent.ts"/>
/// <reference path="../notification/item_status_changed/ItemStatusChangedEvent.ts"/>
var TodoListModel = (function () {
    function TodoListModel(delegator) {
        this.delegator = delegator;
        //this.items = [];
        this.items = {};
    }
    TodoListModel.prototype.addItem = function (item) {
        var guid = item.guid;
        if (guid in this.items)
            throw Error("You cannot enter the same item twice");
        this.items[guid] = [];
        this.items[guid].push(item);
        this.delegator.publish(ItemAddedEvent.getName(), new ItemAddedEvent(item));
    };
    TodoListModel.prototype.removeItem = function (guid) {
        if (!this.items[guid])
            throw Error("An item with this guid does not exist");
        var length = this.items[guid].length;
        var item = this.items[guid][length - 1];
        var newItem = new Item(item.name(), "deleted", item.guid());
        this.items[guid].push(newItem);
        this.delegator.publish(ItemRemovedEvent.getName(), new ItemRemovedEvent(item));
    };
    TodoListModel.prototype.updateItemStatus = function (guid, status) {
        if (!this.items[guid])
            throw Error("An item with this guid does not exist");
        var length = this.items[guid].length;
        var item = this.items[guid][length - 1];
        var newItem = new Item(item.name(), status, item.guid());
        this.items[guid].push(newItem);
        this.delegator.publish(ItemStatusChangedEvent.getName(), new ItemStatusChangedEvent(newItem));
    };
    TodoListModel.prototype.getDeletedItems = function () {
        var items = this.items.map(function (o) {
            if (o.status === "deleted") {
                return item;
            }
        });
        return items;
    };
    TodoListModel.prototype.getActiveItems = function () {
        var array = [];
        for (var guid in this.items) {
            var length = this.items[guid].length;
            var item = this.items[guid][length - 1];
            if (item.status === "active")
                array.push(item);
        }
        return array;
    };
    TodoListModel.prototype.getCompletedItems = function () {
        var items = this.items.map(function (o) {
            if (o.status === "completed") {
                return item;
            }
        });
        return items;
    };
    TodoListModel.prototype.getSize = function () {
        var items = this.items.map(function (o) {
            if (o.status !== "deleted") {
                return item;
            }
        });
        return items.length;
    };
    return TodoListModel;
})();
