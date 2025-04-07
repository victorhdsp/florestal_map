<template>
    <main>
        <section class="not-found">
            <h1>404 - Página Não Encontrada</h1>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <router-link to="/" class="back-home">Voltar para a página inicial</router-link>
        </section>
    </main>
</template>
<style scoped lang="scss">
    .not-found {
        @apply flex flex-col items-center justify-center h-screen text-center bg-gray-100;

        h1 {
            @apply text-4xl font-bold text-gray-800 mb-4;
        }

        p {
            @apply mb-4;
        }

        .back-home {
            @apply text-lg font-semibold;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>