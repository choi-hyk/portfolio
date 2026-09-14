import { redirect } from "next/navigation";

/** Keep old bookmarks working after the document view was renamed to Slides. */
export default function PdfPage() {
  redirect("/slides");
}
