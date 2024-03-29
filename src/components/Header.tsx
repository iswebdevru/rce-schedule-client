import { useEffect, useState } from 'react';
import { HeaderLinkProps, headerLinks } from '../lib/config';
import { NavLink, useLocation } from 'react-router-dom';
import Container from './Container';
import ThemeToggler from './ThemeToggler';

export default function Header() {
  const location = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuState = () => setIsMenuOpened(prev => !prev);

  useEffect(() => {
    setIsMenuOpened(false);
  }, [location]);

  return (
    <header className="dark:bg-neutral-800 mb-4">
      <Container>
        <div className="flex justify-between items-center h-14">
          <a
            href="/"
            className="flex flex-col items-center text-blue-600 font-bold dark:text-neutral-100"
          >
            РКЭ Next
          </a>
          <button
            className="w-9 h-6 flex flex-col justify-between md:hidden"
            onClick={handleMenuState}
          >
            <span className="rounded-sm block w-full h-1 bg-blue-600 dark:bg-neutral-200"></span>
            <span className="rounded-sm block w-full h-1 bg-blue-600 dark:bg-neutral-200"></span>
            <span className="rounded-sm block w-full h-1 bg-blue-600 dark:bg-neutral-200"></span>
          </button>
          <div
            className={`bg-[#0007] transition-opacity fixed inset-0 z-30 md:hidden ${
              isMenuOpened ? '' : 'opacity-0 pointer-events-none'
            }`}
            onClick={handleMenuState}
          ></div>
          <div
            className={`flex flex-col justify-between bg-neutral-900 dark:bg-neutral-900 px-4 py-12 md:bg-transparent fixed top-0 left-0 bottom-0 right-1/3 z-40 transition-transform md:static md:p-0 md:translate-x-0 md:flex-row md:items-center dark:md:bg-neutral-800 ${
              isMenuOpened ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <nav>
              <ul className="flex flex-col gap-1 md:my-0 md:gap-10 md:flex-row">
                {headerLinks.map(linkProps => (
                  <li
                    key={linkProps.href}
                    className="border-b border-neutral-800 dark:border-neutral-800 last:border-b-0 md:border-0"
                  >
                    <HeaderLink {...linkProps} />
                  </li>
                ))}
              </ul>
            </nav>
            <div className="ml-2 md:ml-10 lg:ml-16 xl:ml-24">
              <ThemeToggler />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

function HeaderLink(props: HeaderLinkProps) {
  if (props.kind === 'external') {
    return (
      <a
        target="_blank"
        href={props.href}
        className={createHeaderLinkClassName({
          isActive: false,
        })}
      >
        {props.text}
      </a>
    );
  }
  return (
    <NavLink to={props.href} className={createHeaderLinkClassName}>
      {props.text}
    </NavLink>
  );
}

interface HeaderClassName {
  isActive: boolean;
}

const headerLinkBaseClassName =
  'block p-4 font-semibold md:text-sm md:p-1 transition-colors uppercase';

function createHeaderLinkClassName({ isActive }: HeaderClassName) {
  if (isActive) {
    return `${headerLinkBaseClassName} text-blue-600 dark:text-neutral-50`;
  }
  return `${headerLinkBaseClassName} text-neutral-300 md:text-neutral-900 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-neutral-50`;
}
