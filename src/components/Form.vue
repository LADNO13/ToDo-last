<script setup>
import Message from './Message.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const showMessage = ref(false);

const showConfirmation = ref(false);


const task = ref({
  id: '',
  title: '',
  description: '',
  createdAt: new Date()
})

const tasks = ref([]);

const getData = (async () => {
 try {
  const {data} = await axios.get('https://4df2a8dfd4f42e3c.mokky.dev/tasks');

  tasks.value = data;
 } catch (err) {
  console.log(err);
 }
});



const addTask = async () => {
  if (task.value.title.trim() === '') return(showMessage.value = true) 
    
    try {
      task.value.createdAt = new Date();
      await axios.post('https://4df2a8dfd4f42e3c.mokky.dev/tasks', task.value);
      task.value.title = '';
      await getData(); 
      showMessage.value = false;
    } catch (err) {
      console.log(err);
    }
  
};

const removeTask = async (id) => {
  console.log(id);
  try {
    await axios.delete(`https://4df2a8dfd4f42e3c.mokky.dev/tasks/${id}`);
    await getData();
  } catch (err) {
    console.log(err);
  }
}


onMounted(getData)
</script>

<template>
  <div>
    <Message Message="Заполните поле" v-if="showMessage === true" @close="showMessage = false"/>
  <div class="form-container">
    <div class="form">
      <input 
        class="form-input"
        type="text" 
        v-model="task.title" 
        placeholder="Новая задача"
      >
      <button @click="addTask" class="btn-add"><img src="../assets/plus-50.png" alt=""></button>  
    </div>
   
    <div class="tasks" v-auto-animate>
      <div class="tasks-card" v-for="(taskItem, index) in tasks"
      :key="taskItem.id"
      :title="task.title"
      >
        <div class="tasks-title">
          <router-link :to="`/TaskPage/${taskItem.id}`" style="text-decoration: none;">
            <p>{{ taskItem.title }}</p>
          </router-link>
        </div>
        <div class="tasks-btn">
          <button @click="showConfirmation = true" class="tasks-btn delete" ><img src="../assets/trash-48.png" alt=""></button>
          <td>{{ task.createdAt ? new Date(task.createdAt).toLocaleDateString('ru-RU') : '' }}</td>

          <transition name="fade">
               <div v-if="showConfirmation === true" class="confirmation-container">
                      <div class="confirmation-content">
                         <p>Вы уверенны?</p>
                        <button @click="removeTask(index) ; showConfirmation = false" class="confirmation-btn">да</button>
                        <button @click="showConfirmation = false" class="confirmation-btn">нет</button>
                      </div>
              </div>
          </transition>
         
        </div>
      </div>
    </div> 
   

  </div>
  </div>
  
    
</template>

<style scoped>



.form {
  width: 100%;
  position: relative;
  top: -25px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn-add {
  width: 90px;
  height: 52px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #1e6f9f;
}

.btn-add img {
  width: 30px;
  height: 30px;
}



.tasks{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 15px;
}

.tasks-card {
  margin-bottom: 15px;
  padding: 10px;
  border-radius:20px  ;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow:  0px 0px 8px rgba(4, 4, 4, 0.5);
  background-color: #262626;
  color: #f2f2f2;
}



.tasks-title {
  white-space: normal;
  color:#757575 ;
  
}

.tasks-title p{
  color: #f2f2f2;
}

.tasks-btn{
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items:center ;
}

.delete{
  border: none;
  background-color: #262626;
  cursor: pointer;
}

.delete img {
  width: 30px;
  height: 30px;
}

.confirmation-container {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); 
  z-index: 10;
}

.confirmation-content {
  position: absolute; 
  top: 50%;
  left: 50%;
  background-color: rgb(25, 25, 25);
  color: white;
  padding: 15px;
  border-radius: 15px;
  transform: translate(-50%, -50%); 
  z-index: 20; 
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.confirmation-btn {
  background-color: #1e6f9f;
  border: none;
  border-radius: 10px;
  padding: 5px 0;
  color: white;
}


@media (max-width: 425px) {
.tasks{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
}
}

@media (max-width: 768px) {
.tasks{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
}
}


@media (max-width: 1440px) {
.tasks{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
}
}
@media (max-width: 1024px) {
.tasks{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
}
}
</style>

