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
  //   '9788536321356', // Internal lnks (Grupo A)
  //   'https://d1cehrum5p3ind.cloudfront.net/books/9788536321356/9788536321356.bp',
  // ],
  // [
  //   '9788582605691', // Internal lnks (Grupo A)
  //   'https://d1cehrum5p3ind.cloudfront.net/books/9788582605691/9788582605691.bp',
  // ],
  [
    '9788582605837',
    'https://d1cehrum5p3ind.cloudfront.net/books/9788582605837/9788582605837.bp',
  ],
  // [
  //   'ecografia-musculoesqueletica-esencial',
  //   'https://ebooks-emp.s3.eu-west-1.amazonaws.com/books/ecografia-musculoesqueletica-esencial/ecografia-musculoesqueletica-esencial.bp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJGMEQCIDcv65FjJFGEF4cZundPe1GqfqvOWIBQAyUtVTpAJYOPAiAqb6ZmjvYFSio6q%2Fl5vUGzXJBS2bj2EppSMuxUWS9LiCqEAwiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAIaDDQwMjA4MzMzODk2NiIMdSKznyLQiSZ3eXNrKtgCf5ZhZ1AKu9RtTma7IkdxA62LZMtf%2FpFFyhqyPTanzB27rzZxOqUtKdGe1RhJkD6XIvH5waU9dMIRs%2FqM%2Byz1NuLEzhEgkO2ZGINxDeIQAPAgGg%2BHwiLI565UHW3nSLsjVkGBFYZeAd%2FA9B1YQrV7Zul7v9PxJudY7Wi%2BP18QCkb%2F53hy3y4XesXA0buhbuaL0ewbSTBveHlzu3S3ly4fkmRLk3oW%2BKnxtelVsoi7CduzNw0Oj0mWUOCPAB4%2FZMWylyGNEOyp%2BZr6zV%2Fx0QoLu3WkljupH%2BLTYMyh7bvHgjve1h7sGgh457cUpAOs2GSN%2FCFPGLv3KNlfiq7REpObXuII8pYloFYXsb%2B37E3HG0E8Sxq%2FSJCGUnewxhTXkVeI2a5eebbgUfr735%2BnHjHMZ0tw2Qgq99sQVbIaqfoxEfm%2BbptokdwDp0rwUDdr2jtcrZEHvSpUidIwrPb8nwY6tAJ6sKM5KHYlYwKCWJUsSmtqZtmeROiwQMEi80wpyj3IvxrcL0vbWIzfJFzAfIMQpipMYT1tUgNExQsU49DAUnrrjIpRrUKnIDZHPVfvdB2jlQwxE7Eq9TDvMlTYVldabCSYeOKmfJ5hpiNXo7bLAA%2BIDI76YR5UA5l0dsBPLYNy04BVHL3xechKl2emyqV0lI%2BmsbiEJUVIXpQJmyLYKtgKvtEUD2F4ZIKMCZ4R%2Fg9lu4IE0QLOgmf8EkdJgSzkHs2YZtMT3W77O7VQ6u3uW6DdyZnmeu4eVDQ7g78ZfzjrX8R4W1PyOnnNB5usiHbjFDdAvtcArQ7rQ75UVP8%2FXFc0U24vZU1Qo7AlRpbgzHWoFCpW3GVwbFwDJWet3pvp79jNnSaq7f6peaJUb4JEo7Y5BQhjtw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230301T135944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAV3HQI3LLLHU6FT4D%2F20230301%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=92ed9c4816284b7f22c09aba2e75a96c01520703bf4e568d5df0c36195ca872a',
  // ],
  // [
  //   'manual-de-exploracion-musculoesqueletica', // Problem with links click (EMP)
  //   'https://ebooks-emp.s3.eu-west-1.amazonaws.com/books/manual-de-exploracion-musculoesqueletica/manual-de-exploracion-musculoesqueletica.bp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJGMEQCIDcv65FjJFGEF4cZundPe1GqfqvOWIBQAyUtVTpAJYOPAiAqb6ZmjvYFSio6q%2Fl5vUGzXJBS2bj2EppSMuxUWS9LiCqEAwiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAIaDDQwMjA4MzMzODk2NiIMdSKznyLQiSZ3eXNrKtgCf5ZhZ1AKu9RtTma7IkdxA62LZMtf%2FpFFyhqyPTanzB27rzZxOqUtKdGe1RhJkD6XIvH5waU9dMIRs%2FqM%2Byz1NuLEzhEgkO2ZGINxDeIQAPAgGg%2BHwiLI565UHW3nSLsjVkGBFYZeAd%2FA9B1YQrV7Zul7v9PxJudY7Wi%2BP18QCkb%2F53hy3y4XesXA0buhbuaL0ewbSTBveHlzu3S3ly4fkmRLk3oW%2BKnxtelVsoi7CduzNw0Oj0mWUOCPAB4%2FZMWylyGNEOyp%2BZr6zV%2Fx0QoLu3WkljupH%2BLTYMyh7bvHgjve1h7sGgh457cUpAOs2GSN%2FCFPGLv3KNlfiq7REpObXuII8pYloFYXsb%2B37E3HG0E8Sxq%2FSJCGUnewxhTXkVeI2a5eebbgUfr735%2BnHjHMZ0tw2Qgq99sQVbIaqfoxEfm%2BbptokdwDp0rwUDdr2jtcrZEHvSpUidIwrPb8nwY6tAJ6sKM5KHYlYwKCWJUsSmtqZtmeROiwQMEi80wpyj3IvxrcL0vbWIzfJFzAfIMQpipMYT1tUgNExQsU49DAUnrrjIpRrUKnIDZHPVfvdB2jlQwxE7Eq9TDvMlTYVldabCSYeOKmfJ5hpiNXo7bLAA%2BIDI76YR5UA5l0dsBPLYNy04BVHL3xechKl2emyqV0lI%2BmsbiEJUVIXpQJmyLYKtgKvtEUD2F4ZIKMCZ4R%2Fg9lu4IE0QLOgmf8EkdJgSzkHs2YZtMT3W77O7VQ6u3uW6DdyZnmeu4eVDQ7g78ZfzjrX8R4W1PyOnnNB5usiHbjFDdAvtcArQ7rQ75UVP8%2FXFc0U24vZU1Qo7AlRpbgzHWoFCpW3GVwbFwDJWet3pvp79jNnSaq7f6peaJUb4JEo7Y5BQhjtw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230301T114812Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAV3HQI3LLLHU6FT4D%2F20230301%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=c0e772dca9fbbec778804139a88f28172eed7a9a11c819a8e4cfad05b9e3899a'
  // ]
  // ['9786559760176'],
  // ['9786558820789'],
  // ['9786558820703']
  // ['9788565852876'],
];

export default books;
