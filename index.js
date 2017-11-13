import FbsSharingService from './src';

/*
 * Example of how to use the FbsSharingService
 */


// create an instance of the fbs sharing service
const fbsAuthInstance = new FbsAuthenticationService();

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
