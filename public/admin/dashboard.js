// Get projects upon docuemnt load
(async function getProjects() {
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
                            + "</td> </tr>"))
            });
        })

    } catch (error) {
        console.log(error);
    };

})();