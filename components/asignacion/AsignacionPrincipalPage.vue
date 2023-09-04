<script setup lang="ts">
import MainButton from '@/components/shared/MainButton.vue';
import ContentDialogAsignacion from '@/components/asignacion/ContentDialogAsignacion.vue';
import AddContentDialog from '@/components/shared/AddContentDialog.vue';
import AsignacionTable from '@/components/asignacion/AsignacionTable.vue';
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
  <!--<MainButton type="Materia" @on-click-agregar="onAgregarMateria"></MainButton>-->
  <v-container>
    <AddContentDialog title="Agregar Asignacion" @add-content="addAsignacion">
      <ContentDialogAsignacion ref="form"/>
    </AddContentDialog>
  </v-container>
  <v-container>
    <AsignacionTable ref="table"></AsignacionTable>
  </v-container>
</template>

<script lang="ts">

export default {
  data: () => ({
  }),
  methods: {
    addAsignacion() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.post("/materia-catedratico", {
        catedratico_id: v.catedratico_id,
        materia_id: v.materia_id,
        primario: v.primario
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
        this.$refs.table.loadAsignaciones({ page: 1 });
      }).catch((err) => {
        console.log(err);
      });
    }
  },
}

</script>