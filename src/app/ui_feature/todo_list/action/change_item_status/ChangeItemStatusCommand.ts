/// <reference path="../../model/TodoListModel.ts"/>
/// <reference path="../../domain/Item.ts"/>

/**
 * @todo: change this to use only the guid
 */
class ChangeItemStatusCommand {
	model:TodoListModel;

	constructor( model:TodoListModel ) {
		this.model = model;
	}

	execute( item:Item ) {
		var guid:string = item.guid;
		var status:string = item.status;
		var name:string = item.name;

		if( status === "active" )
			status = "completed";
		else
			status = "active";

		var newItem:Item = new Item( name, status, guid );
		//this.model.updateItemStatus( newItem );
	}
}

