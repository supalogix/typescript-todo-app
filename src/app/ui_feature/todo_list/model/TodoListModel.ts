/// <reference path="../../common/EventDispatcher.ts"/>
/// <reference path="../domain/Item.ts"/>
/// <reference path="../notification/item_added/ItemAddedEvent.ts"/>
/// <reference path="../notification/item_removed/ItemRemovedEvent.ts"/>
/// <reference path="../notification/item_status_changed/ItemStatusChangedEvent.ts"/>

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
			new ItemAddedEvent( item ) );
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

	updateItemStatus( item:Item ) {
		this.items = this.items.map( function( o ) {
			if( item.guid === o.guid ) {
				return item;
			}

			return o;
		});

		this.delegator.publish(
			ItemStatusChangedEvent.getName(),
			new ItemStatusChangedEvent( item )
		);
	}

	getSize() {
		return this.items.length;
	}
}

