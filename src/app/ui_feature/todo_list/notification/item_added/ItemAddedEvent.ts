/// <reference path="../../../common/ModelEvent.ts"/>
/// <reference path="../../domain/Item.ts"/>

class ItemAddedEvent extends ModelEvent {
	constructor( public item:Item ) {
		super();
	}
	static getName() {
		return "ItemAddedEvent";
	}
}

