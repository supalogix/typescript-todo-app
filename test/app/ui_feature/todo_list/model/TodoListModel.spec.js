fs = require('fs')
path = require('path')
eval( fs.readFileSync(process.env.TODO_APP,'utf-8') )
eval( fs.readFileSync(
   path.resolve(
      __dirname, 
      "testSutShouldCallItemStatusChangedDelegate.js" ), 
   'utf-8') )

/**
 * 
 */
describe("TodoListModel Self-Shut Testing", function() {

	it("should call ItemAddedDelegate",
      test_sut_should_call_item_added_delegate);

	it("should call ItemStatusChangedDelegate",
      test_sut_should_call_item_status_changed_delegate);

	it("should call ItemRemovedDelegate",
      test_sut_should_call_item_removed_delegate);

   
});

function test_sut_should_call_item_added_delegate() {
   //
   // Arrange
   //

   /**
    * Define Callback Flag 
    * ====================
    *
    * We define a flag that signals to the test suite whether or not the SUT
    * called a callback function. We expect the callback to set this variable to
    * true when the SUT calls it.
    */
   var sutCalledItemAddedDelegate = false;

   /**
    * Instantiate a Dispatcher
    * ========================
    *
    */
   var dispatcher = new EventDispatcher();

   /**
    * Test a Callback for an ItemAdded Event
    * ======================================
    *
    * By design, we assume that the SUT will pass an ItemAddedEvent to a
    * callback. We instantiate a function to verify our expectations of the
    * ItemAddedEvent and signals that the SUT has called the delegate
    */
   var callback = function(ev) {
      sutCalledItemAddedDelegate = true;
   };

   /**
    * Attach a Delegate to the Dispatcher
    * ===================================
    *
    * We need to attach a callback to an ItemAddedDelegate, and attach that
    * Delegate to an EventDispatcher.
    */
   dispatcher.addDelegate( 
      ItemAddedEvent.getName(),
      new ItemAddedDelegate( callback )
   );

   /**
    * Instantiate a TodoListModel
    * ===========================
    *
    * By design, a TodoListModel needs a dispatcher.
    */
   var model = new TodoListModel( dispatcher );

   /**
    * Instantiate an Item
    * ===================
    *
    * An Item takes three arguments:
    *   (a) an item name
    *   (b) an item status
    *   (c) a guid
    */
   var item = new Item( "Bread", "active", Guid.create() );

   //
   // Act 
   //

   /**
    * Add an Item to the TodoListModel
    * ================================
    *
    */
   model.addItem( item );

   //
   // Assert
   //

   /**
    * Verify that the SUT Calls the Delegate
    * ======================================
    *
    * By design, we expect the callback associated with the ItemAddedDelegate
    * to set the flag variable sutCalledItemAddedDelegate to true.
    */
   expect(sutCalledItemAddedDelegate).toBe(true);
}

//function test_sut_should_call_item_status_changed_delegate() {
//   //
//   // Arrange
//   //
//
//   /**
//    * Define Callback Flag 
//    * ====================
//    *
//    */
//   var sutCalledItemStatusChangedDelegate = false;
//
//   /**
//    * Instantiate an Item
//    * ===================
//    *
//    * An Item takes three arguments:
//    *   (a) an item name
//    *   (b) an item status
//    *   (c) a guid
//    */
//   var guid = Guid.create();
//   var name = "Bread";
//   var status = "active";
//   var item = new Item( name, status, guid );
//
//   /**
//    * Instantiate a Dispatcher
//    * ========================
//    *
//    */
//   var dispatcher = new EventDispatcher();
//
//   /**
//    * Test a Callback for an ItemStatusChanged Event
//    * ==============================================
//    *
//    * By design, we assume that the SUT will pass an ItemStatusChangedEvent to a
//    * callback. We instantiate a function to verify our expectations of the
//    * ItemStatusChangedEvent and signal to the Jasmine Test Suite that the SUT 
//    * has called the delegate.
//    */
//   var callback = function(ev) {
//      expect( ev.name ).toEqual( name );
//      expect( ev.status ).toEqual( "inactive" );
//      expect( ev.guid ).toEqual( guid );
//      
//      sutCalledItemStatusChangedDelegate = true;
//   };
//
//   /**
//    * Attach a Delegate to the Dispatcher
//    * ===================================
//    *
//    * We need to attach a callback to an ItemAddedDelegate, and attach that
//    * Delegate to an EventDispatcher.
//    */
//   dispatcher.addDelegate( 
//      ItemStatusChangedEvent.getName(),
//      new ItemStatusChangedDelegate( callback )
//   );
//
//   /**
//    * Instantiate a TodoListModel
//    * ===========================
//    *
//    * By design, a TodoListModel needs a dispatcher.
//    */
//   var model = new TodoListModel( dispatcher );
//
//
//   /**
//    * Add an Item to the TodoListModel
//    * ================================
//    *
//    */
//   model.addItem( item );
//
//   //
//   // Act 
//   //
//   model.changeItemStatus( guid, "inactive" );
//
//   //
//   // Assert
//   //
//
//   /**
//    * Verify that the SUT Calls the Delegate
//    * ======================================
//    *
//    * By design, we expect the callback associated with the 
//    * ItemStatusChangedDelegate to set the flag variable 
//    * sutCalledItemStatusChangedDelegate to true.
//    */
//   expect(sutCalledItemStatusChangedDelegate).toBe(true);
//}

function test_sut_should_call_item_removed_delegate() {
   //
   // Arrange
   //

   /**
    * Define Callback Flag 
    * ====================
    *
    */
   var sutCalledItemRemovedDelegate = false;

   /**
    * Instantiate a Dispatcher
    * ========================
    *
    */
   var dispatcher = new EventDispatcher();

   /**
    * Test a Callback for an ItemRemoved Event
    * ========================================
    *
    * By design, we assume that the SUT will pass an ItemRemovedEvent to a
    * callback. We instantiate a function to verify our expectations of the
    * ItemRemovedEvent and signal to the Jasmine Test Suite that the SUT has
    * called the delegate.
    */
   var callback = function(ev) {
      sutCalledItemRemovedDelegate = true;
   };

   /**
    * Attach a Delegate to the Dispatcher
    * ===================================
    *
    * We need to attach a callback to an ItemRemovedDelegate, and attach that
    * Delegate to an EventDispatcher.
    */
   dispatcher.addDelegate( 
      ItemRemovedEvent.getName(),
      new ItemRemovedDelegate( callback )
   );

   /**
    * Instantiate a TodoListModel
    * ===========================
    *
    * By design, a TodoListModel needs a dispatcher.
    */
   var model = new TodoListModel( dispatcher );

   /**
    * Instantiate an Item
    * ===================
    *
    * An Item takes three arguments:
    *   (a) an item name
    *   (b) an item status
    *   (c) a guid
    */
   var guid = Guid.create();
   var item = new Item( "Bread", "active", guid );

   /**
    * Add an Item to the TodoListModel
    * ================================
    *
    */
   model.addItem( item );

   //
   // Act 
   //
   model.removeItem( guid );


   //
   // Assert
   //

   /**
    * Verify that the SUT Calls the Delegate
    * ======================================
    *
    * By design, we expect the callback associated with the ItemRemovedDelegate
    * to set the flag variable sutCalledItemRemovedDelegate to true.
    */
   expect(sutCalledItemRemovedDelegate).toBe(true);
}
