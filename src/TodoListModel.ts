/// <reference path="Delegator.ts"/>
/// <reference path="Item.ts"/>
/// <reference path="ItemAddedEvent.ts"/>
/// <reference path="ItemRemovedEvent.ts"/>

class TodoListModel {
	items;
	delegator:Delegator;

	constructor( delegator:Delegator ) {
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

