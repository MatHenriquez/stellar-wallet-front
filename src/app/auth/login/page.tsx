import React from "react";
import LoginForm from "./components/LoginForm";
import styles from "./styles/LoginPage.module.css";

const Login = () => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
}

export default Login;