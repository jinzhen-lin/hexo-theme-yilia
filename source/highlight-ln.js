// highlight.js line number
(function(factory) {

  var BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

  function getLines(text) {
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
  }

  function getLinesCount(text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
  }

  function duplicateMultilineNodes(element) {
    var nodes = element.childNodes;
    for (var node in nodes) {
      if (nodes.hasOwnProperty(node)) {
        var child = nodes[node];
        if (getLinesCount(child.textContent) > 0) {
          if (child.childNodes.length > 0) {
            duplicateMultilineNodes(child);
          } else {
            duplicateMultilineNode(child.parentNode);
          }
        }
      }
    }
  }

  function duplicateMultilineNode(element) {
    var className = element.className;

    if (!/hljs-/.test(className)) return;

    var lines = getLines(element.innerHTML);
    var line = "";
    for (var i = 0, result = ''; i < lines.length; i++) {
      var lineText = lines[i].length > 0 ? lines[i] : ' ';
      span_node = $("<span></span>").html(lineText).addClass(className);
      result += span_node.prop("outerHTML");
    }

    element.innerHTML = result.trim();
  }

  function addLineNumbersBlockFor(inputHtml) {
    var lines = getLines(inputHtml);
    if (lines[lines.length - 1].trim() === '') {
      lines.pop();
    }
    if (lines.length <= 1) {
      return inputHtml;
    }
    var html = "";
    var num_table = $("<ol class='hljs-ol-num'></ol>");

    var code_table = $("<ol class='hljs-ol-code'></ol>");
    for (var i = 0; i < lines.length; i++) {
      num_table.append("<li>" + "" + "</li>");
      code_table.append("<li><code>" + lines[i] + "\n</code></li>");
    }

    return num_table.prop("outerHTML") + code_table.prop("outerHTML");
  }
  
  window.hlln = {};
  window.hlln.addLineNumbersBlockFor = addLineNumbersBlockFor;
  window.hlln.duplicateMultilineNodes = duplicateMultilineNodes;
})()