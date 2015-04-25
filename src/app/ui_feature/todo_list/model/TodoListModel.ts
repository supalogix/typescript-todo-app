/// <reference path="../../common/EventDispatcher.ts"/>
/// <reference path="../domain/Item.ts"/>
/// <reference path="../notification/item_added/ItemAddedEvent.ts"/>
/// <reference path="../notification/item_removed/ItemRemovedEvent.ts"/>

class TodoListModel {
	items;
	delegator:EventDispatcher;

	constructor( delegator:EventDispatcher ) {
		this.delegator = delegator;
		this.items = [];
	}

	addItem( item:Item ) {
		this.items.push( item );
		this.delegator.publish( 
			ItemAddedEvent.getName(), 
			new ItemAddedEvent(item) );
	}

	removeItem( item:Item ) {
		var index = this.items.indexOf( item );
		
		if( index > -1 )  {
			this.items.splice( index, 1 );
			this.delegator.publish(
				ItemRemovedEvent.getName(),
				new ItemRemovedEvent( item ) );
		}
	}

	getSize() {
		return this.items.length;
	}
}

