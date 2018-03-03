<template>
  <div class="overviewOfClassify">
    <highChartsComponent ref='highCharts' :options='options' :styles='styles'></highChartsComponent>
  </div>
</template>

<script>
  // 引入图表组件
  import highChartsComponent from '../../components/highCharts/highCharts.vue'
  import axios from 'axios'

  export default {
    props: {},
    components: {
      highChartsComponent
    },
    data() {
      return {
        styles: {
          width: 800,
          height: 600
        },
        options: {}
      }
    },
    created() {
      this.initOptions()
    },
    computed: {},
    methods: {
      initOptions() {
        axios({
          method: 'get',
          url: '/proxy/fullStack/overviewOfClassify'
        }).then((res) => {
          if (res.data.code === 0) {
            var arr = res.data.result;
            // 在这里对arr 进行类别去重
            var newArr = [
              {
                count: 1,
                category: '刘亦菲'
              }
            ]
            for (var i = 0; i < arr.length; i++) {
              var obj = {
                count: 1,
                category: arr[i].category
              }
              var flag = false;
              for (var k = 0; k < newArr.length; k++) {
                if (newArr[k].category.indexOf(obj.category) != -1) {
                  newArr[k].count++;
                  flag = true
                  break;
                }
              }
              if (!flag) {
                newArr.push(obj);
              }
            }
            // 在这里得到newArr
            newArr.shift();
            var nameArr = [];
            var valueArr = [];
            newArr.forEach((item, index) => {
              nameArr.push(item.category);
              valueArr.push(item.count)
            })
            console.log(nameArr);
            console.log(valueArr);
            this.options = {
              chart: {
                renderTo: 'highcharts-container',
                type: 'column',
                options3d: {
                  enabled: true,
                  alpha: 15,
                  beta: 15,
                  depth: 50,
                  viewDistance: 25
                }
              },
              title: {
                text: '书籍分类预览3D图'
              },
              xAxis: {
                categories: nameArr
              },
              subtitle: {
                text: '可通过滑动下方滑块观看不同的角度'
              },
              plotOptions: {
                column: {
                  depth: 25
                }
              },
              series: [{
                name: '书籍',
                data: valueArr
              }]
            };
            this.$refs.highCharts.initChart(this.options);
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "overviewOfClassify.css";
</style>
