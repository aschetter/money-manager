// Inialize radio buttons for transaction type and frequency
$('#addType').buttonset();
$('#addFrequency').buttonset();

// Inialize accordian feature for the transaction adding form
$("#addForm").accordion({
      collapsible: true
});

// Inialize datepickers to add a transaction
$('#addStart').datepicker({dateFormat: "yy-mm-dd"});
$('#addEnd').datepicker({dateFormat: "yy-mm-dd"});

// Inialize styling for all buttons
$('button').button();

// Hold transaction to use in edit/ delete dialog
var selected;

// Test transaction objects
var transactions = [
    {
        id: 1,
        title: 'Electric Bill: $100',
        type: 'expense',
        amount: 100,
        frequency: 'once',
        start: '2014-11-15',
        color: 'red'
    },
    {
        id: 2,
        title: 'Paycheck: $80',
        type: 'income',
        amount: 80,
        frequency: 'once',
        start: '2014-11-16',
        color: 'green'
    }
];

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

// Button on date view to return back to month view
$('#monthButton').on('click', function() {
    $('#calendar').fullCalendar('changeView', 'month');
    $('#monthButton').hide();
});

// Edit a transaction on the calendar
$('#editButton').on('click', function() {

    // Pull form input values
    var title = $('#editTitle').val();
    var type = $('input[name=editType]:checked').val()
    var amount = $('#editAmount').val();
    // var frequency = $('input[name=editFrequency]:checked').val()
    // var start = $('#addStart').val();
    // var end = $'#addEnd').val();

    // Ensure all values are filled in
    if (title != '' && type != '' && amount != '') {
        selected.title = title + ': $' + amount;
        selected.type = type;
        selected.amount = amount;

        // Set the color attribute
        var color = '';
        if (type == 'income') {
            selected.color = 'green';
        } else if (type == 'expense') {
            selected.color = 'red'
        }

        // Render new transaction info
        $('#calendar').fullCalendar('updateEvent', selected);
        
        // Clear variables 
        selected = undefined;
        $('#editTitle').val(undefined);
        $('#editAmount').val(undefined);

        // Close dialog
        $('#dialog').dialog('close');
    }
});

// Remove a transaction from the calendar
$('#deleteButton').on('click', function() {

    // Pull transaction id and remove transaction
    var id = selected.id;
    $('#calendar').fullCalendar('removeEvents', id);

    // Clear transaction holder variable and close dialog
    selected = undefined;
    $('#dialog').dialog('close');
});

// Add a transaction on the calendar
$('#addButton').on('click', function() {

    // Development random id generator
    var id = Math.floor(Math.random()*1001);

    // Pull form input values
    var title = $('#addTitle').val();
    var type = $('input[name=addType]:checked').val()
    var amount = $('#addAmount').val();
    var frequency = $('input[name=addFrequency]:checked').val()
    var start = $('#addStart').val();
    // var end = $'#addEnd').val();

    // Ensure all values are filled in
    if (title != '' && type != '' && amount != '' && frequency != '' && start != '') {
    
        // Set the color attribute
        var color = '';
        if (type == 'income') {
            color = 'green';
        } else if (type == 'expense') {
            color = 'red'
        }

        // Create transaction object
        var transaction = {
            id: id,
            title: title + ': $' + amount,
            type: type,
            amount: amount,
            frequency: frequency,
            start: start,
            // end: end
            color: color
        };

        // Render the transaction on the calendar
        $('#calendar').fullCalendar('renderEvent', transaction, true);

        // Clear form values 
        $('#addTitle').val(undefined);
        $('#addStart').val(undefined);
        $('#addAmount').val(undefined);
    }
});