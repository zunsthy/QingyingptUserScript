// ==UserScript==
// @id          Qptuserscript_Forum@ZunSThy
// @name        QptUserScript Forum
// @author      ZunSThy <zunsthy@gmail.com>
// @version     0.1.337.0100
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

(function(){
'use strict';
const prefix = 'qpt',
      ver = '0.1.337.0100';

const head = document.head || document.getElementsByTagName('head')[0],
      body = document.body;

const initCustomCSS = () => {
  const themeGreen = '#4ca44c';
  return `
/* for container */
#content-holder {
  text-overflow: hidden;
}

/* cover the global style */
input, textarea, progress {
  outline: none;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  border-radius: 1px;
  box-shadow: none;
  -webkit-box-shadow: none;
  transition: none;
  -webkit-transition: none;
  padding: 5px 8px;
}
input[type="text"]:hover, textarea:hover,
input[type="text"]:focus, textarea:focus {
  border-color: #b9b9b9;
  border-top-color: #a0a0a0;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
}
input[type="text"]:focus, textarea:focus {
  border-color: ${themeGreen};
}

input, progress {
  box-sizing: border-box;
}

section,
footer {
  padding: 10px 20px;
}

progress {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 100%;
  padding: 5px 8px;
  background-color: #fff;
  /* text-align: left; */
}
progress::-webkit-progress-bar {
  background: transparent;
}
progress::-webkit-progress-value {
  border-radius: 2px;
  background-image:
    -webkit-linear-gradient(-45deg,
      transparent 33%,
      rgba(0, 0, 0, .1) 33%,
      rgba(0, 0, 0, .1) 66%,
      transparent 66%),
    -webkit-linear-gradient(top,
      rgba(255, 255, 255, .25),
      rgba(0, 0, 0, .25)),
    -webkit-linear-gradient(left, #c4f8c4, #8ef658);
  background-size: 50px 20px, 100% 100%, 100% 100%;

  -webkit-animation: animate-stripes 5s linear infinite;
  animation: animate-stripes 5s linear infinite;
}
progress::-moz-progress-bar {
  border-radius: 2px;
  background-image:
    -moz-linear-gradient(-45deg,
      transparent 33%,
      rgba(0, 0, 0, .1) 33%,
      rgba(0, 0, 0, .1) 66%,
      transparent 66%),
    -moz-linear-gradient(top,
      rgba(255, 255, 255, .25),
      rgba(0, 0, 0, .25)),
    -moz-linear-gradient(left, #c4f8c4, #8ef658);
  background-size: 50px 20px, 100% 100%, 100% 100%;

  -moz-animation: animate-stripes 5s linear infinite;
  animation: animate-stripes 5s linear infinite;
}
@-webkit-keyframes animate-stripes {
  0% { background-position: 0px 0px, 0 0, 0 0; }
  100% { background-position: -100px 0px, 0 0, 0 0; }
}
@-moz-keyframes animate-stripes {
  0% { background-position: 0px 0px; }
  100% { background-position: -100px 0px; }
}
@keyframes animate-stripes {
  0% { background-position: 0px 0px; }
  100% { background-position: -100px 0px; }
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
  color: ${themeGreen};
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
  color: ${themeGreen};
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
  position: relative;
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
  color: ${themeGreen};
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
  background: url("/styles/icons.png") -22px -57px;
}
.user-info.warned.active > img{
  width: 11px;
  height: 11px;
  background: url("/styles/icons.png") -33px -57px;
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
.gifts-list.show {
  display: block;
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
  color: ${themeGreen};
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
  color: ${themeGreen};
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

.reply-button {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
.reply-button > button {
  width: 100%;
  text-align: center;
  padding: 5px 2px;
}

ul.reply-functions {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul.reply-functions > li {
  display: block;
  margin: 0;
  margin-bottom: 2px;
}
ul.reply-functions > li > label {
  display: block;
  text-align: center;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
ul.reply-functions > li > input[type=radio] {
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
  position: absolute;
}
ul.reply-functions > li:hover > label ,
ul.reply-functions > li > input:checked + label {
  color: ${themeGreen};
  background-color: #f0f0f0;
}
.reply-text {
  text-align: left;
  font-size: 14px;
}
#quickreply {
  width: 600px;
  height: 146px; /* textarea m1 b1 p5 *2 = 14px */
  min-height: 146px;
  resize: vertical;
}

.function-panels > div:not(.active) {
  display: none;
}

.icons-area {
  padding: 5px 0 5px 20px;
}
.emotion-option {
  float: left;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
  padding: 3px 4px;
  height: 20px;
  width: 20px;
}
.emotion-option::after {
  content: "";
  display: block;
  clear: both;
}
.emotion-option > img {
  cursor: pointer;
  max-width: 20px;
  max-height: 20px;
  vertical-align: middle;
}

.image-area {
  padding: 5px 0 5px 20px;
}
.image-insertion > .line {
  margin-top: 14px;
}

.bbcode {
}
.bbcode-b {
  font-weight: bolder;
}
.bbcode-i {
  font-style: italic;
}
.bbcode-u {
  text-decoration: underline;
}
.bbcode-s {
  text-decoration: line-through;
}
.bbcode-q {
  display: inline;
}
.bbcode-q:before {
  content: open-quote;
}
.bbcode-q:after {
  content: close-quote;
}
.bbcode-del {
  position: relative;
  text-decoration: none;
  color: #333;
  background-color: #333;
}
.bbcode-del:hover {
  color: #fff;
}
.bbcode-color {
  text-shadow: none;
}
.bbcode-color[data-bbcode-color="rainbow"],
.bbcode-color[data-bbcode-color="z"] {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, #f22),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22));
  background-image: gradient(
    linear,
    left top,
    right top,
    color-stop(0, #f22),
    color-stop(0.15, #f2f),
    color-stop(0.3, #22f),
    color-stop(0.45, #2ff),
    color-stop(0.6, #2f2),
    color-stop(0.75, #2f2),
    color-stop(0.9, #ff2),
    color-stop(1, #f22));
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.bbcode-size {
  font-size: 16px;
  line-height: 1.5;
}
.bbcode-size[data-bbcode-size="1"] {
  font-size: 10px;
  line-height: 1;
}
.bbcode-size[data-bbcode-size="2"] {
  font-size: 14px;
  line-height: 1.2;
}
.bbcode-size[data-bbcode-size="3"] {
  font-size: 16px;
  line-height: 1.5;
}
.bbcode-size[data-bbcode-size="4"] {
  font-size: 18px;
  line-height: 1.5;
}
.bbcode-size[data-bbcode-size="5"] {
  font-size: 24px;
  line-height: 1.5;
}
.bbcode-size[data-bbcode-size="6"] {
  font-size: 32px;
}
.bbcode-size[data-bbcode-size="7"] {
  font-size: 48px;
  line-height: 1.2;
}
.bbcode-size[data-bbcode-size="z"] {
  font-size: 16px;
  line-height: 1;
}
.bbcode-font {
}
.bbcode-link {
}
.bbcode-link > a {
  color: #3c2;
}
a.bbcode.render-link {
  color: #3c2;
  text-decoration: underline dashed;
}
.bbcode-link > a:active,
.bbcode-link > a:focus,
.bbcode-link > a:hover {
  text-decoration: underline dashed;
}
.bbcode-img {
}
.bbcode-list {
  margin: 0;
  padding-left: 20px;
}
.bbcode-list-title {
  font-weight: bolder;
}
.bbcode-list-item {
  margin: 0;
  margin-left: 10px;
}
fieldset.bbcode-quote {
  border: 1px solid #ccc;
  background: #f7f7f7;
  font-weight: lighter;
  font-size: 14px;
  font-family: "微软雅黑", "Microsoft YaHei", arial, helvetica, sans-serif;
}
legent.bbcode-quote-title {
  font-size: 16px;
  font-style: italic;
  line-height: 1.2;
}
.bbcode-code,
.bbcode-pre,
.bbcode-noparse {
  color: #000;
  font-family: "Lucida Console", Monaco, "Courier New", Courier, monospace;
}
code {
  font-family: "Courier New", Courier, monospace;
}
.bbcode-pre {
  display: inline-block;
  border-radius: 4px;
  margin: 0;
  margin-left: 2px;
  margin-right: 2px;
  padding: 0;
  padding-left: 2px;
  padding-right: 2px;
  background-color: #f8f8f8;
  white-space: pre-line;
}
.bbcode-code {
  position: relative;
  border: 1px solid #ccc;
  border-top: 20px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  white-space: pre-wrap;
}
.bbcode-code::before,
.bbcode-code::after {
  content: "";
  diplay: block;
  clear: both;
}
.bbcode-code > code {
  font-weight: lighter;
  font-size: 14px;
  line-height: 1.2;
}
.bbcode-code > code::before {
  content: "\\01DD\\0070\\006F\\0254\\0020\\025F\\006F\\0020\\01DD\\0254\\01DD\\0131\\0064\\0020\\0250\\0020\\0073\\0131\\0020\\0073\\0131\\0265\\0287";
  display: block;
  position: absolute;
  top: -18px;
  right: 10px;
  color: #fff;
  font-weight: bolder;
  font-family: cursive;
}
.bbcode-siteurl {
  font-weight: bolder;
}
.bbcode-siteimg {
  display: inline-block;
}
  `;
};

const customStyle = (css) => {
  const style = document.createElement('style');
  style.type = 'text/css';

  if(style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
};
customStyle(initCustomCSS());

const loadStyle = (src) => {
  const link  = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = src;
  head.appendChild(link);
};
loadStyle('/css/user.css');

const getUrlParams = () => {
  const pl = /\+/g;
  const search = /([^&=]+)=?([^&]*)/g;
  const decode = (str) => decodeURIComponent(str.replace(pl, ' '));
  const query = window.location.search.substring(1);
  const urlParams = {};

  let match;
  while((match = search.exec(query))){
    urlParams[decode(match[1])] = decode(match[2]);
  }
  window.urlParams = urlParams;
};
getUrlParams();

const calcPageArr = (page, pages) => (pages === 1)
  ? [1]
  : [1, ...(page < 5 ? [] : [0]), ...[page - 2, page - 1, page, page + 1, page + 2].filter(p => p > 1 && p < pages), ...(page > pages - 4 ? [] : [0]), pages];

const emotionTable = [
  ['i_f', 'face', 2, n => n < 52 ? 'png' : 'gif'],
  ['bearchildren_', 'bearchildren', 2],
  ['tiexing_', 'tiexing', 2],
  ['yxj_', 'yxj', 3],
  ['ali_', 'ali', 3],
  ['llb_', 'luoluobu', 3],
  ['b', 'qpx_n', 2],
  ['xyj_', 'xyj', 3],
  ['ltn_', 'lt', 3],
  ['bfmn_', 'bfmn', 3],
  ['zxh_', 'pczxh', 3],
  ['t_', 'tsj', 4],
  ['wdj_', 'wdj', 2, () => 'png'],
  ['lxs_', 'lxs', 3],
  ['b_', 'baodong', 4],
  ['bd_', 'baodong_d', 4],
  ['B_', 'bobo', 4],
  ['yz_', 'shadow', 3],
];

const decodeEmotion = num => {
  if(+num < 1000) {
    return `/pic/smilies/${num}.gif`;
  }
  const idx = Math.floor(+num / 100) - 10;
  const off = +num - 1000 - idx * 100;
  const k = emotionTable[idx];
  const ext = k[3] ? k[3].call(null, off) : 'gif';
  const pad = `0000${off}`.substr(0 - k[2]);
  return `//tb2.bdstatic.com/tb/editor/images/${k[1]}/${k[0]}${pad}.${ext}`;
};

const listenerCreator = (root, selector, type, handle, force) => {
  Array.prototype.forEach.call(root.querySelectorAll(selector), (el) => {
    if(force || !el.dataset[type]) {
      el.addEventListener(type, handle);
    }
  });
};

const fakeFormSubmit = (url, options, method) => {
  const form = document.createElement('form');
  form.setAttribute('method', method ? method.toLowerCase() : 'post');
  form.setAttribute('action', url);
  form.classList.add('hide');

  Object.keys(options).forEach((name) => {
    const field = document.createElement('input');
    field.setAttribute('type', 'hidden');
    field.setAttribute('name', name);
    field.setAttribute('value', options[name]);
    form.appendChild(field);
  });

  body.appendChild(form);
  form.submit();
};

const ajaxFormSubmit = (url, options, method, cb) => {
  method = method.toUpperCase() === 'POST' ? 'POST' : 'GET';
  const data = options
    ? options instanceof Object
    ? Object.keys(options).map((name) => !name ? '' : (encodeURIComponent(name) + '=' + encodeURIComponent(options[name]))).filter((s) => !!s).join('&')
    : `${options}`
    : '';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', () =>
    (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 && cb(xhr.responseText, xhr.response))
  );
  if(method === 'POST') {
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  } else {
    xhr.open(method, data ? `${url}?${data}` : url);
    xhr.send();
  }
};

const ajaxMultipartSubmit = (url, data, cb, onprogress) => {
  const fd = new FormData();
  Object.keys(data).forEach(k => fd.append(k, data[k]));

  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', () =>
    (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 && cb(xhr.responseText, xhr.response))
  );
  xhr.upload.addEventListener('progress', (ev) => {
    if(ev.lengthComptable) {
      onprogress(ev);
    }
  });
  xhr.open('POST', url);
  // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
  xhr.send(fd);
};

const insertText = (selector) =>  (fn, that) => {
  const ta = document.querySelector(selector);

  if(ta.selectionStart && ta.selectionEnd) {
    const val = ta.value;
    const stt = ta.selectionStart;
    const end = ta.selectionEnd;
    let insertion = fn;
    if(fn instanceof Function) {
      insertion = fn.call(that, val, stt, end, ta);
    }
    if(insertion instanceof Function){
      return insertion.call(that, val, stt, end, ta);
    }

    ta.value = val.substr(0, stt) + insertion + val.substr(end);
    ta.selectionStart = stt + insertion.length;
    ta.selectionEnd = stt + insertion.length;
    ta.focus();
    return true;
  } else {
    ta.value += fn instanceof Function ? fn.call(that, 0, 0, '', ta) : fn;
    ta.focus();
    return true;
  }
};

const editorInsert = insertText('#quickreply');

const rGifts = /\[bonus\]([^\[]+)\[b_sp\](\d+)/g;
const rGift = /\[bonus\]([^\[]+)\[b_sp\](\d+)/;
const statiticsGifts = (str) => {
  let ms = str.match(rGifts);
  return ms
  ? ms.map((m) => m.match(rGift).slice(1))
  : [];
};

const rLinks = new RegExp('((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))', 'g');
// const rEmails = new RegExp('((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))', 'g');

const encUriChars = (str) => str.replace(/"/g, '%22').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');

const formatBBcode = (() => {
  const noConflict = `-z-${Date.now()}-`;

  const tags = {
    b: (_, content) => `<strong class="bbcode bbcode-b">${content}</strong>`,
    i: (_, content) => `<i class="bbcode bbcode-i">${content}</i>`,
    u: (_, content) => `<u class="bbcode bbcode-u">${content}</u>`,
    s: (_, content) => `<s class="bbcode bbcode-s">${content}</s>`,
    q: (_, content) => `<q class="bbcode bbcode-q">${content}</q>`,
    del: (_, content) => `<del class="bbcode bbcode-del">${content}</del>`,
    color(params, content) {
      let color = '', ms;
      if((ms = params.match(/(#([a-f0-9]{3}){1,2})$/i))) {
        color = ms[1] || '';
      } else if((ms = params.match(/^(\w+)/))) {
        color = ms[1] || '';
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
        if(!/\n/.test(content) && content.match(rLinks)) {
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
        // if(/(\n| )/.test(src) || !src.match(rLinks)) {
        if(/(\n| )/.test(src)) {
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
      return valid ? `<img class="bbcode bbcode-img" alt="${src}" src="${src}" onclick="javascript:window.open(this.src);">` : `<span class="bbcode bbcode-nopic">${src}</span>`;
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
      legend = `<legend class="bbcode bbcode-quote-title"> 引用: ${legend} </legend>`;
      return `<fieldset class="bbcode bbcode-quote">${legend}${content}</fieldset>`;
    },
    pre: (_, content) => `<pre class="bbcode bbcode-pre">${content}</pre>`,
    code: (params, content) => `<pre class="bbcode bbcode-code"><code class="${params || ''}">${content.replace(/(^(&#10;)+|(&#10;)+$)/g, '')}</code></pre>`,
    noparse: (_, content) => `<samp class="bbcode bbcode-noparse">${content}</samp>`,
    flash: () => '<em>暂时不支持flash插入</em>',
    flv: () => '<em>暂时不支持flv视频插入</em>',
    video: () => '<em>暂时不支持视频插入</em>',
    site: () => '<span class="bbcode bbcode-site"></span>',
    siteurl: () => '<span class="bbcode bbcode-siteurl">https://pt.hit.edu.cn</span>',
    siteimg: () => '<span class="bbcode bbcode-siteimg"><img src="/styles/login/logo.png"></span>',
  };

  const noparseTags = ['pre', 'code', 'noparse'];
  const closureTags = ['b', 'i', 'u', 's', 'q', 'del', 'color', 'size', 'font', 'url', 'img', 'list', 'li', 'quote', 'pre', 'code', 'noparse', 'flash', 'flv', 'video'];
  const singleTags = ['site', 'siteurl', 'siteimg', 'url', 'img', 'video'];

  const renderPlain = (str) => str ? str
    .replace(/&#91;/g, '[')
    .replace(/&#93;/g, ']')
    .replace(/\[em(\d+)\]/g, (em, num) => `<img class="bbocde emotion" src="${decodeEmotion(num)}" alt="${em}">`)
    .replace(/\n/g, '<br />')
    : '';

  const rDep = new RegExp(`(${noConflict})(\\d+)`);
  const rNoparseTags = new RegExp(`\\[(${noparseTags.join('|')})(\=[^\\]]*?)?\\]([\\S\\s]*?)\\[/\\1\\]`, 'gi');
  const rClosureTags = new RegExp(`\\[(${closureTags.join('|')})([ ,=][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]`, 'gi');
  const rSingleTags = new RegExp(`\\[(${singleTags.join('|')})([ ,=][^\\]]*?)?\\]`, 'gi');
  const rNotListTag = /\[(?!\*\]|list([ =][^\]]*)?\]|\/list\])/gi;
  const rListTag = /\[(?=list([ =][^\]]*)?\]|\/list\])/gi;

  const rNoTag = new RegExp(`\\[(?!\\/?(?:${singleTags.concat(closureTags).filter((v, i, arr) => (i === arr.indexOf(v))).concat('\\*').join('|')}))([^\\]]*?)\\]`, 'gi');

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

  const preprocessNoTag = (str) => str.replace(rNoTag, (_, m1) => `&#91;${m1}&#93;`);
  const preprocessNoparse = (str) => str.replace(rNoparseTags, (s, tag, params, content) => `[${tag}]${content.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;').replace(/\n/g, '&#10;')}[/${tag}]`);
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

  return (str) => renderPlain(processSingleTag(processClosureTag(preprocessSingleTag(preprocessClosureTag(preprocessList(preprocessNoparse(preprocessNoTag(str))))))));
})();

const exBBcode = (str) => {
  let res = str.replace(/\[bonus\][\S\s]+/, '')
    .replace(/&/g, '&amp;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\r\n|\r|\n/g, '\n');

  return formatBBcode(res);
};

const nativeTreeWalker = (root, walkerFunc) => {
  let walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false),
      node,
      textNodes = [];

  while((node = walker.nextNode())) {
    textNodes.push(node);
  }

  return textNodes.forEach(walkerFunc);
};

const renderLinks = (nodes) => {
  // TOO SLOW!!!
  Array.prototype.forEach.call(nodes, (node) => nativeTreeWalker(node, (textNode) => {
    const p = textNode.parentNode;
    if(p.tagName !== 'A') {
      const span = document.createElement('span');
      const text = textNode.nodeValue;
      // if(text.match(rLinks) || text.match(rEmails)) {
      if(text.match(rLinks)) {
        // span.innerHTML = text.replace(/</g, '&lt;'/* XSS */).replace(rLinks, (l) => `<a class="render-link" target="_blank" href="${l}">${l}</a>`).replace(rEmails, (m) => `<a class="render-mail" target="_top" href="mailto:${m}"><em>${m}</em></a>`);
        span.innerHTML = text.replace(/</g, '&lt;'/* XSS */).replace(rLinks, (l) => `<a class="bbcode render-link" target="_blank" href="${l}">${l}</a>`);
        p.insertBefore(span, textNode);
        p.removeChild(textNode);
      }
    }
  }));
};

const pageTopic = (data) => {
  const fixStyle = `
.bbcode-img {
  max-width: 900px;
  max-height: 600px;
}
  `;
  customStyle(fixStyle);

  const posts = data['forumsInfo'],
        users = data['posters'],
        me = data['me'],
        info = data['otherInfo'],
        sections = data['forumsPlates'],
        // addons = data['musicaddon'],
        topicid = info['topicid'] || window.urlParams['topicid'],
        forumid = info['forumid'] || window.urlParams['forumid'];

  const holder = document.getElementById('outer');
  holder.removeChild(holder.firstChild);
  // holder.innerHTML = '';
  holder.id = 'content-holder';

  /// Display
  const link0 = `/forums.php?action=viewforum&forumid=${info['forumid']}`,
        link = `/forums.php?action=viewtopic&topicid=${topicid}&page=`;

  let cTitleLine, cPagination, cOperateArea, cReplyArea, cContent, cPost, cGifts,
      cEmotionSelection, cImageInsertion,
      repeatPage, repeatSection, repeatColor;

  cTitleLine = () => {
    const container = document.createElement('header');
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
<button class="op-button sticky">${info['sticky'] === 'yes' ? '取消置顶' : '置顶'}</button>
<button class="op-button lock">${info['locked'] === 'yes' ? '取消锁定' : '锁定'}</button>
<button class="op-button delete">删除</button>
<select class="op-select moveto" name="moveto">
  <option value="" hidden />
  ${repeatSection()}
</select>
<button class="op-button moveto">移动</button>
<select class="op-select hl" name="hl">${repeatColor()}</select>
<button class="op-button hl">高亮</button>
  `;

  repeatPage = (cur, page) => calcPageArr(cur, page).map((p) => p
    ? (p === cur)
    ? `<li class="item"><a class="f-link current active" href="#">${p}</a>`
    : `<li class="item"><a class="f-link" href="${link + (p - 1)}">${p}</a>`
    : '<li class="item"><span>...</span></li>'
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

  cPost = (post) => {
    const user = users[post['posterid']] && users[post['posterid']].username
     ? users[post['posterid']] : {
      avatar: 'pic/default_avatar.png',
      id: 0,
      username: '(该用户不存在)',
      title: '',
      class: 0,
      uploaded: '0.00KB',
      downloaded: '0.00KB',
      ratio: 0,
      enabled: 'no',
      modifier: 'no',
    };
    const gifts = statiticsGifts(post['body']);
    const giftAmount = gifts.reduce((amount, gift) => (amount + (+gift[1])), 0);

    const container = document.createElement('div');
    container.className = 'post-holder';
    container.id = `pid${post['postid']}`;
    container.innerHTML = `
<div class="line">
  <div class="item post-left">
    <div class="postid">
      <a class="t-link" href="#pid${post['postid']}">${post['floor']}楼#${post['postid']}</a>
    </div>
    <div class="t-avatar">
      <img src="/${user['avatar']}" alt="avatar"/>
    </div>
    <div class="post-time">${post['added'].match(/</) ? post['added'] : post['added'].trim().replace(/\s+/, '<br />')}</div>
  </div>
  <div class="space">
    <div class="line user-info">
      <div class="item">
        <span class="user-info username${user['enabled'] === 'yes' ? '' : ' dead'}" title="${user['username']}"><a target="_blank" class="user_link UC_${user['class']}" href="/userdetails.php?id=${user['id']}">${user['username']}</a></span>
        <span class="user-info donor${user['donor'] === 'yes' ? ' active' : ''}"><img src="/pic/trans.gif" alt="Donor"></span>
        <span class="user-info warned${user['warned'] === 'yes' ? ' active' : ''}"><img src="/pic/trans.gif" alt="Warned"></span>
        <span class="user-info title" title="${user['title']}"><i class="UC_${user['class']}">${user['title']}</i></span>
        <span class="user-info ratio${(user['leechwarn'] === 'yes' || (user['ratio'] < 1 && +user['ratio'] !== 0)) ? ' warning' : ''}"><span>${+user['ratio'] === 0 ? '+∞' : user['ratio']}</span>=<span>${user['uploaded'].replace(/\s/g, '')}</span>/<span>${user['downloaded'].replace(/\s/g, '')}</span></span>
        <span class="user-info posts" ${user['title'].length > 15 ? 'style="display: none;"' : ''}>发帖:${user['forumposts']}</span>
      </div>
      <div id="gift-pid${post['postid']}" class="space gift-result">
        <span class="gift-amount">+<span>${giftAmount}</span> 魔力</span>
        ${cGifts(gifts)}
      </div>
      <div class="item post-action">
        ${info['locked'] === 'yes' ? '' : '<button class="post-action reply" data-floor="' + post['floor'] + '" data-poster="' + user['username'] + '">回复</button>'}
        ${info['locked'] === 'yes' ? '' : '<button class="post-action quote" data-post="' + post['postid'] + '">引用</button>'}
        ${me['modifier'] === 'yes' ? ('<button class="post-action delete" data-post="' + post['postid'] + '">删除</button>') : ''}
        ${(me['modifier'] === 'yes' || post['posterid'] === me['id']) ? ('<button class="post-action edit" data-post="' + post['postid'] + '">编辑</button>') : ''}
        <button class="post-action like${post['i_liked'] === 0 ? '' : ' liked'}" data-post="${post['postid']}"><span class="liked">${post['total_like']}</span> 赞</button>
        ${post['posterid'] === me['id'] ? '' : '<button class="post-action give" data-bonus="100" data-user="' + post['posterid'] + '" data-post="' + post['postid'] + '">100</button>'}
        ${post['posterid'] === me['id'] ? '' : '<button class="post-action give" data-bonus="1000" data-user="' + post['posterid'] + '" data-post="' + post['postid'] + '">1000</button>'}
        ${post['posterid'] === me['id'] ? '' : '<button class="post-action give" data-bonus="10000" data-user="' + post['posterid'] + '" data-post="' + post['postid'] + '">10000</button>'}
      </div>
    </div>
    <div class="content-body">
      ${exBBcode(post['body'])}
    </div>
  </div>
</div>
    `;
    return container;
  };

  cContent = () => {
    const container = document.createElement('section');
    container.className = 'content-section';
    posts.map(cPost).forEach(el => container.appendChild(el));

    return container;
  };

  cEmotionSelection = () => {
    const emotionList = [
        1,  8, 28, 29, 30,  7,  9,
        2,  3,  4,  5,  6, 48, 49,
       10, 11, 12, 13, 15, 17, 18,
       19, 21, 22, 25, 26, 62, 63,
       27, 35, 36, 38, 39, 40, 56,
       41, 42, 44, 45, 46, 57, 58,
       50, 51, 52, 53, 55, 59, 60,
       61, 64, 65, 66, 77,136,183,
      121,122,125,132,
    ];

    const container = document.createElement('div');
    container.className = 'emotion-selection';
    emotionList.forEach((num) => {
      const el = document.createElement('div');
      el.className = 'emotion-option';

      const img = document.createElement('img');
      img.src = decodeEmotion(num);
      img.className = 'insert-ico emotion';
      img.title = `[em${num}]`;
      img.alt = `[em${num}]`;

      el.appendChild(img);
      container.appendChild(el);
    });

    return container;
  };

  cImageInsertion = () => {
    const container = document.createElement('div');
    container.className = 'image-insertion';

    container.innerHTML = `
<div class="line">
  <div class="space">
    <input type="text" class="image-url" name="image-url" style="width: 100%" />
  </div>
  <div class="item" style="padding-left: 20px;">
    <button class="op-button image-insert">插入图片</button>
  </div>
</div>
<div class="line">
  <div class="space">
    <progress class="image-upload" max="100" value="0"></progress>
  </div>
  <div class="item" style="padding-left: 20px;">
    <button class="op-button image-upload">上传图片</button>
  </div>
</div>
<div style="display: none;">
  <input type="file" name="image-file" />
</div>
    `;

    return container;
  };

  cReplyArea = () => {
    const container = document.createElement('footer');
    container.className = 'reply-section';
    container.innerHTML = info['locked'] === 'no' ? `
<div class="holder line">
  <div class="item" style="width: 71px">
    <ul class="reply-functions">
      <li>
        <input type="radio" name="functions" id="functions-icons" value="icons" checked="checked" />
        <label for="functions-icons">表 情</label>
      </li>
      <li>
        <input type="radio" name="functions" id="functions-image" value="image" />
        <label for="functions-image">图 片</label>
      </li>
    </ul>
    <div class="reply-button">
      <button class="op-button">快速回复</button>
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
    <div class="function-panels">
      <div class="icons-area active" data-panel="icons"></div>
      <div class="image-area" data-panel="image"></div>
    </div>
  </div>
</div>
    ` : '<div class="holder line"><center><i>该主题已被锁定</i></center></div>';

    return container;
  };

  ///re-render
  const renderPages = () => {
    Array.prototype.forEach.call(holder.querySelectorAll('a.f-link[href="#"]'), (el) => {
      el.setAttribute('disabled', 'disabled');
      el.addEventListener('click', (ev) => ev.preventDefault());
    });
  };

  /// Event Listener
  const path = location.pathname,
        href = location.href;
  const handleManage = () => {
    holder.querySelector('.operate-expand').classList.toggle('active');
  };
  const handleSticky = () => fakeFormSubmit(path, {
    action: 'setsticky',
    topicid,
    sticky: (info['sticky'] === 'yes') ? 'no' : 'yes',
    returnto: href,
  });
  const handleLock = () => fakeFormSubmit(path, {
    action: 'setlocked',
    topicid,
    locked: (info['locked'] === 'yes') ? 'no' : 'yes',
    returnto: href,
  });
  const handleDelete = () => {
    if(parseInt(forumid, 10) !== 35) {
      fakeFormSubmit(path, {
        action: 'movetopic',
        topicid,
        forumid: 35,
      });
    }
    // fakeFormSubmit(path, {
    //   action: 'deletetopic',
    //   topicid,
    //   forumid,
    // });
  };

  const handleMoveto = () => {
    const sel = holder.querySelector('select[name="moveto"]');
    if(sel && sel.value) {
      fakeFormSubmit(path, {
        action: 'movetopic',
        topicid,
        forumid: sel.value,
      });
    }
  };
  const handleHightlight = () => {
    const sel = holder.querySelector('select[name="hl"]');
    if(sel && sel.value) {
      fakeFormSubmit(path, {
        action: 'hltopic',
        topicid,
        color: sel.value,
        returnto: href,
      });
    }
  };

  const handleReply = (ev) => {
    const area = document.getElementById('quickreply');
    const floor = ev.target.dataset.floor;
    const user = ev.target.dataset.poster;
    if(area && floor) {
      // TODO: link to floor
      area.value = `回复 ${floor} 楼 [@${user}] : ${area.value}`;
      area.scrollIntoView(false);
    }
  };
  const handleQuote = (ev) => {
    const postid = ev.target.dataset.post;
    if(postid) {
      fakeFormSubmit(path, {
        action: 'quotepost',
        postid,
      }, 'get');
    }
  };
  const handleDeletePost = (ev) => {
    const postid = ev.target.dataset.post;
    if(postid) {
      fakeFormSubmit(path, {
        action: 'deletepost',
        postid,
      }, 'get');
    }
  };
  const handleEdit = (ev) => {
    const postid = ev.target.dataset.post;
    if(postid) {
      fakeFormSubmit(path, {
        action: 'editpost',
        postid,
      }, 'get');
    }
  };
  const handleLike = (ev) => {
    let el = ev.target;
    while(el.classList && !el.classList.contains('like')) el = el.parentNode;
    if(el.classList && el.classList.contains('like')) {
      const id = el.dataset.post;
      const cntEl = el.querySelector('.liked');
      if(id && cntEl) {
        const cnt = parseInt(cntEl.innerHTML, 10);
        if(el.classList.contains('i_liked')) {
          ajaxFormSubmit('/bonus.php', {
            type: 'like',
            id,
            bonus: 100,
            cancel: 'yes',
          }, 'POST', () => {
            cntEl.innerHTML = cnt - 1;
            el.classList.remove('i_liked');
          });
        } else {
          ajaxFormSubmit('/bonus.php', {
            type: 'like',
            id,
            bonus: 100,
          }, 'POST', () => {
            cntEl.innerHTML = cnt + 1;
            el.classList.add('i_liked');
          });
        }
      }
    }
  };
  const handleGive = (ev) => {
    const amount = parseInt(me['seedbonus'], 10);
    const id = ev.target.dataset.post;
    const bonus = ev.target.dataset.bonus;
    if(amount > 0 && id && bonus && parseInt(bonus, 10) < amount) {
      ajaxFormSubmit('/bonus.php', {
        type: 'post',
        id,
        bonus,
      }, 'POST', () => {
        const gift = document.getElementById(`gift-pid${id}`);
        const el = gift.querySelector('.gift-amount > span');
        const pos = gift.getElementsByTagName('tbody')[0];
        if(el && pos) {
           const tr = document.createElement('tr');
           const tdGiver = document.createElement('td');
           const tdBonus = document.createElement('td');
           tdGiver.className = 'giver';
           tdBonus.className = 'bonus';
           tdGiver.innerHTML = me['username'];
           tdBonus.innerHTML = bonus;
           tr.appendChild(tdGiver);
           tr.appendChild(tdBonus);
           pos.appendChild(tr);

           const old = parseInt(el.innerHTML, 10);
           el.innerHTML = old + parseInt(bonus, 10);

           gift.dispatchEvent(new MouseEvent('mouseenter', {
             view: window,
             bubbles: false,
           }));
           setTimeout(() => {
             gift.dispatchEvent(new MouseEvent('mouseleave', {
              view: window,
              bubbles: false,
            }));
           }, 1500);
        }
      });
    }
  };

  const handleBonusDedailsShow = (ev) => {
    let el = ev.target;
    while(el && el.classList && el.classList.contains('gift-result')) el = el.parentNode;
    el.querySelector('.gifts-list').classList.add('show');
  };
  const handleBonusDedailsHide = (ev) => {
    let el = ev.target;
    while(el && el.classList && el.classList.contains('gift-result')) el = el.parentNode;
    el.querySelector('.gifts-list').classList.remove('show');
  };

  const handleUserPop = () => {};

  const handleQuickReply = () => {
    const ta = holder.querySelector('textarea#quickreply');
    const reply = ta.value.trim();

    if(reply) {
      ta.value = '';

      ajaxFormSubmit('/forums_no_fresh.php', {
        body: reply,
        topicid,
        forumid,
      }, 'POST', (resp) => {
        let data;
        try {
          data = JSON.parse(resp);
        } catch(e) {
          alert(e);
          console.error(e);
          throw e;
        }
        if(data.state === 'success') {
          const uid = data['id'];
          if(!users[uid]) {
            users[uid] = {
              id: uid,
              username: data['username'],
              class: data['class'],
              donor: me['donor'],
              enabled: 'yes',
              warned: me['warned'],
              avatar: data['avatar'],
              ratio: data['ratio'],
              uploaded: data['uploaded'],
              downloaded: data['downloaded'],
              seedbonus: data['seedbonus'],
              signature: data['signature'],
              title: me['title'],
              forumposts: data['forumposts'],
            };
          }

          const post = {
            postid: data['postid'],
            posterid: uid,
            body: data['body'],
            floor: data['counter'],
            added: data['added'],
            i_liked: 0,
            total_like: 0,
          };
          posts.push(post);

          const node = cPost(post);
          holder.querySelector('.content-section').appendChild(node);
          // bind listener
          bindPostListener();
        } else {
          ta.value = reply;
          alert(data.stateMessage);
        }

      });
    }
  };
  const handleQuickReplyEnter = (ev) => {
    const code = ev.which || ev.keyCode;
    if(ev.ctrlKey && code === 13) {
      handleQuickReply();
    }
  };

  const handleInsertImage = () => {};
  const handleInsertEmotion = (ev) => {
    editorInsert(` ${ev.target.alt} `);
  };

  const handleSelectFunctionPanel = (ev) => {
    const panels = holder.querySelectorAll('.function-panels > div');
    const val = ev.target.value;

    Array.prototype.forEach.call(panels, (panel) => {
      if (panel.dataset.panel === val) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  };

  const handleInsertImageUrl = () => {
    const input = holder.querySelector('input.image-url');
    editorInsert(` [img]${input.value.trim()}[/img] `);
    input.value = '';
  };
  const handleInsertImageUrlEnter = (ev) => {
    const code = ev.which || ev.keyCode;
    if(ev.ctrlKey && code === 13) {
      handleInsertImageUrl();
    }
  };

  const handleUploadImageFile = () => {
    const input = holder.querySelector('input[name="image-file"]');
    if(input.files[0]) {
      const progressbar = holder.querySelector('progress.image-upload');
      const data = {
        file: input.files[0],
        Token: '67a71cae3f5ebf5de1ae72a26e854ef86d7c85a6:eXVvT3RWM3VuSnNCVlBWQzlpLXAxZkt5T1RvPQ==:eyJkZWFkbGluZSI6MTQ0MjQwOTExMSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiMTE4MTQiLCJhaWQiOiIyOTU3MCJ9',
      };

      progressbar.value = 0;
      const onprogress = (ev) => {
        progressbar.value = Math.floor(ev.loaded / ev.total * 100);
      };
      const fouthUpload = () => {
        ajaxMultipartSubmit('http://up.imgapi.com/', data, (res) => {
          let d = {};
          try {
            d = JSON.parse(res);
          } catch(e) {
            d = { error: 'error' };
          }
          progressbar.value = 0;
          if(!d.error && d.linkurl) {
            input.value = '';
            editorInsert(` [img]${d.linkurl}[/img] `);
          } else {
            alert('上传失败');
          }
        }, onprogress);
      };
      const thirdUpload = () => {
        ajaxMultipartSubmit('http://up.tietuku.cn/', data, (res) => {
          let d = {};
          try {
            d = JSON.parse(res);
          } catch(e) {
            d = { error: 'error' };
          }
          progressbar.value = 0;
          if(!d.error && d.linkurl) {
            input.value = '';
            editorInsert(` [img]${d.linkurl}[/img] `);
          } else {
            fouthUpload();
          }
        }, onprogress);
      };
      const secondUpload = () => {
        ajaxMultipartSubmit('/ciar/sendtotietuku.php', data, (res) => {
          progressbar.value = 0;
          if(res) {
            input.value = '';
            editorInsert(` [img]${res}[/img] `);
          } else {
            thirdUpload();
          }
        }, onprogress);
      };
      const firstUpload = () => {
        ajaxMultipartSubmit('//hitptimg.online/takefile_v2.php', data, (res) => {
          let d = {};
          try {
            d = JSON.parse(res);
          } catch(e) {
            d = { error: 'error' };
          }
          progressbar.value = 0;
          if(!d.error && d.linkurl) {
            input.value = '';
            editorInsert(` [img]${d.linkurl}[/img] `);
          } else {
            secondUpload();
          }
        }, onprogress);
      };

      firstUpload();
    }
  };
  const handleUploadImageFileTrigger = () => {
    const input = holder.querySelector('input[name="image-file"]');
    input.click();
  };

  /// page render
  holder.appendChild(cTitleLine());
  holder.appendChild(cContent());
  holder.appendChild(cReplyArea());

  holder.querySelector('.icons-area').appendChild(cEmotionSelection());
  holder.querySelector('.image-area').appendChild(cImageInsertion());

  setTimeout(() => renderLinks(holder.querySelectorAll('.content-body')), 0);
  setTimeout(() => renderPages());

  const bindOplistener = () => {
    listenerCreator(holder, '.operate-shrink > .op-button', 'click', handleManage);
    listenerCreator(holder, '.op-button.sticky', 'click', handleSticky);
    listenerCreator(holder, '.op-button.lock', 'click', handleLock);
    listenerCreator(holder, '.op-button.delete', 'click', handleDelete);
    listenerCreator(holder, '.op-button.moveto', 'click', handleMoveto);
    listenerCreator(holder, '.op-button.hl', 'click', handleHightlight);
  };

  const bindPostListener = () => {
    listenerCreator(holder, '.post-action.reply', 'click', handleReply);
    listenerCreator(holder, '.post-action.quote', 'click', handleQuote);
    listenerCreator(holder, '.post-action.delete', 'click', handleDeletePost);
    listenerCreator(holder, '.post-action.edit', 'click', handleEdit);
    listenerCreator(holder, '.post-action.like', 'click', handleLike);
    listenerCreator(holder, '.post-action.give', 'click', handleGive);

    listenerCreator(holder, '.gift-result', 'mouseenter', handleBonusDedailsShow);
    listenerCreator(holder, '.gift-result', 'mouseleave', handleBonusDedailsHide);

    listenerCreator(holder, '.t-avatar', 'mouseenter', handleUserPop);
  };

  const bindReplyListener = () => {
    listenerCreator(holder, '.reply-button', 'click', handleQuickReply);
    listenerCreator(holder, '#quickreply', 'keydown', handleQuickReplyEnter);

    listenerCreator(holder, 'input[name="functions"]', 'change', handleSelectFunctionPanel);
    listenerCreator(holder, '.insert-ico.emotion', 'click', handleInsertEmotion);
    listenerCreator(holder, '.insert-button.image', 'click', handleInsertImage);

    listenerCreator(holder, '.image-insert', 'click', handleInsertImageUrl);
    listenerCreator(holder, 'input.image-url', 'keydown', handleInsertImageUrlEnter);

    listenerCreator(holder, 'button.image-upload', 'click', handleUploadImageFileTrigger);
    listenerCreator(holder, 'input[name="image-file"]', 'change', handleUploadImageFile);
  };

  bindOplistener();
  bindPostListener();
  bindReplyListener();
};

const pageForum = (data) => {

};

const reRenderPage = () => {
  const ori = window.passToClient
  const urlParams = window.urlParams,
        data = typeof ori === 'string' ? JSON.parse(ori) : ori;
  console.info(urlParams, data);

  switch(urlParams['action']){
    case 'viewtopic': pageTopic(data); break;
    case 'viewforum': pageForum(data); break;
  }
};

reRenderPage();

})();