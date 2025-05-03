// HTML要素を取得する
const dateInput = document.getElementById('current-date');
const insightTextarea = document.getElementById('todays-insight');
const saveButton = document.querySelector('button'); // 最初のボタンを取得

// 今日の日付を入力欄の初期値として設定する関数
function setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.value = `<span class="math-inline">\{year\}\-</span>{month}-${day}`;
}

// ページが読み込まれたときに今日の気づきを読み込む関数
function loadTodaysInsight() {
    const today = dateInput.value; // 日付入力欄の値を取得
    if (today) {
        const savedData = localStorage.getItem(today); // Local Storageから今日の日付のデータを取得
        if (savedData) {
            insightTextarea.value = savedData; // データがあればテキストエリアに表示
        } else {
            insightTextarea.value = ''; // データがなければテキストエリアを空に
        }
    }
}

// 保存ボタンがクリックされたときの処理
saveButton.addEventListener('click', () => {
    const date = dateInput.value; // 入力された日付を取得
    const insight = insightTextarea.value; // 入力された気づきを取得

    if (!date) {
        alert('日付を選択してください！');
        return; // 日付がなければ保存しない
    }

    // Local Storageに保存する
    // キーを日付、値を気づきの内容とする
    localStorage.setItem(date, insight);

    alert('気づきを保存しました！'); // 保存完了のメッセージ
});

// ページが完全に読み込まれたら実行する
window.addEventListener('load', () => {
    setTodayDate(); // 今日の日付をセット
    loadTodaysInsight(); // 今日の記録を読み込む
});

// 日付が変更されたらその日の記録を読み込み直す
dateInput.addEventListener('change', () => {
    loadTodaysInsight();
});