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
  // [
  //   '9788582605837',
  //   'https://d1cehrum5p3ind.cloudfront.net/books/9788582605837/9788582605837.bp',
  // ],
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
  // [
  //   '9788491817031',
  //   'https://anaya-cdn-test.binpar.online/books/desarrollo-adulto-y-envejecimiento/desarrollo-adulto-y-envejecimiento.bp',
  // ],
  [
    '9788491347194',
    'https://duana-contents.s3.eu-west-1.amazonaws.com/books/las-provincias-y-maria-consuelo-reyna/las-provincias-y-maria-consuelo-reyna.bp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCWV1LXdlc3QtMyJIMEYCIQDzsKoGGMfHvlFlAcESPv950lrADm%2BPkLlhWfwg67USKAIhAOOpNYjkzNn6yF1sm5MSpcmuxE0EGbNrxP%2FPwEIp9UJ8KoYDCOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAxoMMTE4MTY1NjMwMzU1IgxMEQVa0ZyMtDKilD4q2gL1YyQCWsF0GQlICKJRTehfF4qJA5DsfD6tryrFRSCy42iyg%2B6V7VXKZcARqhcOsG1JNQAMbR%2F8vmKHzzcYLU2JdpqrRmqHyZLBRjSTGNbvNQbF7jnAMkg8amPQFxYqExlzO%2BR%2Bume%2F3FZK62dB%2BNXHC%2BL8Zz5rp0aq2dIoh0dqj3NXo6dhSSUxu81aEDk33GyyDkAyyYeKxOns2hbyVd20ffghGqVzsBjFGwzBqvKhGyRh%2F6%2B0PS4rupS11Pk6JEIqvt%2Fxr4dHaIZc8%2BGyUrxGNGTi7lEfODX%2FYg0K70La7mI%2FwzwDo%2FVUTjpZBBmAtZi5ADTF2XKkwyGUsbOOcqkTkxuJNg8PGhUh18A%2FHGuQSyv18STv8OsVpUQLpX0XkH123ytEn29Leso%2FO0xBO7%2FevffX4CNCi%2FCtaL5hgICrYKQWpYqxDWf8G8CvhWF8QJACPBY%2B83GSXoiIMLOL%2FK4GOrIC%2BUo%2BOToNis0gz5t56vh1ibXFxWmJrmvg5fR20am8rXP2D%2FZHnSJpKMYbjrlp8tTOKBKoaCAnJH%2Bcan7xtyRSACdJ5R55SfKwT7twfc9%2FRtnzJNUbBEqyxJWZtS%2BnpCVjGb%2BQRb1DfShNI%2BX0GyNuB%2BKUDZnWMFNDrY6SV6928z1vV372XdEpX%2BrKpW5rEsmivmCyXlO3vWjBI5VpBVyV9jV60f2XZi%2BAXBj5VacKMdvLO2fMx%2FLBgj4Ozr8%2BlaJG6gtSXcBWKwoNdDN40uV5QoiIi9kZoCCCc1MPNMwpmM4VnhExsh4SyzW1ESf0uXpsEFCACWpgGSZVo%2ByDoOK0h98qJWi177JU3E3JCUYLw67kiZD7zaEyUXQiNGz1geCOck5i54kQy4CqcodrJU1dTSA0&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240228T100922Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIARXAZYNWJ2BM4ZZPV%2F20240228%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=cc2633e0b255c56d2af503c86433e6643f9e32645e6b6f1889044ce4ccdfffa3'
  ],
  [
    '9788413576015',
    'https://read-garden-sintesis-release.s3.eu-west-1.amazonaws.com/books/administracion-de-sistemas-gestores-de-bases-de-datos-3/administracion-de-sistemas-gestores-de-bases-de-datos-3.bp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCWV1LXdlc3QtMyJGMEQCIDOrFz1VPst5xIFTdTG15xsM52rRzrxwJH4IiGwlykK7AiB36476feSM%2F7HoqIe%2BG0%2FEQZD0SEaqfqBAqpUyHYY%2BJSqGAwjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDAzODY5MDcxNTk1NiIM%2Fk14yvmikVITiyjlKtoCJBiukzEO58xa2xPOeyuvyk74nTUbK3V16CBZ6Z7GMarEHVp%2BlYX%2B0ySMG4oXdCP9sYrL2S0%2Bb9Z9dSffEUD%2BdPN1xYnolKfq35kaIBGvhX1YZUxKxCv9F5CStTOWFpjOoMu51w1CV7Pr%2BExiHJ00cxpVIeX6MeJ9qaIuxl7bIWZT14lw8jODqG439H%2BZg7eeqkXv%2FmyxeMeZW7iW9ypyS0JBe7JEm0FAm1Qrd5zHnqhElEN0VV1efdWe%2F6adI29hwMS3AlJoQ9bvaSMUtH3ssZKcCQEExC0SSyW1Fboq68vTp2Ilcy2nJy%2F%2B%2FwDJtebPV2VN95tpR122BbZORnbLPklLmVDzkxJ1IDAeORLV2%2B77xoH3%2BWmKsh27neVU3WsmsjfIG3AuUNOotexXCSFSFs1bGZGg2lomsczJzkTDlwN%2B8t8a6UCdDL0WDgxvOGzOcB%2FUxg4IHqfQeDDTj%2FyuBjq0AsVrujwp4AqJldkkA8WYJAuZjcL78kYmhgDzDm85YDmqw96Se%2F1%2FKgpGXSXgbYJNe2lgpIbHr1pLKqlyjXQJWQR8xOjkC52mRxd7LlsdR826WNnhVX8Et4LE3M6U8qSnr4wEgtlSmOtZBh8G4KDqFsQfYAaCjx2%2BNZQcFeTTTw1rKpX3c5FqZ30VDvUY1XssTHdtk4A4WTMo%2FCu%2BdBlr56lFB3rTKa5o3JbOLX97pkAM3IMiU2gPSaIt6lq1a4dVEKnenCHjGFqFtKtzK0SxZPdojE%2FGa5RIiEj9JcR5uh86yCnhLLd%2BQc0MSksQ1VfMA0%2BFzwBbbqfgpMfjOEYd5nZafIxXpRo1kOvlSUUm%2Fmd0OIEOWR%2BBRefFZltot%2B455JqNlBTdvB2JRUt4Y2%2FIZUCsrONp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240228T101729Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAQSARFPE2FETI77Z5%2F20240228%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=6197b8c6f05e9795247c1e603d62d1536eefaf20935f675e4b717d280b0a5798'
  ],
];

export default books;
