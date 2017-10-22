
const mutations = {
  // 增加和存储用户
  SET_USER(state,user){
    console.log(user);
    console.log(JSON.stringify(user));
    state.user = user;
    window.localStorage.setItem('user',JSON.stringify(user));
  }
}

export default mutations
