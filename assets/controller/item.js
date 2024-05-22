document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('item-form');
    var itemList = document.getElementById('item-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var id = document.getElementById('id').value;
        var name = document.getElementById('name').value;
        var qty = document.getElementById('qty').value;
        var amount = document.getElementById('amount').value;

        // Create a new row
        var newRow = itemList.insertRow();

        // Insert cells into the row
        var cellId = newRow.insertCell(0);
        var cellName = newRow.insertCell(1);
        var cellQty = newRow.insertCell(2);
        var cellAmount = newRow.insertCell(3);
        
        // Set cell values
        cellId.textContent = id;
        cellName.textContent = name;
        cellQty.textContent = qty;
        cellAmount.textContent = amount;

        // Clear form fields
        form.reset();
    });
});
