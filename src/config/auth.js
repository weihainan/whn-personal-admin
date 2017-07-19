export default ()=> {
  let admin = JSON.parse(localStorage.getItem('loginedAdmin'))
  if (admin === null) {
    return 'none';
  }
  let auth = admin.id + '-' + admin.token;
  return auth;
};
