import type { LineContent } from "@/lib/content/types";
import { activeBrand } from "@/lib/brand";

/**
 * MODERNFOLD content — operable partitions (CSI 10 22 26). Every number below is
 * drawn from the authoritative Modernfold rows in the pm-intelligence-agent D1
 * parameter store (brand = 'Modernfold'); `source` strings match the D1
 * `source_doc` values so the page and the catalog agent cite the same documents.
 * Confirm against the manufacturer's current published spec at build
 * (plan Caveats) before launch.
 *
 * Unlike Skyfold, the Modernfold D1 data gives a single tested STC rating per
 * panel/skin configuration (not a system-vs-panel pair), so the models table
 * uses the free-form column layout rather than the acoustic STC-pair layout.
 */

const S_931 = "Modernfold Acousti-Seal 931 Spec Sheet rev. 2016-05";
const S_933E = "Modernfold Acousti-Seal 933E Spec Sheet rev. 2016-05";
const S_ENCORE = "Modernfold Encore Single Panel Spec Sheet rev. 2016-05";
const S_ENCORE_PAIR = "Modernfold Encore Paired Panel Spec Sheet rev. 2016-05";
const S_ACCORDION = "Soundmaster & Modernfold Accordion Spec Sheet rev. 2015-10";
const S_GWS = "Modernfold GWS DRS Spec Sheet rev. 2010-09";
const PB_HEADER = "PM Master Playbook Sec 2 (Modernfold header support)";
const PB_POCKET = "PM Master Playbook Sec 2-3 (Modernfold pocket architecture)";
const PB_FLOOR = "PM Master Playbook Sec 3 (floor levelness / slab crowning)";
const PB_ACOUSTIC = "PM Master Playbook Sec 2 (Modernfold acoustic continuity)";

export const modernfoldContent: LineContent = {
  overview:
    "Modernfold Acousti-Seal is the workhorse operable partition — individual panels roll out of a stacking pocket along an overhead track to divide a room on demand, then store out of sight. Ratings run from a light STC 28 divider up to a steel-skin STC 56 acoustic wall (Encore), on partitions reaching roughly 30 ft tall. Because the panels hang from the structure above and stack into a pocket, the header steel, the pocket, the floor flatness, and the acoustic barrier above the track are all coordinated up front — that above-ceiling scope is where the rated STC is won or lost.",

  applications: [
    "Hotel ballrooms and banquet space subdivided for multiple simultaneous events, where panels must store compactly out of sight.",
    "Divisible meeting rooms, conference centers, and training suites needing a mid-range STC on a reasonable budget.",
    "School gymnasiums, cafetoriums, and multipurpose rooms — durable steel-skin faces with markerboard or tackboard options.",
    "Worship and event centers where a paired-panel Encore delivers the highest Modernfold STC with a flat, monolithic wall face.",
    "Glass-walled offices and demountable divisions where a transparent operable wall (GWS) is wanted instead of solid panels.",
  ],

  models: {
    caption:
      "Modernfold STC is the tested lab rating for the panel and skin configuration ordered — steel-skin panels reach the highest ratings. Panel weight drives the header and track-support design. Confirm the exact STC for your chosen finish against the current spec sheet.",
    columns: ["Series", "Model", "STC (lab)", "Panel", "Std width", "Panel weight"],
    rows: [
      { cells: ["Acousti-Seal", "931", "28 / 41 / 47 / 50; 50 / 52 steel-skin", "3 in", "48 in", "6–11 lbs/ft²"] },
      { cells: ["Acousti-Seal", "933E (electric)", "41 / 47 / 50; 28 / 45 / 50 / 52 steel-skin", "3 in", "48 in", "6–11 lbs/ft²"] },
      { cells: ["Encore", "Single Panel", "52 / 54 / 56", "4.25 in", "51 in", "8.2 / 9.5 / 11.9 lbs/ft²"] },
      { cells: ["Encore", "Paired Panel", "52 / 54 / 56", "4.25 in", "51 in", "8.2 / 9.5 / 11.9 lbs/ft²"] },
      { cells: ["Accordion", "Soundmaster / 800 / 1200", "flexible-face acoustic", "—", "—", "27 oz/yd² min face"] },
      { cells: ["GWS", "DRS / Compactline (glass)", "non-acoustic glass", "1.6–1.9 in rail", "48 in panel", "—"] },
    ],
  },

  technical: [
    {
      title: "Acoustics & panels",
      facts: [
        { label: "Acousti-Seal STC — steel skin", value: "50, 52 (931 / 933E)", source: S_931 },
        { label: "Encore STC range", value: "52, 54, 56", source: S_ENCORE },
        { label: "Acousti-Seal panel", value: "3 in thick, 48 in standard width", source: S_931 },
        { label: "Encore panel", value: "4.25 in thick, 51 in standard width", source: S_ENCORE },
        { label: "Panel weight range", value: "6–11.9 lbs/ft² depending on STC and skin", source: S_ENCORE },
      ],
    },
    {
      title: "Suspension & bottom seal",
      facts: [
        { label: "Suspension #14 track", value: "7-gage (0.18 in), 1/2 in hanger rod", source: S_933E },
        { label: "Suspension #17 track", value: "11-gage (0.12 in), 3/8 in hanger rod", source: S_931 },
        { label: "Suspension #30 carrier", value: "3 in carrier wheel, 3/8 in hanger rod", source: S_933E },
        { label: "Bottom seal (IA2) clearance", value: "2 in nominal; +0.5 / -1.5 in operating range", source: S_933E },
        { label: "Bottom seal (floating)", value: "3.5 in nominal; +0.5 / -3 in operating range", source: S_933E },
        { label: "Encore seal downward force", value: "120 lbs", source: S_ENCORE },
      ],
    },
    {
      title: "Drive & operation (933E)",
      facts: [
        { label: "Motor speed", value: "28 ft/min", source: S_933E },
        { label: "Motor options", value: "115 V/1-ph to 460 V/3-ph, 1–1.5 HP", source: S_933E },
        { label: "Accordion double-row height threshold", value: "Soundmaster-8: 10 ft; Modernfold-800: 13 ft", source: S_ACCORDION },
      ],
    },
    {
      title: "Warranty",
      facts: [
        { label: "Acousti-Seal / accordion system", value: "2 years", source: S_931 },
        { label: "Encore partition system", value: "3 years", source: S_ENCORE },
        { label: "933E standard hinges", value: "Lifetime", source: S_933E },
        { label: "GWS glass panels", value: "2 years", source: S_GWS },
      ],
    },
  ],

  gcReadiness: {
    intro:
      "Modernfold panels hang from the structure above and stack into a pocket, so the header, pocket, floor, and plenum are the general contractor's and design team's scope. Coordinate these before the track goes up — they are the usual sources of delay and of a missed acoustic rating.",
    items: [
      { label: "Header / track support", detail: "Track support structure detailed for the concentrated load of all panels stacked in the pocket — a header that sags under the stacked load misaligns the track, binds the panels, and fails the bottom seals.", source: PB_HEADER },
      { label: "Stacking pocket dimensioned", detail: "Pocket depth and width shown on plan, not assumed. An undersized pocket leaves panels protruding into the room and pocket doors that will not close.", source: PB_POCKET },
      { label: "Floor flatness stated", detail: "A floor flatness tolerance called out in the specifications or general notes — drop-down bottom seals fail against an undulating slab and the specified STC is missed.", source: PB_FLOOR },
      { label: "Pocket clear of devices", detail: "No switches, outlets, or thermostats inside the stacking-pocket perimeter; a device in the pocket blocks the stack.", source: PB_POCKET },
      { label: "Plenum acoustic barrier", detail: "A full-height acoustic baffle indicated directly above the full track line — without it sound flanks over the partition through the open plenum and the rated STC is never achieved, even with a perfect wall.", source: PB_ACOUSTIC },
    ],
  },

  finishes:
    "Standard faces include reinforced vinyl (min 21 oz/lineal yard), heavy-duty vinyl (30 oz), acoustical carpet, wall-covering or upholstery fabric, or customer-supplied material (factory approval required). Rigid faces — full-height steel markerboard, cork tackboard, high-pressure laminate, or wood veneer on MDF — are available on Acousti-Seal 931/933E; the steel-skin Encore takes markerboard and tackboard but not laminate or veneer, and accordion partitions accept flexible vinyl/carpet/fabric faces only. The 931 adds a fourth NAUF-MDF skin option to the 933E finish list.",

  resources: [
    { label: "Modernfold CAD / BIM & 3-part specs", kind: "link", note: "Authoritative, manufacturer-updated — linked, not mirrored.", href: "https://www.modernfold.com" },
    { label: "Acousti-Seal & Encore spec sheets (CSI 10 22 26)", kind: "link", note: "Download the current guide specs from ARCAT.", href: "https://www.arcat.com" },
    { label: `${activeBrand.name} Modernfold header, pocket & plenum readiness checklist`, kind: "host", note: "Dealer value-add — the GC coordination list above as a one-page PDF." },
    { label: `${activeBrand.name} regional Modernfold installations`, kind: "host", note: "Ohio project photography and references." },
  ],
};
