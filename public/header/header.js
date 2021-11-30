(async function getProfileName() {
    try {
        $.ajax({
            method: "GET",
            url: "/users/me",
            dataType: "json"
        }).done(function(user) {
            // Adding name to header
            $("#profileName").append(user.firstname + " " + user.lastname + " (" + user.role + ") " + "<i class='mdi mdi-chevron-down'></i>");
        });
    } catch (error) {
        console.log(error);
    }
})();

function logout() {
    try {
        $.ajax({
            method: "POST",
            url: "/users/logout",
            dataType: "json"
        }, window.location.reload()
        ).done(

        );
    } catch (error) {
        console.log(error);
        alert(error);
        
    };
};

