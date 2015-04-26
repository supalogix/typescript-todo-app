/// <reference path="ItemStatusChangedCallback.ts" />
/// <reference path="ItemStatusChangedEvent.ts" />
/// <reference path="../../../common/Delegate.ts" />

class ItemStatusChangedDelegate extends Delegate {
	constructor( delegate:ItemStatusChangedCallback ) {
		super();
		this.delegate = delegate;
	}

	execute( ev:ItemStatusChangedEvent ) {
		var item = ev.item;
		this.delegate( item );
	}
}

