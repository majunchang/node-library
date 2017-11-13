<template>
  <div class="page-md page-header-fixed page-sidebar-closed-hide-logo page-sidebar-closed-hide-logo">
    <div class="page-header md-shadow-z-1-i navbar navbar-fixed-top">
      <!-- BEGIN HEADER INNER -->
      <div class="page-header-inner">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
          <span class='index-title'>图书馆</span>
          <div class="menu-toggler sidebar-toggler">
          </div>
        </div>
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse"
           data-target=".navbar-collapse">
        </a>
        <div class="page-actions">
          <div class="btn-group">
            <button type="button" class="btn red-haze btn-sm dropdown-toggle" data-toggle="dropdown"
                    data-hover="dropdown" data-close-others="true">
              <span class="hidden-sm hidden-xs">Actions&nbsp;</span><i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li>
                <a href="javascript:;">
                  <i class="icon-docs"></i> New Post </a>
              </li>
              <li>
                <a href="javascript:;">
                  <i class="icon-tag"></i> New Comment </a>
              </li>
              <li>
                <a href="javascript:;">
                  <i class="icon-share"></i> Share </a>
              </li>
              <li class="divider">
              </li>
              <li>
                <a href="javascript:;">
                  <i class="icon-flag"></i> Comments <span class="badge badge-success">4</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <i class="icon-users"></i> Feedbacks <span class="badge badge-danger">2</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- END PAGE ACTIONS -->
        <!-- BEGIN PAGE TOP -->
        <div class="page-top">
          <!-- BEGIN HEADER SEARCH BOX -->
          <!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->
          <form class="search-form" action="extra_search.html" method="GET">
            <div class="input-group">
              <input type="text" class="form-control input-sm" placeholder="Search..." name="query">
              <span class="input-group-btn">
					<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
					</span>
            </div>
          </form>
          <!-- END HEADER SEARCH BOX -->
          <!-- BEGIN TOP NAVIGATION MENU -->
          <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
              <li class="separator hide">
              </li>
              <!-- BEGIN NOTIFICATION DROPDOWN -->
              <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
              <li class="dropdown dropdown-extended dropdown-notification dropdown-dark" id="header_notification_bar">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                   data-close-others="true">
                  <i class="icon-bell"></i>
                  <span class="badge badge-success">
						7 </span>
                </a>
                <ul class="dropdown-menu">
                  <li class="external">
                    <h3><span class="bold">12 pending</span> notifications</h3>
                    <a href="extra_profile.html">view all</a>
                  </li>
                  <li>
                    <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
                      <li>
                        <a href="javascript:;">
                          <span class="time">just now</span>
                          <span class="details">
										<span class="label label-sm label-icon label-success">
										<i class="fa fa-plus"></i>
										</span>
										New user registered. </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="time">3 mins</span>
                          <span class="details">
										<span class="label label-sm label-icon label-danger">
										<i class="fa fa-bolt"></i>
										</span>
										Server #12 overloaded. </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="time">10 mins</span>
                          <span class="details">
										<span class="label label-sm label-icon label-warning">
										<i class="fa fa-bell-o"></i>
										</span>
										Server #2 not responding. </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="time">14 hrs</span>
                          <span class="details">
										<span class="label label-sm label-icon label-info">
										<i class="fa fa-bullhorn"></i>
										</span>
										Application error. </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="time">2 days</span>
                          <span class="details">
										<span class="label label-sm label-icon label-danger">
										<i class="fa fa-bolt"></i>
										</span>
										Database overloaded 68%. </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="time">3 days</span>
                          <span class="details">
										<span class="label label-sm label-icon label-danger">
										<i class="fa fa-bolt"></i>
										</span>
										A user IP blocked. </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="time">4 days</span>
                          <span class="details">
										<span class="label label-sm label-icon label-warning">
										<i class="fa fa-bell-o"></i>
										</span>
										Storage Server #4 not responding dfdfdfd. </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="time">5 days</span>
                          <span class="details">
										<span class="label label-sm label-icon label-info">
										<i class="fa fa-bullhorn"></i>
										</span>
										System Error. </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          <span class="time">9 days</span>
                          <span class="details">
										<span class="label label-sm label-icon label-danger">
										<i class="fa fa-bolt"></i>
										</span>
										Storage server failed. </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <!-- END NOTIFICATION DROPDOWN -->
              <li class="separator hide">
              </li>
              <!-- BEGIN INBOX DROPDOWN -->
              <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
              <li class="dropdown dropdown-extended dropdown-inbox dropdown-dark" id="header_inbox_bar">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                   data-close-others="true">
                  <i class="icon-envelope-open"></i>
                  <span class="badge badge-danger">
						4 </span>
                </a>
                <ul class="dropdown-menu">
                  <li class="external">
                    <h3>You have <span class="bold">7 New</span> Messages</h3>
                    <a href="inbox.html">view all</a>
                  </li>
                  <li>
                    <ul class="dropdown-menu-list scroller" style="height: 275px;" data-handle-color="#637283">
                      <li>
                        <a href="inbox.html?a=view">
										<span class="photo">
										<img src="/static/assets/admin/layout3/img/avatar2.jpg" class="img-circle" alt="">
										</span>
                          <span class="subject">
										<span class="from">
										Lisa Wong </span>
										<span class="time">Just Now </span>
										</span>
                          <span class="message">
										Vivamus sed auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                        </a>
                      </li>
                      <li>
                        <a href="inbox.html?a=view">
										<span class="photo">
										<img src="/static/assets/admin/layout3/img/avatar3.jpg" class="img-circle" alt="">
										</span>
                          <span class="subject">
										<span class="from">
										Richard Doe </span>
										<span class="time">16 mins </span>
										</span>
                          <span class="message">
										Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                        </a>
                      </li>
                      <li>
                        <a href="inbox.html?a=view">
										<span class="photo">
										<img src="/static/assets/admin/layout3/img/avatar1.jpg" class="img-circle" alt="">
										</span>
                          <span class="subject">
										<span class="from">
										Bob Nilson </span>
										<span class="time">2 hrs </span>
										</span>
                          <span class="message">
										Vivamus sed nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                        </a>
                      </li>
                      <li>
                        <a href="inbox.html?a=view">
										<span class="photo">
										<img src="/static/assets/admin/layout3/img/avatar2.jpg" class="img-circle" alt="">
										</span>
                          <span class="subject">
										<span class="from">
										Lisa Wong </span>
										<span class="time">40 mins </span>
										</span>
                          <span class="message">
										Vivamus sed auctor 40% nibh congue nibh... </span>
                        </a>
                      </li>
                      <li>
                        <a href="inbox.html?a=view">
										<span class="photo">
										<img src="/static/assets/admin/layout3/img/avatar3.jpg" class="img-circle" alt="">
										</span>
                          <span class="subject">
										<span class="from">
										Richard Doe </span>
										<span class="time">46 mins </span>
										</span>
                          <span class="message">
										Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <!-- END INBOX DROPDOWN -->
              <li class="separator hide">
              </li>
              <!-- BEGIN TODO DROPDOWN -->
              <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
              <li class="dropdown dropdown-extended dropdown-tasks dropdown-dark" id="header_task_bar">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                   data-close-others="true">
                  <i class="icon-calendar"></i>
                  <span class="badge badge-primary">
						3 </span>
                </a>
                <ul class="dropdown-menu extended tasks">
                  <li class="external">
                    <h3>You have <span class="bold">12 pending</span> tasks</h3>
                    <a href="page_todo.html">view all</a>
                  </li>
                  <li>
                    <ul class="dropdown-menu-list scroller" style="height: 275px;" data-handle-color="#637283">
                      <li>
                        <a href="javascript:;">
										<span class="task">
										<span class="desc">New release v1.2 </span>
										<span class="percent">30%</span>
										</span>
                          <span class="progress">
										<span style="width: 40%;" class="progress-bar progress-bar-success" aria-valuenow="40"
                          aria-valuemin="0" aria-valuemax="100"><span class="sr-only">40% Complete</span></span>
										</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
										<span class="task">
										<span class="desc">Application deployment</span>
										<span class="percent">65%</span>
										</span>
                          <span class="progress">
										<span style="width: 65%;" class="progress-bar progress-bar-danger" aria-valuenow="65"
                          aria-valuemin="0" aria-valuemax="100"><span class="sr-only">65% Complete</span></span>
										</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
										<span class="task">
										<span class="desc">Mobile app release</span>
										<span class="percent">98%</span>
										</span>
                          <span class="progress">
										<span style="width: 98%;" class="progress-bar progress-bar-success" aria-valuenow="98"
                          aria-valuemin="0" aria-valuemax="100"><span class="sr-only">98% Complete</span></span>
										</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
										<span class="task">
										<span class="desc">Database migration</span>
										<span class="percent">10%</span>
										</span>
                          <span class="progress">
										<span style="width: 10%;" class="progress-bar progress-bar-warning" aria-valuenow="10"
                          aria-valuemin="0" aria-valuemax="100"><span class="sr-only">10% Complete</span></span>
										</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
										<span class="task">
										<span class="desc">Web server upgrade</span>
										<span class="percent">58%</span>
										</span>
                          <span class="progress">
										<span style="width: 58%;" class="progress-bar progress-bar-info" aria-valuenow="58"
                          aria-valuemin="0" aria-valuemax="100"><span class="sr-only">58% Complete</span></span>
										</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
										<span class="task">
										<span class="desc">Mobile development</span>
										<span class="percent">85%</span>
										</span>
                          <span class="progress">
										<span style="width: 85%;" class="progress-bar progress-bar-success" aria-valuenow="85"
                          aria-valuemin="0" aria-valuemax="100"><span class="sr-only">85% Complete</span></span>
										</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;">
										<span class="task">
										<span class="desc">New UI release</span>
										<span class="percent">38%</span>
										</span>
                          <span class="progress progress-striped">
										<span style="width: 38%;" class="progress-bar progress-bar-important" aria-valuenow="18"
                          aria-valuemin="0" aria-valuemax="100"><span class="sr-only">38% Complete</span></span>
										</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <!-- END TODO DROPDOWN -->
              <!-- BEGIN USER LOGIN DROPDOWN -->
              <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
              <li class="dropdown dropdown-user dropdown-dark">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                   data-close-others="true">
						<span class="username username-hide-on-mobile">
						Nick </span>
                  <!-- DOC: Do not remove below empty space(&nbsp;) as its purposely used -->
                  <img alt="" class="img-circle" src="/static/assets/admin/layout4/img/avatar9.jpg"/>
                </a>
                <ul class="dropdown-menu dropdown-menu-default">
                  <li>
                    <a href="extra_profile.html">
                      <i class="icon-user"></i> My Profile </a>
                  </li>
                  <li>
                    <a href="page_calendar.html">
                      <i class="icon-calendar"></i> My Calendar </a>
                  </li>
                  <li>
                    <a href="inbox.html">
                      <i class="icon-envelope-open"></i> My Inbox <span class="badge badge-danger">
								3 </span>
                    </a>
                  </li>
                  <li>
                    <a href="page_todo.html">
                      <i class="icon-rocket"></i> My Tasks <span class="badge badge-success">
								7 </span>
                    </a>
                  </li>
                  <li class="divider">
                  </li>
                  <li>
                    <a href="extra_lock.html">
                      <i class="icon-lock"></i> Lock Screen </a>
                  </li>
                  <li @click='goLogout'>
                    <a href="javascript:;">
                      <i class="icon-key"></i> Log Out </a>
                  </li>
                </ul>
              </li>
              <!-- END USER LOGIN DROPDOWN -->
            </ul>
          </div>
          <!-- END TOP NAVIGATION MENU -->
        </div>
        <!-- END PAGE TOP -->
      </div>
      <!-- END HEADER INNER -->
    </div>
    <!-- END HEADER -->
    <div class="clearfix">
    </div>
    <!-- BEGIN CONTAINER -->
    <div class="page-container">
      <!-- BEGIN SIDEBAR -->
      <div class="page-sidebar-wrapper">
        <div class="page-sidebar md-shadow-z-2-i  navbar-collapse collapse">
          <ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
            <li class="start active " @click='goIndex'>
              <a href="javascript:;" >
                <i class="icon-home"></i>
                <span class="title">主页</span>
              </a>
            </li>
            <li @click='goAddBook'>
              <a href="javascript:;">
                <i class="fa fa-book" aria-hidden="true"></i>
                <span class="title addBook">添加书籍</span>
              </a>
            </li>
            <li @click='golengbackList'>
              <a href="javascript:;">
                <i class="fa fa-book" aria-hidden="true"></i>
                <span class="title addBook">还书总览</span>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i class="icon-basket"></i>
                <span class="title">图书馆主要功能</span>
                <span class="arrow "></span>
              </a>
              <ul class="sub-menu">
                <li @click='libraryOverView'>
                  <a href="javascript:;">
                    <i class="icon-home"></i>
                    藏书总览</a>
                </li>
                <li>
                  <a href="ecommerce_orders.html">
                    <i class="icon-basket"></i>
                    分类总览</a>
                </li>
                <li @click='goAddBook'>
                  <a href="javascript:;">
                    <i class="icon-tag"></i>
                    添加新书籍</a>
                </li>
                <!--<li>-->
                <!--<a href="ecommerce_products.html">-->
                <!--<i class="icon-handbag"></i>-->
                <!---->
                <!--</a>-->
                <!--</li>-->
                <!--<li>-->
                <!--<a href="ecommerce_products_edit.html">-->
                <!--<i class="icon-pencil"></i>-->
                <!--Product Edit</a>-->
                <!--</li>-->
              </ul>
            </li>
            <li>
              <a href="javascript:;">
                <i class="icon-settings"></i>
                <span class="title">查询功能</span>
                <span class="arrow "></span>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:;">
                    全局模糊查询</a>
                </li>
                <li>
                  <a href="javascript:;">
                    按照书名精准查询</a>
                </li>
                <li>
                  <a href="javascript:;">
                    按照作者精准查询</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;">
                <i class="icon-bar-chart"></i>
                <span class="title">数据可视化</span>
                <span class="arrow "></span>
              </a>
              <ul class="sub-menu">
                <li>
                  <a href="javascript:;">
                    当前热门书籍</a>
                </li>
                <li>
                  <a href="javascript:;">
                    图书总览</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;">
                <i class="icon-user"></i>
                <span class="title">用户个人信息设置</span>
                <span class="arrow "></span>
              </a>
              <ul class="sub-menu">
                <li>
                  <span>个人设置</span>
                </li>
              </ul>
            </li>
          </ul>
          <!-- END SIDEBAR MENU -->
        </div>
      </div>
      <div class="page-content-wrapper">
        <router-view></router-view>
        <!--<div >-->
        <!---->
        <!--&lt;!&ndash;在这里插入轮播图组件 &ndash;&gt;-->
        <!--</div>-->
      </div>
      <!-- END CONTENT -->
    </div>

    <div class="page-footer">
      <div class="scroll-to-top">
        <i class="icon-arrow-up"></i>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {},
    components: {},
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      jQuery(document).ready(function() {
        Metronic.init(); // init metronic core componets
        Layout.init(); // init layout
        Demo.init(); // init demo features
//      Index.init(); // init index page
        Tasks.initDashboardWidget(); // init tash dashboard widget
      });
    },
    computed: {},
    methods: {
      goIndex() {
        this.$router.push({
          path: '/index',
          name: 'dashboard'
        })
      },
      goAddBook(){
        this.$router.push({
          path:'/addBook',
          name:'addBook'
        })
      },
      libraryOverView(){
        this.$router.push({
          path:'/libraryOverView',
          name:'libraryOverView'
        })
      },
      golengbackList(){
        this.$router.push({
          path:'/lengbackList',
          name:'lengbackList'
        })
      },
      goLogout(){
        this.$router.push({
          path: '/login',
          name: 'login'
        })
      }
    }
  }
</script>

<style scoped>
  @import "index.css";
</style>
