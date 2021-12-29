

// Get projects upon docuemnt load
(async function getAccounts() {
    try {
    $.ajax({
            method: "GET",
            url: "/accounts/all",
            dataType: "json"
        }).done(function(data) {

            $.each(data, function(i, accounts) {

                var body = "<tr>";
                body += "<td> <a style='color:white; text-decoration: underline;' target='_blank' href='"+ accounts.url + "'>" + accounts.url + " </a> </td>";
                body += "<td>" + accounts.network + "</td>";
                body += "<td>" + accounts.username + "</td>";
                body += "<td>" + accounts.password + "</td>";
                body += "<td>";
                body += "<a style='margin-right:5px; color:white;' href='' onclick=\"getAccountById('"+ accounts._id +"')\" data-bs-toggle='modal' data-bs-target='#update-account-modal' ><i class='mdi mdi-file-document-edit-outline'></i></a>";
                body += "<a style='margin-right:5px; color:white;' href=''  onclick=\"getAccountByIdAndSend('"+ accounts._id +"')\" data-bs-toggle='modal' data-bs-target='#send-modal' ><i class='mdi mdi-email'></i></a>";
                body += "<a style='margin-right:5px; color:red;' href='' onclick=\" return confirm('Are you sure you want to Delete?') && deleteAccountById('"+ accounts._id +"')\"><i class='mdi mdi-close'></i></a>";
                body += "</td>";
                body += "</tr>";
                $("#addData").append(body);
            });
            var init = "<script src='../assets/js/pages/datatables.init.js'></script>"
            $("#initTable").append(init);
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

                $("#urlUpdate").val(account.url);
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
// Get an account by it's id and update form to send email
function getAccountByIdAndSend(id) {
    try {
           $.ajax({
                method: "GET",
                url: "/accounts/" + id,
                dataType: "json"
            }).done(
                function(account) {
                console.log(account);

                $("#networkSendUpdate").val(account.network);
                $("#urlSendUpdate").val(account.url);
                $("#usernameSendUpdate").val(account.username);
                $("#passwordSendUpdate").val(account.password);

                $("#updateSendForm").attr("action", "/mail/send");
            }
            
        );
    } catch (error) {
        alert("Error")
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