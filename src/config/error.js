export default ({vm, result})=> {
  if (result.status == 401) {
    localStorage.removeItem('loginedAdmin');
    vm.$router.push('/login');
  }

  if (result.status == 400) {
    vm.$message({
      showClose: true,
      message: result.data.message,
      type: 'error',
      duration: 2000,
    });
  }

  if (result.status == 500) {
    vm.$message({
      showClose: true,
      message: '服务器内部错误.',
      type: 'error',
      duration: 2000,
    });
  }
  return false;
}

