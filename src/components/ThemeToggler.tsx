import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { ThemeKey, themes } from '../lib/config';
import { useColorSchemeChangeEffect, useTheme } from '../lib/theme';

export default function ThemeToggler() {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedTheme, setSelectedTheme] = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  const changeThemeFactory = (theme: ThemeKey) => () => {
    setSelectedTheme(theme);
    setIsOpened(false);
  };

  useColorSchemeChangeEffect();

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

  const themeMeta = themes[selectedTheme];

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        className={classNames({
          'w-10 h-10 grid place-items-center md:w-7 md:h-7': true,
          [themeMeta.className]: true,
          [themeMeta.activeClassName]: isOpened,
          'text-slate-400 dark:text-neutral-400': !isOpened,
        })}
        onClick={() => setIsOpened(p => !p)}
      >
        <FontAwesomeIcon
          icon={themeMeta.icon}
          className="text-2xl md:text-lg"
        />
      </button>
      <ul
        className={classNames({
          'absolute z-50 bottom-full left-0 mb-4 overflow-hidden bg-slate-900 flex flex-col rounded-md border border-slate-800 text-slate-400 md:bottom-auto md:left-auto md:top-full md:right-0 md:mb-0 md:mt-4 md:bg-slate-800 shadow-md dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400':
            true,
          hidden: !isOpened,
        })}
      >
        {Object.entries(themes).map(([key, theme]) => (
          <li
            key={key}
            className="border-b border-slate-800 last:border-b-0 dark:border-neutral-800"
          >
            <ThemeOption
              active={key === selectedTheme}
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
      className={classNames({
        'flex items-center gap-3 w-full font-semibold text-left py-3 pl-4 pr-28 md:text-sm hover:bg-slate-700 dark:hover:bg-neutral-800 md:px-3 md:py-2':
          true,
        [activeClassName]: active,
        [className ?? '4242']: className,
      })}
    />
  );
}
