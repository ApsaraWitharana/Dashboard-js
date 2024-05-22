// script.js
$(document).ready(function() {
    let order = {};

    $('.add-to-order').click(function() {
        let row = $(this).closest('tr');
        let item = row.find('td:nth-child(1)').text();
        let price = parseFloat(row.find('td:nth-child(2)').text().replace('$', ''));

        if (order[item]) {
            order[item].quantity += 1;
            order[item].total = order[item].quantity * price;
        } else {
            order[item] = { price: price, quantity: 1, total: price };
        }

        updateOrderSummary();
    });

    function updateOrderSummary() {
        let orderItems = $('#orderItems');
        orderItems.empty();
        let totalAmount = 0;

        $.each(order, function(item, details) {
            orderItems.append(`
                <tr>
                    <td>${item}</td>
                    <td>$${details.price.toFixed(2)}</td>
                    <td>${details.quantity}</td>
                    <td>$${details.total.toFixed(2)}</td>
                </tr>
            `);
            totalAmount += details.total;
        });

        $('#totalAmount').text(`$${totalAmount.toFixed(2)}`);
    }
});
