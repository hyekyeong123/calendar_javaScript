//이전, 다음버튼과 month가 들어갈 공간
var currentTitle = document.getElementById('current-year-month');

//date가 들어갈 공간
var calenderBody = document.getElementById('calendar-body');

var today = new Date(); //오늘 날짜

//오늘 날짜의 현재 년도, 현재 월을 구하고 그것의 첫번째 1일을 구하는것
var first = new Date(today.getFullYear(), today.getMonth(), 1);

var dayList = [
    'Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday'
];
var monthList = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

var leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//2월 29일은 윤년에만 존재하는데, 윤년은 보통 서기의 해가 4의 배수인 해에 해당된다. 그러나 400의 배수인 경우를 제외하면 100의 배수인 해에는 이 날이 없다. 

var notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var pageFirst = first; //현재 월의 1일
var pageYear; //달의 마지막 일

function check_leap(first) { 
    if (first.getFullYear() % 4 === 0 && (first.getFullYear() & 100 !== 0 || first.getFullYear() % 400 === 0)) {
        //윤일이라면 
        pageYear = leapYear;
    } else { 
        pageYear = notLeapYear;
    }
}
check_leap(first);
// var은 변수 한번 선언했음에도 또다시 선언 가능, 에러 나오지 않고 각기 다른 값이 출력
// let과 const는 변수 재선언이 되지 않음
// 다만 let은 변수를 바꿀 수는 있음, 다시 let을 선언해서가 아니라 호출해서
// const는 불가능

function showCalendar() { 
    let monthCnt = 100;
    let cnt = 1; //일

    for (var i = 0; i < 6; i++) { 
        //주(week) 만들기 -> 최대 6주

        var $tr = document.createElement('tr'); //<tr>태그 만들기
        $tr.setAttribute('id', monthCnt);



        for (var j = 0; j < 7; j++) {
            //일 만들기 -> 총 7번
                                                    //달력 출력 종료 조건
            if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
                // 첫 주이고 첫번째 시작날짜보다 적다면(즉 그달의 처음날짜라면) 
                // || 그 날 월을 구해서 그 인덱스의 pegeYear을 보면 그 날의 마지막 날짜가 나옴(마지막 날짜가 현재 일보다 작다면) -> 종료
                
                var $td = document.createElement('td');
                $tr.appendChild($td);//$tr > $td

            } else { 
                var $td = document.createElement('td');
                $td.textContent = cnt; //현재 일수

                $td.setAttribute('id', cnt); //id는 그날 일로
                $tr.appendChild($td);
                cnt++; //날짜 증가
            }
        }
        monthCnt++; 
        calenderBody.appendChild($tr);
    }
}
showCalendar();


function removeCalendar() { //달력 삭제
    let catchTr = 100;
    for (var i = 100; i < 106; i++) {
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}
// -----------------------------------------------------------------------------------------------------------
// 이전 달과 다음 달로 이동하기
var inputBox = document.getElementById('input-box'); // 할일 input
var inputDate = document.getElementById('input-data'); // 할일 input 입력 버튼
var inputList = document.getElementById('input-list'); // 할일 list 목록들

//이전 버튼 클릭시 불러올 함수-------------------------------------------------------------------------------
function prev() { 
    inputBox.value = ''; //할일리스트를 다시 공백으로 만들고
    const $divs = document.querySelectorAll('#input-list > div');
                            //css 선택자를 가진 모든 요소를 배열로 가져오는 메서드
    
    $divs.forEach(function (e) {
        e.remove();
        //할일 리스트 모두 지우기
    });

    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function (e1) {
        e1.remove();
        //할일 리스트 목록의 버튼들도 모두 지우기
    });

    if (pageFirst.getMonth() === 1) { //현재 1월이라면 
        pageFirst = new Date(first.getFullYear() - 1, 12, 1);
                            //현재 연도에서 -1, 12월, 1일
        
        first = pageFirst; //현재 월의 1일
        check_leap(first); /// 다시 그날 연도의 윤일 체크
    } else { 
        //현재 1월이 아니라면 단순히 -1만 해주면 됨
        pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
                            //현재 연도, 현재 달에 -1, 1일
        first = pageFirst;
    }

    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                                                //이전버튼 클릭시 불러올 함수니까 -1하기
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
    //이전, 다음 버튼과 월이 들어갈 공간                                                  //연도
    
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate()); //오늘 날짜 아이디 가져오기(아이디는 해당 날짜 int)
    clickedDate1.classList.add('active'); //?????????????????????????????
    clickStart();
    reshowList();
}
// 다음 버튼클릭시 볼러올 함수-------------------------------------------------------------------------------------------
function next() {
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function (e) {
        e.remove(); //할일리스트 지우기
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function (e1) {
        e1.remove();//할일리스트 버튼 지우기
    });
    if (pageFirst.getMonth() === 12) {
        pageFirst = new Date(first.getFullYear() + 1, 1, 1); //현재 년도에 1을 더하기 월 1일로
        first = pageFirst;
        check_leap(first);
    } else {
        pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
        first = pageFirst;
    }

    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
    removeCalendar(); //지웠다가
    showCalendar(); //다시 생성
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
}
//-------------------------------------------------------------------------------------------------------
// 클릭해서 날짜 색상 변경, 왼쪽 화면 변경
var mainTodayDay = document.getElementById('main-day');
var mainTodayDate = document.getElementById('main-date');
function showMain() { 
    mainTodayDay.innerHTML = dayList[today.getDay()];
    mainTodayDate.innerHTML = today.getDate();
}

//아무런 클릭을 안했을때에는 현재 날짜에 active 주기
var clickDate1 = document.getElementById(today.getDate()); //오늘 날짜 가져오기
clickDate1.classList.add('active'); //active라는 클래스 추가하기 

var prevBtn = document.getElementById('prev');
prevBtn.addEventListener('click', prev);

var nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', next); //next라는 함수 호출

var tdGroup = []; //일을 배열에 넣기


function clickStart() { 
    for (let i = 1; i <= pageYear[first.getMonth()]; i++) { 
                        //현재 월의 마지막 날짜
        tdGroup[i] = document.getElementById(i); 
        tdGroup[i].addEventListener('click',changeToday); //날짜에 클릭하면 changeToday() 함수 발생
    }
}

//오늘 날짜 변경
function changeToday(e) { 
    for (let i = 1; i <= pageYear[first.getMonth()]; i++) { 
       //현재 월의 마지막 날짜만큼 반복

            //날짜
        if (tdGroup[i].classList.contains('active')) { //클래스 active 포함되어 있는 것이 있는가?
            tdGroup[i].classList.remove('active');
        }
    }

    clickDate1 = e.currentTarget; //현재 이벤트타켓이 바인딩된 요소
    clickDate1.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), clickDate1.id);
    showMain();

    //키 값 넣어주기
    keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
    reshowingList();
}
// -----------------------------------------------------------------------------------------------------------
// 4. Todo-List 입력, 체크, 삭제하기
function reshowingList() { 
    keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
    if (todoList[keyValue] === undefined || todoList[keyValue].length === 0) {
        //정의 되어 있지 않다면 모두 빈 값으로
        inputList.textContent = '';
        todoList[keyValue] = [];

        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function (e) {
            e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $divs.forEach(function (e1) {
            e1.remove();
        });
    } else {  //keyValue가 정의되어 있다면
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function (e) {
            e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $divs.forEach(function (e1) {
            e1.remove();
        });

        var $div = document.createElement('div');
        for (var i = 0; i < todoList[keyValue].length; i++) { 
            var $div = document.createElement('div');
            $div.textContent = '-' + todoList[keyValue][i];
            var $btn = document.createElement('button');
            $btn.setAttribute('type','button');
            $btn.setAttribute('id','del-ata');
            $btn.setAttribute('id', dataCnt + keyValue);;
            $btn.setAttribute('class', 'del-data');;
            $btn.textContent = delText;
            inputList.appendChild($div);
            inputList.appendChild($btn);
            $div.addEventListener('click', checkList);
            $btn.addEventListener('click', deleteTodo);
            inputBox.value = '';


            function deleteTodo() {
                $div.remove();
                $btn.remove();
            }
        }
    }
}
var delText = 'X';
//만약에 inputBox에서 enter를 누르면 inputdate를 클릭한 거와 같다. 

inputDate.addEventListener('click', addTodoList);
var dataCnt = 1;
keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
var todoList = [];
todoList[keyValue] = [];

function addTodoList() {
    var $div = document.createElement('div');
    $div.textContent = '-' + inputBox.value;
    var $btn = document.createElement('button');
    $btn.setAttribute('type', 'button');
    $btn.setAttribute('id', 'del-ata');
    $btn.setAttribute('id', dataCnt + keyValue);
    $btn.setAttribute('class', "del-data");
    $btn.textContent = delText;
    inputList.appendChild($div);
    inputList.appendChild($btn);
    todoList[keyValue].push(inputBox.value);
    dataCnt++;
    inputBox.value = '';
    $div.addEventListener('click', checkList);
    $btn.addEventListener('click', deleteTodo);
    function deleteTodo() {
        $div.remove();
        $btn.remove();
    }
}
console.log(keyValue);

//글에 중간선이 그어짐
function checkList(e) {
    e.currentTarget.classList.add('checked'); //클래스 추가
}

