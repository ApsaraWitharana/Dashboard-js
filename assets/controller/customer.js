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
