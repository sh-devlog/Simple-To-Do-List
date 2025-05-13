// 할 일 추가
function addTodo() {
  const todoInput = document.getElementById('todo-input'); // 입력창 요소 가져오기
  const todoText = todoInput.value.trim(); // 입력된 텍스트에서 앞뒤 공백 제거

  if (todoText === '') return; // 텍스트가 비어있으면 함수 종료 (할 일 없음)

  const newTodo = {
    text: todoText,    // 할 일 내용
    done: false        // 처음에는 완료되지 않은 상태
  };

  const todos = JSON.parse(localStorage.getItem('todos')) || []; // 기존 저장된 할 일 목록 불러오기 (없으면 빈 배열)
  todos.push(newTodo); // 새로운 할 일 추가
  localStorage.setItem('todos', JSON.stringify(todos)); // 다시 localStorage에 저장 (문자열로 변환해서)

  renderTodoList(); // 화면에 목록 다시 그리기
  todoInput.value = ''; // 입력창 비우기
}

// 할 일 삭제
function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos')) || []; // 저장된 할 일 목록 불러오기
  todos.splice(index, 1); // index번째 항목 삭제 (1개만)
  localStorage.setItem('todos', JSON.stringify(todos)); // 변경된 목록 다시 저장
  renderTodoList(); // 화면에 목록 다시 그리기
}

// 할 일 목록 그리기
function renderTodoList() {
  const todoList = document.getElementById('todo-list'); // 할 일 표시할 영역 가져오기
  todoList.innerHTML = ''; // 이전에 있던 목록 지우기 (초기화)

  const savedTodos = JSON.parse(localStorage.getItem('todos')) || []; // 저장된 할 일 목록 불러오기

  savedTodos.forEach((todo, index) => { // 하나씩 꺼내서 반복 처리
    const li = document.createElement('li'); // <li> 요소 만들기

    // 체크박스 만들기
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; // 체크박스 타입
    checkbox.checked = todo.done; // 완료된 항목이면 체크된 상태로 보이게

    // 체크 상태가 바뀌면 실행될 이벤트 등록
    checkbox.addEventListener('change', () => {
      savedTodos[index].done = checkbox.checked; // 해당 항목의 done 값을 체크 상태로 변경
      localStorage.setItem('todos', JSON.stringify(savedTodos)); // 변경사항 저장
      renderTodoList(); // 다시 목록 그리기 (화면 업데이트)
    });

    // 텍스트 표시
    const span = document.createElement('span');
    span.className = 'todo-text'; // 스타일 클래스 지정
    span.textContent = todo.text; // 할 일 텍스트 표시

    if (todo.done) { // 완료된 항목이면 스타일 적용
      span.style.textDecoration = 'line-through'; // 줄긋기
      span.style.color = 'gray'; // 색상 변경
    }

    // 삭제 버튼 만들기
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제'; // 버튼 글자
    deleteBtn.onclick = () => deleteTodo(index); // 클릭하면 해당 항목 삭제

    // li에 요소들 붙이기
    li.appendChild(checkbox); // 체크박스 추가
    li.appendChild(span);     // 텍스트 추가
    li.appendChild(deleteBtn); // 삭제 버튼 추가
    todoList.appendChild(li); // 전체 li를 목록에 추가
  });
}

// 버튼 클릭 시 할 일 추가
document.getElementById('add-btn').onclick = addTodo; // 추가 버튼 클릭하면 addTodo 실행

// Enter 키 입력 시 할 일 추가
document.getElementById('todo-input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') { // Enter 키 눌렀는지 확인
    addTodo(); // Enter로도 할 일 추가 가능하게 함
  }
});

// 시작할 때 목록 불러오기
window.onload = renderTodoList; // 페이지 로드되면 저장된 목록 자동 표시