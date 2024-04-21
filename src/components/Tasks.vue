<script setup>
import axios from 'axios';

defineProps({
    id: Number,
    title: String
})

const removeTask = (id) => {
  console.log(id);
  axios.delete(`https://4df2a8dfd4f42e3c.mokky.dev/tasks/${id}`)
}


</script>

<template>
      <div class="tasks-card" >
        <div>
        <router-link to="/TaskPage" >
          <h4>  {{title}}</h4>
        </router-link>
        </div>
        <div class="tasks-btn">
          <button  class="tasks-btn edit"></button>
          <button @click="removeTask(id)" class="tasks-btn delete"></button>
        </div>
      </div>
    
</template>

<style scoped>  
.tasks-card {
  margin-bottom: 15px;
  padding: 10px;
  border: 2px solid rgb(153, 153, 153);
  border-radius: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.tasks-btn{
  display: flex;
  gap: 10px;
}

.edit{
  background-image: url('../assets/pen-to-square.svg');
  width: 25px;
  height: 25px;
  border: none;
}

.delete{
  background-image: url('../assets/trash-can-solid.svg');
  background-size: cover;
  width: 22px;
  height: 25px;
  border: none;
}

</style>