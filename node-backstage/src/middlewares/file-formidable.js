import formidable from 'formidable'
import configPath from '../config'

export default function fileFormidable(req){

    return new Promise((resolve,reject)=>{
        const  form = new formidable.IncomingForm()
        formidable.uploadDir = configPath.uploadDir;
        form.keepExtensions = true;
        form.parse(req,(err,fields,files)=>{
            if(err){
                reject(err)
            }
            resolve([fields,files])
        })

    })
}