import React from 'react';
import styles from '../styles/SwapAuthLink.module.css';
import Link from 'next/link';

type SwapAuthLinkProps = {
  name: string;
  link: string;
  description: string;
  text: string;
};

const SwapAuthLink = ({ name, link, description, text }: SwapAuthLinkProps) => {
  return (
    <div className={styles.description}>
        {description}{' '}
      <Link href={link} className={styles.link} data-cy={`${name}-link`}> 
        {text}
      </Link>
    </div>
  );
};

export default SwapAuthLink;
