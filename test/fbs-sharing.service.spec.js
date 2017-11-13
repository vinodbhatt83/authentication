// import FbsSharingService from '../src/fbs-sharing.service';


// describe('FbsSharingService', () => {
//   const defaultConfig = {
//     width: '400',
//     height: '500',
//     isResizable: false,
//     windowName: 'Article Share',
//   };

//   const defaultSharingMap = {
//     facebook: 'https://www.facebook.com/sharer.php?u=',
//     twitter: 'https://twitter.com/intent/tweet?url=',
//     google: 'https://plus.google.com/share?url=',
//     linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=',
//     email: 'mailto:?',
//     sms: 'sms:',
//   };

//   it('should initialize with the correct share urls and default window config', () => {
//     const fbsShareInstance = new FbsSharingService();
//     expect(fbsShareInstance.sharingMap).toEqual(defaultSharingMap);
//     expect(fbsShareInstance.config).toEqual(defaultConfig);
//   });

//   it('should initialize with custom arguments given to the config', () => {
//     const mockConfig = {
//       width: '300',
//       height: '200',
//       isResizable: false,
//       windowName: 'My Own Window Name',
//     };

//     const fbsShareInstance = new FbsSharingService(mockConfig);

//     expect(fbsShareInstance.config).toEqual(mockConfig);
//   });

//   describe('toggleShareIcons', () => {
//     it('should show the icons of the given share element and remove the class that causes it to hide', () => {
//       const mockShareElement = document.createElement('li');
//       const mockHiddenClass = 'hidden';
//       mockShareElement.classList.add(mockHiddenClass);

//       const fbsShareInstance = new FbsSharingService();
//       fbsShareInstance.toggleShareIcons(mockShareElement, mockHiddenClass);

//       expect(mockShareElement.classList).not.toContain(mockHiddenClass);
//     });
//     it('should hide the icons of the given sharrow element and add the class that causes it to hide', () => {
//       const mockShareElement = document.createElement('li');
//       const mockHiddenClass = 'hidden';

//       const fbsShareInstance = new FbsSharingService();
//       fbsShareInstance.toggleShareIcons(mockShareElement, mockHiddenClass);

//       expect(mockShareElement.classList).toContain(mockHiddenClass);
//     });
//   });

//   describe('addToggleToShareElement', () => {
//     it('should add an event listener to the element that is passed to it', () => {
//       const mockElement = document.createElement('div');
//       spyOn(mockElement, 'addEventListener');
//       const fbsShareInstance = new FbsSharingService();
//       fbsShareInstance.addToggleShareToElement(mockElement, 'hide-icons');
//       expect(mockElement.addEventListener).toHaveBeenCalled();
//     });
//     it('should return undefined if no element is given', () => {
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.addToggleShareToElement(undefined, 'hide-icons');
//       expect(result).toBe(undefined);
//     });
//     it('should return undefined if the argument given as an element is not a valid element', () => {
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.addToggleShareToElement('fake element', 'hide-icons');
//       expect(result).toBe(undefined);
//     });
//     it('should return undefined if the classname given to hide icons is not a string', () => {
//       const mockElement = document.createElement('div');
//       const wrongClassName = { className: 'IamWrong' };
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.addToggleShareToElement(mockElement, wrongClassName);
//       expect(result).toBe(undefined);
//     });
//   });

//   describe('shareArticleOnSocial', () => {
//     let mockOpts;
//     let mockEvent;
//     let mockPlatform;
//     let mockArticle;
//     let fbsShareInstance;

//     beforeEach(() => {
//       mockEvent = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation']);
//       mockPlatform = 'facebook';
//       mockArticle = {
//         title: 'EpsonVoice: The Anatomy Of An Efficient Mobile Office',
//         uri: 'www.some-mock-article.com',
//         description: 'say hello to my random description',
//       };
//       mockOpts = {
//         width: defaultConfig.width,
//         height: defaultConfig.height,
//         isResizable: defaultConfig.isResizable,
//         windowName: defaultConfig.windowName,
//       };
//       fbsShareInstance = new FbsSharingService();
//       spyOn(fbsShareInstance, 'openMessageClient').and.returnValue(false);
//     });

//     it('should return undefined if no social platform is given', () => {
//       const result = fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);

//       expect(result).toBe(undefined);
//     });

//     it('should return undefined if an invalid platform is given', () => {
//       mockPlatform = 'instagram';
//       const result = fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);

//       expect(result).toBe(undefined);
//     });

//     it('should return undefined if no article is given', () => {
//       const result = fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform);

//       expect(result).toBe(undefined);
//     });

//     it('should fire prevent default on the click event', () => {
//       fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);
//       expect(mockEvent.preventDefault).toHaveBeenCalled();
//     });

//     it('should open a new share window with only a platform given', () => {
//       const mockWindowParams = `width=${defaultConfig.width},height=${defaultConfig.height},resizable=no`;
//       const shareUrlLink = fbsShareInstance.sharingMap.facebook + encodeURIComponent(mockArticle.uri);
//       spyOn(window, 'open').and.callThrough();
//       fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle);
//       expect(window.open).toHaveBeenCalled();
//       expect(window.open).toHaveBeenCalledWith(shareUrlLink, defaultConfig.windowName, mockWindowParams);
//     });

//     it('should open a new share window with custom arguments', () => {
//       mockOpts.width = '300';
//       mockOpts.height = '400';
//       mockOpts.isResizable = true;
//       mockOpts.windowName = 'Mock window name';
//       const mockWindowParams = `width=${mockOpts.width},height=${mockOpts.height},resizable=yes`;
//       const shareUrlLink = fbsShareInstance.sharingMap.facebook + encodeURIComponent(mockArticle.uri);

//       spyOn(window, 'open').and.callThrough();
//       fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);
//       expect(window.open).toHaveBeenCalled();
//       expect(window.open).toHaveBeenCalledWith(shareUrlLink, mockOpts.windowName, mockWindowParams);
//     });

//     it('should share an article through facebook', () => {
//       const mockWindowParams = `width=${defaultConfig.width},height=${defaultConfig.height},resizable=no`;
//       const shareUrlLink = fbsShareInstance.sharingMap.facebook + encodeURIComponent(mockArticle.uri);

//       spyOn(window, 'open').and.callThrough();
//       fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);
//       expect(window.open).toHaveBeenCalled();
//       expect(window.open).toHaveBeenCalledWith(shareUrlLink, defaultConfig.windowName, mockWindowParams);
//     });

//     it('should share an article through google', () => {
//       const mockWindowParams = `width=${defaultConfig.width},height=${defaultConfig.height},resizable=no`;
//       const shareUrlLink = fbsShareInstance.sharingMap.google + encodeURIComponent(mockArticle.uri);
//       mockPlatform = 'google';
//       spyOn(window, 'open').and.callThrough();
//       fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);
//       expect(window.open).toHaveBeenCalled();
//       expect(window.open).toHaveBeenCalledWith(shareUrlLink, defaultConfig.windowName, mockWindowParams);
//     });

//     it('should share an article through twitter', () => {
//       const mockWindowParams = `width=${defaultConfig.width},height=${defaultConfig.height},resizable=no`;
//       mockPlatform = 'twitter';
//       const shareUrlLink = `${fbsShareInstance.sharingMap[mockPlatform]}${encodeURIComponent(mockArticle.uri)}&text=${mockArticle.title} via @forbes`;

//       spyOn(window, 'open').and.callThrough();
//       fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);
//       expect(window.open).toHaveBeenCalled();
//       expect(window.open).toHaveBeenCalledWith(shareUrlLink, defaultConfig.windowName, mockWindowParams);
//     });

//     it('should share an article through linkedin', () => {
//       const mockWindowParams = `width=${defaultConfig.width},height=${defaultConfig.height},resizable=no`;
//       const shareUrlLink = `${fbsShareInstance.sharingMap.linkedin}${encodeURIComponent(mockArticle.uri)}&title=${encodeURIComponent(mockArticle.title)}&summary=${encodeURIComponent(mockArticle.description || mockArticle.title || '')}`;

//       mockPlatform = 'linkedin';
//       spyOn(window, 'open').and.callThrough();
//       fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);
//       expect(window.open).toHaveBeenCalled();
//       expect(window.open).toHaveBeenCalledWith(shareUrlLink, defaultConfig.windowName, mockWindowParams);
//     });

//     it('should share an article through default email client', () => {
//       const subject = `${mockArticle.title} - Forbes`;
//       const emailBody = `
// Hi,

// I thought you'd like this:
// ${mockArticle.uri}

// ${subject}
// `;
//       const shareUrlLink = `${fbsShareInstance.sharingMap.email}subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

//       mockPlatform = 'email';
//       spyOn(window, 'open').and.stub();
//       fbsShareInstance.shareArticleOnSocial(mockEvent, mockPlatform, mockArticle, mockOpts);
//       expect(window.open).not.toHaveBeenCalled();
//       expect(fbsShareInstance.openMessageClient).toHaveBeenCalled();
//       expect(fbsShareInstance.openMessageClient.calls.allArgs()[0]).toEqual([
//         shareUrlLink,
//       ]);
//     });
//   });

//   describe('configureSocialLink', () => {
//     let mockArticle;

//     beforeEach(() => {
//       mockArticle = {
//         title: 'Something Noteworthy',
//         description: 'super descriptive description',
//         uri: 'www.some-awesome-article.com',
//       };
//     });

//     it('should try to format the article title', () => {
//       const mockPlatform = 'facebook';
//       const fbsShareInstance = new FbsSharingService();
//       spyOn(fbsShareInstance, 'getTitle').and.callThrough();
//       fbsShareInstance.configureSocialLink(mockPlatform, mockArticle);
//       expect(fbsShareInstance.getTitle).toHaveBeenCalled();
//     });

//     it('should format the sharing link if the article has a uri property', () => {
//       const mockPlatform = 'facebook';
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.configureSocialLink(mockPlatform, mockArticle);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.facebook}${encodeURIComponent(mockArticle.uri)}`);
//     });

//     it('should format the sharing link if the article has a url property', () => {
//       const mockArticleWithUrl = {
//         title: 'Something Noteworthy',
//         description: 'super descriptive description',
//         url: 'www.some-awesome-article.com',
//       }
//       const mockPlatform = 'facebook';
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.configureSocialLink(mockPlatform, mockArticleWithUrl);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.facebook}${encodeURIComponent(mockArticle.uri)}`);

//     });
//     it('should format the sharing link for twitter', () => {
//       const mockPlatform = 'twitter';
//       const fbsShareInstance = new FbsSharingService();
//       spyOn(fbsShareInstance, 'formatTwitterLink').and.callThrough();
//       const result = fbsShareInstance.configureSocialLink(mockPlatform, mockArticle);
//       expect(fbsShareInstance.formatTwitterLink).toHaveBeenCalled();
//       expect(result).toEqual(`${fbsShareInstance.formatTwitterLink(mockArticle.title, mockArticle.uri)}`);
//     });

//     it('should format the sharing link for default email client', () => {
//       const mockPlatform = 'email';
//       const fbsShareInstance = new FbsSharingService();
//       spyOn(fbsShareInstance, 'formatEmailLink').and.callThrough();
//       const result = fbsShareInstance.configureSocialLink(mockPlatform, mockArticle);
//       expect(fbsShareInstance.formatEmailLink).toHaveBeenCalled();
//       expect(result).toEqual(`${fbsShareInstance.formatEmailLink(mockArticle.title, mockArticle.uri)}`);
//     });

//     it('should format the sharing link for default sms client', () => {
//       const mockPlatform = 'sms';
//       const fbsShareInstance = new FbsSharingService();
//       spyOn(fbsShareInstance, 'formatSMSLink').and.callThrough();
//       const result = fbsShareInstance.configureSocialLink(mockPlatform, mockArticle);
//       expect(fbsShareInstance.formatSMSLink).toHaveBeenCalled();
//       expect(result).toEqual(`${fbsShareInstance.formatSMSLink(mockArticle.title, mockArticle.uri)}`);
//     });

//     it('should format the sharing link for facebook', () => {
//       const mockPlatform = 'facebook';
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.configureSocialLink(mockPlatform, mockArticle);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.facebook}${encodeURIComponent(mockArticle.uri)}`);
//     });

//     it('should format the sharing link for linkedin', () => {
//       const mockPlatform = 'linkedin';
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.configureSocialLink(mockPlatform, mockArticle);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.linkedin}${encodeURIComponent(mockArticle.uri)}&title=${encodeURIComponent(mockArticle.title)}&summary=${encodeURIComponent(mockArticle.description)}`);
//     });

//     it('should format the sharing link for google', () => {
//       const mockPlatform = 'google';
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.configureSocialLink(mockPlatform, mockArticle);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.google}${encodeURIComponent(mockArticle.uri)}`);
//     });
//   });

//   describe('formatTwitterLink', () => {
//     let mockArticleTitle;
//     let mockArticleUri;

//     beforeEach(() => {
//       mockArticleTitle = 'Fake News';
//       mockArticleUri = 'www.some-awesome-article.com';
//     });

//     it('should format the sharing link for twitter', () => {
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.formatTwitterLink(mockArticleTitle, mockArticleUri);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.twitter}${encodeURIComponent(mockArticleUri)}&text=${mockArticleTitle} via @forbes`);
//     });

//     it('should reduce the title to 104 characters', () => {
//       const fbsShareInstance = new FbsSharingService();
//       mockArticleTitle = 'somethingtorepeat'.repeat(20);
//       const result = fbsShareInstance.formatTwitterLink(mockArticleTitle, mockArticleUri);
//       const charactersBeforeTitle = result.length - 116;
//       expect(result.substring(charactersBeforeTitle)).toEqual(`${mockArticleTitle.substring(0, 101)}... via @forbes`);
//     });
//   });

//   describe('formatEmailLink', () => {
//     it('should format the link to be shared on default email client', () => {
//       const mockArticle = {
//         title: 'Something to Share',
//         uri: 'www.some-awesome-article.com',
//       };
//       // the indent need to match the ones that are in the code or else
//       // the resulting link will not pass the unit tests.
//       const mockEmailBody = `
// Hi,

// I thought you'd like this:
// ${mockArticle.uri}

// ${mockArticle.title} - Forbes
// `;
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.formatEmailLink(mockArticle.title, mockArticle.uri);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.email}subject=${encodeURIComponent(`${mockArticle.title} - Forbes`)}&body=${encodeURIComponent(mockEmailBody)}`);
//     });
//   });

//   describe('formatSMSLink', () => {
//     it('should format the link to be shared on an iphone through sms', () => {
//       const mockArticle = {
//         title: 'Something to Share',
//         uri: 'www.some-awesome-article.com',
//       };
//       // rewrite the user agent for the sake of testing
//       navigator.__defineGetter__('userAgent', function() {
//         return 'iphone';
//       });
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.formatSMSLink(mockArticle.title, mockArticle.uri);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.sms}&body=${encodeURIComponent(mockArticle.title)} ${encodeURIComponent(mockArticle.uri)}`);
//     });
//     it('should format the link to be shared on an ipad through sms', () => {
//       const mockArticle = {
//         title: 'Something to Share',
//         uri: 'www.some-awesome-article.com',
//       };
//       navigator.__defineGetter__('userAgent', function() {
//         return 'ipad';
//       });
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.formatSMSLink(mockArticle.title, mockArticle.uri);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.sms}&body=${encodeURIComponent(mockArticle.title)} ${encodeURIComponent(mockArticle.uri)}`);
//     });
//     it('should format the link to be shared on an android device through sms', () => {
//       const mockArticle = {
//         title: 'Something to Share',
//         uri: 'www.some-awesome-article.com',
//       };
//       navigator.__defineGetter__('userAgent', function() {
//         return 'android';
//       });
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.formatSMSLink(mockArticle.title, mockArticle.uri);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.sms}?body=${encodeURIComponent(mockArticle.title)} ${encodeURIComponent(mockArticle.uri)}`);
//     });
//   });

//   describe('formatLinkedinLink', () => {
//     it('should format the link for linkedin', () => {
//       const mockArticle = {
//         title: 'Something To Share',
//         uri: 'www.some-awesome-article.com',
//         description: 'the article description',
//       };
//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.formatLinkedinLink(mockArticle.title, mockArticle.uri, mockArticle.description);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.linkedin}${encodeURIComponent(mockArticle.uri)}&title=${encodeURIComponent(mockArticle.title)}&summary=${encodeURIComponent(mockArticle.description)}`);
//     });
//     it('should place the title in the summary if there is no description', () => {
//       const mockArticle = {
//         title: 'Something to Share',
//         uri: 'www.some-awesome-article.com',
//         description: '',
//       };

//       const fbsShareInstance = new FbsSharingService();
//       const result = fbsShareInstance.formatLinkedinLink(mockArticle.title, mockArticle.uri, mockArticle.description);
//       expect(result).toEqual(`${fbsShareInstance.sharingMap.linkedin}${encodeURIComponent(mockArticle.uri)}&title=${encodeURIComponent(mockArticle.title)}&summary=${encodeURIComponent(mockArticle.title)}`);
//     });
//   });
//   describe('getTitle', () => {
//     let fbsShareInstance;
//     let mockArticle;

//     beforeEach(() => {
//       mockArticle = {
//         title: 'Something to Share',
//       };
//       fbsShareInstance = new FbsSharingService();
//     });

//     it('should just return the title of blog type is not an ad or author', () => {
//       const result = fbsShareInstance.getTitle(mockArticle);
//       expect(result).toEqual(mockArticle.title);
//     });

//     it('should prepend ForbesBook AuthorVoice: if blogtype is author', () => {
//       mockArticle.blogType = 'author';
//       const result = fbsShareInstance.getTitle(mockArticle);
//       expect(result).toEqual(`ForbesBook AuthorVoice: ${mockArticle.title}`)
//     });

//     it('should prepend Forbes Insights: if blogtype is insights', () => {
//       mockArticle.blogType = 'insights';
//       const result = fbsShareInstance.getTitle(mockArticle);
//       expect(result).toEqual(`Forbes Insights: ${mockArticle.title}`);
//     });

//     it('should prepend the correct slug if blogtype is ad', () => {
//       mockArticle.blogType = 'ad';
//       mockArticle.slug = 'Brand';
//       const result = fbsShareInstance.getTitle(mockArticle);
//       expect(result).toEqual(`${mockArticle.slug}Voice: ${mockArticle.title}`)
//     });
//   });

//   describe('mapShareToClick', () => {
//     it('should map over an array of object and add an event listener to each of them', () => {
//       const div1 = document.createElement('div');
//       const div2 = document.createElement('div');
//       const div3 = document.createElement('div');
//       const div4 = document.createElement('div');
//       const div5 = document.createElement('div');

//       const mockElements = [
//         { element: div1, platform: 'facebook' },
//         { element: div2, platform: 'google' },
//         { element: div3, platform: 'twitter' },
//         { element: div4, platform: 'linkedin' },
//         { element: div5, platform: 'email' },
//       ];

//       const mockOpts = {
//         width: defaultConfig.width,
//         height: defaultConfig.height,
//         isResizable: defaultConfig.isResizable,
//         windowName: defaultConfig.windowName,
//       };

//       const mockArticle = {
//         title: 'EpsonVoice: The Anatomy Of An Efficient Mobile Office',
//         uri: 'www.some-mock-article.com',
//         description: 'say hello to my random description',
//       };

//       const fbsShareInstance = new FbsSharingService();
//       spyOn(fbsShareInstance, 'shareArticleOnSocial');

//       spyOn(div1, 'addEventListener');
//       spyOn(div2, 'addEventListener');
//       spyOn(div3, 'addEventListener');
//       spyOn(div4, 'addEventListener');
//       spyOn(div5, 'addEventListener');


//       fbsShareInstance.mapShareToClick(
//         mockElements,
//         mockArticle,
//         mockOpts,
//       );

//       expect(div1.addEventListener).toHaveBeenCalled();
//       expect(div2.addEventListener).toHaveBeenCalled();
//       expect(div3.addEventListener).toHaveBeenCalled();
//       expect(div4.addEventListener).toHaveBeenCalled();
//       expect(div5.addEventListener).toHaveBeenCalled();
//     });

//     it('should map over an array of object and add an event listener to each of them with default arguments', () => {
//       const div1 = document.createElement('div');
//       const div2 = document.createElement('div');
//       const div3 = document.createElement('div');
//       const div4 = document.createElement('div');
//       const div5 = document.createElement('div');

//       const mockElements = [
//         { element: div1, platform: 'facebook' },
//         { element: div2, platform: 'google' },
//         { element: div3, platform: 'twitter' },
//         { element: div4, platform: 'linkedin' },
//         { element: div5, platform: 'email' },
//       ];

//       const mockArticle = {
//         title: 'EpsonVoice: The Anatomy Of An Efficient Mobile Office',
//         uri: 'www.some-mock-article.com',
//         description: 'say hello to my random description',
//       };

//       const fbsShareInstance = new FbsSharingService();
//       spyOn(fbsShareInstance, 'shareArticleOnSocial');

//       spyOn(div1, 'addEventListener');
//       spyOn(div2, 'addEventListener');
//       spyOn(div3, 'addEventListener');
//       spyOn(div4, 'addEventListener');
//       spyOn(div5, 'addEventListener');


//       fbsShareInstance.mapShareToClick(mockElements, mockArticle);

//       expect(div1.addEventListener).toHaveBeenCalled();
//       expect(div2.addEventListener).toHaveBeenCalled();
//       expect(div3.addEventListener).toHaveBeenCalled();
//       expect(div4.addEventListener).toHaveBeenCalled();
//       expect(div5.addEventListener).toHaveBeenCalled();
//     });
//   });

//   describe('openMessageClient', () => {
//     let fbsShareInstance;

//     beforeEach(() => {
//       fbsShareInstance = new FbsSharingService();
//     });

//     it('should do nothing if there is no link given', () => {
//       const result = fbsShareInstance.openMessageClient();
//       expect(result).toEqual(undefined);
//     });
//   });
// });
