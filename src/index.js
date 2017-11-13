import FbsAuthenticationService from './fbs-authentication.service';

// will not work with universal rendering angular
if (window && !window.fbsAuthentication) {
  window.fbsAuthentication = new FbsAuthenticationService();
}
