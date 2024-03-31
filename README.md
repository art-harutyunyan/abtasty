# Automation Project for AbTasty

Automated tests have been created to cover:

1. The email must be recognised in the database else default error message for invalide email/password ;
2. The password must be the same as in the database for this user
   - An eye/strikethrough eye button allow to show/hide the password input
   - If forgotten a link is present to reset it and send an email with reset link (handled partly)
3. An error message is displayed if password is wrong with default error message
4. If enabled for a non @abtasty user, MFA must be provided (I could create a comprehensive validation flow using MailDev, unfortunately had a time pressure)
5. From each step I can go back to email/password with the arrow button
6. Bonus : yml file to make the tests triggered on PUSH (handled with `Parallelization`)

Could not reproduce:

1. After 3 wrong attempts the Captcha is triggered (I could not)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine
- Compatible with nodeJS version `16.14.0` and higher
- Compatible with npm version `8.3.1` and higher

### Installing and running the tests

1. Clone the repository:

   ```bash
   git clone https://github.com/art-harutyunyan/abtasty.git
   ```

2. The `cypress.env.json` file is not pushed to repo, `cypress.env.example` is pushed instead. Fill the corresponding data before running Cypress in runner/cli.
3. To install dependencies `npm install`
4. To start Cypress runner `npx cypress open`
5. To run all specs `npx cypress run`

======================================================================

I am recording the tests in Cypress Cloud ;)

![Example screenshot]()
