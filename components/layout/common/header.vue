<template>
    <header class="header">
        <UBreadcrumb class="bread-crumb" :links="links" />
    </header>
</template>

<script lang="ts" setup>
import type { BreadcrumbLink } from "../../../node_modules/@nuxt/ui/dist/runtime/types/breadcrumb";

const route = useRoute();

const links = computed<BreadcrumbLink[]>(() => {
    const currentPath = route.path as string;

    const routeIcons: Record<string, string> = {
        "/": "material-symbols-light:house-outline",
        "/equipment": "material-symbols-light:touch-long-outline",
    };

    const routes: BreadcrumbLink[] = currentPath
        .split("/")
        .filter((segment) => segment)
        .map((segment, index, array) => {
            const path = "/" + array.slice(0, index + 1).join("/");
            return {
                label: segment === "" ? "Home" : segment,
                icon: routeIcons[path] || "",
            };
        });

    routes.unshift({
        label: "Home",
        icon: routeIcons["/"],
        to: "/",
    });
    return routes;
});
</script>

<style lang="scss" scoped>
    .header {
        @apply w-screen max-w-[calc(100%-(1rem*2)-(0.625rem*2)-1.25rem)] md:w-full md:max-w-full;
        @apply p-4 py-6 md:py-4;
        @apply flex items-center;
    }
</style>