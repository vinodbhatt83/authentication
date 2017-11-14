(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fbs-authentication", [], factory);
	else if(typeof exports === 'object')
		exports["fbs-authentication"] = factory();
	else
		root["fbs-authentication"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/vbhatt/authentication";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * A Service to handle all the functionality needed in the Header
 * for the functionality of the share icons
 * @class FbsSharingService
 */
class FbsAuthenticationService {
  /**
   * Creates an instance of FbsSharingService.
   * @param {string} width - width of the window to share on
   * @param {string} height - height of the window to share on
   * @param {boolean} isResizable - if true, window is resizable
   * @param {string} windowName - reference name of the window
   * @param {string} article - article to post in the share window
   * @memberof FbsSharingService
   */

  constructor() {
    // The different urls used to share articles to different social platforms

    // set the default config object for the new share window to open
    this.init();
  }

  init() {
    let config = {
      apiKey: "AIzaSyAaNgSoOVn97vPUuozBT0AggY6vDP4D3Jw",
      authDomain: "fbs-auth.firebaseapp.com",
      databaseURL: "https://fbs-auth.firebaseio.com",
      projectId: "fbs-auth",
      storageBucket: "fbs-auth.appspot.com",
      messagingSenderId: "972288649195"
    };

    let fbaseScripts = ['<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase.js"></script>', '<script>' + window.firebase.initializeApp(config) + '</script>', '<script src="https://cdn.firebase.com/libs/firebaseui/2.4.0/firebaseui.js"></script>', '<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.4.0/firebaseui.css" />', '<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/2.4.0/firebase-ui-auth.css" />'];

    for (index = 0; index < fbaseScripts.length; ++index) {
      var script = document.createElement('script');
      script.src = fbaseScripts[index];
      script.type = 'text/javascript';
      var done = false;
      script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
          done = true;
        }
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    }

    this.firebase = window.firebase || {};
    this.firebaseui = window.firebaseui || {};

    this.fbaseUi = new this.firebaseui.auth.AuthUI(this.firebase.auth());
    this.handleSignedOutUser();
  }

  /**
   * Displays the UI for a signed out user.
   */
  handleSignedOutUser() {
    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
    this.fbaseUi.start('#fbs-auth', this.getUiConfig());
  }

  getUiConfig() {
    return {
      'callbacks': {
        // Called when the user has been successfully signed in.
        'signInSuccess': function (user, credential, redirectUrl) {
          this.handleSignedInUser(user);
          // Do not redirect.
          return false;
        }
      },
      // Opens IDP Providers sign-in flow in a popup.
      'signInFlow': 'popup',
      'signInOptions': [
      // TODO(developer): Remove the providers you don't need for your app.
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: ['https://www.googleapis.com/auth/plus.login']
      }, {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: ['public_profile', 'email']
      }, firebase.auth.TwitterAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID, {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Whether the display name should be displayed in Sign Up page.
        requireDisplayName: true
      }, {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID
      }],
      // Terms of service url.
      'tosUrl': 'https://www.google.com'
    };
  }

  /**
   * Displays the UI for a signed in user.
   * @param {!firebase.User} user
   */
  handleSignedInUser(user) {
    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
    document.getElementById('name').textContent = user.displayName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('phone').textContent = user.phoneNumber;
    if (user.photoURL) {
      document.getElementById('photo').src = user.photoURL;
      document.getElementById('photo').style.display = 'block';
    } else {
      document.getElementById('photo').style.display = 'none';
    }
  }

  /**
   * Signout the app.
   */
  signOut() {
    document.getElementById('sign-out').addEventListener('click', function () {
      this.firebase.auth().signOut();
    });
  }

  /**
  * Open a popup with the FirebaseUI widget.
  */
  signInWithPopup() {
    window.open(getWidgetUrl(), 'Sign In', 'width=985,height=735');
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = FbsAuthenticationService;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fbs_authentication_service__ = __webpack_require__(0);


// will not work with universal rendering angular
if (window && !window.fbsAuthentication) {
  window.fbsAuthentication = new __WEBPACK_IMPORTED_MODULE_0__fbs_authentication_service__["default"]();
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src__ = __webpack_require__(1);


/*
 * Example of how to use the FbsSharingService
 */


// create an instance of the fbs sharing service
const fbsAuthInstance = new __WEBPACK_IMPORTED_MODULE_0__src__["default"]();

// get the share icon element
const authElement = document.querySelector('fbs-auth');

// example of calling with configuration objects

// const shareOpts = {
//   width: '200',
//   height: '800',
//   isResizable: true,
//   windowName: 'My own window name',
// };

// fbsShareInstance.mapShareToClick(shareIcons, randomArticle, shareOpts);


/***/ })
/******/ ]);
});
//# sourceMappingURL=main.map