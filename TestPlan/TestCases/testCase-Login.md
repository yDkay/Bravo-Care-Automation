# Login

## Here we can organize some of the test cases related to the Login functionality

</br>

### Login to your account:

**Given**

> That we are in the /login page
> **&**
> that there **is** already an available account in the database

**When**

> We add those credentials correctly and click Login.

**Then**

> It should login into that specific account.

</br>

### New User Signup:

**Given**

> That we are in the /login page
> **&**
> that there **isn't** already an available account in the database

**When**

> We add some credentials following the field rules and click Signup.

**Then**

> It should redirect us to the /signup page to fill the "ENTER ACCOUNT INFORMATION" form.

</br>

### Enter Account Information:

**Given**

> That we are in the /signup page

**When**

> We add fill the correct values in the forms.

**Then**

> It should redirect us to /account_created with a "ACCOUNT CREATED!" message.
