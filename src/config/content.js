// ─────────────────────────────────────────────────────────────────────────────
// EDIT ME. This is the single source of truth for all text/content on the site.
// Everything below with a TODO is a placeholder — swap in the real details.
// ─────────────────────────────────────────────────────────────────────────────

// The moment the bachelor party officially begins. Drives the countdown.
// Format: ISO 8601 with timezone offset. TODO: set the real date/time.
export const PARTY_START = "2026-07-31T15:00:00-04:00";

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
    shell: {
      floor: "#587a42",
    },
    panel: {
      heading: "Home Base in Davison",
      body: "Check in July 31 at 3:00 PM and settle into the Davison home base through August 2 at 10:00 AM. The pond is catch-and-release, fishing poles are provided, swimming is at your own risk, and the drive is about one hour from Birmingham/Southfield.",
      facts: [
        "4353 North Irish Road, Davison, MI 48423",
        "Check-in: July 31, 2026 at 3:00 PM",
        "Checkout: August 2, 2026 at 10:00 AM",
        "Quiet hours: 11:00 PM-7:00 AM",
        "Pond: catch-and-release fishing; poles provided; swim at your own risk",
        "Before checkout: towels to laundry, trash to the garage bin",
      ],
    },
    sceneMarkers: [
      {
        title: "Door Times",
        lines: ["Arrive 7/31 3 PM", "Leave 8/2 10 AM"],
        x: -5.08,
        y: 0.98,
        depth: -0.33,
        width: 92,
        distanceFactor: 4.65,
        className: "scene-marker--door",
      },
      {
        title: "Drive",
        lines: ["About 1 hour", "from Birmingham / Southfield"],
        x: -5.58,
        y: -0.82,
        depth: 0.32,
        width: 92,
        distanceFactor: 4.5,
        className: "scene-marker--drive",
      },
      {
        title: "Pond",
        lines: ["Catch and release", "Poles provided", "Swim at own risk"],
        x: 3.75,
        y: -0.92,
        depth: 0.22,
        width: 84,
        distanceFactor: 4.4,
        className: "scene-marker--pond",
      },
      {
        title: "House Rules",
        lines: ["Quiet 11 PM-7 AM", "Towels to laundry", "Trash to garage bin"],
        x: 6.05,
        y: -0.58,
        depth: 0.36,
        width: 88,
        distanceFactor: 4.45,
        className: "scene-marker--rules",
      },
    ],
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
