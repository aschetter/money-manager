// Inialize tabs for creating an event
$('#addTabs').tabs();

// Inialize radio buttons for determining frequency of recurring events
$('#frequency').buttonset();
$('#transactionType').buttonset();

// Inialize datepickers to add single and recurring events
$('#singleDate').datepicker({dateFormat: "yy-mm-dd"});
$('#recurringStartDate').datepicker({dateFormat: "yy-mm-dd"});
$('#recurringEndDate').datepicker({dateFormat: "yy-mm-dd"});

// Inialize styling for all buttons
$('button').button();

// Hold event object to pass from event click to dialog form
var selectedEvent;

// Test event objects
var events = [
    {
        id: 1,
        title: 'Electric Bill: $100',
        start: '2014-11-15',
        cashFlow: -100,
        color: 'red'
    },
    {
        id: 2,
        title: 'Water Bill: $100',
        start: '2014-11-16',
        cashFlow: -80,
        color: 'red'
    }
];

// Initialize calendar plug-in
$('#calendar').fullCalendar({

    // Header styling for month view
    header: {
        left: 'prev',
        center: 'title',
        right: 'next'
    },

    // Allow dragging events between days
    editable: true,

    // Load events array
    events: events,

    // Tooltip displays the date of an event on mouseOver
    eventRender: function(event, element) {
        element.attr('title', event.start.format());
    },

    // Allow event editing and deletion on event click
    eventClick: function(event) {

        // Save event in holder variable for the dialog form
        selectedEvent = event;

        // Remove the cashFlow from the title for editing
        var title = selectedEvent.title;
        var endIndex = title.indexOf(':');
        var transaction = title.slice(0, endIndex);

        // Set the default form values
        $('#title').attr('value', transaction);
        $('#cashFlow').attr('value', selectedEvent.cashFlow);

        // Open the dialog with tabs
        $('#editTabs').tabs();
        $('#editEventDialog').dialog({
            modal: true,
            draggable: false,
            resizable: false
        }, event);
    },

    dayRender: function(date, cell) {
        // cell.css('background-color', 'red');
        // cell.css('border', 'solid black');
    },

    // Switch to day view when a date is clicked
    dayClick: function(date, jsEvent, view) {
        $('#calendar').fullCalendar('gotoDate', date);
        $('#calendar').fullCalendar('changeView', 'basicDay');
        $('#month').show();
    }
});

// Button on basicDay view to return back to month view
$('#month').on('click', function() {
    $('#calendar').fullCalendar('changeView', 'month');
    $('#month').hide();
});

// Edit an event on the calendar
$('#editEvent').on('click', function() {
    var title = $('#title').val();
    var cashFlow = $('#cashFlow').val();

    // Ensure all values are filled in
    if (title != '' && cashFlow != '') {
        selectedEvent.title = title + ': $' + cashFlow;
        selectedEvent.cashFlow = cashFlow;
        
        // Set event color based on cash flow
        if (cashFlow < 0) {
            selectedEvent.color = 'red';
        } else {
            selectedEvent.color = 'green';
        }

        // Render new event info
        $('#calendar').fullCalendar('updateEvent', selectedEvent);
        
        // Clear variables 
        selectedEvent = undefined;
        $('#title').val(undefined);
        $('#cashFlow').val(undefined);

        // Close dialog
        $('#editEventDialog').dialog('close');
    }
});

// Remove an event from the calendar
$('#deleteEvent').on('click', function() {

    // Pull event id and remove event
    var id = selectedEvent.id;
    $('#calendar').fullCalendar('removeEvents', id);

    // Clear event holder variable and close dialog
    selectedEvent = undefined;
    $('#editEventDialog').dialog('close');
});

// Add a single event to the calendar
$('#addSingleEvent').on('click', function() {

    // Development random id generator
    var id = Math.floor(Math.random()*1001);

    // Pull form input values
    var title = $('#singleTitle').val();
    var start = $('#singleDate').val();
    var cashFlow = $('#singleCashFlow').val();

    // Ensure all values are filled in
    if (title != '' && start != '' && cashFlow != '') {
        
        // Set event color based on cash flow
        var color = '';

        if (cashFlow < 0) {
            color = 'red';
        } else {
            color = 'green';
        }

        // Create single transaction object
        var singleTransaction = {
            id: id,
            title: title + ': $' + cashFlow,
            start: start,
            cashFlow: cashFlow,
            color: color
        };

        // Render the event on the calendar
        $('#calendar').fullCalendar('renderEvent', singleTransaction, true);

        // Clear form values 
        $('#singleTitle').val(undefined);
        $('#singleDate').val(undefined);
        $('#singleCashFlow').val(undefined);
    }
});

// Add a recurring event to the calendar
$('#addRecurringEvent').on('click', function() {

    // Development random id generator
    var id = Math.floor(Math.random()*1001);

    var frequency = $('#frequency input[name=frequency]:checked').val();
    var title = $('#recurringTitle').val();
    var start = $('#recurringStartDate').val();
    var end = $('#recurringEndDate').val();
    var cashFlow = $('#recurringCashFlow').val();

    // Ensure all values are filled in
    if (frequency && title != '' && start != '' && end != '' && cashFlow != '') {
        
        // Set event color based on cash flow
        var color = '';

        if (cashFlow < 0) {
            color = 'red';
        } else {
            color = 'green';
        }

        // Create recurring transaction object
        var recurringTransaction = {
            id: id,
            title: title + ': $' + cashFlow,
            start: start,
            end: end,
            cashFlow: cashFlow,
            color: color
        };

        // Render the event on the calendar
        $('#calendar').fullCalendar('renderEvent', recurringTransaction, true);

        // Clear form values 
        $('#recurringTitle').val(undefined);
        $('#recurringStartDate').val(undefined);
        $('#recurringEndDate').val(undefined);
        $('#recurringCashFlow').val(undefined);
    }
});