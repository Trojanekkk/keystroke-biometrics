import sys

def find_n_grafs (text):
    n_grafs = {}

    for i, c in enumerate(text[:-1]):
        if (text[i] != ' ') & (text[i + 1] != ' '):
            digraf = text[i] + text[i + 1]
            if digraf in n_grafs:
                n_grafs[digraf] += 1
            else:
                n_grafs[digraf] = 1

    # return dict(n for n in sorted(n_grafs.items(), key=lambda item: -item[1]))
    return dict(n for n in sorted(n_grafs.items(), key=lambda item: -item[1]) if n[1] > 2)

digrafs = [find_n_grafs(txt) for txt in sys.argv[1:]]

common = set(digrafs[0])
for s in digrafs:
    common = common.intersection((s))

for i, txt in enumerate(digrafs):
    print(f'txt{i + 1}: ' + str(sorted(f'{x} x {txt[x]}' for x in txt if x in common)))