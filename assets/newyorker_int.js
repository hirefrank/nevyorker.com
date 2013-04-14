
return;
   
(func = function () {

    /* Number of days before the cookie expires and the survey box will be shown again. */
    var cookieExpiry = 365;

    /* The name of the cookie that we will use to check if somebody has already seen the box */
    var cookieName = 'SVDSMSI2';
    var maxVisit = 6;
    /* The name of the cookie used to track the number of intercepts shown */
    var cookieHitCount = 'SVDSMSI3';
    /* The name of the cookie used to determine when to show again */
    var cookieVisitWindow = 'SVDSMSI4';
    //check to see if visited in last x minutes

    var checkWindow = readCookie(cookieVisitWindow);
    if (!checkWindow) {
        createVisitWindowCookie(480);
    }
    else {
        return;
    }


    //If number of visits exceed count max then don't show intercept
    var checkVisitCount = readCookie(cookieHitCount);

    if (!checkVisitCount) {
        createCookie(cookieHitCount, 1);
    }
    else {
        if (checkVisitCount >= maxVisit)
            return;
        else {
            eraseCookie(cookieHitCount);
            checkVisitCount++;
            createCookie(cookieHitCount, checkVisitCount);
        }

    }

    /* where are the images */
    var imageURL = "http://survey.eqr1.com/assets/T05003/";

    /* The prefix for our stylesheet rules, to make sure we don't affect the host page's style. */
    var stylePrefix = 'SVDS-';


    /* Content to put in the box */
    var boxContent = "<a href=\"#\" title=\"Close Window\" class=\"" + stylePrefix + "behaviour-continue\" style=\"float:right\"><img  src=\"" + imageURL + "close.gif\" alt=\"Close Window\" \/><\/a>\n<a href=\"\" title=\"Act Now\" class=\"" + stylePrefix + "eqrbutton " + stylePrefix + "behaviour-open\"><span>Act Now<\/span><\/a>";

    /* Use an overlay or not */
    var overlay = false;

    /* Specify the direction to slide in, or false for no sliding */
    var slideTo = 'up';

    /* Specify the url to go to when ok is clicked */
    var fullUrl = 'http://www.surveywriter.net/in/survey/survey931/T05452.asp?data=5~~src~1';

    /* Takeover the current window. If false, opens in a new window */
    var takeover = false;

    /* Let the new window be resized */
    var newResizeable = true;

    /* Give the new window toolbars */
    var newToolbar = false;

    /* Give the new window menubars */
    var newMenubar = false;

    /* Give the new window a status bar */
    var newStatus = false;

    /* Give the new window direcetories */
    var newDirectories = false;

    var dg;

    dialogStyle =
'.' + stylePrefix + 'dialog-overlay { background-color: #F0F0F0; opacity: 0.5; filter: alpha(opacity=50); position: fixed; height: 100%; width: 100%; left: 0; z-index: 2147483646 !important; }' +
'.' + stylePrefix + 'dialog { position: relative; z-index: 2147483647 !important; } ' +

'.' + stylePrefix + 'dialog-content {border: 1px solid #555555;width: 350px; height: 250px; background-image: url(' + imageURL + 'bg.jpg); background-repeat: no-repeat; margin: 0; padding: 0;} ' +
'.' + stylePrefix + 'eqrbutton {float: right; width: 135px; height: 55px; margin-top:150px;margin-right:85px;background-repeat: no-repeat;}' +
'.' + stylePrefix + 'eqrbutton:hover {background-position: bottom left;}' +
'.' + stylePrefix + 'eqrbutton span {display: none;}' +
'iframe.' + stylePrefix + 'iefix {	display: none; display/**/: block; position: absolute; top: 0; left: 0; z-index: -1; filter:mask(); }';

    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    // browser detection (based on prototype.js)
    if (!!(window.attachEvent && !window.opera)) {
        styleNode.styleSheet.cssText = dialogStyle;
    } else {
        var styleText = document.createTextNode(dialogStyle);
        styleNode.appendChild(styleText);
    }
    document.getElementsByTagName('head')[0].appendChild(styleNode);

    /**
    * Modal dialog box based on code from:
    * http://code.google.com/p/javascript-simple-dialog/ *
    */

    /* Utility functions */
    function bindEventHandler(element, eventName, handler) {
        if (element.addEventListener) {
            // The standard way
            element.addEventListener(eventName, handler, false);
        } else if (element.attachEvent) {
            // The Microsoft way
            element.attachEvent('on' + eventName, handler);
        }
    }

    function setClass(element, className) {
        element.className = stylePrefix + className;
    }

    function pageWidth() {
        return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : 0;
    }
    function pageHeight() {
        return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : 0;
    }

    function getWindowWidth() {
        return window.innerWidth != null ? window.innerWidth : document.body.clientWidth != null ? document.body.clientWidth : document.documentElement && document.documentElement.clientWidth != null ? document.documentElement.clientWidth : 'undefined';
    }
    function getWindowHeight() {
        return window.innerHeight != null ? window.innerHeight : document.body.clientHeight != null ? document.body.clientHeight : document.documentElement && document.documentElement.clientHeight != null ? document.documentElement.clientHeight : 'undefined';
    }

    function getComputedHeight(el) {
        if (!document.defaultView || !document.defaultView.getComputedStyle) {
            return el.offsetHeight;
        } else {
            return parseInt(document.defaultView.getComputedStyle(el, "").getPropertyValue("height"))
        }
    }

    function createVisitWindowCookie(numMinutes) {
        var date = new Date();
        date.setTime(date.getTime() + (1000 * 60 * numMinutes));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = cookieVisitWindow + "=noshow" + expires + "; path=/";
    }

    // Based on scripts from quirksmode.org
    function createCookie(name, value) {
        var date = new Date();
        date.setTime(date.getTime() + (cookieExpiry * 86400000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }
    /**
    * The modal dialog class
    * @constructor
    */
    function Dialog(options) {

        this.options = {
            width: 400,
            top: 5000,
            modal: false,
            openOnCreate: true,
            destroyOnClose: true,
            escHandler: this.close,
            slide: 'none',
            slideTime: 1500,
            animationTick: 20///,
            ///closebutton: false,
            ///title: '',
            //joe out buttons: {'OK': this.close}
        };
        // Overwrite the default options
        for (var option in options) {
            this.options[option] = options[option];
        }
        dg = this;
        // Create dialog dom
        this._makeNodes();
        if (this.options.openOnCreate) {
            this.open();
        }
    }

    Dialog.prototype = {
        /* handles to the dom nodes */
        container: null,
        ///header: null,
        ///body: null,
        content: null,
        ///actions: null,
        _overlay: null,
        _wrapper: null,
        _zIndex: 0,
        _escHandler: null,

        /**
        * Shows the dialog
        */
        open: function () {
            this._makeTop();

            if (this.options.modal) {
                this._overlay.style.display = 'block';
            }

            this.finalLeft = parseInt((pageWidth() - this.options.width) / 2);

            this.currentLeft = this.finalLeft;

            this.currentTop = this.finalTop;

            var ws = this._wrapper.style;

            //ws.display = 'block';

            var boxHeight = getComputedHeight(this._wrapper);




            //ws.left = this.currentLeft + 'px';
            ws.left = "-500px";
            //alert(this.currentTop);
            //  ws.top = getWindowHeight() + 'px';
            ws.top = '10px';

            this._wrapper.focus();
            var t = setTimeout(function () { dg.close() }, 30000)

        },

        /**
        * Closes the dialog
        */
        close: function () {
            if (this.options.destroyOnClose) {
                this._destroy();
            } else {
                if (this.options.modal)
                    this._overlay.style.display = 'none';
                this._wrapper.style.display = 'none';
            }
        },

        /**
        * Open the survey up in a new window
        */
        openSurvey: function () {
            this.close();
            createCookie(cookieName, 'seen');
            if (takeover) {
                window.location = fullUrl;
            } else {
                var windowOptions = 'scrollbars=1,location=1' +
',  resizable=' + (newResizeable ? '1' : '0') +
',  toolbar=' + (newToolbar ? '1' : '0') +
',  menubar=' + (newMenubar ? '1' : '0') +
',  status=' + (newStatus ? '1' : '0') +
',  directories' + (newDirectories ? '1' : '0');

                var survey = window.open(fullUrl, '', windowOptions);

                // Need to check if the window exists or was blocked by a popup blocker
                if (survey) {
                    window.blur();
                    survey.focus();
                }
                //window.location = this.options.link;
            }

            return false;
        },

        /**
        * Continue to the next link unharmed
        */
        cont: function () {
            this.close();
            window.location = this.options.link;

            return false;
        },



        _makeNodes: function () {
            if (this._overlay || this._wrapper) {
                return; // Avoid duplicate invocation
            }

            // Make overlay
            if (this.options.modal) {
                this._overlay = document.createElement('div');
                setClass(this._overlay, 'dialog-overlay');
                document.body.appendChild(this._overlay);
            }


            // {begin dialog body
            var content = document.createElement('div');
            setClass(content, 'dialog-content');
            content.innerHTML = this.options.content;
            this.content = content;

            var actions = content.getElementsByTagName('a');
            for (var i = 0, ii = actions.length; i != ii; i++) {
                if (actions[i].className.match(new RegExp(stylePrefix + 'behaviour-continue'))) {
                    actions[i].onclick = this._makeHandler(this.close, this);
                } else if (actions[i].className.match(new RegExp(stylePrefix + 'behaviour-open'))) {
                    actions[i].onclick = this._makeHandler(this.openSurvey, this);
                }
            }



            var container = document.createElement('div');
            setClass(container, 'dialog');
            ///if (this.header) {
            ///	container.appendChild(header);
            ///}
            container.appendChild(content); ///container.appendChild(body);
            this.container = container;

            var wrapper = document.createElement('div');
            var ws = wrapper.style;
            wrapper.id = "eqrintz";
            ws.position = 'absolute';
            ws.overflow = 'hidden';
            ws.width = this.options.width + 'px';
            //ws.display = 'none';
            ws.outline = 'none';
            wrapper.appendChild(container);
            // register keydown event
            if (this.options.escHandler) {
                wrapper.tabIndex = -1;
                this._onKeydown = this._makeHandler(function (e) {
                    if (!e) {
                        e = window.event;
                    }
                    if (e.keyCode && e.keyCode == 27) {
                        this.options.escHandler.apply(this);
                    }
                }, this);
                bindEventHandler(wrapper, 'keydown', this._onKeydown);
            }
            this._wrapper = document.body.appendChild(wrapper);

            if (Dialog.needIEFix) {
                this._fixIE();
            }
        },

        /**
        * Removes the nodes from document
        * @param {object} buttons Object with property name as button text and value as click handler
        * @return {Array} Array of buttons as dom nodes
        */
        ///	_makeButtons: function(buttons) {
        ///		var buttonArray = new Array();
        //joeout		for (var buttonText in buttons) {
        //joeout			var button = document.createElement('button');
        //joeout			setClass(button, 'dialog-button');
        //joeout			button.innerHTML = buttonText;
        //joeout
        //joeout			bindEventHandler(button, 'click', this._makeHandler(buttons[buttonText], this));
        //joeout
        //joeout			buttonArray.push(button);
        //joeout		}
        ///		return buttonArray;
        ///	},

        /** A helper function to bind events to this class */
        _makeHandler: function (method, obj) {
            return function (e) {
                return method.call(obj, e);
            }
        },

        /** A helper function used by open */
        _makeTop: function () {
            if (this._zIndex < Dialog.Manager.currentZIndex) {
                if (this.options.modal)
                    this._overlay.style.zIndex = Dialog.Manager.newZIndex();
                this._zIndex = this._wrapper.style.zIndex = Dialog.Manager.newZIndex();
            }
        },

        _fixIE: function () {
            var width = document.documentElement["scrollWidth"] + 'px';
            var height = document.documentElement["scrollHeight"] + 'px';

            if (this.options.modal) {
                var os = this._overlay.style;
                os.position = 'absolute';
                os.width = width;
                os.height = height;
            }

            var iframe = document.createElement('iframe');
            setClass(iframe, 'iefix');
            iframe.style.width = width;
            iframe.style.height = height;
            this._wrapper.appendChild(iframe);
        },


        /**
        * Removes the nodes from document
        */
        _destroy: function () {
            document.body.removeChild(this._wrapper);
            if (this.options.modal)
                document.body.removeChild(this._overlay);
            this.container = null;
            ///this.header = null;
            ///this.closebutton = null;
            ///this.clear = null;
            ///this.body = null;
            this.content = null;
            ///this.actions = null;
            this._overlay = null;
            this._wrapper = null;
        }
    };

    Dialog.needIEFix = (function () {
        var userAgent = navigator.userAgent.toLowerCase();
        return /msie/.test(userAgent) && !/opera/.test(userAgent) && !window.XMLHttpRequest;
    })();

    /** This simple object manages the z indices */
    Dialog.Manager = {
        currentZIndex: 2147483644,
        newZIndex: function () {
            return ++this.currentZIndex;
        }
    };

    var isOpen = false;
    var onLeave = function (a, oldOnClick) {
        return oldOnClick || function () {
            if (!readCookie(cookieName) && !isOpen) {
                isOpen = true;
                var dialog = new Dialog({
                    content: boxContent,
                    modal: overlay,
                    slide: slideTo,
                    link: a.href
                });
                createCookie(cookieName, 'seen');
                return false;
            }
        }
    }


    var pageHeight = pageHeight();
    if (!readCookie(cookieName) && !isOpen) {
        isOpen = true;
        var finalTop = pageHeight;
        var dialog = new Dialog({
            content: boxContent,
            modal: overlay,
            top: finalTop,
            slide: slideTo,
            link: fullUrl
        });


        var b = 0;
        var ws = dialog._wrapper.style;


        var intId = setInterval(function () {
            b += 10;
            ws.top = pageHeight - b + 'px';
            ws.left = parseInt((pageWidth() - 400) / 2) + "px";
            if (b >= 250) {
                clearInterval(intId);
            }
        }, 20);





        return false;


    }

})();


