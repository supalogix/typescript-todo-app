/// <reference path="TodoListModel.ts"/>
/// <reference path="Item.ts"/>

class RemoveItemCommand {
	model:TodoListModel;

	constructor( model:TodoListModel ){
		this.model = model;
	}

	execute( item:Item ) {
		this.model.removeItem( item );
	}
}

