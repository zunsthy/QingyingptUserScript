// ==UserScript==
// @id          Qptuserscript_Copy
// @name        QptUserScript Copy
// @author      ZunSThy <zunsthy@gmail.com>
// @version     0.1.822.1010
// @namespace   https://github.com/zunsthy/QingyingptUserScript
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Copy.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Copy.user.js
// @description nothing useful
// @match       http://pt.hit.edu.cn/forums.php?action=viewtopic*
// @match       https://pt.hit.edu.cn/forums.php?action=viewtopic*
// @include     http://pt.hit.edu.cn/forums.php?action=viewtopic*
// @include     https://pt.hit.edu.cn/forums.php?action=viewtopic*
// @grant       none
// ==/UserScript==

let prefix = 'qpt',
		ver = '0.1.822.1010';

let rEmail = /[\w-\.]{1,250}@(\w+\.)+[a-zA-Z]{2,4}/g;


let body = document.body || document.getElementsByTagName('body')[0]; // ??

function customStyle(){
	let css = `
textarea.${prefix}-copy-textarea {
	border: 0;
	padding: 0;
	margin: 0;
	clip: rect(0, 0, 0, 0);

	postion: absolute;
	top: -9999px;
	left: -9999px;
}

span.${prefix}-email-text {
	postion: relative;
	cursor: pointer;

	color: #909090;
	text-decoration-line: underline;
	text-decoration-style: dashed;
	text-decoration-color: #adadad;
}
span.${prefix}-email-text:hover {
	color: #707070;
	text-decoration-style: solid;
}

div.${prefix}-copied-tooltip {
	position: fixed;
	display: block;

	padding: 5px;
	background-color: #777;
	opacity: .7;

	color: #f0f0f0;
	font-size: 12.5px;

	border-radius: 6px;
}
	`;

	let head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

	style.type = 'text/css';
	if(style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

/// http://stackoverflow.com/questions/2579666/getelementsbytagname-equivalent-for-textnodes
function nativeTreeWalker(){
	let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false),
			node,
			textNodes = [];

	while(node = walker.nextNode()){
		textNodes.push(node);
	}

	return textNodes;
}

function copyText(text){
	let result = false,
			area = document.createElement('textarea');

	area.setAttribute('readOnly', '');
	area.className = `${prefix}-copy-textarea`;
	area.value = text;

	body.insertBefore(area, document.body.firstChild);

	// select and copy text
	area.select();
	result = document.execCommand('copy');

	window.getSelection().removeAllRanges();
	body.removeChild(area);

	return result;
}

function replaceEmail(node){
	if(rEmail.test(node.nodeValue)){
		let p = node.parentNode,
				span = document.createElement('span');
		span.innerHTML = node.nodeValue.replace(rEmail, (m) => `<span class="${prefix}-email-text">${m}</span>`);
		p.insertBefore(span, node);
		p.removeChild(node);

		// add click listener
		Array.prototype.forEach.call(span.getElementsByTagName('span'), (ele) => {
			ele.dataset['copyText'] = ele.innerHTML;
			ele.addEventListener('click', clickCopyHandle);
		});
	};
}

function clickCopyHandle(e){
	let text = 'Copied';

	let tooltip = document.createElement('div');
	tooltip.className = `${prefix}-copied-tooltip`;
	if(copyText(e.target.dataset['copyText'])){
		// success
	} else {
		// error info
	}
	let x = e.clientX + 10, y = e.clientY + 10;
	tooltip.style.left = x + 'px';
	tooltip.style.top = y + 'px';
	tooltip.innerHTML = text;

	body.appendChild(tooltip);

	let o = 60;
	function step(){
		if(o > 10){
			o--;
			tooltip.style.opacity = '0.' + o;
			window.requestAnimationFrame(step);
		} else {
			// tooltip.style.opacity = '0';
			tooltip.style.display = 'none';
			body.removeChild(tooltip);
		}
	}
	window.requestAnimationFrame(step);
}


function init(){
	customStyle();

	setTimeout(() => {
		let nodes = nativeTreeWalker();
		nodes.forEach(replaceEmail);
	}, 600);
}

init();
