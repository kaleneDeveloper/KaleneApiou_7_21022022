<template>
    <v-container class="sendTweet">
        <!-- UPLOAD_FILES -->
        <div>
            <v-row no-gutters justify="center" align="center">
                <v-col cols="8">
                    <template>
                        <v-file-input
                            show-size
                            label="Select Image"
                            accept="images/posts/*"
                            @change="selectImage($event)"
                            multiple
                        ></v-file-input>
                    </template>
                </v-col>
                <v-col cols="4" class="pl-2">
                    <v-btn color="success" dark small @click="uploadFilePost">
                        Upload
                        <v-icon right dark>mdi-cloud-upload</v-icon>
                    </v-btn>
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
        uploadFilePost(uuid, post, username) {
            if (this.currentImage) {
                this.progress = 0;
                this.message = "";
                UploadService.uploadFilePost(
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
                        // return UploadService.getFilesPost();
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
