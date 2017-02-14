# postcss-nested-media-queries [![Build Status][ci-img]][ci] [![Dependencies Status][dm-img]][dm]

[PostCSS] plugin to support [nested media queries](https://drafts.csswg.org/css-conditional-3/#processing)

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/Semigradsky/postcss-nested-media-queries.svg
[ci]:      https://travis-ci.org/Semigradsky/postcss-nested-media-queries
[dm-img]:  https://david-dm.org/Semigradsky/postcss-nested-media-queries/status.svg
[dm]:      https://david-dm.org/Semigradsky/postcss-nested-media-queries

## Input
```css
@media screen and (min-width: 480px) {
  html {
    background: red;
  }

  @media (max-width: 640px) {
    html {
      background: green;
    }
  }
}
```


## Output
```css
@media screen and (min-width: 480px) {
  html {
    background: red;
  }
}
@media screen and (min-width: 480px) and (max-width: 640px) {
  html {
    background: green;
  }
}
```
