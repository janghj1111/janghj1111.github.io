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