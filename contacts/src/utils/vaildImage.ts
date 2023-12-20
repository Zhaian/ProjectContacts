export  default function isValidHttpUrl (link:string) {
    let url;

    try {
        url = new URL(link)

    } catch (_) {
        return false;
    }


    return (url.protocol === "http:" || url.protocol === "https:") && /\.(|jpg|jpeg|png|webp|avif|gif|svg)$/.test(link);
}