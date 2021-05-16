// 1.Install MongoDB
go to https://docs.mongodb.com/manual/installation/ and choose the community edition for either MAC or Windows, follow the default instructions for installing
MongoDB

// 2. Clone Reposeitory
You will need to clone the repo for PPT-website from this link: https://github.com/sultanGT/PPT-website.git

// 3. Run Npm install
You will then need to open a new terminal and run: 

$ npm install 

(you will need to install node.js to run npm install)
once completed you will need to open a new terminal and then run:

$ cd frontend
$ npm install

(this is to install node_modules folder for application to work)

// 4. Run Npm start from root folder
you will then need to open a new terminal and run:

npm start

this runs the server-side on localhost:5000
then open a new terminal and run:

$ cd frontend
$ npm start

this will then open up the app in the chrome browser at localhost:3000

// 4. Insert user list and item list
you will then need to insert users into the web app by typing into the URL:

To insert users
http://localhost:5000/api/PPTusers/PPTuserlist

To insert items
http://localhost:5000/api/PPTitems/PPTitemlist

The web app can now be used as normal:

Default user logins are: 

Admin user account :
 name: admin
 email: admin@ppt  

Normal user account :
name: user
email: user@ppt

or you can register your details on to the web app and sign-up.

the PPT web application is currently hosted online at:

http://www.pptwebsite.co.uk/

