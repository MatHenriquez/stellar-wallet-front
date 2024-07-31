/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from 'react';
import styles from './styles/SignUpInput.module.css';

type SignUpInputProps = {
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(
      field: T,
    ): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  value?: string;
  error: string | undefined;
  touched: boolean | undefined;
  type: string;
  name: string;
  icon?: React.ReactNode;
  label: string;
  placeholder?: string;
};

const SignUpInput = ({
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  type,
  name,
  icon,
  label,
  placeholder,
}: SignUpInputProps) => {
  return (
    <label className={styles.label} data-cy={`${name}-label`}>
      <span className={styles.span} data-cy={`${name}-span`}>
        {icon}
        {label + ':'}
        <input
          className={styles.input}
          type={type}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
          data-cy={`${name}-input`}
        />{' '}
      </span>
      <span className={styles.errorMessage} data-cy={`${name}-error`}>
        {error && touched && error}
      </span>
    </label>
  );
};

export default SignUpInput;
