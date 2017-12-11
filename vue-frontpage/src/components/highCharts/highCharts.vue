<template>
  <div class="highCharts-box">
    <div class="highcharts-container" id='highcharts-container'></div>
    <div id="sliders">
      <table>
        <tr>
          <td>α 角（内旋转角）</td>
          <td><input id="alpha" type="range" min="0" max="45" value="15"/> <span id="alpha-value" class="value"></span>
          </td>
        </tr>
        <tr>
          <td>β 角（外旋转角）</td>
          <td><input id="beta" type="range" min="-45" max="45" value="15"/> <span id="beta-value" class="value"></span>
          </td>
        </tr>
        <tr>
          <td>深度</td>
          <td><input id="depth" type="range" min="20" max="100" value="50"/> <span id="depth-value" class="value"></span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts/highstock';
  import HighchartsMore from 'highcharts/highcharts-more';
  import HighchartsDrilldown from 'highcharts/modules/drilldown';
  import Highcharts3D from 'highcharts/highcharts-3d';

  HighchartsMore(Highcharts)
  HighchartsDrilldown(Highcharts);
  Highcharts3D(Highcharts);

  export default {
    props: ['styles'],
    name: 'highcharts',
    data() {
      return {
        chart: null
      }
    },
    mounted() {
//      this.initChart();
    },
    methods: {
      initChart(options) {
//
        this.options = options;
        this.highchartsContainer = document.getElementById('highcharts-container')
        this.highchartsContainer.style.width = (this.styles.width || 800) + 'px';
        this.highchartsContainer.style.height = (this.styles.height || 600) + 'px';
        this.chart = new Highcharts.Chart(this.options);

        var _this = this;
        function showValues() {
          $('#alpha-value').html(_this.options.chart.options3d.alpha);
          $('#beta-value').html(_this.options.chart.options3d.beta);
          $('#depth-value').html(_this.options.chart.options3d.depth);
        }

        // Activate the sliders
        $('#sliders input').on('input change', function(){
          _this.chart.options.chart.options3d[this.id] = this.value;
          showValues();
          _this.chart.redraw(false);
        });
        showValues();
      }
    }
  }
</script>

<style>
  .highCharts-box{
    margin: 0 auto;
  }
  .highcharts-container {
    width: 800px;
    height: 600px;
    margin: 0 auto;
  }

</style>
