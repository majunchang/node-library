<template>
  <div class="page-content">
    <input type="search" class='search-input' placeholder='请输入想要查询书籍的书名或者作者名' v-model='searchInput'
           v-on:keyup='searchBooks'>
    <Table border :columns="columns5" :data="data5"></Table>
    <Page :total="totalNum" show-elevator show-total :current='current' :page-size='pageSize'
          @on-change='changePageNum'></Page>
    <Modal v-model='updateModal'
           title="更新提示框"
           @on-ok="confirmUpdate"
           @on-cancel="cancelUpdate">
      <p>您确定要更新<<{{updateBookName}}>>这本书吗</p>
    </Modal>
    <Modal v-model='RemoveModal'
           @on-ok="confirmRemove"
           @on-cancel="cancelRemove" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <p>您确定要删除<<{{RemoveBookName}}>>这本书吗</p>
      <div slot="footer">
        <Button type="error" long :loading="modal_loading" @click="confirmRemove">删除</Button>
        <Button type="ghost" class='removeCancle' long :loading="modal_loading" @click="cancelRemove">取消</Button>
      </div>
    </Modal>
    <Modal v-model='borrowModal'
           title="借书提示框"
           @on-ok="confirmBorrow"
           @on-cancel="cancelBorrow">
      <!--在这里 使用vuex获取到当前登录用户-->
      <p>您确定要借<<{{borrowBookName}}>>这本书吗</p>
    </Modal>
  </div>
</template>
<script>

  // 引入扩展项
  import expandLo from '../../components/expandLo/expandLo.vue'
  import axios from 'axios';
  import {turntoDate} from '../../plugins/turnTime'

  export default {
    components: {expandLo},
    data() {
      return {
        columns5: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandLo, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '书名',
            key: 'bookName',
            sortable: true
          },
          {
            title: '作者名',
            key: 'authorName'
          },
          {
            title: '出版日期',
            key: 'date',
            sortable: true,
            filters: [
              {
                label: '大于25岁',
                value: 1
              },
              {
                label: '小于25岁',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row.age > 25;
              } else if (value === 2) {
                return row.age < 25;
              }
            }
          },
          {
            title: '出版社',
            key: 'publishHouse',
          },
          {
            title: '书籍分类',
            key: 'category',
            filters: [
              {
                label: '中国文学',
                value: '中国文学'
              },
              {
                label: '数理化学',
                value: '数理化学'
              },
              {
                label: '政治法律',
                value: '政治法律'
              },
              {
                label: '经典著作',
                value: '经典著作'
              },
              {
                label: '医药卫生',
                value: '医药卫生'
              },
              {
                label: '计算机技术',
                value: '计算机技术'
              },
              {
                label: '财经管理',
                value: '财经管理'
              },
            ],
            filterMethod(value, row) {
              return row.category.indexOf(value) > -1;
            }
          },
          {
            title: '剩余数量',
            key: 'bookCount'
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
                      this.borrow(params.index)
                    }
                  }
                }, '借书'),
              ])
            }
          },
          {
            title: '管理员操作',
            key: 'AdminAction',
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
                      this.show(params.index)
                    }
                  }
                }, '更新'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data5: [],
        current: 1,
        pageSize: 8,
        updateModal: false,
        updateBookName: '',
        modal_loading: false,
        totalNum: 0,
        updateId: 0,
        RemoveModal: false,
        RemoveBookName: '',
        page: 1,
        // 借书弹框的一些数据
        borrowModal: false,
        borrowId: 0,
        borrowBookName: '',
        borrowBookCount: 0,
        // 智能查询
        searchInput: ''
      }
    },
    computed: {},
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
        this.RemoveBookName = this.data5[index].bookName;
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
      getAllBooks(pageObj) {
        //  在这里发送请求
        axios({
          url: `/proxy/${this.$url}/getAllBook`,
          method: 'get',
          params: pageObj,
        }).then((res) => {
          if (res.data.code === 0) {
            var arr = res.data.result;
            /*
              在这里做一下限制  比如说删除的时候 导致本页数据出现空数组的情况
              或者说 total直接为0的情况
               */
            if (res.data.totalCount == 0) {
              this.data5 = [];
              this.totalNum = 0;
            }
            if (arr.length == 0) {
              var obj = {
                page: --this.page,
                pageSize: this.pageSize,
              }
              this.getAllBooks(obj);
              return;
            }

            arr.forEach((item, index) => {
              item.date = turntoDate(new Date(item.date).getTime());
            })
            this.data5 = res.data.result;
            this.arr = this.data5.slice();
            this.totalNum = res.data.totalNum;
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

      },
      searchBooks: function () {
        var newArr = []
        for (var i = 0; i < this.arr.length; i++) {
          if (this.arr[i].bookName.indexOf(this.searchInput) != -1 || this.arr[i].authorName.indexOf(this.searchInput) != -1) {
            newArr.push(this.arr[i]);
          }
        }
        this.data5 = newArr;
      }
    }
  }
</script>

<style scoped>
  @import "libraryOverView.css";
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
