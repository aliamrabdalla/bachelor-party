// ─────────────────────────────────────────────────────────────────────────────
// EDIT ME. This is the single source of truth for all text/content on the site.
// Everything below with a TODO is a placeholder — swap in the real details.
// ─────────────────────────────────────────────────────────────────────────────

// The moment the bachelor party officially begins. Drives the countdown.
// Format: ISO 8601 with timezone offset. TODO: set the real date/time.
export const PARTY_START = "2026-08-14T17:00:00-05:00";

export const SITE = {
  title: "The Bachelor Party", // TODO: e.g. "Mike's Last Ride"
  subtitle: "Scroll to wander the weekend", // shown on the loading screen
};

// The four stops on the infinite loop, in scroll order. The `key` ties a section
// to its visual layers in src/config/sections.js. Reorder this array to reorder
// the journey (also update sections.js to match).
export const SECTIONS = [
  {
    key: "couple",
    label: "The Groom & His Bride",
    accent: "#c2453f", // paper/info-panel accent color for this stop
    panel: {
      heading: "The Groom & His Bride", // TODO
      body: "TODO: A few words about the groom and his wife — how they met, the wedding, why we're all here to send him off in style.",
      // Optional bullet facts. Delete or add freely.
      facts: ["TODO: Groom's name", "TODO: Wife's name", "TODO: Wedding date"],
    },
  },
  {
    key: "airbnb",
    label: "The Airbnb",
    accent: "#3f7cc2",
    panel: {
      heading: "Home Base",
      body: "TODO: Describe the Airbnb — where it is, what makes it great, the hot tub / view / game room, check-in details.",
      facts: [
        "TODO: Address / city",
        "TODO: Check-in time",
        "TODO: Wifi / door code",
      ],
    },
  },
  {
    key: "activities",
    label: "The Weekend",
    accent: "#e0a43b",
    panel: {
      heading: "What We're Doing",
      body: "TODO: Overview of the weekend's plans.",
      // For activities a schedule list reads better than free text.
      facts: [
        "TODO: Fri night — ____",
        "TODO: Sat day — ____",
        "TODO: Sat night — ____",
        "TODO: Sun — ____",
      ],
    },
  },
  {
    key: "packing",
    label: "Get Ready",
    accent: "#4c9e5a",
    panel: {
      heading: "Pack & Prep",
      body: "TODO: Anything everyone needs to know before they arrive.",
      facts: [
        "TODO: Swimsuit",
        "TODO: Cash for ____",
        "TODO: ID",
        "TODO: Good shoes",
      ],
    },
  },
];
