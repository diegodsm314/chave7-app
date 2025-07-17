import React from 'react';

const HeaderComponent: React.FC = () => {
    return (
        <header style={{ padding: '1rem', background: '#f5f5f5' }}>
            <nav>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', margin: 0 }}>
                    <li>
                        <a href="/" style={{ textDecoration: 'none', color: '#333' }}>Home</a>
                    </li>
                    <li>
                        <a href="/pages" style={{ textDecoration: 'none', color: '#333' }}>Tarefas</a>
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Filtro"
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <a
                            className="rounded-full bg-sky-500 border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
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