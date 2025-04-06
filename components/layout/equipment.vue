<template>
    <div class="page-equipment-layout">
        <LayoutCommonHeader class="header">
            <slot name="header" />
        </LayoutCommonHeader>
        <main class="main">
            <slot name="content" />
        </main>
        <LayoutCommonAside class="aside">
            <slot name="aside" />
        </LayoutCommonAside>
    </div>
</template>

<style lang="scss" scoped>
    .page-equipment-layout {
        @apply grid grid-cols-[1fr_auto] grid-rows-[4rem_1fr];
        @apply h-screen;

        .header {
            @apply col-start-1 row-start-1;
        }
        .main {
            @apply col-start-1 row-start-2;
            @apply relative z-0;
        }
        .aside {
            @apply col-start-2 row-start-1;
            @apply relative z-10;
        }
    }
</style>