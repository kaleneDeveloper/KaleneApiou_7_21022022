<template>
    <v-row justify="center" class="mt-10 mb-10">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="profile"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    profile
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Profil utilisateur</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Username"
                                    v-model="usernameUpdate"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Nom"
                                    persistent-hint
                                    v-model="nameUpdate"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Email"
                                    v-model="emailUpdate"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Password"
                                    type="password"
                                    v-model="passwordUpdate"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Age"
                                    class="mt-0 pt-0"
                                    type="number"
                                    v-model="ageUpdate"
                                    style="width: 60px"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-btn
                                    normal
                                    @click="deleteUser"
                                    depressed
                                    color="red"
                                >
                                    <span
                                        style="font-size: 14px"
                                        class="font-weight-bold"
                                    >
                                        supprimer profile</span
                                    >
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Fermer
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="updateProfile()">
                        Sauvegarder
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import user from "../services/users.js";
export default {
    name: "update-profile",
    props: {
        parentData: Object,
        parentForceRender: Function,
    },
    data() {
        return {
            dialog: false,
            usernameUpdate: "",
            nameUpdate: "",
            emailUpdate: "",
            passwordUpdate: "",
            ageUpdate: "",
            componentKey: 0,
        };
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        profile() {
            this.ageUpdate = this.parentData.users.profile[0].age;
            this.usernameUpdate = this.parentData.users.profile[0].username;
            this.nameUpdate = this.parentData.users.profile[0].lastName;
            this.emailUpdate = this.parentData.users.profile[0].email;
            // this.passwordUpdate = this.parentData.users.profile[0].password;
        },
        updateProfile() {
            user.updateProfile(this.parentData.users.uuid, {
                username: this.usernameUpdate,
                lastName: this.nameUpdate,
                email: this.emailUpdate,
                password: this.passwordUpdate,
                age: this.ageUpdate,
                imageUrl: this.parentData.users.profile[0].imgUrl,
            }).then(() => {
                this.parentForceRender();
                this.dialog = false;
                this.$router.go();
            });
        },
        deleteUser() {
            let confirmDelete = confirm(
                "Voulez-vous vraiment supprimer votre profile ?"
            );
            if (confirmDelete) {
                user.deleteUser(this.parentData.users.uuid).then(() => {
                    this.parentForceRender();
                    this.dialog = false;
                    this.$store.dispatch("logout");
                    this.$router.push("/login");
                    this.$router.go();
                });
            }
        },
    },
    mounted() {
        // this.$store.dispatch("getUserToken").then(() => {});
    },
};
</script>
