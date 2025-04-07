<template>
    <aside class="root">
        <div class="desktop">
            <div class="aside-content">
                <slot/>
            </div>
        </div>
        <USlideover v-model="isOpen">
            <div class="aside-content">
                <header class="aside-header">
                    <h2>{{pageName}}</h2>
                    <UButton
                        size="lg"
                        icon="material-symbols-light:menu-rounded"
                        variant="soft"
                        @click="isOpen = !isOpen"
                    />
                </header>
                <UDivider />
                <slot/>
            </div>
        </USlideover>
        <UButton
            class="mobile"
            size="lg"
            icon="material-symbols-light:menu-rounded"
            variant="soft"
            @click="isOpen = !isOpen"
        />
    </aside>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
const pageName = computed(() => {
    const route = useRoute();
    return route.meta.name;
});
</script>

<style lang="scss" scoped>
    .aside-content {
        @apply w-full md:w-[28rem];
        @apply flex flex-col gap-3;
        @apply p-4;
        @apply h-screen;
        box-shadow: -4px 0px 3px rgba(0, 0, 0, 0.05);
        
        .aside-header {
            @apply flex items-center justify-between;
        }
    }

    .desktop {
        @apply h-full;
        @apply hidden md:flex;
    }
    
    .mobile {
        @apply absolute top-3 right-4;
        @apply flex md:hidden;
        @apply z-50;
    }
</style>