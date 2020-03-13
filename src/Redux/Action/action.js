export function isLoading(bool){
  return{
    type:'LOGIN_ATTEMPT',
    isLoading:bool
  }
}

export function loginSuccess(userData){
  return{
    type:'LOGIN_SUCCESS',
    userData
  }
}

export function loginFailed(error){
  return{
    type:'LOGIN_FAILED',
    error
  }
}

export function login(data) {
  console.log("data",data)
  return  async dispatch => {
      dispatch(isLoading(true));
    return  await fetch('http://180.149.241.208:3022/login', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "email":data.email,
        "pass":data.pass
      })
    })
    .then((response) => {
      if(response.status === 200){
        dispatch(isLoading(false))
        response.json().then((responseJSON) => {
          console.log("responseJSON",responseJSON);
          dispatch(loginSuccess(responseJSON))
        })
      }
      else{
        response.json().then((responseJSON) => {
          console.log("responseJSON",responseJSON);
          dispatch(isLoading(false))
          dispatch(loginFailed(responseJSON.message))
        })
      }
    })
    .catch((error) => {
      console.log("error",error);
      dispatch(isLoading(false))
      dispatch(loginFailed(error))
    })
  }
}
