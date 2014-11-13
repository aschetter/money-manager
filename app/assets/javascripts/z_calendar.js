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
    },

    // Allow transaction editing and deletion on transaction click
    eventClick: function(event) {

        // Save transaction in holder variable for the dialog form
        selected = event;

        // Remove the amount from the title for editing
        var title = selected.title;
        var endIndex = title.indexOf(':');
        var transaction = title.slice(0, endIndex);

        // Set the default form values
        $('#editTitle').attr('value', transaction);
        $('#editAmount').attr('value', selected.amount);

        // Set the default transaction type radio button
        if (selected.type == 'income') {
            $('#editType .incomeLabel').addClass('ui-state-active');
            $('#editType .incomeLabel').attr('aria-pressed', 'true');
        } else if (selected.type == 'expense') {
            $('#editType .expenseLabel').addClass('ui-state-active');
            $('#editType .expenseLabel').attr('aria-pressed', 'true');
        } else {
            console.log('No transaction type is given');
        }

        // Open dialog with tabs
        $('#editTabs').tabs();
        $('#editType').buttonset();
        $('#editFrequency').buttonset();
        $('#dialog').dialog({
            close: function() {
                selected = undefined;
            },
            width: 500,
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
