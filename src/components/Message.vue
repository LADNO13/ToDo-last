<script setup>

defineProps({
  Message: String
})  

</script>
 
<template>
  <div class="message-container" >
    <div class="message-content">
    <p>{{ Message }}</p>
    <button @click="$emit('close')" class="message-btn">ок</button>
    </div>
  </div>
</template>

<style scoped>

.message-container {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); 
  z-index: 10;

}

.message-content {
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

.message-btn {
  background-color: #1e6f9f;
  border: none;
  border-radius: 10px;
  padding: 5px 0;
  color: white;
}
</style>