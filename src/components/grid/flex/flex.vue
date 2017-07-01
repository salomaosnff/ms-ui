<template>
    <div :class="classes" :id="id">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            id: String,
            xs: String,
            sm: String,
            md: String,
            lg: String,
            xl: String,
            auto: Boolean
        },
        computed: {
            classes() {
                return [
                    'ms-flex',
                    {'ms-flex--auto': this.auto},
                    {[`ms-flex--xs-${this.xs}`]: this.xs},
                    {[`ms-flex--sm-${this.sm}`]: this.sm},
                    {[`ms-flex--md-${this.md}`]: this.md},
                    {[`ms-flex--lg-${this.lg}`]: this.lg},
                    {[`ms-flex--xl-${this.xl}`]: this.xl}
                ];
            }
        }
    };
</script>
