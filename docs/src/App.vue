<template>
    <ms-container>
        <ms-layout wrap v-for="col in 12">
            <ms-flex :xs="col">
                Col {{col}}
            </ms-flex>
        </ms-layout>
    </ms-container>
</template>

<style lang="stylus">
    @import "../../src/styles/main"
</style>

<script>
    export default {
        data() {
            return {};
        }
    };
</script>
