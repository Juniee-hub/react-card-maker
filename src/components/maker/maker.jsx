import React,{ useEffect,useState } from 'react';
import styles              from './maker.module.css';
import Header              from "../header/header";
import Footer              from "../footer/footer";
import { useHistory }      from "react-router-dom";
import Editor              from "../editor/editor";
import Preview             from "../preview/preview";


const Maker = ({FileInput,authService}) => {

    const [cards,setCards] = useState({
        '1':{
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
        '2':{
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
        '3':{
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
    })




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

    // const addCard = (card) => {
    //     const update = [...cards,card]
    //     setCards(update);
    // }

    const createOrUpdateCard = (card)=>{
        setCards(cards=>{
            const updated = {...cards}
            updated[card.id] = card;
            return updated;
        })
    }
    const deleteCard = (card)=>{
        setCards(cards=>{
            const updated = {...cards}
            delete updated[card.id];
            return updated;
        })
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor FileInput={FileInput} cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
                <Preview cards={cards} />

            </div>
            <Footer />
        </section>
    );
};

export default Maker;
