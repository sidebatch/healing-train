# 힐링 기차 — 남은 바이옴 사진화 스펙 (2026-10-21 준비)

사용자 지시: "다른 사막 바다 등등도 숲 초원처럼 이미지로" (2026-10-21 13:28 UTC) +
해변 개편 (2026-10-21 13:41 UTC, SW v15로 배포 완료).
이 문서는 그 지시의 **아직 안 끝난 나머지**를, 기존에 검증된 방식 그대로 실행할 수 있게 정리한 것이다.
새 결정을 만들지 않았다 — 자산 규격·처리·코드 삽입 지점은 전부 v14·v15에서 쓴 방식의 복사다.

## 현재 상태 (2026-10-21 14:38 UTC, 로컬 파일 직접 확인)

사진화가 끝난 바이옴 4개:
- MEADOW 초원: pano_rockies.jpg + ground_meadow.jpg + prop_pine.png·prop_house.png·ground_field.jpg
- FOREST 숲: pano_rockies.jpg + ground_forest.jpg + prop_pine.png
- DESERT 노을 사막: pano_desert.jpg + ground_desert.jpg (소품은 아직 3D 선인장 cactusGeom)
- COAST 해변: pano_coast.jpg + ground_coast.jpg (v2, 깨끗한 모래) + prop_palm.png

아직 사진이 없는 바이옴 3개 (`train3d.html` PALS 기준):
- SUNSET 노을 호수 — pano 없음, ground 없음. 현재 HDRI sunset 하늘 + 코드 지형색만.
- SNOW 눈 내리는 마을 — pano 없음, ground 없음. 소품 pineSnow는 3D.
- ALPINE 설산 — pano 없음, ground 없음. 소품 pineSnow·rock은 3D.
- NIGHT 밤하늘 아래 — **제외 확정**: 별하늘 유지가 기존 결정 (메모리 2026-10-21). 사진화 대상 아님.

## 만들 자산 (기존 규격 그대로)

### 1. 파노라마 3장 — equirectangular 2048x1024, 원본은 assets-src/pano/에 보관
- `assets/pano_sunset.jpg` (SUNSET): 노을빛 호수 파노라마 — 잔잔한 호수면, 노을 반사, 멀리 낮은 언덕·숲 실루엣. SUNSET 팔레트 sky 0xfb9a4e와 어울리게 따뜻한 오렌지 톤. 호수 구간(line 999 SUNSET 호수 생성)과 겹쳐도 위화감 없게 수평선은 낮게.
- `assets/pano_snow.jpg` (SNOW): 눈 덮인 마을·언덕 파노라마 — 밝은 회청 하늘(팔레트 sky 0xcfdde8), 눈 언덕, 멀리 소나무 숲. 과노출 백색 금지 (지면 사진과 경계가 안 보여야 함).
- `assets/pano_alpine.jpg` (ALPINE): 설산 파노라마 — 뾰족한 눈 봉우리 능선, 바위 절벽. 단, MEADOW/FOREST에서 쓰는 pano_rockies와 화면이 겹쳐 보이면 안 되므로 구도를 겨울·고지대 위주로 차별화.
- 처리: pano_desert처럼 필요하면 하단 8% 크롭 후 2048x1024. 생성 원본+JSON은 assets-src/pano/에 남기고 SOURCE.md에 한 줄씩 추가.

### 2. 지면 텍스처 3장 — top-down aerial 1024x1024, assets-src/ground/에 원본 보관
- `assets/ground_sunset.jpg` (SUNSET): 노을 호수 주변 풀·흙 지면. 기존 ground_desert처럼 정점색과 곱해지므로 밝기 +10% 내외 보정 후 배포.
- `assets/ground_snow.jpg` (SNOW): 밟힌 눈·드문 발자국 질감의 눈 지면. SNOW 팔레트 gA가 이미 0xf0f5f9(거의 흰색)라 **정점색과 곱하면 순백으로 날아갈 위험** — 텍스처는 회청 그림자가 살아 있는 쪽으로 만들고, 필요하면 SNOW 팔레트 gA/gB를 살짝 낮추는 것까지가 한 세트.
- `assets/ground_alpine.jpg` (ALPINE): 눈+바위가 섞인 고지대 지면.

### 3. 사진 소품 빌보드 2종 — 흰 배경 사진 생성 → 기존 키잉 파이프라인 (assets-src/props/SOURCE.md 방식)
- `assets/prop_cactus.png` (DESERT): 사구아로 선인장 사진 1종, 512폭. 현재 3D cactusGeom (train3d.html line 423, 청크 플랜 DESERT cactus=24)을 대체.
- `assets/prop_pine_snow.png` (SNOW·ALPINE): 눈 덮인 소나무 사진 1종, 512폭. 현재 3D pineSnow (SNOW 48개·ALPINE 26개)를 대체.
- 키잉: prop_pine·prop_palm과 동일 — luminance/saturation alpha ramp + white-fringe 제거, alphaTest 0.45, DoubleSide 빌보드.

## 코드 삽입 지점 (train3d.html, 현재 v15 기준 — 전부 기존 패턴 확장)

1. line 207 `PANO_BG`에 추가: SUNSET 0xf2a56b 계열, SNOW 0xcfdde8, ALPINE 0xd7e6f2 (각 팔레트 sky와 일치).
2. line 214 파노라마 로드 루프 배열에 `['SUNSET','assets/pano_sunset.jpg']`, `['SNOW','assets/pano_snow.jpg']`, `['ALPINE','assets/pano_alpine.jpg']` 추가.
   - 주의: pano는 `pal.night <= 0.6`일 때만 표시됨 (line 2123). SUNSET night=0.25라 통과. SNOW·ALPINE night=0이라 통과.
   - 주의 2: pano가 켜지면 코드 능선(ridgeMat)이 페이드 아웃되는 기존 동작이 그대로 적용됨 — 설산에서 뾰족 가짜 산이 사진 봉우리와 겹치는 문제는 이걸로 자동 해결.
3. line 223 지면 로드 루프 배열에 `['SUNSET','assets/ground_sunset.jpg',8,14]`, `['SNOW','assets/ground_snow.jpg',8,14]`, `['ALPINE','assets/ground_alpine.jpg',8,14]` 추가.
4. 소품: prop_palm 로드 블록(line 257~) 패턴으로 cactus·pineSnow 빌보드 재질 로드 추가, 청크 빌드에서 해당 바이옴일 때 3D 지오메트리 대신 빌보드 InstancedMesh로 교체 (MEADOW/FOREST의 BB_SET 방식 재사용).
5. `index.html`은 `train3d.html`과 현재 바이트 단위 동일 파일 — 배포 시 둘 다 같은 내용으로 복사 유지.
6. `sw.js`: CACHE `healing-train-v15` → `healing-train-v16`, CORE 배열에 신규 자산 8개(pano 3 + ground 3 + prop 2) 추가.

## 배포 후 확인 (사용자 폰 판정 전에는 '완료'라고 말하지 않기)

- 라이브 파일에서 버전 문자열 v16과 신규 자산 200 응답 확인.
- 사용자가 볼 체크는 바이옴당 한 장씩: 노을 호수(호수 반사와 파노라마 수평선 경계), 눈 마을(지면이 순백으로 날아가지 않는지), 설산(사진 봉우리와 코드 능선 중복 없는지), 사막(선인장 빌보드가 위에서 얇게 보이지 않는지).
- README.md의 맵 설명은 배포와 같은 작업에서 갱신 (사진화 완료 바이옴 표기).

## 하지 않을 것

- NIGHT 사진화 (별하늘 유지 결정).
- 기차 3종·연결막 (SW v13에서 별도 진행, 이 스펙과 무관).
- 실제 노선 모드의 위성 지면 (별도 과제).
