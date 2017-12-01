<template>

</template>

<script>
  import Highcharts from 'highcharts/highstock';
  import HighchartsMore from 'highcharts/highcharts-more';
  import HighchartsDrilldown from 'highcharts/modules/drilldown';
  import Highcharts3D from 'highcharts/highcharts-3d';
  import Highmaps from 'highcharts/modules/map';

  HighchartsMore(Highcharts)
  HighchartsDrilldown(Highcharts);
  Highcharts3D(Highcharts);
  Highmaps(Highcharts);

    export default {
        props: {},
        components: {},
        data() {
            return {}
        },
        created() {

        },
        computed: {},
        methods: {}
    }
</script>

<style>

</style>
