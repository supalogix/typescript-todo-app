fs = require('fs')
eval( fs.readFileSync(process.env.NODE_TODOLISTMODEL,'utf-8') )

/**
 *
 */
describe("TodoListModel", function() {
	/**
	 *
	 */
	it("can add an item", function() {
		//
		// Arrange
		//
		var model = new TodoListModel( new EventDispatcher() );
		var item = new Item( "Bread", "active", Guid.create() );

		//
		// Act 
		//
		model.addItem( item );
		var items = model.getActiveItems();
	
		//
		// Assert
		//
		expect("Hello world!").toEqual("Hello world!");
	});
});
