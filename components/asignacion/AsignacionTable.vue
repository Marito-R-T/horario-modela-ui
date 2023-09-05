<template>
  <VDataTable
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalAsignaciones"
    :items="asignaciones"
    :loading="loading"
    item-value="id"
    class="elevation-1 pa-8"
    @update:options="loadAsignaciones"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-card-title
          class="mt-n8"
        >
          <span class="text-h5">Listado de Asignaciones</span>
        </v-card-title>
        <v-dialog
          v-model="dialog"
          persistent
          width="1024"
          class="mt-n16"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Editar Asignacion</span>
            </v-card-title>

            <ContentDialogAsignacion :editedAsignacion="editedAsignacion" ref="form"/>

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
                @click="patchAsignacion"
              >
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro de que quiere eliminar esta asignacion?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteAsignacionConfirm">Aceptar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.primario="{ item }">
      <v-chip
        v-if="item.selectable.primario"
        :class="'text-body-1 bg-success'"
      >
        {{ item.selectable.primario ? "si" : "no" }}
      </v-chip>
      <v-chip
        v-else
        :class="'text-body-1 bg-error'"
      >
        {{ item.selectable.primario ? "si" : "no" }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editAsignacion(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteAsignacion(item.raw)"
      >
        mdi-delete
      </v-icon>
    </template>
  </VDataTable>
</template>
<script lang="ts">
import {
  VDataTable
} from "vuetify/labs/VDataTable";
import ContentDialogAsignacion from '@/components/asignacion/ContentDialogAsignacion.vue';

export default {
  data: () => ({
    headers: [
      {
        title: 'Materia',
        align: 'start',
        key: 'catedratico.nombre',
        sortable: false
      },
      {
        title: 'Materia',
        align: 'start',
        key: 'materia.nombre',
        sortable: false
      },
      {
        title: 'Es Principal',
        key: 'primario',
        sortable: false
      },
      {
        title: 'Actions', key: 'actions', sortable: false
      }
    ],
    itemsPerPage: 5,
    dialogDelete: false,
    dialog: false,
    asignaciones: [],
    loading: true,
    totalAsignaciones: 0,
    editedIndex: -1,
    editedAsignacion: {
      id: -1,
      catedratico_id: "",
      materia_id: "",
      primario: false
    }
  }),
  computed: {
    titleDialog() {
      return this.editedIndex == -1 ? "Agregar Asignacion" : "Editar Asignacion";
    }
  },
  methods: {
    loadAsignaciones ({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      console.log(headers);
      this.$axios.get("/materia-catedratico", {
        headers: headers,
        params: {
          page: page,
          number: itemsPerPage ? itemsPerPage : this.itemsPerPage,
        }
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.asignaciones = res[0],
        this.totalAsignaciones = res[1],
        this.loading = false
      }).catch((err) => {
        console.log(err);
      });
    },

    closeDialog() {
      this.editedIndex = -1;
      this.editedAsignacion = {
        id: -1,
        catedratico_id: "",
        materia_id: "",
        primario: false
      };
      this.dialog = false;
    },

    patchAsignacion() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.patch(`/materia-catedratico/${this.editedAsignacion.id}`, {
        catedratico_id: v.catedratico_id,
        materia_id: v.materia_id,
        primario: v.primario
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
        this.loadAsignaciones({page: 1, itemsPerPage: this.itemsPerPage});
      }).catch((err) => {
        console.log(err);
      })
      this.closeDialog();
    },

    editAsignacion (item) {
      this.editedIndex = this.asignaciones.indexOf(item)
      console.log(item);
      let eAsignacion = {
        id: item.id,
        catedratico_id: item.catedratico_id,
        materia_id: item.materia_id,
        primario: item.primario
      }
      this.editedAsignacion = eAsignacion;
      this.dialog = true;
    },

    deleteAsignacion (item) {
      this.editedIndex = this.asignaciones.indexOf(item)
      this.editedAsignacion = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteAsignacionConfirm () {
      this.asignaciones.splice(this.editedIndex, 1);
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      };
      this.$axios.delete(`/materia-catedratico/${this.editedAsignacion.id}`, {
        headers: headers
      }).then((res) => {
        return res.data
      }).then((res) => {
        console.log(res);
        this.loadAsignaciones({page: 1, itemsPerPage: this.itemsPerPage});
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
    ContentDialogAsignacion
  }
}
</script>