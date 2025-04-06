<template>
    <span class="equipament-status">
        <div class="color" :style="`--color: ${props.color};`"/>
        <p class="name">{{props.name}}</p>
    </span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
    .equipament-status {
        @apply flex items-center gap-2;
        .color {
            @apply rounded-full;
            @apply w-2 h-2;
            @apply bg-[var(--color)];
        }
        .name {
            @apply m-0;
        }
    }
</style>