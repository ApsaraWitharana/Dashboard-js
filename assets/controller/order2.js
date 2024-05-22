// script.js
$(document).ready(function() {
    let customers = [
        { id: 1, name: "John Doe", address: "123 Main St", email: "john@example.com", salary: 50000 },
        { id: 2, name: "Jane Smith", address: "456 Oak St", email: "jane@example.com", salary: 60000 }
    ];

    let items = [
        { id: 1, name: "Laptop", price: 1000, quantity: 10 },
        { id: 2, name: "Phone", price: 500, quantity: 20 }
    ];

    let orderItems = [];
    let orderId = 1;
    $('#orderId').val(`ORD-${orderId}`);
    $('#orderDate').val(new Date().toLocaleDateString());

    function renderCustomerTable() {
        let customerTable = $('#customerDetailsTable tbody');
        customerTable.empty();
        customers.forEach(customer => {
            customerTable.append(`
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.email}</td>
                    <td>${customer.salary}</td>
                </tr>
            `);
        });
    }

    function renderItemTable() {
        let itemTable = $('#itemDetailsTable tbody');
        itemTable.empty();
        items.forEach(item => {
            itemTable.append(`
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                </tr>
            `);
        });
    }

    function renderOrderSummary() {
        let orderTable = $('#orderSummaryTable tbody');
        orderTable.empty();
        let totalAmount = 0;
        orderItems.forEach(orderItem => {
            let total = orderItem.price * orderItem.quantity;
            totalAmount += total;
            orderTable.append(`
                <tr>
                    <td>${orderItem.id}</td>
                    <td>${orderItem.name}</td>
                    <td>${orderItem.price}</td>
                    <td>${orderItem.quantity}</td>
                    <td>${total.toFixed(2)}</td>
                    <td class="actions">
                        <button class="remove-btn" data-id="${orderItem.id}">Remove</button>
                    </td>
                </tr>
            `);
        });
        $('#totalAmount').text(`$${totalAmount.toFixed(2)}`);
    }

    $('#searchCustomerBtn').click(function() {
        let searchQuery = $('#customerSearch').val().toLowerCase();
        let customerTable = $('#customerDetailsTable tbody');
        customerTable.empty();
        customers.forEach(customer => {
            if (customer.name.toLowerCase().includes(searchQuery) || customer.email.toLowerCase().includes(searchQuery)) {
                customerTable.append(`
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.email}</td>
                        <td>${customer.salary}</td>
                    </tr>
                `);
            }
        });
    });

    $('#searchItemBtn').click(function() {
        let searchQuery = $('#itemSearch').val().toLowerCase();
        let itemTable = $('#itemDetailsTable tbody');
        itemTable.empty();
        items.forEach(item => {
            if (item.name.toLowerCase().includes(searchQuery)) {
                itemTable.append(`
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity}</td>
                    </tr>
                `);
            }
        });
    });

    $('#addItemBtn').click(function() {
        let itemId = parseInt($('#itemSearch').val());
        let quantity = parseInt($('#itemQty').val());
        let item = items.find(i => i.id === itemId);

        if (!item) {
            alert('Item not found');
            return;
        }

        if (quantity > item.quantity) {
            alert('Quantity exceeds available stock');
            return;
        }

        let existingOrderItem = orderItems.find(oi => oi.id === itemId);
        if (existingOrderItem) {
            existingOrderItem.quantity += quantity;
        } else {
            orderItems.push({ ...item, quantity });
        }

        item.quantity -= quantity;
        renderOrderSummary();
        renderItemTable();
    });

    $('#orderSummaryTable').on('click', '.remove-btn', function() {
        let itemId = parseInt($(this).data('id'));
        let orderItem = orderItems.find(oi => oi.id === itemId);
        let item = items.find(i => i.id === itemId);

        item.quantity += orderItem.quantity;
        orderItems = orderItems.filter(oi => oi.id !== itemId);

        renderOrderSummary();
        renderItemTable();
    });

    renderCustomerTable();
    renderItemTable();
});
