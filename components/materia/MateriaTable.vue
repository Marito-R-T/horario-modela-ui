<template>
  <VDataTable
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalMaterias"
    :items="materias"
    :loading="loading"
    item-value="name"
    class="elevation-1 pa-8"
    @update:options="loadMaterias"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-card-title
          class="mt-n8"
        >
          <span class="text-h5">Listado de Materias</span>
        </v-card-title>
        <v-dialog
          v-model="dialog"
          persistent
          width="1024"
          class="mt-n16"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Editar Materia</span>
            </v-card-title>

            <ContentDialogMateria :editedMateria="editedMateria" ref="form"/>

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
                @click="patchMateria"
              >
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro de que quiere eliminar esta materia?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteMateriaConfirm">Aceptar</v-btn>
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
        @click="editMateria(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteMateria(item.raw)"
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
import ContentDialogMateria from '@/components/materia/ContentDialogMateria.vue';

export default {
  data: () => ({
    headers: [
      {
        title: 'Id',
        align: 'start',
        key: 'id',
        sortable: false
      },
      {
        title: 'Nombre',
        align: 'start',
        key: 'nombre',
        sortable: false
      },
      {
        title: 'Carrera',
        align: 'start',
        key: 'carrera_base',
        sortable: false
      },
      {
        title: 'Actions', key: 'actions', sortable: false
      }
    ],
    itemsPerPage: 5,
    dialogDelete: false,
    dialog: false,
    materias: [],
    loading: true,
    totalMaterias: 0,
    editedIndex: -1,
    editedMateria: {
      id: -1,
      nombre: "",
      carrera: ""
    }
  }),
  computed: {
    titleDialog() {
      return this.editedIndex == -1 ? "Agregar Materia" : "Editar Materia";
    }
  },
  methods: {
    loadMaterias ({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      console.log(headers);
      this.$axios.get("/materias", {
        headers: headers,
        params: {
          page: page,
          number: itemsPerPage ? itemsPerPage : this.itemsPerPage,
        }
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.materias = res[0],
        this.totalMaterias = res[1],
        this.loading = false
      }).catch((err) => {
        console.log(err);
      });
    },

    closeDialog() {
      this.editedIndex = -1;
      this.editedMateria = {
        id: -1,
        nombre: "",
        carrera: ""
      };
      this.dialog = false;
    },

    patchMateria() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.patch(`/materias/${this.editedMateria.id}`, {
        nombre: v.name,
        carrera_base: v.carrera
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
        this.loadMaterias({page: 1, itemsPerPage: this.itemsPerPage});
      }).catch((err) => {
        console.log(err);
      })
      this.closeDialog();
    },

    editMateria (item) {
      this.editedIndex = this.materias.indexOf(item)
      let eMateria = {
        id: item.id,
        nombre: item.nombre,
        carrera: item.carrera_base,
      }
      this.editedMateria = eMateria;
      this.dialog = true;
    },

    deleteMateria (item) {
      this.editedIndex = this.materias.indexOf(item)
      this.editedMateria = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteMateriaConfirm () {
      this.materias.splice(this.editedIndex, 1);
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      this.$axios.delete(`/materias/${this.editedMateria.id}`, {
        headers: headers
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.loadMaterias({page: 1, itemsPerPage: this.itemsPerPage});
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
    ContentDialogMateria
  }
}
</script>