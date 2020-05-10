export class Format{
    static getCamelCase(text){
        let div = document.createElement('div');
        div.innerHTML = `<div data-${text}="id"></div>`;
        return Object.keys(div.firstChild.dataset)[0];
    }
    static toTime(duration){
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        if(hours > 0){
            return `${hours}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        }else{
            return `${minutes}:${seconds.toString().padStart(2,'0')}`;
        }
    }
    static dateToTime(date,locale = 'pt-BR'){
        return date.toLocaleTimeString(locale,{
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    static timeStampToTime(timeStamp){
        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : ''; 
    }
    static byteToLargerUnit(bytes, level = 0){
        while(bytes >= 1024){
            bytes /= 1024;
            bytes = bytes.toFixed(2);   
            level++;
        }
        let unity;
        switch(level){
            case 0:
                unity = 'B';
            break;
            case 1:
                unity = 'KB';
            break;
            case 2:
                unity = 'MB';
            break;
            case 3:
                unity = 'GB';
            break;
            case 4:
                unity = 'TB';
            break; 
        }
        return `${Math.round(bytes,-2)} ${unity}`;
    }
    static mimeTypeToExtension(mimeType){
        let ext;
        switch(mimeType){
            case 'application/pdf':
                ext = 'pdf';
            break;
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                ext = 'Word';
            break;
            case 'application/vnd.ms-powerpoint':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                ext = 'PowerPoint';
            break;
            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                ext = 'Excel';
            break;
            case 'text/plain':
                ext = 'Texto';
            break;
            case 'application/x-msdownload':
                ext = 'Executável';
            break;
            default:
                ext = 'Arquivo';
        }
        return ext;
    }
}