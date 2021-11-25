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
                            "<a style='margin-right:5px;' onclick=\"getAccountById('"+ accounts._id +"')\" ><i class='mdi mdi-file-document-edit-outline'></i></a>" + 
                            "<a onclick=\"deleteAccountById('"+ accounts._id +"')\"><i class='mdi mdi-close'></i></a>" + 
                    + " </td> </tr>"))
            });
        })

    } catch (error) {
        console.log(error);
    };

})();

// =========================================================

// Update a project by it's id
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