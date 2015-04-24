/// <reference path="Guid.ts"/>
class Item {
	public guid;
	constructor( public name:string ) {
		this.guid = Guid.create();
	}
}
