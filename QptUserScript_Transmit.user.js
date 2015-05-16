// ==UserScript==
// @id          Qptuserscript_Transmit
// @name        QptUserScript Transmit
// @author      ZunSThy <zunsthy@gmail.com>
// @version     0.5.5.20150515.713
// @namespace   https://github.com/zunsthy/QingyingptUserScript
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Transmit.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Transmit.user.js
// @description nothing useful
// @domain      pt.hit.edu.cn
// @match       http://pt.hit.edu.cn/edit.php*
// @match       http://pt.hit.edu.cn/upload.php
// @match       http://pt.hit.edu.cn/uploadnew.php
// @include     http://pt.hit.edu.cn/edit.php*
// @include     http://pt.hit.edu.cn/upload.php
// @include     http://pt.hit.edu.cn/uploadnew.php
// @grant       GM_xmlhttpRequest
// @require     http://pt.hit.edu.cn/jquerylib/jquery-1.7.2.min.js
// ==/UserScript==

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
	'nbsp': ' ',
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

function changeTitle(str){
	if (/edit\.php/.test(document.location)) 
		return;
	if(str) console.log(str);
	$('input#name').val(str.spaces2space().trim().hsc_decode());
}

function changeSubtitle(str){
	if(str) console.log(str);
	$('input#small_descr').val(str.spaces2space().trim());
}

function changeUrl(str){
	if (str) console.log(str);
	$('input#url').val(str.trim());
}

function changeDburl(str){
	if (str) console.log(str);
	$('input#dburl').val(str.trim());
}

function changeDescr(raw){
 	var str = e(raw).hsc_decode();
	$('textarea#descr').val(str);
}

function getLink(str){
	str.replace(/(http:\/\/www\.imdb\.com\/title\/tt\d+)/i, function(m, p1) {
		changeUrl(p1);
	});
	str.replace(/(http:\/\/movie\.douban\.com\/subject\/\d+)/i, function(m, p1) {
		changeDburl(p1);
	});
}

function getHTML(val, callback, options){
	var header = (options ? options : {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml;q=0.9,*/*;q=0.8'
 		});
	GM_xmlhttpRequest({
		method: 'GET',
		url: val,
		headers: header,
		onload: function(response){
			//console.log(response.responseText);
			callback(response.responseText);
		}
 	});
}

function chooseLink(val){
	console.log(val);
	changeTitle("");
	changeSubtitle("");
	changeUrl("");
	changeDburl("");
  var old_descr = $("textarea#descr").val().trim();
	changeDescr("");
	if(/https?:\/\/totheglory.im\/t\/\d+\//.test(val)){
		console.log("TTG link");
		getHTML(val, function(doc){
			var sub = $(doc);
			var title = sub.find("h1")[0].innerHTML;
			title.replace(/([^\[]+)\[([^\]]+)\]([\S\s]*)/, function(m, p1, p2, p3){
				changeTitle(p1);
				if(p3) changeSubtitle(p2 + '[' + p3 + ']');
				else changeSubtitle(p2);
			});
			console.log(sub.find("#kt_d")[0]);
			var descr = sub.find("#kt_d")[0].innerHTML;
			changeDescr(descr);
			getLink(doc);
		});
	} else if(/https?:\/\/hdwing\.science\/details\.php\?id=\d+/.test(val)){
		console.log("HDWinG link(HDWinG.ORG)");
	} else if(/https?:\/\/pt\.hit\.edu\.cn\/details\.php\?(hit=1&)?id=\d+/.test(val)){
		console.log("QingyingPT link");
		getHTML(val, function(doc) {
			var sub = $(doc);
			var title = sub.find("#top")[0].innerHTML
				.replace(/([^<]+)<[\S\s]+/, "$1").trim();
			changeTitle(title);
			var subtitle = sub.find("td.rowhead:contains('副标题')")[0]
				.nextElementSibling.innerHTML;
			changeSubtitle(subtitle);
			getLink(doc);

			sub.find("#ad_torrentdetail").remove();
			sub.find("fieldset:first-of-type").remove();
			//console.log(sub.find("fieldset:first-of-type"));
			sub.find("fieldset:first-of-type").remove();
			var descr = sub.find("#kdescr")[0].innerHTML;
			changeDescr(descr);
		});
	} else if (/https?:\/\/pt\.hit\.edu\.cn\/edit\.php\?(returnto=.+&)*id=\d+/.test(val)) {
		console.log("QingyingPT link");
		getHTML(val, function(doc){
			var sub = $(doc);
			var title = sub.find("input#name")[0].value;
			changeTitle(title);
			var subtitle = sub.find("input#small_descr")[0].value;
			changeSubtitle(subtitle);
			var descr = sub.find("textarea#descr")[0].innerHTML;
			changeDescr(descr);
			var url = sub.find("input#url")[0].value;
			console.log(url);
			changeUrl(url);
			var dburl = sub.find("input#dburl")[0].value;
			changeDburl(dburl);
		});
	} else if (/https?:\/\/chdbits.org\/details\.php\?id=\d+/.test(val)) {
		console.log("CHDbits link");
	} else if (/https?:\/\/www\.open\.cd\/plugin_details\.php\?id=\d+/.test(val)) {
		console.log("OpenCD link");
	} else if (/https?:\/\/hudbt\.hust\.edu\.cn\/details\.php\?id=\d+/.test(val)) {
		console.log("HUD link");
		getHTML(val, function(doc){
			var sub = $(doc);
			console.log(sub.find("title"));
			var title = sub.find("#page-title")[0].innerHTML
				.replace(/<a[\S\s]+/, "").trim();
			changeTitle(title);
			var subtitle = sub.find("dt:contains('副标题') + dd")[0].innerHTML;
			changeSubtitle(subtitle);
			var descr = sub.find("#kdescr>.bbcode")[0].innerHTML;
			descr = e(descr).trim()
				.replace(/\[img\](attachments\/.+?)\[\/img\]/, "[img]//hudbt.hust.edu.cn/$1[/img]");
			$("textarea#descr").val(descr);
			getLink(doc);
		});
	} else if(/https?:\/\/bt\.byr\.cn\/details\.php\?id=\d+/.test(val)){
		console.log("BYR link");
		getHTML(val, function(doc){
			var sub = $(doc);
			console.log(sub);
			var title = sub.find("#share")[0].innerHTML
				.replace(/\]&[\S\s]+/, "]").trim();
			changeTitle(title);
			var descr = sub.find("#kdescr")[0].innerHTML;
			descr = e(descr).trim().hsc_decode();
			$("textarea#descr").val(descr);
			getLink(doc);
		});
	} else if(/https?:\/\/tp\.m\-team\.cc\/details\.php\?id=\d+/.test(val)){
		console.log("M-team link");
		getHTML(val, function(doc){
			var sub = $(doc);
			var title = sub.find("h1#top")[0].innerHTML;
			changeTitle(title);
			var subtitle = sub.find("td:contains('副標題') + td")[0].innerHTML
				.replace(/\[([\S\s]+)\]/, "*$1");
			changeSubtitle(subtitle);
			var descr = sub.find("#kdescr")[0].innerHTML;
			descr = e(descr).replace(/\[img\]imagecache\.php\?url=([^\[]+)\[\/img\]/g, function(m, p1){
				return ('[img]' + decodeURIComponent(p1) + '[/img]');
			}).hsc_decode();
			// descr = e(descr);
			$("textarea#descr").val(descr);
			getLink(doc);
		}, {'User-agent': navigator.userAgent});
	} else if(/https?:\/\/ccfbits\.org\/details\.php\?id=\d+/.test(val)){
		console.log("CCF link");
		getHTML(val, function(doc){
			var sub = $(doc);
			var title = sub.find("h1")[0].innerHTML;
			changeTitle(title);
			var subtitle = sub.find("td.rowhead:contains('中文名称') + td")[0].innerHTML;
			changeSubtitle(subtitle);
			//TODO: sub.find(".postpic")[0].src = "";
			var descr = sub.find("div.node")[0].innerHTML;
			changeDescr(descr);
		});
	} else if (/https?:\/\/([^\/]+?)\/details\.php\?id=\d+/.test(val)) {
		console.log("NexusPHP link");
		getHTML(val, function(doc) {
			var sub = $(doc);
			var title = sub.find("#top")[0].innerHTML
				.replace(/([^<]+)<[\S\s]+/, "$1").trim();
			changeTitle(title);
			var subtitle = sub.find("td.rowhead:contains('副标题')")[0]
				.nextElementSibling.innerHTML;
			changeSubtitle(subtitle);
			sub.find("#ad_torrentdetail").remove();
			var descr = sub.find("#kdescr")[0].innerHTML;
			changeDescr(descr);
			getLink(doc);
		});
	} else if(/https?:\/\/bt\.neu6\.edu\.cn\/thread-\d+\-1\-1\.html/.test(val)){
		console.log("6V link");
		getHTML(val, function(doc){
			var sub = $(doc);
			var linkpre = "\/\/bt\.neu6\.edu\.cn";
			var title = sub.find("#thread_subject")[0].innerHTML;
			changeTitle(title);
			sub.find(".pcbs div[id][id^=aimg]").remove();
			sub.find(".pcbs img[id][id^=aimg]").each(function(){
				console.log(this.getAttribute("file"));
				this.src = linkpre + this.getAttribute("file");
			});
			var descr = sub.find(".pcbs td")[0].innerHTML;
			descr = e(descr);
			descr = descr.replace(/\[img\](static.+?)\[\/img]/, function(m, p1){
				return "[img]"+ linkpre + p1 + "[/img]";
			}).trim().hsc_decode();
			$('textarea#descr').val(descr);
			//$('textarea#descr').val(descr.replace(/\[img\]static[\S\s]+?\[\/url\][\S\s]+?\[\/b\]/, "").trim());
			getLink(doc);
		});
	} else if(/http:\/\/bbs\.3dmgame\.com\/thread\-\d+\-1\-1\.html/.test(val)){
		console.log("3DMGame link");
		getHTML(val, function(doc){
			var sub = $(doc);
			var title = sub.find("#thread_subject")[0].innerHTML;
			changeTitle(title);
			//sub.find(".pcbs td p:first-of-type").remove();
			sub.find(".pcbs td .quote:first-of-type").remove();
			sub.find(".pcbs td .quote:first-of-type").remove();
			var descr = sub.find(".pcbs td")[0].innerHTML;
			descr = e(descr);
			$('textarea#descr').val(descr.replace(/----------------[\S\s]+/, "").trim());
		});
	} else if(/https?:\/\/.+?\/thread-\d+\-1\-1\.html/.test(val)){
		console.log("DZ link");
		getHTML(val, function(doc){
			var sub = $(doc);
			var title = sub.find("#thread_subject")[0].innerHTML;
			changeSubtitle(title);
			var descr = sub.find(".pcbs td")[0].innerHTML;
			changeDescr(descr);
			getLink(doc);
		});
	} else if(/https?:\/\/store\.steampowered\.com\/app\/\d+/.test(val)){
		console.log("Steam Store");
		getHTML(val, function(doc){
			var appid = val.match(/\/(\d+)\//)[1];
			var linkpre = '//cdn.akamai.steamstatic.com/steam/apps/' + appid + '/';
			var sub = $(doc);
			var imgs = [ ];
			sub.find(".screenshot_holder>a").each(function(){
				//console.log(this.dataset.screenshotid);
				imgs.push(this.dataset.screenshotid);
			});
			var imgarea = "\n[img]" + linkpre + imgs.join("[/img]\n[img]"+linkpre) + "[/img]\n";
			var requirementarea = "";
			sub.find("div[class^=game_area_sys_req]").each(function(){
				if(this.dataset.os){
					requirementarea += "[size=2][i][quote=" + this.dataset.os + "]" 
						+ e(this.innerHTML.replace(/\s+/g, '')).replace(/\[\/?list\]/ig, '')
						+ "[/quote][/size][/i]";
				} 
			});
			if(old_descr != ""){
				$("textarea#descr").val(old_descr + '\n' + imgarea);
			} else {
				descr = "【[b]游戏封面[/b]】\n\n\n【[b]概要信息[/b]】\n\n\n【[b]游戏简介[/b]】\n\n\n【[b]安装说明[/b]】\n\n\n";
				if(requirementarea)
					descr += "【[b]系统需求[/b]】" + requirementarea + "\n\n";
				descr += "【[b]游戏截图[/b]】" + imgarea;
				$("textarea#descr").val(descr);
			}
		});
	} else if(/(http:\/\/)?movie\.douban\.com\/subject\/\d\d+/.test(val)){
		console.log("Douban Movie");
		getHTML(val, function(doc){
			var sub = $(doc);
			var title = sub.find("h1>span")[0].innerHTML;
			var alias = sub.find("span.pl:contains(又名)")[0];
			if(alias != undefined){
				alias = alias.nextSibling.textContent.trim().replace(/\s+/g, '');
				changeSubtitle(title.replace(/(\s|$)/, '/' + alias + ' '));
			} else 
				changeSubtitle(title);
			var descr = sub.find("div#info")[0].innerHTML;
			$("textarea#descr").val(e(descr).replace(/\[(url=[^\]]+|\/url)\]/g, ''));
			
			doc.replace(/www\.imdb\.com\/title\/(tt\d+)/i, function(m, p1){
				changeUrl(p1);
			});
			val.replace(/subject\/(\d+)/i, function(m, p1){
				changeDburl(p1);
			});
		});
	} else {
		console.log("Unsupported link");
 		return;
	}
}

var insert_tr = '<tr>'
		+ '<td valign="top" align="right" class="rowhead nowrap">參考鏈接</td>'
		+ '<td valign="top" align="left" class="rowfollow"><input type="text" name="name" id="reflink" style="width: 650px;"><br />'
		 + '<font class="medium">(僅只支持部份NexusPHP模板PT/BT站點、DZ論壇、Steam鏈接) ver0.0.0.1 <a class="link" href="sendmessage.php?receiver=1788">ZunSThy@清影PT</a>製作自20141009</font>'
		 + '</td>'
		+ '</tr>';

var position = $('form tr:contains(标题)')[0];

$(insert_tr)
.insertBefore(position)
.find('input#reflink')
.change(function(){
    chooseLink($(this).val());
    $(this).val("");
});
