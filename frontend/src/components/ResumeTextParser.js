import pdfToText from 'react-pdftotext'

export const extractText = async (file) => {
    const text = await pdfToText(file)
        .catch(error => console.error("Failed to extract text from pdf"));
    return text;
};
