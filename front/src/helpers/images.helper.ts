export function getImageLink(imageName: string | undefined) {
    if (!imageName) return;

    return `${document.location.protocol}//${document.location.host}/images/${imageName}`;
}
