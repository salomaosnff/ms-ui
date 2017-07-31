const media = (el, bind, vnode) => {
    
    if(!bind.modifiers || !bind.value) return;

    const vue = vnode.context;
    const breakpoints = vue.$ms.breakpoints;
    const medias = Object.keys(breakpoints);

    let devices = Object.keys(bind.modifiers)
            .filter(dev => medias.includes(dev));

    // Function media
    if(typeof bind.value === 'function') {
        if(typeof window === 'undefined') return;

        const callback = () => {
            const dev = Object.keys(breakpoints).filter(d => breakpoints[d](window.innerWidth)).pop();
            return (!devices.length || devices.includes(dev)) ? bind.value(dev) : false;
        };

        callback() && window.addEventListener('resize', callback);
        return;
    }

    // Media class
    let classes = bind.value;

    if(typeof classes === "string"){
        classes = classes.split(/[\s\t|.]/);
    } else if(classes instanceof Object){
        classes = Object.keys(classes).filter(c => classes[c]);
    } else {
        classes = [];
    }

    devices.map(d => classes.map(c => `ms-${d}-${c}`))
        .forEach(c => {
            el.classList.remove(c);
            if(!bind.arg){
                el.classList.add(c);
            }
        });
};

export default function install(Vue) {
    Vue.directive('media', {
        bind: media,
        update: media
    });
}
