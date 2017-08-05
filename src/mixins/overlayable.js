export default {
    data() {
        return {
            overlay: null,
            overlayOffset: 0,
            overlayTransitionDuration: 500
        }
    },
    props: {
        hideOverlay: Boolean
    },
    beforeDestroy() {
        this.removeOverlay();
    },
    methods: {
        genOverlay() {
            if ((!this.isActive || this.hideOverlay) ||
                (this.isActive && this.overlay)
            ) return;

            this.overlay = document.createElement('div');
            this.overlay.className = 'ms-overlay';
            this.overlay.onclick = () => {
                if (this.permanent) return;
                else if (!this.persistent) this.isActive = false;
                else if (this.isMobile) this.isActive = false;
            }

            if (this.absolute) this.overlay.className += ' ms-overlay--absolute'

            this.hideScroll();

            if (this.absolute) {
                // Required for IE11
                const parent = this.$el.parentNode;
                parent.insertBefore(this.overlay, parent.firstChild);
            } else {
                document.querySelector('[ms-app]').appendChild(this.overlay);
            }

            this.overlay.clientHeight; // Force repaint
            requestAnimationFrame(() => {
                this.overlay.className += ' ms-overlay--active';
            });

            return true;
        },
        removeOverlay() {
            if (!this.overlay) {
                return this.showScroll();
            }

            this.overlay.classList.remove('ms-overlay--active');

            setTimeout(() => {
                // IE11 Fix
                try {
                    this.overlay.parentNode.removeChild(this.overlay);
                    this.overlay = null;
                    this.showScroll();
                } catch (e) { }
            }, this.overlayTransitionDuration);
        },
        hideScroll() {
            document.documentElement.style.overflow = 'hidden';
        },
        showScroll() {
            document.documentElement.removeAttribute('style');
        }
    }
}