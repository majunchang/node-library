<template>
    <div class="page-content">
        <Table border :columns="columns5" :data="data5"></Table>
        <Page :total="totalNum" show-elevator show-total :current='current' :page-size='pageSize' @on-change='changePageNum'></Page>
        <Modal v-model='ReturnModal' width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>还书确认</span>
            </p>
            <p>{{userName}}同学，你确定要归还
                <<{{ReturnBookName}}>>这本书吗</p>
            <div slot="footer">
                <Button type="success" long :loading="modal_loading" @click="confirmReturn">确定</Button>
                <Button type="warning" class='removeCancle' long :loading="modal_loading" @click="cancelReturn">取消</Button>
            </div>
        </Modal>
        <!-- 续借弹框 -->
        <Modal v-model='RenewModal' width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>还书确认</span>
            </p>
            <p>{{userName}}同学，你确定要续借
                <<{{RenewBookName}}>>这本书吗</p>
            <div slot="footer">
                <Button type="success" long :loading="modal_loading" @click="confirmRenew">确定</Button>
                <Button type="warning" class='removeCancle' long :loading="modal_loading" @click="cancelRenew">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
// 引入扩展项
import axios from 'axios'
import { turntoDate } from '../../plugins/turnTime'
import { mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
      columns5: [{
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
                  this.returnM(params.index)
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
                  this.renewLendM(params.index)
                }
              }
            }, '续借')
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
      totalNum: 9,
      page: 1,
      // 还书弹框的一些数据
      ReturnModal: false,
      ReturnBookName: '',
      returnId: '',
      userName: this.$store.state.user,
      // 续借弹框的一些数据
      RenewModal: false,
      RenewBookName: '',
      RenewId: ''
    }
  },
  computed: {},
  mounted () {
    this.initTable()
    if (!this.userName) {
      this.userName = window.localStorage.getItem('user')
    }
    var pageObj = {
      page: this.current,
      pageSize: this.pageSize,
      user: this.userName
    }
    if (this.userName === 'manager') {
      this.getManagerLendBook(pageObj)
    } else {
      this.getAllBooks(pageObj)
    }
  },
  methods: {
    initTable () {
      //        this.columns5.forEach((item,index)=>{
      //            if(item.title==='操作'){
      //              this.columns5.splice(index,1);
      //            }
      //        })
    },
    getAllBooks (pageObj) {
      //  在这里发送请求
      axios({
        url: `/proxy/${this.$url}/lendBackList`,
        method: 'get',
        params: pageObj
      }).then((res) => {
        if (res.data.code === 0) {
          var arr = res.data.result
          if (res.data.totalCount == 0) {
            this.data5 = []
            this.totalNum = 0
          }
          if (arr.length == 0) {
            var obj = {
              page: --this.page,
              pageSize: this.pageSize
            }
            if (obj.page >= 1) {
              this.getAllBooks(obj)
            }
            return
          }

          arr.forEach((item, index) => {
            item.lendDate = turntoDate(new Date(item.lendDate).getTime())
            item.ShouldReturnDate = turntoDate(new Date(item.ShouldReturnDate).getTime())
          })
          this.data5 = arr
          this.totalNum = res.data.totalCount
        }
      })
    },
    getManagerLendBook (pageObj) {
      // 用不到user  对象中 删除这个key值

      axios({
        url: `/proxy/${this.$url}/ManagerlendBackList`,
        method: 'get',
        params: pageObj
      }).then((res) => {
        if (res.data.code === 0) {
          var arr = res.data.result
          if (res.data.totalCount == 0) {
            this.data5 = []
            this.totalNum = 0
          }
          if (arr.length == 0) {
            var obj = {
              page: --this.page,
              pageSize: this.pageSize
            }
            if (obj.page >= 1) {
              this.getAllBooks(obj)
            }
            return
          }
          arr.forEach((item, index) => {
            item.lendDate = turntoDate(new Date(item.lendDate).getTime())
            item.ShouldReturnDate = turntoDate(new Date(item.ShouldReturnDate).getTime())
          })
          this.data5 = arr
          this.totalNum = res.data.totalCount
        }
      })
    },
    changePageNum (page) {
      // 改变页码的时候 重新进行变换
      this.page = page
      var pageObj = {
        page: page,
        pageSize: this.pageSize,
        user: this.userName
      }
      if (this.userName === 'manager') {
        this.getManagerLendBook(pageObj)
      } else {
        this.getAllBooks(pageObj)
      }
    },
    returnM (index) {
      this.ReturnModal = true
      this.ReturnBookName = this.data5[index].bookName
      this.returnId = this.data5[index]._id
    },
    confirmReturn () {
      // 发送删除请求
      var removeObj = {
        id: this.returnId,
        bookName: this.ReturnBookName
      }
      axios({
        url: `/proxy/${this.$url}/returnLendBook`,
        method: 'get',
        params: removeObj
      }).then((res) => {
        if (res.data.code === 0) {
          this.ReturnModal = false
          this.$SwalModal.MaModal('还书成功')
          var pageObj = {
            page: this.current,
            pageSize: this.pageSize,
            user: this.userName
          }
          if (this.userName === 'manager') {
            this.getManagerLendBook(pageObj)
          } else {
            this.getAllBooks(pageObj)
          }
        }
      })
    },
    cancelReturn () {
      this.ReturnModal = false
    },
    renewLendM (index) {
      this.RenewModal = true
      this.RenewBookName = this.data5[index].bookName
      this.RenewId = this.data5[index]._id
    },
    confirmRenew () {
      // 重新计算一下 借书时间和还书时间
      var now = new Date()
      var now1 = new Date()
      var startTime = this.handleDate('d ', 0, now)
      var cutoffTime = this.handleDate('m ', 2, now1)
      // 以id作为标识就可以了
      var renewobj = {
        id: this.RenewId,
        startTime: startTime,
        cutoffTime: cutoffTime
      }
      axios({
        url: `/proxy/${this.$url}/renewLendBook`,
        method: 'get',
        params: renewobj
      }).then((res) => {
        if (res.data.code === 0) {
          this.RenewModal = false
          this.$SwalModal.MaModal('续借成功')
          // 调用一下 获取借书的接口
          var pageObj = {
            page: this.current,
            pageSize: this.pageSize,
            user: this.userName
          }
          if (this.userName === 'manager') {
            this.getManagerLendBook(pageObj)
          } else {
            this.getAllBooks(pageObj)
          }
        }
      })
    },
    cancelRenew () {
      this.RenewModal = false
    },
    handleDate (interval, number, date) {
      switch (interval) {
        case 'y ':
        {
          date.setFullYear(date.getFullYear() + number)
          return date
          break
        }
        case 'q ':
        {
          date.setMonth(date.getMonth() + number * 3)
          return date
          break
        }
        case 'm ':
        {
          date.setMonth(date.getMonth() + number)
          return date
          break
        }
        case 'w ':
        {
          date.setDate(date.getDate() + number * 7)
          return date
          break
        }
        case 'd ':
        {
          date.setDate(date.getDate() + number)
          return date
          break
        }
        case 'h ':
        {
          date.setHours(date.getHours() + number)
          return date
          break
        }
        case 'm ':
        {
          date.setMinutes(date.getMinutes() + number)
          return date
          break
        }
        case 's ':
        {
          date.setSeconds(date.getSeconds() + number)
          return date
          break
        }
        default:
        {
          date.setDate(date.getDate() + number)
          return date
          break
        }
      }
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
