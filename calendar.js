// Test event objects
var events = [
    {
        id: 1,
        title: 'Electric Bill: $100',
        start: '2014-10-15',
        cashFlow: -100,
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

    // Tooltip displays the cashFlow of an event on mouseOver
    eventRender: function(event, element) {
        element.attr('title', event.start.format());
    },

    eventClick: function() {
        $('#addEventDialog').dialog();
    },

    dayRender: function(date, cell) {
        // cell.css('background-color', 'red');
        // cell.css('border', 'solid black');
    },

    // Switch to day view when a date is clicked
    dayClick: function(date, jsEvent, view) {
        // $('#calendar').fullCalendar('gotoDate', date);
        // $('#calendar').fullCalendar('changeView', 'basicDay');
        // $('#month').show();
    }
});

// Button on basicDay view to return back to month view
// $('#month').on('click', function(){
//     $('#calendar').fullCalendar('changeView', 'month');
//     $('#month').hide();
// });

// Add an event to the calendar
$('#addEvent').on('click', function () {

    // Development random id generator
    var id = Math.floor(Math.random()*10000000001);
    var title = $('#title').val();
    var start = $('#start').val();
    var cashFlow = $('#cashFlow').val();
    var color = '';

    // Ensure all values are filled in
    if (title != '' && start != '' && cashFlow != '') {

        // Add the event to the events array
        var event = {
            id: id,
            title: title,
            start: start,
            cashFlow: cashFlow,
            color: color
        };

        events.push(event);
        
        // Set event color based on cash flow
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