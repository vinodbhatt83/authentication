/**
 * A Service to handle all the functionality needed in the Header
 * for the functionality of the share icons
 * @class FbsSharingService
 */
export default class FbsAuthenticationService {
  /**
   * Creates an instance of FbsSharingService.
   * @param {string} width - width of the window to share on
   * @param {string} height - height of the window to share on
   * @param {boolean} isResizable - if true, window is resizable
   * @param {string} windowName - reference name of the window
   * @param {string} article - article to post in the share window
   * @memberof FbsSharingService
   */

  constructor(configOpts = {}) {
    // The different urls used to share articles to different social platforms

    // set the default config object for the new share window to open
    window.onload = this.init();
  }

  fbaseUi = new firebaseui.auth.AuthUI(firebase.auth());

  getUiConfig = function() {
    return {
      'callbacks': {
        // Called when the user has been successfully signed in.
        'signInSuccess': function(user, credential, redirectUrl) {
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
        },
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          scopes :[
            'public_profile',
            'email'
          ]
        },
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // Whether the display name should be displayed in Sign Up page.
          requireDisplayName: true
        },
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID
        }
      ],
      // Terms of service url.
      'tosUrl': 'https://www.google.com'
    };
  }

  init = function() {

    var config = {
      apiKey: "AIzaSyAaNgSoOVn97vPUuozBT0AggY6vDP4D3Jw",
      authDomain: "fbs-auth.firebaseapp.com",
      databaseURL: "https://fbs-auth.firebaseio.com",
      projectId: "fbs-auth",
      storageBucket: "fbs-auth.appspot.com",
      messagingSenderId: "972288649195"
    };

    let fbaseScripts = [
      '<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase.js"></script>',
      '<script>' + config + firebase.initializeApp(config) + '</script>',
      '<script src="https://cdn.firebase.com/libs/firebaseui/2.4.0/firebaseui.js"></script>',
      '<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.4.0/firebaseui.css" />',
      '<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/2.4.0/firebase-ui-auth.css" />'
    ];
    
    for (index = 0; index < fbaseScripts.length; ++index) {
        var script = document.createElement('script');
        script.src = fbaseScripts[index];
        script.type='text/javascript';
        var done = false;
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
            }
        };  
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    this.getUiConfig();
  }

  /**
   * Open a popup with the FirebaseUI widget.
   */
  signInWithPopup = function() {
    window.open(getWidgetUrl(), 'Sign In', 'width=985,height=735');
  };

  /**
   * Displays the UI for a signed in user.
   * @param {!firebase.User} user
   */
  handleSignedInUser = function(user) {
    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
    document.getElementById('name').textContent = user.displayName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('phone').textContent = user.phoneNumber;
    if (user.photoURL){
      document.getElementById('photo').src = user.photoURL;
      document.getElementById('photo').style.display = 'block';
    } else {
      document.getElementById('photo').style.display = 'none';
    }
  };

  /**
   * Displays the UI for a signed out user.
   */
  handleSignedOutUser = function() {
    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
    this.fbaseUi.start('fbs-auth', getUiConfig());
  };

  /**
   * Initializes the app.
   */
  signOut = function() {
    document.getElementById('sign-out').addEventListener('click', function() {
      firebase.auth().signOut();
    });
  };
}
