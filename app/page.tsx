import { redirect } from "next/navigation";
import { getSiteOrigin } from "@/lib/site-url";

/** /events/ is not public; invitations live at /events/<slug>/ only. */
export default function EventsIndexPage() {
  redirect(getSiteOrigin());
}
