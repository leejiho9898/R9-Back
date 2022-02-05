bㅠㅠ## 알구 - 시니어 알바 서비스

> 코로나바이러스감염증-19(COVID-19)가 전 세계를 강타하면서 삶의 많은 부분이 변했습니다  
> 이에 자가격리와 거리두기등의 영향으로 "코로나 우울증" (Corona Blue)이 만연해 있습니다.  
> 저희는 이 상황에 조금이라도 도움이 되고자 인간의 기본 5대 욕구중 하나인 자아실현의 욕구를 충족시켜줄 수 있는 일자리 제공 플렛폼을 만들게 되었고 그중에서도 50대 이상 중장년층의 소일거리가 필요하다고 생각했습니다.  
> 알구 (알바 구해요)는 중장년층에 특화된 시니어 아르바이트 플랫폼입니다.

### **1\. 프로젝트 배경**

[이곳에서 확인 가능합니다.](https://github.com/leejiho9898/R9-Front)

### **2\. 프로젝트 설계**

[이곳에서 확인 가능합니다.](https://github.com/leejiho9898/R9-Front)

### **3\. DB & API**

DB: PostgreSQL

**API 명세서**

> **인증**
>
> BaseURL : /auth
>
> | Index | Method | URL      | Description       |
> | :---: | ------ | -------- | ----------------- |
> |   1   | GET    | /        | 로그인            |
> |   2   | POST   | /refresh | refresh 토큰 생성 |
> |   3   | GET    | /signout | 로그아웃          |

  </br>

> **회원**
>
> BaseURL : /users
>
> | Index | Method | URL         | Description            |
> | :---: | ------ | ----------- | ---------------------- |
> |   1   | GET    | /           | 회원 검색              |
> |   2   | POST   | /           | 회원 생성              |
> |   3   | GET    | /search     | 기업회원 검색          |
> |   4   | GET    | /businesses | 기업회원 모든 정보     |
> |   5   | GET    | /me         | 로그인한 유저 정보     |
> |   6   | GET    | /{id}       | 특정 유저 검색         |
> |   7   | PATCH  | /me         | 로그인한 유저정보 수정 |
> |   8   | PATCH  | /{id}       | 유저정보 수정          |
> |   9   | DELETE | /{id}       | 유저정보 삭제          |

  </br>

> **공고**
>
> BaseURL : /jobs
>
> | Index | Method | URL          | Description                |
> | :---: | ------ | ------------ | -------------------------- |
> |   1   | GET    | /            | 모든 공고 검색             |
> |   2   | POST   | /            | 공고 생성                  |
> |   3   | GET    | /custom      | hashtag를 이용한 공고 검색 |
> |   4   | GET    | /me          | 내가 올린 공고             |
> |   5   | GET    | /search      | 조건 공고 검색             |
> |   6   | GET    | /{id}        | 특정 공고 검색             |
> |   7   | PATCH  | /{id}        | 공고 수정                  |
> |   8   | PATCH  | /status/{id} | 공고 상태 수정             |
> |   9   | DELETE | /{id}        | 유저정보 삭제              |

  </br>

> **공고 지원**
>
> BaseURL : /applys
>
> | Index | Method | URL       | Description            |
> | :---: | ------ | --------- | ---------------------- |
> |   1   | GET    | /         | 내가 쓴 공고 지원 검색 |
> |   2   | POST   | /         | 공고 지원 생성 생성    |
> |   3   | GET    | /job/{id} | 특정 공고 지원자 검색  |
> |   4   | GET    | /{id}     | 특정 공고 지원 검색    |
> |   5   | DELETE | /{id}     | 공고 지원 삭제         |

  </br>

> **관심 공고**
>
> BaseURL : /favorites
>
> | Index | Method | URL   | Description         |
> | :---: | ------ | ----- | ------------------- |
> |   1   | GET    | /     | 모든 관심 공고 검색 |
> |   2   | POST   | /     | 관심 공고 생성      |
> |   3   | GET    | /me   | 나의 관심 공고 검색 |
> |   4   | DELETE | /{id} | 기업회원 모든 정보  |

  </br>

> **기업 후기**
>
> BaseURL : /reviews
>
> | Index | Method | URL     | Description    |
> | :---: | ------ | ------- | -------------- |
> |   1   | GET    | /       | 모든 후기 검색 |
> |   2   | POST   | /       | 후기 생성      |
> |   3   | GET    | /me     | 나의 후기 검색 |
> |   4   | GET    | /search | 후기 조건 검색 |
> |   5   | PATCH  | /{id}   | 후기 수정      |
> |   6   | DELETE | /{id}   | 후기 삭제      |

  </br>

> **해시태그**
>
> BaseURL : /hashtags
>
> | Index | Method | URL       | Description            |
> | :---: | ------ | --------- | ---------------------- |
> |   1   | GET    | /         | 모든 해시태그 검색     |
> |   2   | POST   | /         | 해시태그 생성          |
> |   3   | GET    | /search   | 조건 해시태그 검색     |
> |   4   | GET    | /category | 해시태그 카테고리 검색 |
> |   5   | PATCH  | /{id}     | 해시태그 수정          |
> |   6   | DELETE | /{id}     | 해시태그 삭제          |

> **파일**
>
> BaseURL : /uploads
>
> | Index | Method | URL | Description |
> | :---: | ------ | --- | ----------- |
> |   1   | POST   | /   | 파일 업로드 |

### **4\. 기술 스택**

#### **Front -end**

- Typescript
- Next Js
- React
- Material-UI
- Redux-Toolkit

#### **Back -end**

- Typescript
- Nest Js
- PostgreSQL
- Type orm
