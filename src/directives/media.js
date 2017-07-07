const media = (el, bind) => {
    
    if(!bind.modifiers || !bind.value) return;

    let classes = bind.value,
        devices = Object.keys(bind.modifiers)
            .filter(dev => ['xs', 'sm', 'md', 'lg', 'xl'].includes(dev));

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
        })
};

export default function install(Vue) {
    Vue.directive('media', {
        bind: media,
        update: media
    });
}
