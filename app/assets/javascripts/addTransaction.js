
// Add a transaction on the calendar
$('#addButton').on('click', function() {

    // Pull form input values
    var title = $('#addTitle').val();
    var type = $('input[name=addType]:checked').val()
    var amount = $('#addAmount').val();
    var frequency = $('input[name=addFrequency]:checked').val();
    var weeklyDay = $('input[name=addWeeklyDay]:checked').val();
    var monthlyDate = $('input[name=addMonthlyDate]:checked').val();
    var authenticity_token = $('#addForm input[name=authenticity_token]').val();
    var start = $('#addStart').val();
    // var end = $'#addEnd').val();

    // Ensure all values are set
    if (title != '' && type != '' && amount != '' && frequency != '' && start != '') {
    
        // Set the color attribute
        var color = '';
        if (type == 'income') {
            color = 'green';
        } else if (type == 'expense') {
            color = 'red';
        }

        // Create transaction object
        var transaction = {
            // id: id,
            authenticity_token: authenticity_token,
            title: title + ': $' + amount,
            type: type,
            amount: amount,
            frequency: frequency,
            start: start,
            // end: end
            color: color
        };

        // Set the specific day/ date for recurring transactions
        switch(frequency) {

            // If weekly frequency, ensure the day value is selected and set it
            case 'weekly':
                if (weeklyDay != '') {
                    transaction.weeklyDay = weeklyDay;
                }
                break;

            // If monthly frequency, ensure the date value is selected and set it
            case 'monthly':
                if (monthlyDate != '') {
                    transaction.monthlyDate = monthlyDate;
                }
                break;

            default:
                console.log('No weekly or monthly frequency');
        }

        // console.log(transaction);

        $.ajax({
            type: 'POST',
            url: 'transactions',
            data: transaction,
            success: function(data) {
                console.log(data);
            },
            dataType: 'JSON'
        });

        // Render the transaction on the calendar
        $('#calendar').fullCalendar('renderEvent', transaction, true);

        // Clear form values 
        $('#addTitle').val(undefined);
        $('#addStart').val(undefined);
        $('#addAmount').val(undefined);
    }
});