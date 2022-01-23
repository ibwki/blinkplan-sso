# Blinkplan SSO Demo

This demo illustrates a Single sign-on with Blinkplan portal.

## SSO in three steps

- Get the required data for the SSO as specified by BLINKPLAN documentation from the logged in user. (probably in your app local store or a direct call to your app's database)
- Call the BLINKPLAN endpoint with the required form values.
- On successful request , redirect the user to the provided URL in the endpoint response from BLINKPLAN

### `Get endpoint form values`

let values = {
firstName:`userFirstName`,
otherNames: `userLastName` || `userFirstName`,
email:`userEmail`,
userGUID: `userID`,
bvn:`userBVN`,
dateOfBirth: new Date().toJSON(),
password: "AGSMEISapp@123",
role: "APPLICANT",
userSource: "AGSMEIS",
authorization: "bearer no-authorization-key",
centerName: "default",
centerOID: 0,
phoneNumber: "080",
}

The firstName, otherNames, email, userGUID, bvn fields are to be to be passed from the user \
data in your app's store or Database. All other fields are defaults. Pass them as is.

## Test the app

Launch the app with `npm start`
