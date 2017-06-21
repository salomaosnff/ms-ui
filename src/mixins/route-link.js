export default {
  props: {
    disabled: Boolean,
    href: [String, Object],
    to: [String, Object],
    ripple: Boolean,
    tag: String,
    target: String
  },

  methods: {
    click () {},
    generateRouteLink () {
      const tag = this.href ? 'a' : this.tag;
      const url = this.href || this.to;
      const data = {
        attrs:{},
        class: this.classes,
        props: {},
        on: {},
        directives: [
          {
            name: 'ripple',
            value: this.ripple || false
          }
        ]
      };

      // É uma âncora?
      if(tag === 'a'){
        data.attrs.href = url || 'javascript:;';
        if(this.target) data.attrs.target = this.target;
      } 

      return { tag, data }
    }
  }
}