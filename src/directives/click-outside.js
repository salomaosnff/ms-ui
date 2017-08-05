const directive = (e, el, bind, v) => {
    let cb = () => true;

    if(bind.value) cb = bind.value;

    if(v.context.isActive && (e && e.target)
    && (e.target !== el && !el.contains(e.target))
    && cb(e)) {
        v.context.isActive = false;
    }
}

export default function install(Vue) {
    Vue.directive('click-outside', {
        bind (el, bind, v) {
            v.context.$ms.loaded(() => {
                const outside = document.querySelector('[ms-app]');
                const click = e => directive(e, el, bind, v);
                outside.addEventListener('click', click, false);
                el._clickOutside = click;
            });
        },
        unbind (el) {
            const outside = document.querySelector('[ms-app]');
            outside && outside.removeEventListener('click', el._clickOutside, false);
        }
    });
}
