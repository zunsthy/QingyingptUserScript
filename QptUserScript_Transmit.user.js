// ==UserScript==
// @id          Qptuserscript_Transmit
// @name        QptUserScript Transmit
// @author      ZunSThy <zunsthy@gmail.com>
// @version     0.5.8.310.2323
// @namespace   https://github.com/zunsthy/QingyingptUserScript
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Transmit.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Transmit.user.js
// @description nothing useful
// @domain      pt.hit.edu.cn
// @match       http://pt.hit.edu.cn/edit.php*
// @match       http://pt.hit.edu.cn/upload.php
// @match       http://pt.hit.edu.cn/uploadnew.php
// @match       https://pt.hit.edu.cn/edit.php*
// @match       https://pt.hit.edu.cn/upload.php
// @match       https://pt.hit.edu.cn/uploadnew.php
// @include     http://pt.hit.edu.cn/edit.php*
// @include     http://pt.hit.edu.cn/upload.php
// @include     http://pt.hit.edu.cn/uploadnew.php
// @include     https://pt.hit.edu.cn/edit.php*
// @include     https://pt.hit.edu.cn/upload.php
// @include     https://pt.hit.edu.cn/uploadnew.php
// @connect     *
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var ver = "0.5.7.310.2323";

// Powered by Mort(5787) & ZunSThy(1788)
// Thanks for Mort2000@FDUPT
// 希望使用清影腳本或樣式代碼的網站或個人標明出自ZunSThy@清影PT

// Code From http://seabreezecomputers.com
var a=Array;fontlist=new a(50);fontclose=new a(50);anchorlist=new a(50);textarealist=new a(20);
function b(h){var i=0;var j=0;var k;var l;var m;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<FONT",l);if(l!=-1){k=h.indexOf(">",l);fontlist[i]=new a(0,0,0,0,0);fontlist[i].pos=l;fontlist[i].font=1;m=h.substring(l,k);if(m.search(/FACE/)!=-1)fontlist[i].face=1;else fontlist[i].face=0;if(m.search(/SIZE/)!=-1)fontlist[i].size=1;else fontlist[i].size=0;if(m.search(/COLOR/)!=-1)fontlist[i].color=1;else fontlist[i].color=0;l++;i++}};for(l=0;l!=-1;l){l=h.indexOf("</FONT>",l++);if(l!=-1){fontclose[j]=new a(0,0,0,0,0);fontclose[j].pos=l;fontclose[j].font=1;for(ii=i-1;ii>=0;ii--){if(fontlist[ii].pos<l){if(fontlist[ii].font==1){fontlist[ii].font=0;fontclose[j].color=fontlist[ii].color;fontclose[j].size=fontlist[ii].size;fontclose[j].face=fontlist[ii].face;ii=-1}}};l++;j++}else{fontclose[j]=new a(0,0,0,0,0);fontclose[j].font=0}}};
function c(h){var i=0;var j=0;var k;var l;var m;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<A HREF",l);if(l!=-1){k=h.indexOf(">",l);anchorlist[i]=new a(0,0,0,0,0);anchorlist[i].font=1;m=h.substring(l,k);if(m.search(/MAILTO:/)!=-1){m=m.replace(/<A HREF=MAILTO:/,"");m=m.replace(/\"/,"");m=m.replace(/\'/,"");anchorlist[i].pos=1;m=m.toLowerCase();anchorlist[i].face=m}else{anchorlist[i].pos=2};l++;i++}else{anchorlist[i]=new a(0,0,0,0,0);anchorlist[i].pos=0}}};
function d(h){var i=0;var j=0;var k;var l;textareatext=h;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<TEXTAREA",l);if(l!=-1){k=h.indexOf(">",l);l=h.indexOf("</TEXTAREA>",k);if(l!=-1){textarealist[i]=new a(0,0,0,0,0);textarealist[i].face=textareatext.substring(k+1,l);textarealist[i].pos=1};l++;i++}else{textarealist[i]=new a(0,0,0,0,0);textarealist[i].pos=0}}};
function e(h){var j='bbcode';var k="code";var l="code";var m="code";b(h);h=h.replace(/<SCRIPT[^>]*>/gi,"<TEXTAREA>");h=h.replace(/<\/SCRIPT>/gi,"</TEXTAREA>");d(h);h=h.replace(/ = /gi,"=");h=h.replace(/=\"/gi,"=");h=h.replace(/=\'/gi,"=");h=h.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi,"[img]$1[\/img]");h=h.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi,"[img]$1[\/img]");h=h.replace(/<param name=movie[^>]*value=/gi,"<movie=");h=h.replace(/\s+BORDER=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+TARGET=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+CLASSID=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+ID=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+NAME=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+STYLE=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+CLASS=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+ALT=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+TITLE=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+REL=[^\'\">]*[\'\">]/gi,"");h=h.replace(/\s+ONCLICK=[^\'\">]*[\'\">]/gi,"");h=h.replace(/<A\s*HREF/i,"<A HREF");c(h);h=h.replace(/<BR>/gi,"\r");h=h.replace(/<BR(.*?)\/>/gi,"\r");h=h.replace(/<P>/gi,"\r");h=h.replace(/<P [^>]*>/gi,"\r");h=h.replace(/<CODE>/gi,"[code]");h=h.replace(/<\/CODE>/gi,"[/code]");h=h.replace(/<BLOCKQUOTE>/gi,"[quote]");h=h.replace(/<\/BLOCKQUOTE>/gi,"[/quote]");h=h.replace(/<UL[^>]*>/gi,"[list]");h=h.replace(/<\/UL>/gi,"[/list]");h=h.replace(/<OL[^>]*>/gi,"[list=1]");h=h.replace(/<\/OL>/gi,"[/list]");h=h.replace(/<LI>/gi,"[*]");h=h.replace(/<BIG>/gi,"[b]");h=h.replace(/<\/BIG>/gi,"[/b]");h=h.replace(/<B>/gi,"[b]");h=h.replace(/<\/B>/gi,"[/b]");h=h.replace(/<U>/gi,"[u]");h=h.replace(/<\/U>/gi,"[/u]");h=h.replace(/<I>/gi,"[i]");h=h.replace(/<\/I>/gi,"[/i]");h=h.replace(/<EM>/gi,"[i]");h=h.replace(/<\/EM>/gi,"[/i]");h=h.replace(/<h\d>/gi,"\r[b]");h=h.replace(/<\/h\d>/gi,"[/b]");h=h.replace(/ /gi," ");h=h.replace(/<FONT Face[^\'\">]*[\'\">]/gi,"<FONT");h=h.replace(/ FACE=[^\'\"]*[\'\"]/gi,"");h=h.replace(/<FONT Face/gi,"[font");h=h.replace(/ Face=/gi,"][font=");h=h.replace(/<STRONG>/gi,"[b]");h=h.replace(/<\/STRONG>/gi,"[/b]");h=h.replace(/<TR[^>]*>/gi," ");h=h.replace(/<TD[^>]*>/gi," ");h=h.replace(/<TH[^>]*>/gi," ");h=h.replace(/<\/TR>/gi," ");h=h.replace(/<\/TD>/gi," ");h=h.replace(/<\/TH>/gi," ");h=h.replace(/<FONT SIZE=/gi,"[size=");h=h.replace(/<FONT color=/gi,"[color=");h=h.replace(/ color=/gi,"][color=");h=h.replace(/ size=/gi,"][size=");var n;for(i=0;fontclose[i].font!=0;i++){n="";if(fontclose[i].color==1)n=n+"[/color]";if(fontclose[i].size==1)n=n+"[/size]";if(j=="smf"||j=="vbcode"||j=="ipb")if(fontclose[i].face==1)n=n+"[/font]";h=h.replace(/<\/FONT>/i,n)};for(i=0;anchorlist[i].pos!=0;i++){if(anchorlist[i].pos==2){h=h.replace(/<A HREF/i,"[url");h=h.replace(/<\/A>/i,"[/url]")};if(anchorlist[i].pos==1){if(j=="bbcode")h=h.replace(/<A HREF[^<]*<\/A>/i,anchorlist[i].face);else{h=h.replace(/<A HREF=MAILTO:/i,"[email=");h=h.replace(/<\/A>/i,"[/email]")}}};h=h.replace(/<[^>]*>/g,"");h=h.replace(/>/g,"]");h=h.replace(/\'>/g,"]");h=h.replace(/\">/g,"]");h=h.replace(/\']/g,"]");h=h.replace(/\"]/g,"]");for(i=0;textarealist[i].pos!=0;i++){if(textarealist[i].pos==1){if(k=="php")h=h.replace(/\[code1\][\w\W]*?\[\/code1\]/i,"[php]"+textarealist[i].face+"[/php]");if(k=="code")h=h.replace(/\[code1\][\w\W]*?\[\/code1\]/i,"[code]"+textarealist[i].face+"[/code]");if(k=="html")h=h.replace(/\[code1\][\w\W]*?\[\/code1\]/i,"[html]"+textarealist[i].face+"[/html]");if(m=="sql")h=h.replace(/\[code3\][\w\W]*?\[\/code3\]/i,"[sql]"+textarealist[i].face+"[/sql]");if(m=="code")h=h.replace(/\[code3\][\w\W]*?\[\/code3\]/i,"[code]"+textarealist[i].face+"[/code]");if(m=="html")h=h.replace(/\[code3\][\w\W]*?\[\/code3\]/i,"[html]"+textarealist[i].face+"[/html]");if(m=="php")h=h.replace(/\[code3\][\w\W]*?\[\/code3\]/i,"[php]"+textarealist[i].face+"[/php]");if(m=="xml")h=h.replace(/\[code3\][\w\W]*?\[\/code3\]/i,"[xml]"+textarealist[i].face+"[/xml]");if(l=="code")h=h.replace(/\[code4\][\w\W]*?\[\/code4\]/i,"[code]"+textarealist[i].face+"[/code]");if(l=="php")h=h.replace(/\[code4\][\w\W]*?\[\/code4\]/i,"[php]"+textarealist[i].face+"[/php]");h=h.replace(/\[code2\][\w\W]*?\[\/code2\]/i,"[code]"+textarealist[i].face+"[/code]")}};h=h.replace(/[\r\n]{3,}/g,"\r\r");return h};
// End


var htmlspecialchars = {
	'lt': '<',
	'gt': '>',
	'nbsp': ' ',
	'amp': '&',
	'quot': '"',
	'mdash': '—'
};

String.prototype.hsc_decode = function(){
	return this.replace(/&([a-z#0-9]+);/g, function(m, p1){
		return htmlspecialchars[p1];
	});
};

String.prototype.spaces2space = function(){
	return this.replace(/\s+/, " ");
};

function eventTrigger(sel, type){
	var event = document.createEvent("HTMLEvents");
	event.initEvent(type, true, true);
	document.querySelector(sel).dispatchEvent(event);
}

function changeTitle(str){
	if(/edit\.php/.test(document.location))
		return;
	if(str) console.log(str);
	document.querySelector('input#name').value = str.spaces2space().trim().hsc_decode();
	eventTrigger('input#name', 'change');
}

function changeSubtitle(str){
	if(str) console.log(str);
	document.querySelector('input#small_descr').value = str.spaces2space().trim();
	eventTrigger('input#small_descr', 'change');
}

function changeUrl(str){
	if (str) console.log(str);
	document.querySelector('input#url').value = str.trim();
}

function changeDburl(str){
	if (str) console.log(str);
	document.querySelector('input#dburl').value = str.trim();
}

function changeDescr(raw){
 	var str = e(raw).hsc_decode();
	document.querySelector('textarea#descr').value = str.trim().hsc_decode();
}

function getLink(str){
	str.replace(/(http:\/\/www\.imdb\.com\/title\/tt\d+)/i, function(m, p1) {
		changeUrl(p1);
	});
	str.replace(/(http:\/\/movie\.douban\.com\/subject\/\d+)/i, function(m, p1) {
		changeDburl(p1);
	});
}

function requestData(url, successHandle, timeoutHandle, options){
	var headers = options ? options : {
			'User-Agent': navigator.userAgent,
			'Accept': '"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"'
 		};
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: headers,
		timeout: 2048,
		onreadystatechange: successHandle,
		ontimeout: timeoutHandle,
	});
}

function requestHTML(url, callback, options){
	requestData(url, function(response){
// console.log(response.readyState, response.status);
		if(response.readyState == 4){
			callback(response.responseText
				.match(/<body[^>]*?>([\S\s]+)<\/body>/)[1]
				.replace(/<script(\s|>)[\S\s]+?<\/script>/g, '')
			);
		}
	}, function(response){
// console.log(response);
		console.info('timeout when request from url: ' + url);
	}, options);
}

function requestJson(url, callback, options){
	requestData(url, function(response){
		if(response.readyState == 4){
			callback(JSON.parse(response.responseText));
		}
	}, function(response){
		console.info('timeout when request from url: ' + url);
	}, options);
}

function newHTMLDom(htmlstring){
	var sub = document.implementation.createHTMLDocument();
	sub.body.innerHTML = htmlstring;
	//console.log(sub);
	return sub;
}

function chooseLink(val){
	console.log(val);
  var old_descr = document.querySelector('textarea#descr').value.trim();
	changeTitle("");
	changeSubtitle("");
	changeUrl("");
	changeDburl("");
	changeDescr("");

	if(/https?:\/\/totheglory.im\/t\/\d+\//.test(val)){
		console.log("TTG link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc),
					title = sub.querySelector('h1').innerHTML,
					descr = sub.querySelector('#kt_d').innerHTML;

			title.replace(/([^\[]+)\[([^\]]+)\]([\S\s]*)/, function(m, p1, p2, p3){
				changeTitle(p1);
				if(p3) changeSubtitle(p2 + '[' + p3 + ']');
				else changeSubtitle(p2);
			});

			changeDescr(descr);
			getLink(doc);
		});
	} else if(/https?:\/\/hdwing\.\w+\/details\.php\?id=\d+/.test(val)){
		console.log("HDWinG link(HDWinG.ORG)");
  } else if(/https?:\/\/hdchina\.club\/details\.php\?id=\d+/.test(val)){
    console.log("HDChina link(<--old HDWinG <-- old HDChina)");

    requestHTML(val, function(doc){
      var sub = newHTMLDom(doc);

      Array.prototype.forEach.call(sub.querySelectorAll('img[id^=attach]'), function(el){
        el.removeAttribute('onmouseover');
        el.removeAttribute('onclick');
        if(/(^|^\/)attachments/.test(el.src)){
          el.src = '//hdchina.club/' + el.src;
        }
      });
      var el = sub.querySelector('h2#top'),
          title = el.childNodes.item(0).data.trim(),
          subtitle = el.nextElementSibling.innerHTML || '',
          descr = sub.querySelector("#kdescr").innerHTML;

      changeTitle(title);
      changeSubtitle(subtitle);
      changeDescr(descr);
      getLink(doc);
    });
	} else if(/https?:\/\/pt\.hit\.edu\.cn\/details\.php/.test(val)
			|| /https?:\/\/pt\.hit\.edu\.cn\/details_for_mod\.php/.test(val)){
		console.log("QingyingPT link");

		var id = parseInt(val.match(/id=(\d+)/)[1], 10),
				jsonUrl = location.protocol + '//pt.hit.edu.cn/details.php?from=js&id=' + id;
		requestJson(jsonUrl, function(data){
			var info = data.passToClient.information;
			changeTitle(info['name']);
			changeSubtitle(info['small_descr']);
			changeDescr(info['descr']);
			info['imdbid'] && changeUrl('http://www.imdb.com/title/tt' + info['imdbid'] + '/');
			info['dbid'] && changeDburl('https://movie.douban.com/subject/' + info['dbid'] + '/');
		});
	} else if (/https?:\/\/pt\.hit\.edu\.cn\/edit\.php\?(returnto=.+&)*id=\d+/.test(val)) {
		console.log("QingyingPT link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc),
					title = sub.querySelector('input#name').value,
					subtitle = sub.querySelector('input#small_descr').value,
					descr = sub.querySelector('textarea#descr').innerHTML,
					url = sub.querySelector('input#url').value,
					dburl = sub.querySelector('input#dburl').value;

			changeTitle(title);
			changeSubtitle(subtitle);
			changeUrl(url);
			changeDburl(dburl);
			changeDescr(descr);
		});
	} else if (/https?:\/\/chdbits.org\/details\.php\?id=\d+/.test(val)) {
		console.log("CHDbits link");
	} else if (/https?:\/\/www\.open\.cd\/plugin_details\.php\?id=\d+/.test(val)) {
		console.log("OpenCD link");
	} else if (/https?:\/\/hudbt\.hust\.edu\.cn\/details\.php\?id=\d+/.test(val)) {
		console.log("HUD link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc);
			Array.prototype.forEach.call(sub.querySelectorAll('#kdescr>.bbcode img'), function(el){
				if(/(^|^\/)attachments/.test(el.src)){
					el.src = '//hudbt.hust.edu.cn/' + el.src;
        }
			});

			var title = sub.querySelector('#page-title').innerHTML
						.replace(/<a[\S\s]+/, '').trim(),
					descr = sub.querySelector('#kdescr>.bbcode').innerHTML;
			changeTitle(title);
			changeDescr(descr);
			getLink(doc);

			Array.prototype.forEach.call(sub.querySelectorAll('dt'), function(el){
				if(/副标题/.test(el.innerHTML)){
					var subtitle = el.nextElementSibling.innerHTML;
					changeSubtitle(subtitle);
				}
			});
		});
	} else if(/https?:\/\/bt\.byr\.cn\/details\.php\?id=\d+/.test(val)){
		console.log("BYR link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc);

			var title = sub.querySelector('#share').innerHTML
						.replace(/\]&[\S\s]+/, "]").trim(),
					descr = sub.querySelector('#kdescr').innerHTML;
			changeTitle(title);
			changeDescr(descr);
			getLink(doc);
		});
	} else if(/https?:\/\/tp\.m\-team\.cc\/details\.php\?id=\d+/.test(val)){
		console.log("M-team link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc);
			Array.prototype.forEach.call(sub.querySelectorAll('#kdescr img'), function(el){
				el.src = decodeURIComponent(el.src.replace(/.*imagecache\.php\?url=([^\[]+)/, "$1"));
			});

			var title = sub.querySelector("h1#top").innerHTML
						.replace(/<.+/, '').trim(),
					descr = sub.querySelector("#kdescr").innerHTML;
			changeTitle(title);
			changeDescr(descr);
			getLink(doc);

			Array.prototype.forEach.call(sub.querySelectorAll('td.rowhead'), function(el){
				if(/副標題/.test(el.innerHTML)){
					var subtitle = el.nextElementSibling.innerHTML
						.replace(/\[([\S\s]+)\]/, "*$1");
					changeSubtitle(subtitle);
				}
			});
		}, {'User-agent': navigator.userAgent});
	} else if(/https?:\/\/ccfbits\.org\/details\.php\?id=\d+/.test(val)){
		console.log("CCF link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc);

			var title = sub.querySelector("h1").innerHTML,
					descr = sub.querySelector("div.node").innerHTML;
			changeTitle(title);
			changeDescr(descr);

			Array.prototype.forEach.call(sub.querySelectorAll('td.rowhead'), function(el){
				if(/中文名称/.test(el.innerHTML)){
					var subtitle = el.nextElementSibling.innerHTML;
					changeSubtitle(subtitle);
				}
			});
		});
  } else if(/https?:\/\/pt\.whu\.edu\.cn\/details\.php\?id=\d+/.test(val)){
    console.log("WHU link");

    requestHTML(val, function(doc){
      var sub = newHTMLDom(doc);
      Array.prototype.forEach.call(sub.querySelectorAll('#kdescr > .bbcode img'), function(el){
        if(!!el.dataset['ksLazyload']){
          el.src = el.dataset['ksLazyload'];
        }
        if(/(^|^\/)attachments/.test(el.src)){
					el.src = '//pt.whu.edu.cn/' + el.src;
        }
      });

      var title = sub.querySelector('#page-title').innerHTML
						.replace(/<a[\S\s]+/, '').trim(),
          subtitle = '',
          descr = sub.querySelector('#kdescr > .bbcode').innerHTML;

      Array.prototype.forEach.call(sub.querySelectorAll('dt'), function(el){
				if(/副标题/.test(el.innerHTML)){
					subtitle = el.nextElementSibling.innerHTML;
				}
			});

      changeTitle(title);
      changeSubtitle(subtitle);
			changeDescr(descr);
			getLink(doc);
    });
	} else if(/https?:\/\/www\.hdarea\.co\/details\.php\?id=\d+/.test(val)){
		console.log('HDArea link');

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc);
			var hdarealogo = 'http://www.hdarea.co/attachments/201605/20160517115442b44bbbc7dce459dfa136c0f37b9ebce3.png';
			Array.prototype.forEach.call(sub.querySelectorAll('img[src="' + hdarealogo + '"]'), function(el){
				el.parentNode.removeChild(el);
			});
			var title = sub.querySelector('h1#top[align="center"]').innerHTML
						.replace(/([^<]+)<[\S\s]+/, "$1")
						.replace(/&nbsp;/g, '')
						.trim(),
					descr = sub.querySelector('#kdescr').innerHTML;

			changeTitle(title);
			changeDescr(descr);
			getLink(doc);

			Array.prototype.forEach.call(sub.querySelectorAll('td.rowhead'), function(el){
				if(/副标题/.test(el.innerHTML)){
					var subtitle = el.nextElementSibling.innerHTML;
					changeSubtitle(subtitle);
				}
			});
		});
	} else if(/https?:\/\/([^\/]+?)\/details\.php\?id=\d+/.test(val)){
		console.log("NexusPHP link");

		requestHTML(val, function(doc) {
			var sub = newHTMLDom(doc);
			var el = sub.querySelector('#ad_torrentdetail');
			el && el.parentNode.removeChild(el);

			var title = sub.querySelector('#top').innerHTML
						.replace(/([^<]+)<[\S\s]+/, "$1").trim(),
					descr = sub.querySelector('#kdescr').innerHTML;
			changeTitle(title);
			changeDescr(descr);
			getLink(doc);

			Array.prototype.forEach.call(sub.querySelectorAll('td.rowhead'), function(el){
				if(/副标题/.test(el.innerHTML)){
					var subtitle = el.nextElementSibling.innerHTML;
					changeSubtitle(subtitle);
				}
			});
		});
	} else if(/https?:\/\/bt\.neu6\.edu\.cn\/thread-\d+\-1\-1\.html/.test(val)){
		console.log("6V link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc),
					linkpre = "//bt.neu6.edu.cn";
			Array.prototype.forEach.call(sub.querySelectorAll('.pcbs div[id][id^=aimg]'), function(el){
				el.parentNode.removeChild(el);
			});
			Array.prototype.forEach.call(sub.querySelectorAll('.pcbs img[id][id^=aimg][file^="/data/attachment"]'), function(el){
				el.src = linkpre + el.getAttribute('file');
			});
			Array.prototype.forEach.call(sub.querySelectorAll('.pcbs img[src^="static"]'), function(el){
				el.parentNode.removeChild(el);
			});

			var title = sub.querySelector('#thread_subject').innerHTML,
					descr = sub.querySelector('.pcbs td').innerHTML;

			changeTitle(title);
			changeDescr(descr);
			getLink(doc);
		});
	} else if(/http:\/\/bbs\.3dmgame\.com\/thread\-\d+\-1\-1\.html/.test(val)){
		console.log("3DMGame link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc);
			var el = sub.querySelector('.pcbs td .quote:first-of-type');
			el.parentNode.removeChild(el);
			el = sub.querySelector('.pcbs td .quote:first-of-type');
			el.parentNode.removeChild(el);

			var title = sub.querySelector('#thread_subject').innerHTML;
					descr = sub.querySelector('.pcbs td').innerHTML;
			changeTitle(title);
			descr = e(descr);
			document.querySelector('textarea#descr').value = descr.replace(/----------------[\S\s]+/, "").trim().hsc_decode();
		});
	} else if(/https?:\/\/.+?\/thread-\d+\-1\-1\.html/.test(val)){
		console.log("DZ link");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc);

			var title = sub.querySelector('#thread_subject').innerHTML;
					descr = sub.querySelector('.pcbs td').innerHTML;
			changeTitle(title);
			changeDescr(descr);
			getLink(doc);
		});
	} else if(/https?:\/\/store\.steampowered\.com\/app\/\d+/.test(val)){
		console.log("Steam Store");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc),
					appid = val.match(/\/(\d+)\//)[1],
					linkpre = '//cdn.akamai.steamstatic.com/steam/apps/' + appid + '/';

			var imgs = [];
			Array.prototype.forEach.call(sub.querySelectorAll(".screenshot_holder>a"), function(el){
				imgs.push(el.dataset.screenshotid);
			});
			var imgarea = "\n[img]" + linkpre + imgs.join("[/img]\n[img]"+linkpre) + "[/img]\n";

			var requirementarea = "";
			Array.prototype.forEach.call(sub.querySelectorAll('div[class^=game_area_sys_req]'), function(el){
				if(el.dataset.os){
					requirementarea += "[size=2][i][quote=" + el.dataset.os + "]"
						+ e(el.innerHTML.replace(/\s+/g, '')).replace(/\[\/?list\]/ig, '')
						+ "[/quote][/size][/i]";
				}
			});

			if(old_descr != ''){
				document.querySelector('textarea#descr').value = old_descr + '\n' + imgarea;
			} else {
				var descr = '【[b]游戏封面[/b]】\n\n\n【[b]概要信息[/b]】\n\n\n【[b]游戏简介[/b]】\n\n\n【[b]安装说明[/b]】\n\n\n';
				if(requirementarea)
					descr += '【[b]系统需求[/b]】' + requirementarea + '\n\n';
				descr += '【[b]游戏截图[/b]】' + imgarea;
				document.querySelector('textarea#descr').value = descr;
			}
		});
	} else if(/(http:\/\/)?movie\.douban\.com\/subject\/\d\d+/.test(val)){
		console.log("Douban Movie");

		requestHTML(val, function(doc){
			var sub = newHTMLDom(doc);

			var title = sub.querySelector("h1>span").innerHTML,
					descr = sub.querySelector('div#info').innerHTML
			// TODO: alias
			changeSubtitle(title);
			document.querySelector("textarea#descr").value = e(descr).replace(/\[(url=[^\]]+|\/url)\]/g, '');

			doc.replace(/www\.imdb\.com\/title\/(tt\d+)/i, function(m, p1){
				changeUrl(p1);
			});
			val.replace(/subject\/(\d+)/i, function(m, p1){
				changeDburl(p1);
			});
		});
	} else {
		console.log("Unsupported link");

	}
}

var insert_tr = document.createElement('tr');
insert_tr.innerHTML = '<td valign="top" align="right" class="rowhead nowrap">參考鏈接</td>'
		+ '<td valign="top" align="left" class="rowfollow"><input type="text" id="reflink" style="width: 650px;"><br />'
		 + '<font class="medium">(僅只支持部份NexusPHP模板PT/BT站點、DZ論壇、Steam鏈接) ver' + ver + ' by <a style="color: #e6e600;" href="sendmessage.php?receiver=1788">ZunSThy@清影PT</a> 製作自2014.10.10</font>'
		 + '</td>';

var position = document.querySelector('form tr:nth-child(' + (location.pathname.match(/edit\.php/) ? 2 : 4) + ')');
position.parentNode.insertBefore(insert_tr, position);

document.querySelector('input#reflink').addEventListener('change', function(){
	chooseLink(this.value);
	this.value = '';
});

// insert ori script
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '/pageext/' + (/edit\.php/.test(location.pathname) ? 'edit_plugin' : 'upload_plugin') + '.js';
console.log(script);
document.body.appendChild(script);
