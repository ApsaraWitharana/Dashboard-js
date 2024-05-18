// script.js
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