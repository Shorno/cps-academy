import {getAuthCookie} from "@/utils/getAuthCookie";
import {baseUrl} from "@/utils/endpoints";

export async function getCustomData(){
    const token = await getAuthCookie();
    console.log(token)
    const response = await fetch(baseUrl + '/custom', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
    })

    return response.json();
}