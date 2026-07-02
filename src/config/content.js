// Single source of truth for visitor-facing content and the countdown date.

export const PARTY_START = "2026-07-31T15:00:00-04:00";

export const SITE = {
  title: "Youssef's Bachelor Weekend",
  subtitle: "A four-stop agenda for the weekend",
};

export const SECTIONS = [
  {
    key: "couple",
    label: "The Groom & His Bride",
    accent: "#c2453f",
    shell: {
      floor: "#8b3d32",
    },
    panel: {
      heading: "Youssef & Gabi",
      body: "Before the weekend gets going, a quick nod to why everyone is here: Youssef is getting married. The wedding is August 7, so this is the last weekend before the official handoff to married life.",
      facts: [
        "Wedding: Friday, August 7, 2026",
        "Bachelor weekend: Friday, July 31-Sunday, August 2, 2026",
      ],
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
      heading: "The Davison Airbnb",
      body: "Check in Friday afternoon and stay through Sunday morning. This is where everyone meets up, sleeps, fishes, grills, and resets between plans.",
      facts: [
        "Address: 4353 North Irish Road, Davison, MI 48423",
        "Check-in: Friday, July 31, 2026 at 3:00 PM",
        "Checkout: Sunday, August 2, 2026 at 10:00 AM",
        "Drive: about 1 hour from Birmingham / Southfield",
        "Quiet hours: 11:00 PM-7:00 AM",
        "Pond: catch-and-release fishing; poles provided; swim at your own risk",
        "Before checkout: towels to laundry, trash to the garage bin",
      ],
      actions: [
        {
          label: "Open Airbnb Invite",
          href: "https://www.airbnb.com/l/TSnV4z6P?s=67&unique_share_id=38b2c422-b911-47e9-a68d-60705937b4db",
        },
      ],
    },
  },
  {
    key: "activities",
    label: "The Weekend",
    accent: "#e0a43b",
    shell: {
      floor: "#6c7f3e",
    },
    panel: {
      heading: "Boat, Brisket, Games, Fire",
      body: "Saturday is the main day: Holloway Reservoir in the morning, three brisket options, field day games, and a fire at night.",
      facts: [
        "Morning: Holloway Reservoir",
        "Food: three brisket options",
        "Field day: Spikeball, volleyball, cones, and other games",
        "Night: fire at the Airbnb",
      ],
    },
  },
  {
    key: "packing",
    label: "Get Ready",
    accent: "#4c9e5a",
    shell: {
      floor: "#4b6f41",
    },
    panel: {
      heading: "Packing List",
      body: "Pack for the actual weekend: Friday arrival, the boat, field day, night by the fire, and game night.",
      facts: [
        "Friday basics: duffel, casual clothes, sleepwear, toiletries, phone charger, wallet, medications",
        "Boat morning: swimsuit or wet clothes, towel, sunscreen, sunglasses, hat, water bottle, sandals or water shoes",
        "Field day: athletic shirt and shorts, sneakers, socks, bug spray, small day bag",
        "Night and fire: hoodie, light jacket, comfortable pants, blanket, optional camp chair",
        "Game night: board games and gaming",
      ],
    },
  },
];
