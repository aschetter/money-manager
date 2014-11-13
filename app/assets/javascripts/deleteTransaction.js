// Remove a transaction from the calendar
$('#deleteButton').on('click', function() {

    // Remove transaction by id
    $('#calendar').fullCalendar('removeEvents', selected.id);

    // Clear transaction holder variable and close dialog
    selected = undefined;
    $('#dialog').dialog('close');
});