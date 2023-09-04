<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Nombre*"
            required
            v-model="name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Capacidad*"
            required
            v-model="capacidad"
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
      capacidad: ""
    }),
    props: {
      editedAula: {
        type: Object,
        required: false,
      }
    },
    methods: {
      getData(): any {
        return { name: this.name, capacidad: this.capacidad };
      },
      fillData(data: any) {
        this.name = data.nombre;
        this.capacidad = data.capacidad;
      }
    },
    created() {
      this.name = this.editedAula?.nombre ? this.editedAula?.nombre : "";
      this.capacidad = this.editedAula?.capacidad ? this.editedAula?.capacidad : "";
    },
  }
</script>