<template>
    <ms-container fluid>
        <h1>Buttons</h1>
        <table>
            <thead>
                <tr>
                    <th>Style</th>
                    <th>Raised</th>
                    <th>Flat</th>
                    <th>Extra Small</th>
                    <th>Small</th>
                    <th>Large</th>
                    <th>Prepend Icon</th>
                    <th>Append Icon</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(style, i) in styles" :key="i">
                    <td>{{style}}</td>
                    <td><ms-btn v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                    <td><ms-btn flat v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                    <td><ms-btn xs v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                    <td><ms-btn sm v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                    <td><ms-btn lg v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                    <td><ms-btn prepend-icon="account" v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                    <td><ms-btn append-icon="lock" v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                </tr>
            </tbody>
        </table>
        <h1>Text Fields</h1>
        <table>
            <thead>
                <tr>
                    <th>Style</th>
                    <th>Default</th>
                    <th>Label</th>
                    <th>Prepend Icon</th>
                    <th>Append Icon</th>
                    <th>Errors</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(style, i) in styles" :key="i">
                    <td>{{style}}</td>
                    <td>
                        <ms-text-field 
                            v-bind="{[style]:true}"
                        ></ms-text-field>
                    </td>
                    <td>
                        <ms-text-field 
                            :label="`Input ${style}`" 
                            v-bind="{[style]:true}"
                        ></ms-text-field>
                    </td>
                    <td>
                        <ms-text-field 
                            prepend-icon="pencil" 
                            v-bind="{[style]:true}"
                        ></ms-text-field>
                    </td>
                    <td>
                        <ms-text-field 
                            append-icon="eye" 
                            v-bind="{[style]:true}"
                        ></ms-text-field>
                    </td>
                    <td>
                        <ms-text-field 
                            :errors="['Validation message']"
                            v-bind="{[style]:true}"
                        ></ms-text-field>
                    </td>
                </tr>
            </tbody>
        </table>
        <ms-text-field 
            label="Id do perfil"
            append-icon="lock"
            prefix="https://memeshare.com.br/profile/"
        ></ms-text-field>
        <ms-text-field 
            required
            help="Seu domínio"
            prepend-icon="web"
            prefix="www."
            suffix=".com.br"
        ></ms-text-field>
        <ms-text-field 
            required
            label="Telefone"
            prepend-icon="phone"
            prefix="+55"
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

    $primary = $ms-theme['primary']['base']

    for i in (1..6)
        h{i}
            margin .5em 0

    hr
        margin 1em
        border 1px solid #CCC

    table
        border-spacing 0

        thead th
            background $primary
            padding .5em 1em
            color rgba(#FFF, 82%)
        tbody
            tr
                td
                    border 1px solid rgba($primary, 18%)
                    padding 0 .5em


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
