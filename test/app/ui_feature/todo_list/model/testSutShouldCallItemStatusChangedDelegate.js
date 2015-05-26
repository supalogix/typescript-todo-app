
function test_sut_should_call_item_status_changed_delegate() {
   //
   // Arrange
   //

   /**
    * Define Callback Flag 
    * ====================
    *
    */
   var sutCalledItemStatusChangedDelegate = false;

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
   var name = "Bread";
   var status = "active";
   var item = new Item( name, status, guid );

   /**
    * Instantiate a Dispatcher
    * ========================
    *
    */
   var dispatcher = new EventDispatcher();

   /**
    * Test a Callback for an ItemStatusChanged Event
    * ==============================================
    *
    * By design, we assume that the SUT will pass an ItemStatusChangedEvent to a
    * callback. We instantiate a function to verify our expectations of the
    * ItemStatusChangedEvent and signal to the Jasmine Test Suite that the SUT 
    * has called the delegate.
    */
   var callback = function(ev) {
      expect( ev.name ).toEqual( name );
      expect( ev.status ).toEqual( "inactive" );
      expect( ev.guid ).toEqual( guid );
      
      sutCalledItemStatusChangedDelegate = true;
   };

   /**
    * Attach a Delegate to the Dispatcher
    * ===================================
    *
    * We need to attach a callback to an ItemAddedDelegate, and attach that
    * Delegate to an EventDispatcher.
    */
   dispatcher.addDelegate( 
      ItemStatusChangedEvent.getName(),
      new ItemStatusChangedDelegate( callback )
   );

   /**
    * Instantiate a TodoListModel
    * ===========================
    *
    * By design, a TodoListModel needs a dispatcher.
    */
   var model = new TodoListModel( dispatcher );


   /**
    * Add an Item to the TodoListModel
    * ================================
    *
    */
   model.addItem( item );

   //
   // Act 
   //
   model.changeItemStatus( guid, "inactive" );

   //
   // Assert
   //

   /**
    * Verify that the SUT Calls the Delegate
    * ======================================
    *
    * By design, we expect the callback associated with the 
    * ItemStatusChangedDelegate to set the flag variable 
    * sutCalledItemStatusChangedDelegate to true.
    */
   expect(sutCalledItemStatusChangedDelegate).toBe(true);
}
