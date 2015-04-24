/// <reference path="TodoListModel.ts" />
/// <reference path="Delegator.ts" />
/// <reference path="ItemAddedCallback.ts" />
/// <reference path="ItemRemovedCallback.ts" />
/// <reference path="ItemRemovedEvent.ts" />
/// <reference path="ItemAddedEvent.ts" />
/// <reference path="AddItemCommand.ts" />
/// <reference path="RemoveItemCommand.ts" />

class TodoListFacade {
	model:TodoListModel;
	delegator:Delegator;

	constructor() {
		this.delegator = new Delegator();
		this.model = new TodoListModel( this.delegator );
	}

	registerItemAddedCallback( callback:ItemAddedCallback ) {
		this.delegator.addDelegate( 
			ItemAddedEvent.getName(), 
			new ItemAddedDelegate(callback) );
	}

	registerItemRemovedCallback( callback:ItemRemovedCallback ) {
		this.delegator.addDelegate( 
			ItemRemovedEvent.getName(),
			new ItemRemovedDelegate(callback) );
	}

	getAddItemCommand() {
		var command:AddItemCommand = new AddItemCommand(this.model);
		return command;
	}

	getRemoveItemCommand() {
		var command:RemoveItemCommand = new RemoveItemCommand( this.model );
		return command;
	}

	getModel() {
		return this.model;
	}
}

