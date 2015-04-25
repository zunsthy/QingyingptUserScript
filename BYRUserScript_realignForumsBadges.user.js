// ==UserScript==
// @name        BYR_UserScript_realignForumsBadges
// @author      ZunSThy <zunsthy@gmail.com>
// @namespace   https://github.com/zunsthy/QingyingptUserScript
// @description re-align the dadges if odd number
// @include     http://bt.byr.cn/forums.php?*
// @match       http://bt.byr.cn/forums.php?*
// @version     0.1
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/BYRUserScript_realignForumsBadges.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/BYRUserScript_realignForumsBadges.user.js
// @grant       none
// ==/UserScript==

var css = ''
+ 'fieldset{width: 80%}'
+ '#back-to-top{z-index: 10;}'
+ '.forum{width: 100%;position: relative;}'
+ '.forum_row{width: 100%;position: relative;min-height: 150px;border: 1px solid #AAA;border-collapse: collapse; border-radius: }'
+ '.post_top{height: 42px;line-height: 40px;display: flex;font-size: 16px;color: #888;overflow: hidden; border-bottom: 1px dotted #C2C2C2;}'
+ '.post_avatar{position: absolute;top: 42px;right: 0;}'
+ '.post_avatar>img{height: 100px;max-height: 100px;}'
+ '.post_content{width: 90%; padding: 20px; font-size: 16px;}'
+ '.badges_row{display: inline;margin: 0 10px;}'
+ '.badges{height: 40px;max-height: 40px;width: 40px;max-width: 40px;margin: 0 2px;}'
+ '.badges>img{height: 40px;max-height: 40px;width: 40px;max-width: 40px;border-radius: 50%;overflow: hidden;}'
+ '.post_top>span{margin-right: 12px;}'
+ '.post_user>a{font-weight: bold;padding: 0 5px;}'
+ '.post_user>span{font-weight: light;opacity: .5;max-width: 200px}'
+ '.post_at,.post_quote,.post_give{cursor: pointer;}'
+ '.post_floor{padding: 0 10px;color: #333;}'
;

var head = document.head || document.getElementByTagName('head')[0],
		style = document.createElement('style');
style.type = 'text/css';
if(style.styleSheet)
 	style.styleSheet.cssText = css;
else
	style.appendChild(document.createTextNode(css));
head.appendChild(style);

var text = '<section class="forum">';
var eles = $('table.main td.rowfollow[align=left]').each(function(){
	var badges = [],
			badges_row = '';
	$(this).find('a[title]').each(function(){
		badges.push([ this.title, this.href, this.firstChild.src ]);
		badges_row += '<span class="badges" title="' 
			+ this.title + '" data-link="' + this.href + '">' + '<img src="' + this.firstChild.src + '" alt="' 
			+ this.title + '"></span>';
	});

	var topbar = this.parentNode.parentNode.parentNode.previousElementSibling.firstChild,
		pid = topbar.id;
	topbar = $(topbar.firstChild.firstChild);
	//console.log(topbar[0].innerHTML);
	var avatar = this.firstChild.src,
			user = topbar.find('span.nowrap>a')[0],
			name = user.firstChild.innerHTML,
			uc = user.className, 
			idlink = user.href,
			id = idlink.match(/\d+/),
			title = topbar.find('span.nowrap>span').length ? 
				topbar.find('span.nowrap>span')[0].firstChild.innerHTML :
				topbar.find('span.nowrap>b')[0].innerHTML,
			time = topbar.find('span[title]')[0].innerHTML,
			added = topbar.find('span[title]')[0].title,
			floor = topbar.find('font.big')[0].firstChild.innerHTML,
			content = $('#'+pid+'body')[0];
	//console.log(avatar, name, uc, idlink, title, time, floor);
	var userdetail = this.innerHTML.match(/：.+?(<|$)/g),
			posts = userdetail[0].replace(/：|</g, ''),
			uploaded = userdetail[1].replace(/：|</g, ''),
			downloaded = userdetail[2].replace(/：|</g, ''),
			ratio = userdetail[3].replace(/：|</g, '');
	//console.log(posts, uploaded, downloaded, ratio);
	
	text += '<div class="forum_row" id="' + pid + '">'
		+ '<div class="post_top" data-u="' + name + '" data-pid="' + pid + '" data-uid="' + id + '">'
		+ '<span class="post_floor"><a href="#' + pid + '">#' + floor + '</a></span>'
		+ '<span title="' + added + '" class="post_time">' + time + '</span>'
		+ '<span class="post_user"><a href="' + idlink + '" class="' + uc + '">' + name + '</a><span class="post_title ' + uc + '" title="' + title + '">' + title + '</span></span>'
		+ '<span class="post_at">@</span><span class="post_quote">Quote</span><span class="post_give">Give</span>'
		+ '<span class="post_details">' + posts + '</span>'
		+ '<span class="post_details">' + uploaded + '</span>'
		+ '<span class="post_details">' + downloaded + '</span>'
		+ '<span class="post_details">' + ratio + '</span>'
		+ '<div class="post_badges">' + badges_row + '</div>'
		+ '</div><div class="post_avatar"><img src="' + avatar + '" alt="' + name + '"></img></div>'
		+ '<div class="post_content" id="' + pid + 'body">' + content.innerHTML + '</div></div>';
});

text += '</section>';


var outer = eles[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
outer.innerHTML = text;

$(document).on('click', '.post_quote', function(){
	window.location.href = '?action=quotepost&postid=' + this.parentNode.dataset.pid.match(/\d+/);
}).on('click', '.post_at', function(){
	var compose = $('#compose');
	compose.find('textarea')[0].value = '@' + this.parentNode.dataset.u + ' ';
	compose[0].scrollIntoView();
	compose[0].focus();
}).on('click', '.post_give', function(){
	var info = this.parentNode.dataset;
	zOpenInner(info.u, info.uid, info.pid);
});
