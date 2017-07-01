export default {
  props: {
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: Boolean,
    tag: String,
    target: String
  },

  data() {
    return {
      tabFocused: false
    }
  },

  methods: {
    click() {},
    genLink() {
      let exact = this.exact, tag;
      const url = this.to || this.href;

      const data = {
        attrs: {},
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple || false
        }]
      };

      if(!this.exact) {
        exact = url === '/' || (url === Object(url) && url.path === '/');
      }

      // Events
      const events = {
        click: this.click,
        keyup: e => {
          if ([9, 16].includes(e.keyCode)) {
            this.tabFocused = true;
          }
        },
        blur: e => this.tabFocused = false
      }

      if(url && this.to) {
        tag = this.nuxt ? 'nuxt-link' : 'router-link';
        data.props.to = url;
        data.props.exact = exact;
        data.props.activeClass = this.activeClass;
        data.props.append = this.append;
        data.props.replace = this.replace;

        data.nativeOn = events;

      } else {

        tag = (this.href ? 'a' : this.tag) || 'a';

        if(tag === 'a') {
          data.attrs.href = url || 'javascript:;';
          if(this.target) data.attrs.target = this.target;
        }

        data.on = events;
      }

      return { tag, data }
    }
  }
}