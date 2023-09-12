<template>
  <VDataTable
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalSecciones"
    :items="secciones"
    :loading="loading"
    item-value="id"
    class="elevation-1 pa-8"
    @update:options="loadSecciones"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-card-title
          class="mt-n8"
        >
          <span class="text-h5">Listado de Secciones</span>
        </v-card-title>
        <v-dialog
          v-model="dialog"
          persistent
          width="1024"
          class="mt-n16"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Editar Seccion</span>
            </v-card-title>

            <ContentDialogSeccion :editedSeccion="editedSeccion" ref="form"/>

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
                @click="patchSeccion"
              >
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro de que quiere eliminar esta seccion?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteSeccionConfirm">Aceptar</v-btn>
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
        @click="editSeccion(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteSeccion(item.raw)"
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
import ContentDialogSeccion from '@/components/seccion/ContentDialogSeccion.vue';

export default {
  data: () => ({
    headers: [
      {
        title: 'Asignados',
        align: 'start',
        key: 'asignados',
        sortable: false
      },
      {
        title: 'Materia',
        align: 'start',
        key: 'materia.nombre',
        sortable: false
      },
      {
        title: 'Letra',
        align: 'start',
        key: 'letra',
        sortable: false
      },
      {
        title: 'Actions', key: 'actions', sortable: false
      }
    ],
    itemsPerPage: 5,
    dialogDelete: false,
    dialog: false,
    secciones: [],
    loading: true,
    totalSecciones: 0,
    editedIndex: -1,
    editedSeccion: {
      id: -1,
      asignados: "",
      materia_id: ""
    }
  }),
  computed: {
    titleDialog() {
      return this.editedIndex == -1 ? "Agregar Seccion" : "Editar Seccion";
    }
  },
  methods: {
    loadSecciones ({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      console.log(headers);
      this.$axios.get("/secciones", {
        headers: headers,
        params: {
          page: page,
          number: itemsPerPage ? itemsPerPage : this.itemsPerPage,
        }
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.secciones = res[0],
        this.totalSecciones = res[1],
        this.loading = false
      }).catch((err) => {
        console.log(err);
      });
    },

    closeDialog() {
      this.editedIndex = -1;
      this.editedSeccion = {
        id: -1,
        asignados: "",
        materia_id: ""
      };
      this.dialog = false;
    },

    patchSeccion() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.patch(`/secciones/${this.editedSeccion.id}`, {
        asignados: v.asignados,
        letra: v.letra,
        materia_id: v.materia_id
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
        this.loadSecciones({page: 1, itemsPerPage: this.itemsPerPage});
      }).catch((err) => {
        console.log(err);
      })
      this.closeDialog();
    },

    editSeccion (item) {
      this.editedIndex = this.secciones.indexOf(item)
      console.log(item);
      let eSeccion = {
        id: item.id,
        asignados: item.asignados,
        materia_id: item.materia_id,
        letra: item.letra
      }
      this.editedSeccion = eSeccion;
      this.dialog = true;
    },

    deleteSeccion (item) {
      this.editedIndex = this.secciones.indexOf(item)
      this.editedSeccion = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteSeccionConfirm () {
      this.secciones.splice(this.editedIndex, 1);
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      this.$axios.delete(`/secciones/${this.editedSeccion.id}`, {
        headers: headers
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.loadSecciones({page: 1, itemsPerPage: this.itemsPerPage});
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
    ContentDialogSeccion
  }
}
</script>