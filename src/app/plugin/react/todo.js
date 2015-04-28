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
        this.delegates[eventName] = delegate;
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
        var delegate = this.delegates[eventName];
        delegate.execute(ev);
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
        this._guid = guid;
        this._name = name;
        this._status = status;
    }
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
        return new Item(this._guid, this._name, this._status);
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
        this.items = [];
    }
    TodoListModel.prototype.addItem = function (item) {
        this.items.push(item);
        this.delegator.publish(ItemAddedEvent.getName(), new ItemAddedEvent(item));
    };
    TodoListModel.prototype.removeItem = function (item) {
        var index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            this.delegator.publish(ItemRemovedEvent.getName(), new ItemRemovedEvent(item));
        }
    };
    TodoListModel.prototype.updateItemStatus = function (item) {
        this.items = this.items.map(function (o) {
            if (item.guid === o.guid) {
                return item;
            }
            return o;
        });
        this.delegator.publish(ItemStatusChangedEvent.getName(), new ItemStatusChangedEvent(item));
    };
    TodoListModel.prototype.getSize = function () {
        return this.items.length;
    };
    return TodoListModel;
})();
/// <reference path="../../domain/Item.ts" />
/// <reference path="ItemAddedEvent.ts" />
/// <reference path="ItemAddedCallback.ts" />
/// <reference path="../../../common/Delegate.ts" />
var ItemAddedDelegate = (function (_super) {
    __extends(ItemAddedDelegate, _super);
    function ItemAddedDelegate(delegate) {
        _super.call(this);
        this.delegate = delegate;
    }
    ItemAddedDelegate.prototype.execute = function (ev) {
        var item = ev.item;
        this.delegate(item);
    };
    return ItemAddedDelegate;
})(Delegate);
/// <reference path="../../domain/Item.ts" />
/// <reference path="ItemRemovedCallback.ts" />
/// <reference path="ItemRemovedEvent.ts" />
/// <reference path="../../../common/Delegate.ts" />
var ItemRemovedDelegate = (function (_super) {
    __extends(ItemRemovedDelegate, _super);
    function ItemRemovedDelegate(delegate) {
        _super.call(this);
        this.delegate = delegate;
    }
    ItemRemovedDelegate.prototype.execute = function (ev) {
        var item = ev.item;
        this.delegate(item);
    };
    return ItemRemovedDelegate;
})(Delegate);
/// <reference path="../../domain/Item.ts" />
/// <reference path="ItemStatusChangedCallback.ts" />
/// <reference path="ItemStatusChangedEvent.ts" />
/// <reference path="../../../common/Delegate.ts" />
var ItemStatusChangedDelegate = (function (_super) {
    __extends(ItemStatusChangedDelegate, _super);
    function ItemStatusChangedDelegate(delegate) {
        _super.call(this);
        this.delegate = delegate;
    }
    ItemStatusChangedDelegate.prototype.execute = function (ev) {
        var item = ev.item;
        this.delegate(item);
    };
    return ItemStatusChangedDelegate;
})(Delegate);
/// <reference path="../../model/TodoListModel.ts"/>
/// <reference path="../../domain/Item.ts"/>
var AddItemCommand = (function () {
    function AddItemCommand(model) {
        this.model = model;
    }
    AddItemCommand.prototype.execute = function (item) {
        this.model.addItem(item);
    };
    return AddItemCommand;
})();
/// <reference path="../../model/TodoListModel.ts"/>
/// <reference path="../../domain/Item.ts"/>
var RemoveItemCommand = (function () {
    function RemoveItemCommand(model) {
        this.model = model;
    }
    RemoveItemCommand.prototype.execute = function (item) {
        this.model.removeItem(item);
    };
    return RemoveItemCommand;
})();
/// <reference path="../../model/TodoListModel.ts"/>
/// <reference path="../../domain/Item.ts"/>
var ChangeItemStatusCommand = (function () {
    function ChangeItemStatusCommand(model) {
        this.model = model;
    }
    ChangeItemStatusCommand.prototype.execute = function (item) {
        var guid = item.guid;
        var status = item.status;
        var name = item.name;
        if (status === "active")
            status = "completed";
        else
            status = "active";
        var newItem = new Item(name, status, guid);
        this.model.updateItemStatus(newItem);
    };
    return ChangeItemStatusCommand;
})();
/// <reference path="model/TodoListModel.ts" />
/// <reference path="../common/EventDispatcher.ts" />
/// <reference path="notification/item_added/ItemAddedCallback.ts" />
/// <reference path="notification/item_added/ItemAddedEvent.ts" />
/// <reference path="notification/item_added/ItemAddedDelegate.ts" />
/// <reference path="notification/item_removed/ItemRemovedCallback.ts" />
/// <reference path="notification/item_removed/ItemRemovedDelegate.ts" />
/// <reference path="notification/item_removed/ItemRemovedEvent.ts" />
/// <reference path="notification/item_status_changed/ItemStatusChangedCallback.ts" />
/// <reference path="notification/item_status_changed/ItemStatusChangedDelegate.ts" />
/// <reference path="notification/item_status_changed/ItemStatusChangedEvent.ts" />
/// <reference path="action/add_item/AddItemCommand.ts" />
/// <reference path="action/remove_item/RemoveItemCommand.ts" />
/// <reference path="action/change_item_status/ChangeItemStatusCommand.ts" />
var TodoListFacade = (function () {
    function TodoListFacade() {
        this.delegator = new EventDispatcher();
        this.model = new TodoListModel(this.delegator);
    }
    TodoListFacade.prototype.registerItemAddedCallback = function (callback) {
        this.delegator.addDelegate(ItemAddedEvent.getName(), new ItemAddedDelegate(callback));
    };
    TodoListFacade.prototype.registerItemRemovedCallback = function (callback) {
        this.delegator.addDelegate(ItemRemovedEvent.getName(), new ItemRemovedDelegate(callback));
    };
    TodoListFacade.prototype.registerItemStatusChangedCallback = function (callback) {
        this.delegator.addDelegate(ItemStatusChangedEvent.getName(), new ItemStatusChangedDelegate(callback));
    };
    TodoListFacade.prototype.getAddItemCommand = function () {
        var command = new AddItemCommand(this.model);
        return command;
    };
    TodoListFacade.prototype.getRemoveItemCommand = function () {
        var command = new RemoveItemCommand(this.model);
        return command;
    };
    TodoListFacade.prototype.getChangeItemStatusCommand = function () {
        var command = new ChangeItemStatusCommand(this.model);
        return command;
    };
    TodoListFacade.prototype.getModel = function () {
        return this.model;
    };
    return TodoListFacade;
})();
