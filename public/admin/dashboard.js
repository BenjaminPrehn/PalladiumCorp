// Get projects upon docuemnt load
(async function getAccounts() {
    try {
    $.ajax({

            method: "GET",
            url: "/accounts/all",
            dataType: "json"
        }).done(function(data) {

            $.each(data, function(i, accounts) {

                $("#addData")
                    .append(
                        $("<tr> <td>" +
                                accounts.network
                            + "</td> <td>" + 
                                accounts.username
                            + "</td> <td>" + 
                                accounts.password
                            + "</td> <td> " +
                            "<a style='margin-right:5px;' onclick=\"getAccountById('"+ accounts._id +"')\" data-bs-toggle='modal' data-bs-target='#update-account-modal' ><i class='mdi mdi-file-document-edit-outline'></i></a>" + 
                            "<a onclick=\"deleteAccountById('"+ accounts._id +"')\"><i class='mdi mdi-close'></i></a>" + 
                    + " </td> </tr>"))
            });
        })

    } catch (error) {
        console.log(error);
    };

})();

// =========================================================

// Update a account by it's id
function updateAccountById(id) {
    try {
        $.ajax({
            method: "POST",
            url: "/accounts/" + id,
            dataType: "json"
        }).done()
            location.reload()
        } catch (error) {
            console.log(error);
    }
}

// =========================================================
// Get an account by it's id
function getAccountById(id) {
    try {
           $.ajax({
                method: "GET",
                url: "/accounts/" + id,
                dataType: "json"
            }).done(
                function(account) {

                $("#title").text(account.network);

                $("#networkUpdate").val(account.network);
                $("#usernameUpdate").val(account.username);
                $("#passwordUpdate").val(account.password);

                $("#updateForm").attr("action", "/accounts/" + account._id);
            }
            
        );
    } catch (error) {
        alert("Error")
        console.log(error);
    }
}
// =========================================================
// Update a account by it's id
function updateAccountById(id) {
    try {
        $.ajax({
            method: "POST",
            url: "/accounts/" + id,
            dataType: "json"
        }).done()
            location.reload()
        } catch (error) {
            console.log(error);
    }
}
// =========================================================
// Delete a project by its ID 
function deleteAccountById(id) {
    try {
        $.ajax({
            method: "DELETE",
            url: "/accounts/" + id,
            dataType: "json"
        }).done(
            location.reload()
        );

    } catch (error) {
        alert("Error")
        console.log(error);
    }
    
};