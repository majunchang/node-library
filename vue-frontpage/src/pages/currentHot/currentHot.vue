<template>
  <div class="currentHot">
    <h1 class="currentHot-title"> 当前热门书籍 </h1>
    <div class="main" id='main'>

    </div>

    <div id="starMap" class='starMap'>

    </div>
  </div>
</template>

<script>
  var echarts = require('echarts');
  import axios from 'axios'

  export default {
    props: {},
    components: {},
    data() {
      return {
        echarts: {},
        starEcharts:{}
      }
    },
    created() {

    },
    mounted() {
      var Myecharts = echarts.init(document.getElementById('main'));
      var starEcharts = echarts.init(document.getElementById('starMap'));
      Myecharts.showLoading();
      starEcharts.showLoading();
      this.echarts = Myecharts;
      this.starEcharts = starEcharts;
      this.getCurrentBooks();
      // 获取当前分类的那个
    },
    computed: {},
    methods: {
      getCurrentBooks() {
        axios({
          method: 'get',
          url: '/proxy/fullStack/getCurrentHot',
        }).then((res) => {

          /*
            将获取到的数组 先进行去重  然后筛选出前8位
           */
          var arr = res.data.result;
          var newArr = [{
            bookName: '无所谓'
          }];
          for (var i = 0; i < arr.length; i++) {
            var obj = {
              bookName: arr[i].bookName,
              count: 1,
              category:arr[i].category
            }
            var flag = false
            for (let k = 0; k < newArr.length; k++) {
              if (newArr[k].bookName.indexOf(obj.bookName) != -1) {
                newArr[k].count++;
                flag = true
                break
              }
            }
            if (!flag) {
              newArr.push(obj);
            }
          }
          this.fillingEcharts(newArr)
          this.drawStarEcharts(newArr)
        })
      },
      fillingEcharts(newArr) {

        newArr.shift();
        // 对数组进行一下排序  选出前五名
        newArr.sort((b, a) => {
          return a.count - b.count;
        })
        console.log(newArr);
//        newArr = newArr.slice(0,5);
        var nameArr = [];
        var dataArr = [];
        var total = 0;
        newArr.forEach((item, index) => {
          if (index < 5) {
            nameArr.unshift(item.bookName)
            dataArr.unshift(item.count);
          }
          total += item.count
        })
        nameArr.push('借书总数(本)');
        dataArr.push(total);
        var option = {
          title: {
            text: '当前热门书籍',
            subtext: '数据来自统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['2017年']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: nameArr
          },
          series: [
            {
              name: '2017年',
              type: 'bar',
              data: dataArr
            }
          ]
        };

        this.echarts.hideLoading();
        this.echarts.setOption(option);
      },
      drawStarEcharts(arr){
        option = {
          title: {
            text: '基础雷达图'
          },
          tooltip: {},
          legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
          },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '销售（sales）', max: 6500},
              { name: '管理（Administration）', max: 16000},
              { name: '信息技术（Information Techology）', max: 30000},
              { name: '客服（Customer Support）', max: 38000},
              { name: '研发（Development）', max: 52000},
              { name: '市场（Marketing）', max: 25000}
            ]
          },
          series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
              {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际开销（Actual Spending）'
              }
            ]
          }]
        };
      }
    }
  }
</script>

<style scoped>

  @import "currentHot.css";
</style>
