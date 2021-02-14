class Image_uploader {
    async upload(file){
        const data = new FormData();
        data.append('file',file);
        data.append('upload_preset','bphth8uy');
        const result = await fetch(
            'https://api.cloudinary.com/v1_1/dv3d4mjbz/upload',
            {
                method:'POST',
                body:data
            }
        )
        return await result.json();
    }
}

export default Image_uploader
