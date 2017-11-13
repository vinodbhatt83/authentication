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

  constructor(configOpts = {
    // width: '400',
    // height: '500',
    // isResizable: false,
    // windowName: 'Authentication',
  }) {
    // The different urls used to share articles to different social platforms
    this.authMap = {
      // facebook: 'https://www.facebook.com/sharer.php?u=',
      // twitter: 'https://twitter.com/intent/tweet?url=',
      // google: 'https://plus.google.com/share?url=',
      // linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=',
      // email: 'mailto:?',
      // sms: 'sms:',
    };

    // set the default config object for the new share window to open
    this.config = configOpts;

    let fbaseScripts = `<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase.js"></script>
    <script src="https://cdn.firebase.com/libs/firebaseui/2.4.0/firebaseui.js"></script>
    <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.4.0/firebaseui.css" />
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/2.4.0/firebase-ui-auth.css" />
    <script>
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAaNgSoOVn97vPUuozBT0AggY6vDP4D3Jw",
      authDomain: "fbs-auth.firebaseapp.com",
      databaseURL: "https://fbs-auth.firebaseio.com",
      projectId: "fbs-auth",
      storageBucket: "fbs-auth.appspot.com",
      messagingSenderId: "972288649195"
    };
    firebase.initializeApp(config);
  </script>`;

    document.body.appendChild(fbaseScripts);
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
    ui.start('#firebaseui-container', getUiConfig());
  };

  // Listen to change in auth state so it displays the correct UI for when
  // the user is signed in or not.
  // firebase.auth().onAuthStateChanged(function(user) {
  //   document.getElementById('loading').style.display = 'none';
  //   document.getElementById('loaded').style.display = 'block';
  //   user ? handleSignedInUser(user) : handleSignedOutUser();
  // });

  /**
   * Initializes the app.
   */
  initApp = function() {
    document.getElementById('sign-out').addEventListener('click', function() {
      firebase.auth().signOut();
    });
  };

  // /**
  //  * Opens a window to share a Forbes article on the different social media platforms:
  //  * Platforms: google, linkedin, facebook, twitter, and email
  //  *
  //  * @param {any} e - the event that was is being propogated when firing the function
  //  * @param {String} platform - the social platform to share the article on e.g 'facebook'
  //  * @param {Object} article - {
  //  *  title: 'Something Interesting',
  //  *  description: 'some random description of this article',
  //  *  uri: 'https://www.forbes.com/article-uri',
  //  *  blogType: 'author',
  //  *  slug: 'Brand',
  //  * }
  //  * Note: On some projects the article object has a url property instead of uri
  //  * @param {Object} - {
  //  *  width: '400',
  //  *  height: '500',
  //  *  isResizable: false,
  //  *  windowName: 'some window name',
  //  * }
  //  * @memberof FbsSharingService
  //  */
  // shareArticleOnSocial(e, platform, article, {
  //   width = this.config.width,
  //   height = this.config.height,
  //   isResizable = this.config.isResizable,
  //   windowName = this.config.windowName,
  // } = {}) {
  //   // prevent the default on the click event and stop the event
  //   // from bubbling up to the hide/show icons button
  //   e.preventDefault();
  //   e.stopPropagation();

  //   // don't do anything if no platform was specified or an invalid platform was given
  //   if (!platform || !this.authMap[platform] || !article) {
  //     return;
  //   }

  //   const shouldResize = isResizable ? 'yes' : 'no';
  //   const link = this.configureSocialLink(platform, article);
  //   if (platform === 'email' || platform === 'sms') {
  //     this.openMessageClient(link);
  //   } else {
  //     const windowConfig = `width=${width},height=${height},resizable=${shouldResize}`;
  //     window.open(link, windowName, windowConfig).focus();
  //   }
  // }

  // /**
  //  * Configures the link to open the sharing window
  //  *
  //  * @param {String} platform - the social platform to share the article on
  //  * @param {Object} article - {
  //  *  title: 'Something Interesting',
  //  *  description: 'some random description of this article',
  //  *  uri: 'https://www.forbes.com/article-uri',
  //  *  blogType: 'author',
  //  *  slug: 'Brand',
  //  * }
  //  * Note: On some projects the article object has a url property instead of uri
  //  * @returns {String} - the link used when opening the new window
  //  * @memberof FbsSharingService
  //  */
  // configureSocialLink(platform, article) {
  //   const articleTitle = this.getTitle(article) || '';
  //   const articleUri = article.uri || article.url || '';
  //   const articleDescription = article.description || articleTitle || '';

  //   switch (platform) {
  //     case 'twitter':
  //       return this.formatTwitterLink(articleTitle, articleUri);
  //     case 'email':
  //       return this.formatEmailLink(articleTitle, articleUri);
  //     case 'linkedin':
  //       return this.formatLinkedinLink(articleTitle, articleUri, articleDescription);
  //     case 'sms':
  //       return this.formatSMSLink(articleTitle, articleUri);
  //     default:
  //       return `${this.authMap[platform]}${encodeURIComponent(articleUri)}`;
  //   }
  // }

  // /**
  //  * Formats the link for sharing an article through Twitter
  //  *
  //  * @param {String} articleTitle - the article's title
  //  * @param {String} articleUri  - the uri of the article the clinet can share
  //  * @returns {String}  - the link used when opening the new window
  //  * @memberof FbsSharingService
  //  */
  // formatTwitterLink(articleTitle, articleUri) {
  //   const titleLength = articleTitle.length;
  //   let twitterTitle = articleTitle;

  //   // Twitter has 140 char limit, the link is 23 + a space, and the via @forbes
  //   // append is 12 leaving 104 chars for the title
  //   if (titleLength > 104) {
  //     twitterTitle = twitterTitle.substring(0, 101);
  //     twitterTitle += '...';
  //   }

  //   return `${this.authMap.twitter}${encodeURIComponent(articleUri)}&text=${twitterTitle} via @forbes`;
  // }

  // /**
  //  * Maps over an array of the different share icons and adds a click event listener
  //  * that will fire the shareArticleOnSocial function for each respective platform given in
  //  * each object inside of the array
  //  *
  //  * @param {Array[Object]} shareIcons - takes an array of object whose structure is:
  //  * { element: <element>, platform: <socialPlatform> } where the element is the icon element to
  //  * attach the event listener to and the platform is the social platform to share it over
  //  * @param {Object} - {
  //  *  platform: 'facebook',
  //  *  width: '400',
  //  *  height: '500',
  //  *  isResizable: false,
  //  *  windowName: 'some window name',
  //  * }
  //  * @memberof FbsSharingService
  //  */
  // mapShareToClick(
  //   shareIcons,
  //   article,
  //   {
  //     width = this.config.width,
  //     height = this.config.height,
  //     isResizable = this.config.isResizable,
  //     windowName = this.config.windowName,
  //   } = {},
  // ) {
  //   shareIcons.forEach((icon) => {
  //     icon.element.addEventListener('click', (e) => {
  //       this.shareArticleOnSocial(e, icon.platform, article, {
  //         width,
  //         height,
  //         isResizable,
  //         windowName,
  //       });
  //     });
  //   });
  // }
}
