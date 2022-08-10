import { Dialog } from '@headlessui/react';
import { useRef, useState, ChangeEvent } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { Head } from '~/components/shared/Head';
import fullLogo from '~/full-logo.svg';
import heroImg from '~/hero-img.png';
import { fetchUsers, addUser } from '~/components/contexts/firestoreUtils';
import { useNavigate } from 'react-router-dom';

const initialFormState = { email: '', password: '' };

function Signup() {
  const { state } = useAuthState();
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, toggleSubmitting] = useState(false);
  const modalContentRef = useRef(null);

  const navigate = useNavigate();

  let [modalContent, setModalContent] = useState('Please enter all details');

  const resetState = () => {
    setFormState(initialFormState);
    toggleSubmitting(false);
  };

  const handleValidateInput = (e: ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case 'email':
        if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(e.target.value)) {
          if (!errors.includes(e.target.name)) setErrors((state) => [...state, e.target.name]);
        } else {
          setErrors((state) => {
            const newErrors = state.filter((error) => error !== e.target.name);
            return newErrors;
          });
        }
      case 'password':
        if (!/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/.test(e.target.value)) {
          if (!errors.includes(e.target.name)) setErrors((state) => [...state, e.target.name]);
        } else {
          setErrors((state) => {
            const newErrors = state.filter((error) => error !== e.target.name);
            return newErrors;
          });
        }
      default:
        return;
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleValidateInput(e);

    setFormState((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleSubmitting(true);

    if (!formState.email.length || !formState.password.length) {
      setModalContent('Please enter all details');
      setIsOpen(true);
      toggleSubmitting(false);
      return;
    }

    const usersList: any = await fetchUsers();

    let userExists = false;

    for (const user of usersList) {
      if (user.email === formState.email && user.password === formState.password) {
        userExists = true;
        setModalContent('An account with this email already exists.');
        setIsOpen(true);
        break;
      }
    }

    if (userExists) {
      resetState();
      return;
    }

    try {
      const user = { email: formState.email, password: formState.password };
      await addUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } finally {
      resetState();
    }
  };

  return (
    <>
      <Head title="Career Network - Test" />
      <section className="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-none min-h-screen max-h-screen">
        <section className="w-full lg:max-h-screen overflow-hidden row-span-2 lg:row-span-auto lg:order-2">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </section>

        <section className="w-full row-span-2 lg:row-span-auto flex flex-col items-center justify-center p-5 text-center">
          <img src={fullLogo} alt="" className="mb-16" />

          <form onSubmit={handleSubmit} className="max-w-xl">
            <input
              name="email"
              type="text"
              value={formState.email}
              onChange={handleFieldChange}
              placeholder="Email"
              className="w-full min-h-[3.5em] text-lg input input-bordered input-secondary mb-6"
              disabled={submitting}
            />

            <input
              name="password"
              type="password"
              value={formState.password}
              onChange={handleFieldChange}
              placeholder="Password"
              className="w-full min-h-[3.5em] text-lg input input-bordered input-secondary mb-6"
              disabled={submitting}
            />

            <button
              className="w-48 bg-primary text-xl text-white rounded-full px-4 py-4 mt-16"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Processing' : 'Submit'}
            </button>
          </form>
        </section>
      </section>

      <Dialog className="flex fixed inset-0 z-10 overflow-y-auto" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex items-center justify-center min-h-screen w-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div
            ref={modalContentRef}
            className="relative bg-black flex flex-col items-center justify-center text-white text-center max-w-2xl h-96 p-8 mx-auto rounded-3xl"
          >
            <h2 className="text-8xl font-bold mb-6">Sorry</h2>
            <p className="text-5xl">{modalContent}</p>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Signup;
