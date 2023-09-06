<template>
  <v-card-text>
    <v-container>
      <v-row>
        <!--<v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-text-field
            label="Legal first name*"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-text-field
            label="Legal middle name"
            hint="example of helper text only on focus"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-text-field
            label="Legal last name*"
            hint="example of persistent helper text"
            persistent-hint
            required
          ></v-text-field>
        </v-col>-->
        <v-col cols="12">
          <v-text-field
            label="Nombre*"
            required
            v-model="name"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Periodo Inicio*"
            required
            v-model="inicio"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Periodo Salida*"
            required
            v-model="final"
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
      name: "",
      inicio: "",
      final: "",
    }),
    props: {
      editedCatedratico: {
        type: Object,
        required: false,
      }
    },
    methods: {
      getData(): any {
        return { name: this.name, periodo_inicio: this.inicio, periodo_final: this.final };
      },
      fillData(data: any) {
        this.name = data.nombre;
      }
    },
    created() {
      this.name = this.editedCatedratico?.nombre ? this.editedCatedratico?.nombre : "";
      this.inicio = this.editedCatedratico?.periodo_inicio !== null ? this.editedCatedratico?.periodo_inicio : "";
      this.final = this.editedCatedratico?.periodo_final !== null ? this.editedCatedratico?.periodo_final : "";
    },
  }
</script>