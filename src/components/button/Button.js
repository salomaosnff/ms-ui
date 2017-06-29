import BindEvents from '../../mixins/bindEvents'
import Contextualable from '../../mixins/contextuable'
import Toggleable from '../../mixins/toggleable'
import GenerateRouteLink from '../../mixins/route-link'
import Themeable from '../../mixins/themeable'

export default {
  mixins: [BindEvents, Contextualable, GenerateRouteLink, Toggleable, Themeable],
  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
    default: Boolean,
    flat: Boolean,
    float: Boolean,
    icon: Boolean,
    appendIcon: [Boolean, String],
    prependIcon: [Boolean, String],
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    round: Boolean,
    xs: Boolean,
    sm: Boolean,
    lg: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    }
  },

  computed: {
    classes () {
      return {
        'btn': true,

        'btn--icon': this.icon,

        'btn--active': this.isActive,
        'btn--disabled': this.disabled,

        'btn--dark': !this.light && this.dark,
        'btn--light': this.light || !this.dark,

        'btn--block': this.block,
        'btn--raised': !this.flat,
        'btn--round': this.round,
        
        'btn--default': this.default,
        'btn--flat': this.flat,
        'btn--float': this.float,
        
        'btn--xs': this.xs,
        'btn--sm': this.sm,
        'btn--lg': this.lg,

        'primary': !this.flat && this.primary,
        'secondary': !this.flat && this.secondary,
        'success': !this.flat && this.success,
        'info': !this.flat && this.info,
        'warning': !this.flat && this.warning,
        'error': !this.flat && this.error,

        'primary--text': this.primary && this.flat,
        'secondary--text': this.secondary && this.flat,
        'success--text': this.success && this.flat,
        'info--text': this.info && this.flat,
        'warning--text': this.warning && this.flat,
        'error--text': this.error && this.flat
      }
    }
  },
  // Rederizar o componente
  render (create) {
    const { tag, data } = this.generateRouteLink(); // Cria um elemento (Router-Link, a, button...)
    const content = [create('span', {'class': 'btn__text'}, [this.$slots.default])];

    // É um botão?
    if (tag === 'button') data.attrs.type = this.type;

    if(this.prependIcon){
      content.unshift(create('ms-icon', {
        'class' : 'icon__prepend'
      }, [this.prependIcon]));
    } 

    if(this.appendIcon){
      content.push(create('ms-icon', {
        'class' : 'icon__append'
      }, [this.appendIcon]));
    } 

    const button = create(tag, data, content);

    // Remove focus
    data.on.mouseup = e => button.elm.blur();
    data.on.mouseleave = data.on.mouseup;

    return button;
  }
}