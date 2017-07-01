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
                    {[`ms-flex--xs-${this.xs}`]: +this.xs > 0},
                    {[`ms-flex--sm-${this.sm}`]: +this.sm > 0},
                    {[`ms-flex--md-${this.md}`]: +this.md > 0},
                    {[`ms-flex--lg-${this.lg}`]: +this.lg > 0},
                    {[`ms-flex--xl-${this.xl}`]: +this.xl > 0}
                ];
            }
        }
    };
</script>
