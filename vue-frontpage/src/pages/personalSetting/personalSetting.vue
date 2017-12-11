<template>
  <div class="personal">
    <div class="personal-box">
      <Form ref="formValidate" :model="personalInfo" :rules="ruleValidate" :label-width="80">
        <FormItem label="呢称" prop="nickname">
          <Input v-model="personalInfo.nickname" placeholder="请输入你在本系统的昵称"></Input>
        </FormItem>
        <FormItem label="上传头像图片" prop="avatar">
          <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>Click or drag files here to upload</p>
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
        personalInfo:{

        }
      }
    },
    created() {

    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  @import "personalSetting.css";
</style>
