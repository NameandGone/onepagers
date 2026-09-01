# One-Pagers studio hero scene

## Purpose

The studio page should make the promise legible in one glance: we build small
tools for repetitive document work that is too specific for a generic app.
The hero stays calm and editorial, while a few paper artifacts make the work
feel real instead of decorative.

## Composition

- Canvas: a centered 1180px content frame, with a shallow top navigation and a
  hero min-height of 690px on desktop.
- Headline exclusion zone: the left 55% of the hero from y=130 to y=390 is
  reserved for the headline, one-sentence explanation, and tool links.
- Product mock: a two-layer extraction review card sits at x=535px, y=420px,
  bleeds toward the lower edge, and remains behind the copy's exclusion zone.
- Props: four independent SVG assets, each positioned separately and clipped by
  the hero scene: a closing disclosure sheet at top-left, a discovery index at
  top-right, a 1099/K-1 form at lower-left, and an annotated pencil strip at
  lower-right.
- Depth: each prop gets its own subtle drop shadow and a slightly different
  rotation; the review card uses a flatter shadow so the paper props read as
  objects and the product mock reads as the actual tool.

## Restraints

- Keep the prop palette to paper white, ink navy, muted blue, and one teal
  accent already used by the extractor pages.
- Use no gradients, stock icon set, or abstract blob decoration.
- Keep each prop's SVG self-contained so it can be inspected, reused, and
  independently moved without rebuilding the composition.
- On mobile, hide the two rear props and keep only the document stack behind the
  copy; the upload-tool links must remain the dominant action.

## Accessibility and motion

- Props are decorative images with empty alt text; the real product names and
  actions remain in HTML.
- The product mock uses ordinary HTML text, not text baked into an image.
- Motion is limited to a small hover lift on tool cards and respects reduced
  motion preferences.
