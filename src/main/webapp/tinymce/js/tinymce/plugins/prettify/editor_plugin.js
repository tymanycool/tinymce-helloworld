
(function() {

	//加载语言包.
	tinymce.PluginManager.requireLangPack('prettify');
	
	tinymce.create('tinymce.plugins.Prettify', {
		
		// 初始化
		init : function(ed, url) {

			ed.addCommand('mcePrettify', function() {
				ed.windowManager.open({
					file : url + '/prettify.htm',
					width : 450 + parseInt(ed.getLang('prettify.delta_width', 0)),
					height : 400 + parseInt(ed.getLang('prettify.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url
				});
			});

			ed.addButton('prettify', {
				title : 'prettify.desc',
				cmd : 'mcePrettify',
				image : url + '/prettify.png'
			});
		},


		createControl : function(n, cm) {
			return null;
		},


		getInfo : function() {
			return {
				longname : 'Google Code Prettify',
				author : 'Lou Barnes',
				authorurl : 'http://www.loubarnes.com',
				infourl : 'http://www.1024i.com',
				version : "1.0"
			};
		}
	});

	tinymce.PluginManager.add('prettify', tinymce.plugins.Prettify);
})();