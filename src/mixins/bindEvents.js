export default {
    mounted(){
        for(let m in this.$el){
            if(!m.startsWith("on")) continue;
            const eventName = m.substr(2);
            this.$el.addEventListener(eventName, e => this.$emit(eventName, e));
        }
    }
}