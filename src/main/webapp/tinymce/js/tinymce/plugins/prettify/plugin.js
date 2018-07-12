tinyMCEPopup.requireLangPack();

// 编码 html
function escapeHtml(text) {
	return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// 解码 html
function unescapeHtml(text) {
	return text.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");
}

function trim(str) {
	if(typeof(str)=="string") return str.replace(/^\s+|\s+$/g,"");
	else return str;
}

function findPreTag(ed) {
	var pre = ed.selection.getNode();

	if(pre == null || pre.tagName.toLowerCase() != 'pre')
		return null;
	
	return pre;	
}

var PrettifyDialog = {
	init : function() {
		var f, pre;
		var parameters = Array();
		var type = "";
				
		ed = tinyMCEPopup.editor;
		f = document.forms[0];
		pre = findPreTag(ed);

		if(pre != null) {
			f.prettify_code.value = unescapeHtml(pre.innerHTML);

			var classes = ed.dom.getAttrib(pre, 'class').split(" ");
			f.prettify_linenums.checked = (classes.length == 2 && classes[1]=="linenums");
		}
	},

	insert : function() {
		var f = document.forms[0], textarea_output, options = '';
		
		// 没有粘贴代码时直接返回.
		if(f.prettify_code.value == '') {
			tinyMCEPopup.close();
			return false;
		}

		var class_name = 'prettyprint';
		if( f.prettify_linenums.checked) class_name = 'prettyprint linenums';	// 显示行号

		var pre = findPreTag(tinyMCEPopup.editor);
		if(pre == null) {
			textarea_output = '<pre class="' + class_name + '">';
			textarea_output +=  escapeHtml(f.prettify_code.value);
			textarea_output += '</pre>';
			textarea_output += '<p></p>';
			tinyMCEPopup.editor.execCommand('mceInsertContent', false, textarea_output);
		} else {
			pre.className = class_name;
			pre.innerHTML = escapeHtml(f.prettify_code.value);
		}
		
		tinyMCEPopup.close();
	}	
};

tinyMCEPopup.onInit.add(PrettifyDialog.init, PrettifyDialog);
