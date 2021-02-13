import React,{ useEffect,useState } from 'react';
import styles              from './maker.module.css';
import Header              from "../header/header";
import Footer              from "../footer/footer";
import { useHistory }      from "react-router-dom";
import Editor              from "../editor/editor";
import Preview             from "../preview/preview";


const Maker = ({authService}) => {

    const [cards,setCards] = useState([
        {
            id:'1',
            name:'June',
            company:'Plani',
            theme:'light',
            title:'Engineer',
            email:'test@gmail.com',
            message:'테스트!',
            fileName:'테스트..',
            fileURL:'테스트...png',
        },
        {
            id:'2',
            name:'June2',
            company:'Plani',
            theme:'colorful',
            title:'Engineer',
            email:'test@gmail.com',
            message:'테스트!',
            fileName:'테스트..',
            fileURL:null,
        },
        {
            id:'3',
            name:'June3',
            company:'Plani',
            theme:'dark',
            title:'Engineer',
            email:'test@gmail.com',
            message:'테스트!',
            fileName:'테스트..',
            fileURL:null,
        }
    ])
    const history = useHistory();

    const onLogout = ()=>{
        authService.logout();
    }

    useEffect(()=>{
        authService.onAuthChange(user=>{
            if(!user) {
                history.push('/');
            }
        })
    })

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor cards={cards} />
                <Preview cards={cards} />

            </div>
            <Footer />
        </section>
    );
};

export default Maker;
