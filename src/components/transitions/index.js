function createSimpleTransition (name) {
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

const SlideXTransition = createSimpleTransition('slide-x-transition')
const SlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition')
const SlideYTransition = createSimpleTransition('slide-y-transition')
const SlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition')
const ScaleTransition = createSimpleTransition('scale-transition')
const TabTransition = createSimpleTransition('tab-transition')
const TabReverseTransition = createSimpleTransition('tab-reverse-transition')
const CarouselTransition = createSimpleTransition('carousel-transition')
const CarouselReverseTransition = createSimpleTransition('carousel-reverse-transition')
const DialogTransition = createSimpleTransition('dialog-transition')
const DialogBottomTransition = createSimpleTransition('dialog-bottom-transition')
const FadeTransition = createSimpleTransition('fade-transition')
const MenuTransition = createSimpleTransition('menu-transition')

const Transitions = {
  SlideXTransition,
  SlideXReverseTransition,
  SlideYTransition,
  SlideYReverseTransition,
  ScaleTransition,
  FadeTransition,
  TabTransition,
  TabReverseTransition,
  DialogTransition,
  DialogBottomTransition,
  MenuTransition,
  CarouselTransition,
  CarouselReverseTransition
}

export default function install(Vue){
    for(let name in Transitions){
        Vue.component(name, Transitions[name]);
    }
}