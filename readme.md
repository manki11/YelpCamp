# YelpCamp #

#### A Camp review site ####

A site in which a user can signup/login and review his expiriences at hotels or other adventures!!

#### Project ScreenShots

<p align="center">
<img src="screenshots/home.png" height = "330" width="550">
<br/>
Home Page
</p>
<br/><br/>
<p align="center">
<img src="screenshots/login.png" height= "330" width="550">
<br/>
Login/ Signup Screen
</p>
<br/><br/>
<p align="center">
<img src="screenshots/feed.png" height= "330" width="550">
<br/>
User feed
</p>
<p align="center">
<img src="screenshots/detail.png" height= "430" width="550">
<br/>
Review Detail Page
</p>
<br/><br/>
<br/>
<br/>

##### For switching to developer mode

In main.js
change this:

```javascript
process.env.NODE_ENV = 'production';
```

to:

```javascript
process.env.NODE_ENV = 'development';
```


#### Steps to run project ####

Make sure npm, nodejs and mongodb are installed on your machine.

Clone the repository on your local machine and run.

```npm
npm install --dev
```

##### Running the project

Run script

```npm
node app.js
```

#### License
 
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.