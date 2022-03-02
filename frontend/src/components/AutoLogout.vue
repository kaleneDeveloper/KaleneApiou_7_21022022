<template>
    <div v-if="warningZone">Are you still with us?</div>
</template>

<script>
export default {
    name: "auto-logout",
    data: function () {
        return {
            events: [
                "click",
                "mousemove",
                "mousedown",
                "scroll",
                "keypress",
                "load",
            ],
            warningTimer: null,
            logoutTimer: null,
            warningZone: false,
        };
    },
    mounted() {
        this.events.forEach(function (event) {
            window.addEventListener(event, this.resetTimer);
        }, this);
        this.setTimers();
    },
    destroyed() {
        this.events.forEach(function (event) {
            window.removeEventListener(event, this.resetTimer);
        }, this);
        this.resetTimer();
    },
    methods: {
        setTimers: function () {
            this.warningTimer = setTimeout(this.warningMessage, 2700 * 1000); // 14 minutes - 14 * 60 * 1000
            this.logoutTimer = setTimeout(this.logoutUser, 3600 * 1000); // 15 minutes - 15 * 60 * 1000
            this.warningZone = false;
        },
        warningMessage() {
            this.warningZone = true;
        },
        logoutUser() {
            // Laravel
            // document.getElementById("logout-form").submit();
            alert("You have been logged out");
        },
        resetTimer() {
            clearTimeout(this.warningTimer);
            clearTimeout(this.logoutTimer);
            this.setTimers();
        },
    },
};
</script>
