# React-Native

`apple slicon mac`에서 `RN` 프로젝트 처음부터 셋업 및 공부용 프로젝트.

## 용어 및 개념

- ppi: `pixcel per inch`의 약자로, 1인치에 몇 px이 들어갈 수 있는지를 의미하는 밀도 단위.
- dp: `density-independent pixel`의 약자로, 모든 화면에서 균일한 치수를 갖도록 확장되는 유연한 단위. 이것을 사용하면 밀도가 다른 화면에 일관되게 요소를 표시할 수 있다. (RN에서 스타일링을 할 때 크기는 모두 dp로 설정) [[참고자료](https://material.io/design/layout/pixel-density.html#pixel-density)]
- dp = px \* 160 / ppi
- px = dp \* ppi / 160

## 개발자 메뉴

- ios: `command` + `D`
- android: `command` + `M`
- 윈도우, 리눅스: `ctrl` + `M`

## simulator에서 키보드가 나오지 않을 때

`command` + `K`

## SafeAreaView의 상단 여백을 없애고 싶을 때

`react-native-safe-area-context` 라이브러리 이용하기. `<App />`, `<DateHeader />` 컴포넌트 코드에 적용

## IOS 시뮬레이터 디바이스 변경 방법

터미널에 아래와 같이 입력

```bash
# iPhone 리스트 확인
$ xcrun simctl list devices

# 사용 가능한 디바이스로 변경
$ yarn react-native run-ios --simulator="iPhone 13 Pro"
```

<img width="996" alt="2021-11-26_22-32-04" src="https://user-images.githubusercontent.com/42884032/143588665-af12e8d3-f0b8-423f-bec5-e21bcb82b6d9.png">

## ios의 경우 키보드 영역이 화면을 가리기 때문에 설정 필요

안드로이드는 아래 설정이 없어도 잘 동작한다.

```javascript
// App.js
import {KeyboardAvoidingView, Platform} from 'react-native';
...

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  style={styles.avoid}>
  ....
</KeyboardAvoidingView>
```

<img width="907" alt="2021-11-27_15-12-09" src="https://user-images.githubusercontent.com/42884032/143670409-fc864191-09b5-46e2-ba90-d977afd8e342.png">

## Platform.OS와 삼항연산자 대신 Platform.select 사용하기

운영 체제에 따라 다른 값을 적용해야 하는 경우, `Platform.select`를 사용하면 좀 더 깔끔하고 명확한 구현이 가능하다. 또한 앞의 경우처럼 `undefined`를 설정해야 한다면 생략하면 된다.

```javascript
// = Platform.select({ios: 'padding', android: undefined})
<KeyboardAvoidingView behavior={Platform.select({ios: 'padding'})}>
  ...
</KeyboardAvoidingView>
```

## 버튼을 눌렀을때 효과 주는 법

아래 컴포넌트 중 하나로 깜싼다.

- TouchableHighlight: 터치했을때 배경색을 변경한다.
- TouchableNativeFeedback: 터치했을때 안드로이드에서 물결 효과를 보여준다. ios에서 사용시 오류가 발생한다.
- TouchableOpacity: 터치했을때 투명도를 조정(기본값: 0.2)
- TouchableWithoutFeedback: 터치했을때 아무 효과도 적용하지 않는다.

```javascript
// AppTodo.js
<TouchableOpacity activeOpacity={0.5}>
  <View style={styles.buttonStyle}>
    <Image source={require('../assets/icons/add_white/add_white.png')} />
  </View>
</TouchableOpacity>
```

### TouchableNativeFeedback 사용시 물결 효과가 원 밖으로 나간다?

해당 컴포넌트를 `View`로 감싸주고 `borderRadius`와 `overflow` 스타일을 설정한다.

```javascript
<View style={styles.circleWrapper}>
  <TouchableNativeFeedback>
    <View style={styles.buttonStyle}>
      <Image source={require('../assets/icons/add_white/add_white.png')} />
    </View>
  </TouchableNativeFeedback>
</View>
...
const styles = StyleSheet.create({
  ...,
  circleWrapper: {
    overflow: 'hidden',
    borderRadius: 24,
  },
});
```

## Keyboard를 닫고 싶을때

```javascript
import { Keyboard } from 'react-native';

const onPress = () => {
  ...
  Keyboard.dismiss();
}
```

## TextInput에 Enter 이벤트 연결하기

- `onSubmitEditing`은 `Enter(return)`를 눌렀을때 호출됨
- `returnKeyType`은 Enter의 타입을 지정한다. 타입에 따라 Enter 부분에 보이는 설명 또는 아이콘도 변경된다.

```javascript
<TextInput
  // ...
  onSubmitEditing={onPress}
  returnKeyType="done"
/>
```

### ios에서는 리턴타입을 'done'으로 설정시 'done (시스템 언어 한글: 완료)'로 표시된다. 안드로이드는 변화 x

<img width="880" alt="2021-11-27_15-59-00" src="https://user-images.githubusercontent.com/42884032/143671634-77e26e23-9988-465e-a1ab-8b9b62ad8e64.png">

### 플랫폼별 전용 값이 다르니 returnKeyType을 플랫폼에 따라 잘 설정해 주어야 한다.

- 공통: done (완료), go (이동), next (다음), search (검색), send (보내기)
- IOS 전용: default (기본), emergency-call (긴급 통화), google (검색), join (가입), route (이동), yahoo (검색)
- Android 전용: none (일반 Enter), previous (뒤로)
