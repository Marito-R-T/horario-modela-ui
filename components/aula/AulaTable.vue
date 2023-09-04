<template>
  <VDataTable
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalAulas"
    :items="aulas"
    :loading="loading"
    item-value="name"
    class="elevation-1 pa-8"
    @update:options="loadAulas"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-card-title
          class="mt-n8"
        >
          <span class="text-h5">Listado de Aulas</span>
        </v-card-title>
        <v-dialog
          v-model="dialog"
          persistent
          width="1024"
          class="mt-n16"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Editar Aula</span>
            </v-card-title>

            <ContentDialogAula :editedAula="editedAula" ref="form"/>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="closeDialog"
              >
                Close
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="patchAula"
              >
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro de que quiere eliminar esta aula?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteAulaConfirm">Aceptar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editAula(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteAula(item.raw)"
      >
        mdi-delete
      </v-icon>
    </template>
  </VDataTable>
  <!--<v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-left">
          Carrera Base
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>-->
</template>
<script lang="ts">
import {
  VDataTable
} from "vuetify/labs/VDataTable";
import ContentDialogAula from '@/components/aula/ContentDialogAula.vue';

export default {
  data: () => ({
    headers: [
      {
        title: 'Nombre',
        align: 'start',
        key: 'nombre',
        sortable: false
      },
      {
        title: 'Capacidad',
        align: 'start',
        key: 'capacidad',
        sortable: false
      },
      {
        title: 'Actions', key: 'actions', sortable: false
      }
    ],
    itemsPerPage: 5,
    dialogDelete: false,
    dialog: false,
    aulas: [],
    loading: true,
    totalAulas: 0,
    editedIndex: -1,
    editedAula: {
      id: -1,
      nombre: "",
      carrera: ""
    }
  }),
  computed: {
    titleDialog() {
      return this.editedIndex == -1 ? "Agregar Aula" : "Editar Aula";
    }
  },
  methods: {
    loadAulas ({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      console.log(headers);
      this.$axios.get("/aulas", {
        headers: headers,
        params: {
          page: page,
          number: itemsPerPage ? itemsPerPage : this.itemsPerPage,
        }
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.aulas = res[0],
        this.totalAulas = res[1],
        this.loading = false
      }).catch((err) => {
        console.log(err);
      });
    },

    closeDialog() {
      this.editedIndex = -1;
      this.editedAula = {
        id: -1,
        nombre: "",
        carrera: ""
      };
      this.dialog = false;
    },

    patchAula() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.patch(`/aulas/${this.editedAula.id}`, {
        nombre: v.name,
        capacidad: v.capacidad
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
        this.loadAulas({page: 1, itemsPerPage: this.itemsPerPage});
      }).catch((err) => {
        console.log(err);
      })
      this.closeDialog();
    },

    editAula (item) {
      this.editedIndex = this.aulas.indexOf(item)
      let eAula = {
        id: item.id,
        nombre: item.nombre,
        capacidad: item.capacidad,
      }
      this.editedAula = eAula;
      this.dialog = true;
    },

    deleteAula (item) {
      this.editedIndex = this.aulas.indexOf(item)
      this.editedAula = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteAulaConfirm () {
      this.aulas.splice(this.editedIndex, 1);
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      this.$axios.delete(`/aulas/${this.editedAula.id}`, {
        headers: headers
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.loadAulas({page: 1, itemsPerPage: this.itemsPerPage});
      }).catch((err) => {
        console.log(err);
      });
      this.closeDelete();
    },

    closeDelete () {
      this.dialogDelete = false
      this.closeDialog();
    },
  },
  components: {
    VDataTable,
    ContentDialogAula
  }
}
</script>