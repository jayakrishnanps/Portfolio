# Portfolio design direction

The site should let a hiring manager assess full-stack work quickly. The visual design should demonstrate judgment through hierarchy, accurate project material, consistent interactions, and responsive layouts.

## Research findings

- [Anthropic: Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills) describes how models converge on common design patterns without a specific direction. This is evidence of a default tendency, not a reliable test of whether a particular website was made by a human or AI.
- [NN/g: Good Visual Design, Explained](https://www.nngroup.com/articles/good-visual-design/) emphasizes grids, hierarchy, typography, and consistent application of design decisions.
- [NN/g: The Role of Animation and Motion in UX](https://www.nngroup.com/articles/animation-purpose-ux/) recommends brief, purposeful feedback instead of distracting motion.
- [web.dev: High-performance CSS animations](https://web.dev/articles/animations-guide) recommends transform and opacity for efficient movement.
- [web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) explains honoring the operating system's motion preference.

## Applied decisions

- Retain the editorial foundation; pair a large Instrument Serif name with DM Sans body copy and IBM Plex Mono metadata. The name appears once.
- Give the primary project a full-width feature layout, followed by two smaller project presentations. Avoid assigning every section the same card structure.
- Use diagrams of documented project features, clearly labeled as diagrams. Do not present invented screenshots, metrics, employers, or implementation details as evidence.
- Use a neutral reading surface, green for the learning diagram and contact section, and distinct subdued colors for the remaining diagrams.
- Keep navigation available while scrolling and indicate the current section. Retain native project disclosures, visible focus states, skill filters, and the email-draft form.
- Use a 620 ms entrance with short staggered delays, 260 ms disclosure and filter transitions, and small hover movements. All effects are finite. There is no scroll hijacking or pointer follower.
- Keep content visible without JavaScript. Respect reduced motion in CSS and JavaScript, including preference changes during animation.
- Adapt diagrams at smaller widths rather than shrinking their text. Main content uses readable type sizes; metadata uses at least 12 px.

The professional copy and résumé-grounded claims from the previous revision remain the content baseline. Future improvements should prioritize actual project screenshots or links supplied by the owner over decorative assets.
