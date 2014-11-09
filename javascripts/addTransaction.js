
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