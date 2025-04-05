<template>
    <div class="page-layout">
        <header v-if="props.hasHeader" class="header">
            <h1>Page Layout</h1>
        </header>
        <main class="main">
            <ClientOnly>
                <Map :markers="props.markers" />
            </ClientOnly>
        </main>
        <aside class="aside">
            <slot />
        </aside>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { IMarker } from '../map/index.vue';
const props = defineProps({
    hasHeader: {
        type: Boolean,
        default: false,
    },
    markers: {
        type: Array as () => IMarker[],
        default: () => []
    }
});
</script>

<style lang="scss" scoped>

    .page-layout {
        @apply grid grid-cols-[3fr_1fr];
        @apply h-screen;

        .header {
            @apply grid grid-cols-[3fr_1fr];
            @apply absolute top-0 left-0 right-0 z-50;
            @apply w-full;
            @apply p-4;
        }
        .main {
            @apply col-start-1;
            @apply relative z-0;
        }
        .aside {
            @apply col-start-2;
            @apply relative z-10;
            @apply p-4;
            box-shadow: -4px 0px 0px rgba(0, 0, 0, 0.1);
        }
    }
</style>