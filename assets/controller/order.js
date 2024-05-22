// Sample item data (can be fetched from a server)
const items = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 15 },
    { id: 3, name: 'Item 3', price: 20 }
];

// Function to display items in the combo box
function displayItems() {
    const itemSelect = $('#itemSelect');
    items.forEach(item => {
        const option = `<option value="${item.id}">${item.name} - Rs${item.price}</option>`;
        itemSelect.append(option);
    });
}

// Function to add selected item to the order table
function addItemToOrder() {
    const itemId = $('#itemSelect').val();
    const itemName = $('#itemSelect option:selected').text().split(' - ')[0];
    const quantity = parseInt($('#quantityInput').val());
    const unitPrice = parseFloat($('#itemSelect option:selected').text().split('Rs')[1]);
    const total = quantity * unitPrice;

    const row = `<tr><td>${itemId}</td><td>${itemName}</td><td>${quantity}</td><td>Rs${unitPrice.toFixed(2)}</td><td>Rs${total.toFixed(2)}</td></tr>`;
    $('#ordersTable tbody').append(row);
}

// Function to calculate and display total price
function calculateTotalPrice() {
    let totalPrice = 0;
    $('#ordersTable tbody tr').each(function() {
        totalPrice += parseFloat($(this).find('td').eq(4).text().replace('Rs', ''));
    });
    $('#totalPrice').text(`Total Price: Rs${totalPrice.toFixed(2)}`);
}

// Function to place order
function placeOrder() {
    // You can handle the order submission here
    alert('Order placed successfully!');
    // Clear order table and total price display after placing order
    $('#ordersTable tbody').empty();
    $('#totalPrice').empty();
}

$(document).ready(function() {
    displayItems();

    $('#addItemBtn').click(function() {
        addItemToOrder();
        calculateTotalPrice();
    });

    $('#placeOrderBtn').click(function() {
        placeOrder();
    });
});
