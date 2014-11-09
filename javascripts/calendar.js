// Initialize calendar plug-in
$('#calendar').fullCalendar({

    // Header styling
    header: {
        left: 'prev',
        center: 'title',
        right: 'next'
    },

    // Allow dragging transactions between days
    editable: true,

    // Load transactions array
    events: transactions,

    // Tooltip displays the date of a transaction on mouseOver
    eventRender: function(event, element) {
        element.attr('title', event.start.format());
        event.color = 'green';
    },

    // Allow transaction editing and deletion on transaction click
    eventClick: function(event) {

        // Save transaction in holder variable for the dialog form
        selected = event;

        console.log(selected);

        // Remove the amount from the title for editing
        var title = selected.title;
        var endIndex = title.indexOf(':');
        var transaction = title.slice(0, endIndex);

        console.log(transaction);
        console.log(selected.amount);

        // Set the default form values
        $('#editTitle').attr('value', transaction);
        $('#editAmount').attr('value', selected.amount);

        // Open dialog with tabs
        $('#editTabs').tabs();
        $('#editType').buttonset();
        $('#dialog').dialog({
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
        $('#monthButton').show();
    }
});
