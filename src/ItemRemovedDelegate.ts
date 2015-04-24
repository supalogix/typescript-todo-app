/// <reference path="ItemRemovedCallback.ts" />
/// <reference path="ItemRemovedEvent.ts" />
/// <reference path="Delegate.ts" />

class ItemRemovedDelegate extends Delegate {
	constructor( delegate:ItemRemovedCallback ) {
		super();
		this.delegate = delegate;
	}

	execute( ev:ItemRemovedEvent ) {
		var item = ev.item;
		this.delegate( item );
	}
}

