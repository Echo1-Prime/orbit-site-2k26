# home-from-handoff

`build_home.py` regenerates `components/Home/HomeBands.tsx`, `components/Home/HomeBands.module.css` and
`styles/ao/home.css` from the design handoff template `Echo 1 Labs Home.dc.html`.

    python3 -I scripts/home-from-handoff/build_home.py <repo root>

The source path is set at the top of the script (the handoff folder). Responsive values, the removed
use-case band and the omitted `[STAT:*]` line are encoded in the script, so a new handoff export can be
re-applied without hand-editing the generated file. State and data live in `components/Home/useHomeVals.tsx`
and `home-data.ts`.
