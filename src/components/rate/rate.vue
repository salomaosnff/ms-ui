<template>
<div :class="classes">
    <ms-icon 
        v-for="(n, i) in rates" 
        :key="i" @mouseover="onOver(i)" 
        @mouseout="onOut()" 
        @click="onClick(i)"
        :class="iconClass(n)" 
    >{{icon(n)}}</ms-icon>
    <span class="ms-rate__info" v-show="label && votes">{{info}}</span>
</div>
</template>

<script>
import Themeable from '../../mixins/themeable';

export default {
    mixins: [Themeable],

    props: {
        max: {
            type: Number,
            default: 5
        },
        value: [Number, String],
        average: Number,
        votes: Number,
        readonly: {
            type: Boolean,
            default: true
        },
        fill: {
            type: String,
            default: 'star'
        },
        half: {
            type: String,
            default: 'star-half'
        },
        empty: {
            type: String,
            default: 'star-outline'
        },
        emptyClass: String,
        halfClass: {
            type: String,
            default: 'amber-d3--text'
        },
        fillClass: {
            type: String,
            default: 'amber-d3--text'
        },
        vertical: Boolean,
        label: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            over: -1,
            current: this.average
        }
    },
    computed: {
        classes() {
            return {
                'ms-rate': true,
                'ms-rate--readonly': this.readonly,
                'ms-rate--vertical': this.vertical,
                'ms-rate--has-label': this.label && this.votes,
                'ms-theme--dark': this.dark,
                'ms-theme--light': this.light
            }
        },
        rate() {
            const round = i => (Math.round(i * 2) / 2).toFixed(1);
            let value = this.current;

            value = Math.max(0, this.current);
            value = Math.min(this.max, this.current);
            return round(value);
            
        },
        rates() {
            let rates = new Array(this.max).fill(null).map(i => 0);
            let value = this.rate;

            rates = rates.reduce((acc, rate, i) => {
                let type = 0;

                if(this.over >= 0) {
                    if(this.over >= i) {
                        type = 2;
                    }
                } else {
                    if(value >= 1) {
                        type = 2;
                    } else if(value >= 0.5) {
                        type = 1;
                    }
                    value--;
                }

                acc.push(type);
                return acc;
            }, []);

            return rates;
        },
        info() {
            const round = (num) => {
                let units = ['K', 'M', 'B'], decimal;

                for(var i=units.length-1; i>=0; i--) {
                    decimal = Math.pow(1000, i+1);

                    if(num <= -decimal || num >= decimal) {
                        return +(num / decimal).toFixed(2) + units[i];
                    }
                }
                return num;
            }


            return round(this.votes);
        }
    },
    methods: {
        onOver(index) {
            if(!this.readonly) {
                this.over = index;
            }
        },
        onOut() {
            this.over = -1;
        },
        onClick(index) {
            if(!this.readonly) {
                this.current = index + 1;
                this.$emit('input', this.rate);
                this.$emit('change', this.rate);
            }
        },
        icon(i) {
            return [this.empty, this.half, this.fill][i];
        },
        iconClass(i) {
            const classes = ['ms-rate__icon'];
            const types = [this.emptyClass, this.halfClass, this.fillClass];
            
            if(this.readonly) {
                classes.push(types[i]);
            }
            return classes;
        }
    }
}
</script>
