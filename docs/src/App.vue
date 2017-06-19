<template>
    <ms-container>
        <ms-button danger prepend-icon="pencil" append-icon="google">Happy Button</ms-button>
    </ms-container>
</template>

<style lang="stylus">
    @import "../../src/styles/main"
</style>

<script>
    export default {
        mounted() {},
        data() {
            return {};
        },
        methods: {
            test() {
                alert('WOU!');
            }
        }
    };
</script>
