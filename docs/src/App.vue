<template>
    <ms-container>
        <h1>Form</h1>
        <ms-text-field 
            v-for="(style, i) in styles" 
            v-bind="{[style]: true}"
            :key="i"
            required
            :label="`Textarea ${style}`"
            help="Escreva uma mensagem aqui"
            prepend-icon="lock"
            prefix="prefixo_"
            suffix="@gmail.com"
            autogrow
            rows="3"
            counter
            
        ></ms-text-field>

        <hr>

        <div v-html="html"></div>
        <ms-text-field
            required
            multiline
            rows="3"
            info
            label="HTML"
            help="Escreva o seu código HTML aqui."
            prepend-icon="code-tags"
            v-model="html"
        ></ms-text-field>

        <h1>Botões</h1>
        <ms-btn v-for="(style, i) in styles" v-bind="{[style]: true}" :key="i">{{ style }}</ms-btn>
        <hr>
        <h2>Sizes</h2>
        <ms-btn v-for="(size, i) in sizes" v-bind="{[size]: true}" :key="i" primary>Button {{ size }}</ms-btn>
        <hr>
        <h2>Prepend Icons</h2>
        <ms-btn v-for="(icon, style, i) in icons" v-bind="{[style]: true, prependIcon: icon}" :key="i">{{ style }}</ms-btn>
    
        <h2>Append Icons</h2>
        <ms-btn v-for="(icon, style, i) in icons" v-bind="{[style]: true, appendIcon: icon}" :key="i">{{ style }}</ms-btn>
        <hr>
        <h2>Flat</h2>
        <ms-btn v-for="(style, i) in styles" v-bind="{[style]: true}" flat :key="i">{{ style }}</ms-btn>
    </ms-container>
</template>

<style lang="stylus">
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
    @import "../../src/styles/main"

    for i in (1..6)
        h{i}
            margin .5em 0

    hr
        margin 1em
        border 1px solid #CCC

</style>

<script>
    export default {
        mounted() {},
        data() {
            return {
                styles: ['default', 'primary', 'success', 'info', 'warning', 'error'],
                sizes: ['xs', 'sm', 'default', 'lg'],
                icons: {
                    default: 'account',
                    primary: 'download',
                    success: 'check',
                    info   : 'information',
                    warning: 'alert',
                    error  : 'alert-circle'
                },
                html: '<h1>Olá Mundo!</h1>'
            };
        },
        watch: {
            test(val) {
                console.log(val);
            }
        },
        methods: {
            alert(msg) {
                alert(msg)
            },
            tglPwd(){
                this.on = !this.on;
            }
        }
    };
</script>
