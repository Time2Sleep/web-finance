<script setup lang="ts">
import { useAuth } from './composables/useAuth';
import MainView from './views/MainView.vue';
import AuthView from './views/AuthView.vue';

const { isAuthenticated } = useAuth();
</script>

<template>
  <div class="container">
    <MainView v-if="isAuthenticated"/>
    <AuthView v-else/>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 320px;
}
</style>
