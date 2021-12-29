// Get projects upon docuemnt load
(async function getAccounts() {
    try {
    $.ajax({
            method: "GET",
            url: "/admin/employees/all",
            dataType: "json"
        }).done(function(data) {
            $.each(data, function(i, users) {

                var body = "<tr>";
                body += "<td>" + users._id + "</td>";
                body += "<td>" + users.firstname + "</td>";
                body += "<td>" + users.lastname + "</td>";
                body += "<td>" + users.role + "</td>";
                body += "<td>" + users.email + "</td>";
                body += "<td>" + moment(users.createdAt).format("DD-MM-YYYY") + "</td>";
                body += "<td>";
                body += "<a style='margin-right:5px;' onclick=\"getEmployeesById('"+ users._id +"')\" data-bs-toggle='modal' data-bs-target='#update-employee-modal' ><i class='mdi mdi-file-document-edit-outline'></i></a>";
                body += "<a onclick=\" return confirm('Are you sure you want to Delete?') && deleteEmployeeById('"+ users._id +"')\"><i class='mdi mdi-close'></i></a>";
                body += "</td>";
                body += "</tr>";
                $("#addEmployeeData").append(body);
            });
            // var init = "<script src='../assets/js/pages/datatables.init.js'></script>"
            // $("#initTable").append(init);
        })

    } catch (error) {
        console.log(error);
    };

})();

// =========================================================
// Get an employee by it's id
function getEmployeesById(id) {
    try {
           $.ajax({
                method: "GET",
                url: "/employees/" + id,
                dataType: "json"
            }).done(
                function(user) {
                //$("#title").text(user.firstname);
                $("#updateFirstname").val(user.firstname);
                $("#updateLastname").val(user.lastname);
                $("#updateEmail").val(user.email);
                $("#updateRole").val(user.role);

                $("#updateEmployeeForm").attr("action", "/employees/" + user._id);
            }
        );
    } catch (error) {
        alert("Error")
        console.log(error);
    }
}
// =========================================================
// Update a employee by it's id
function updateEmployeeById(id) {
    try {
        $.ajax({
            method: "POST",
            url: "/employees/" + id,
            dataType: "json"
        }).done()
            location.reload()
        } catch (error) {
            console.log(error);
    }
}
// =========================================================
// Delete a project by its ID 

function deleteEmployeeById(id) {
    try {
        $.ajax({
            method: "DELETE",
            url: "/employees/" + id,
            dataType: "json"
        }).done(
            location.reload()
        );

    } catch (error) {
        alert("Error")
        console.log(error);
    }
    
};
