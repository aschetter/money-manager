// Inialize tabs for creating an event
$('#addTabs').tabs();

// Inialize radio buttons for determining frequency of recurring events
$('#frequency').buttonset();

// Inialize datepickers to add single and recurring events
$('#singleDate').datepicker({dateFormat: "yy-mm-dd"});
$('#recurringStartDate').datepicker({dateFormat: "yy-mm-dd"});
$('#recurringEndDate').datepicker({dateFormat: "yy-mm-dd"});

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

    eventClick: function(event) {
        // Save event in holder variable for the dialog form
        selectedEvent = event;

        // Remove the cashFlow from the title for editing
        var title = event.title;
        var endIndex = title.indexOf(':');
        var transaction = title.slice(0, endIndex);

        // Set the default form values
        $('#title').attr('value', transaction);
        $('#cashFlow').attr('value', event.cashFlow);

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
        $('#title').attr('value', undefined);
        $('#cashFlow').attr('value', undefined);

        // Close dialog
        $('#editEventDialog').dialog('close');
    }
});

// Remove an event from the calendar
$('#deleteEvent').on('click', function() {

    // Pull event id and remove event
    var id = selectedEvent.id;
    $('#calendar').fullCalendar( 'removeEvents', id);

    // Clear event holder variable and close dialog
    selectedEvent = undefined;
    $('#editEventDialog').dialog('close');
});

var start;
// Add a single event to the calendar
$('#addSingleEvent').on('click', function() {

    // Development random id generator
    var id = Math.floor(Math.random()*10000000001);

    // Pull form input values
    var title = $('#singleTitle').val();
    start = $('#singleDate').val();
    var cashFlow = $('#singleCashFlow').val();

    // Ensure all values are filled in
    if (title != '' && start != '' && cashFlow != '') {

//         // Add the event to the events array
//         var event = {
//             id: id,
//             title: title,
//             start: start,
//             cashFlow: cashFlow,
//             color: color
//         };

//         events.push(event);
        
        // Set event color based on cash flow
        var color = '';

        if (cashFlow < 0) {
            color = 'red';
        } else {
            color = 'green';
        }

        // Render the event on the calendar
        $('#calendar').fullCalendar('renderEvent', {
            id: id,
            title: title + ': $' + cashFlow,
            start: start,
            cashFlow: cashFlow,
            color: color
        }, true);
    }
});

// Add a recurring event to the calendar
$('#addRecurringEvent').on('click', function() {

    // Development random id generator
    var id = Math.floor(Math.random()*10000000001);

    var frequency = $('#frequency input[name=frequency]:checked').val();
    var title = $('#recurringTitle').val();
    var start = $('#recurringStartDate').val();
    var end = $('#recurringEndDate').val();
    var cashFlow = $('#recurringCashFlow').val();

    // Ensure all values are filled in
    if (frequency && title != '' && start != '' && end != '' && cashFlow != '') {

//         // Add the event to the events array
//         var event = {
//             id: id,
//             title: title,
//             start: start,
//             cashFlow: cashFlow,
//             color: color
//         };

//         events.push(event);
        
        // Set event color based on cash flow
        var color = '';

        if (cashFlow < 0) {
            color = 'red';
        } else {
            color = 'green';
        }

        // Render the event on the calendar
        $('#calendar').fullCalendar('renderEvent', {
            id: id,
            title: title + ': $' + cashFlow,
            start: start,
            end: end,
            cashFlow: cashFlow,
            color: color
        }, true);
    }
});