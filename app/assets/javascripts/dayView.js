// Button on date view to return back to month view
$('#monthButton').on('click', function() {
    $('#calendar').fullCalendar('changeView', 'month');
    $('#monthButton').hide();
});