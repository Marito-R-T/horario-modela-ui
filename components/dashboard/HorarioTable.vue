<script setup lang="ts">
import {productPerformance} from '@/data/dashboard/dashboardData';
import { Periodo } from './Periodo';
import { Aula } from './Aula';
import { Hora } from './Hora';
import {
  VDataTableVirtual
} from "vuetify/labs/VDataTable";
import { Catedratico } from './Catedratico';
</script>
<template>
    <v-card elevation="10" class="">
        <v-card-item class="pa-6">
        <v-card-title class="text-h5 pt-sm-2 pb-7">Horario</v-card-title>
        <v-btn @click="getHorario">
          Get Array
        </v-btn>
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
                <v-card
                  class="mx-auto"
                  prepend-icon="mdi-home"
                  width="350"
                >
                  <template v-slot:title>
                      {{ periodo.seccion ? periodo.seccion.materia.nombre : "" }}
                  </template>
                  <div v-if="periodo.seccion" class="pl-4 pb-4">
                    <v-row>
                      <v-col cols="6">
                        <div class="pl-4">
                          <b class="pr-2">Seccion</b> {{ periodo.seccion.number }}
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
                </v-card>
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
      horarios: 7,
      horaInicio: 13,
      minutoInicio: 0,
      duracionPeriodoMinutos: 50
    }
  },
  computed: {
    periodos(): Array<Hora> {
      let periodos = new Array<Hora>;
      let horaIn = new Date(2016, 1, 1, this.horaInicio, this.minutoInicio, 0);
      for (let i = 0; i < this.horarios; i++) {
        let horaI = new Date(2016, 1, 1, this.horaInicio, horaIn.getMinutes() + (this.duracionPeriodoMinutos*i));
        let horaF = new Date(2016, 1, 1, this.horaInicio, horaIn.getMinutes() + (this.duracionPeriodoMinutos*(i+1)));
        let hora: Hora = {
          periodos: new Array<Periodo>,
          horaInicio: horaI,
          horaFinal: horaF
        };
        this.aulas.forEach((aula) => {
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
        });
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
        periodos: 1,
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.aulas.push({capacidad: 150, id:1, nombre: "1"});
    this.aulas.push({capacidad: 100, id:2, nombre: "2"});
    this.aulas.push({capacidad: 100, id:3, nombre: "3"});
    this.aulas.push({capacidad: 100, id:3, nombre: "4"});
    console.log(this.periodos);
  }
}

</script>