minhaLista = [0,5,10,15,20,25,30]
filtro = lambda x: x > 30
minhaLista_filtrada = filter(filtro, minhaLista)
print(list(minhaLista_filtrada))