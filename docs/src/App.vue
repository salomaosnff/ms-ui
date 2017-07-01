<template>
    <ms-page>
        <ms-container fluid class="grey-d3--text">

            <h1>Heading H1</h1>
            <h2>Heading H2</h2>
            <h3>Heading H3</h3>
            <h4>Heading H4</h4>
            <h5>Heading H5</h5>
            <h6>Heading H6</h6>

            <p><small>Small Text</small> <a href="#">Hyperlink</a> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi officiis iure et, fuga consectetur eius dolor voluptatibus aliquid repudiandae eaque.</p>

            <ms-btn href="/test">Test Link</ms-btn>

            <ms-hr></ms-hr>

            <ms-checkbox
                v-for="(opt, i) in terms"
                :key="i"
                :value="opt"
            >{{opt}}</ms-checkbox>

            <pre>
                {{items}}
            </pre>

            <ms-layout wrap justify="center">

                <ms-flex xs="4">

                    <ms-layout wrap class="grey-l4--bg">

                        <ms-flex xs="6">
                            <ms-text-field 
                                label="Teste de label para testar a elispis dessa merda"
                                prepend-icon="pencil"
                            ></ms-text-field>
                        </ms-flex>

                        <ms-flex xs="6">
                            <ms-text-field 
                                label="Teste"
                                prepend-icon="pencil"
                            ></ms-text-field>
                        </ms-flex>

                    </ms-layout>

                </ms-flex>

            </ms-layout>

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
            <h1>Buttons Light</h1>
            <table class="dark">
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
                        <td><ms-btn light v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                        <td><ms-btn light flat v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                        <td><ms-btn light xs v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                        <td><ms-btn light sm v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                        <td><ms-btn light lg v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                        <td><ms-btn light prepend-icon="account" v-bind="{[style]: true}">{{ style }}</ms-btn></td>
                        <td><ms-btn light append-icon="lock" v-bind="{[style]: true}">{{ style }}</ms-btn></td>
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
                    </tr>
                </tbody>
            </table>
            <h2>Textfields Light</h2>
            <table class="dark">
                <thead>
                    <tr>
                        <th>Style</th>
                        <th>Default</th>
                        <th>Label</th>
                        <th>Prepend Icon</th>
                        <th>Append Icon</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(style, i) in styles" :key="i">
                        <td>{{style}}</td>
                        <td>
                            <ms-text-field 
                                light
                                v-bind="{[style]:true}"
                            ></ms-text-field>
                        </td>
                        <td>
                            <ms-text-field 
                                light
                                :label="`Input ${style}`" 
                                v-bind="{[style]:true}"
                            ></ms-text-field>
                        </td>
                        <td>
                            <ms-text-field 
                                light
                                prepend-icon="pencil" 
                                v-bind="{[style]:true}"
                            ></ms-text-field>
                        </td>
                        <td>
                            <ms-text-field 
                                light
                                append-icon="eye" 
                                v-bind="{[style]:true}"
                            ></ms-text-field>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ms-container>
    </ms-page>
</template>

<style lang="stylus">
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
    @import "../../src/styles/main"

    $primary = $ms-theme['primary']['base']

    #test
        color red

    for i in (1..6)
        h{i}
            margin .5em 0

    hr
        margin 1em
        border 1px solid #CCC

    table
        border-spacing 0
        width 100%
        text-align center

        thead th
            background $primary
            padding .5em 1em
            color rgba(#FFF, 82%)
        tbody
            tr
                td
                    border 1px solid rgba($primary, 18%)
                    padding 0 .5em
    .dark
        color #EEEEEE
        background #333333


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
                html: '<h1>Olá Mundo!</h1>',
                i: false,
                terms: [
                    'Option 1',
                    'Option 2'
                ],
                items: []
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
