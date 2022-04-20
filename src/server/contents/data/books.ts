const books: string[][] = [
  ['acuario'], // EPUB Flow
  ['sapiens'], // EPUB Flow
  ['autobiografia-postuma'], // EPUB Fixed
  ['sistema-respiratorio'], // PDF
  ['demo-1'], // EPUB with .xpgt problem
  ['admin-upload'], // Single page PDF
  ['bioquimica'],
  ['hepatologia'],
  [
    'manual-de-lactancia-materna', // Problem when searching ("ictericia" en página 179)
    'https://ebooks-emp.s3.eu-west-1.amazonaws.com/books/manual-de-lactancia-materna/manual-de-lactancia-materna.bp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCWV1LXdlc3QtMyJIMEYCIQC2Dy7krnhl%2FVESFY0M4qWX5bwt1uVwbUIZa7%2B4R6VTrAIhAPF73fn54bbWAQRUZh%2Fe8jeOLqSK6UwTzoqNkW6bImTdKvsCCBEQARoMNDAyMDgzMzM4OTY2IgxGpZr0b03jWzl5iLMq2ALIa%2FThCrABHeL5ojs6JcgQsNfRPLia27OCUnyqJFtj5xtI6xHLpxeaERduzziOtc5%2B2IxxBRuSHtppbOPxOzI%2Fp3xitWo3%2FWsWCuGBT2OX9Zu1zhy3Wx8nhn1T6%2B3Wm2q1W0WUnRRmd8VmyEY%2FdIW1km3jGqWxdIybKv%2F39ZmzTA7P6UZN6PQH4kFv4R7WH0%2F92%2FQ%2BNkCRb0pOrsdQaRRIjCR0ZRoGJxq7dC%2B58QXWGRFRlOG4ptw8AjeWNeLyAc5yEV%2F71GYOANRoi%2F4OkLNptA40t%2FMh3MWMGiO2dwfvWiqB0v1S64nhHdpiWC9A0GOhwWOMBukXhZZlIklUDL%2Bv%2FRDWpP5G0cWAb13FToMD%2BeeQzKUoDMq92nh6aYqtr9ddt3N6xkq6B7UcMXHLJRaFEbNMLQ9HW8c1ynY7BfyPZBxRpPI%2Fc%2BMuoEMurJISaT4xu0kqanxbATDK%2BP6SBjqyAg3kypbMFYg2rZArXxYrvbwKSqus9li8Is0upZIw8ylGlIe2FQu1CJyT%2BUOpJfan%2FJ%2FGKml%2BCNPePv%2BeGZW2RgC9GktfZNFbRfdg4%2F2UT0rjVqI%2BcJcIY4A7Q%2BzVF80gt2LggZZhbaH4OsglnKDaP2MvKrEQCMpqmes6Vy2%2BWrU0SGqgrI9bZOOOMYrEr7AtP9X6509YQuPszKEWYzLCiNwLPbXiPBIfZNw4H5i5y37bjLEzlt1NInq8BNK9xRc5MGhOF02yywTldEhIj9LT2YC7EdpXk2oS3mAH7hnH8TKxLbKk7waTDtXG5EbN4MIwtWcRB4doVkz2%2BvRv%2Blg7D9vHkS927mn3T%2FQix3jnlsHII1lNcaGWAiMALxifaSk3SveErcWxFuEocI0VToe9vvajng%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220420T075630Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAV3HQI3LLKY55UOI7%2F20220420%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=46453ddd56caa4c5349f6c37cf65b9f6ed932fedab6386379e486831b27e6542',
  ],
];

export default books;
