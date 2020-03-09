export function isLoading(){
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

export function login(data){
  return dispatch => {
      dispatch(isLoading(true));
      // return fetch("https://jsonplaceholder.typicode.com/users")
      //     .then 
    return fetch('https://jsonplaceholder.typicode.com/users', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "email":data.email,
        "password":data.password
      })
    })
    .then((response) => {
      if(response.status < 300){
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
// export const login = (data:Object) => {
//     userTasks.userID = localStorage.getItem('userID')
//     return () => {
//         fetch("https://jsonplaceholder.typicode.com/users")
//         .then()
//     }
// }