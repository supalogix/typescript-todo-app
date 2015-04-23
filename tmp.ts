class Guid {
	static create() {
		function s4() {
			 return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
	  }

	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		 s4() + '-' + s4() + s4() + s4();
	}
}

class Item {
	public guid;
	constructor( public name:string ) {
		this.guid = Guid.create();
	}
}

class ItemCollection {
	public items;
}

class ModelEvent {
	static getName() {
		throw Error("override me");
	}
}

class ItemAddedEvent extends ModelEvent {
	constructor( public item:Item ) {
		super();
	}
	static getName() {
		return "ItemAddedEvent";
	}
}

class ItemRemovedEvent extends ModelEvent {
	constructor( public item:Item ) {
		super();
	}

	static getName() {
		return "ItemRemovedEvent";
	}
}

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

class AddItemCommand {
	model:TodoListModel;

	constructor( model:TodoListModel ) {
		this.model = model;
	}
	execute( item:Item ) {
		this.model.addItem( item );
	}
}

class RemoveItemCommand {
	model:TodoListModel;

	constructor( model:TodoListModel ){
		this.model = model;
	}

	execute( item:Item ) {
		this.model.removeItem( item );
	}
}

class Delegate {
	delegate;

	execute( ev:ModelEvent ) {
		throw Error("override me");
	}

}

interface ItemAddedCallback {
	(item:Item);
}

interface ItemRemovedCallback {
	(item:Item);
}

class ItemAddedDelegate extends Delegate {
	constructor( delegate:ItemAddedCallback ) {
		super();
		this.delegate = delegate;
	}

	execute( ev:ItemAddedEvent ) {
		var item = ev.item;
		this.delegate( item );
	}
}

class ItemRemovedDelegate extends Delegate {
	constructor( delegate:ItemRemovedCallback ) {
		super();
		this.delegate = delegate;
	}

	execute( ev:ItemAddedEvent ) {
		var item = ev.item;
		this.delegate( item );
	}
}

class Delegator {
	delegates = {};
	
	addDelegate( eventName:string, delegate:Delegate ) {
		this.delegates[eventName] = delegate;
	}

	publish( eventName:string, ev:ModelEvent ) {
		var delegate = this.delegates[eventName];
		delegate.execute( ev );
	}
}

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


var facade:TodoListFacade = new TodoListFacade();

facade.registerItemAddedCallback( function(item) {
	console.log( "item added: ", item);
});
facade.registerItemRemovedCallback( function(item) {
	console.log( "item removed:", item);
});

var addCommand = facade.getAddItemCommand();
var milk = new Item("Milk");
var bread = new Item("Bread");
var eggs = new Item("Eggs");
addCommand.execute( milk );
addCommand.execute( bread );
addCommand.execute( eggs );

var removeCommand = facade.getRemoveItemCommand();
removeCommand.execute(milk);

var model = facade.getModel();
console.log(model.getSize());
