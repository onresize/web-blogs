var textarea_content=document.getElementById("input");
textarea_content.innerHTML="";
textarea_content.innerHTML+=("/*   净化：去掉代码中多余的注释、换行、空格等	                */\n");
textarea_content.innerHTML+=("/*   压缩：将代码压缩为更小体积，便于传输	                    */\n");
textarea_content.innerHTML+=("/*   以下是演示代码				                */\n");
textarea_content.innerHTML+=("$.extend({\n");
textarea_content.innerHTML+=("	includePath : \'\',\n");
textarea_content.innerHTML+=("	include : function(file) {\n");
textarea_content.innerHTML+=("		var files = typeof file == \"string\" ? [ file ] : file;\n");
textarea_content.innerHTML+=("		for ( var i = 0; i < files.length; i++) {\n");
textarea_content.innerHTML+=("			var name = files[i].replace(/^\/\/s|\/\/s$/g, \"\");\n");
textarea_content.innerHTML+=("			var att = name.split(\'.\');\n");
textarea_content.innerHTML+=("			var ext = att[att.length - 1].toLowerCase();\n");
textarea_content.innerHTML+=("			var isCSS = ext == \"css\";\n");
textarea_content.innerHTML+=("			var tag = isCSS ? \"link\" : \"script\";\n");
textarea_content.innerHTML+=("			var attr = isCSS ? \" type=\'text/css\' rel=\'stylesheet\' \": \" language=\'javascript\' type=\'text/javascript\' \";\n");
textarea_content.innerHTML+=("			var link = (isCSS ? \"href\" : \"src\") + \"=\'\" + $.includePath + name");
textarea_content.innerHTML+=("+ \"\'\";\n");
textarea_content.innerHTML+=("			if ($(tag + \"[\" + link + \"]\").length == 0)\n");
textarea_content.innerHTML+=("				document.write(\"<\" + tag + attr + link + \"></\" + tag + \">\");\n");
textarea_content.innerHTML+=("		}\n");
textarea_content.innerHTML+=("	}\n");
textarea_content.innerHTML+=("});\n");