[![Build status](https://ci.appveyor.com/api/projects/status/0um08ln7forutas0?svg=true)](https://ci.appveyor.com/project/anastasia-shmeleva/ra-diploma-frontend)

#  Graduation project of the course "React"

The diploma project is an online shoe store. The goal is to create a working application, all the main functions of which can be used.

Most of the markup and styling was provided and stored in the `html` directory . 

Deploy can be found [here](https://anastasia-shmeleva.github.io/ra-diploma-frontend/).

##  Description

Redux + Redux Thunk used to store the state of the cart and side effects.

Loader is shown when loading.
Error message is shown if the is an error from the server (or if nothing fetched, for example, the user doesn't have an Internet connection right now)

##  Content

The application contains the following pages:

1. Main page
1. Product catalog
1. Information page
1. Product page
1. Shopping cart
1. 404 

##  Transitions between screens

The navigation center of the application is the header and footer of each page:

![ Header ](./assets/header-menu.png)

![ Footer ](./assets/footer-menu.png)

From the header you can get to the following screens:
* Logo and link "Home" - lead to the main page, URL - "/"
* Catalog - leads to the catalog page, URL - "/catalog.html"
* About the store - leads to the page "About the store", URL - "/about.html"
* Contacts - leads to the "Contacts" page, URL - "/contacts.html"

From the footer you can get to the following screens:
* About the store - leads to the page "About the store", URL - "/about.html"
* Catalog - leads to the catalog page, URL - "/catalog.html"
* Contacts - leads to the "Contacts" page, URL - "/contacts.html"
