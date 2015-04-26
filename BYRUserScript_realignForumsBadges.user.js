// ==UserScript==
// @id          BYRUserScript_realignForumsBadges
// @name        BYR UserScript Realign Forums Badges
// @author      ZunSThy <zunsthy@gmail.com>
// @namespace   https://github.com/zunsthy/QingyingptUserScript
// @description re-align the dadges if odd number
// @include     http://bt.byr.cn/forums.php?*
// @match       http://bt.byr.cn/forums.php?*
// @version     0.2
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/BYRUserScript_realignForumsBadges.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/BYRUserScript_realignForumsBadges.user.js
// @grant       none
// ==/UserScript==

var css = ''
+ 'fieldset{width: 90%}'
+ '#back-to-top{z-index: 10;}'
+ '.forum{width: 100%;position: relative;}'
+ '.forum_row{width: 100%;position: relative;min-height: 150px;border: 1px solid #AAA;border-collapse: collapse; border-radius: }'
+ '.post_top{height: 30px;line-height: 28px;display: flex;font-size: 16px;color: #888;overflow: hidden; border-bottom: 1px dotted #C2C2C2;}'
+ '.post_avatar{position: absolute;top: 30px;right: 0;padding: 4px; border-left: 1px dotted #C2C2C2; border-bottom: 1px dotted #C2C2C2;}'
+ '.post_avatar>img{height: 100px;max-height: 100px;}'
+ '.post_content{width: 90%; padding: 20px; font-size: 16px;}'
+ '.badges_row{display: inline;margin: 0 10px;}'
+ '.badges{cursor: pointer;height: 28px;max-height: 28px;width: 28px;max-width: 28px;margin: 0 2px;}'
+ '.badges>img{height: 28px;max-height: 28px;width: 28px;max-width: 28px;border-radius: 50%;overflow: hidden;}'
+ '.post_top>span{margin-right: 8px;}'
/*+ '.post_user{overflow: hidden;height: 100%}'*/
+ '.post_user>a{font-weight: bold;padding-right: 5px;display: inline-block;vertical-align: top;}'
+ '.post_user>span{font-weight: light;opacity: .5;max-width: 370px;height: 100%;overflow: hidden;word-break: break-all;word-wrap: break-word;display:inline-block;}'
+ '.post_at,.post_edit,.post_quote,.post_give,.post_floor{cursor: pointer;transition: background .3s ease;padding: 0 3px;}'
+ '.post_at:hover,.post_edit:hover,.post_quote:hover,.post_give:hover,.post_floor:hover{background-color: rgba(155, 155, 155, .3);}'
+ '.post_floor{margin-left: 10px;color: #333;}'
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
	var permission = $(this.parentNode.parentNode.parentNode).find('.toolbox'),
			at = permission.find('#pm_at_forums').length,
			give = permission.find('#send_seed_bonus').length,
			quote = permission.find('.f_quote').length,
			edit = permission.find('.f_edit').length;
	//console.log(permission, at, give, quote, edit);
	
	text += '<div class="forum_row" id="' + pid + '">'
		+ '<div class="post_top" data-u="' + name + '" data-pid="' + pid.match(/\d+/) + '" data-uid="' + id + '">'
		+ '<span class="post_floor"><a href="#' + pid + '">#' + floor + '</a></span>'
		+ '<span title="' + added + '" class="post_time">' + time + '</span>'
		+ '<span class="post_user"><a href="' + idlink + '" class="' + uc + '">' + name + '</a><span class="post_title ' + uc + '" title="' + title + '">' + title + '</span></span>'
		+ (at ? '<span class="post_at">@</span>' : '')
		+ (give ? '<span class="post_give">Give</span>' : '')
		+ (quote ? '<span class="post_quote">Quote</span>' : '')
		+ (edit ? '<span class="post_edit">Edit</span>' : '')
		+ '<span class="post_details">' + posts + '</span>'
		+ '<span class="post_details">' + uploaded + '</span>'
		+ '<span class="post_details">' + downloaded + '</span>'
		+ '<span class="post_details">' + ratio + '</span>'
		+ '<div class="post_badges">' + badges_row + '</div>'
		+ '</div>'
		+ '<div class="post_avatar"><img src="' + avatar + '" alt="' + name + '"></img></div>'
		+ '<div class="post_content" id="' + pid + 'body">' + content.innerHTML + '</div>'
		+ '</div>';
});

text += '</section>';


var outer = eles[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
outer.innerHTML = text;

$(document).on('click', '.post_quote', function(){
	window.location.href = '?action=quotepost&postid=' + this.parentNode.dataset.pid;
}).on('click', '.post_edit', function(){
	window.location.href = '?action=editpost&postid=' + this.parentNode.dataset.pid;
}).on('click', '.post_at', function(){
	var compose = $('#compose');
	compose.find('textarea')[0].value = '@' + this.parentNode.dataset.u + ' ';
	compose[0].scrollIntoView();
	compose[0].focus();
}).on('click', '.post_give', function(){
	var info = this.parentNode.dataset;
<<<<<<< HEAD
	zOpenInner(info.u, info.uid, info.pid);
}).on('click', 'span.badges', function(){
	window.open(this.dataset.link);
=======
	zOpenInner(info.u, info.uid, info.pid.match(/\d+/));
>>>>>>> 880b39d1369fbfe23708079352dd2096dd6a3023
});
