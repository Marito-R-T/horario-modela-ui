<script setup lang="ts">
import {productPerformance} from '@/data/dashboard/dashboardData';
import { Periodo } from './Periodo';
import { Aula } from './Aula';
import { Hora } from './Hora';import {
  ArrowBadgeLeftFilledIcon,
  ArrowBadgeRightFilledIcon,
} from 'vue-tabler-icons';
import { Settings } from './Settings';
import { HorarioFinal } from './Horario';
import AddContentDialog from '@/components/shared/AddContentDialog.vue';
import ContentDialogSettings from '@/components/dashboard/ContentDialogSettings.vue'
import VPeriodo from '@/components/dashboard/Periodo.vue'

</script>
<template>
    <v-card elevation="10" class="">
      <AddContentDialog 
        type="Configuración" 
        title="Agregar Catedratico" 
        @add-content="setUpSettings">
        <ContentDialogSettings ref="form"/>
      </AddContentDialog>
      <v-card-item class="pa-6">
        <v-card-title class="text-h5 pt-sm-2 pb-7">Horario #{{ (indexData+1) }}/{{ totalData }}</v-card-title>
        <v-row class="pb-5">
          <v-col cols="2" class="d-flex justify-start">
            <v-btn @click="previousHorario" density="compact" :icon="ArrowBadgeLeftFilledIcon"></v-btn>
          </v-col>
          <v-col cols="8" class="d-flex justify-center">
            <v-btn size="large" @click="getHorario">
              Obtener Horarios con la Configuración Actual
            </v-btn>
          </v-col>
          <v-col cols="2" class="d-flex justify-end">
            <v-btn @click="nextHorario" density="compact" :icon="ArrowBadgeRightFilledIcon"></v-btn>
          </v-col>
        </v-row>
        <v-table>
          <thead>
            <tr>
              <th class="text-left bg-primary pl-4 pr-4">
                <v-card
                  class="mx-auto mt-4 mb-4"
                >
                  <template v-slot:title>
                    Hora
                  </template>
                </v-card>
              </th>
              <th v-for="aula of aulas" :key="aula.id" class="text-left bg-primary pl-4 pr-4">
                <v-card
                  class="mx-auto mt-4 mb-4"
                >
                  <template v-slot:title>
                    {{ aula.nombre }}
                  </template>
                </v-card>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hora, idh of periodos" :key="'h'+idh">
              <td>
                <v-card
                 width="150"
                >
                  <div class="pl-2 pb-4">
                    <v-row>
                      <v-col cols="12">
                        <div class="pl-4">
                          <b class="pr-2">Inicio</b> 
                          {{ `${hora.horaInicio.getHours()}:${hora.horaInicio.getMinutes()}` }}
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <div class="pl-4">
                          <b class="pr-2">Fin</b>
                          {{ `${hora.horaFinal.getHours()}:${hora.horaFinal.getMinutes()}` }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </td>
              <td v-for="periodo, idp of hora.periodos" :key="'p'+(idh*idp)" class="pa-4">
                <VPeriodo
                  :periodo="periodo"
                />
                <!--<v-card
                  class="mx-auto"
                  prepend-icon="mdi-home"
                  width="350"
                  height="200"
                  @click=""
                >
                  <template v-slot:title>
                      {{ periodo.seccion ? periodo.seccion.materia.nombre : "" }}
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
                </v-card>-->
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
    </v-card>
</template>
<script lang="ts">

export default {
  data() {
    return {
      aulas: new Array<Aula>,
      horas: new Array<Array<Periodo>>,
      data: new Array<HorarioFinal>,
      horarios: 7,
      horaInicio: 13,
      minutoInicio: 0,
      duracionPeriodoMinutos: 50,
      indexData: 0,
      totalData:0
    }
  },
  computed: {
    periodos(): Array<Hora> {
      let periodos = new Array<Hora>;
      let horaIn = new Date(2016, 1, 1, this.horaInicio, this.minutoInicio, 0);
      for (let i = 0; i < this.horas.length; i++) {
        let horaArray = this.horas[i];
        let horaI = new Date(2016, 1, 1, this.horaInicio, horaIn.getMinutes() + (this.duracionPeriodoMinutos*i));
        let horaF = new Date(2016, 1, 1, this.horaInicio, horaIn.getMinutes() + (this.duracionPeriodoMinutos*(i+1)));
        let hora: Hora = {
          periodos: horaArray,
          horaInicio: horaI,
          horaFinal: horaF
        };
        /*this.aulas.forEach((aula) => {
          let periodo: Periodo = {
            aula,
            catedratico: {
              id: 1,
              nombre: "Mario Ramírez"
            },
            seccion: {
              id: 1,
              asignados: 100,
              number: 0,
              materia: {
                id: 1,
                carrera_base: "Carrera",
                nombre: "Fisica"
              }
            }
          }
          hora.periodos.push(periodo);
        });*/
        periodos.push(hora);
      }
      return periodos
    },
    head() {
      let headers = [];
      for (const aula of this.aulas) {
        headers.push({
          title: aula.nombre,
          align: 'start',
        key: 'primario',
          sortable: false
        })
      }
      return headers;
    }
  },
  methods: {
    getHorario() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      this.$axios.post("/horario", {
        periodos: this.$store.periodos,
        porcentaje_catedratico_opcional:this.$store.porcentaje_catedratico_opcional,
        porcentaje_fuera_hora: this.$store.porcentaje_fuera_hora,
        porcentaje_fuera_capacidad: this.$store.porcentaje_fuera_capacidad,
        porcentaje_materia_secundaria: this.$store.porcentaje_materia_secundaria,
        minimo_porcentaje_secciones_chicas: this.$store.minimo_porcentaje_secciones_chicas,
        diferencia_entre_secciones_aulas: this.$store.diferencia_entre_secciones_aulas,
        cantidad_horarios: this.$store.cantidad_horarios,
        porcentaje_no_catedratico: 0.05
      }, {
        headers: headers
      }).then((res) => {
        return res.data;
      }).then((data) => {
        this.data = data;
        this.totalData = data.length;
        this.indexData = 0;
        this.setHorario();
      }).catch((err) => {
        console.log(err);
      });
    },
    setHorario() {
      if(this.data?.length > this.indexData){
        this.aulas = this.data[this.indexData].aulas;
        this.horarios = this.data[this.indexData].periodos;
        this.horas = this.data[this.indexData].horas;
      }
    },
    nextHorario() {
      if(this.data?.length > (this.indexData + 1)){
        this.indexData = this.indexData + 1;
        this.setHorario();
      }
    },
    previousHorario() {
      if(0 <= (this.indexData -1)){
        this.indexData = this.indexData - 1;
        this.setHorario();
      }
    },
    setUpSettings() {
      let v: Settings = this.$refs.form.getData();
      this.$store.setPeriodos(v.periodos);
      this.$store.setPorcentajeCatedraticoOpcional(v.porcentaje_catedratico_opcional);
      this.$store.setPorcentajeFueraHora(v.porcentaje_fuera_hora);
      this.$store.setPorcentajeMateriaSecundaria(v.porcentaje_materia_secundaria);
      this.$store.setMinimoPorcentajeSeccionesChicas(v.minimo_porcentaje_secciones_chicas);
      this.$store.setDiferenciaEntreSeccionesAulas(v.diferencia_entre_secciones_aulas);
      this.$store.setCantidadHorarios(v.cantidad_horarios);
    }
  },
  mounted() {
  }
}

</script>