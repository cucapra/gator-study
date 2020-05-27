$( document ).ready(function() {
    
    var cm = CodeMirror(document.getElementById("editor"), {
        value: "function myScript() {\n    return 100;\n}",
        mode: "javascript",
        indentUnit: 4,
        lineNumbers: true,
        theme: "darcula"
    });
    
    var textMarker;
    
    $('#add').click(function() {
        textMarker = cm.markText({
            line: 1,
            ch: 4
        }, {
            line: 1,
            ch: 10
        }, {
            className: 'marked-text'
        });
        
        $('.marked-text').tooltip({
            title: 'This is a return statement',
            container: 'body',
            delay: { "show": 500, "hide": 100 },
            animation: false
        });
    });
    
    $('#remove').click(function() {
        if (textMarker) {
            textMarker.clear();
        }
    });

})