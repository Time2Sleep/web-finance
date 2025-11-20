<script setup lang="ts">
import { useAuth } from './composables/useAuth';
import AuthView from './views/AuthView.vue';

const { isAuthenticated } = useAuth();
</script>

<template>
  <div class="container">
    <RouterView  v-if="isAuthenticated"/>
    <AuthView v-else/>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  min-height: 90vh;
  height: max-content;
  max-width: 100vw;
}
</style>
