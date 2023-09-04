<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import MateriaPrincipalPage from '@/components/materia/MateriaPrincipalPage.vue';
import Shadow from "@/components/style-components/shadow/Shadow.vue";
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Materias"> 
                <MateriaPrincipalPage/>
            </UiParentCard>
        </v-col>
    </v-row>
</template> 
