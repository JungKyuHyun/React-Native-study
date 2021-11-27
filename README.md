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

## 항목 사이에 구분선 보여주는 방법

웹에서 사용하던 `& + &` 셀렉터의 기능이 RN에는 존재하지 않는다. `<FlatList />`에서는 `ItemSeparatorComponent`를 이용하여 구분선을 만들 수 있다.

```javascript
// TodoList.js
<FlatList
  ItemSeparatorComponent={() => <View style={styles.separator} />}
  // ...
/>
...
const styles = StyleSheet.create({
  // ...,
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});
```

## 안드로이드 시뮬레이터에서 한글 키보드 추가하는 법

<img width="1294" alt="2021-11-27_16-52-30" src="https://user-images.githubusercontent.com/42884032/143673220-a37e08bf-86a9-4023-9329-c9638cfee6d3.png">

## 백터 아이콘의 경우 react-native-vector-icons를 사용

- `plist` 파일은 `IOS` 앱의 프로퍼티 리스트(`property lsit`) 파일로 앱의 이름, 아이콘, 버전 등 앱에서 필요한 설정값 저장. 다양한 오픈소스 아이콘이 있는 폰트 파일이 있으며, 사용하고 싶은 것만 추가하면 됨. [[참고자료1 - github](https://github.com/oblador/react-native-vector-icons)], [[참고자료2 - icons](https://oblador.github.io/react-native-vector-icons/)]

### react-native-vector-icons IOS에 적용하기

```bash
$ yarn add react-native-vector-icons

$ cd ./ios
$ pod install

# ios/TodoAppRN/Info.plist 맨 아래 부분에 아래 UIAppFonts 속성 추가

# <string>UIInterfaceOrientationLandscapeRight</string>
# </array>
# <key>UIViewControllerBasedStatusBarAppearance</key>
  <key>UIAppFonts</key>
  <array>
    <string>MaterialIcons.ttf</string>
  </array>
# </dict>
# </plist>

# 위 속성 추가 후 다시 ios 명령어 실행
$ yarn ios
```

### react-native-vector-icons Android에 적용하기

```gradle
<!-- android/app/build.gradle 파일 맨 아래 추가  -->
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

추가 후 다시 커맨드 실행.

```bash
$ yarn android
```

### 사용법

아래와 같은 방법으로 사용가능하다. [[참고자료2 - icons](https://oblador.github.io/react-native-vector-icons/)]

```javascript
import Icon from 'react-native-vector-icons/MaterialIcons';

const deleteIcon = <Icon name="delete" size={32} color="red" />;
```

### Error: react-native-vector-icons/Icon could not be found within the project or in these directories: node_modules

`<Icon name="delete" size={32} color="red" />`를 사용하려고 하니 위 에러가 발생했다. 그럼 콘솔에 아래와 같은 해결 방법이 나타난다.

```bash
If you are sure the module exists, try these steps:
 1. Clear watchman watches: watchman watch-del-all
 2. Delete node_modules and run yarn install
 3. Reset Metro's cache: yarn start --reset-cache
 4. Remove the cache: rm -rf /tmp/metro-*
```

하지만 저대로 했으나 동일했으며, 알고보니 문제는 저게 아니였다. 자동 `import`를 사용했으나 이게 경로를 잘못 잡아준게 문제였다.

```javascript
// import { Icon } from 'react-native-vector-icons/Icon'; (x)
import Icon from 'react-native-vector-icons/MaterialIcons'; (o)
...
<Icon name="delete" size={32} color="red" />
```

## Alert.alert('제목', '내용', '버튼 배열', '옵션')

- `TodoItem.js` 참고.
- `style`은 `cancel`, `default`, `destructive` 값을 설정할 수 있다. (ios에서만 동작, android 버튼에 스타일 적용은 되지 않는다.)
- 만약 스타일을 직접 변경하고 싶다면 직접 컴포넌트를 만들어야 한다.
- 옵션에 `cancelable`의 경우 안드로이드에서 Alert 박스 바깥 영역 또는 Back 버튼을 눌렀을때 Alert가 닫히도록 설정할 수 있다.
- `onDismisss`는 `Alert`가 닫힐때 호출되는 함수

<img width="1023" alt="2021-11-27_18-07-51" src="https://user-images.githubusercontent.com/42884032/143675273-36d3c120-5d05-4ab5-8980-bd18c5a69c80.png">
