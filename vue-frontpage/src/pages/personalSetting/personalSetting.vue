<template>
  <div class="personal">
    <div class="personal-box">
      <form action="/proxy/fullStack/uploadFiles">
        <div class="personal-single">
          <span class='personal-single-span'>个人昵称</span>
          <input type="text" placeholder='请输入你在本系统的昵称' v-model='nickname' class='personal-nickname'>
        </div>
        <div class="personal-single singleFile">
          <span class='personal-single-span'>个人头像</span>
          <input type="file" accept='image/jpeg,image/png,image/jpg' class='personal-file'
                 @change='getFile'>
          <div class="upload-box">
            <div class="upload-box-center">
              <img src="../../../static/images/upload.png" alt="" class='upload-img'>
              <p>点击此处上传头像</p>
            </div>
          </div>
        </div>
        <input type="submit" value='上传' class='personal-formSubmit' @click.stop='uploadAvater'>

      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {},
    components: {},
    data() {
      return {
        nickname: this.$store.state.user,
      }
    },
    created() {

    },
    computed: {},
    methods: {
      uploadAvater() {

        axios({
          method: 'post',
          url: '/proxy/fullStack/uploadFiles',
          headers: {'Content-Type': 'multipart/form-data'},
          data: {
            nickname: this.nickname,
            file: this.file
          },
        })
          .then(function (res) {
            console.log(res);
          });
      },
      getFile(e) {
        console.log(e.target);
        console.log(e.target.files);
        console.log(e.target.files[0]);
        this.file = e.target.files[0];
      }
    }
  }
</script>

<style scoped>
  @import "personalSetting.css";
</style>
