<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Username</v-label>
            <v-text-field variant="outlined" hide-details color="primary" v-model="username"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field variant="outlined" type="password" color="primary" v-model="password"></v-text-field>
        </v-col>
        <v-col cols="12" >
            <v-btn color="primary" size="large" block   flat @click="onClickSignUp">Sign up</v-btn>
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
        onClickSignUp() {
            this.$axios.post("/auth/register", {
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