/// <reference path="TodoListModel.ts"/>
/// <reference path="Item.ts"/>

class AddItemCommand {
	model:TodoListModel;

	constructor( model:TodoListModel ) {
		this.model = model;
	}
	execute( item:Item ) {
		this.model.addItem( item );
	}
}

