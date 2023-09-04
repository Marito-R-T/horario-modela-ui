<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-combobox
            label="Catedratico"
            :items="catedraticos"
            item-title="nombre"
            item-value="id"
            :loading="loading"
            variant="outlined"
            v-model="catedratico_id"
            clearable
            @click="click"
          ></v-combobox>
        </v-col>
        
        <v-col cols="12">
          <v-combobox
            label="Materia"
            :items="materias"
            item-title="nombre"
            item-value="id"
            :loading="loading"
            variant="outlined"
            v-model="materia_id"
            clearable
            @click="click"
          ></v-combobox>
        </v-col>
        <v-col cols="7"/>
        <v-col cols="5">
          <v-checkbox 
            label="Es una materia principal para el catedratico"
            v-model="primario"
            @change="click"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
    <small>*indicates required field</small>
  </v-card-text>
</template>
<script lang="ts">
  export default {
    data: () => ({
      materia_id: null,
      materias: [],
      catedratico_id: null,
      catedraticos: [],
      primario: null,
      loading: false,
    }),
    props: {
      editedAsignacion: {
        type: Object,
        required: false,
      }
    },
    methods: {
      click() {
        console.log(this.materia_id);
        console.log(this.catedratico_id);
        console.log(this.primario);
      },
      getData(): any {
        return { catedratico_id: this.catedratico_id.id, materia_id: this.materia_id.id, primario: this.primario };
      },
      fillData(data: any) {
        console.log(data)
        this.catedratico_id = data.catedratico_id;
        this.materia_id = data.materia_id;
        this.primario = data.primario
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
        if(this.editedAsignacion?.materia_id) {
          this.materia_id = this.materias.find((m) => m.id == this.editedAsignacion.materia_id);
        }
      }).catch((err) => {
        console.log(err);
      });
      this.$axios.get("/catedraticos/all", {
        headers: headers,
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.catedraticos = res;
        if(this.editedAsignacion?.catedratico_id) {
          this.catedratico_id = this.catedraticos.find((m) => m.id == this.editedAsignacion.catedratico_id);
        }
      }).catch((err) => {
        console.log(err);
      });
      this.primario = this.editedAsignacion?.primario ? this.editedAsignacion?.primario : false;
      this.loading = false;
    },
  }
</script>