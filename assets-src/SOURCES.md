# Model Sources — Healing Train

Downloaded 2026-10-17. All models are by **Quaternius** (https://quaternius.com),
license **CC0-1.0** (public domain dedication — free for any use, no attribution required).

Files were obtained from the GitHub mirror repo
[`trebeljahr/quaternius-showcase`](https://github.com/trebeljahr/quaternius-showcase)
(raw file URLs below). That repo's `LICENSES.md` lists the license and upstream
source page for each pack:

- `nature_pack` → "Ultimate Nature Pack", CC0-1.0, https://quaternius.com/packs/ultimatenature.html
- `buildings_pack_2` (stored in folder `public/glb/buildings_pack_3/`) →
  "Ultimate Buildings Pack", CC0-1.0, https://quaternius.com/packs/ultimatetexturedbuildings.html

License evidence:
- https://github.com/trebeljahr/quaternius-showcase/blob/main/LICENSES.md (per-pack table, rows `nature_pack` and `buildings_pack_2`, both "CC0-1.0")
- https://github.com/trebeljahr/quaternius-showcase/blob/main/README.md ("The model files under `public/glb/` are © Quaternius. Each pack keeps its upstream license.")
- Quaternius releases all of his free packs under CC0 (see the pack pages above).

## Files

| Local file | Size (bytes) | Original file | Pack | Download URL |
|---|---|---|---|---|
| `models/pine-tree.glb` | 106,060 | `PineTree_1.glb` | Ultimate Nature Pack (Quaternius, CC0-1.0) | https://raw.githubusercontent.com/trebeljahr/quaternius-showcase/main/public/glb/nature_pack/PineTree_1.glb |
| `models/tree-leafy.glb` | 158,708 | `CommonTree_1.glb` | Ultimate Nature Pack (Quaternius, CC0-1.0) | https://raw.githubusercontent.com/trebeljahr/quaternius-showcase/main/public/glb/nature_pack/CommonTree_1.glb |
| `models/rock.glb` | 8,884 | `Rock_4.glb` | Ultimate Nature Pack (Quaternius, CC0-1.0) | https://raw.githubusercontent.com/trebeljahr/quaternius-showcase/main/public/glb/nature_pack/Rock_4.glb |
| `models/bush.glb` | 21,348 | `Bush_1.glb` | Ultimate Nature Pack (Quaternius, CC0-1.0) | https://raw.githubusercontent.com/trebeljahr/quaternius-showcase/main/public/glb/nature_pack/Bush_1.glb |
| `models/house.glb` | 122,592 | `1Story_GableRoof_Mat.glb` | Ultimate Buildings Pack (Quaternius, CC0-1.0) | https://raw.githubusercontent.com/trebeljahr/quaternius-showcase/main/public/glb/buildings_pack_3/1Story_GableRoof_Mat.glb |
| `models/house-2.glb` | 216,460 | `2Story_GableRoof_Mat.glb` | Ultimate Buildings Pack (Quaternius, CC0-1.0) | https://raw.githubusercontent.com/trebeljahr/quaternius-showcase/main/public/glb/buildings_pack_3/2Story_GableRoof_Mat.glb |

## Verification (done at download time)

- Every file starts with the `glTF` binary magic; the GLB header's declared
  length equals the actual file size; sizes match the mirror repo's tree listing.
- Every file is a single self-contained GLB: one embedded buffer, **no external
  buffer or image URIs** — the houses use plain materials (no texture files to
  chase), so they load in Three.js GLTFLoader with no extra assets.
- Note for integration: real-world scale lives in the node transforms, not the
  raw vertex data — measure with `THREE.Box3.setFromObject()` after load and
  scale to taste.

## Notes

- kenney.nl was not contacted (per project constraint). A Kenney "Nature Kit"
  in glTF form was not found in the GitHub mirrors checked (the Kenney models in
  `beep2bleep/FreeAssetsByKenneyNLandQuaternius` are FBX/OBJ only, and the
  Quaternius set there is also FBX/OBJ/Blend). Not needed: the Quaternius set
  above covers all wanted models in one consistent style.
- More variants are available from the same mirror if wanted: pines ×5
  (plus autumn/snow versions), common/birch trees, rocks ×7, snow/moss rocks,
  berry bushes, and 25 more buildings — all CC0-1.0, same URLs pattern.
