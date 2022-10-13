import { MouseEventHandler, useState } from 'react';
import logo from '../img/logo.png';

export function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuState: MouseEventHandler = () => {
    setIsMenuOpened(prev => !prev);
  };

  return (
    <header className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <a href="/" className="flex flex-col items-center">
          <img src={logo} alt="РЯЗАНСКИЙ КОЛЛЕДЖ ЭЛЕКТРОНИКИ" />
          <span className="hidden text-center text-[8px] mt-1 md:block">
            РЯЗАНСКИЙ КОЛЛЕДЖ <br /> ЭЛЕКТРОНИКИ
          </span>
        </a>
        <button
          className="w-9 h-7 flex flex-col justify-between md:hidden"
          onClick={handleMenuState}
        >
          <span className="block w-full h-1 bg-white"></span>
          <span className="block w-full h-1 bg-white"></span>
          <span className="block w-full h-1 bg-white"></span>
        </button>
        <div
          className={`fixed z-40 inset-0 flex transition-all md:static md:block ${
            isMenuOpened ? '' : 'translate-x-full'
          } md:translate-x-0`}
        >
          <div
            className="bg-[#0007] basis-1/3 md:hidden"
            onClick={handleMenuState}
          ></div>
          <div className="bg-primary-900 p-5 basis-2/3 md:p-0 overflow-y-auto">
            <nav>
              <ul className="flex flex-col items-end gap-12 my-12 md:my-0 md:gap-28 md:flex-row">
                <li>
                  <a href="https://xn--j1al4b.xn--p1ai/" target="blank">
                    САЙТ КОЛЛЕДЖА
                  </a>
                </li>
                <li>
                  <a href="https://vk.com/rcenext" target="blank">
                    ГРУППА ВК
                  </a>
                </li>
                <li>
                  <a href="https://vk.com/wardxela" target="blank">
                    ОБРАТНАЯ СВЯЗЬ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
