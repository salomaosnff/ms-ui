export function createSimpleFunctional(c, el = 'div') {
    return {
        functional: true,

        render: (create, { data, children }) => {
            data.staticClass = (`${c} ${data.staticClass || ''}`).trim();

            return create(el, data, children);
        }
    }
}

export function createSimpleTransition (name) {
  return {
    functional: true,

    render (h, context) {
      const origin = (context.data.attrs || context.data.props || {}).origin || 'top center 0'
      context.data = context.data || {}
      context.data.props = { name }
      context.data.on = context.data.on || {}

      context.data.on.beforeEnter = el => {
        el.style.transformOrigin = origin
        el.style.webkitTransformOrigin = origin
      }

      return h('transition', context.data, context.children)
    }
  }
}