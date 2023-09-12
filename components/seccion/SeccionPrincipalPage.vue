<script setup lang="ts">
import MainButton from '@/components/shared/MainButton.vue';
import ContentDialogSeccion from '@/components/seccion/ContentDialogSeccion.vue';
import AddContentDialog from '@/components/shared/AddContentDialog.vue';
import SeccionTable from '@/components/seccion/SeccionTable.vue';
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
  <!--<MainButton type="Materia" @on-click-agregar="onAgregarMateria"></MainButton>-->
  <v-container>
    <AddContentDialog title="Agregar Seccion" @add-content="addSeccion">
      <ContentDialogSeccion ref="form"/>
    </AddContentDialog>
  </v-container>
  <v-container>
    <SeccionTable ref="table"></SeccionTable>
  </v-container>
</template>

<script lang="ts">

export default {
  data: () => ({
  }),
  methods: {
    addSeccion() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.post("/secciones", {
        asignados: v.asignados,
        letra: v.letra,
        materia_id: v.materia_id
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      this.$refs.table.loadSecciones({ page: 1 });
    }
  },
}

</script>