<script setup lang="ts">
</script>

<template>
  <v-container app>
    <v-row>
      <v-col cols="10"/>
      <v-col cols="2">
        <v-btn
          class="text-none"
          color="primary"
          variant="flat"
        >
          Agregar {{type}}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
export default {
  data: () => ({

  }),
  props: {
    type: String,
  },
  methods: {
  },
  created() {
    console.log(this.type);
  },
}
</script>
