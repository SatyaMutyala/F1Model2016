(function(undefined) {
    'use strict';
    // Check if dependecies are available.
    if (typeof XLSX === 'undefined') {
        console.log('xlsx.js is required. Get it from https://github.com/SheetJS/js-xlsx');
        return;
    }
    var X = XLSX;
    var root = this;

    var XLSXReader = function(file, callback) {
        var obj = {};        
        XLSXReader.utils.readFile(obj, file, callback);
        return obj;
    }

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = XLSXReader;
        }
        exports.XLSXReader = XLSXReader;
    } else {
        root.XLSXReader = XLSXReader;
    }



    XLSXReader.utils = {
    	readFile : function(obj, f, callback) {
    		var reader = new FileReader();
    		var name = f.name;
    		reader.onload = function(e) {
				var wb;
				var data = e.target.result;
				var arr = XLSXReader.utils.fixdata(data);
				wb = X.read(btoa(arr), {type: 'base64'});
				obj = XLSXReader.utils.process_wb(wb);
                callback(obj);
			};
			reader.readAsArrayBuffer(f);
    	},
    	process_wb : function(wb) {
    		var output = "";
			output = JSON.stringify(XLSXReader.utils.to_json(wb), 2, 2);
            return output;
    	},
    	fixdata : function(data) {
			var o = "", l = 0, w = 10240;
			for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
			o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
			return o;
		},
		to_json: function(workbook) {
			var result = {};
			workbook.SheetNames.forEach(function(sheetName) {
				var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				if(roa.length > 0){
					result[sheetName] = roa;
				}
			});
			return result;
		}
    };



}).call(this);