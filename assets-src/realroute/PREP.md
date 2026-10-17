# Real-Route Data Prep — CP Line, Lake Louise → Banff → Canmore

Prepared 2026-10-17 for the healing-train "real route" mode; extended to Lake Louise the
same day. All data lives in this folder.

## Files

| File | What it is |
|---|---|
| `route_raw.json` | First Overpass response (47.8 KB): 26 `railway=rail` ways in bbox (51.05, −116.25)–(51.30, −115.30), with geometry. |
| `route_raw_ext.json` | Extension Overpass response (67.2 KB): 39 ways in bbox (51.25, −116.30)–(51.48, −115.95), fetched to reach Lake Louise. One way id overlaps the first fetch; 64 unique ways total. |
| `stitched.json` | **The route**: main line as one continuous polyline, `[lat, lon]` pairs ordered west → east, starting at Lake Louise station. |
| `stitched_v1.json` | Previous version of `stitched.json` (Castle Junction area → Canmore, 426 pts / 66.21 km), kept for reference. All 426 of its points lie on the new polyline. |
| `stitched_full.json` | The longest continuous main-line chain in the fetched data (954 pts / 104.06 km): Canmore ↔ the west edge of the fetch bbox, passing Lake Louise. See the paired-track note below before using it. |
| `tiles_elev/{x}_{y}.png` | Terrarium-format elevation tiles (zoom 12) covering the `stitched_full.json` bbox (a superset of the `stitched.json` bbox). Decode: `elev_m = R*256 + G + B/256 − 32768`. |

## The route (stitched.json)

- **Line**: Canadian Pacific (CPKC) **Laggan Subdivision** — the real CP main line through Banff National Park.
- **Points**: 574
- **Length**: 83.44 km (haversine sum), built from OSM `usage=main` ways joined exactly at shared node ids.
- **Bounding box**: lat 51.06965 … 51.42727, lon −116.18425 … −115.29893
- **West end**: (51.42727, −116.18425) — the point on the track closest to **Lake Louise station**
  (reference ≈ 51.428, −116.183): **119 m** from the station reference point. The west end was
  set by projecting the station onto the line, so the route starts at the station rather than
  at a way boundary.
- **East end**: (51.06965, −115.29893) — just east of Canmore (unchanged from v1).
- Passes through **Banff** (townsite ≈ 51.18, −115.57) and **Canmore** (≈ 51.09, −115.35).

### How the extension was stitched

- Both fetches combined: 64 unique ways → 48 with `usage=main`. Excluded as non-main:
  16 ways (5 siding, 10 yard, 1 spur — Banff, Canmore, and Lake Louise areas).
- The main-line graph is a single connected component; the chain was chosen as the longest
  simple path through it, which automatically drops parallel second tracks (below).
- Excluded as parallel track: way 583770669 near Banff (2.45 km, shares both endpoints with
  the chain — the second track of a double-track section), as in v1.
- **Paired alignments west of Lake Louise**: for ~10 km west of the station the line is mapped
  as two parallel `usage=main` alignments that share junctions only at the station
  (51.42577, −116.18200) and at (51.45148, −116.30588). `stitched.json` does not enter this
  section (it starts at the station). `stitched_full.json` traverses it out on one alignment
  and back on the other, ending at (51.43241, −116.19514); the only main-line segment used by
  neither file is way 1328815886 (1.18 km, one of the two station-area alignments).

## Gaps

- **Unclosed gaps: 0.** Consecutive ways share endpoint node ids exactly, so the polyline is
  topologically continuous end to end — in both `stitched.json` and `stitched_full.json`.
- Point spacing varies because OSM geometry is sparse on straight stretches: median ≈ 78 m.
  28 inter-point stretches exceed 500 m; the widest is **2.32 km** between
  (51.33240, −116.04741) and (51.31678, −116.02517) on the straight stretch west of Castle
  Junction (two consecutive nodes of a single way — sparse mapping, not a break). Next
  widest: 1.13 km near (51.30018, −116.00000).

## Elevation tiles (tiles_elev/)

- **Source**: AWS Terrain Tiles (terrarium encoding), `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/12/{x}/{y}.png`
- **Zoom 12**. Coverage: x 724–736, y 1362–1369 → **104 tiles** (54 added by the extension;
  the original 50 covered x 727–736, y 1365–1369). All verified as real PNGs (magic bytes).
- **Total size**: 3.57 MB.

## Licenses

- **Railway geometry** — © OpenStreetMap contributors, available under the **Open Database
  License (ODbL)**. Source responses: `route_raw.json` and `route_raw_ext.json` (Overpass API,
  osm base timestamp 2026-10-17). Attribution to OpenStreetMap is required when the route is
  displayed.
- **Elevation tiles** — open terrain data from the **Mapzen / AWS Terrain Tiles** open data
  program (hosted on AWS Open Data, `s3.amazonaws.com/elevation-tiles-prod`). The underlying
  elevation sources (USGS, NASA SRTM, and others) are public/open data; Mapzen's tile service
  terms ask for attribution of the source data where practical.
