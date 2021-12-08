(async function displayEmployeeButton() {
    try {
      $.ajax({
        method: "GET",
        url: "/users/me",
        dataType: "json",
      }).done(
        function (user) {

        if (user.role == "user")
          document.getElementById("displayEmployees").style.display = "none";

      });
    } catch (error) {
      console.log(error);
    }
  })();

function logout() {
  try {
    $.ajax(
      {
        method: "POST",
        url: "/users/logout",
        dataType: "json",
      },
      (window.location.href = "/login")
    ).done();
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

