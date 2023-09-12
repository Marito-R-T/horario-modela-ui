<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import SeccionPrincipalPage from '@/components/seccion/SeccionPrincipalPage.vue';

definePageMeta({
    middleware: ["default"]
})
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Secciones"> 
                <SeccionPrincipalPage />
            </UiParentCard>
        </v-col>
    </v-row>
</template> 
