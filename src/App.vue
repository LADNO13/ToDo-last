<script setup>
import { ref } from 'vue'
const tasks = ref([])
const editingTask = ref(null)
const editedTitle = ref('')

const task = {
  id: tasks.value.length,
  title: '',
}

const addTask = () => {
  if (task.title.trim() === '') {
    alert('Задача не может быть пустой')
  } else {
    task.id = tasks.value.length
    tasks.value.push({...task})
    console.log(tasks.value)
    task.title = ''
  }
}

const removeTask = (id) => {
  tasks.value.splice(id, 1)
  tasks.value.forEach((task, index) => task.id = index)
}

const startEdit = (id) => {
  editingTask.value = id
  editedTitle.value = tasks.value[id].title
}

const saveEdit = () => {
  if (editedTitle.value.trim() === '') {
    alert('Задача не может быть пустой')
  } else{
  tasks.value[editingTask.value].title = editedTitle.value
  editingTask.value = null
  editedTitle.value = ''
  }
 
}

const cancelEdit = () => {
  editingTask.value = null
  editedTitle.value = ''
}

</script>


<template>
  <div class="container">
    <h1>Список задач</h1>
    <div class="form" v-if="editingTask !== null">
      <input 
        class="form-input"
        type="text" 
        v-model="editedTitle"
        placeholder="Изменить задачу"
      >
      <button @click="saveEdit" class="btn">Сохранить</button>
      <button @click="cancelEdit" class="btn">Отмена</button>
    </div>
    <div class="form" v-else>
      <input 
        class="form-input"
        type="text" 
        v-model="task.title" 
        placeholder="Новая задача"
      >
      <button @click="addTask" class="btn">Добавить</button>      
    </div>
    <div class="tasks">
      <div v-for="(task, id) in tasks" :key="id" class="tasks-card">
        <div>
          <h4>{{ id + 1 }}: {{ task.title }}</h4>
        </div>
        <div class="tasks-btn">
          <button @click="startEdit(id)" class="tasks-btn edit"></button>
          <button @click="removeTask(id)" class="tasks-btn delete"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
