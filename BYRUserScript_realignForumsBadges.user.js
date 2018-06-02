// ==UserScript==
// @id      BYRUserScript_realignForumsBadges
// @name    BYR UserScript Realign Forums Badges
// @author    ZunSThy <zunsthy@gmail.com>
// @namespace   https://github.com/zunsthy/QingyingptUserScript
// @description re-align the dadges if odd number
// @include   https://bt.byr.cn/forums.php?*
// @include   http://bt.byr.cn/forums.php?*
// @match     https://bt.byr.cn/forums.php?*
// @match     http://bt.byr.cn/forums.php?*
// @version   0.2.2
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/BYRUserScript_realignForumsBadges.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/BYRUserScript_realignForumsBadges.user.js
// @grant     none
// ==/UserScript==

(function () {

  function each(arr, it) {
    Array.prototype.forEach.call(arr, it);
  }

  function map(arr, it) {
    return Array.prototype.map.call(arr, it);
  }

  var css = `
fieldset{width: 90%}
#back-to-top{z-index: 10;}
.forum{width: 100%;position: relative;}
.forum_row{width: 100%;position: relative;min-height: 150px;border: 1px solid #AAA;border-collapse: collapse; border-radius: }
.post_top{height: 30px;line-height: 28px;display: flex;font-size: 16px;color: #888;overflow: hidden; border-bottom: 1px dotted #C2C2C2;}
.post_avatar{position: absolute;top: 30px;right: 0;padding: 4px; border-left: 1px dotted #C2C2C2; border-bottom: 1px dotted #C2C2C2;}
.post_avatar>img{height: 100px;max-height: 100px;}
.post_content{width: 90%; padding: 20px; font-size: 16px;}
.badges_row{display: inline;margin: 0 10px;}
.badges{cursor: pointer;height: 28px;max-height: 28px;width: 28px;max-width: 28px;margin: 0 2px;}
.badges>img{height: 28px;max-height: 28px;width: 28px;max-width: 28px;border-radius: 50%;overflow: hidden;}
.post_top>span{margin-right: 8px;}
/*.post_user{overflow: hidden;height: 100%}'*/
.post_user>a{font-weight: bold;padding-right: 5px;display: inline-block;vertical-align: top;}
.post_user>span{font-weight: light;opacity: .5;max-width: 370px;height: 100%;overflow: hidden;word-break: break-all;word-wrap: break-word;display:inline-block;}
.post_at,.post_edit,.post_quote,.post_give,.post_floor{cursor: pointer;transition: background .3s ease;padding: 0 3px;}
.post_at:hover,.post_edit:hover,.post_quote:hover,.post_give:hover,.post_floor:hover{background-color: rgba(155, 155, 155, .3);}
.post_floor{margin-left: 10px;color: #333;}
  `;

  var head = document.head || document.getElementByTagName('head')[0],
      style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) style.styleSheet.cssText = css;
  else style.appendChild(document.createTextNode(css));
  head.appendChild(style);

  var text = map(document.querySelectorAll('table.main td.rowfollow[align=left]'), function (el) {
    var badges_row = map(el.querySelectorAll('a[title]'), function (el) {
      return `
<a class="badges" title="${el.title}" href="${el.href}" target="_blank">
  <img src="${el.firstChild.src}" alt="${el.title}">
</a>
      `;
    }).join(''),
    
        topbarContainer = el.parentNode.parentNode.parentNode.previousElementSibling.firstChild,
        pid = topbarContainer.id,
        topbar = topbarContainer.firstChild.firstChild,

        avatar = el.firstChild.src,
        user = topbar.querySelector('span.nowrap>a'),
        name = user.firstChild.innerHTML,
        uc = user.className,
        idlink = user.href,
        id = idlink.match(/\d+/),
        spans = topbar.querySelectorAll('span.nowrap>span'),
        title = spans.length
          ? spans[0].firstChild.innerHTML
          : topbar.querySelector('span.nowrap>b').innerHTML,
        time = topbar.querySelector('span[title]').innerHTML,
        added = topbar.querySelector('span[title]').title,
        floor = topbar.querySelector('font.big').firstChild.innerHTML,
        content = document.querySelector('#' + pid + 'body'),

        userdetail = el.innerHTML.match(/：.+?(<|$)/g),
        posts = userdetail[0].replace(/：|</g, ''),
        uploaded = userdetail[1].replace(/：|</g, ''),
        downloaded = userdetail[2].replace(/：|</g, ''),
        ratio = userdetail[3].replace(/：|</g, ''),

        permission = el.parentNode.parentNode.parentNode.querySelector('.toolbox'),
        at = permission.querySelector('#pm_at_forums'),
        give = permission.querySelector('#send_seed_bonus'),
        quote = permission.querySelector('.f_quote'),
        edit = permission.querySelector('.f_edit');

    return `
<div class="forum_row" id="${pid}">
  <div class="post_top" data-u="${name}" data-pid="${pid.match(/\d+/)}" data-uid="${id}">
    <span class="post_floor"><a href="#${pid}">#${floor}</a></span>
    <span title="${added}" class="post_time">${time}</span>
    <span class="post_user">
      <a href="${idlink}" class="${uc}">${name}</a>
      <span class="post_title ${uc}" title="${title}">${title}</span></span>
    ${(at ? '<span class="post_at">@</span>' : '')}
    ${(give ? '<span class="post_give">Give</span>' : '')}
    ${(quote ? `<a class="post_quote" href="?action=quotepost&postid=${pid}">Quote</a>` : '')}
    ${(edit ? `<a class="post_edit" href="?action=editpost&postid=${pid}">Edit</a>` : '')}
    <span class="post_details">${posts}</span>
    <span class="post_details">${uploaded}</span>
    <span class="post_details">${downloaded}</span>
    <span class="post_details">${ratio}</span>
    <div class="post_badges">${badges_row}</div>
  </div>
  <div class="post_avatar"><img src="${avatar}" alt="${name}"></img></div>
  <div class="post_content" id="${pid}body">${content.innerHTML}</div>
</div>
    `;
  }).join('');

  var outer = document.querySelector('table.main td.rowfollow[align=left]').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  outer.innerHTML = `<section class="forum">${text}</section>`;

  each(document.querySelectorAll('.post_give'), function(el) {
    el.addEventListener('click', function() {
      var info = el.parentNode.dataset;
      window.zOpenInner(info.u, info.uid, info.pid);
    });
  });

  each(document.querySelectorAll('.post_at'), function(el) {
    var compose = document.querySelector('#compose');
    if (compose) {
      compose.querySelector('textarea').value = '@' + el.parentNode.dataset.u + ' ';
      compose.scrollIntoView();
      compose.focus();
    }
  });

})();