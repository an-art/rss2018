const fs = require('fs');
const https = require('https');

const sites = process.argv[2];
const results = process.argv[3];
const wStream = new fs.WriteStream(results, {encoding: 'utf-8'});
let errors = [];

function checkPageSpeed() {
    if (sites && results) {
        const stream = new fs.ReadStream(sites, {encoding: 'utf-8'});
        
        stream.on('readable', function() {
            let data = stream.read();

            if (data) {
                data = data.split('\r\n');
                data.splice(data.length-1);
                while(data.length) {      
                                 
                    if (data.length > 80) {
                        for (let i = 0; i < 80; i++) {
                            setTimeout(sendRequest, i * 1000, data[i]);
                        }                        
                        data.splice(0, 80);                        
                    } else {
                        for (let i = 0; i < data.length; i++) {
                            setTimeout(sendRequest, i * 1000, data[i]);
                        }
                        data.splice(0);
                    }
                }         
            } 
        });    
    } else {
        console.log('Enter filename');
    }
    
}

checkPageSpeed();

function sendRequest(site) {
    https.get(`https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${site}&key=AIzaSyATE-UmTi_Oj8vlsJEcluUMC8qH-mtxAzw`, (res) => {
        const { statusCode } = res;
        if (statusCode != 200) {
            console.error(`Error code: ${statusCode}`); 
            errors.push(site);
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                wStream.write(site + '\n' + rawData + '\n');
            } catch (e) {
                console.error(e.message);
            }
        });
    });
}
