<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import AsignacionPrincipalPage from '@/components/asignacion/AsignacionPrincipalPage.vue';
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Secciones"> 
                <AsignacionPrincipalPage />
            </UiParentCard>
        </v-col>
    </v-row>
</template> 
