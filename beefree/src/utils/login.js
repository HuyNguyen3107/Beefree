import {client} from "@/utils/client";
import {accessLinks, redirectLinks} from "@/config";

export const handleGetRedirect = async (provider) => {
    const response = await client.get(`${redirectLinks[provider]}`);
    if (response.ok) {
        const {result} = await response.json();
        const {urlRedirect} = result;
        return urlRedirect;
    }
    return "";
}

export const handleCallback = async (provider, thisUrl) => {
    const queryParams = thisUrl.slice(thisUrl.indexOf('?') + 1);
    const {response, data} = await client.get(
        accessLinks[provider] + '?' + queryParams
    );
    if (response.ok) {
        return {
            success: true,
            data,
        }
    }
    return {
        success: false,
        data: null,
    };
}