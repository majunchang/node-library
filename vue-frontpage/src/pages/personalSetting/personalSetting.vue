<template>
  <div class="personal">
    <div class="personal-box">
      <Form ref="formValidate" :model="personalInfo"  :label-width="80">
        <FormItem label="呢称" prop="nickname">
          <Input v-model="personalInfo.nickname" placeholder="请输入你在本系统的昵称"></Input>
        </FormItem>
        <FormItem label="上传头像" prop="avatar">
          <Upload
            multiple
            type="drag"
            action="/proxy/fullStack/uploadFiles"
            :format="['jpg','jpeg','png']"
           :max-size='2048'
            :on-success="handleSuccess">
            <div style="padding: 20px 0;width: 600px;height: 500px">
              <img src="../../../static/images/1.jpg" alt="">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击此处上传或拖拽上传</p>
            </div>
          </Upload>
        </FormItem>

      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},
    components: {},
    data() {
      return {
        personalInfo: {
          nickname: this.$store.state.user,
        }
      }
    },
    created() {

    },
    computed: {},
    methods: {
      handleSuccess(res,file){
        console.log(file);
        console.log(res);
      }
    }
  }
</script>

<style scoped>
  @import "personalSetting.css";
</style>
