import React,{ useEffect }          from 'react';
import styles         from './login.module.css';
import Header         from "../header/header";
import Footer         from "../footer/footer";
import { useHistory } from "react-router-dom";

const Login = ({authService}) => {

    const inputRef = React.createRef();
    const history = useHistory();

    const goToMaker = userid => {
        history.push({
            pathname:'/maker',
            state:{id:userid}
        });
    }
    const onLogin = (event) => {
        authService
            .login(event.currentTarget.textContent)
            .then(data => goToMaker(data.user.uid))
    }

    useEffect(()=>{
        authService
            .onAuthChange(user=>{
                user && goToMaker(user.uid)
            })
    });

    // Email 인증 로그인시
    useEffect(()=>{
        const checkMail = authService
            .CodeCheckMail();

        if(checkMail===false) {
            window.prompt('메일 인증 실패');
        }
    })

    const sendMail = ()=>{
        authService
            .loginSendMail(inputRef.current.value,{
                url:'http://localhost:3000/',
                handleCodeInApp:true,
            })
    }

    return (
        <section className={styles.login}>
            <Header />
            <section>
                <h1>Login</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <input className={styles.input} ref={inputRef} type="text" placeholder="메일" name="mail" />
                        <button className={styles.send} onClick={sendMail}>메일인증</button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>Google</button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>Github</button>
                    </li>
                </ul>
            </section>
            <Footer />
        </section>
    )
};

export default Login;
