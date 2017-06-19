<template>
    <ms-container>
        <ms-button  @click="alert('Default!')" prepend-icon="pencil">Default</ms-button>
        <ms-button primary @click="alert('Primary!')" prepend-icon="pencil">Primary</ms-button>
        <ms-button success @click="alert('Success!')" prepend-icon="pencil">Success</ms-button>
        <ms-button info @click="alert('Info!')" prepend-icon="pencil">Info</ms-button>
        <ms-button warning @click="alert('Warning!')" prepend-icon="pencil">Warning</ms-button>
        <ms-button danger @click="alert('Danger!')" prepend-icon="pencil">Danger</ms-button>
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
