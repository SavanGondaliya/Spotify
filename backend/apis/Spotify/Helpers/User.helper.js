"use strict"

export const generateReportId = async() => {

    const elements = "qwertyuioplkjhgfdsazxcvbnm0192837465";
    const length = 16;
    let reportId = ""

    for(let i=0;i<=length;i++){
        let index = Math.floor(Math.random()*length);
        reportId += elements[index];
    }
    return reportId;
}   