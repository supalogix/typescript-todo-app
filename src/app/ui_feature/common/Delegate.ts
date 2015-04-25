/// <reference path="ModelEvent.ts"/>

class Delegate {
	delegate;

	/**
	 * Make an Abstract Method
	 * 
	 * Typescript does not have abstract methods. If a subclass does not 
	 * override this method then it will throw an error. This will force the 
	 * implementor to override this function.
	 */
	execute( ev:ModelEvent ) {
		throw Error("override me");
	}

}

