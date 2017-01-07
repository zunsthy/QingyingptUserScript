// ==UserScript==
// @id          QptUserScript_Force_HTTPS_tracker
// @name        QptUserScript Force HTTPS tracker
// @author      ZunSThy <zunsthy@gmail.com>
// @version     0.0.1
// @namespace   https://github.com/zunsthy/QingyingptUserScript
// @updateURL   https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Force_HTTPS_tracker.meta.js
// @downloadURL https://raw.githubusercontent.com/zunsthy/QingyingptUserScript/master/QptUserScript_Force_HTTPS_tracker.user.js
// @description nothing useful
// @domain      tp.m-team.cc
// @include     https?://tp.m-team.cc/details.php*
// @match       http://tp.m-team.cc/details.php*
// @match       https://tp.m-team.cc/details.php*
// @connect     *
// @require     http://zunsthy.39m.moe/bundles/bencode.js
// @grant       none
// ==/UserScript==


(() => {
'use strict';
const styles = `
.https-download-btn {
  display: inline-block;
  margin: 0 15px;
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: all .25s ease-in-out;
}
.https-download-btn:hover {
  display: inline-block;
  border: 1px solid black;
  color: red;
}
`;

const customStyle = (css) => {
  const style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.head.appendChild(style);
};
customStyle(styles);

const getTorrentData = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';

  xhr.addEventListener('load', () => {
    const buffer = xhr.response;
    let bytes = undefined;
    let error = undefined;
    if (buffer) {
      bytes = new Uint8Array(buffer);
      if (bytes[0] !== 100) { // 'd'
        error = 'can\'t get torrent data';
        bytes = undefined;
      }
    } else {
      error = 'torrent data is null';
    }
    cb(error, bytes);
  });

  xhr.send(null);
};

const findMTDownloadUrl = (pos) => {
  const el = pos.querySelector('[href^="download.php"]');
  return el.href;
};

const findMTDownloadPos = () => {
  const el = document.querySelector('.dt_download');
  let row = el;
  while (row.tagName !== 'TD' && row !== document.body) {
    row = row.parentNode;
  }
  return row.tagName === 'TD' ? row : 0 ._;
};

const appendDownloadBtn = (pos, handle) => {
  const el = document.createElement('strong');
  const text = document.createTextNode('ｘｘｘｘｘ下載HTTPS種子ｘｘｘｘｘ');
  el.classList.add('https-download-btn');
  el.addEventListener('click', handle, false);
  el.appendChild(text);
  pos.appendChild(el);
};


new Promise((resolve, reject) => {
  getTorrentData(findMTDownloadUrl(findMTDownloadPos()), (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
}).then(data => {
  const torrent = window.bencode.decode(data);
  let announce = new TextDecoder('utf-8').decode(torrent.announce);
  if (!/^https/.test(announce)) {
    announce = announce.replace(/^http/, 'https');
  }
  torrent.announce = new TextEncoder('utf-8').encode(announce);

  return window.bencode.encode(torrent);
}).then(data => {  
  const bufferArr = [];
  for (let i = 0; i < data.length; i += 0x0800) {
    bufferArr.push(String.fromCharCode.apply(null, data.subarray(i, i + 0x0800)));
  }
  const torrent = btoa(bufferArr.join(''));

  const downloadHandle = () => {
    document.location = `data:application/x-bittorrent;base64,${torrent}`;
  };
  appendDownloadBtn(findMTDownloadPos(), downloadHandle);
}).catch(ex => {
  alert(ex);
});

})();