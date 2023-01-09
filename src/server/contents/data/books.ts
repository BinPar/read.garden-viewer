// S3 URLs expire, so you'll need to refresh them if you need to work with a book coming from a different s3

const books: string[][] = [
  // ['acuario'], // EPUB Flow
  // ['sapiens'], // EPUB Flow
  // ['autobiografia-postuma'], // EPUB Fixed
  // ['sistema-respiratorio'], // PDF
  // ['demo-1'], // EPUB with .xpgt problem
  // ['admin-upload'], // Single page PDF
  // ['bioquimica'],
  // ['hepatologia'],
  // [
  //   'manual-de-lactancia-materna', // Problem when searching ("ictericia" en página 179)
  //   'https://ebooks-emp.s3.eu-west-1.amazonaws.com/books/manual-de-lactancia-materna/manual-de-lactancia-materna.bp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCWV1LXdlc3QtMyJGMEQCIFYMOVzAAQ%2Fio%2Bs5rjG2WAGy4EvErt5diUmsw2tyUXv7AiALN8HRzWgPVGDyO4XP0%2FRNbOybcPiuKth89k0EYOmP%2Bir7AggZEAEaDDQwMjA4MzMzODk2NiIMouePmNhK0eMVa8d3KtgC1WRtVu2%2BgZfv%2BnDmEpn%2FvmNr7G6WhXF5Zud6j05bLFyGWb7hvFGXLUKfUAWarAKP6VaVZbCcEEEZl71qKIDa6DjSC2VBtMrr2RaFo8xCQM2OoXxLDm%2Ba%2FrsbFXnN62VuzAQ9TBAiLdgKpoA0mLbRu9%2FHk97rxqGQU%2Fh1JD6WX%2BD1qwHpdtsIZ%2BJNGe1NJ6CTdRy6gTqRkqsszY%2BF0mj0JWl7b7WxMfKC6uCF%2Bb08djBs4xcMVh4xwFM%2FHWRjK7VUlzGxOdX4czYiwVSSRtmKaIWC38yJeppdXRscq1Emn7pkjcCBRb8S1TyMw21z3ndN15xA7SzMUHekwGUCjTi1BJxC0lj52i3d8fwtTMquHhdVY6Fv8ew7cSHjBZ6ZN8Zl%2BGso7KPAgepeJK%2Fotjk2qDBCqqcNeQDTrUnxIlAk%2FapWF5Hi%2Bu2qkuDG0GokMy2Uxo%2Fiuka7I9ownNuAkwY6tAJ3xoFsDMBwY2ouj4Vj6kFq0mcexCw%2Fl17FuAppcWiQ4xZ9vL1xrE4LhB3C6kswDBf%2BxCrP99kcPUS2VsI%2BO46Xf10ouiPN7sjHD56SnD44JPSLjKANMTxSwiV8KxUsI6dbPHW1Or9Ccq6gzMVgy3aKKt6tw13a%2Ft8jUeCxAawTI%2BHA2prwooUpgYqT5nYhmxO72clKIpjOpZ%2BEPXAlb1%2BMHyVpOwSabSK3zmNZ6%2Buom6YCnH%2B2VLNz5tyeZXDXORGD6trowh138%2FlNAiN8NeHS4RW%2F8rBCgtvpTfomyRxrkUJPJy4cfKwBYGV178ekkQgtN0DdL1pAz9kxGKs3Iye1fkYCanvPgJxOiqZ2%2F2Sy5Ck%2Fmzx5T4n5IM5vLjAOcrqfwGgV12hW%2BCI4kXBuhPDYcpmlPA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220420T155851Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAV3HQI3LLDWT4HIKP%2F20220420%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=d38b8c49af2c8651c555e88d16cfdbd88058e9729f2a96ef017815d493edabaa',
  // ],
  // [
  //   '9788536321356', // Internal lnks
  //   'https://grupo-a-read-garden-test.s3.sa-east-1.amazonaws.com/books/9788536321356/9788536321356.bp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCWV1LXdlc3QtMyJHMEUCIQDOaLW2IyGIxbHQKSxAnOS%2FtZIjvd6MbxKPYY%2FgNPduMwIgTJy9WJxCF9pkWjuofMNCdn1PNmL%2BbiYAE1dyysyCmA8q%2BwIIFBAAGgw2Mzg4MDY4ODIwODYiDBS8mQkLExX07am5ESrYAraVTeOoAJjzvF4k1WIOGYnBiSNjgnb5uD0bN3wytMUo6RW8x2D5gq8S1%2BaF9DO3937yBQvIsVY%2FdBxWzxJwVwIMYJvYnoVIQXMuEGBhUECDLfPHmiGQFVI55b76BiobR2zWR87eDQAPDB09BrU4D9hSzmdd%2FsmbO2fvlZg4AIy2qmDELY5lqsiHOvyla9ELiF9V4EHSO2zEp1Kcd3CpUSdo8Cse7ch50Av%2FflSUGbHRx3qZgbRciLB8IfLPNSrywFO0G2i9kCTeq4qj4ZHTcwQLMy%2B5ogtRofKYPOJfq1yVu8BQRoP3PCateI9nwfLjJZ9KttMa5rdU%2FK9ySYf6Fxggn%2FsqAmou51JZnIrleD4nuu9Val46Pn1%2Bel0q046sDtcRysqf9SF35zAphvkiOGADEkIXbBWFn7nzN8e78l3My15%2BfJp0yhN2TfrMUbyg71pc0gmcK4qIMMvP%2F5IGOrMCCykll9RoZjwg16QmoenBwo%2BP%2Bv4m4RtsGemv3CRspodfxZ3T3X6Sn06PxZhq7rm1NDSrtG3sdty1kHmLcJjvtQB1%2FCvjSKjjto7kwDS9JVAjVp73zp%2FIaNIgaM%2Fr%2BOrPyRzKjTlMBTyPLDx1VW5oHD%2BdAnqYlYkxqKgP3bF%2FpncqvGGBoOeNnMch7S4ms3M0EEP8elqRykLI5rYibnBN64yFZaDrkrO9QvO4%2BhHY7svXmGKqrXOJZ1x24qrdXI9P3SzDUqpXcQCgoVNgFgysKGU2Lg37iTMYm6R%2Bw7MzwLV1iXNrXg1N620rEE4QBlJD1wRyL3SeLCgB7EWYPT9nK7txY8rfFNt60eCZHTHmW%2FPX2J7fZdcXXq9ePj3sb9P%2FBM94%2Bq6cZlhUqoP7F2kD9Md2EQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220420T110408Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIAZJO63O4TMZCPYAVQ%2F20220420%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Signature=0af783ef4c41b6ccbcce5b3ea88f79123aae64d9cb303b0d601de97f5f393939'
  // ],
  // [
  //   '9788582605691', // Internal lnks
  //   'https://grupo-a-read-garden-test.s3.sa-east-1.amazonaws.com/books/9788582605691/9788582605691.bp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCWV1LXdlc3QtMyJHMEUCIQDOaLW2IyGIxbHQKSxAnOS%2FtZIjvd6MbxKPYY%2FgNPduMwIgTJy9WJxCF9pkWjuofMNCdn1PNmL%2BbiYAE1dyysyCmA8q%2BwIIFBAAGgw2Mzg4MDY4ODIwODYiDBS8mQkLExX07am5ESrYAraVTeOoAJjzvF4k1WIOGYnBiSNjgnb5uD0bN3wytMUo6RW8x2D5gq8S1%2BaF9DO3937yBQvIsVY%2FdBxWzxJwVwIMYJvYnoVIQXMuEGBhUECDLfPHmiGQFVI55b76BiobR2zWR87eDQAPDB09BrU4D9hSzmdd%2FsmbO2fvlZg4AIy2qmDELY5lqsiHOvyla9ELiF9V4EHSO2zEp1Kcd3CpUSdo8Cse7ch50Av%2FflSUGbHRx3qZgbRciLB8IfLPNSrywFO0G2i9kCTeq4qj4ZHTcwQLMy%2B5ogtRofKYPOJfq1yVu8BQRoP3PCateI9nwfLjJZ9KttMa5rdU%2FK9ySYf6Fxggn%2FsqAmou51JZnIrleD4nuu9Val46Pn1%2Bel0q046sDtcRysqf9SF35zAphvkiOGADEkIXbBWFn7nzN8e78l3My15%2BfJp0yhN2TfrMUbyg71pc0gmcK4qIMMvP%2F5IGOrMCCykll9RoZjwg16QmoenBwo%2BP%2Bv4m4RtsGemv3CRspodfxZ3T3X6Sn06PxZhq7rm1NDSrtG3sdty1kHmLcJjvtQB1%2FCvjSKjjto7kwDS9JVAjVp73zp%2FIaNIgaM%2Fr%2BOrPyRzKjTlMBTyPLDx1VW5oHD%2BdAnqYlYkxqKgP3bF%2FpncqvGGBoOeNnMch7S4ms3M0EEP8elqRykLI5rYibnBN64yFZaDrkrO9QvO4%2BhHY7svXmGKqrXOJZ1x24qrdXI9P3SzDUqpXcQCgoVNgFgysKGU2Lg37iTMYm6R%2Bw7MzwLV1iXNrXg1N620rEE4QBlJD1wRyL3SeLCgB7EWYPT9nK7txY8rfFNt60eCZHTHmW%2FPX2J7fZdcXXq9ePj3sb9P%2FBM94%2Bq6cZlhUqoP7F2kD9Md2EQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220420T110614Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAZJO63O4TMZCPYAVQ%2F20220420%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a44860e3c1dff4c5f069e30673ecfc16e675c7c5d9b220f44705854348d8ce0c'
  // ]
  ['9786559760176'],
  ['9786558820789'],
  ['9786558820703']
];

export default books;
