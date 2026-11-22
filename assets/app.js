(function () {
  // 一覧の絞り込み
  var tabs = document.querySelectorAll('.tab');
  var only = document.getElementById('only-files');
  var cases = document.querySelectorAll('.cases .case');
  var empty = document.querySelector('.empty');
  var kind = 'all';
  function apply() {
    var shown = 0;
    cases.forEach(function (li) {
      var ok = (kind === 'all' || li.dataset.kind === kind) && (!only || !only.checked || li.dataset.hasFiles === '1');
      li.hidden = !ok;
      if (ok) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      kind = t.dataset.kind;
      tabs.forEach(function (x) {
        var on = x === t;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply();
    });
  });
  if (only) only.addEventListener('change', apply);

  // 提出前チェック（この端末にだけ保存）
  document.querySelectorAll('.checklist input[type=checkbox]').forEach(function (box) {
    var key = 'ps-check:' + box.dataset.key;
    try { box.checked = localStorage.getItem(key) === '1'; } catch (err) { /* 保存できない環境では毎回空で表示 */ }
    box.addEventListener('change', function () {
      try { localStorage.setItem(key, box.checked ? '1' : '0'); } catch (err) { /* 保存できなくてもチェック自体は使える */ }
    });
  });
})();
