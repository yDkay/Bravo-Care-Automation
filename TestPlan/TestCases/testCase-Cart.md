# Cart

## Here we can organize all the test cases related to the Cart functionality

</br>

### Proceed to checkout:

**Given**

> That we added products to the cart
> **&**
> we are in the /view_cart page
> **&**
> we are logged in.

**When**

> I click on "Proceed to Checkout".

**Then**

> It should be redirected to the /checkout page.

</br>

### Place Order:

**Given**

> That we are in the /checkout page
> **&**
> we have products added.

**When**

> I click on "Place Order".

**Then**

> It should be redirected to the /payment page.

</br>

### Pay and Confirm Order:

**Given**

> That we are in the /payment page.

**When**

> I add the required information and click on "Pay and Confirm Order".

**Then**

> It should be redirected to the /payment page.

</br>

### Remove Items:

**Given**

> That we added products to the cart
> **&**
> we are in the /view_cart page
> **&**
> we are logged in.

**When**

> I we click in the "X" button on the specific product.

**Then**

> It should remove that product from the cart.

</br>
