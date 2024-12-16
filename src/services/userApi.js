const URL = 'https://joblisting-server-1ujf.onrender.com'

// login
export const userLogin = (data) =>{
    return fetch(`${URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body : JSON.stringify(data),
    })
}

// register
export const userRegister = (data) =>{
    return fetch(`${URL}/user/register`,{
        method:"POST",
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}
