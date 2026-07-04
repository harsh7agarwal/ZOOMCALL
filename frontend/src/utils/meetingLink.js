export function getMeetingLink() {
    return window.location.href;
}

export async function copyMeetingLink() {
    const link = getMeetingLink();
    await navigator.clipboard.writeText(link);
    return link;
}
