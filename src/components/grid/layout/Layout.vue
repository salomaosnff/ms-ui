<template>
    <div :class="classes" :id="id">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            id: String,
            col: String,
            wrap: String,
            reverse: String,
            justify: String,
            align: String
        },
        computed: {
            classes() {
                const col = typeof this.col !== 'undefined';
                const wrap = typeof this.wrap !== 'undefined';
                const reverse = typeof this.reverse !== 'undefined';

                const alignments = ['start', 'center', 'end', 'around', 'between'];
                const justify = alignments.indexOf(this.justify) >= 0;
                const align = alignments.indexOf(this.align) >= 0;

                return [
                    'ms-layout',
                    {'ms-layout-col': col},
                    {'ms-layout-wrap': wrap},
                    {'ms-layout-reverse': reverse},
                    {[`ms-layout-justify-${this.justify}`]: justify},
                    {[`ms-layout-align-${this.align}`]: align}
                ];
            }
        }
    };
</script>
