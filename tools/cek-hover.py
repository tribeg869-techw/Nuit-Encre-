#!/usr/bin/env python3
"""Periksa kontrak hover (CONCEPT.md §0 butir 3, sejak 2026-09-13):
setiap selektor `:hover` di style.css HARUS berada di dalam blok
`@media (hover:hover)`. Keluar 0 bila lolos, 1 bila ada pelanggaran.

    python3 tools/cek-hover.py
"""
import re, sys, pathlib

css = pathlib.Path(__file__).resolve().parent.parent / 'assets/css/style.css'
src = css.read_text(encoding='utf-8')
# buang komentar tapi pertahankan baris-baru agar nomor baris tetap benar
src = re.sub(r'/\*.*?\*/', lambda m: re.sub(r'[^\n]', ' ', m.group(0)), src, flags=re.S)

stack, bad, ok = [], [], 0
pos = 0
# token: prelude (teks sebelum '{'), atau '}'
for m in re.finditer(r'([^{}]*)\{|\}', src):
    if m.group(0) == '}':
        if stack: stack.pop()
        continue
    prelude = m.group(1)
    line = src.count('\n', 0, m.start(1)) + 1
    is_media_hover = prelude.lstrip().startswith('@media') and re.search(r'\(\s*hover\s*:\s*hover\s*\)', prelude)
    if not prelude.lstrip().startswith('@') and ':hover' in prelude:
        if 'hover' in stack: ok += 1
        else: bad.append(line)
    stack.append('hover' if is_media_hover else 'x')

print(f':hover di dalam @media (hover:hover): {ok}')
if bad:
    print(f'PELANGGARAN — :hover di luar blok media pada baris: {bad}')
    sys.exit(1)
print('LOLOS — tidak ada :hover di luar @media (hover:hover)')
