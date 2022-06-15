const start = document.querySelector('.btn_start');
const bestResult = document.querySelector('.btn_best_result');
const bestResultAll = document.querySelector('.btn_best_result_all');
const clearBestResult = document.querySelector('.btn_clear');
const clearBestResultAll = document.querySelector('.btn_clear_all');
const mainBtn = document.querySelector('.main_btn');

function getDataBaseObject() {
    const nickname = document.getElementById('nickname').value;
    let dataBase = localStorage.getItem('database');
    if (!dataBase) {
        dataBase = '{}';
    }
    let dataBaseObject = JSON.parse(dataBase);

    if (!dataBaseObject.hasOwnProperty(nickname)) {
        dataBaseObject[nickname] = {bestResult: 0}
    }

    if (!dataBaseObject.hasOwnProperty('bestResultForAllTime')) {
        dataBaseObject['bestResultForAllTime'] = {
            value: 0,
            nickname: ''
        }
    }
    return dataBaseObject;
}

start.onclick = function () {
    const nickname = document.getElementById('nickname').value;
    try {
        if (nickname === '' || nickname === ' ') {
            throw new Error('Empty nickname');
        } 
    } catch(error) {
        alert(error.message);
    }
    sessionStorage.setItem('nickname', nickname);
    let clicks = 0;
    let listener = mainBtn.addEventListener('click', function(){
        clicks++;
    })

    let dataBaseObject = getDataBaseObject();

    setTimeout(function(){
        mainBtn.removeEventListener('click', listener);        
        alert(`You clicked ${clicks} times`);

        if(clicks > dataBaseObject[nickname].bestResult) {
            dataBaseObject[nickname].bestResult = clicks;
        }

        if(clicks > dataBaseObject.bestResultForAllTime.value) {
            dataBaseObject.bestResultForAllTime.nickname = nickname;
            dataBaseObject.bestResultForAllTime.value = clicks;
        }
        localStorage.setItem('database', JSON.stringify(dataBaseObject));
    }, 5000);
}

bestResult.onclick = function() {
    const nickname = sessionStorage.nickname || '';
    let dataBaseObject = getDataBaseObject();
    alert(`Best result is: ${dataBaseObject[nickname].bestResult}`);
}

bestResultAll.onclick = function() {
    let dataBaseObject = getDataBaseObject();
    alert(`Best result for the whole time is: ${dataBaseObject.bestResultForAllTime.value} by 
    ${dataBaseObject.bestResultForAllTime.nickname}`);
}

clearBestResult.onclick = function() {
    const nickname = sessionStorage.nickname || '';
    let dataBaseObject = getDataBaseObject();
    dataBaseObject[nickname] = {bestResult: 0};
    localStorage.setItem('database', JSON.stringify(dataBaseObject));
    alert('Best result is cleared');
}

clearBestResultAll.onclick = function() {
    let dataBaseObject = getDataBaseObject();
    dataBaseObject.bestResultForAllTime = {
        value: 0,
        nickname: ''
    }
    localStorage.setItem('database', JSON.stringify(dataBaseObject));
    alert('Best result for the whole time is cleared');
}