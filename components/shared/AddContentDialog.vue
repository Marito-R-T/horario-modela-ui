<template>
  <v-row justify="end" class="pr-3 pb-3">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Agregar {{ type }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <slot />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="onClose"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="onAdd"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
  export default {
    props: {
      title: String,
      type: String,
    },
    data: () => ({
      dialog: false,
    }),
    methods: {
      onClose() {
        this.dialog = false;
      },
      onAdd() {
        this.$emit("add-content");
        this.dialog = false;
      }
    },
  }
</script>