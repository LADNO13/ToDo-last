<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';


const task = ref({
  id: '',
  title: '',
  description: '',
  colors: ['#fec971', '#fe9b72', '#b693fd','#00d4fe','#e4ef8f','#5aef8f','#f9378f','#98dad2c9','#ff8d9785','#b6a597','#00ff97','#0f5d97'],
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

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * task.value.colors.length);
  return task.value.colors[randomIndex];
}

const addTask = async () => {
  if (task.value.title.trim() === '') {
    alert('Задача не может быть пустой');
  } else {
    try {
      task.value.color = getRandomColor();
      task.value.createdAt = new Date();
      await axios.post('https://4df2a8dfd4f42e3c.mokky.dev/tasks', task.value);
      task.value.title = '';
      await getData(); 
    } catch (err) {
      console.log(err);
    }
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
    <h1>Список задач</h1>
    <div class="form">
      <input 
        class="form-input"
        type="text" 
        v-model="task.title" 
        placeholder="Новая задача"
      >
      <button @click="addTask" class="btn-add"><img src="../assets/free-icon-plus-153605.png" alt=""></button>  
    </div>
    
    <div class="tasks" v-auto-animate>
      <div class="tasks-card" v-for="task in tasks"
      :key="task.id"
      :title="task.title"
      :style="{ backgroundColor: task.color }"
      >
        <div class="tasks-title">
          <router-link :to="`/TaskPage/${task.id}`" style="text-decoration: none;">
            <p>{{ task.title }}</p>
          </router-link>
        </div>
        <div class="tasks-btn">
          <button @click="removeTask(task.id)" class="tasks-btn delete" :style="{ backgroundColor: task.color, padding: 0, border: 'none' }"></button>
          <td>{{ task.createdAt ? new Date(task.createdAt).toLocaleDateString('ru-RU') : '' }}</td>
        </div>
      </div>
    </div> 
   

</template>

<style scoped>


.form {
  padding: 10px 0px;
  text-align: center;
  width: calc(100% - 30px);
  display: flex;
  justify-content: space-between;
}

.btn-add {
  width: 60px;
  height: 40px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.btn-add img {
  width: 20px;
  height: 20px;
}

.btn-add:hover{
  scale: 1.1;
}

.tasks{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
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
}

.tasks-card:hover{
  scale: 1.1;
  transition: 0.5s;
}

.tasks-title {
  white-space: normal;
}

.tasks-title p{
  color: black;
}

.tasks-btn{
  display: flex;
  gap: 10px;
  justify-content: space-between;
}



.delete{
  background-image: url('../assets/trash-can-solid.svg');
  background-size: cover;
  width: 22px;
  height: 25px;
  border: none;
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
</style>