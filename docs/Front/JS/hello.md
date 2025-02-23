# 객체 지향 프로그래밍 기초

## **메서드와 this**     
<br>

**Q. sayHi()라는 함수로 프로퍼티 값을 보려면?**


```js
let user = {
  name: 'John',
}

user.sayHi(); // hello John
```
**user** 오브젝트에 sayHi라는 함수를 (메소드를) 하나 추가하고 싶습니다.     
위의 코드처럼 `user.sayHi()` 라고 작성하면     
콘솔창에 **'hello John'** 이라는 글자가 나와야합니다.

'John'을 하드코딩하기보다는     
실제 내 오브젝트에 있는 name에 해당하는 값이 출력되면 참 좋을 것 같군요.        


**답안** 

`this.name`으로 표기합니다.

```js
let user = {
  name: 'John',
  sayHi(){
    console.log(`안녕 나는 ${this.name}`)
  }
}

user.sayHi();//안녕 나는 손흥민
```

그렇다면 비슷한 방식으로 오브젝트 속 배열 데이터를 더해주는 메소드도 만들 수 있겠네요.



**답안**

```js
var obj = {
  data : [1,2,3,4,5]
};

obj.allSum = function(){
  var num = 0;
  this.data.forEach(function(a){
    num = num + a;
  });
  console.log(num);
}
obj.allSum();
// 근데 사실 sum(obj.data)하면 됨
```

## **setTimeout**     
<br>

**Q.setTimeout을 이용해서 1초 후에 this.innerHTML을 콘솔창에 출력하려면?**


```js
<button id="btn">버튼</button>
<script>
  document.getElementById('btn').addEventListener('click', function(){
    console.log(this.innerHTML)
  });
</script>
```

위와 같은 소스에서 1초 후에 '버튼'라는 글자가 콘솔창에 등장하려면 어떻게 해야할까요?

**답안**

```js
<button id="btn">버튼</button>
<script>
  document.getElementById('btn').addEventListener('click', function(){
    setTimeout(()=>{ console.log(this.innerHTML) }, 1000);
  });
</script>

////// 또는 옛날 스타일로 이렇게도 가능합니다.

<button id="btn">버튼</button>
<script>
  document.getElementById('btn').addEventListener('click', function(){
    var button = this;
    setTimeout(function(){ console.log(button.innerHTML) }, 1000);
  });

</script>
```



## 호이스팅

" 변수의 선언을 변수 범위 맨위로 끌고오는 현상 "



**자바스크립트 변수, 함수의 Hoisting 현상**

자바스크립트는 변수나 함수를 선언하면 Hoisting이라는 현상이 일어납니다.

자바스크립트는 변수나 함수의 선언부분을 변수의 범위 맨 위로 강제로 끌고가서 가장 먼저 해석합니다.

그게 Hoisting입니다.

예를 들어봅시다.

```
function 함수(){

  console.log('hello');
  var 이름 = 'Kim';

}
```

이렇게 함수 내에서 변수를 만들었다고 칩시다.

근데 자바스크립트가 이 코드를 해석하는 순서는 이렇게 됩니다.

```
function 함수(){

  var 이름;
  console.log('hello');
  이름 = 'Kim';

}
```

변수의 **선언 부분**을 강제로 변수의 범위 맨 위로 끌고가서 해석하고 지나갑니다.

우리 눈에 보이진 않지만 자바스크립트는 코드 동작 순서가 이렇습니다.

암튼 이게 Hoisting 현상입니다.

함수를 만들어도 똑같고, 변수를 let, const로 만들어도 똑같습니다.

그럼 이 코드는 실행결과가 어떻게될까요?

```
<script>

  console.log(이름);
  var 이름 = 'Kim';
  console.log(이름);

</script>
```

**뭘까요**

콘솔창에 첫째로는 undefined가 출력되고

둘째로는 Kim이 출력됩니다.

왜냐면 Hoisting 때문에

```
var 이름;
console.log(이름);
이름 = 'Kim'
console.log(이름);
```

이런 순서로 코드가 실행되니까요.

undefined라는건 변수가 선언은 되었는데 값을 아무것도 할당하지 않았을 때 undefined가 출력됩니다.

일종의 자료형같은 것인데 그냥 **정해지지않은 값**이라고 생각하면 됩니다.

하지만 let, const 변수의 경우 Hoisting이 일어나긴 하는데 약간 이상한 방식으로 일어납니다.

그건 연습문제 강의에서 발견하실 수 있습니다.

[collapse]

**변수 여러개 편리하게 만들기**

변수를 콤마로 구분하시면 여러개를 동시에 만들 수 있습니다.

```
var 이름, 나이, 성별;
```

이렇게 하면 변수가 3개 생성됩니다. var 키워드 3번 쓰지않아도 되니 코드가 약간 더 줄어드네요.

```
var 이름 = 'Kim', 나이, 성별;
```

선언과 동시에 할당도 하고 싶으면 그냥 이렇게 하시면 됩니다.

그냥 var let const 키워드를 여러번 안써도 된다는 장점이 있습니다.

```
var 이름,
    나이,
    성별;
```

어떤 놈들은 이렇게도 씁니다.

**전역변수와 변수의 참조**

변수는 이런 특징이 있습니다.

**바깥에 있는 변수는 안쪽에서 자유롭게 사용가능**합니다.

이걸 전문 개발자용어로 참조가능하다 라고 합니다만 자바스크립트에서는 이 현상을 부르는 다른 말이 있습니다.

closure라고 합니다.

안쪽 바깥쪽이 뭔지 예를 들자면

```
var 나이 = 20;

function 함수(){
  console.log(나이)
}

함수();
```

지금 함수(){} 안쪽에서 바깥쪽에 있는 **나이**라는 변수를 가져다 쓸 수 있다는 것입니다.

함수(){} 안쪽에 **나이**라는 변수 정의가 있으면 그걸 쓰겠지만

없으면 자연스럽게 바깥에 있는 변수를 가져다 씁니다. (참조합니다)

프로그래밍에선 **전역변수**라는게 있습니다.

모든 함수나 if나 for 내부에서 공통적으로 사용할 수 있는 (참조할 수 있는) 유용한 변수를 뜻합니다.

전역변수를 만들어 쓰고싶으면 그냥 script태그 열고 다짜고짜 변수하나 만들어주시면 됩니다.

```
<script>
  var 나이 = 20;

  function 함수(){
    console.log(나이)
  }
</script>
```

그럼 밑에 나오는 모든 함수, for, if 등에서 전부 나이라는 변수를 사용가능합니다.

전역변수 완성!

근데 전역변수는 이상한 특징이 있습니다.

예전에 window라는 오브젝트가 있다고 배웠었습니다.

window는 자바스크립트 기본함수 보관하는 큰 오브젝트라고 배웠습니다.

alert, getElementById, console.log 이런 함수들이 다 들어있습니다.

진짠지 테스트해보시려면

자바스크립트 기본 함수들을 오브젝트 다룰 때 처럼 window.alert(), window.document.getElementById() 이렇게 사용해보십시오.

alert이런것도 window에 보관된 애들이기 때문에 window.alert('안녕') 이렇게 하셔도 잘 됩니다.

이게 window 오브젝트의 역할입니다. 끝!

근데 여러분이 **쌩으로 전역변수를 만들면 window에도 보관**이 됩니다. (let말고 var 키워드만요)

왜그런지 궁금하면 역시 자바스크립트 만든 사람에게 물어보길 바랍니다.

```
<script>
  var 나이 = 20;

  console.log(나이);
  console.log(window.나이);
</script>
```

나이라는 전역변수를 만들면

**자동으로 window 오브젝트에 보관**이 되었으니까

신기하게 window.나이를 써도 출력이 됩니다.

(전역함수도 마찬가지로 window에 자동으로 보관됩니다)

그래서 전역변수를 조금 더 엄격하게 관리하거나 구분짓고 싶으면

전역변수를 만들 때와 사용할 때 window를 활용해보십시오.

```
<script>
  window.나이 = 20;//전역변수만들기console.log(window.나이);//전역변수사용하기window.나이 = 30;//전역변수변경하기
</script>
```

이런 식으로 사용할 수도 있습니다.

프로그래밍 엄격히하는걸 좋아하는 변태아조씨들이 많이 이용합니다.

(node.js 환경에선 window 대체품인 global 이라는 오브젝트가 있습니다)

**간단한 연습문제**

다음 코드를 실행하면 콘솔창에 무엇이 뜰까요?

```
<script>

  if (true) {
    let a = 1;
    var b = 2;
    if (true) {
      let b = 3;
    }
    console.log(b);
  }

</script>
```

**답 펼쳐보기 전에 잘 생각해보도록 합시다. 함정이 있을 수 있음**

실은 함정없음

b는 2라는 값이 출력됩니다.

let b = 3; 이 부분은 안쪽 if 내에서만 존재하는 놈이니 바깥의 console.log(b)와는 무관합니다.