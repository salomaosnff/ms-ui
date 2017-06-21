<template>
    <ms-container>
        <ms-button id="test" raised prepend-icon="account">Default</ms-button>
        <ms-button primary raised prepend-icon="account">Primary</ms-button>
        <ms-button success raised prepend-icon="account">Success</ms-button>
        <ms-button info raised prepend-icon="account">Info</ms-button>
        <ms-button warning raised prepend-icon="account">Warning</ms-button>
        <ms-button danger raised prepend-icon="download">Danger</ms-button>
    </ms-container>
</template>

<style lang="stylus">
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
    @import "../../src/styles/main"
</style>

<script>
    export default {
        mounted() {},
        data() {
            return {};
        },
        methods: {
            alert(msg) {
                alert(msg)
            }
        }
    };
</script>
