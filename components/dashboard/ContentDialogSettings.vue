<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col 
          cols="6"
          sm="6"
        >
          <!--<input v-model="name" @input="validarValor" type="number" step="0.01" min="0" max="1" />-->
          <v-text-field
            label="Periodos*"
            type="number"
            step="1"
            required
            v-model="periodos"
            @input="validarPeriodos"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Porcentaje Catedratico No Opcional*"
            type="number"
            step="0.01"
            required
            v-model="porcentaje_catedratico_opcional"
            @input="validarPorcentajeCatedraticoOpcional"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Porcentaje Para Catedratico Fuera de Horario de Contratación*"
            type="number"
            step="0.01"
            required
            v-model="porcentaje_fuera_hora"
            @input="validarPorcentajeFueraHora"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Porcentaje para las Secciones que están Arriba de la Capacidad*"
            type="number"
            step="0.01"
            required
            v-model="porcentaje_fuera_capacidad"
            @input="validarPorcentajeFueraCapacidad"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Porcentaje si la Materia es Secundaria para el Catedrático*"
            type="number"
            step="0.01"
            required
            v-model="porcentaje_materia_secundaria"
            @input="validarPorcentajeMateriaSecundaria"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Porcentaje minimo que llegan las secciones que son muy pequeñas*"
            type="number"
            step="0.01"
            required
            v-model="minimo_porcentaje_secciones_chicas"
            @input="validarMinimoPorcentajeSeccionesChicas"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Diferencia de Porcentaje entre Secciones Según su Capacidad*"
            type="number"
            step="0.01"
            required
            v-model="diferencia_entre_secciones_aulas"
            @input="validarDiferenciaEntreSeccionesAulas"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Cantidad de Horarios que se quieren obtener*"
            type="number"
            step="1"
            required
            v-model="cantidad_horarios"
            @input="validarCantidadHorarios"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Porcentaje si no hay catedratico disponible*"
            type="number"
            step="0.01"
            required
            v-model="porcentaje_no_catedratico"
            @input="validarPorcentajeNoCatedratico"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            label="Cantidad de Minutos que tiene un periodo*"
            type="number"
            step="1"
            required
            v-model="minutos"
            @input="validarMinutos"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <small>*indicates required field</small>
  </v-card-text>
</template>
<script lang="ts">
  export default {
    data: () => ({
      periodos: 0,
      porcentaje_catedratico_opcional: 0,
      porcentaje_fuera_hora: 0,
      porcentaje_fuera_capacidad: 0,
      porcentaje_materia_secundaria: 0,
      minimo_porcentaje_secciones_chicas: 0,
      diferencia_entre_secciones_aulas: 0,
      cantidad_horarios: 0,
      porcentaje_no_catedratico: 0,
      minutos: 0,
    }),
    props: {
      settings: {
        type: Object,
        required: false,
      }
    },
    methods: {
      getData(): any {
        return { 
          periodos: this.periodos, 
          porcentaje_catedratico_opcional: this.porcentaje_catedratico_opcional, 
          porcentaje_fuera_hora: this.porcentaje_fuera_hora,
          porcentaje_fuera_capacidad: this.porcentaje_fuera_capacidad,
          porcentaje_materia_secundaria: this.porcentaje_materia_secundaria,
          minimo_porcentaje_secciones_chicas: this.minimo_porcentaje_secciones_chicas,
          diferencia_entre_secciones_aulas: this.diferencia_entre_secciones_aulas,
          cantidad_horarios: this.cantidad_horarios,
          porcentaje_no_catedratico: this.porcentaje_no_catedratico,
          minutos: this.minutos
        };
      },
      fillData(data: any) {
        this.periodos = data.periodos;
      },
      validarPorcentajeCatedraticoOpcional() {
        if (this.porcentaje_catedratico_opcional < 0) {
          this.porcentaje_catedratico_opcional = 0;
        } else if (this.porcentaje_catedratico_opcional > 1) {
          this.porcentaje_catedratico_opcional = 1;
        }
      },
      validarPorcentajeFueraHora() {
        if (this.porcentaje_fuera_hora < 0) {
          this.porcentaje_fuera_hora = 0;
        } else if (this.porcentaje_fuera_hora > 1) {
          this.porcentaje_fuera_hora = 1;
        }
      },
      validarPorcentajeFueraCapacidad() {
        if (this.porcentaje_fuera_capacidad < 0) {
          this.porcentaje_fuera_capacidad = 0;
        } else if (this.porcentaje_fuera_capacidad > 1) {
          this.porcentaje_fuera_capacidad = 1;
        }
      },
      validarPorcentajeMateriaSecundaria() {
        if (this.porcentaje_materia_secundaria < 0) {
          this.porcentaje_materia_secundaria = 0;
        } else if (this.porcentaje_materia_secundaria > 1) {
          this.porcentaje_materia_secundaria = 1;
        }
      },
      validarMinimoPorcentajeSeccionesChicas() {
        if (this.minimo_porcentaje_secciones_chicas < 0) {
          this.minimo_porcentaje_secciones_chicas = 0;
        } else if (this.minimo_porcentaje_secciones_chicas > 1) {
          this.minimo_porcentaje_secciones_chicas = 1;
        }
      },
      validarDiferenciaEntreSeccionesAulas() {
        if (this.diferencia_entre_secciones_aulas < 0) {
          this.diferencia_entre_secciones_aulas = 0;
        } else if (this.diferencia_entre_secciones_aulas > 0.5) {
          this.diferencia_entre_secciones_aulas = 0.5;
        }
      },
      validarPorcentajeNoCatedratico() {
        if (this.porcentaje_no_catedratico < 0) {
          this.porcentaje_no_catedratico = 0;
        } else if (this.porcentaje_no_catedratico > 1) {
          this.porcentaje_no_catedratico = 1;
        }
      },
      validarMinutos() {
        if (this.minutos < 0) {
          this.minutos = 0;
        } else if (this.minutos > 120) {
          this.minutos = 120;
        }
      },
      validarPeriodos() {
        if (this.periodos < 0) {
          this.periodos = 0;
        } else if (this.periodos > 10) {
          this.periodos = 10;
        }
      },
      validarCantidadHorarios() {
        if (this.cantidad_horarios < 0) {
          this.cantidad_horarios = 0;
        } else if (this.cantidad_horarios > 10) {
          this.cantidad_horarios = 10;
        }
      }
    },
    created() {
      this.periodos = this.$store.periodos;
      this.porcentaje_catedratico_opcional = this.$store.porcentaje_catedratico_opcional;
      this.porcentaje_fuera_hora = this.$store.porcentaje_fuera_hora;
      this.porcentaje_fuera_capacidad = this.$store.porcentaje_fuera_capacidad;
      this.porcentaje_materia_secundaria = this.$store.porcentaje_materia_secundaria;
      this.minimo_porcentaje_secciones_chicas = this.$store.minimo_porcentaje_secciones_chicas;
      this.diferencia_entre_secciones_aulas = this.$store.diferencia_entre_secciones_aulas;
      this.cantidad_horarios = this.$store.cantidad_horarios;
      this.porcentaje_no_catedratico = this.$store.porcentaje_no_catedratico;
      this.minutos = this.$store.minutos;
    },
  }
</script>