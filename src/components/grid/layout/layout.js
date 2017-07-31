export default {
    props: {
        id: String,
        col: Boolean,
        wrap: Boolean,
        reverse: Boolean,
        justify: String,
        align: String,
        alignItems: String
    },
    computed: {
        classes() {
            const alignments = ['start', 'center', 'end', 'around', 'between'];
            const justify = alignments.includes(this.justify);
            const align = alignments.includes(this.align);
            const alignItems = alignments.includes(this.alignItems);

            return {
                'ms-layout': true,
                'ms-layout--col': this.col,
                'ms-layout--wrap': this.wrap,
                'ms-layout--reverse': this.reverse,
                [`ms-layout--justify-${this.justify}`]: justify,
                [`ms-layout--align-${this.align}`]: align,
                [`ms-layout--align-items-${this.alignItems}`]: alignItems
            };
        }
    },
    render(create) {
        const data = {
            class: this.classes,
            domProps: {}
        }

        if(this.id) data.domProps.id = this.id;

        return create('div', data, this.$slots.default);
    }
};