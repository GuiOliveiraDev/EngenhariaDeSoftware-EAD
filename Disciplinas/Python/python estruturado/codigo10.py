def numPrimo(n):
    multiplo = 0
    for num in range(2,n):
        if( n % num == 0):
            multiplo += 1
    if(multiplo == 0):
        resposta = print(f'O número {n} é um número primo!')
    else:
        resposta = print(f'O número {n} não pe um número primo')
    return resposta
numero = eval(input('Dígite um número: '))
print(numPrimo(numero))