#!/usr/bin/env python3
"""Entity evidence 2026-10-16: SOS file 0806419373 is TRILOGY 583 LLC (formed 2026-01-30, ACTIVE).
A Form 424 amendment renaming it to Echo 1 Labs LLC was signed 2026-07-27 but is not on file
at SOS as of 2026-10-16 (Comptroller mirrors SOS status each business day). Gate stays closed."""
import pathlib

def rep(path, old, new):
    p = pathlib.Path(path); s = p.read_text()
    assert old in s, f'ANCHOR MISSING in {path}: {old[:80]}'
    p.write_text(s.replace(old, new, 1))

T = 'lib/legal/terms-of-service.ts'
rep(T,
    """      '". Must match character for character; the certificate wins. Set ENTITY_NAME_VERIFIED once matched.',""",
    """      '". Must match character for character; the certificate wins. Evidence 2026-10-16: Texas SOS file 0806419373 is of record as TRILOGY 583 LLC (formed 2026-01-30, ACTIVE); a certificate of amendment renaming it to Echo 1 Labs LLC was signed 2026-07-27 but does not yet appear on file. Until the amendment is filed and reflected at SOS, this name is not verified. Set ENTITY_NAME_VERIFIED once matched.',""")
rep(T,
    "    note: 'Effective Date must be the LLC formation date or later. Set EFFECTIVE_DATE.',",
    "    note: 'Effective Date must be on or after the LLC formation date (2026-01-30 per SOS file 0806419373) and on or after the date the name amendment is filed. Owner sets EFFECTIVE_DATE.',")

P = 'lib/legal/privacy-policy.ts'
rep(P,
    """    note: 'Filed name on the Texas certificate of formation must match "' + LEGAL_ENTITY + '" character for character.',""",
    """    note: 'Filed name on the Texas certificate of formation must match "' + LEGAL_ENTITY + '" character for character. Evidence 2026-10-16: SOS file 0806419373 is of record as TRILOGY 583 LLC; the renaming amendment signed 2026-07-27 is not yet on file.',""")
print('ENTITY_V14_OK')
