import {server} from '@/config/server';
import {useState} from 'react';
import {useRouter} from 'next/router';



export default function LoginPage () {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const router = useRouter ();
  const handleSubmit = async e => {
    e.preventDefault ();
    console.log ('Login with', {email, password});
    try {
      const response = await fetch (server + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({email, password}),
      });

      if (response.statusCode=200) {
          const Data = await response.json();
          const token = Data.data.accessToken
          
          //decode token using jwt-decode
          



        const userRole = Data.token.user.role;
        localStorage.setItem ('user_role', userRole);
        localStorage.setItem ('id_token', token);
        router.push ('/dashboard');
      } else {
        const errorData = await response.json ();
      }
    } catch (error) {
      console.error ('An error occurred:', error);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 p-4`}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold mt-4">Login</h1>
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
        </form>
      </div>
    </div>
  );
}
