// Get projects upon docuemnt load
(async function getAccounts() {
    try {
    $.ajax({
            method: "GET",
            url: "/admin/accounts/all",
            dataType: "json"
        }).done(function(data) {
            $.each(data, function(i, accounts) {

                var body = "<tr>";
                body += "<td>" + accounts.network + "</td>";
                body += "<td>" + accounts.username + "</td>";
                body += "<td>" + accounts.password + "</td>";
                body += "<td>" + accounts.owner + "</td>";
                body += "<td>" + moment(accounts.createdAt).format("DD-MM-YYYY") + "</td>";
                body += "<td>";
                body += "<a style='margin-right:5px;' onclick=\"getAdminAccountById('"+ accounts._id +"')\" data-bs-toggle='modal' data-bs-target='#admin-update-account-modal' ><i class='mdi mdi-file-document-edit-outline'></i></a>";
                body += "<a style='margin-right:5px;' onclick=\"getAllEmployeeIds('"+ accounts._id +"')\" data-bs-toggle='modal' data-bs-target='#admin-update-account-owner-modal' ><i class='mdi mdi-account-question'></i></a>";
                body += "<a onclick=\" return confirm('Are you sure you want to Delete?') && deleteAdminAccountById('"+ accounts._id +"')\"><i class='mdi mdi-close'></i></a>";
                body += "</td>";
                body += "</tr>";
                $("#addAccountsData").append(body);
            });
        })

    } catch (error) {
        console.log(error);
    };

})();

// =========================================================
// Get all employee ID's
function getAllEmployeeIds(id) {
    try {
    $.ajax({
            method: "GET",
            url: "/admin/employees/all",
            dataType: "json"
        }).done(
            function(data) {
            $("#employee-ids").empty(),

            $.each(data, function(i, users) {
                var option = "<option value='" + users._id + "'>" + users.firstname + " " + users.lastname + "</option>";

                $("#employee-ids").append(option);
                
            },
           
            $("#updateIdForm").attr("action", "/admin/accounts/" + id)
            
            );
        })

    } catch (error) {
        console.log(error);
    };

}
// =========================================================
// Get an account by it's id
function getAdminAccountById(id) {
    try {
           $.ajax({
                method: "GET",
                url: "/admin/accounts/" + id,
                dataType: "json"
            }).done(
                function(account) {

                $("#title").text(account.network);

                $("#networkUpdate").val(account.network);
                $("#usernameUpdate").val(account.username);
                $("#passwordUpdate").val(account.password);
                $("#ownerUpdate").val(account.owner);

                $("#updateForm").attr("action", "/admin/accounts/" + account._id);
            }
            
        );
    } catch (error) {
        alert("Error")
        console.log(error);
    }
}



// =========================================================
// Update a account by it's id
// function updateAdminAccountById(id) {
//     try {
//         $.ajax({
//             method: "POST",
//             url: "/admin/accounts/" + id,
//             dataType: "json"
//         }).done()
//             console.log('error');
//             location.reload()
//         } catch (error) {
//             console.log(error);
//     }
// }


// =========================================================
// Delete a project by its ID 

function deleteAdminAccountById(id) {
    try {
        $.ajax({
            method: "DELETE",
            url: "/admin/accounts/" + id,
            dataType: "json"
        }).done(
            location.reload()
        );

    } catch (error) {
        alert("Error")
        console.log(error);
    }
    
};

