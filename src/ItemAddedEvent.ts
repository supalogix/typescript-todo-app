/// <reference path="ModelEvent.ts"/>
/// <reference path="Item.ts"/>

class ItemAddedEvent extends ModelEvent {
	constructor( public item:Item ) {
		super();
	}
	static getName() {
		return "ItemAddedEvent";
	}
}

