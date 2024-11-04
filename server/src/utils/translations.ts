import * as fs from 'fs';
import * as path from 'path';

const getTranslation = (key: string): string => {
    const lang = process.env.LANGAGE_BACK || 'EN';
    const filePath = path.join(__dirname, `../../lang/${lang.toLowerCase()}.json`);
    const translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return translations[key] || key;
};

export default getTranslation;