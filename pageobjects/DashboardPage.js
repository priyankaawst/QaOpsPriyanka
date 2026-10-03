class DashboardPage
{

   constructor(Page)
   {

    this.products = Page.locator('.card-body');
    this.productText = Page.locator('.card-body b');
    this.cart = Page.locator("[routerlink='/dashboard/cart']");


   }

   


}