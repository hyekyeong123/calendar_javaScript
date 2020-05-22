## 바닐라 자바스크립트로 달력 기능 만들기

##### 출처
> https://medium.com/@wooder2050/%EB%B0%94%EB%8B%90%EB%9D%BC%EC%BD%94%EB%94%A9-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EB%8B%AC%EB%A0%A5-calendar-todo-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-f635ef8cce76

Todo
1. 아래 이미지의 달력과 기능 및 스타일이 최대한 일치하도록 달력을 만들시오. 과거나 미래의 연도 또한 보여줄 수 있어야 합니다.

2. 달력 아래에는 Todo List를 만들어야 합니다.
3.Todo List는 날짜별로 관리되기 때문에, 날짜를 클릭할때마다 Todo List는 클릭된 날짜에 해당하는 Todo List를 보여주어야 합니다.
아래 사항들이 충족되어야 Pass 입니다.
날짜 및 요일 확인 가능(작년, 재작년, 내년 등 모두 포함)
날짜 선택 기능
선택된 날짜 표기 기능(날짜 숫자색 변경)
날짜 선택 시, 해당 날짜에 대한 Todo List 보여주기 기능
Todo List에 Todo Item 추가 기능(해당 날짜의 Todo Item으로 추가됨)
다른 날짜 선택시, 새롭게 선택된 날짜에 대한 Todo List 보여주기 기능

--------
> classList()
> 자바스크립트에서 클래스를 제어할 때 사용
> classList.add()
> classList.remove()
> classList.contains() // 제이쿼리의 hasClass와 동일

> classList.toggle()
> 이 함수는 인자를 두개를 받을 수 있는데, 처음 인자는 **토글링할 class 이름**이고 다음 인자는 선택인자로 **boolean 타입**을 받는다. 
> 이 인자를 true를 설정하면 강제로 class를 추가히고 false로 설정하면 강제로 class를 삭제한다 

------------------
문제 1. 오늘 월이 안나옴
문제 2. 공백을 입력했을때는 입력하게 만들어선 안됨 
문제 3. 엔터를 눌러서도 입력이 되게