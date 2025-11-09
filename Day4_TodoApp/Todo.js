const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

const filterButtons = document.querySelectorAll('.filter-btn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// State
let currentFilter = 'all'; // 'all' | 'active' | 'completed'
renderTasks();

// Add new task
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert('Please enter a task!');

  tasks.push({ text, done: false });
  saveTasks();
   taskInput.value = '';
  renderTasks();
 
}


// Render task List
function renderTasks(){
    taskList.innerHTML = '';

     // Apply filter and render
  const filtered = tasks.filter(task => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'active') return !task.done;
    if (currentFilter === 'completed') return task.done;
  });

    tasks.forEach((task, index) => {
        const realIndex = tasks.indexOf(task);

        const li = document.createElement('li');
        li.className = `flex justify-between items-center p-3 rounded-lg border ${task.done ? 'bg-green-50' : 'bg-white'}`;
         
        // Clickable text toggles
        const span = document.createElement('span');
        span.className = `flex-1 ${task.done ? 'line-through text-gray-500': ''} cursor-pointer`;
        span.textContent = task.text;
        span.addEventListener('click', () => toggleTask(realIndex));

        // Action buttons
        const actions = document.createElement('div');
        actions.className = 'flex items-center gap-2';
        
        const toggleBtn = document.createElement('button');
    toggleBtn.className = 'text-green-600 hover:text-green-800';
    toggleBtn.textContent = '✔';
    toggleBtn.title = 'Mark complete';
    toggleBtn.addEventListener('click', () => toggleTask(realIndex));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'text-red-600 hover:text-red-800';
    deleteBtn.textContent = '🗑';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => deleteTask(realIndex));
    
    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
    });

    updateProgress();

    // update filter button aria-pressed states (for accessibility)
  filterButtons.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    btn.setAttribute('aria-pressed', filter === currentFilter ? 'true' : 'false');
  });
}

// Toggle completion by real index in tasks array
function toggleTask(index) {
  if (typeof index !== 'number' || index < 0) return;
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// Delete by real index
function deleteTask(index) {
  if (typeof index !== 'number' || index < 0) return;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter buttons behavior
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // set filter
    currentFilter = btn.getAttribute('data-filter');

    // update active button visuals
    filterButtons.forEach(b => {
      b.classList.remove('bg-green-600', 'text-white');
      b.classList.add('bg-white', 'text-green-600');
    });
    btn.classList.remove('bg-white', 'text-green-600');
    btn.classList.add('bg-green-600', 'text-white');

    // re-render list using new filter
    renderTasks();
  });
});

// Progress calculation & update
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // text
  progressText.textContent = `${completed} of ${total} completed`;

  // bar (animate width)
  progressBar.style.width = `${percent}%`;
}

// Optional: on initial load set the filter button styles properly
// (if you want "All" active by default)
(function initFilterButtons() {
  filterButtons.forEach(b => {
    if (b.getAttribute('data-filter') === currentFilter) {
      b.classList.add('bg-green-600', 'text-white');
      b.classList.remove('bg-white', 'text-green-600');
    } else {
      b.classList.add('bg-white', 'text-green-600');
      b.classList.remove('bg-green-600', 'text-white');
    }
  });
})();
