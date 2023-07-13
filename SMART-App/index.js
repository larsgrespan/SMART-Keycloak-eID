FHIR.oauth2.ready().then(function(client) {
    client.request(`Patient/${client.patient.id}`).then(
        function(patient) {
            var name = patient.name[0].given.join(" ") + " " + patient.name[0].family;
            var birthdate = patient.birthDate;

            document.getElementById("patient-name").textContent = "Name: " + name;
            document.getElementById("patient-birthdate").textContent = "Birthdate: " + birthdate;
            document.getElementById("patient-info").style.display = "block";

            document.getElementById("logout-button").addEventListener("click", function() {
                FHIR.oauth2.logout().then(function() {
                    window.location = "launch.html"; // Redirect to launch.html after logout
                });
            });
        }
    );
});

