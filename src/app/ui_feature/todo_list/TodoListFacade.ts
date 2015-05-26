/// <reference path="model/TodoListModel.ts" />
/// <reference path="../common/EventDispatcher.ts" />
/// <reference path="notification/item_added/ItemAddedCallback.ts" />
/// <reference path="notification/item_added/ItemAddedEvent.ts" />
/// <reference path="notification/item_added/ItemAddedDelegate.ts" />
/// <reference path="notification/item_removed/ItemRemovedCallback.ts" />
/// <reference path="notification/item_removed/ItemRemovedDelegate.ts" />
/// <reference path="notification/item_removed/ItemRemovedEvent.ts" />
/// <reference path="notification/item_status_changed/ItemStatusChangedCallback.ts" />
/// <reference path="notification/item_status_changed/ItemStatusChangedDelegate.ts" />
/// <reference path="notification/item_status_changed/ItemStatusChangedEvent.ts" />
/// <reference path="action/add_item/AddItemCommand.ts" />
/// <reference path="action/remove_item/RemoveItemCommand.ts" />
/// <reference path="action/change_item_status/ChangeItemStatusCommand.ts" />

class TodoListFacade {
	model:TodoListModel;
	dispatcher:EventDispatcher;

	constructor() {
		this.dispatcher = new EventDispatcher();
		this.model = new TodoListModel( this.dispatcher );
	}

	registerItemAddedCallback( callback:ItemAddedCallback ) {
		this.dispatcher.addDelegate( 
			ItemAddedEvent.getName(), 
			new ItemAddedDelegate(callback) );
	}

	registerItemRemovedCallback( callback:ItemRemovedCallback ) {
		this.dispatcher.addDelegate( 
			ItemRemovedEvent.getName(),
			new ItemRemovedDelegate(callback) );
	}

	registerItemStatusChangedCallback( callback:ItemStatusChangedCallback ) {
		this.dispatcher.addDelegate( 
			ItemStatusChangedEvent.getName(),
			new ItemStatusChangedDelegate(callback) );
	}

	addItem( name:string ) {
		this.model.addItem( new Item(name, "active", Guid.create() ) );
	}

	removeItem( guid:string ) {
		this.model.removeItem( guid );
	}

	changeItemStatus( guid:string, status:string ) {
		this.model.changeItemStatus( guid, status );
	}

	getAddItemCommand():AddItemCommand {
		var command:AddItemCommand = new AddItemCommand(this.model);
		return command;
	}

	getRemoveItemCommand():RemoveItemCommand {
		var command:RemoveItemCommand = new RemoveItemCommand( this.model );
		return command;
	}

	getChangeItemStatusCommand():ChangeItemStatusCommand {
		var command:ChangeItemStatusCommand = new ChangeItemStatusCommand( this.model );
		return command;
	}

	getModel() {
		return this.model;
	}
}

