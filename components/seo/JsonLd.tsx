/**
 * Renders schema.org structured data. `<` is escaped so no string in the
 * payload can close the script tag (per the Next.js JSON-LD guide).
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
