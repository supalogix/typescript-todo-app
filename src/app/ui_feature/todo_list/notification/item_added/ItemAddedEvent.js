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
