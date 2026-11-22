# Website design system

## Square corners

Use square corners with a border radius of zero throughout the website. This applies to images, figures, cards, buttons, inputs, menus, dialogs, and other rectangular elements. Keep corners square in the source artwork too, including boxes drawn inside diagrams. Use circular shapes when the content itself calls for them, such as plotted points or the geometry being explained.

The shared radius tokens live in `app/globals.css`. Use `rounded-none` when a component needs an explicit override.

## Explanatory figures

Use the prime-count staircase in the Riemann hypothesis essay as the reference for original charts, diagrams, and code figures. Use Latin Modern for titles and labels, off-white paper (#faf9f7), charcoal text (#22272b), slate secondary labels (#4a5568), and fine grid lines (#d3d9de). Use blue (#245b99) and green (#326f64) to distinguish meaningful series or points, with direct labels so the figure also reads without color. Keep figures static and label axes, inputs, and outputs when applicable. Preserve the appearance of attributed source screenshots and illustrations.

## Optional prose check

Run node scripts/check-writing.mjs with a plain-text file path, or use - to read from stdin. The command submits only the text you pass to Pangram using the local PANGRAM_API_KEY. Review flagged prose against the author's voice. Treat the scores as an editorial signal.
