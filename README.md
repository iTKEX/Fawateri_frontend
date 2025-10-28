# FAWATERI

## 📄 User Stories

- ### Create Bill
    As a user,
    Given I provide a merchant, date, amount, and upload an image,
    When I submit,
    Then a bill is created with a single linked image, and I see it in the list.

- ### Edit Bill

    As a user,
    Given an existing bill,
    When I update the merchant, date, amount, or categories,
    Then the changes persist and are visible on reload.

- ### Categories

    As a user,
    Given categories exist,
    When I assign multiple categories to a bill,
    Then the bill shows all assigned categories.

- ### Reminder

    As a user,
    Given a bill or product with related information (e.g., warranty or service history),
    When the system detects that:

    The warranty will expire within a set period (e.g., 2 weeks), or

    The user hasn’t performed a service in a set period (e.g., 2 months),
    Then a reminder is automatically created and shown under the related bill or product.
    And these reminders also appear in a “Due Soon” list showing upcoming or overdue items.
    And after a reminder’s time or event has passed, the user can manually delete it (or the system can automatically clear expired reminders).

- ### Search / Filter

    As a user,
    Given many bills,
    When I filter by category, merchant, date_from/date_to, or amount_min/amount_max,
    Then results include only matching bills.

- ### Single Image Constraint

    As a user,
    When I try to upload a second image for the same bill,
    Then the first image is replaced.

## Routing Tabel
### Pages
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="20%">Page</th>
            <th width="40%">Path</th>
            <th width="40%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Landing</td>
            <td>/</td>
            <td>Main Page for application</td>
        </tr>
        <tr>
            <td>Signin</td>
            <td>/signin</td>
            <td>Sign in Page</td>
        </tr>
        <tr>
            <td>Signup</td>
            <td>/signup</td>
            <td>Signup Page</td>
        </tr>
        <tr>
            <td>Bills</td>
            <td>/bills</td>
            <td>Main User page list all bills</td>
        </tr>
        <tr>
            <td>Bill Deatils</td>
            <td>/bills/{bill_id}</td>
            <td>Show bill details</td>
        </tr>
        <tr>
            <td>Profile (optinal)</td>
            <td>/profile</td>
            <td>User information Main page</td>
        </tr>
        <tr>
            <td>Dashboard (optinal)</td>
            <td>/dashboard</td>
            <td>Show user bills and informations</td>
        </tr>
    </tbody>
</table>