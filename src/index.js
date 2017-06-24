// Directives
import Media from './directives/media';
import Ripple from './directives/ripple';

// Components
import Grid from './components/grid/';
import Container from './components/container/';
import Icon from './components/icon/';
import Button from './components/button/';
import Form from './components/form/'

const Plugin = {
    // Directives
    Media,
    Ripple,

    // Components
    Grid,
    Container,
    Icon,
    Button,
    Form
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
