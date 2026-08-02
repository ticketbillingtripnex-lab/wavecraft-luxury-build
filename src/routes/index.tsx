import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// The whole website is a plain static HTML/CSS/JS site living in /public.
// This route simply sends "/" to the static home page (public/index.html).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MGH WaveCraft | Luxury Fiberglass Boat Builders in the Maldives" },
      {
        name: "description",
        content:
          "MGH WaveCraft builds high-performance fiberglass boats, passenger ferries, excursion vessels and supply boats at our Thimarafushi boatyard in the Maldives.",
      },
      { property: "og:title", content: "MGH WaveCraft | Luxury Fiberglass Boat Builders" },
      {
        property: "og:description",
        content:
          "Precision engineered. Built in Maldives. Trusted across the Indian Ocean.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/index.html");
  }, []);

  return null;
}
