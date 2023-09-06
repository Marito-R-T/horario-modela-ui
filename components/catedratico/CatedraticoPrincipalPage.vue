<script setup lang="ts">
import MainButton from '@/components/shared/MainButton.vue';
import ContentDialogCatedratico from '@/components/catedratico/ContentDialogCatedratico.vue';
import AddContentDialog from '@/components/shared/AddContentDialog.vue';
import CatedraticoTable from '@/components/catedratico/CatedraticoTable.vue';
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
  <!--<MainButton type="Materia" @on-click-agregar="onAgregarMateria"></MainButton>-->
  <v-container>
    <AddContentDialog title="Agregar Catedratico" @add-content="addCatedratico">
      <ContentDialogCatedratico ref="form"/>
    </AddContentDialog>
  </v-container>
  <v-container>
    <CatedraticoTable ref="table"></CatedraticoTable>
  </v-container>
</template>

<script lang="ts">

export default {
  data: () => ({
  }),
  methods: {
    addCatedratico() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.post("/catedraticos", {
        nombre: v.name,
        periodo_inicio: v.periodo_inicio,
        periodo_final: v.periodo_final,
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      this.$refs.table.loadCatedraticos({ page: 1 });
    }
  },
}

</script>