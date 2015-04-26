/// <reference path="../../../common/ModelEvent.ts"/>
/// <reference path="../../domain/Item.ts"/>

class ItemStatusChangedEvent extends ModelEvent {
	constructor( public item:Item ) {
		super();
	}

	static getName() {
		return "ItemStatusChangedEvent";
	}
}

