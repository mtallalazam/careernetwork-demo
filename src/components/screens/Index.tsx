import { Dialog } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import fullLogo from '~/full-logo.svg';
import { useNavigate } from 'react-router-dom';

function Index() {
  const [user, setUser] = useState<any>({ email: '', pass: '' });

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate('/signup');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(user);
    setUser(JSON.parse(user));
  }, []);
  return (
    <>
      <Head title="Career Network - Test" />
      <section className="flex flex-col items-center lg:justify-center min-h-screen max-h-screen p-8 py-24">
        <img src={fullLogo} alt="" className="" />
        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-16 mb-20 font-[rubik] break-all">
          Hello, <br /> {user.email}
        </h1>

        <button
          className="w-48 bg-primary text-xl font-medium text-white rounded-full px-4 py-4 mt-auto lg:mt-0"
          type="button"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </section>
    </>
  );
}

export default Index;
