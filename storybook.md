# storybook

## what and why

### ui component를 위한 개발환경과 실행환경 제공

### component를 독립적으로 생성

### 개발환경에서 독립적으로 component에 대한 사용예제 만들 수 있음

### 이미 개발 완료된 다른 component를 사용가능

### component에 대한 prop를 목록 제공

### prop에 대해 동적으로 변경 가능

## version 6

### 설치

npx storybook@latest init

#### 설치후 변경

1. package.json 에 변경
2. .storybook 폴더

- main.ts -> story 전체에 대한 config
- preview.ts -> story 파일에 대한 config

3. src\stories 폴더

- Configure.mdx
- component.js, component.css, component.stories.js

4. 실행
   npm run storybook

### story heirarchy
#### title에 /를 사용해 만들어줌 3단계로 구분...category/folder/component
ex) form/button form/input -> 두개의 story파일의 title에 이렇게 이름지어주면 form이라는 폴더 아래에 button/input가 각각 생성됨


