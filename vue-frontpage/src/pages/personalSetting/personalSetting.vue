<template>
  <div class="personal">
    <div class="personal-box">
      <form action="/proxy/fullStack/uploadFiles" method='post' enctype='multipart/form-data' class='form'>
        <div class="personal-single">
          <span class='personal-single-span'>个人昵称</span>
          <input type="text" placeholder='请输入你在本系统的昵称' v-model='nickname' name=' nickname' class='personal-nickname'>
        </div>
        <div class="personal-single singleFile">
          <span class='personal-single-span'>个人头像</span>
          <input type="file" accept='image/jpeg,image/png,image/jpg' name='file' class='personal-file'
                 @change='getFile'>
          <div class="upload-box">
            <div class="upload-box-center">
              <div class="elseAvator" v-if='!avatorShow'>
                <img src="../../../static/images/upload.png" alt="" class='upload-img'>
                <p>点击此处上传头像</p>
              </div>
              <img v-else='avatorShow' class='avator' id='avator'
                   src="/static/images/upload_baa36b9fd871af573378ed55ad51c3f4.png"
                   alt="">
            </div>
          </div>
        </div>
        <input type="submit" value='上传' class='personal-formSubmit' @click.prevent='uploadAvater'>

      </form>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'

export default {
    props: {},
    components: {},
    data () {
      return {
        nickname: this.$store.state.user,
        avatorShow: false
      }
    },
    created () {

    },
    computed: {},
    methods: {
      uploadAvater () {
        $.ajax({
          url: '/proxy/fullStack/uploadFiles',
          type: 'post',
          data: new FormData($('.form')[0]),
          // 当你的 data 选项被提交为一个 FormData 对象的时候，一定要将 processData 配置为 false
          // 否则 jQuery 的异步提交不生效
          processData: false, // tell jQuery not to process the data
          // 当提交一个 FormData 对象的时候，记得要将 contentType 设置为 false
          // 否则 jQuery 会默认把 Content-Type 设置为 application/x-www-form-urlencoded; charset=UTF-8
          contentType: false, // tell jQuery not to set contentType
          success: (data) => {
            if (data.code === 0) {
              this.avatorShow = true
              $('#avator').attr('src', data.imageSrc)
            }
          }
        })

        return false
      },
      getFile (e) {
        this.file = e.target.files[0]
      }
    }
  }
</script>

<style scoped>
  @import "personalSetting.css";
</style>
