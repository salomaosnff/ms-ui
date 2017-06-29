import Icon from './icon';

export default function install(Vue, options) {
    const opt = options.icon;

    Icon.props = {
        classFormat: {
            type: String,
            default: opt.classFormat
        },
        inContent: {
            type: Boolean,
            default: opt.inContent
        }
    };

    Vue.component('ms-icon', Icon);
}
