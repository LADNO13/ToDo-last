<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const taskId = ref(route.params.id);
const taskTitle = ref('');
const taskDescripton = ref('');

// Функция для получения данных задачи по идентификатору
const getTaskData = async () => {
  try {
    const response = await axios.get(`https://4df2a8dfd4f42e3c.mokky.dev/tasks/${taskId.value}`);
    taskTitle.value = response.data.title;
    taskDescripton.value = response.data.description;
  } catch (error) {
    console.error('Ошибка при получении данных задачи:', error);
  }
};


watch(taskId, async (newId) => {
  if (newId) {
    await getTaskData();
  }
});


const updateTask = async () => {
  if (taskTitle.value.trim() === '') {
    alert('Заголовок и описание задачи не могут быть пустыми');
  } else {
    try {
    await axios.patch(`https://4df2a8dfd4f42e3c.mokky.dev/tasks/${taskId.value}`, {
      title: taskTitle.value,
      description: taskDescripton.value
    });
  } catch (error) {
    console.error('Ошибка при обновлении данных задачи:', error);
  } 
  }
};


getTaskData();
</script>

<template>
  <div>
    <div class="header">
        <h1>Задача</h1>
      
      
      <button class="btn-save" @click="updateTask"></button>
    </div>
    
    <div>
      <input type="text" v-model="taskTitle" placeholder="Заголовок задачи">
      <textarea name="description" v-model="taskDescripton" cols="100" rows="20" placeholder="Описание"></textarea>
      
    </div>
  </div>
</template>

<style scoped>

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}



.btn-save{
  background-image: url('../assets/free-icon-save-2541652.png');
  background-size: cover;
  background-color: #ffffff;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: none;
}

.btn-save:hover{
  scale: 1.1;
  transition: 0.5s;
}

</style>