# Résumé

The "Download Résumé" button on the site links to:

```
public/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf
```

**This PDF is intentionally not committed yet.**

Until the real file exists, the button is rendered in a clearly **disabled**
state (marked "soon") rather than as a broken link. This behavior is controlled
by a single flag in [`lib/site.ts`](../../lib/site.ts):

```ts
resume: {
  available: false, // ← set to true once the PDF below exists
  path: "/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf",
  ...
}
```

## To enable the résumé download

1. Drop the final PDF into this folder using exactly this filename:
   `Patrick_Hourihan_AI_Junior_Developer_Resume.pdf`
2. Set `resume.available` to `true` in `lib/site.ts`.
3. Rebuild. The button becomes an active download link automatically.

Keep the filename in sync between the actual file and `lib/site.ts`.
