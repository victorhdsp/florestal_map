<template>
    <aside class="aside">
        <slot/>
    </aside>
</template>

<style lang="scss" scoped>
    .aside {
        @apply w-[28rem];
        @apply p-4;
        @apply h-screen;
        box-shadow: -4px 0px 3px rgba(0, 0, 0, 0.05);
    }
</style>