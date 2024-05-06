<script setup>
import Message from './Message.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const taskId = ref(route.params.id);
const taskTitle = ref('');
const taskDescripton = ref('');

const showMessage = ref(false);

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

const errorMessege = () => {
  showMessage.value = true
  Message.value = 'Заполните название'
}

const updateMessege = () => {
  showMessage.value = true
  Message.value = 'Задача обновлена'
}

const updateTask = async () => {
  if (taskTitle.value.trim() === '') return(errorMessege())

    try {
    await axios.patch(`https://4df2a8dfd4f42e3c.mokky.dev/tasks/${taskId.value}`, {
      title: taskTitle.value,
      description: taskDescripton.value
    })
    updateMessege();
  } catch (error) {
    console.error('Ошибка при обновлении данных задачи:', error);
  } 
  
};


getTaskData();
</script>

<template>
  <Message :Message = "Message.value" v-if="showMessage === true" @close="showMessage = false"/>
  <div class="TaskPage-container">
    <div class="TaskPage-header">
      <div class="TaskPage-nav">
        <button class="btn-back" @click="router.go(-1)"><img src="../assets/icons8-circle-48.png" alt="back"></button>
        <h1>Задача</h1>
      </div>  
        <button class="btn-save" @click="updateTask"><img src="../assets/icons8-save-50.png" alt=""></button>
    </div>
    
    <div>
      <input type="text" v-model="taskTitle" placeholder="Заголовок задачи">
      <textarea name="description" v-model="taskDescripton" cols="100" rows="20" placeholder="Описание"></textarea>
      
    </div>
  </div>
</template>

<style scoped>

.TaskPage-container{
  position: relative;
  top: -40px;
} 

.TaskPage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffff;
}

.TaskPage-nav{
  display: flex;
  align-items: center;
  gap: 10px;
}


.btn-save{
  background-color: transparent;
  cursor: pointer;
  border: none;
}

.btn-save img{
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.btn-back{
  background-color: transparent;
  cursor: pointer;
  border: none;
}

.btn-back img{
  width: 30px;
  height: 30px;
}


@media (max-width: 425px) {

.TaskPage-container{
  position: relative;
  top: -30px;
}  

.TaskPage-nav h1{
  font-size: 25px;
} 

.btn-save img{
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.btn-back{
  background-color: transparent;
  cursor: pointer;
  border: none;
}

.btn-back img{
  width: 20px;
  height: 20px;
}

}
</style>