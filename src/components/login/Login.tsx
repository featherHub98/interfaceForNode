import {useState} from 'react'
import axios from 'axios'
 const Login = ():any => {
    const [isLogged,setIsLogged] = useState(false);
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
       try {
        await axios.post('http://localhost:2000/realms/users/login', {
            email: email,
            password: pwd
        }).then((res) => {
            localStorage.setItem('access token', res.data.response.token);
        localStorage.setItem('refresh token', res.data.response.refreshToken);
        setIsLogged(true);
        console.log('access ',res.data.response.token);
        });
        
        
        
    } catch (error) {
        console.error('Login failed:', error);
    }
    }
    return (
        <div>
           <form onSubmit={handleSubmit}>
    <label htmlFor="email">Username:</label>
    <input type="email" id="email" name="email" required onChange={e =>{setEmail(e.target.value)}}/>
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" required onChange={e =>{setPwd(e.target.value)}}/>
    <button type="submit">Login</button>
        </form>
        </div>

    )
}
export default Login;