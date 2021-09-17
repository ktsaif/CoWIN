import { OfflineNotice } from './customcomponents'
import Toast from 'react-native-simple-toast';

async function Middleware(val) {
    
    var online = await OfflineNotice();
    if (!online) {
        Toast.show('Network connection failed, check the internet connectivity', Toast.LONG);
        return [null, null];
    }

    var fetch_url = val.url

    if (val.extraArg)
        fetch_url += val.extraArg;
   
    if (val.queryParams)
        fetch_url += '?' + val.queryParams;
    
    var data = {
        url: fetch_url,
        params: {
            method: val.method,
        }
    }

    var resultMain = await ApiRequest(data) || [];
    return resultMain;
}

async function ApiRequest(data) {
    try {
        var response = await fetch(data.url, data.params);
        if (response.status == "502" && !response.ok) {
            return null;
        } else {
            return response.json();
        }
    } catch (error) {
        return null;
    }
}

export { Middleware };
