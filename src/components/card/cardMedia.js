export default {
    props: {
        contain: Boolean,
        height: {
            type: [Number, String],
            default: 'auto'
        },
        src: {
            type: String
        },
        background: {
            type: Boolean,
            default: true
        },
        autowidth: Boolean,
        href: String
    },

    render(create) {
        const tag = this.href ? 'a' : 'div';

        const data = {
            'class': 'ms-card__media',
            style: {
                height: !isNaN(this.height) ? `${this.height}px` : this.height
            },
            domProps: {},
            on: this.$listeners
        };

        if(this.href) data.domProps.href = this.href;

        const children = [];

        if (this.src) {
            const imgTag = this.background ? 'div' : 'img';

            const imgData = {
                class: {
                    'ms-card__media__img': true,
                    'ms-card__media__img--background': this.background,
                    'ms-card__media__img--autowidth': this.autowidth
                },
                style: {},
                domProps: {}
            }

            if(!this.background) imgData.domProps.src = this.src;
            else imgData.style.background = `url(${this.src}) center center / ${this.contain ? 'contain' : 'cover'} no-repeat`;

            children.push(create(imgTag, imgData));
        }

        children.push(create('div', {
            'class': 'ms-card__media__content'
        }, this.$slots.default))

        return create(tag, data, children);
    }
}