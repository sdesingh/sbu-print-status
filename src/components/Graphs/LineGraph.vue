<script>
    
    import { Line, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins

    export default {
        extends: Line,
        mixins: [reactiveProp],
        props: ['options'],
        mounted(){
            // Render the chart using the passed in data/options.
            this.renderChart(this.chartData, this.options)
        }
    }
</script>