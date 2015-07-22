var dodebug = false;
var styles = { options : {} };
                        
sendEvent = function(sel, step) {
            $(sel).trigger('next.m.' + step);
            }

function addValue(name, type, val, option_index){

    if(!styles.options[option_index]){
        styles.options[option_index] = {};
    }
    styles.options[option_index].name = name;
    styles.options[option_index].type = type;
    styles.options[option_index].values = val;

    if(dodebug){console.log(styles);}

}

function clearOptions(id){
    styles = { options : {} };
    $(id).find('input[type=text], textarea, select').val('');
    sendEvent(id, 1);
}

var objSize = function(obj) {
    var len = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) len++;
    }
    return len;
};

// http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

jQuery(function($) { $.extend({
    form: function(url, data, method, formid) {
        if (method == null) method = 'POST';
        if (data == null) data = {};

        var form = $('<form>').attr({
            method: method,
            action: url,
            id: formid
         }).css({
            display: 'none'
         });

        var addData = function(name, data) {
            if ($.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    var value = data[i];
                    addData(name + '[]', value);
                }
            } else if (typeof data === 'object') {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        addData(name + '[' + key + ']', data[key]);
                    }
                }
            } else if (data != null) {
                form.append($('<input>').attr({
                  type: 'hidden',
                  name: String(name),
                  value: String(data)
                }));
            }
        };

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                addData(key, data[key]);
            }
        }

        return form.appendTo('body');
    }
}); });