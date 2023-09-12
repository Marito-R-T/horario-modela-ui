<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import AulaPrincipalPage from '@/components/aula/AulaPrincipalPage.vue';

definePageMeta({
    middleware: ["default"]
})
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Aulas"> 
                <AulaPrincipalPage/>
            </UiParentCard>
        </v-col>
    </v-row>
</template> 
