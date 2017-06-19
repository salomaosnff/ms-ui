// Directives
import Media from './directives/media';

// Components
import Grid from './components/grid/';
import Container from './components/container/';
import Icon from './components/icon/';
import Button from './components/button/';

const Plugin = {
    // Directives
    Media,

    // Components
    Grid,
    Container,
    Icon,
    Button
};

Plugin.install = (Vue, options) => {

    options = Object.assign({
        icon: {
            classFormat: 'mdi mdi-%',
            inContent: false
        }
    }, options);

    for (let c in Plugin) {
        if (c === 'install') {
            continue;
        }
        Vue.use(Plugin[c], options);
    }
};

export default Plugin;
