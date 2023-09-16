<script setup lang="ts">
import { productsCard } from '@/data/dashboard/dashboardData';
import { Periodo } from './Periodo';
import {
    AlertCircleFilledIcon,
    FlagFilledIcon
} from 'vue-tabler-icons';
</script>
<template>
  <v-card
    class="mx-auto"
    prepend-icon="mdi-home"
    width="350"
    height="200"
    @click="onClickPeriodo"
  >
    <template v-slot:title>
      <v-row>
        <v-col cols="8">
          {{ periodo.seccion ? periodo.seccion.materia.nombre : "" }}
        </v-col>
        <v-col cols="1">
          <v-icon v-if="periodo.avisos && periodo.avisos?.length > 0" :end="true" :icon="AlertCircleFilledIcon" size="x-small"  color="warning"></v-icon>
        </v-col>
        <v-col cols="1">
          <v-icon v-if="periodo.errores && periodo.errores?.length > 0" :end="true" :icon="FlagFilledIcon" size="x-small"  color="#d91204"></v-icon>
        </v-col>
      </v-row>
    </template>
    <div v-if="periodo.seccion" class="pl-4 pb-4">
      <v-row>
        <v-col cols="6">
          <div class="pl-4">
            <b class="pr-2">Seccion</b> {{ periodo.seccion.letra }}
          </div>
        </v-col>
        <v-col cols="6">
          <div class="pl-4">
            <b class="pr-2">Asignados</b> {{ periodo.seccion.asignados }}
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="periodo.catedratico" class="pl-4 pb-4">
      <v-row>
        <v-col cols="12">
          <div class="pl-4">
            <b class="pr-2">Catedratico:</b> {{ periodo.catedratico.nombre }}
          </div>
        </v-col>
      </v-row>
    </div>
    <v-card-subtitle class="pl-10 pb-5">
      Su capacidad es de {{ periodo.aula.capacidad }} alumnos
    </v-card-subtitle>
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <v-card class="pa-10">
        <template v-slot:title>
          {{ periodo.seccion ? periodo.seccion.materia.nombre : "" }}
        </template>
        <div v-if="periodo.seccion" class="pa-4">
          <v-row>
            <v-col cols="6">
              <div class="pl-4">
                <b class="pr-2">Seccion</b> {{ periodo.seccion.letra }}
              </div>
            </v-col>
            <v-col cols="6">
              <div class="pl-4">
                <b class="pr-2">Asignados</b> {{ periodo.seccion.asignados }}
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-if="periodo.catedratico" class="pl-4 pb-4">
          <v-row>
            <v-col cols="12">
              <div class="pl-4">
                <b class="pr-2">Catedratico:</b> {{ periodo.catedratico.nombre }}
              </div>
            </v-col>
          </v-row>
        </div>
        <v-card-subtitle class="pl-10 pb-5">
          Su capacidad es de {{ periodo.aula.capacidad }} alumnos
        </v-card-subtitle>
        <v-card-title>
          <span class="text-h5">Errores</span>
        </v-card-title>
        <div class="ma-4 error-border" v-for="error, idx of periodo.errores" :key="'e'+idx">
          <v-card-subtitle class="pl-4 pt-4 pr-4">
            <span class="text-h6">{{`${(idx+1)})`}} {{ error.tipo }}</span>
          </v-card-subtitle>
          <v-card-text class="pl-10">
            {{ error.descripcion }}
          </v-card-text>
        </div>
        <v-card-title>
          <span class="text-h5">Avisos</span>
        </v-card-title>
        <div class="ma-4 card-border" v-for="aviso, idx of periodo.avisos" :key="'a'+idx">
          <v-card-subtitle class="pl-4 pt-4 pr-4">
            <span class="text-h6">{{`${(idx+1)})`}} {{ aviso.tipo }}</span>
          </v-card-subtitle>
          <v-card-text class="pl-10">
            {{ aviso.descripcion }}
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script lang="ts">

export default {
  data() {
    return {
      dialog: false
    }
  },
  props: {
    periodo: {
      type: Periodo,
      required: true,
    }
  },
  methods: {
    onClickPeriodo() {
      this.dialog = true;
    },

  }
}

</script>

<style>
.card-border {
  border: 2px;
  border-style: solid;
  border-color: rgb(206, 206, 62);
}
.error-border {
  border: 2px;
  border-style: solid;
  border-color: rgb(212, 23, 23);
}
</style>