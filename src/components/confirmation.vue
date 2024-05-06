<script setup>



</script>


<template>  
    <div class="confirmation-container" >
        <div class="confirmation-content">
            <p>Вы уверенны?</p>
            <button @click="$emit('remove')" class="confirmation-btn">да</button>
            <button @click="$emit('close')" class="confirmation-btn">нет</button>
        </div>
  </div>
</template>


<style scoped>  
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
}

.confirmation-btn {
  background-color: #1e6f9f;
  border: none;
  border-radius: 10px;
  padding: 5px 0;
  color: white;
}
</style>