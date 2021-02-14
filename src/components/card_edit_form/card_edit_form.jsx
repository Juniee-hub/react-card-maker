import React          from 'react';
import styles         from './card_edit_form.module.css';
import Button         from "../button/button";

const CardEditForm = ({FileInput,card,updateCard,deleteCard}) => {
    const {name,company,title,email,message,theme,fileName,fileURL} = card;
    const onSubmit = (event) =>{
        event.preventDefault();
        deleteCard(card);
    }

    const onChange = (event) => {
        if(event.currentTarget == null) {
            return;
        }
        event.preventDefault();

        updateCard({
            ...card,
            [event.currentTarget.name]: event.currentTarget.value,
        })

    }

    const onFileChange = file =>{
        updateCard(
            {
                ...card,
                fileName:file.name,
                fileURL:file.url,
            }
        )
    }

    return (
        <form className={styles.form}>
            <input className={styles.input} type="text" name="name" defaultValue={name} onChange={onChange} />
            <input
                className={styles.input}
                type="text"
                name="company"
                defaultValue={company}
            />
            <select className={styles.select} name="theme" defaultValue={theme} onChange={onChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="colorful">Colorful</option>
            </select>
            <input className={styles.input} type="text" name="title" defaultValue={title} onChange={onChange}/>
            <input className={styles.input} type="text" name="email" defaultValue={email} onChange={onChange} />
            <textarea className={styles.textarea} name="message" defaultValue={message} onChange={onChange} />
            <div className={styles.fileInput}>
                <FileInput name={fileName} onFileChange={onFileChange} />
            </div>
            <Button name="Delete" onClick={onSubmit} />
        </form>

    )
};

export default CardEditForm;
