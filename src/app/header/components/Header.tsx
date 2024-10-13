import Image from 'next/image';
import React from 'react';
import brandIcon from '../../favicon.ico';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header data-cy='header'>
      <div className='navbar bg-main-blue-200 text-main-blue-900'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost hover:bg-main-blue-500 lg:hidden'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 bg-main-blue-200 p-2 shadow'
            >
              <li>
                <a href='/dashboard' className='hover:bg-main-blue-500'>
                  Balances
                </a>
              </li>
              <li>
                <button className='hover:bg-main-blue-500'>Wallets</button>
                <ul className='bg-main-blue-200 p-2'>
                  <li>
                    <button className='hover:bg-main-blue-500'>Wallet 1</button>
                  </li>
                  <li>
                    <button className='hover:bg-main-blue-500'>Wallet 2</button>
                  </li>
                </ul>
              </li>
              <li>
                <a href='/transactions' className='hover:bg-main-blue-500'>
                  Transactions
                </a>
              </li>
            </ul>
          </div>
          <a href='/' className='btn btn-ghost text-2xl hover:bg-main-blue-500'>
            {' '}
            <Image src={brandIcon} alt='icon' height={48} /> Crippy
          </a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal bg-main-blue-200 px-1'>
            <li>
              <a href='/dashboard' className='hover:bg-main-blue-500'>
                Balances
              </a>
            </li>
            <li>
              <details>
                <summary className='hover:bg-main-blue-500'>Wallets</summary>
                <ul className='bg-main-blue-200 p-2'>
                  <li>
                    <button className='hover:bg-main-blue-500'>Wallet 1</button>
                  </li>
                  <li>
                    <button className='hover:bg-main-blue-500'>Wallet 2</button>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a className='hover:bg-main-blue-500'>Transactions</a>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='avatar btn btn-circle btn-ghost hover:bg-main-blue-400'
            >
              <div className='flex w-10 place-content-center rounded-full border-2 border-main-blue-900'>
                <FontAwesomeIcon className='w-8 pl-1' icon={faUser} />
              </div>
            </div>
            <ul className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 bg-main-blue-200 shadow'>
              <li>
                <a href='/settings' className='hover:bg-main-blue-500'>
                  Settings
                </a>
              </li>
              <li>
                <button className='hover:bg-main-blue-500'>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
