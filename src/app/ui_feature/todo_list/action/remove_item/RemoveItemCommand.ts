/// <reference path="../../model/TodoListModel.ts"/>
/// <reference path="../../domain/Item.ts"/>

class RemoveItemCommand {
	model:TodoListModel;

	constructor( model:TodoListModel ){
		this.model = model;
	}

	execute( item:Item ) {
		this.model.removeItem( item );
	}
}

