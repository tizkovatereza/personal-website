# Website design system

## Square corners

Use square corners with a border radius of zero throughout the website. This applies to images, figures, cards, buttons, inputs, menus, dialogs, and other rectangular elements. Keep corners square in the source artwork too, including boxes drawn inside diagrams. Use circular shapes when the content itself calls for them, such as plotted points or the geometry being explained.

The shared radius tokens live in `app/globals.css`. Use `rounded-none` when a component needs an explicit override.
