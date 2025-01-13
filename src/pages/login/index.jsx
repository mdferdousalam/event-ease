import {server} from '@/config/server';
import {jwtDecode} from 'jwt-decode';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';

const ROLE_ADMIN = 'admin';
const ROLE_NORMAL_USER = 'normalUser';
const ROLE_MODERATOR = 'moderator';

export default function LoginPage () {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const router = useRouter ();
  const handleSubmit = async e => {
    e.preventDefault ();

    try {
      const response = await fetch (server + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({email, password}),
      });
        const Data = await response.json ();

console.log(Data)
      if ((Data.statusCode == 200)) {
        const token = Data.data.accessToken;
       
        //decode token using jwt-decode
        const decoded = jwtDecode(token);
        console.log (decoded);
        const role = decoded.role;
        const userId = decoded.userId

        //store token and role in local storage
        localStorage.setItem ('user_id', userId);
        localStorage.setItem ('user_role', role);
        localStorage.setItem ('id_token', token);
        toast.success('Login successful');
        
        if (role === ROLE_ADMIN) {
          router.push ('/admin/dashboard');
        } else if (role === ROLE_MODERATOR) {
          router.push ('/moderator/dashboard');
        }
        else if (role === ROLE_NORMAL_USER) {
          router.push('/user/dashboard');
        } else {

          router.push('/dashboard');
        }
      } else {
        toast.error (Data.message || 'Login failed');
      }
    } catch (error) {
      console.error ('An error occurred:', error);
      toast.error (error.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 p-4`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold mt-4 text-blue-600">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail (e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword (e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
          <p className="text-center">
  Don&apos;t have an account?{' '}
  <Link className="text-blue-600" href="/register">
    Create an account
  </Link>
</p>;

        </form>
      </div>
    </div>
  );
}
