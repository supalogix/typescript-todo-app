/// <reference path="../../common/Guid.ts"/>

class Item {
	private _id;
	private _guid;
	private _name;
	private _status;

	constructor( name:string, status:string, guid:string ) {
		this._id = Guid.create();
		this._guid = guid;
		this._name = name;
		this._status = status;
	}

	get id():string {
		return this._id;
	}

	get guid():string {
		return this._guid;
	}

	get name():string {
		return this._name;
	}
	
	get status():string {
		return this._status;
	}

	clone() {
		return new Item( this._name, this._status, this._guid );
	}
}
