<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(true);
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Username</v-label>
            <v-text-field variant="outlined" hide-details color="primary" v-model="username"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field variant="outlined" type="password"  hide-details color="primary" v-model="password"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn color="primary" size="large" block flat @click="onClickSignIn">Sign in</v-btn>
        </v-col>
    </v-row>
</template>
<script lang="ts">
export default {
    data: () => ({
        username: "",
        password: ""
    }),
    methods: {
        onClickSignIn() {
            this.$axios.post("/auth/login", {
                username: this.username,
                password: this.password,
            }).then((res) => {
                console.log(res);
                return res.data;
            }).then((data) => {
                console.log(data);
                this.$store.set(data.token);
                navigateTo('/')
            });
        }
    },
}
</script>
