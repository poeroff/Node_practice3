# 환경변수

.env 파일 생성 후 아래 내용 추가

## 설명

- SERVER_PORT: 3000
- MYSQL_USERNAME: 'wqdsdsf'
- MYSQL_PASSWORD: 'wqdsdsf123'
- MYSQL_DATABASE: 'nodejs'
- MYSQL_HOST:'ch.cthngt3fulux.us-east-1.rds.amazonaws.com'
- PASSWORD_HASH_SALT_ROUNDS: 12
- JWT_ACCESS_TOKEN_SECRET: 'iamking'

## 예시

```bash
SERVER_PORT=3000
MYSQL_USERNAME="root"
MYSQL_PASSWORD="rootpassword"
MYSQL_DATABASE="sparta_nodejs_db"
MYSQL_HOST="aws.rds.com"
PASSWORD_HASH_SALT_ROUNDS=10
JWT_ACCESS_TOKEN_SECRET="jwt-serect-key"
```

# 실행 방법

npm start


#error
코드가 길지 않아서 controller에서 해결하였음

