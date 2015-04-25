/// <reference path="../../model/TodoListModel.ts"/>
/// <reference path="../../domain/Item.ts"/>

class AddItemCommand {
	model:TodoListModel;

	constructor( model:TodoListModel ) {
		this.model = model;
	}

	execute( item:Item ) {
		this.model.addItem( item );
	}
}

