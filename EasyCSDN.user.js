// ==UserScript==
// @name         EasyCSDN
// @description  简洁、专注、高效的CSDN，清理99%多余的元素，只展示文章正文和关联文章
// @version      2.0
// @author       xcanwin
// @namespace    https://github.com/xcanwin/EasyCSDN/
// @supportURL   https://github.com/xcanwin/EasyCSDN/
// @updateURL    https://greasyfork.org/scripts/480668-easycsdn/code/EasyCSDN.user.js
// @downloadURL  https://greasyfork.org/scripts/480668-easycsdn/code/EasyCSDN.user.js
// @license      GPL-2.0-only
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://bbs.csdn.net/topics/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
.passport-login-container, /*隐藏登录提示*/
.passport-login-tip-container, /*隐藏登录权益提示*/
#toolbarBox, /*隐藏顶部*/
.blog_container_aside, /*隐藏左边栏*/
#rightAside, /*隐藏右边栏*/
.csdn-side-toolbar, /*隐藏右边栏-磁吸*/
.blog-footer-bottom, /*隐藏底部*/
.recommend-nps-box, /*隐藏打分*/
.left-toolbox /*隐藏关注*/
{
    display: none !important;
}

/*隐藏背景*/
body {
    background: none !important;
    background-image: unset !important;
    background-color: #f5f6f7 !important;
}

/*正文居中*/
#mainBox {
    display: flex;
    justify-content: center;
}

/*展示全屏*/
#mainBox, #mainBox main {
    width: 100%;
}
.main_father.d-flex {
    display: unset !important;
}
`);

})();
