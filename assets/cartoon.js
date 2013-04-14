function Cartoon() {
  this.wordCount = 500;
  this.postInsertCount = 200; // Number of words we need after cartoon.
  this.words = "";
  this.issueDate = "";
  this.cartoonUrl = "http://contest.newyorker.com/randomcartoon/randomcartoon.aspx?callback=cartoon.displayCartoon";
  this.disableFlag = false;


  // Section excludes.
  this.excludes = new Array();
  this.excludes[0] = "/fiction/poetry";
  this.excludes[1] = "/arts/reviews";
  this.excludes[2] = "/arts/events";
  this.excludes[3] = "/humor/newsbreaks";
  this.excludes[4] = "/services/presscenter";
  this.excludes[5] = "/contact";

}

Cartoon.prototype.execludeSection = function() {
  var path = location.pathname;

  for (var i=0; i<this.excludes.length; i++) {
    if (path.search(this.excludes[i]) != -1) {
      return true;
    }

  }
}
Cartoon.prototype.disable = function() {

}

Cartoon.prototype.suppress = function() {
  this.disableFlag = true;
}

Cartoon.prototype.createCartoonLinks = function (obj) {
  var links = document.createElement("ul");
  var cLink = new Array();
  cLink[0] = document.createElement("li");
  cLink[0].innerHTML = "<a href=\"/humor/issuecartoons\">from the issue</a>";
  cLink[0].className = "first";
  cLink[1] = document.createElement("li");
  cLink[1].innerHTML = "<a href=\"" + obj.cartoon.productUrl + "\" target=\"_new\">cartoon bank</a>";
  cLink[2] = document.createElement("li");
  cLink[2].innerHTML = "<a onclick=\"cartoon.setEmailOverride();\" href=\"/contact/emailFriend?referringPage=" + encodeURIComponent(obj.cartoon.productUrl) + "\">e-mail this</a>";
  for (var i=0; i<cLink.length; i++) {
    links.appendChild(cLink[i]);
  }
  return links;
}

Cartoon.prototype.countWords = function(divId) {
  var wc = 0;
  this.traverse(divId);
  var w_a = this.words.match(/\b\w+\b/g);
  if (w_a != null) { wc = w_a.length;}
  return wc;
}

Cartoon.prototype.setIssueDate = function (date) {
  this.issueDate = date;
}


Cartoon.prototype.traverse = function (node) {
  if (node.nodeType == 3) { this.words += node.nodeValue; }

     if (node.childNodes != null) {
     for ( var i=0; i < node.childNodes.length; i++) {
       this.traverse(node.childNodes.item(i));
     }
  }
}
Cartoon.prototype.insertCartoon = function (cartoonObj, divId) {
  // Locate the div to place the cartoon.

//  var cartoonLink = document.getElementById("cartoonLink");
 // cartoonLink.href = cartoonObj.cartoon.productUrl;

  if (document.getElementById(divId) == null) { return false; }
  var wCounter=0;
  var cartoonDiv = document.createElement("div");
  var insertBeforeNode;
  cartoonDiv.className = "cartoon";

  var cartoonAnchor = document.createElement("a");
//  cartoonObj.cartoon.productUrl = cartoonObj.cartoon.productUrl.replace(/(\?)/,"/$1").replace(/(content=TNY)a/,'$1A');
  cartoonObj.cartoon.productUrl = "http://www.condenaststore.com/-se/cartoonbank.htm?utm_medium=referral&utm_source=NewYorker&utm_content=Articles&AID=1247905545";
  cartoonAnchor.href = cartoonObj.cartoon.productUrl;
  cartoonAnchor.target = "_blank";

  var cartoonNode = document.createElement("div");

  var cartoonImg = document.createElement("img");
  cartoonImg.style.width = "300px";
  cartoonImg.style.width = "300px";
  cartoonImg.src = cartoonObj.cartoon.imagePath;

  cartoonAnchor.appendChild(cartoonImg);
  cartoonNode.appendChild(cartoonAnchor);
  cartoonDiv.appendChild(cartoonNode);
  cartoonDiv.appendChild(this.createCartoonLinks(cartoonObj));


  // Find the P node after x amount of words.
  var startingNode = document.getElementById(divId);
  var children =  startingNode.childNodes;

  var insertCartoon = false;
  var postInsertCount = 0;
  var insertCount = 0;

  // Loop through the nodes.
  // Look for nodes of type 1 (html).
  for (var i = 0; i<children.length; i++) {
    if (children[i].nodeType==1) {
      if (children[i].nodeName == "P" || children[i].nodeName == "SPAN") {
        wCounter = this.countWords(children[i]);
      }


      if (wCounter >= this.wordCount && insertCartoon == false) {
        insertBeforeNode = children[i+1];
        insertCartoon = true;
        insertCount = wCounter;
      } else if (insertCartoon) {
        postInsertCount = wCounter - insertCount;

      }
    }
  }

  if (postInsertCount >= this.postInsertCount) {
    startingNode.insertBefore(cartoonDiv, insertBeforeNode);
  }

}

Cartoon.prototype.displayCartoon = function(obj) {
  this.insertCartoon(obj, "articletext");
  }

Cartoon.prototype.loadCartoon = function() {
  if (this.disableFlag || this.execludeSection()) { return false; }
  var url = this.cartoonUrl + "&issueDate="+this.issueDate;
  jQuery.getScript(url);

}

Cartoon.prototype.setEmailOverride = function() {
  var emailCookie = new Cookie("sessionDataHolder");
  emailCookie.emailOverrideUrl = location.href;
  emailCookie.store();
}
var cartoon = new Cartoon();

function loadCartoon() {
  // Wrapper for the cartoon obj. Needed to keep cartoon in proper scope.
  cartoon.loadCartoon();
  }
jQuery(window).bind("load", function(){ loadCartoon(); });

