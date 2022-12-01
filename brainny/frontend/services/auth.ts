export async function recoverUserInformation(token: string){
    return fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                'Authorization' :  `Bearer ${token}`},
        credentials: 'include'
    }).then(res => res.json())
}