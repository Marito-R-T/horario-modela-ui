<template>
  <VDataTable
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalCatedraticos"
    :items="catedraticos"
    :loading="loading"
    item-value="name"
    class="elevation-1 pa-8"
    @update:options="loadCatedraticos"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-card-title
          class="mt-n8"
        >
          <span class="text-h5">Listado de Catedraticos</span>
        </v-card-title>
        <v-dialog
          v-model="dialog"
          persistent
          width="1024"
          class="mt-n16"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Editar Catedratico</span>
            </v-card-title>

            <ContentDialogCatedratico :editedCatedratico="editedCatedratico" ref="form"/>

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
                @click="patchCatedratico"
              >
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro de que quiere eliminar a este catedratico?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteCatedraticoConfirm">Aceptar</v-btn>
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
        @click="editCatedratico(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteCatedratico(item.raw)"
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
import ContentDialogCatedratico from '@/components/catedratico/ContentDialogCatedratico.vue';

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
        title: 'Periodo Inicio',
        align: 'start',
        key: 'periodo_inicio',
        sortable: false
      },
      {
        title: 'Periodo Final',
        align: 'start',
        key: 'periodo_final',
        sortable: false
      },
      {
        title: 'Actions', key: 'actions', sortable: false
      }
    ],
    itemsPerPage: 5,
    dialogDelete: false,
    dialog: false,
    catedraticos: [],
    loading: true,
    totalCatedraticos: 0,
    editedIndex: -1,
    editedCatedratico: {
      id: -1,
      nombre: "",
    }
  }),
  computed: {
    titleDialog() {
      return this.editedIndex == -1 ? "Agregar Catedratico" : "Editar Catedratico";
    }
  },
  methods: {
    loadCatedraticos ({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      console.log(headers);
      this.$axios.get("/catedraticos", {
        headers: headers,
        params: {
          page: page,
          number: itemsPerPage ? itemsPerPage : this.itemsPerPage,
        }
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.catedraticos = res[0],
        this.totalCatedraticos = res[1],
        this.loading = false
      }).catch((err) => {
        console.log(err);
      });
    },

    closeDialog() {
      this.editedIndex = -1;
      this.editedCatedratico = {
        id: -1,
        nombre: "",
      };
      this.dialog = false;
    },

    patchCatedratico() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.patch(`/catedraticos/${this.editedCatedratico.id}`, {
        nombre: v.name,
        periodo_inicio: v.periodo_inicio,
        periodo_final: v.periodo_final,
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
        this.loadCatedraticos({page: 1, itemsPerPage: this.itemsPerPage});
      }).catch((err) => {
        console.log(err);
      })
      this.closeDialog();
    },

    editCatedratico (item) {
      this.editedIndex = this.catedraticos.indexOf(item)
      let eCatedratico = {
        id: item.id,
        nombre: item.nombre,
        periodo_inicio: item.periodo_inicio,
        periodo_final: item.periodo_final,
      }
      this.editedCatedratico = eCatedratico;
      this.dialog = true;
    },

    deleteCatedratico (item) {
      this.editedIndex = this.catedraticos.indexOf(item)
      this.editedCatedraticos = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteCatedraticoConfirm () {
      this.catedraticos.splice(this.editedIndex, 1);
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      this.$axios.delete(`/catedraticos/${this.editedCatedratico.id}`, {
        headers: headers
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.loadCatedraticos({page: 1, itemsPerPage: this.itemsPerPage});
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
    ContentDialogCatedratico
  }
}
</script>