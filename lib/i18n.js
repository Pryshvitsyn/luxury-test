export const languages=['en','ru','it','zh']; export async function getMessages(lang){ return (await import(`../messages/${lang}.json`)).default; }
