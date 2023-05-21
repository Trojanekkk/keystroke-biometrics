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

    return dict(sorted(n_grafs.items(), key=lambda item: -item[1]))

print(find_n_grafs(sys.argv[1]))