import { responseProcess } from './common';

export const getYandexTranslate = async (text: string): Promise<{text: Array<string>}> => {
    const json = await responseProcess(
        'https://translate.yandex.net/api/v1.5/tr.json/translate',
        {
            key: 'trnsl.1.1.20190128T093514Z.a45e8c4ef5bb46bc.d4c23259f1a1ae72a4438a75a848c9c41b56e816',
            text,
            lang: 'en-ru'
        }
    );
    return json; 
}