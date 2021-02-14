import React,{ useEffect,useState,useCallback } from 'react';
import styles              from './maker.module.css';
import Header              from "../header/header";
import Footer              from "../footer/footer";
import { useHistory }      from "react-router-dom";
import Editor              from "../editor/editor";
import Preview             from "../preview/preview";


const Maker = ({FileInput,authService,cardRepository}) => {

    const historyState = useHistory().state;
    const [userId,setUserid] = useState(historyState && historyState.id );
    const [cards,setCards] = useState({})
    const history = useHistory();

    const onLogout = useCallback(() => {
        authService.logout();
    },[authService])


    // Mount, Id 변경시
    useEffect(()=>{
        if(!userId){
            return;
        }
        const stopSync = cardRepository.syncCards(userId,cards=>{
            setCards(cards);
        })

        return () => stopSync();

    },[userId,cardRepository])

    // 로그인 시
    useEffect(()=>{
        authService.onAuthChange(user=>{
            if(user) {
                setUserid(user.uid);
            }else{
                history.push('/');
            }
        })
    })

    const createOrUpdateCard = (card)=>{
        setCards(cards=>{
            const updated = {...cards}
            updated[card.id] = card;
            return updated;
        })

        cardRepository.saveCard(userId,card);
    }

    const deleteCard = (card)=>{
        setCards(cards=>{
            const updated = {...cards}
            delete updated[card.id];
            return updated;
        })
        cardRepository.removeCard(userId,card);
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
