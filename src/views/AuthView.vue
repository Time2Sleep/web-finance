<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth } from '../composables/useAuth';

const { isLoading, password, auth } = useAuth();

const handleClick = () => {
    auth();
}

onMounted(() => {
    if(password.value)
        auth();
});
</script>

<template>
    <a-spin v-if="isLoading"/>

    <a-card v-else>
        <a-input 
            v-model:value="password" 
            placeholder="Пароль" 
            class="auth__input"
            type="password"
        />

        <a-button 
            :disabled="!password" 
            type="primary" 
            @click="handleClick"
        >
            Войти
        </a-button>
    </a-card>
</template>

<style scoped lang="scss">
.auth {
    &__input{
        margin-bottom: 12px;
    }
}
</style>