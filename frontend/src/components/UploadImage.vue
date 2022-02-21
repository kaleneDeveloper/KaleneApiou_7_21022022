<template>
    <v-container class="sendTweet">
        <!-- UPLOAD_FILES -->
        <div>
            <v-row no-gutters align="center">
                <v-col cols="12" sm="2">
                    <template>
                        <v-file-input
                            label="Select Image"
                            accept="images/posts/*"
                            @change="selectImage($event)"
                            multiple
                            prepend-icon="mdi-camera"
                        ></v-file-input>
                    </template>
                </v-col>
            </v-row>
            <div v-if="progress">
                <div>
                    <v-progress-linear
                        v-model="progress"
                        color="light-blue"
                        height="25"
                        reactive
                    >
                        <strong>{{ progress }} %</strong>
                    </v-progress-linear>
                </div>
            </div>
            <div v-if="previewImages">
                <div
                    v-for="(previewImage, index) in previewImages"
                    v-bind:key="index"
                >
                    <v-img
                        class="preview my-3 ma-auto"
                        :src="previewImage"
                        alt=""
                        max-height="400"
                        max-width="400"
                        contain
                    ></v-img>
                </div>
            </div>
            <v-alert v-if="message" border="left" color="blue-grey" dark>
                {{ message }}
            </v-alert>
        </div>
    </v-container>
</template>

<script>
import UploadService from "../services/UploadFilesServicePost.js";
export default {
    name: "upload-image",
    data() {
        return {
            currentImage: undefined,
            previewImages: [],
            progress: 0,
            message: "",
            imageInfos: [],
            componentKey: 0,
        };
    },
    methods: {
        selectImage(image) {
            this.currentImage = image;
            if (this.previewImages.length > 0) {
                this.previewImages = [];
            }
            this.currentImage.forEach((currentImage) => {
                this.previewImages.push(URL.createObjectURL(currentImage));
            });
            this.progress = 0;
            this.message = "";
        },
        async uploadFilePost(uuid, post, username) {
            if (this.currentImage) {
                this.progress = 0;
                this.message = "";
                await UploadService.uploadFilePost(
                    {
                        imageUrl: this.currentImage,
                        userUuid: uuid,
                        content: post,
                        title: username,
                    },
                    (event) => {
                        this.progress = Math.round(
                            (100 * event.loaded) / event.total
                        );
                    }
                )
                    .then((response) => {
                        this.message = response.data.message;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    },
    mounted() {
        // UploadService.getFilesPost();
    },
};
</script>
