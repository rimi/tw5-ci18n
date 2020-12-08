/*\
title: $:/plugins/rimir/core-hooks/filteroperators/splitter
type: application/javascript
module-type: filteroperator

Filter operator that splits the input by param-specified string ('-' is default) and rearranges all possible "linear upward-combinations" using the same split-delimiter. E.g. one-two-three results in one & one-two & one-two-three.
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
exports["xcombine"] = function(source,operator,options) {
	let results = [];
	let delim = '-';
	if(operator.operand){
		delim = operator.operand;
	}
	//console.log(operator);
	source(function(tiddler,title) {
		const parts = title.split(delim);
		let current = "";
		let firstRun = true;
		for (let i in parts) {
			if(!firstRun){
				current = current.concat(delim);
			}
			current = current.concat(parts[i]);
			results.unshift(current);
			firstRun = false;
		}
	});
	return results;
}

})();
