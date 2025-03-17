import path from "path";
import fs from "fs";

export const generateRandomId = () => {
    try {
        const elements = "qwertyuioplkjhgfdsazxcvbnm0192837465";
        const length = 16;
        let albumId = ""

        for(let i=0;i<=length;i++){
            let index = Math.floor(Math.random()*length);
            albumId += elements[index];
        }
        return albumId;

    } catch (error) {
        return error
    }
}

export const setImageFile = async(file,uploadDir) => {
    
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const tempPath =  file.filepath;
    const newFilename = Date.now() + path.extname(file.originalFilename);
    const newPath = path.join(uploadDir, newFilename);
    console.log(tempPath,newFilename,newPath);
    
    fs.copyFile(tempPath, newPath, (err) => {
        if (err) {
            console.error("File rename error:", err);
        }
    });
    
    return 'http://localhost:5000/images/'+newFilename
}

export const setAudioFile = async(file,uploadDir) => {
       
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const tempPath = file.filepath;
    const newFilename = Date.now() + path.extname(file.originalFilename);
    const newPath =  path.join(uploadDir,newFilename)
    
    fs.copyFile(tempPath, newPath, (err) => {
        if (err) {
            console.error("File rename error:", err);
        }
    });
    
    return `http://localhost:5000/audio/`+newFilename;
}