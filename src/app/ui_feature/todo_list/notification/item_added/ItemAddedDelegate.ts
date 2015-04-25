/// <reference path="ItemAddedEvent.ts" />
/// <reference path="ItemAddedCallback.ts" />
/// <reference path="../../../common/Delegate.ts" />

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

