class LoginPage{

constructor(Page)

{
    this.page = Page;
    this.signInbutton =  Page.locator('input#login');
    this.userName = Page.locator('input#userEmail');
    this.password = Page.locator("[type='password']");


}

async goTo()
{

  await this.page.goTo("https://rahulshettyacademy.com/client");

}

async validLogin(username, password)
{
  
  await this.userName.type(username);
  await this.password.type(password);
  await this.signInbutton.click();



}
}
module.exports={LoginPage};