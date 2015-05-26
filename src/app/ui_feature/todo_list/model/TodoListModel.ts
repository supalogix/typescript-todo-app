/// <reference path="../../common/EventDispatcher.ts"/>
/// <reference path="../domain/Item.ts"/>
/// <reference path="../notification/item_added/ItemAddedEvent.ts"/>
/// <reference path="../notification/item_removed/ItemRemovedEvent.ts"/>
/// <reference path="../notification/item_status_changed/ItemStatusChangedEvent.ts"/>

class TodoListModel {
	items;
	eventDispatcher:EventDispatcher;

	constructor( eventDispatcher:EventDispatcher ) {
		this.eventDispatcher = eventDispatcher;
		//this.items = [];
		this.items = {};
	}

	addItem( item:Item ) {
		var guid:string = item.guid

		if( guid in this.items  )
			throw Error("You cannot enter the same item twice");

		this.items[guid] = [];
		this.items[guid].push( item );

		this.eventDispatcher.publish( 
			ItemAddedEvent.getName(), 
			new ItemAddedEvent( item ) );
	}

	removeItem( guid:string ) {
		if( !this.items[guid] )
			throw Error("An item with this guid does not exist");

		var length = this.items[guid].length;
		var item = this.items[guid][length-1];

		var newItem = new Item( 
			item.name,
			"deleted",
			item.guid
		);

		this.items[guid].push(newItem);
		
		this.eventDispatcher.publish(
			ItemRemovedEvent.getName(),
			new ItemRemovedEvent( item ) );
	}

	changeItemStatus( guid:string, status:string ) {

		if( !this.items[guid] )
			throw Error("An item with this guid does not exist");

		var length = this.items[guid].length;
		var item = this.items[guid][length-1];

		var newItem = new Item( 
			item.name,
			status,
			item.guid
		);

		this.items[guid].push(newItem);

		this.eventDispatcher.publish(
			ItemStatusChangedEvent.getName(),
			new ItemStatusChangedEvent( newItem )
		);
	}

	getDeletedItems() {
		var items = this.items.map( function( o ) {
			if( o.status === "deleted" ) {
				return o;
			}
		});

		return items;
	}

	getActiveItems() {

		var array = [];

		for( var guid in this.items ) {

			var length = this.items[guid].length;
			var item = this.items[guid][ length - 1 ];

			if( item.status === "active" )
				array.push( item );
		}

		return array;
	}

	getCompletedItems() {
		var items = this.items.map( function( o ) {
			if( o.status === "completed" ) {
				return o;
			}
		});

		return items;
	}

	getSize() {
		var items = this.items.map( function( o ) {
			if( o.status !== "deleted" ) {
				return o;
			}
		});

		return items.length;
	}
}

