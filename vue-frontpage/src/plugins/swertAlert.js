import Vue from 'vue'
import swal  from 'sweetalert2'

export default {
  MaModal(text, type) {
    if (text == "close") {
      Vue.prototype.$swal.close();
      return;
    }
    type = type ? type : "success";
    text = text ? text : "操作成功";
    Vue.prototype.$swal({
      title: '',
      html: text,
      type: type,
      timer: 2000,
      customClass: 'customSwal',
      showCancelButton: false,
      showCloseButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    })
  }

}
