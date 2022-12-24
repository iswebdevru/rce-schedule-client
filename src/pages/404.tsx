import { Link } from 'react-router-dom';

export default function FourOFour() {
  return (
    <div className="h-full grow grid place-items-center">
      <div className="text-center">
        <h1 className="font-bold text-7xl mb-2 text-slate-900 sm:text-8xl md:text-9xl dark:text-white">
          404
        </h1>
        <p className="text-sm font-semibold mb-2 md:text-base dark:text-neutral-300">
          Страница не найдена
        </p>
        <Link
          to="/"
          className="text-lg text-blue-500 underline dark:text-blue-600"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
