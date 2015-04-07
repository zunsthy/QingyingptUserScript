// ==UserScript==
// @id          QptUserScript_ScalePreviewImage
// @name        QptUserScript Scale Preview Image
// @namespace   User Script for QingyingPT
// @description nothing useful
// @match       http://pt.hit.edu.cn/torrents.php*
// @include     http://pt.hit.edu.cn/torrents.php*
// @match       http://tp.m-team.cc/torrents.php*
// @match       https://tp.m-team.cc/torrents.php*
// @include     https?://tp.m-team.cc/torrents.php*
// @match       http://tp.m-team.cc/adult.php*
// @match       https://tp.m-team.cc/adult.php*
// @include     https?://tp.m-team.cc/adult.php*
// @grant       none
// @version     0.0.1
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_ScalePreviewImage.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_ScalePreviewImage.user.js
// ==/UserScript==

(function(){
	var style_element = document.createElement('style');
	document.head.appendChild(style_element);
	style_element.sheet.insertRule('td.torrentimg { display: none; }', 0);
	style_element.sheet.insertRule('div.preview { position:absolute; right:0px; max-width:30%; z-index:99; }', 0);
	style_element.sheet.insertRule('div.preview>img { right:0; max-width: 100% }', 0);
})();
(function(){
	var scriptnode = document.createElement('script');
	scriptnode.type = 'text/javascript';
	scriptnode.textContent = Myshowmenu.toString() + "\n";
	scriptnode.textContent += Myhidemenu.toString();
	document.head.appendChild(scriptnode);
})();

var tns = document.getElementsByClassName('torrentname');
var tis = document.getElementsByClassName('torrentimg');
var fs;
for(var i = 0; i < tns.length; i++){
	// someone low forbidded jQuery
	var a = tns[i].getElementsByClassName('embedded')[0].getElementsByTagName('a')[0];
	if(a.getAttribute('onmouseover') == null && tis){
		var img = tis[i].getElementsByTagName('img')[0];
		if(img.getAttribute('onmouseover') != null)
			fs = img.getAttribute('onmouseover');
		else
			fs = '';
	} else if(a.getAttribute('onmouseover') == null){
			fs = '';
			console.log(1);
	} else {
			fs = a.getAttribute('onmouseover');
			a.setAttribute('onmouseover', null);
			a.setAttribute('onmouseout', null);
	}
	if(fs){
		var m = fs.match(/[^']+/g);
		a.setAttribute('onmouseover', 'Myshowmenu(this,\''+m[1]+'\',\''+m[3]+'\');');
		a.setAttribute('onmouseout', 'Myhidemenu(\''+m[1]+'\');');
		//a.setAttribute('onmousemove', 'Myhidemenu(\''+m[1]+'\');');
		//a.addEventListener('mouseover', function(){ Myshowmenu(a, m[1], m[3]); });
	}
}

function Myhidemenu(id) {
	console.log(id);
	document.getElementById(id).style.display = 'none';
}

function Myshowmenu(obj, objname, url) {
	if(!url)
		return false;
	if(document.documentElement && document.documentElement.scrollTop) 
		dtop = (document.documentElement.scrollTop);
	else if(document.body) 
		dtop = (document.body.scrollTop);

	if(document.getElementById(objname)){
		var st = document.getElementById(objname).style;
		st.display = 'block';
		st.top = dtop + 'px';
		return false;
	} else {
		var div = document.createElement('div');
		div.id = objname;
		div.style.display = 'block';
		div.style.top = dtop + 'px';
		div.className = 'preview';
	}
	var pic = document.createElement('img');
	pic.setAttribute('src', url);
	pic.style.maxHeight = document.documentElement.clientHeight + 'px';
	div.appendChild(pic);
	document.body.appendChild(div);
	return false;
}
