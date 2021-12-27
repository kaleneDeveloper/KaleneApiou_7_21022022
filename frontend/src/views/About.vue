<template>
    <v-main class="pl-0">
        <v-container>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card>
                    <v-card-title>
                        <h1>About</h1>
                    </v-card-title>
                    <v-card-text>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Doloremque, quisquam.
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-container>
    </v-main>
</template>

<script>
import Vuetify from "vuetify/lib";
export default new Vuetify({
    breakpoint: {
        thresholds: {
            xs: 340,
            sm: 540,
            md: 800,
            lg: 1280,
        },
        scrollBarWidth: 24,
    },
});
</script>
<style scoped></style>
