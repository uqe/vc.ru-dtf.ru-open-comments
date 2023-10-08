// ==UserScript==
// @name         Script for open comments on sites vc.ru, dtf.ru
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Open all comments
// @author       Arthur N
// @match        *://dtf.ru/*
// @match        *://vc.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  console.log("start");

  let previousTitle = document.title;
  let currentTitle = document.title;

  let isLinkToComment = Boolean(document.querySelector(".comments__link_to_all"));

  const showAllComments = () =>
    setTimeout(() => {
      const showCommentsButton = document.querySelector(".comments__show-all");
      if (showCommentsButton) {
        showCommentsButton.click();
        console.log("clicked");
      }
    }, 3000);

  const observer = new MutationObserver(function (mutations) {
    if (document.title !== currentTitle) {
      previousTitle = currentTitle;
      currentTitle = document.title;
      isLinkToComment = Boolean(document.querySelector(".comments__link_to_all"));

      if (!isLinkToComment) {
        showAllComments();
      }
    }
  });

  const config = { subtree: true, childList: true };
  observer.observe(document, config);

  window.addEventListener("beforeunload", function (event) {
    observer.disconnect();
  });

  if (isLinkToComment) {
    return;
  }

  if (previousTitle === currentTitle) {
    showAllComments();
  }
})();
