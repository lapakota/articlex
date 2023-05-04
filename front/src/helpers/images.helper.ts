export function getImageLink(imageName?: string) {
    if (!imageName) return;
    
    return `${document.location.protocol}//${document.location.host}/images/${imageName}`;
}
