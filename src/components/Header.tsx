import { MouseEventHandler, useState } from 'react';
import logo from '../img/logo.png';

export function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuState: MouseEventHandler = () => {
    setIsMenuOpened(prev => !prev);
  };

  return (
    <header className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <a href="/" className="flex flex-col items-center">
          <img src={logo} alt="РЯЗАНСКИЙ КОЛЛЕДЖ ЭЛЕКТРОНИКИ" className="h-9" />
          <span className="hidden text-center text-[8px] mt-1 md:block">
            РЯЗАНСКИЙ КОЛЛЕДЖ <br /> ЭЛЕКТРОНИКИ
          </span>
        </a>
        <button
          className="w-9 h-6 flex flex-col justify-between md:hidden"
          onClick={handleMenuState}
        >
          <span className="block w-full h-[3px] bg-white"></span>
          <span className="block w-full h-[3px] bg-white"></span>
          <span className="block w-full h-[3px] bg-white"></span>
        </button>
        <div
          className={`bg-[#0007] transition-opacity fixed inset-0 z-30 md:hidden ${
            isMenuOpened ? '' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleMenuState}
        ></div>
        <div
          className={`bg-primary-900 fixed top-0 left-0 bottom-0 right-1/3 z-40 overflow-y-auto transition-transform md:static md:p-0 md:translate-x-0 ${
            isMenuOpened ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav>
            <ul className="flex flex-col my-12 gap-1 md:my-0 md:gap-28 md:flex-row">
              <li>
                <a
                  href="https://xn--j1al4b.xn--p1ai/"
                  className="block p-3 pl-6 md:p-2"
                  target="blank"
                >
                  САЙТ КОЛЛЕДЖА
                </a>
              </li>
              <li>
                <a
                  href="https://vk.com/rcenext"
                  className="block p-3 pl-6 md:p-2"
                  target="blank"
                >
                  ГРУППА ВК
                </a>
              </li>
              <li>
                <a
                  href="https://vk.com/wardxela"
                  className="block p-3 pl-6 md:p-2"
                  target="blank"
                >
                  ОБРАТНАЯ СВЯЗЬ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
