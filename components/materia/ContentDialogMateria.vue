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
        <v-col cols="12">
          <v-text-field
            label="Carrera Base*"
            required
            v-model="carrera"
          ></v-text-field>
        </v-col>
        <!--<v-col
          cols="12"
          sm="6"
        >
          <v-select
            :items="['0-17', '18-29', '30-54', '54+']"
            label="Age*"
            required
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-autocomplete
            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
            label="Interests"
            multiple
          ></v-autocomplete>
        </v-col>-->
      </v-row>
    </v-container>
    <small>*indicates required field</small>
  </v-card-text>
</template>
<script lang="ts">
  export default {
    data: () => ({
      name: "",
      carrera: "",
    }),
    props: {
      editedMateria: {
        type: Object,
        required: false,
      }
    },
    methods: {
      getData(): any {
        return { name: this.name, carrera: this.carrera };
      },
      fillData(data: any) {
        console.log(data)
        this.name = data.nombre,
        this.carrera = data.carrera
      }
    },
    created() {
      console.log(this.editedMateria);
      this.name = this.editedMateria?.nombre ? this.editedMateria?.nombre : "";
      this.carrera = this.editedMateria?.carrera ? this.editedMateria?.carrera : "";
    },
  }
</script>