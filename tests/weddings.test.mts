import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { BASE_PATH, withBasePath } from "../lib/base-path.ts";
import { mediaUrl, resolveWeddingFile } from "../lib/assets.ts";
import { getWedding, listWeddings } from "../core/registry.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function collectPaths(value: unknown, paths: string[] = []): string[] {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("/api/")) {
    paths.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectPaths(item, paths);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectPaths(item, paths);
  }
  return paths;
}

test("wedding slugs are unique and registered to a known template", () => {
  const weddings = listWeddings();
  const slugs = weddings.map((wedding) => wedding.slug);
  assert.deepEqual(slugs, ["wedding1", "aneena-bethrothal", "loyed-wedding"]);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const wedding of weddings) {
    assert.ok(["template1", "template2", "template3"].includes(wedding.template));
    assert.equal(getWedding(wedding.slug), wedding);
  }
});

test("unknown slugs are absent", () => {
  assert.equal(getWedding("wedding4"), undefined);
  assert.equal(getWedding("not-a-wedding"), undefined);
});

test("original customer content is preserved in each config", () => {
  const paper = getWedding("wedding1");
  const pink = getWedding("aneena-bethrothal");
  const sage = getWedding("loyed-wedding");
  assert.ok(paper && paper.template === "template1");
  assert.ok(pink && pink.template === "template2");
  assert.ok(sage && sage.template === "template3");

  assert.equal(paper.couple.bride, "Aneena");
  assert.equal(paper.couple.groom, "Loyed");
  assert.equal(paper.event.displayDate, "22 November 2026");
  assert.equal(paper.footer.date, "17 April 2027");
  assert.equal(paper.venue.mapsUrl, "YOUR_GOOGLE_MAPS_LINK");
  assert.equal(paper.seo.manifestName, "Aneena & Abin — Wedding");

  assert.equal(pink.event.displayDate, "15 November 2026");
  assert.equal(pink.venue.events[0].place, "St Francis Assisi Church");
  assert.equal(pink.sections.marquee, false);
  assert.match(pink.integrations.rsvpUrl, /^https:\/\/script\.google\.com\/macros\/s\//);

  assert.equal(sage.couple.firstName, "Loyed");
  assert.equal(sage.date.display, "22 / 11 / 2026");
  assert.equal(sage.copy.hero.handwrittenNote, "and somehow, here we are ♡");
  assert.equal(sage.venueDetails.events.church.mapUrl, "PASTE_CHURCH_GOOGLE_MAPS_LINK_HERE");
  assert.match(sage.integrations.photoUrl, /^https:\/\/script\.google\.com\/macros\/s\//);
});

test("configured public files exist and base path is applied once", () => {
  assert.equal(BASE_PATH, "/events");
  assert.equal(withBasePath("/weddings/wedding1/images/logo.png"), "/events/weddings/wedding1/images/logo.png");
  assert.equal(withBasePath("/events/weddings/wedding1/images/logo.png"), "/events/weddings/wedding1/images/logo.png");

  for (const wedding of listWeddings()) {
    for (const assetPath of collectPaths(wedding)) {
      const resolved = resolveWeddingFile(wedding.slug, assetPath);
      const browser = mediaUrl(wedding.slug, assetPath);
      assert.equal(browser.startsWith(`${BASE_PATH}/`), true);
      assert.equal(browser.includes(`${BASE_PATH}${BASE_PATH}`), false);
      const diskPath = path.join(root, "public", resolved);
      assert.equal(fs.existsSync(diskPath), true, diskPath);
    }
  }
});
