(async function getProfileName() {
    try {
        $.ajax({
            method: "GET",
            url: "/users/me",
            dataType: "json"
        }).done(function(user) {
            // Adding name to header
            $("#profileName").text(" " + user.firstname + " " + user.lastname);
            console.log(user.firstname);
        });
    } catch (error) {
        console.log(error);
    }
});

function logout() {
    try {
        $.ajax({
            method: "POST",
            url: "/users/logout",
            dataType: "json"
        }).done(

        );
    } catch (error) {
        console.log(error);
        alert(error);
        
    };
};

