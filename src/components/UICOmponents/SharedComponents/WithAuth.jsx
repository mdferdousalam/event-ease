import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';

const WithAuth = (WrappedComponent, allowedRoles) => {
  return props => {
    const router = useRouter ();
    const [isAuthenticated, setIsAuthenticated] = useState (false);

    useEffect (
      () => {
        const checkAuthentication = () => {
          const user_role = localStorage.getItem ('user_role');
          const id_token = localStorage.getItem ('id_token');

          if (id_token) {
            const decodedToken = jwtDecode (id_token);
            const currentTime = Date.now () / 1000; // convert to seconds

            if (decodedToken.exp < currentTime) {
              // Token has expired
              localStorage.removeItem ('id_token'); // Remove expired token
              localStorage.removeItem ('user_role'); 
              router.push ('/');

              return;
            }
          }
          if (
            user_role &&
            user_role.split (',').some (role => allowedRoles.includes (role))
          ) {
            setIsAuthenticated (true);
          } else {
            router.push ('/');
          }
        };

        checkAuthentication ();
      },
      [router]
    );

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
