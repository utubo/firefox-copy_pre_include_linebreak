(() => {
	'use strict';

	let timer;

	const copyToClipbd = text => {
		const work = document.createElement('TEXTAREA');
		work.value = text;
		document.body.appendChild(work);
		work.select();
		document.execCommand('copy');
		document.body.removeChild(work);
	};

	const getAllText = p => {
		if (p.tagName === 'BR') return '\n';
		const str = [];
		for (let c = p.firstChild; !!c; c = c.nextSibling) {
			switch (c.nodeType) {
				case 1: str.push(getAllText(c)); break;
				case 3: str.push(c.nodeValue); break;
			}
		}
		return str.join('');
	};

	const exec = e => {
		let target = getSelection().anchorNode.parentNode;
		while (target && target.tagName !== 'PRE') {
			target = target.parentNode;
		}
		if (!target) return;
		if (!confirm(chrome.i18n.getMessage('confirmCopy'))) return;
		const str = getAllText(target);
		copyToClipbd(str);
		alert(chrome.i18n.getMessage('Copied'));
	};

	// START HERE ! ------
	window.addEventListener('touchstart', e => { timer = setTimeout(exec, 3000); });
	window.addEventListener('touchend', e => { clearTimeout(timer); });
})();

