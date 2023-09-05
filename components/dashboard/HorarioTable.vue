<script setup lang="ts">
import {productPerformance} from '@/data/dashboard/dashboardData';
import { Periodo } from './Periodo';
import { Aula } from './Aula';
import {
  VDataTableVirtual
} from "vuetify/labs/VDataTable";
</script>
<template>
    <v-card elevation="10" class="">
        <v-card-item class="pa-6">
        <v-card-title class="text-h5 pt-sm-2 pb-7">Horario</v-card-title>
        <v-table>
          <thead>
            <tr>
              <th v-for="aula of aulas" :key="aula.id" class="text-left bg-primary">
                {{ aula.nombre }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hora, idh of periodos" :key="'h'+idh">
              <td v-for="periodo, idp of hora" :key="'p'+(idh*idp)">
                {{ periodo.aula.capacidad }}
              </td>
            </tr>
          </tbody>
        </v-table>
        <!--<v-table class="month-table">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-bold">Id</th>
                    <th class="text-subtitle-1 font-weight-bold">Assigned</th>
                    <th class="text-subtitle-1 font-weight-bold">Name</th>
                    <th class="text-subtitle-1 font-weight-bold">Priority</th>
                    <th class="text-subtitle-1 font-weight-bold text-right">Budget</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in productPerformance" :key="item.name" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{ item.id }}</p>
                    </td>
                    <td>
                        <div class="">
                                <h6 class="text-subtitle-1 font-weight-bold">{{ item.name }}</h6>
                                <div class="text-13 mt-1 text-muted">{{ item.post }}</div>
                        </div>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted">{{ item.pname }}</h6>
                    </td>
                    <td>
                        <v-chip  :class="'text-body-1 bg-' + item.statuscolor " color="white"  size="small" >{{
                            item.status
                        }}</v-chip>
                    </td>
                    <td>
                        <h6 class="text-h6 text-right">{{ item.budget }}</h6>
                    </td>
                </tr>
            </tbody>
        </v-table>-->
        </v-card-item>
    </v-card>
</template>
<script lang="ts">

export default {
  data() {
    return {
      aulas: new Array<Aula>,
      horarios: 5,
    }
  },
  computed: {
    periodos(): Array<Array<Periodo>> {
      let periodos = new Array<Array<Periodo>>;
      for (let index = 0; index < this.horarios; index++) {
        let hora = new Array<Periodo>;
        for (const aula of this.aulas) {
          let periodo: Periodo = {
            aula
          }
          hora.push(periodo);
        }
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
  mounted() {
    this.aulas.push({capacidad: 150, id:1, nombre: "1"});
    this.aulas.push({capacidad: 100, id:2, nombre: "2"});
    console.log(this.periodos);
  }
}

</script>