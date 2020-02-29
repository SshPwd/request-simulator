# request-simulator

#### Requirements:
https://docs.google.com/document/d/1TEsf4nKJ8vf5iQb_g4-FX0Q-WpEnS40CLzTGPPgKRUw/edit#heading=h.r6x4sk49yo4j


## Run project:

#### Install dependency
```
npm i
```

#### Launch the project

```
npm start
```

#### Run in docker

```
docker build -t sshpwd/request-emulator .
```

```
docker run -i -t -d  -p 3030:80 \
--name request-emulator  sshpwd/request-emulator
```


### Launch unit tests

```
npm test
```