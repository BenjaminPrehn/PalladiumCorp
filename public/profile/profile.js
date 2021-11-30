(async function getProfileName() {
    try {
        $.ajax({
            method: "GET",
            url: "/users/me",
            dataType: "json"
        }).done(function(user) {
            // Adding name to header
            $("#profileName").append(user.firstname + " " + user.lastname + " (" + user.role + ") " + "<i class='mdi mdi-chevron-down'></i>");

            // Adding name to profile page
            $("#accountName").text(user.firstname + " " + user.lastname );

            // Adding role to profile page
            $("#accountRole").text(user.role);

            // Adding Email to profile page
            $("#accountEmail").text(user.email);

            // Adding profile info for profile Modal
            $("#firstnameUpdate").val(user.firstname);
            $("#lastnameUpdate").val(user.lastname);
            $("#emailUpdate").val(user.email);

        });
    } catch (error) {
        console.log(error);
    }
})();

// Button function logout all users
function logoutAll() {
    try {
        $.ajax({
            method: "POST",
            url: "/users/logoutAllSessions",
            dataType: "json"
        }, window.location.reload()
        ).done(
            
        );
        
    } catch (error) {
        alert("Error occured when login out - Please try again");
        console.log(error);
    };
};

// Check if password is the same
function checkPassword(form) {
    password1 = form.password1.value;
    password2 = form.password2.value;
          
    // If Not same return False.    
    if (password1 !== password2) {
        $("#passMismatch").removeAttr("hidden");
        return false;
    } else if (password2.length < 6){
        $("#toShortPass").removeAttr("hidden");
        return false;
    } else{
        $("#changedSuccess").removeAttr("hidden");
       setTimeout(function(){
        return true
       }, 2000);
        
    }
}