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
            label="Asignados*"
            required
            v-model="asignados"
          ></v-text-field>
        </v-col>
        <v-combobox
          label="Materia"
          :items="materias"
          item-title="nombre"
          item-value="nombre"
          :loading="loading"
          variant="outlined"
          v-model="materia_id"
          clearable
          @click="click"
        ></v-combobox>
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
      asignados: "",
      materia_id: null,
      materias: [],
      loading: false,
    }),
    props: {
      editedSeccion: {
        type: Object,
        required: false,
      }
    },
    methods: {
      click() {
        console.log(this.materia_id);
      },
      getData(): any {
        return { asignados: this.asignados, materia_id: this.materia_id.id };
      },
      fillData(data: any) {
        console.log(data)
        this.asignados = data.nombre,
        this.materia_id = data.materia_id
      }
    },
    created() {
      this.loading = true;
      
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      this.$axios.get("/materias/all", {
        headers: headers,
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.materias = res;
        if(this.editedSeccion?.materia_id) {
          this.asignados = this.editedSeccion?.asignados ? this.editedSeccion?.asignados : "";
          this.materia_id = this.materias.find((m) => m.id == this.editedSeccion.materia_id);
        }
      }).catch((err) => {
        console.log(err);
      });
      this.loading = false;
    },
  }
</script>