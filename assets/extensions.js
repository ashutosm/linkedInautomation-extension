String.prototype.replaceAll = function (search, replacement) {
  let target = this;
  return target.split(search).join(replacement);
};

function replaceRestrictedSymbolsInner(str) {
  return str.replaceAll('.', '').replaceAll('#', '').replaceAll('$',
    '').replaceAll('[', '').replaceAll(']', '').replaceAll('/',
    '').replaceAll('\\n', '').replaceAll('&quot;').replaceAll('\'');
}
