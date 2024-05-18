
// add hovered class to selected list item

let list = document.querySelectorAll(".navigating li");

function activeLink(){
    list.forEach(item=>{
        item.classList.remove("hovered");
    })

    this.classList.remove("hovered");

}

list.forEach(item => item.addEventListener("mouseover",activeLink))

//menu ioggle

let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigating');
let main = document.querySelector('.main');


toggle.onclick =function(){

    navigation.classList.toggle('active');
    main.classList.toggle('active');

};


// ==========================customer manage js==========================

document.addEventListener('DOMContentLoaded', function () {
                var form = document.getElementById('customer-form');
                var table = document.getElementById('customer-table').getElementsByTagName('tbody')[0];

                form.addEventListener('submit', function (event) {
                    event.preventDefault();

                    var id = document.getElementById('id').value;
                    var name = document.getElementById('name').value;
                    var address = document.getElementById('address').value;
                    var email = document.getElementById('email').value;
                    var phone = document.getElementById('phone').value;


                     //validating customer
                    if (id === "" || name === "" || address === "" || email === "" || phone === "") {
                     alert("Please fill in all fields.");
                     return false;
                     
                  
                    }else{
                        alert("Customer add successful! Thank you.");
                    }

                    // Create a new row
                    var newRow = table.insertRow(table.rows.length);

                    // Insert cells into the row
                    var cellId = newRow.insertCell(0);
                    var cellName = newRow.insertCell(1);
                    var cellAddress = newRow.insertCell(2);
                    var cellEmail = newRow.insertCell(3);
                    var cellPhone = newRow.insertCell(4);

                    // Set cell values
                    cellId.innerHTML = id;
                    cellName.innerHTML = name;
                    cellAddress.innerHTML = address;
                    cellEmail.innerHTML = email;
                    cellPhone.innerHTML = phone;

                    // Clear form fields
                    form.reset();
                });
            });



            // =======================================item management js==============================

    document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('item-form');
    var itemList = document.getElementById('item-table').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var id = document.getElementById('id').value;
        var name = document.getElementById('name').value;
        var qty = parseInt(document.getElementById('qty').value);
        var unitPrice = parseFloat(document.getElementById('unit-price').value);
        var totalPrice = qty * unitPrice;

        // Create a new row
        var newRow = itemList.insertRow(itemList.rows.length);
        // var newRow = itemList.insertRow();

        // Insert cells into the row
        var cellId = newRow.insertCell(0);
        var cellName = newRow.insertCell(1);
        var cellQty = newRow.insertCell(2);
        var cellUnitPrice = newRow.insertCell(3);
        var cellTotalPrice = newRow.insertCell(4);

        // Set cell values
        cellId.innerHTML = id;
        cellName.innerHTML = name;
        cellQty.innerHTML = qty;
        cellUnitPrice.innerHTML = unitPrice.toFixed(2);
        cellTotalPrice.innerHTML = totalPrice.toFixed(2);

        // Clear form fields
        form.reset();
    });
});



// =====================================================ordermanagement=========================================================


// // Sample item data (can be fetched from a server)
// const items = [
//     { id: 1, name: 'Item 1', price: 10 },
//     { id: 2, name: 'Item 2', price: 15 },
//     { id: 3, name: 'Item 3', price: 20 }
// ];

// // Function to display items in the combo box
// function displayItems() {
//     const itemSelect = $('#itemSelect');
//     items.forEach(item => {
//         const option = `<option value="${item.id}">${item.name} - Rs${item.price}</option>`;
//         itemSelect.append(option);
//     });
// }

// // Function to add selected item to the order table
// function addItemToOrder() {
//     const itemId = $('#itemSelect').val();
//     const itemName = $('#itemSelect option:selected').text().split(' - ')[0];
//     const quantity = parseInt($('#quantityInput').val());
//     const unitPrice = parseFloat($('#itemSelect option:selected').text().split('Rs')[1]);
//     const total = quantity * unitPrice;

//     const row = `<tr><td>${itemId}</td><td>${itemName}</td><td>${quantity}</td><td>Rs${unitPrice.toFixed(2)}</td><td>Rs${total.toFixed(2)}</td></tr>`;
//     $('#ordersTable tbody').append(row);
// }

// // Function to calculate and display total price
// function calculateTotalPrice() {
//     let totalPrice = 0;
//     $('#ordersTable tbody tr').each(function() {
//         totalPrice += parseFloat($(this).find('td').eq(4).text().replace('Rs', ''));
//     });
//     $('#totalPrice').text(`Total Price: Rs${totalPrice.toFixed(2)}`);
// }

// // Function to place order
// function placeOrder() {
//     // You can handle the order submission here
//     alert('Order placed successfully!');
//     // Clear order table and total price display after placing order
//     $('#ordersTable tbody').empty();
//     $('#totalPrice').empty();
// }

// $(document).ready(function() {
//     displayItems();

//     $('#addItemBtn').click(function() {
//         addItemToOrder();
//         calculateTotalPrice();
//     });

//     $('#placeOrderBtn').click(function() {
//         placeOrder();
//     });
// });




// =====================================================menu=====================================================

//script.js

$(document).ready(function() {
    let order = {};

    $('.add-to-order').click(function() {
        let row = $(this).closest('tr');
        let item = row.find('td:nth-child(1)').text();
        let price = parseFloat(row.find('td:nth-child(2)').text().replace('Rs', ''));

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

        $('#totalAmount').text(`Rs${totalAmount.toFixed(2)}`);
    }
});


// ====================customer================

 $(document).ready(function () {
                let customers = [];
                let currentCustomerId = null;

                function resetForm() {
                    $('#customerId').val('');
                    $('#customerName').val('');
                    $('#customerAddress').val('');
                    $('#customerEmail').val('');
                    $('#customerSalary').val('');
                    $('#saveCustomerBtn').text('Add Customer');
                }

                function renderTable() {
                    let customerTable = $('#customerTable tbody');
                    customerTable.empty();

                    customers.forEach((customer, index) => {
                        customerTable.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.email}</td>
                    <td>${customer.salary}</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${index}">Edit</button>
                        <button class="delete-btn" data-id="${index}">Delete</button>
                    </td>
                </tr>
            `);
                    });
                }

                $('#customerForm').submit(function (event) {
                    event.preventDefault();

                    let id = $('#customerId').val();
                    let name = $('#customerName').val();
                    let address = $('#customerAddress').val();
                    let email = $('#customerEmail').val();
                    let salary = $('#customerSalary').val();

                    if (id) {
                        customers[id] = { name, address, email, salary };
                    } else {
                        customers.push({ name, address, email, salary });
                    }

                    resetForm();
                    renderTable();
                });

                $('#customerTable').on('click', '.edit-btn', function () {
                    let id = $(this).data('id');
                    let customer = customers[id];

                    $('#customerId').val(id);
                    $('#customerName').val(customer.name);
                    $('#customerAddress').val(customer.address);
                    $('#customerEmail').val(customer.email);
                    $('#customerSalary').val(customer.salary);
                    $('#saveCustomerBtn').text('Update Customer');
                });

                $('#customerTable').on('click', '.delete-btn', function () {
                    let id = $(this).data('id');
                    customers.splice(id, 1);
                    renderTable();
                });

                $('#clearAllBtn').click(function () {
                    customers = [];
                    renderTable();
                });

                renderTable();
            });

