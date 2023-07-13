# SMART-Keycloak-eID
The main goal of this project is to create a prototype of a [SMART on FHIR](https://docs.smarthealthit.org) app that uses [Keycloak](https://www.keycloak.org) and [ID Austria](https://www.oesterreich.gv.at/id-austria.html) for authorization and authentication. The app allows patients to securely access their own data in the Electronic Health Record (EHR) system. Keycloak serves as the authorization server, responsible for issuing JWT tokens to the app. It acts as an identity broker, with ID Austria being the identity provider responsible for authentication.

## Background
This project is inspired by the [Health Outcomes Observatory](https://health-outcomes-observatory.eu) (H20) project, which aims to integrate patient-generated data (PRO) into EHR systems. By combining the SMART on FHIR app with Keycloak's authorization server and ID Austria as the identity provider, the project aims to provide patients with a secure and user-friendly way to access health data.

## Architecture (General)
The general architecture of the launch and authorization process with the SMART on FHIR standard looks as follows:

![Architecture - General](images/image.png)

The authentication and authorisation process can be roughly described in seven steps:
1.	Register App with EHR
Registration happens out-of-band prior to any app launch.
2.	Launch app:
This step needs to be differentiated into two distinct scenarios:
•	Standalone launch
In this scenario, the app is launched outside the EHR, for example by opening an app on a smartphone.
•	EHR launch
Here, the app is launched and opened within the EHR. The advantage of this approach is that the existing session within the EHR can be used for further authentication.
3.	Discover request
The application automatically searches for the EHR system's SMART configuration file to obtain important information and Uniform Resource Locators (URL) such as the authorisation server endpoint.
4.	Authorization request
The application will then contact the authorisation server and, if successful, will be issued with a temporary authorisation code after successful authentication. 
5.	Access token request
If successful, the application will contact the authorisation server again to exchange the authorisation code for an access token to gain access to the FHIR server.
6.	Request resources
The access token is signed, contains information about the rights granted and can be reliably verified by the FHIR API. As a result, it can be used to request resources from the FHIR server.
7.	Refresh access token
The validity of the access token is limited. To continue accessing FHIR resources, the application needs to update the token.

Note: A central component of the SMART on FHIR standard is authorization and authentication. For this, the SMART on FHIR standards builds on the oAuth2.0 and Open-ID Connect standard. In-Depth details can be found [here](https://build.fhir.org/ig/HL7/smart-app-launch/app-launch.html#launch-app-standalone-launch). 

## Architecture (Prototype)
For the prototype, the general architecture has to be adapted a little. Firstly, the prototype is a standalone SMART on FHIR app. In other words, an app that is not launched from the EHR system. This is because the app is later designed for patients to capture PRO data, which is not handled by an EHR system but by a standalone app. Secondly, another component is added to the prototype architecture, namely ID Austria as the identity provider. Keylcoak serves as an identity broker between the app and the identity provider. Besides that, the authorisation and authentication process is almost the same as in the 7 steps described above. The architecture of the prototype can be seen in the next figure.

![Architecture - Prototype](images/image1.png)

Notes on the components and the current state of development:
- the FHIR server is provided by the company [pineIT](https://www.pineit.at) for this project. Due to CORS restrictions on the server side, relevant server endpoints are simulated on a local environment (localhost). The validation of the tokens is therefore not possible in the first step, and must be carried out as soon as the SMART on FHIR app is running under the same domain as the FHIR server in order to circumvent the CORS restrictions.
- Currently, the access data to ID Austria is still missing, which is why GitHub is being used as the identity provider for the time being.

# Environemnt Setup
As mentioned, the setup is just a setup for a local environment (localhost). For further developments, the components must run publicly. The local development environment looks as follows:

- OS: Ubuntu v22.04.2 LTS
- Docker: v24.0.2
- Node: v20.2.0

To reproduce the setup, make sure these components are working.

## FHIR Mock
The FHIR server has two primary tasks. Firstly, it serves the smart-configuration file, which is accessible at /.well-known/smart-configuration. This file contains the endpoints of the authorization server. When the app contacts the FHIR server, it is directed to this file. By extracting the relevant information from the smart-configuration file, the app can establish communication with the authorization server. Secondly, the FHIR server is responsible for validating the JWT token issued by the authorization server. The app receives the JWT token from the authorization server and utilizes it to request FHIR resources through the FHIR server. However, the validation step cannot be performed in the local setup since the FHIR server is only simulated locally, limiting its capability to validate the token. Consequently, the validation process must be conducted and tested in a public environment at a later stage.

To simulate the /.well-known/smart-configuration endpoint, perform the following steps:

1. Navigate to your Home directory:
` cd ~ `

2. Create a new directory:
