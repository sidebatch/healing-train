# Prop sources
- prop_pine.png: AI-generated pine tree photo (white background), background keyed out with a luminance/saturation alpha ramp + white-fringe removal, cropped and resized to 512 wide. Generated 2026-10-21 for this app.
- In-app: cylindrical billboards (InstancedMesh planes, alphaTest) replacing 3D pine/round trees in MEADOW/FOREST chunks.
- prop_house.png: AI-generated log cabin photo (white background), same keying pipeline, 640 wide. Billboard houses in MEADOW.
- prop_palm.png: AI-generated coconut palm photo (white bg), keyed with the same whiteness/saturation pipeline as the pine (2026-10-21). Deployed 512x1065. Used as billboards in the COAST (해변) biome; replaces 3D palms there.
- ground_coast.jpg v2: regenerated cleaner — mostly clean pale sand, sparse specks only (v1's grass tufts + green vertex colors read as swamp; COAST palette ground colors also changed green -> pale sand in SW v15).
