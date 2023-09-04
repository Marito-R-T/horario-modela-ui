<script setup lang="ts">
import MainButton from '@/components/shared/MainButton.vue';
import ContentDialogAula from '@/components/aula/ContentDialogAula.vue';
import AddContentDialog from '@/components/shared/AddContentDialog.vue';
import AulaTable from '@/components/aula/AulaTable.vue';
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
  <!--<MainButton type="Materia" @on-click-agregar="onAgregarMateria"></MainButton>-->
  <v-container>
    <AddContentDialog title="Agregar Aula" @add-content="addAula">
      <ContentDialogAula ref="form"/>
    </AddContentDialog>
  </v-container>
  <v-container>
    <AulaTable ref="table"></AulaTable>
  </v-container>
</template>

<script lang="ts">

export default {
  data: () => ({
  }),
  methods: {
    addAula() {
      const headers = {
        'Authorization': 'Bearer ' + this.$store.token
      }
      let v = this.$refs.form.getData();
      this.$axios.post("/aulas", {
        nombre: v.name,
        capacidad: v.capacidad
      }, {
        headers: headers
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      this.$refs.table.loadAulas({ page: 1 });
    }
  },
}

</script>