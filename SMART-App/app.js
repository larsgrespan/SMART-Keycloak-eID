window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("login-button").addEventListener("click", function() {
        FHIR.oauth2.authorize({
            clientId: "myclient",
            scope: "openid launch launch/patient patient/*.cruds offline_access",
            redirectUri: "http://localhost:8080/index.html",
            iss: "http://localhost:8081/fhir/"
            
        });
    });
});
