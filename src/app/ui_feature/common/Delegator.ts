/// <reference path="Delegate.ts" />
/// <reference path="ModelEvent.ts" />

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

