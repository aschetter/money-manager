// Test event objects
var events = [
    {
        title: 'Electric Bill',
        start: '2014-10-26',
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

    // Tooltip displays the cashFlow of an event on mouseOver
    eventRender: function(event, element) {
        element.attr('title', event.cashFlow);
    },

    dayRender: function(date, cell) {
        // cell.css('background-color', 'red');
        // cell.css('border', 'solid black');
    },

    events: events,

    // Switch to day view when a date is clicked
    dayClick: function(date, jsEvent, view) {
        $('#calendar').fullCalendar('gotoDate', date);
        $('#calendar').fullCalendar('changeView', 'basicDay');
        $('#month').show();
    }
});

// Button on basicDay view to return back to month view
$('#month').on('click', function(){
    $('#calendar').fullCalendar('changeView', 'month');
    $('#month').hide();
});

// Add an event to the calendar
$('#addEvent').on('click', function () {
    var title = $('#title').val();
    var start = $('#start').val();
    var cashFlow = $('#cashFlow').val();
    var color = '';

    // Ensure all values are filled in
    if (title != '' && start != '' && cashFlow != '') {
        
        // Set event color based on cash flow
        if (cashFlow < 0) {
            color = 'red';
        } else {
            color = 'green';
        }

        // Render the transaction on the calendar
        $('#calendar').fullCalendar('renderEvent', { 
            title: title,
            start: start,
            cashFlow: cashFlow,
            color: color
        }, true);
    }
});