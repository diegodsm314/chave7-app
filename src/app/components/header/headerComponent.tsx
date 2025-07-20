import React from 'react';

const HeaderComponent: React.FC = () => {
    return (
        <header className="p-4 bg-gray-100" >
            <nav className="flex items-center justify-center">
                <ul className="flex list-none gap-8 m-0 items-center">
                    <li className=' text-gray-800 transition-colors hover:text-[#ffffff] dark:hover:bg-[#1a1a1a] hover:border-transparent'>
                        <a href="/" className="no-underline">Home</a>
                    </li>
                    <li className=' text-gray-800 transition-colors hover:text-[#ffffff] dark:hover:bg-[#1a1a1a] hover:border-transparent'>
                        <a href="/pages" className="no-underline">Tarefas</a>
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Filtro"
                            className="p-2 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </li>
                    <li>
                        <a
                            className="rounded-full bg-gray-700 border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Buscar
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderComponent;