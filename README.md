# Sobre a aplicação

+ Essa aplicação foi desenvolvida através do enunciado:

https://alamino.notion.site/Teste-para-desenvolvedor-back-end-sem-front-f3a294f104ab4b91a4338e8c69677be1

Use o enunciado como referência para um melhor entendimento sobre sua funcionalidade.


## Deploy e Disponibilidade

Essa aplicação está disponível na seguinte URL:

http://ec2-18-191-82-215.us-east-2.compute.amazonaws.com:3003/api/v1/

Leia a seção **Rotas de utilização** para saber como usar a rota de cálculo


## Instalação Local

- Para rodar em sua máquina, clone o repositório através do terminal:

```
https://github.com/GuiLopes29/Teste-Gorila.git
```

- Entre na pasta onde o repositório foi clonado e instale as dependências:

#### Yarn
```
yarn
```
ou
```
yarn install
```

#### NPM
```
npm i
```
ou
```
npm install
```

- Para rodar a aplicação simplesmente execute no terminal, na pasta onde esta configurado o repositorio:

#### Yarn
```
yarn start
```
#### NPM
```
npm start
```

Atenção: a porta padrão utilizada é a 3003, logo a aplicação deve rodar em http://localhost:3003/api/v1

## Rotas de utilização

Esse programa é constituido de uma rota para o cálculo de investimento pós-fixado atrelado ao CDI, conforme informado no enunciado;

- Para obter o resultado, faça uma requisição do tipo *POST* para a rota "/cdb".
- No corpo da requisição é necessário informar as datas de início e fim do investimento (investmentDate e currentDate, respectivamente) e a % do CDI do investimento (cdbRate)

ex.: POST http://ec2-18-191-82-215.us-east-2.compute.amazonaws.com:3003/api/v1/cdb
Request Body:
```JSON
{
    "investmentDate":"2016-11-16",
    "cdbRate": 115.3,
    "currentDate":"2016-12-15"
}
```

Caso a sua requisição seja feita e processada corretamente, você deverá receber como resposta um array da evolução do investimento da data inicial ate a data final selecionada contendo, em cada objeto, a data e o valor da unidade que inicia em 1000.
ex.:
```JSON
{
  "cdiResponse": [
    {
      "date": "2016-11-16",
      "unitPrice": 1000.59
    },
    {
      "date": "2016-11-17",
      "unitPrice": 1001.19
    },
    {
      "date": "2016-11-20",
      "unitPrice": 1001.78
    },
    {
      "date": "2016-11-21",
      "unitPrice": 1002.38
    },
    {
      "date": "2016-11-22",
      "unitPrice": 1002.97
    },
    {
      "date": "2016-11-23",
      "unitPrice": 1003.57
    },
    {
      "date": "2016-11-24",
      "unitPrice": 1004.17
    },
    {
      "date": "2016-11-27",
      "unitPrice": 1004.76
    },
    {
      "date": "2016-11-28",
      "unitPrice": 1005.36
    },
    {
      "date": "2016-11-29",
      "unitPrice": 1005.96
    },
    {
      "date": "2016-11-30",
      "unitPrice": 1006.55
    },
    {
      "date": "2016-12-01",
      "unitPrice": 1007.14
    },
    {
      "date": "2016-12-04",
      "unitPrice": 1007.73
    },
    {
      "date": "2016-12-05",
      "unitPrice": 1008.31
    },
    {
      "date": "2016-12-06",
      "unitPrice": 1008.9
    },
    {
      "date": "2016-12-07",
      "unitPrice": 1009.49
    },
    {
      "date": "2016-12-08",
      "unitPrice": 1010.08
    },
    {
      "date": "2016-12-11",
      "unitPrice": 1010.68
    },
    {
      "date": "2016-12-12",
      "unitPrice": 1011.27
    },
    {
      "date": "2016-12-13",
      "unitPrice": 1011.86
    },
    {
      "date": "2016-12-14",
      "unitPrice": 1012.45
    }
  ]
}
```

## Testes

+ Essa aplicação consta com testes para suas principais funções desenvolvidos com o JEST. Para rodas os testes, apenas rode o comando:
+ 
```
npm run jest
```
ou
```
yarn jest
```

e você terá o resultado dos testes automatizados das funções:

![image](https://user-images.githubusercontent.com/33187657/136871206-11b7170c-d3e1-4926-95a8-3ae224e2f3dc.png)

## Resultados e Tratativa de Erros

+ Caso seja feito uma requisição corretamente, conforme proposto na seção **Rotas de utilização**, você receberá o retorno correto com o array de evolução do investimento:

![image](https://user-images.githubusercontent.com/33187657/136866261-5e162977-c611-40cd-825e-c38a75ad98ad.png)

+ Caso você envie uma data inválida dentro do investmentDate, ele retornará um erro 400 - Bad Request, indicando para checar esse campo da requisição:

![image](https://user-images.githubusercontent.com/33187657/136866533-02b924da-859d-4b6f-8d82-90dab4e9c942.png)
![image](https://user-images.githubusercontent.com/33187657/136866523-99831a99-0966-4eac-93d2-3b8535b286a1.png)

+ O mesmo ocorre para o currentDate:

![image](https://user-images.githubusercontent.com/33187657/136866724-cc0fc928-190f-4d76-a14a-adb242a46891.png)
![image](https://user-images.githubusercontent.com/33187657/136866777-8e8b6315-843f-4a98-a02c-2e5d87edf7b5.png)

+ E caso você envie um cdbRate que não seja um numero, o retorno também indicará para você checar esse valor:

![image](https://user-images.githubusercontent.com/33187657/136866850-4538cb10-a98c-47ae-ba5f-127cd4538931.png)
