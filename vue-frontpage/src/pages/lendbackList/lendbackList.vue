<template>
  <div class="page-content">
    <Table border :columns="columns5" :data="data5"></Table>
    <Page :total="totalNum" show-elevator show-total :current='current' :page-size='pageSize'
          @on-change='changePageNum'></Page>
  </div>
</template>
<script>

  // 引入扩展项
  import axios from 'axios';
  import {turntoDate} from '../../plugins/turnTime'

  export default {
    components: {},
    data() {
      return {
        columns5: [
          {
            title: '书名',
            key: 'bookName',
            sortable: true
          },
          {
            title: '借阅者姓名',
            key: 'userName'
          },
          {
            title: '借书日期',
            key: 'lendDate'
          },
          {
            title: '最迟还书日期',
            key: 'ShouldReturnDate'
          },
          {
            title: '书籍定价',
            key: 'bookPrice'
          }, {
            title: '续借次数',
            key: 'reNewTimes'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '还书'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '续借')
              ])
            }
          },
        ],
        data5: [],
        current: 1,
        pageSize: 3,
        updateModal: false,
        updateBookName: '',
        modal_loading: false,
        totalNum: 9,
        page: 1,
      }
    },
    mounted() {
      this.initTable();
      var pageObj = {
        page: this.current,
        pageSize: this.pageSize,
      }
      this.getAllBooks(pageObj);
    },
    methods: {
      initTable() {
//        this.columns5.forEach((item,index)=>{
//            if(item.title==='操作'){
//              this.columns5.splice(index,1);
//            }
//        })
      },
      getAllBooks(pageObj) {
        //  在这里发送请求
        axios({
          url: `/proxy/${this.$url}/lendBackList`,
          method: 'get',
          params: pageObj,
        }).then((res) => {
          if(res.data.code === 0){
            var arr = res.data.result
            if(res.data.totalCount == 0){
              this.data5 = [];
              this.totalNum = 0;
            }
            if(arr.length == 0){
              var obj = {
                page: --this.page,
                pageSize: this.pageSize,
              }
              this.getAllBooks(obj);
              return
            }

            arr.forEach((item,index)=>{
              item.lendDate = turntoDate(new Date(item.lendDate).getTime())
              item.ShouldReturnDate = turntoDate(new Date(item.ShouldReturnDate).getTime())
            })
            this.data5 = arr;
            this.totalNum = res.data.totalCount;
          }
        })
      },
      changePageNum(page) {
        // 改变页码的时候 重新进行变换
        this.page = page;
        var pageObj = {
          page: page,
          pageSize: this.pageSize,
        }
        this.getAllBooks(pageObj);
      },

      show(index) {
        this.updateModal = true;
//        console.log(this.data5[index]);
//        console.log(this.data5[index]._id);
        this.updateId = this.data5[index]._id
        this.updateBookName = this.data5[index].bookName
//        this.$Modal.info({
//          title: '书籍信息',
//          content: `书名：${this.data5[index].bookName}<br>作者：${this.data5[index].authorName}<br>出版社：${this.data5[index].publishHouse}`
//        })
      },
      borrow(index) {
        this.borrowModal = true;
        this.borrowId = this.data5[index]._id
        this.borrowBookName = this.data5[index].bookName
        this.borrowBookCount = this.data5[index].bookCount
      },
      remove(index) {
        this.RemoveModal = true;
        this.removeId = this.data5[index]._id;
//        this.data5.splice(index, 1);
      },
      confirmRemove() {
        // 发送删除请求
        var removeObj = {
          id: this.removeId
        }
        axios({
          url: `/proxy/${this.$url}/removeBook`,
          method: 'get',
          params: removeObj,
        }).then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.RemoveModal = false;
            this.$SwalModal.MaModal('删除书籍成功')
            var pageObj = {
              page: this.page,
              pageSize: this.pageSize,
            }
            this.getAllBooks(pageObj);
          }
        })
      },
      cancelRemove() {
        this.RemoveModal = false;
      },
      confirmUpdate() {
        // 在这里发送更新请求
        this.$router.push({
          name: 'updateBook',
          params: {id: this.updateId}
        })
      },
      cancelUpdate() {

      },
      confirmBorrow() {
        if (this.borrowBookCount < 1) {
          this.$SwalModal.MaModal('借书成功', 'error')
        }
        this.$router.push({
          name: 'lendBook',
          params: {id: this.borrowId}
        })
      },
      cancelBorrow() {

      }
    }
  }
</script>

<style scoped>
  @import "lendbackList.css";
</style>


<!-- {
            authorName: '王小明',
            priceNum: 18,
            bookCount: 18,
            publishHouse: '北京市朝阳区芍药居',
            job: '数据工程师',
            interest: '羽毛球',
            date: '1991-05-14',
            bookName: '乔布斯传',
            movie: '致命魔术',
            desc: 'I Cry',
            category: '经典著作'
          },
          {
            authorName: '张小刚',
            priceNum: 25,
            bookCount: 25,
            publishHouse: '北京市海淀区西二旗',
            job: '数据科学家',
            interest: '排球',
            date: '1989-03-18',
            bookName: '我的奋斗',
            desc: '罗马假日',
            music: 'My Heart Will Go On',
            category: '经典著作'
          },
          {
            authorName: '李小红',
            priceNum: 30,
            bookCount: 30,
            publishHouse: '上海市浦东新区世纪大道',
            job: '数据产品经理',
            interest: '网球',
            date: '1992-01-31',
            bookName: '赢',
            desc: '乔布斯',
            music: 'Don’t Cry',
            category: '经典著作'
          },
          {
            authorName: '周小伟',
            priceNum: 26,
            bookCount: 26,
            publishHouse: '深圳市南山区深南大道',
            job: '数据分析师',
            interest: '桌球，跑步',
            date: '1988-7-25',
            bookName: '红楼梦',
            desc: '倩女幽魂',
            music: '演员',
            category: '经典著作'
          }-->
