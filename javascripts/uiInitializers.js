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