export default {
    props: {
        contentClass: {
            default: ''
        }
    },
    mounted() {
        this.$ms.loaded(() => {
            if (this._isDestroyed) return;

            const app = document.querySelector('[ms-app]');

            if (!app) {
                return console.warn('Application is missing <ms-app> component.');
            }

            app.insertBefore(
                this.$refs.content,
                app.firstChild
            );
        });
    },

    beforeDestroy() {
        if (!this.$refs.content) return;

        // IE11 Fix
        try {
            this.$refs.content.parentNode.removeChild(this.$refs.content);
        } catch (e) { }
    }
}