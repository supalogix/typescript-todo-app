/// <reference path="Delegate.ts" />
/// <reference path="ModelEvent.ts" />

class EventDispatcher {
	delegates = {};
	
	/**
	 * Add a Delegate 
	 *
	 * If a module cares about certain events then they can define a delegate for
	 * particular events. Use this function to make this class execute the
	 * delegate when someone uses this class to publish the event
	 *
	 * @param eventName the unique identifier you want to associate with a
	 * 	delegate
	 * @param delegate the delegate that you want this class to execute when
	 * 	someone uses this class to publish an event
	 */
	addDelegate( eventName:string, delegate:Delegate ) {
		if( !this.delegates[eventName] )
			this.delegates[eventName] = [];

		this.delegates[eventName].push(delegate);
	}

	/**
	 * Publish an Event 
	 *
	 * A caller will use this function to publish an event. 
	 *
	 * @param eventName the unique identifier that you want to associate with the
	 * 	event you want to publish
	 * @param ev the event that you want to publish.
	 */
	publish( eventName:string, ev:ModelEvent ) {
		if( !this.delegates[eventName] )
			return;

		this.delegates[eventName].forEach( function( delegate ) {
			delegate.execute( ev );
		});
	}
}

