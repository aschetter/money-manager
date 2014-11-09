// Hold transaction to use in edit/ delete dialog
var selected;

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

        // Clear transaction holder variable and close dialog
        selected = undefined;
        $('#dialog').dialog('close');
    }
});