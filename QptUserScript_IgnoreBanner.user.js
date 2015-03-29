// ==UserScript==
// @name        QptUserScript_IgnoreBanner
// @namespace   User Script for QingyingPT
// @description nothing useful
// @match       http://pt.hit.edu.cn/*.php*
// @include     http://pt.hit.edu.cn/*.php*
// @exclude     http://pt.hit.edu.cn/
// @exclude     http://pt.hit.edu.cn/index.php
// @version     1.0.2015.03011010
// @require     http://pt.hit.edu.cn/jquerylib/jquery-1.7.2.min.js
// ==/UserScript==

if(!(/#/.test(location.href))){
	$('html, body').animate({
		scrollTop: $("#nav").offset().top
	}, 0);
}
