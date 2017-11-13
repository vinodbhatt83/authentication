# Fbs-Sharing-2
A package to implement social sharing regardless of framework

[Quick Reference to Methods](https://github.forbes.com/Templates/Fbs-Sharing-2/wiki)

## Development
### Stack
Babel to transpile es6 -> es5 and karma-jasmine for testing.
### Test Code
`npm start`

starts an instance and renders an html page with a header in which you can test your code. Testing the functionality of the service is done in `index.js`.

#### Testing
`npm run test`

coverage is in the coverage folder
## Implementation
import/require the service:
```javascript
import FbsSharingService from '@forbes/fbs-sharing';
```
or
```javascript
const FbsSharingService = require('@forbes/fbs-sharing');
```

initialize the service:
```javascript
const fbsShareInstance = new fbsSharingService();
```

if using in a `<script>` tag like ng1 does:
```html
<script src ="<path/to/node_modules>/@forbes/fbs-sharing/dist/init.js">
```
This will create an instance of the FbsSharing service on the window to be used in the application

can optionally give the service a configuration object with values to be used throughout out all of its sharing services:
```javascript
const opts = {
  width: '300',
  height: '400',
  isResizable = false,
  windowName = 'Article Share',
};

const fbsShareInstance = new fbsSharingService(opts);
```
To add functionality to hide and show share icons in the header, give the element and the class used in css to hide/show them. (In the implementation in the demo, the className to hide and show is 'hide-icons')
```javascript
fbsShareInstance.addToggleToShareElement(shareElement, 'hide-icons');
```
You can also do it yourself in your own code similar to this:
```javascript
const shareElement = document.querySelector(.share-element);

shareElement.addEventListener('click', () => {
  fbsInstance.toggleShareIcons(shareElement, 'hide-icons');
});
```

To add share functionality to an array of different social icons, there is already a function called:
`mapShareToClick(shareIcons, opts)`

If no configuration object was given, then it will default to using the values from the .config property initialized in the constructor.

Available Platforms:
```
'facebook'
'google'
'linkedin'
'twitter'
'email'
'sms'
```

Example:
```js
// get the share icon elements
const facebookElement = document.querySelector('.btn-facebook');
const googleElement = document.querySelector('.btn-google');
const linkedinElement = document.querySelector('.btn-linkedin');
const twitterElement = document.querySelector('.btn-twitter');
const emailElement = document.querySelector('.btn-email');
const smsElement = document.querySelector('.btn-chat');

// an array of classes of the different icons and the platform they will share over
const shareIcons = [
  { element: facebookElement, platform: 'facebook' },
  { element: googleElement, platform: 'google' },
  { element: linkedinElement, platform: 'linkedin' },
  { element: twitterElement, platform: 'twitter' },
  { element: emailElement, platform: 'email' },
  {element: smsElement, platform: 'sms'},
];

// give each share icon an onclick function that handles sending the email.
// the config options for the window are initialized by default here unless given a
// configuration object.
fbsShareInstance.mapShareToClick(shareIcons);

// example with config options:
const opts = {
  width: '100',
  height: '600',
  isResizable: true,
  windowName: 'someWindowName',
};

fbsShareInstance.mapShareToClick(shareIcons, opts);
```

Functionality to share icons can be added to each icon individually by using: `shareArticleOnSocial(e, platform, article, opts)` where opts is the configuration object. The function will only exit early if there is no platform specified in the configuration object.

options:
```
{string } width - the width of the window to be opened
{string} height - the height of the window to be opened
{boolean} isResizable - if true, the window can be resized by the user
{string} windowName - the name of the window to be used as a reference
```

Example with configuration object:
```js
const opts = {
  width: '300',
  height: '400',
  isResizable: false,
  windowName:'some window name',
};

const article = {
  title: 'Article Title',
  description: 'article description',
  uri: 'www.article-uri.com',
};

const shareFb = document.querySelector('.fb-share-icon');
shareFb.addEventListener('click', (e) => {
  fbsInstance.shareArticleOnSocial(e, 'facebook', article, opts);
});
```
Example without the configuration object:
```js
const shareFb = document.querySelector('.fb-share-icon');
shareFb.addEventListener('click', (e) => {
  fbsInstance.shareArticleOnSocial(e, 'facebook', article);
});
```
