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
