var packer = new Packer;
new base2.JSB.RuleList({
	"#form" : {
		ondocumentready : function() {
			this.removeClass("disabled");
			output.value = "";
			this.ready()
		},
		ready : function() {
			message.write("准备");
			input.focus()
		}
	},
	"#input,#output" : {
		disabled : false,
		spellcheck : false
	},
	"#clear-all" : {
		disabled : false,
		onclick : function() {
			input.value = "";
			output.value = "";
			uploadScript.style.display = "";
			loadScript.style.display = "";
			uploadScript.disabled = true;
			saveScript.disabled = false;
			form.ready()
		}
	},
	"#pack-script" : {
		disabled : false,
		onclick : function() {
			try {
				output.value = "";
				if (input.value) {
					var A = packer.pack(input.value, base62.checked,
							shrink.checked);
					output.value = A;
					message.update()
				}
			} catch (B) {
				message.error("error packing script", B)
			} finally {
				saveScript.disabled = !output.value;
				decodeScript.disabled = !output.value || !base62.checked
			}
		}
	},
	"#beauty-script" : {
		disabled : true,
		onclick : function() {
			try {
				output.value = "";
				if (input.value) {
					var A = beautify(input.value);
					output.value = A;
					message.update()
				}
			} catch (B) {
				message.error("error beauty script", B)
			} finally {
				saveScript.disabled = !output.value
			}
		}
	},
	"#load-script" : {
		disabled : false,
		onclick : function() {
			uploadScript.style.display = "inline";
			uploadScript.disabled = false;
			this.style.display = "none"
		}
	},
	"#save-script" : {
		onclick : function() {
			form.command.value = "save"
		}
	},
	"#decode-script" : {
		onclick : function() {
			try {
				if (output.value) {
					var start = new Date;
					eval("var value=String" + output.value.slice(4));
					var stop = new Date;
					output.value = value;
					message.write("解码用时: " + (stop - start) + " 毫秒")
				}
			} catch (error) {
				message.error("解码失败", error)
			} finally {
				decodeScript.blur();
				decodeScript.disabled = true
			}
		}
	},
	"#upload-script" : {
		onchange : function() {
			form.encoding = "multipart/form-data";
			form.command.value = "load";
			form.submit()
		}
	},
	"#copy-script" : {
		onclick : function() {
			try {
				if (output.value) {
					copyToClipBoard(output.value);
					message.write("output copy sucess")
				} else {
					alert("好像没有什么可复制的")
				}
			} catch (A) {
				message.error("error copy ", A)
			} finally {
			}
		}
	},
	"#paste-script" : {
		onclick : function() {
			try {
				setTxt();
				message.write(" pasted")
			} catch (A) {
				message.error("error paste", A)
			} finally {
			}
		}
	},
	"#base62,#shrink" : {
		disabled : false
	},
	"#message" : {
		error : function(B, A) {
			this.write(B + ": " + A.message, "error")
		},
		update : function(B) {
			var C = input.value.length;
			if (!/\r/.test(input.value)) {
				C += match(input.value, /\n/g).length
			}
			var D = output.value.length + "/" + C;
			var A = (output.value.length / C).toFixed(3);
			this.write((B ? B + ", " : "") + format("压缩率: %1=%2", D, A))
		},
		write : function(B, A) {
			this.innerHTML = B;
			this.className = A || ""
		}
	}
});
if (!(0).toFixed) {
	Number.prototype.toFixed = function(B) {
		var D = Math.pow(10, B);
		var A = String(Math.round(this * D));
		if (A == 0) {
			for ( var C = 0; C < B; C++) {
				A += "0"
			}
		}
		return A.slice(0, A.length - B) + "." + A.slice(A.length - B)
	}
};