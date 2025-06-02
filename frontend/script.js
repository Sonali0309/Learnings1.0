const API_URL = 'http://localhost:5000/api/tasks'

document.getElementById('taskForm').addEventListener('submit', async e => {
  e.preventDefault()
  const title = document.getElementById('title')
  const description = document.getElementById('description')
  const dueDate = document.getElementById('dueDate')
  const priority = document.getElementById('priority')

  const task = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    priority: priority.value
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  })

  title.value = description.value = dueDate.value = priority.value = ''  // reset all inputs

  loadTasks()
})


async function loadTasks() {
  const res = await fetch(API_URL)
  const tasks = await res.json()
  const list = document.getElementById('taskList')
  list.innerHTML = ''
  tasks.forEach(task => {
    const li = document.createElement('li')
    li.innerHTML = `
      <strong>${task.title}</strong>  Priority: ${task.priority}       
      <button onclick="deleteTask('${task._id}')">Completed</button>
    `
    list.appendChild(li)
  })
}

async function toggleTask(id, status) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isCompleted: !status })
  })
  loadTasks()
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  loadTasks()
}

loadTasks()
