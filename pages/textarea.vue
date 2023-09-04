<template>
    <div class="flex justify-center my-12">
        <app-text-area width="400px" v-model="value" label="This is label" />
    </div>
    <span>{{ value }}</span>
</template>

<script setup lang="ts">
const value = ref<string>('')
</script>