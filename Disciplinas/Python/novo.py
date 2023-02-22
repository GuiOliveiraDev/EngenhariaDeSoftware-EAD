def sum(arr, n):
    soma = 0
    for i in range(n):
        soma += arr[i]
    return soma
array = [1,2,3,4,2,4,1,3]
num = len(array)
print(sum(array,num))