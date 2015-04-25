/// <reference path="../../../common/ModelEvent.ts"/>
/// <reference path="../../domain/Item.ts"/>

class ItemRemovedEvent extends ModelEvent {
	constructor( public item:Item ) {
		super();
	}

	static getName() {
		return "ItemRemovedEvent";
	}
}

