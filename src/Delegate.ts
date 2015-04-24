/// <reference path="ModelEvent.ts"/>

class Delegate {
	delegate;

	execute( ev:ModelEvent ) {
		throw Error("override me");
	}

}

