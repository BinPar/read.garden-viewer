# Read.Garden Viewer

Universal EBook Reader for EPUB2, EPUB3, HTML5 and PDF contents.

This viewer will be part of the Read.Garden ecosystem, but also can be used by any other software.

## One Viewer To Rule Them All

This DOM based viewer will be designed to be:

- **Application Agnostic**: will work for our online viewer, mobile APP, desktop viewer, etc...
- **Browser Agnostic**: working for all mayor modern browsers (sorry IE11)
- **Content Agnostic**: sharing as much logic as possible between the distinct content formats
- **API Agnostic**: providing a universal event based interface (that will get `actions` and emit `events`) to be used by any viewer.
- **Body Scroll Based**: the library will automatically append it's own DOM nodes in te body and use the page's body scroll navigate through the content.

## How to integrate this viewer into any project

The viewer consists of three different files:

- `read.garden-viewer.css`: the styles to imported in the page
- `read.garden-viewer.js`: the minified JavaScript viewer bundle
- `read.garden-viewer.d.ts`: width the type definitions in case you need to use in in a TypeScript project

## Main Viewer Features

We divide the features in three different groups:

- General features
- Flow content features
- Fixed content features

### General Features

- Style Reset
- Pagination
- Scroll management
- Page change notification events
- Jump to page
- Universal user content selection
- Content highlighting
- Search results highlighting
- Dark / Light theme selection
- Dynamic content load / purge
- Safe area zoom (to allow any interface to be expanded)
- Page separators
- Resize management

### Flow Content Features

- Mouse and Touch based vertical or horizontal scrolling
- Default font selection
- Font size
- Line height
- Text body align

### Fixed Content Features

- Mouse and Touch based Zooming and Panning (avoiding iScroll)
- Fit to width and height
