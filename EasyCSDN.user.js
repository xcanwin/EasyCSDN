// ==UserScript==
// @name         EasyCSDN
// @description  这是一款促进CSDN极致简洁和高效的插件。免费共享大量创新功能，如：净化页面、展示全屏、显示推荐、复制文本、展开代码等。让我们的学习体验无比简洁、专注、高效、畅快。
// @version      32.0
// @author       xcanwin
// @namespace    https://github.com/xcanwin/EasyCSDN/
// @supportURL   https://github.com/xcanwin/EasyCSDN/
// @license      GPL-2.0-only
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://*.blog.csdn.net/article/details/*
// @grant        GM_addStyle
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/480668/EasyCSDN.user.js
// @updateURL https://update.greasyfork.org/scripts/480668/EasyCSDN.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const $ = (Selector, el) => (el || document).querySelector(Selector);
    const $$ = (Selector, el) => (el || document).querySelectorAll(Selector);

    /*电脑端净化样式*/
    const purify_style_pc = `
.passport-login-container /*隐藏[置顶的]登录提示*/,
.passport-login-tip-container /*隐藏[置顶的]登录权益提示*/,
body>#toolbarBox /*隐藏[置顶的][顶部的]菜单栏*/,
.left-toolbox /*隐藏[置顶的][底部的]关注栏*/,
.blog_container_aside /*隐藏[左边的]栏*/,
#rightAside /*隐藏[右边的]栏*/,
.csdn-side-toolbar /*隐藏[右边的]磁吸栏*/,
.blog-footer-bottom /*隐藏[底部的]网站介绍*/,
.recommend-nps-box /*隐藏[底部的]打分*/,
.blog-tags-box /*隐藏[正文的][顶部的]分类*/,
.column-group /*隐藏[正文的][顶部的]加入社区*/,
#blogColumnPayAdvert /*隐藏[正文的][顶部的]专栏*/,
.more-toolbox-new /*隐藏[正文的][底部的]关注栏*/,
#treeSkill /*隐藏[正文的][底部的]技能树*/,
.recommend-box /*隐藏[正文的][底部的]推荐文章*/,
.recommend-box div[data-url*="download.csdn.net"] /*隐藏[正文的][底部的]含有下载的推荐文章*/,
.recommend-box div[data-url*="wenku.csdn.net"] /*隐藏[正文的][底部的]含有文库的推荐文章*/,
.hljs-button.signin /*隐藏[正文的][代码块的]复制提示*/,
.code-annotation /*隐藏[正文的][代码块的]一键注释*/,
.article-search-tip /*隐藏[正文的]搜索提示*/
{
    display: none !important;
}

/*隐藏背景*/
html body {
    background: none !important;
    background-image: unset !important;
    background-color: unset !important;
}

/*调整标题*/
.title-article {
    display: flex !important;
    justify-content: center !important;
    font-size: 33px !important;
    padding-top:23px !important;
    padding-bottom: 10px !important;
}

/*调整头像*/
.article-type-img {
    display: none !important;
    border-radius: 4px !important;
    height: 28px !important;
    width: 28px !important;
    margin: 6px !important;
    margin-right: 20px !important;
}

/*正文的div居中*/
#mainBox {
    display: flex;
    justify-content: center;
}

/*正文的图片居中*/
#content_views p img {
    display: flex;
    margin-left: auto;
    margin-right: auto;
}

/*展示全屏*/
#mainBox {
    width: 100%;
}
#mainBox main {
    width: 82%;
    margin-bottom: unset !important;
}
.main_father {
    padding: unset !important;
}
.main_father.d-flex {
    display: unset !important;
}

/*临时显示*/
.show-temp {
    display: unset !important;
}

/*适当展示图片*/
main #content_views img {
    max-width: 70% !important;
}

/*阅读全文*/
.hide-article-box {
    display: none !important;
}
#article_content {
    height: auto !important;
    overflow: auto !important;
}
`;


    /*移动端净化样式*/
    const purify_style_mb = `
#csdn-toolbar /*隐藏[置顶的][顶部的]菜单栏*/,
#operate /*隐藏[置顶的][底部的]搜索标签与评论*/,
.article-type /*隐藏[正文的][顶部的]文章类型*/,
.have-heart-count /*隐藏[正文的][顶部的]赞*/,
.identity-icon /*隐藏[正文的][顶部的]身份等级*/,
#detailFollow /*隐藏[正文的][顶部的]关注*/,
#recommend /*隐藏[正文的][底部的]推荐文章*/,
#recommend div[data-url*="download.csdn.net"] /*隐藏[正文的][底部的]含有下载的推荐文章*/,
#recommend div[data-url*="wenku.csdn.net"] /*隐藏[正文的][底部的]含有文库的推荐文章*/
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
    height: 32px !important;
    background-color: #eaeaea !important;
}
`;

    //净化页面
    const purifyPage = function() {
        GM_addStyle(purify_style_pc);
        GM_addStyle(purify_style_mb);
    };

    //显示推荐的开关
    const showRecommend = function() {
        const sr = document.createElement("div");
        sr.style = "height: 64px; background-color: #eaeaea;";
        sr.onclick = function() {
            $$(".recommend-box").forEach(el => {
                el.classList.toggle("show-temp");
            });
            $(".recommend-box")?.scrollIntoView();
        };
        $('main').insertBefore(sr, $('.recommend-box'));
    };

    //展开代码
    const prettyCode = function() {
        const browser_menu_height = window.outerHeight - window.innerHeight; //浏览器顶部菜单栏高度
        const browser_height_max = screen.height - browser_menu_height; //浏览器最大可展示高度
        let i = 0;
        $$('.set-code-hide').forEach(el => {
            if (i == 0 && $("code", el)?.clientHeight <= browser_height_max * 1.8) {
                //预判首个代码块实际高度，若小于浏览器最大可展示高度的180%，则自动展开代码
                $(".hide-preCode-bt", el)?.click();
            } else if ($("code", el)?.clientHeight <= browser_height_max * 0.8) {
                //预判其余代码块实际高度，若小于浏览器最大可展示高度的80%，则自动展开代码
                $(".hide-preCode-bt", el)?.click();
            }
            i++;
        });
    };

    //拦截推荐搜索
    const hookXHR = function() {
        const origOpen = XMLHttpRequest.prototype.open;
        const block_url = 'redisdatarecall\.csdn\.net/recommend/';
        XMLHttpRequest.prototype.open = function() {
            const reqUrl = arguments[1];
            if (reqUrl.match(block_url)){
                return;
            }
            origOpen.apply(this, arguments);
        };
    };

    //调整头像
    const beautyLOGO = function() {
        $('.article-type-img').src = $('link[rel="shortcut icon"]').href;
        $('.article-type-img').style = 'display: block !important;';
    };

    //净化URL, 保障用户信息安全
    const prettyURL = function() {
        let newurl = location.href.match('(https?://.*?blog\.csdn\.net/.*?article/details/.*?)\\?');
        if (newurl) {
            newurl = newurl[1];
            window.history.replaceState({
                path: newurl
            }, '', newurl);
        }
    };

    window.onload = function() {
        beautyLOGO();
        prettyCode();
        showRecommend();
    };

    purifyPage();
    prettyURL();
    hookXHR();

})();
