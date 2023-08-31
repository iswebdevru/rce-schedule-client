import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { ThemeKey, themes } from '../lib/config';
import { useTheme } from '../lib/theme';

export default function ThemeToggler() {
  const [isOpened, setIsOpened] = useState(false);
  const [{ key: themeKey, actual: actualTheme }, setSelectedTheme] = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  const changeThemeFactory = (theme: ThemeKey) => () => {
    setSelectedTheme(theme);
    setIsOpened(false);
  };

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        e.target instanceof Node &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpened(false);
      }
    };
    window.addEventListener('click', handleClose);

    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);

  const themeBtn = themes[actualTheme];

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        className={classNames(
          themeBtn.activeClassName,
          themeBtn.className,
          'w-10 h-10 grid place-items-center md:w-7 md:h-7'
        )}
        onClick={() => setIsOpened(p => !p)}
      >
        <FontAwesomeIcon icon={themeBtn.icon} className="text-2xl md:text-lg" />
      </button>
      <ul
        className={classNames({
          'absolute z-50 bottom-full left-0 mb-4 overflow-hidden flex flex-col rounded-md border border-neutral-700 md:border-neutral-200 text-neutral-500 md:text-neutral-700 md:bottom-auto md:left-auto md:top-full md:right-0 md:mb-0 md:mt-4 md:bg-white shadow-md dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400':
            true,
          hidden: !isOpened,
        })}
      >
        {Object.entries(themes).map(([key, theme]) => (
          <li
            key={key}
            className="border-b border-neutral-700 md:border-neutral-200 last:border-b-0 dark:border-neutral-800"
          >
            <ThemeOption
              active={key === themeKey}
              className={theme.className}
              activeClassName={theme.activeClassName}
              onClick={changeThemeFactory(key as ThemeKey)}
            >
              <div className="w-6 grid place-items-center">
                <FontAwesomeIcon icon={theme.icon} className="text-lg" />
              </div>
              {theme.name}
            </ThemeOption>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ThemeOptionProps extends ComponentPropsWithoutRef<'button'> {
  active: boolean;
  activeClassName: string;
}

function ThemeOption({
  className,
  active,
  activeClassName,
  ...props
}: ThemeOptionProps) {
  return (
    <button
      {...props}
      className={classNames(className, {
        'flex items-center gap-3 w-full font-semibold text-left py-3 pl-4 pr-28 md:text-sm hover:bg-neutral-800 md:hover:bg-neutral-100 dark:hover:bg-neutral-800 md:px-3 md:py-2':
          true,
        [activeClassName]: active,
      })}
    />
  );
}
