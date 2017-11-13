
const mutations = {
  // 增加和存储用户
  SET_USER(state,user){
    state.user = user;
    window.localStorage.setItem('user',user);
  }
}

export default mutations
