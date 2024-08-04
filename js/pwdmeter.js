function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			if (oldonload) {
				oldonload();
			}
			func();
		};
	}
}

function $() {
	var arrElms = [];
	for (var i = 0; i < arguments.length; i++) {
		var elm = arguments[i];
		if (typeof (elm == 'string')) {
			elm = document.getElementById(elm);
		}
		if (arguments.length == 1) {
			return elm;
		}
		arrElms.push(elm);
	}
	return arrElms;
}

String.prototype.strReverse = function () {
	var newstring = '';
	for (var s = 0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;
	//strOrig = ' texttotrim ';
	//strReversed = strOrig.revstring();
};

function chkPass(pwd) {
	var oScorebar = $('scorebar');
	var oScore = $('score');
	var oComplexity = $('complexity');
	var nScore = 0,
		nLength = 0,
		nAlphaUC = 0,
		nAlphaLC = 0,
		nNumber = 0,
		nSymbol = 0,
		nMidChar = 0,
		nRequirements = 0,
		nAlphasOnly = 0,
		nNumbersOnly = 0,
		nUnqChar = 0,
		nRepChar = 0,
		nRepInc = 0,
		nConsecAlphaUC = 0,
		nConsecAlphaLC = 0,
		nConsecNumber = 0,
		nConsecSymbol = 0,
		nConsecCharType = 0,
		nSeqAlpha = 0,
		nSeqNumber = 0,
		nSeqSymbol = 0,
		nSeqChar = 0,
		nReqChar = 0;
	var nMultMidChar = 2,
		nMultConsecAlphaUC = 2,
		nMultConsecAlphaLC = 2,
		nMultConsecNumber = 2;
	var nMultSeqAlpha = 3,
		nMultSeqNumber = 3,
		nMultSeqSymbol = 3;
	var nMultLength = 4,
		nMultNumber = 4;
	var nMultSymbol = 6;
	var nTmpAlphaUC = '',
		nTmpAlphaLC = '',
		nTmpNumber = '',
		nTmpSymbol = '';
	var sAlphaUC = '0',
		sAlphaLC = '0',
		sNumber = '0',
		sSymbol = '0',
		sMidChar = '0',
		sRequirements = '0',
		sAlphasOnly = '0',
		sNumbersOnly = '0',
		sRepChar = '0',
		sConsecAlphaUC = '0',
		sConsecAlphaLC = '0',
		sConsecNumber = '0',
		sSeqAlpha = '0',
		sSeqNumber = '0',
		sSeqSymbol = '0';
	var sAlphas = 'abcdefghijklmnopqrstuvwxyz';
	var sNumerics = '01234567890';
	var sSymbols = ')!@#$%^&*()';
	var sComplexity = 'Too Short';
	var nMinPwdLen = 8;
	if (pwd) {
		nScore = pwd.length * nMultLength;
		nLength = pwd.length;
		var arrPwd = pwd.replace(/\s+/g, '').split(/\s*/);
		var arrPwdLen = arrPwd.length;

		/* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
		for (var a = 0; a < arrPwdLen; a++) {
			if (arrPwd[a].match(/[A-Z]/g)) {
				if (nTmpAlphaUC !== '') {
					if (parseInt(nTmpAlphaUC) + 1 == a) {
						nConsecAlphaUC++;
						nConsecCharType++;
					}
				}
				nTmpAlphaUC = a.toString();
				nAlphaUC++;
			} else if (arrPwd[a].match(/[a-z]/g)) {
				if (nTmpAlphaLC !== '') {
					if (parseInt(nTmpAlphaLC) + 1 == a) {
						nConsecAlphaLC++;
						nConsecCharType++;
					}
				}
				nTmpAlphaLC = a.toString();
				nAlphaLC++;
			} else if (arrPwd[a].match(/[0-9]/g)) {
				if (a > 0 && a < arrPwdLen - 1) {
					nMidChar++;
				}
				if (nTmpNumber !== '') {
					if (parseInt(nTmpNumber) + 1 == a) {
						nConsecNumber++;
						nConsecCharType++;
					}
				}
				nTmpNumber = a.toString();
				nNumber++;
			} else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
				if (a > 0 && a < arrPwdLen - 1) {
					nMidChar++;
				}
				if (nTmpSymbol !== '') {
					if (parseInt(nTmpSymbol) + 1 == a) {
						nConsecSymbol++;
						nConsecCharType++;
					}
				}
				nTmpSymbol = a.toString();
				nSymbol++;
			}
			/* Internal loop through password to check for repeat characters */
			var bCharExists = false;
			for (var b = 0; b < arrPwdLen; b++) {
				if (arrPwd[a] == arrPwd[b] && a != b) {
					/* repeat character exists */
					bCharExists = true;
					/*
					Calculate increment deduction based on proximity to identical characters
					Deduction is incremented each time a new match is discovered
					Deduction amount is based on total password length divided by the
					difference of distance between currently selected match
					*/
					nRepInc += Math.abs(arrPwdLen / (b - a));
				}
			}
			if (bCharExists) {
				nRepChar++;
				nUnqChar = arrPwdLen - nRepChar;
				nRepInc = nUnqChar ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
			}
		}

		/* Check for sequential alpha string patterns (forward and reverse) */
		for (var s = 0; s < 23; s++) {
			var sFwd = sAlphas.substring(s, parseInt(s.toString() + 3));
			var sRev = sFwd.strReverse();
			if (
				pwd.toLowerCase().indexOf(sFwd) != -1 ||
				pwd.toLowerCase().indexOf(sRev) != -1
			) {
				nSeqAlpha++;
				nSeqChar++;
			}
		}

		/* Check for sequential numeric string patterns (forward and reverse) */
		for (var s = 0; s < 8; s++) {
			var sFwd = sNumerics.substring(s, parseInt(s.toString() + 3));
			var sRev = sFwd.strReverse();
			if (
				pwd.toLowerCase().indexOf(sFwd) != -1 ||
				pwd.toLowerCase().indexOf(sRev) != -1
			) {
				nSeqNumber++;
				nSeqChar++;
			}
		}

		/* Check for sequential symbol string patterns (forward and reverse) */
		for (var s = 0; s < 8; s++) {
			var sFwd = sSymbols.substring(s, parseInt(s.toString() + 3));
			var sRev = sFwd.strReverse();
			if (
				pwd.toLowerCase().indexOf(sFwd) != -1 ||
				pwd.toLowerCase().indexOf(sRev) != -1
			) {
				nSeqSymbol++;
				nSeqChar++;
			}
		}

		/* Modify overall score value based on usage vs requirements */

		/* General point assignment */
		$('nLengthBonus').innerHTML = '+ ' + nScore;
		if (nAlphaUC > 0 && nAlphaUC < nLength) {
			nScore = nScore + (nLength - nAlphaUC) * 2;
			sAlphaUC = '+ ' + (nLength - nAlphaUC) * 2;
		}
		if (nAlphaLC > 0 && nAlphaLC < nLength) {
			nScore = nScore + (nLength - nAlphaLC) * 2;
			sAlphaLC = '+ ' + (nLength - nAlphaLC) * 2;
		}
		if (nNumber > 0 && nNumber < nLength) {
			nScore = nScore + nNumber * nMultNumber;
			sNumber = '+ ' + nNumber * nMultNumber;
		}
		if (nSymbol > 0) {
			nScore = nScore + nSymbol * nMultSymbol;
			sSymbol = '+ ' + nSymbol * nMultSymbol;
		}
		if (nMidChar > 0) {
			nScore = nScore + nMidChar * nMultMidChar;
			sMidChar = '+ ' + nMidChar * nMultMidChar;
		}
		$('nAlphaUCBonus').innerHTML = sAlphaUC;
		$('nAlphaLCBonus').innerHTML = sAlphaLC;
		$('nNumberBonus').innerHTML = sNumber;
		$('nSymbolBonus').innerHTML = sSymbol;
		$('nMidCharBonus').innerHTML = sMidChar;

		/* Point deductions for poor practices */
		if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {
			// Only Letters
			nScore = nScore - nLength;
			nAlphasOnly = nLength;
			sAlphasOnly = '- ' + nLength;
		}
		if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {
			// Only Numbers
			nScore = nScore - nLength;
			nNumbersOnly = nLength;
			sNumbersOnly = '- ' + nLength;
		}
		if (nRepChar > 0) {
			// Same character exists more than once
			nScore = nScore - nRepInc;
			sRepChar = '- ' + nRepInc;
		}
		if (nConsecAlphaUC > 0) {
			// Consecutive Uppercase Letters exist
			nScore = nScore - nConsecAlphaUC * nMultConsecAlphaUC;
			sConsecAlphaUC = '- ' + nConsecAlphaUC * nMultConsecAlphaUC;
		}
		if (nConsecAlphaLC > 0) {
			// Consecutive Lowercase Letters exist
			nScore = nScore - nConsecAlphaLC * nMultConsecAlphaLC;
			sConsecAlphaLC = '- ' + nConsecAlphaLC * nMultConsecAlphaLC;
		}
		if (nConsecNumber > 0) {
			// Consecutive Numbers exist
			nScore = nScore - nConsecNumber * nMultConsecNumber;
			sConsecNumber = '- ' + nConsecNumber * nMultConsecNumber;
		}
		if (nSeqAlpha > 0) {
			// Sequential alpha strings exist (3 characters or more)
			nScore = nScore - nSeqAlpha * nMultSeqAlpha;
			sSeqAlpha = '- ' + nSeqAlpha * nMultSeqAlpha;
		}
		if (nSeqNumber > 0) {
			// Sequential numeric strings exist (3 characters or more)
			nScore = nScore - nSeqNumber * nMultSeqNumber;
			sSeqNumber = '- ' + nSeqNumber * nMultSeqNumber;
		}
		if (nSeqSymbol > 0) {
			// Sequential symbol strings exist (3 characters or more)
			nScore = nScore - nSeqSymbol * nMultSeqSymbol;
			sSeqSymbol = '- ' + nSeqSymbol * nMultSeqSymbol;
		}
		$('nAlphasOnlyBonus').innerHTML = sAlphasOnly;
		$('nNumbersOnlyBonus').innerHTML = sNumbersOnly;
		$('nRepCharBonus').innerHTML = sRepChar;
		$('nConsecAlphaUCBonus').innerHTML = sConsecAlphaUC;
		$('nConsecAlphaLCBonus').innerHTML = sConsecAlphaLC;
		$('nConsecNumberBonus').innerHTML = sConsecNumber;
		$('nSeqAlphaBonus').innerHTML = sSeqAlpha;
		$('nSeqNumberBonus').innerHTML = sSeqNumber;
		$('nSeqSymbolBonus').innerHTML = sSeqSymbol;

		/* Determine if mandatory requirements have been met and set image indicators accordingly */
		var arrChars = [nLength, nAlphaUC, nAlphaLC, nNumber, nSymbol];
		var arrCharsIds = ['nLength', 'nAlphaUC', 'nAlphaLC', 'nNumber', 'nSymbol'];
		var arrCharsLen = arrChars.length;
		for (var c = 0; c < arrCharsLen; c++) {
			var oImg = $('div_' + arrCharsIds[c]);
			var oBonus = $(arrCharsIds[c] + 'Bonus');
			$(arrCharsIds[c]).innerHTML = arrChars[c];
			if (arrCharsIds[c] == 'nLength') {
				var minVal = nMinPwdLen - 1;
			} else {
				var minVal = 0;
			}
			if (arrChars[c] == minVal + 1) {
				nReqChar++;
				oImg.className = 'pass';
				oBonus.parentNode.className = 'pass';
			} else if (arrChars[c] > minVal + 1) {
				nReqChar++;
				oImg.className = 'exceed';
				oBonus.parentNode.className = 'exceed';
			} else {
				oImg.className = 'fail';
				oBonus.parentNode.className = 'fail';
			}
		}
		nRequirements = nReqChar;
		if (pwd.length >= nMinPwdLen) {
			var nMinReqChars = 3;
		} else {
			var nMinReqChars = 4;
		}
		if (nRequirements > nMinReqChars) {
			// One or more required characters exist
			nScore = nScore + nRequirements * 2;
			sRequirements = '+ ' + nRequirements * 2;
		}
		$('nRequirementsBonus').innerHTML = sRequirements;

		/* Determine if additional bonuses need to be applied and set image indicators accordingly */
		var arrChars = [nMidChar, nRequirements];
		var arrCharsIds = ['nMidChar', 'nRequirements'];
		var arrCharsLen = arrChars.length;
		for (var c = 0; c < arrCharsLen; c++) {
			var oImg = $('div_' + arrCharsIds[c]);
			var oBonus = $(arrCharsIds[c] + 'Bonus');
			$(arrCharsIds[c]).innerHTML = arrChars[c];
			if (arrCharsIds[c] == 'nRequirements') {
				var minVal = nMinReqChars;
			} else {
				var minVal = 0;
			}
			if (arrChars[c] == minVal + 1) {
				oImg.className = 'pass';
				oBonus.parentNode.className = 'pass';
			} else if (arrChars[c] > minVal + 1) {
				oImg.className = 'exceed';
				oBonus.parentNode.className = 'exceed';
			} else {
				oImg.className = 'fail';
				oBonus.parentNode.className = 'fail';
			}
		}

		/* Determine if suggested requirements have been met and set image indicators accordingly */
		var arrChars = [
			nAlphasOnly,
			nNumbersOnly,
			nRepChar,
			nConsecAlphaUC,
			nConsecAlphaLC,
			nConsecNumber,
			nSeqAlpha,
			nSeqNumber,
			nSeqSymbol,
		];
		var arrCharsIds = [
			'nAlphasOnly',
			'nNumbersOnly',
			'nRepChar',
			'nConsecAlphaUC',
			'nConsecAlphaLC',
			'nConsecNumber',
			'nSeqAlpha',
			'nSeqNumber',
			'nSeqSymbol',
		];
		var arrCharsLen = arrChars.length;
		for (var c = 0; c < arrCharsLen; c++) {
			var oImg = $('div_' + arrCharsIds[c]);
			var oBonus = $(arrCharsIds[c] + 'Bonus');
			$(arrCharsIds[c]).innerHTML = arrChars[c];
			if (arrChars[c] > 0) {
				oImg.className = 'warn';
				oBonus.parentNode.className = 'warn';
			} else {
				oImg.className = 'pass';
				oBonus.parentNode.className = 'pass';
			}
		}

		/* Determine complexity based on overall score */
		if (nScore > 100) {
			nScore = 100;
		} else if (nScore < 0) {
			nScore = 0;
		}
		if (nScore >= 0 && nScore < 20) {
			sComplexity = 'Very Weak';
		} else if (nScore >= 20 && nScore < 40) {
			sComplexity = 'Weak';
		} else if (nScore >= 40 && nScore < 60) {
			sComplexity = 'Good';
		} else if (nScore >= 60 && nScore < 80) {
			sComplexity = 'Strong';
		} else if (nScore >= 80 && nScore <= 100) {
			sComplexity = 'Very Strong';
		}

		/* Display updated score criteria to client */
		oScorebar.style.backgroundPosition = '-' + nScore * 4 + 'px';
		oScore.innerHTML = nScore + '%';
		oComplexity.innerHTML = sComplexity;
	} else {
		/* Display default score criteria to client */
		initPwdChk();
		oScore.innerHTML = nScore + '%';
		oComplexity.innerHTML = sComplexity;
	}
}

function togPwdMask() {
	var oPwd = $('passwordPwd');
	var oTxt = $('passwordTxt');
	var oMask = $('mask');
	if (oMask.checked) {
		oPwd.value = oTxt.value;
		oPwd.className = '';
		oTxt.className = 'hide';
	} else {
		oTxt.value = oPwd.value;
		oPwd.className = 'hide';
		oTxt.className = '';
	}
}

function initPwdChk(restart) {
	/* Reset all form values to their default */
	var arrZeros = [
		'nLength',
		'nAlphaUC',
		'nAlphaLC',
		'nNumber',
		'nSymbol',
		'nMidChar',
		'nRequirements',
		'nAlphasOnly',
		'nNumbersOnly',
		'nRepChar',
		'nConsecAlphaUC',
		'nConsecAlphaLC',
		'nConsecNumber',
		'nSeqAlpha',
		'nSeqNumber',
		'nSeqSymbol',
		'nLengthBonus',
		'nAlphaUCBonus',
		'nAlphaLCBonus',
		'nNumberBonus',
		'nSymbolBonus',
		'nMidCharBonus',
		'nRequirementsBonus',
		'nAlphasOnlyBonus',
		'nNumbersOnlyBonus',
		'nRepCharBonus',
		'nConsecAlphaUCBonus',
		'nConsecAlphaLCBonus',
		'nConsecNumberBonus',
		'nSeqAlphaBonus',
		'nSeqNumberBonus',
		'nSeqSymbolBonus',
	];
	var arrPassPars = [
		'nAlphasOnlyBonus',
		'nNumbersOnlyBonus',
		'nRepCharBonus',
		'nConsecAlphaUCBonus',
		'nConsecAlphaLCBonus',
		'nConsecNumberBonus',
		'nSeqAlphaBonus',
		'nSeqNumberBonus',
		'nSeqSymbolBonus',
	];
	var arrPassDivs = [
		'div_nAlphasOnly',
		'div_nNumbersOnly',
		'div_nRepChar',
		'div_nConsecAlphaUC',
		'div_nConsecAlphaLC',
		'div_nConsecNumber',
		'div_nSeqAlpha',
		'div_nSeqNumber',
		'div_nSeqSymbol',
	];
	var arrFailPars = [
		'nLengthBonus',
		'nAlphaUCBonus',
		'nAlphaLCBonus',
		'nNumberBonus',
		'nSymbolBonus',
		'nMidCharBonus',
		'nRequirementsBonus',
	];
	var arrFailDivs = [
		'div_nLength',
		'div_nAlphaUC',
		'div_nAlphaLC',
		'div_nNumber',
		'div_nSymbol',
		'div_nMidChar',
		'div_nRequirements',
	];
	for (var i in arrZeros) {
		$(arrZeros[i]).innerHTML = '0';
	}
	for (var i in arrPassPars) {
		$(arrPassPars[i]).parentNode.className = 'pass';
	}
	for (var i in arrPassDivs) {
		$(arrPassDivs[i]).className = 'pass';
	}
	for (var i in arrFailPars) {
		$(arrFailPars[i]).parentNode.className = 'fail';
	}
	for (var i in arrFailDivs) {
		$(arrFailDivs[i]).className = 'fail';
	}
	$('passwordPwd').value = '';
	$('passwordTxt').value = '';
	$('scorebar').style.backgroundPosition = '0';
	if (restart) {
		$('passwordPwd').className = '';
		$('passwordTxt').className = 'hide';
		$('mask').checked = true;
	}
}

addLoadEvent(function () {
	initPwdChk(1);
});
