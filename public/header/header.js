

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

