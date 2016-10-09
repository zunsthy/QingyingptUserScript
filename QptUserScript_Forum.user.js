// ==UserScript==
// @id          Qptuserscript_Forum@ZunSThy
// @name        Qpt UserScript Forum
// @author      ZunSThy <zunsthy@gmail.com>
// @version     0.1.264.1010
// @namespace   https://github.com/zunsthy/QingyingptUserScript
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Forum.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Forum.user.js
// @description nothing useful
// @match       http://pt.hit.edu.cn/forums.php*
// @match       https://pt.hit.edu.cn/forums.php*
// @include     http://pt.hit.edu.cn/forums.php*
// @include     https://pt.hit.edu.cn/forums.php*
// @grant       none
// ==/UserScript==

const prefix = 'qpt',
      ver = '0.1.264.1010';

(function(){

const body = document.body || document.getElementsByTagName('body')[0], // ??
      head = document.head || document.getElementsByTagName('head')[0];

const customCSS = `
/* for container */
#content-holder {
  text-overflow: hidden;
}


section,
footer {
  padding: 10px 20px;
}

.op-button, .op-select {
  line-height: 19px;
  padding: 5px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  background-color: #f3f3f3;
  /* box-shadow: 0 1px 1px #eaeaea; */
  /* -webkit-box-shadow: 0 1px 1px #eaeaea; */
  cursor: pointer;
}
.op-button:hover {
  color: #080;
  background: -webkit-linear-gradient(top, #eaeaea, #dadada);
  background: -moz-linear-gradient(top, #eaeaea, #dadada);
  background: linear-gradient(top, #eaeaea, #dadada);
}
.op-select {
  padding-right: 20px;
}

.f-link,
.t-link {
  color: #777;
  text-decoration: none;
  border-radius: 4px;
}
.f-link {
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}

.f-link:visited,
.f-link:link,
.t-link:visited,
.t-link:link {
  color: #999;
}
.f-link.active,
.f-link:hover,
.t-link.active,
.t-link:hover {
  color: #080;
  background-color: #f0f0f0;
}

.line {
  display: flex;
  flex-direction: row;
}
.line::after {
  clear: both;
}
.line > .item {
  flex: 0 1 auto;
  min-height: 1px;
}
.line > .space {
  flex: 1 0;
  min-height: 1px;
}

#content-holder {
  border: 0 none;
}

.topic-title {
}
.topic-title > .forum,
.topic-title > .raquo,
.topic-title > .title,
.topic-title > .locked {
  display: inline-block;
  line-height: 32px;
  vertical-align: middle;
  margin-right: 10px;
}
.topic-title > .forum {
  font-weight: bold;
}
.topic-title > .unlock {
  display: none;
}
.topic-title > .title > h1 {
  line-height: 32px;
  margin: 0;
}

a.forum-link {
  color: #080;
  text-decoration: none;
}
a.forum-link:hover {
  color: #f00;
}

.topic-operate {
  position: relative;
}
.topic-operate > .operate-shrink,
.topic-operate > .operate-expand {
  display: block;
  vertical-align: middle;
}
.topic-operate > .operate-shrink > button {
  padding: 5px 10px;
}
.topic-operate > .operate-shrink.active > button {

}
.topic-operate > .operate-expand {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  width: 0;
  overflow: hidden;
  margin-right: 72px;
  transition: opacity .3s ease .15s;
  text-align: right;
}
.topic-operate > .operate-expand.active {
  display: block;
  opacity: 1;
  width: 620px;
  padding-left: 20px;
  background-color: rgba(255, 255, 255, .9);
}

.topic-info,
.page-container {
  line-height: 19px;
  vertical-align: middle;
}

.topic-info {
  color: #808080;
}

.page-container {
}
.page-container > ul {
  list-style-type: none;
}
.page-container > ul > li {
  margin: 0 2px;
}
.page-container > ul > li > a {
}
.page-container > ul > li > span {
}

.post-holder {
  border-bottom: 1px solid #eaeaea;
  padding-top: 10px;
  padding-bottom: 10px;
}

.post-left {
  padding-right: 10px;
  margin-right: 10px;
  border-right: 1px solid #eaeaea;
}
.post-left,
.t-avartar {
  text-align: left;
}
.postid,
.post-time {
  text-align: center;
}
.postid > a.t-link {
  color: #777;
}
.t-avatar {
  width: 90px;
  height: 90px;
  margin: 5px 0;
}
.t-avatar > img {
  background-color: #f0f0f0;
  border-radius: 10px;
  max-width: 90px;
  /* max-height: 90px; */
}
.post-time {
  color: #999;
  /* word-wrap:break-word; */
  line-height: 1;
}

.line.user-info {
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 5px;
  line-height: 21px;
  vertical-align: middle;
}
.line.user-info > .item,
.line.user-info > .space {
  line-height: 21px;
  vertical-align: middle;
}

.user-info.username {
  position: relative;
}
.user-info.username.dead::after {
  content: "";
  position: absolute;
  border-bottom: 8px solid #333;
  top: 6px;
  left: 2px;
  right: 2px;
}
.user-info.donor,
.user-info.warned {
  display: none;
}
.user-info.donor.active,
.user-info.warned.active {
  display: inline;
}
.user-info.donor.active > img{
  width: 11px;
  height: 11px;
  background: url(icons.png) 0 -57px;
}
.user-info.warned.active > img{
  width: 11px;
  height: 11px;
  background: url(icons.png) -33px -57px;
}
.user-info.title {
  font-weight: lighter;
  font-size: 12px;
  margin-right: 20px;
}
.user-info.ratio,
.user-info.posts {
  font-size: 12px;
  font-weight: lighter;
  margin-right: 20px;
}
.user-info.ratio.warning {
  color: rgba(255, 0, 0, .7);
}

.gift-result {
  position: relative;
  text-align: right;
}
.gift-amount {
  margin-right: 20px;
  font-weight: lighter;
  font-size: 12px;
}
.gift-amount > span {
  font-weight: bold;
}
.gifts-list {
  display: none;
  position: absolute;
  top: 21px;
  right: 10px;
}
.gifts-list > table {
  margin: 0;
  padding: 5px 10px;
  background-color: #eaeaea;
  border-radius: 5px;
}
.gifts-list > table > tbody {
}
.gifts-list > table > tbody > tr > td {
  border: 0 none;
  padding: 2px 4px;
}
.gifts-list > table > tbody > tr > td:first-child {
  text-align: right;
  color: #080;
}
.gifts-list > table > tbody > tr > td:last-child {
  text-align: left;
  font-weight: bold;
}

.item.post-action {
  white-space: normal;
}
button.post-action {
  border: 0 none;
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;
  margin: 0;
  padding: 0;
  line-height: 19px;
  border-radius: 4px;
}
button.post-action:hover {
  color: #080;
  background-color: #dadada;
}

.content-body {
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  text-align: left;
  line-height: 1.5;
  font-size: 16px;
}


footer .holder {
}
footer .holder > .item {
  margin-right: 30px;
}

.reply {
  text-align: left;
}

ul.reply-functions {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}
ul.reply-functions > li {
  margin: 0;
  margin-bottom: 2px;
  padding: 4px 10px;
  cursor: pointer;
}
ul.reply-functions > li:hover,
ul.reply-functions > li.active {
  cursor: normal;
  color: #080;
  background-color: #f0f0f0;
}
.reply-text {
  text-align: left;
  font-size: 14px;
}
#quickreply {
  width: 600px;
  height: 146px; /* textarea m1 b1 p5 *2 = 14px */
}
.icon-area {
  padding: 5px 0 5px 20px;
  line-height: 25px;
}
.icon-area > img {
  max-width: 18px;
  max-height: 20px;
}
`;

(function customStyle(css){
  let style = document.createElement('style');
  style.type = 'text/css';

  if(style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
})(customCSS);

(function loadStyle(src){
  let link  = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = src;
  head.appendChild(link);
})('/css/user.css');

(function getUrlParams(){
  let match, pl = /\+/g,
      search = /([^&=]+)=?([^&]*)/g,
      decode = (str) => decodeURIComponent(str.replace(pl, ' ')),
      query = window.location.search.substring(1);

  let urlParams = {};
  while(match = search.exec(query)){
    urlParams[decode(match[1])] = decode(match[2]);
  }
  window.urlParams = urlParams;
})();

const calcPageArr = (page, pages) => (pages === 1)
  ? [1]
  : [1, ...(page < 5 ? [] : [0]), ...[page - 2, page - 1, page, page + 1, page + 2].filter(p => p > 1 && p < pages), ...(page > pages - 4 ? [] : [0]), pages];

const listenerCreator = (root, selector, type, handle) => {
  [...root.querySelectorAll(selector)].forEach((el) => {
    el.addEventListener(type, handle);
  });
};

const rGifts = /\[bonus\]([^\[]+)\[b_sp\](\d+)/g;
const rGift = /\[bonus\]([^\[]+)\[b_sp\](\d+)/;
const statiticsGifts = (str) => {
  let ms = str.match(rGifts);
  return ms
  ? ms.map((m) => m.match(rGift).slice(1))
  : [];
};

const rLinks = new RegExp('((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))', 'g');
const rEmails = new RegExp('((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))', 'g');

const encUriChars = (str) => str.replace(/"/g, '%22').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');

const formatBBcode = (() => {
  'use strict';
  const noConflict = `-z-${Date.now()}-`;
  const emotionUriPrefix = '/pic/smiles/';

  const tags = {
    b: (_, content) => `<strong class="bbcode bbcode-b">${content}</strong>`,
    i: (_, content) => `<i class="bbcode bbcode-i">${content}</i>`,
    u: (_, content) => `<u class="bbcode bbcode-u">${content}</u>`,
    s: (_, content) => `<s class="bbcode bbcode-s">${content}</s>`,
    q: (_, content) => `<q class="bbcode bbcode-q">${content}</q>`,
    del: (_, content) => `<del class="bbcode bbcode-s">${content}</del>`,
    color(params, content) {
      let color = '', ms;
      if(ms = params.match(/(#([a-f0-9]{3}){1,2})$/i)) {
        color = ms ? ms[1] : '';
      } else if(ms = params.match(/^(\w+)/)) {
        color = ms ? ms[1] : '';
      }
      return color ? `<span class="bbcode bbcode-color" data-bbcode-color="${color}" style="color: ${color}">${content}</span>` : content;
    },
    size(params, content) {
      const ms = params.match(/\d/);
      return ms ? `<span class="bbcode bbcode-size" data-bbcode-size="${ms[0]}">${content}</span>` : content;
    },
    font(params, content) {
      const ms = params.match(/([\S\s]+)/);
      let font = ms ? ms[1] : '';
      font = font.trim().replace(/"/g, '');
      return ms ? `<span class="bbcode bbcode-font" data-bbcode-font="${font}" style="font-family: '${font}'">${content}</span>` : content;
    },
    url(params, content, single) {
      let valid = true, url = '';
      if(single || !content) {
        url = params;
        content = url;
      } else if(!params) {
        if(!/(\r|\n|\r\n)/.test(content) && content.match(rLinks)) {
          url = content.match(rLinks)[0];
        } else {
          valid = false;
        }
      } else {
        url = params;
      }
      if(url) {
        url = encUriChars(url); 
      }
      return valid ? `<span class="bbcode bbcode-link" data-bbcode-link="${url}"><a href="${url}" target="_blank">${content}</a></span>` : content;
    },
    img(params, content, single) {
      let valid = true, src = '';
      if(single || !content) {
        src = params;
      } else if(!params) {
        src = content.trim();
        if(/(\r|\n|\r\n| )/.test(src) || !src.match(rLinks)) {
          valid = false;
        }
      } else {
        src = params.slice(1);
      }
      if(valid && src) {
        let ms = src.match(/^[^\?]+\.(\w+)($|\?)/);
        if(!ms || !(~['jpg', 'gif', 'svg', 'jpeg', 'tiff', 'png', 'ico', 'bmp', 'webp'].indexOf(ms[1].toLowerCase()))) {
          valid = false;
        } else {
          src = encUriChars(src);
        }
      }
      return valid ? `<img class="bbcode bbcode-img" alt="${src}" src="${src}">` : `<span class="bbcode bbcode-nopic">${src}</span>`;
    },
    list(params, content) {
      let title = params || '';
      if(title){
        title = `<span class="bbcode bbcode-list-title">${params.trim()}</span>`;
      }
      return `<ul class="bbocode bbcode-list">${title}${content}</ul>`;
    },
    li: (_, content) => `<li class="bbcode bbcode-list-item">${content}</li>`,
    quote(params, content) {
      let legend = params || '';
      legend = `<legend> 引用: ${legend} </legend>`;
      return `<fieldset>${legend}${content}</fieldset>`;
    },
    pre: (_, content) => `<pre class="bbcode bbcode-pre">${content}</pre>`,
    code: (params, content) => `<pre class="bbcode bbcode-code"><code class="${params || ''}">${content.replace(/(^(&#10;)+|(&#10;)+$)/g, '')}</code></pre>`,
    noparse: (_, content) => `<samp class="bbcode bbcode-noparse">${content}</samp>`,
    flash: () => `<em>暂时不支持flash插入</em>`,
    flv: () => `<em>暂时不支持flv视频插入</em>`,
    video: () => `<em>暂时不支持视频插入</em>`,
    site: () => `<span class="bbcode bbcode-site"></span>`,
    siteurl: () => `<span class="bbcode bbcode-siteurl">https://pt.hit.edu.cn</span>`,
    siteimg: () => `<span class="bbcode bbcode-siteimg"><img src="/styles/login/logo.png"></span>`,
  };

  const noparseTags = ['pre', 'code', 'noparse'];
  const closureTags = ['b', 'i', 'u', 's', 'q', 'del', 'color', 'size', 'font', 'url', 'img', 'list', 'li', 'quote', 'pre', 'code', 'noparse', 'flash', 'flv', 'video'];
  const singleTags = ['site', 'siteurl', 'siteimg', 'url', 'img', 'video'];

  const renderPlain = (str) => str ? str
    .replace(/\[em(\d+)\]/g, (em, num) => `<img class="bbocde emotion" src="${emotionUriPrefix}${num}.gif">`)
    .replace(/(\r\n|\r|\n)/g, '<br />')
    : '';

  const rDep = new RegExp(`(${noConflict})(\\d+)`);
  const rNoparseTags = new RegExp(`\\[(${noparseTags.join('|')})(\=[^\\]]*?)?\\]([\\S\\s]*?)\\[/\\1\\]`, 'gi');
  const rClosureTags = new RegExp(`\\[(${closureTags.join('|')})([ ,=][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]`, 'gi');
  const rSingleTags = new RegExp(`\\[(${singleTags.join('|')})([ ,=][^\\]]*?)?\\]`, 'gi');
  const rNotListTag = /\[(?!\*\]|list([ =][^\]]*)?\]|\/list\])/gi;
  const rListTag = /\[(?=list([ =][^\]]*)?\]|\/list\])/gi;

  const rBBClosure = new RegExp(`<${noConflict}(\\d+) (${closureTags.join('|')})([ ,=][^>]*?)?>([\\S\\s]*?)<${noConflict}\\1 /\\2>`, 'gi');
  const rBBSingle = new RegExp(`\{(${singleTags.join('|')})([ ,=][^\\]]*?)?\}`, 'gi');

  const xLi = (str) => str.replace(/\[\*\]([^\[]*?)(\[\*\]|<\/list])/i, (s, content, endTag) => (endTag === '[*]') ? `>*]${content}>/*][*]` : `>*]${content}>/*]>/list]`);
  const xList = (str) => str.replace(/<list([ =][^\]]*?)?\]([^<]*?)(<\/list\])/gi, (s) => {
    while(s !== (s = xLi(s)));
    return s.replace(/</g, '>');
  });
  const xClosure = (str) => str.replace(rClosureTags, (s) => s.replace(/\[/g, '<').replace(/\]/g, '>').replace(/<([^>]+?)>/gi, (_s_, tag) => ('<'
    + (tag.match(rDep) ? tag.replace(rDep, (_s__, p1, p2) => `${p1}${1 + parseInt(p2, 10)}`) : `${noConflict}0 ${tag}`)
    + '>')));

  const preprocessNoparse = (str) => str.replace(rNoparseTags, (s, tag, params, content) => `[${tag}]${content.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;').replace(/(\r\n|\r|\n)/g, '&#10;')}[/${tag}]`);
  const preprocessList = (str) => {
    let text = str.replace(rNotListTag, '>').replace(rListTag, '<');
    while(text !== (text = xList(text)));
    return text.replace(/>/g, '[').replace(/\[\*\]/g, '[li]').replace(/\[\/\*\]/g, '[/li]');
  };
  const preprocessSingleTag = (str) => str.replace(rSingleTags, (s, tag, params) => `{${tag}${params || ''}}`);
  const preprocessClosureTag = (str) => {
    let text = str;
    while(text !== (text = xClosure(text)));
    return text;
  };

  const processClosureTag = (str) => str.replace(rBBClosure, (s, dep, tag, params, content) => {
    tag = tag.toLowerCase();
    const handle = tags[tag];
    return handle ? handle(params ? params.slice(1).trim() : undefined, processClosureTag(content)) : content;
  });
  const processSingleTag = (str) => str.replace(rBBSingle, (s, tag, params) => {
    tag = tag.toLowerCase();
    const handle = tags[tag];
    return handle ? handle(params ? params.slice(1).trim() : undefined, undefined, true) : '';
  });

  return (str) => renderPlain(processSingleTag(processClosureTag(preprocessSingleTag(preprocessClosureTag(preprocessList(preprocessNoparse(str)))))));
})();

const exBBcode = (str) => {
  let res = str.replace(/\[bonus\][\S\s]+/, '')
    .replace(/&/g, '&amp;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return formatBBcode(res);
};

const nativeTreeWalker = (root, walkerFunc) => {
	let walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false),
			node,
			textNodes = [];

	while(node = walker.nextNode()){
		textNodes.push(node);
	}

	return textNodes.forEach(walkerFunc);
};

const renderLinks = (nodes) => {
  // TOO SLOW!!!
  nodes.forEach((node) => nativeTreeWalker(node, (textNode) => {
    const p = textNode.parentNode;
    if(p.tagName !== 'A') {
      const span = document.createElement('span');
      const text = textNode.nodeValue; 
      // if(text.match(rLinks) || text.match(rEmails)) {
      if(text.match(rLinks)) {
        // span.innerHTML = text.replace(/</g, '&lt;'/* XSS */).replace(rLinks, (l) => `<a class="render-link" target="_blank" href="${l}">${l}</a>`).replace(rEmails, (m) => `<a class="render-mail" target="_top" href="mailto:${m}"><em>${m}</em></a>`);
        span.innerHTML = text.replace(/</g, '&lt;'/* XSS */).replace(rLinks, (l) => `<a class="render-link" target="_blank" href="${l}">${l}</a>`);
        p.insertBefore(span, textNode);
        p.removeChild(textNode);
      }
    }
  }));
};

const pageTopic = (data) => {
  // 'use strict';
  const posts = data['forumsInfo'],
      users = data['posters'],
      me = data['me'],
      info = data['otherInfo'],
      sections = data['forumsPlates'],
      addons = data['musicaddon'],
      topicid = info['topicid'] || window.urlParams['topicid'];

  const holder = document.getElementById('outer');
  holder.removeChild(holder.firstChild);
  // holder.innerHTML = '';
  holder.id = 'content-holder';

  /// Display
  const link0 = `/forums.php?action=viewforum&forumid=${info['forumid']}`,
        link = `/forums.php?action=viewtopic&topicid=${topicid}&page=`;

  let cTitleLine, cPagination, cOperateArea, cReplyArea, cGifts, repeatPage, repeatSection, repeatColor;

  cTitleLine = () => {
    let container = document.createElement('header');
    container.className = 'header-section';
    container.innerHTML = `
<section class="line">
  <div class="item topic-title">
    <span class="forum"><a class="forum-link" href="${link0}">${info['forumname']}</a></span>
    <span class="raquo">   &gt;&gt;   </span>
    <span class="title"><h1>${info['subject']}</h1></span>
    <span class="${info['locked'] == 'no' ? 'unlock' : 'locked'}">[锁定]</span>
  </div>
  <div class="space"></div>
  <div class="item topic-operate">
    <div class="operate-shrink">
      <button class="op-button">&laquo; 管理</button>
    </div>
    <div class="operate-expand">
      ${me['modifier'] == 'yes' ? cOperateArea() : ''}
    </div>
  </div>
</section>
<section class="line">
  <div class="item topic-info">
    <span class="view-count">查看<strong>${info['views']}</strong>次</span>
  </div>
  <div class="space"></div>
  <div class="item page-container">
    ${cPagination(+info['page'], +info['pages'])}
  </div>
</section>
    `;
    return container;
  };

  cPagination = (cur, page) => `
<ul class="line">
  <li class="item"><a class="f-link" href="${cur === 0 ? '#' : (link + (cur - 1))}">&laquo;上一页</a></li>
  ${repeatPage(cur + 1, page)}
  <li class="item"><a class="f-link" href="${cur === (page - 1) ? '#' : (link + (cur + 1))}">下一页&raquo;</a></li>
</ul>
  `;

  cOperateArea = () => `
<button class="op-button sticky">置顶</button>
<button class="op-button lock">锁定</button>
<button class="op-button delete">删除</button>
<select class="op-select moveto" name="moveto">${repeatSection()}</select>
<button class="op-button moveto">移动</button>
<select class="op-select hl" name="hl">${repeatColor()}</select>
<button class="op-button hl">高亮</button>
  `;

  repeatPage = (cur, page) => calcPageArr(cur, page).map((p) => p
    ? (p === cur)
    ? `<li class="item"><a class="f-link current active" href="#">${p}</a>`
    : `<li class="item"><a class="f-link" href="${link + (p - 1)}">${p}</a>`
    : `<li class="item"><span>...</span></li>`
  ).join('');

  repeatSection = () => Object.keys(sections).map((sectionId) => `
<option value="${sectionId}">${sections[sectionId]}</option>
  `).join('');

  repeatColor = () => '<option value="0">无</option>' + [
    'Black',  'Sienna',  'Dark Olive Green',  'Dark Green',  'Dark Slate Blue',  'Navy',
    'Indigo',  'Dark Slate Gray',  'Dark Red',  'Dark Orange',  'Olive',  'Green',  'Teal',
    'Blue',  'Slate Gray',  'Dim Gray',  'Red',  'Sandy Brown',  'Yellow Green',  'Sea Green',
    'Medium Turquoise',  'Royal Blue',  'Purple',  'Gray',  'Magenta',  'Orange',  'Yellow',
    'Lime',  'Cyan',  'Deep Sky Blue',  'Dark Orchid',  'Silver',  'Pink',  'Wheat',
    'Lemon Chiffon',  'Pale Green',  'Pale Turquoise',  'Light Blue',  'Plum',  'White'
  ].map((color, i) => `
<option value="${i + 1}" style="background-color: ${color.replace(/ /g, '').toLowerCase()};">${color}</option>
  `).join('');

  cGifts = (gifts) => `
<div class="gifts-list">
  <table>
    <tbody>
  ` + gifts.map((gift) => `
<tr>
  <td class="giver">${gift[0]}</td>
  <td class="bonus">${gift[1]}</td>
</tr>
  `).join('')
  + `
    </tbody>
  </table>
</div>
  `;

  cContent = () => {
    let container = document.createElement('section');
    container.className = 'content-section';
    container.innerHTML = posts.map((post) => {
      let user = users[post['posterid']] || {
        id: 0,
        username: '(该用户不存在)',
        title: '',
        level: 0,
        uploaded: 0,
        downloaded: 0,
        ratio: 0,
        enabled: 'no',
        modifier: 'no',
      };
      let gifts = statiticsGifts(post['body']);
      let giftAmount = gifts.reduce((amount, gift) => (amount + (+gift[1])), 0);

      return `
<div class="post-holder" id="pid${post['postid']}">
  <div class="line">
    <div class="item post-left">
      <div class="postid">
        <a class="t-link" href="#pid${post['postid']}">${post['floor']}楼#${post['postid']}</a>
      </div>
      <div class="t-avatar">
        <img src="/${user['avatar']}" alt="avatar"/>
      </div>
      <div class="post-time">${post['added'].trim().replace(/\s+/, '<br />')}</div>
    </div>
    <div class="space">
      <div class="line user-info">
        <div class="item">
          <span class="user-info username${user['enabled'] === 'yes' ? '' : ' dead'}" title="${user['username']}"><a target="_blank" class="user_link UC_${user['level']}" href="/userdetails.php?id=${user['id']}">${user['username']}</a></span>
          <span class="user-info donor${user['donor'] === 'yes' ? ' active' : ''}"><img src="/pic/trans.gif" alt="Donor"></span>
          <span class="user-info warned${user['warned'] === 'yes' ? ' active' : ''}"><img src="/pic/trans.gif" alt="Warned"></span>
          <span class="user-info title" title="${user['title']}"><i class="UC_${user['level']}">${user['title']}</i></span>
          <span class="user-info ratio${(user['leechwarn'] === 'yes' || (user['ratio'] < 1 && +user['ratio'] !== 0)) ? ' warning' : ''}"><span>${+user['ratio'] === 0 ? '+∞' : user['ratio']}</span>=<span>${user['uploaded'].replace(/\s/g, '')}</span>/<span>${user['downloaded'].replace(/\s/g, '')}</span></span>
          <span class="user-info posts" ${user['title'].length > 15 ? 'style="display: none;"' : ''}>发帖:${user['forumposts']}</span>
        </div>
        <div id="gift-pid${post['postid']}" class="space gift-result">
          <span class="gift-amount">+<span>${giftAmount}</span> 魔力</span>
          ${cGifts(gifts)}
        </div>
        <div class="item post-action">
          <button class="post-action reply" data-floor="${post['floor']}">回复</button>
          <button class="post-action quote" data-post="${post['postid']}">引用</button>
          ${me['modifier'] === 'yes' ? ('<button class="post-action delete" data-post="' + post['postid'] + '">删除</button>') : ''}
          ${(me['modifier'] === 'yes' || post['posterid'] === me['id']) ? ('<button class="post-action edit" data-post="' + post['postid'] + '">编辑</button>') : ''}
          <button class="post-action like${post['i_liked'] === 0 ? '' : ' liked'}"><span class="liked">${post['total_like']}<span> 赞</button>
          <button class="post-action give" data-bonus="100" data-user="${post['posterid']}" data-post="${post['postid']}">100</button>
          <button class="post-action give" data-bonus="1000" data-user="${post['posterid']}" data-post="${post['postid']}">1000</button>
          <button class="post-action give" data-bonus="10000" data-user="${post['posterid']}" data-post="${post['postid']}">10000</button>
        </div>
      </div>
      <div class="content-body">
        ${exBBcode(post['body'])}
      </div>
    </div>
  </div>
</div>
      `;
    }).join('');

    return container;
  };

  cReplyArea = () => {
    let container = document.createElement('footer');
    container.className = 'reply-section';
    container.innerHTML = `
<div class="holder line">
  <div class="item">
    <ul class="reply-functions">
      <li class="active">表情</li>
      <li>图片</li>
      <li>视频</li>
      <li>音乐</li>
    </ul>
    <div class="reply">
      <button class="op-button reply-button">快速回复</button>
    </div>
  </div>
  <div class="space reply">
    <textarea id="quickreply" name="quickreply" class="reply-text"></textarea>
  </div>
  <div class="space">
    <div class="line">
      <div class="space"></div>
      <div class="item page-container">
        ${cPagination(+info['page'], +info['pages'])}
      </div>
    </div>
    <div class="icon-area">
    </div>
  </div>
</div>
    `;

    return container;
  };

  ///re-render
  const renderPages = () => {
    [...holder.querySelectorAll('a.f-link[href="#"]')].forEach((el) => {
      el.setAttribute('disabled', 'disabled');
      el.addEventListener('click', (ev) => ev.preventDefault());
    });
  };

  /// Event Listener
  const handleManage = (ev) => {
    ev.preventDefault();
    holder.querySelector('.operate-expand').classList.toggle('active');
  };
  const handleSticky = (ev) => {};
  const handleLock = (ev) => {};
  const handleDelete = (ev) => {};
  const handleMoveto = (ev) => {};
  const handleHightlight = (ev) => {};

  const handleReply = (ev) => {};
  const handleQuote = (ev) => {};
  const handleDeletePost = (ev) => {};
  const handleEdit = (ev) => {};
  const handleLike = (ev) => {};
  const handleGive = (ev) => {};

  const handleUserPop = (ev) => {};

  const handleQuickReply = () => {};
  const handleQuickReplyEnter = () => {};

  const handleInsertImage = () => {};
  const handleInsertVideo = () => {};
  const handleInsertMusic = () => {};
  const handleInsertEmotion = () => {};

  /// page render
  holder.appendChild(cTitleLine());
  holder.appendChild(cContent());
  holder.appendChild(cReplyArea());

  setTimeout(() => renderLinks([...holder.querySelectorAll('.content-body')]), 0);
  setTimeout(() => renderPages()); 

  listenerCreator(holder, '.operate-shrink > .op-button', 'click', handleManage);
  listenerCreator(holder, '.op-button.sticky', 'click', handleSticky);
  listenerCreator(holder, '.op-button.lock', 'click', handleLock);
  listenerCreator(holder, '.op-button.delete', 'click', handleDelete)
  listenerCreator(holder, '.op-button.moveto', 'click', handleMoveto);
  listenerCreator(holder, '.op-button.hl', 'click', handleHightlight);
  
  listenerCreator(holder, '.post-action.reply', 'click', handleReply);
  listenerCreator(holder, '.post-action.quote', 'click', handleQuote);
  listenerCreator(holder, '.post-action.delete', 'click', handleDeletePost);
  listenerCreator(holder, '.post-action.edit', 'click', handleEdit);
  listenerCreator(holder, '.post-action.like', 'click', handleLike);
  listenerCreator(holder, '.post-action.give', 'click', handleGive);
  
  listenerCreator(holder, '.t-avatar', 'mouseenter', handleUserPop);

console.log(holder);
  listenerCreator(holder, '.op-button.reply-button', 'click', handleQuickReply);
  listenerCreator(holder, '#quickreply', 'keydown', handleQuickReplyEnter);

  listenerCreator(holder, '.insert-button.image', 'click', handleInsertImage);
  listenerCreator(holder, '.insert-button.video', 'click', handleInsertVideo);
  listenerCreator(holder, '.insert-button.music', 'click', handleInsertMusic);
  listenerCreator(holder, '.insert-ico.emotion', 'click', handleInsertEmotion);
};

let pageForum = (data) => {

};

let reRenderPage = () => {
  let urlParams = window.urlParams,
      data = JSON.parse(window.passToClient);
  console.log(urlParams, data);

  switch(urlParams['action']){
    case 'viewtopic': pageTopic(data); break;
    case 'viewforum': pageForum(data); break;
  }
};

reRenderPage();

})();