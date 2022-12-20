import { ComponentPropsWithoutRef, MouseEventHandler, useState } from 'react';
import logo from '../img/logo.svg';
import Container from './Container';

function NavLink(props: ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      {...props}
      className="block p-4 pl-6 font-semibold md:text-sm md:p-2 transition-colors uppercase text-slate-400 hover:text-slate-50 dark:text-neutral-300 dark:hover:text-neutral-200"
    />
  );
}

export function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuState: MouseEventHandler = () => {
    setIsMenuOpened(prev => !prev);
  };

  return (
    <header className="bg-slate-900 text-white mb-4 dark:bg-neutral-800">
      <Container>
        <div className="flex justify-between items-center h-14">
          <a href="/" className="flex flex-col items-center">
            <img
              src={logo}
              alt="РЯЗАНСКИЙ КОЛЛЕДЖ ЭЛЕКТРОНИКИ"
              className="h-6"
            />
          </a>
          <button
            className="w-9 h-6 flex flex-col justify-between md:hidden"
            onClick={handleMenuState}
          >
            <span className="block w-full h-[3px] bg-slate-300"></span>
            <span className="block w-full h-[3px] bg-slate-300"></span>
            <span className="block w-full h-[3px] bg-slate-300"></span>
          </button>
          <div
            className={`bg-[#0007] transition-opacity fixed inset-0 z-30 md:hidden ${
              isMenuOpened ? '' : 'opacity-0 pointer-events-none'
            }`}
            onClick={handleMenuState}
          ></div>
          <div
            className={`bg-slate-900 dark:bg-neutral-900 md:bg-transparent fixed top-0 left-0 bottom-0 right-1/3 z-40 overflow-y-auto transition-transform md:static md:p-0 md:translate-x-0 ${
              isMenuOpened ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <nav>
              <ul className="flex flex-col my-12 gap-1 md:my-0 md:gap-10 md:flex-row">
                <li>
                  <NavLink href="https://xn--j1al4b.xn--p1ai/" target="blank">
                    Сайт колледжа
                  </NavLink>
                </li>
                <li>
                  <NavLink href="https://vk.com/rcenext" target="blank">
                    Группа VK
                  </NavLink>
                </li>
                <li>
                  <NavLink href="https://vk.com/wardxela" target="blank">
                    Обратная связь
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
