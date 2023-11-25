// ==UserScript==
// @name         EasyCSDN
// @description  这是一款提高CSDN简洁度的插件。它可以让你的CSDN学习之路变得简洁、专注、高效、畅快。主要功能是净化页面，净化99%多余元素，只展示文章正文和关联文章。
// @version      9.1
// @author       xcanwin
// @namespace    https://github.com/xcanwin/EasyCSDN/
// @supportURL   https://github.com/xcanwin/EasyCSDN/
// @updateURL    https://greasyfork.org/scripts/480668-easycsdn/code/EasyCSDN.user.js
// @downloadURL  https://greasyfork.org/scripts/480668-easycsdn/code/EasyCSDN.user.js
// @license      GPL-2.0-only
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://*.blog.csdn.net/article/details/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    /*电脑端*/
    GM_addStyle(`
.passport-login-container /*隐藏登录提示*/,
.passport-login-tip-container /*隐藏登录权益提示*/,
body>#toolbarBox /*隐藏顶部*/,
.blog_container_aside /*隐藏左边栏*/,
#rightAside /*隐藏右边栏*/,
.csdn-side-toolbar /*隐藏右边栏-磁吸*/,
.blog-footer-bottom /*隐藏底部*/,
.recommend-nps-box /*隐藏打分*/,
.left-toolbox /*隐藏关注*/,
.blog-tags-box /*隐藏开头的专栏收录*/,
#blogColumnPayAdvert /*隐藏结尾的专栏收录*/,
#treeSkill /*隐藏技能树*/,
code .hljs-button /*隐藏复制提示*/,
.article-search-tip /*隐藏正文搜索提示*/
{
    display: none !important;
}

/*隐藏背景*/
body {
    background: none !important;
    background-image: unset !important;
    background-color: #ffebeb !important;
}

/*正文居中*/
#mainBox {
    display: flex;
    justify-content: center;
}

/*展示全屏*/
#mainBox, #mainBox main {
    width: 100%;
    margin-bottom: unset !important;
}
.main_father {
    padding: unset !important;
}
.main_father.d-flex {
    display: unset !important;
}

/*展示分界线*/
main #toolBarBox {
    margin-bottom: 64px !important;
}
`);

    /*移动端*/
    GM_addStyle(`
#csdn-toolbar /*隐藏顶部*/,
#operate /*隐藏底部评论和搜索提示*/,
.aside-header-fixed /*隐藏关注*/
{
    display: none !important;
}

/*展示全屏*/
body #main {
    padding-top: unset !important;
    margin-top: unset !important;
}
body {
    padding-bottom: unset !important;
}

/*展示分界线*/
.spec_space {
    background-color: #ffebeb !important;
    height: 32px !important;
}

`);

})();
