# Résumé

The "Download Résumé" button links to:

```
public/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf
```

This PDF **is committed** and the button is **enabled** (`resume.available: true`
in [`lib/site.ts`](../../lib/site.ts)). It is a one-page, selectable-text PDF
tailored for a Junior Software Developer (AI-focused) application.

## Regenerating the PDF

The PDF is rendered from [`resume/resume.html`](../../resume/resume.html) (the
print source), with [`resume/Patrick_Hourihan_FIT_AI_Junior_Developer_Resume.md`](../../resume/Patrick_Hourihan_FIT_AI_Junior_Developer_Resume.md)
as the human-readable source of record. To regenerate after editing the HTML:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="public/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf" \
  "file://$PWD/resume/resume.html"
```

This uses headless Chrome (no extra dependencies) and produces searchable text,
not a screenshot. Keep the output to one page; tighten the HTML/CSS rather than
spilling to a second page.

## To disable the button again

Set `resume.available` to `false` in `lib/site.ts`.
