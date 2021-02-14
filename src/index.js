import React,{memo}           from 'react';
import ReactDOM        from 'react-dom';
import './index.module.css';
import App             from './app';
import Auth_service    from "./service/auth_service";
import Image_uploader  from "./service/image_uploader";
import ImageFileInput  from "./components/image_file_input/image_file_input";
import Card_repository from "./service/card_repository";

const authService = new Auth_service()
const cardRepository = new Card_repository();
const imageUploader = new Image_uploader();
const FileInput = memo(props =>(<ImageFileInput {...props} imageUploader={imageUploader} />))
ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput} cardRepository={cardRepository}/>
  </React.StrictMode>,
  document.getElementById('root')
);
