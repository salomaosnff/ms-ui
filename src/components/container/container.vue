<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            fluid: String
        },
        computed: {
            classes() {
                return [
                    'ms-container',
                    {'ms-container-fluid': typeof this.fluid !== 'undefined'}
                ];
            }
        }
    };
</script>
