import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import fullLogo from '~/full-logo.svg';
import heroImg from '~/hero-img.png';

function Index() {
  const { state } = useAuthState();
  const [isOpen, setIsOpen] = useState(true);
  const completeButtonRef = useRef(null);

  return (
    <>
      <Head title="Career Network - Test" />
      <section className="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-none min-h-screen max-h-screen">
        <section className="w-full lg:max-h-screen overflow-hidden row-span-2 lg:row-span-auto lg:order-2">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </section>
      </section>
    </>
  );
}

export default Index;
