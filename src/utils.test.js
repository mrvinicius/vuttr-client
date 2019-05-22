import { getTagsFromText, setHttp, validateTool } from './utils';

describe('getTagsFromText', () => {
    it('return empty list when empty text is provided', () => {
        let emptyText = '';
        expect(
            Array.isArray(getTagsFromText(emptyText))
        ).toBe(true);

        expect(
            getTagsFromText(emptyText).length
        ).toBe(0);

        emptyText = '  ';
        expect(
            Array.isArray(getTagsFromText(emptyText))
        ).toBe(true);

        expect(
            getTagsFromText(emptyText).length
        ).toBe(0);
    })

    it(`return list with the correct number of tags when
    one or more are provided`, () => {
            expect(
                getTagsFromText('tag1 tag2 tag3')
                    .length
            ).toBe(3);

        });
});

describe('setHttp', () => {
    it('insert http protocol in URL without it', () => {
        expect(
            setHttp('www.example.com') === 'http://www.example.com'
        ).toBe(true);

        expect(
            setHttp('example.com') === 'http://example.com'
        ).toBe(true);
    });

    it('preserves http protocol in URL with it', () => {
        expect(
            setHttp('http://www.example.com') === 'http://www.example.com'
        ).toBe(true);

        expect(
            setHttp('https://www.example.com') === 'https://www.example.com'
        ).toBe(true);
    });
});

describe('validateTool', () => {
    it('return title error message when title is empty', () => {
        const isStringAndNotEmpty = string =>
            typeof string === 'string'
            && string.length > 0

        let errorsToEmptyString = validateTool({
            title: ''
        });
        expect(
            isStringAndNotEmpty(errorsToEmptyString.title)
        ).toBe(true);

        errorsToEmptyString = validateTool({
            title: ' '
        });
        expect(
            isStringAndNotEmpty(errorsToEmptyString.title)
        ).toBe(true);

        errorsToEmptyString = validateTool({
            tilte: 'wrong property name'
        });
        expect(
            isStringAndNotEmpty(errorsToEmptyString.title)
        ).toBe(true);
    });
});