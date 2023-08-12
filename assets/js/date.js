// 공통으로 사용될 현재 날짜 및 시간 정보 변수
const now = new Date();

// 날짜 정보 업데이트 함수
function updateDate() {
  // DOM 요소들을 변수에 할당
  const dayElement = document.getElementById('day');
  const monthElement = document.getElementById('month');
  const yearElement = document.getElementById('year');
  const dayOfWeekElement = document.getElementById('dayOfWeek');

  // 날짜 표시 옵션 설정
  const options = {
    weekday: 'short', // 요일 (짧은 형식)
    month: 'short', // 월 (짧은 형식)
    // year: 'numeric', // 연도 (숫자 형식)
    // day: 'numeric', // 일 (숫자 형식)
  };

  // 요소들에 날짜 정보 설정
  dayElement.innerText = now.getDate(); // 일 설정
  monthElement.innerText = now.toLocaleDateString(undefined, {
    month: 'short',
  }); // 월 설정
  yearElement.innerText = now.getFullYear(); // 연도 설정
  dayOfWeekElement.innerText = now.toLocaleDateString(undefined, {
    weekday: 'short',
  }); // 요일 설정
}

// 시간 정보 업데이트 함수
function updateTime() {
  // 시간 정보를 표시할 요소 가져오기
  const timeElement = document.getElementById('time');

  // 시간과 분 정보 추출
  const hours = now.getHours(); // 시
  const minutes = now.getMinutes(); // 분

  // 시간을 12시간 형식으로 변경하고 AM/PM 구분
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  // 현재 시간을 AM/PM 형식으로 표시하여 요소에 설정
  timeElement.textContent = `${displayHours}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${ampm}`;
}

// 날짜 정보를 매 1분마다 업데이트
setInterval(updateDate, 60000);

// 시간 정보를 매 1초마다 업데이트
setInterval(updateTime, 1000);

// 페이지 로드 시에도 날짜 정보와 시간 정보를 초기화
updateDate();
updateTime();
