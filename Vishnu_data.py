
f = list(map(lambda _: _.strip(',\n\r').split(','), open('./Vishnu_data.csv')))
l = ['{\n' + ',\n'.join(f'\t"{i}": "{j}"' for i, j in zip(f[0], ln)) + '\n}'  for ln in f[1:]]
print('{\n' + ',\n'.join([f'"{i[0]}": {j}' for i, j in zip(f[1:], l)]) + '\n}')
