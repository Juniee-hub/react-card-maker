import React          from 'react';
import ReactDOM       from 'react-dom';
import './index.module.css';
import App            from './app';
import Auth_service   from "./service/auth_service";
import Image_uploader from "./service/image_uploader";
import ImageFileInput from "./components/image_file_input/image_file_input";

const authService = new Auth_service()
const imageUploader = new Image_uploader();
const FileInput = props =>(<ImageFileInput {...props} imageUploader={imageUploader} />)
ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput}/>
  </React.StrictMode>,
  document.getElementById('root')
);
