<template>
    <div class="page-home-layout">
        <main class="main">
            <slot name="content" />
        </main>
        <LayoutCommonAside class="aside">
            <slot name="aside" />
        </LayoutCommonAside>
    </div>
</template>

<style lang="scss" scoped>
    .page-home-layout {
        @apply grid grid-cols-[1fr_auto];
        @apply h-screen;

        .main {
            @apply col-start-1;
            @apply relative z-0;
        }
        .aside {
            @apply col-start-2;
            @apply relative z-10;
        }
    }
</style>