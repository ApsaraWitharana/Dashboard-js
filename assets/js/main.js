
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
