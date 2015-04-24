/// <reference path="ModelEvent.ts"/>
/// <reference path="Item.ts"/>

class ItemRemovedEvent extends ModelEvent {
	constructor( public item:Item ) {
		super();
	}

	static getName() {
		return "ItemRemovedEvent";
	}
}

