<template>
    <div class="hello">

    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    data: function () {
        return {
            like: 0,
            comments: [
                {
                    id: 1,
                    nom: "Kalene",
                    commentaire: "c'est un commentaire",
                    note: 5,
                },
                {
                    id: 2,
                    nom: "Rafik",
                    commentaire: "c'est un commentaire",
                    note: 2,
                },
                {
                    id: 3,
                    nom: "Dilan",
                    commentaire: "c'est un commentaire",
                    note: 1,
                },
            ],
        };
    },
    methods: {
        increment() {
            this.like++;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
p {
    font-weight: normal;
    font-size: 1rem;
}
</style>
