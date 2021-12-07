// Get projects upon docuemnt load
(async function getAccounts() {
    try {
    $.ajax({
            method: "GET",
            url: "/employess/all",
            dataType: "json"
        }).done(function(data) {

            $.each(data, function(i, users) {

                var body = "<tr>";
                body += "<td>" + users.firstname + "</td>";
                body += "<td>" + users.lastname + "</td>";
                body += "<td>" + users.email + "</td>";
                body += "<td>";
                body += "<a style='margin-right:5px;' onclick=\"getAccountById('"+ accounts._id +"')\" data-bs-toggle='modal' data-bs-target='#update-account-modal' ><i class='mdi mdi-file-document-edit-outline'></i></a>";
                body += "<a onclick=\" return confirm('Are you sure you want to Delete?') && deleteAccountById('"+ accounts._id +"')\"><i class='mdi mdi-close'></i></a>";
                body += "</td>";
                body += "</tr>";
                $("#addEmployeeData").append(body);
            });
            var init = "<script src='../assets/js/pages/datatables.init.js'></script>"
            $("#initTable").append(init);
        })

    } catch (error) {
        console.log(error);
    };

})();