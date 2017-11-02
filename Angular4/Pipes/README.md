## 管道
用来转换数据渲染的格式，在 1.x 版本的时候称之为过滤器，在 4.x 称之为管道。

## 使用
格式：`date_expression | date[:format[:timezone[:locale]]]`

#### 大写转换
```html
<div>
  <p ngNonBindable>{{ 'Angular' | uppercase }}</p>
  <p>{{ 'Angular' | uppercase }}</p> <!-- Output: ANGULAR -->
</div>
```

#### 小写转换
```html
<div>
  <p ngNonBindable>{{ 'Angular' | lowercase }}</p>
  <p>{{ 'Angular' | lowercase }}</p> <!-- Output: angular -->
</div>
```

#### JavaScript 对象序列化
```html
<div>
  <p ngNonBindable>{{ { name: 'semlinker' } | json }}</p>
  <p>{{ { name: 'semlinker' } | json }}</p> <!-- Output: { "name": "semlinker" } -->
</div>
```

#### 数值格式化
number | 'n1.n2-n3'  
- n1: 最少位整数位，不够补0，默认1
- n2：最少保留几个小数，不够补0，默认0
- n3：最多保留几个小数，默认3
```html
<div>
  <p ngNonBindable>{{ 3343.14159265 | number: '1.4-4' }}</p>
  <p>{{ 3.14159265 | number: '1.4-4' }}</p> <!-- Output: 3.1416 -->
</div>
```

#### 日期格式化
```javascript
@Component({
  selector: 'date-pipe',
  template: `<div>
    <!--output 'Jun 15, 2015'-->
    <p>Today is {{today | date}}</p>

    <!--output 'Monday, June 15, 2015'-->
    <p>Or if you prefer, {{today | date:'fullDate'}}</p>

    <!--output '9:43 AM'-->
    <p>The time is {{today | date:'shortTime'}}</p>

    <!--output '2015-06-15 05:03 PM GMT+9'-->
    <p>The custom date is {{today | date:'yyyy-mm-dd HH:mm a z':'+0900'}}</p>

    <!--output '2015-06-15 09:03 AM GMT+9'-->
    <p>The custom date with fixed timezone is {{fixedTimezone | date:'yyyy年MM月dd目 HH:mm a z':'+0900'}}</p>
  </div>`
})
export class DatePipeComponent {
  today = Date.now();
  fixedTimezone = '2015-06-15T09:03:01+0900';
}
```


#### 字符截取
```html
<div>
  <p ngNonBindable>{{ 'semlinker' | slice:0:3 }}</p>
  <p>{{ 'semlinker' | slice:0:3 }}</p> <!-- Output: sem -->
</div>
```

#### 管道链
```html
<div>
  <p ngNonBindable>{{ 'semlinker' | slice:0:3 | uppercase }}</p>
  <p>{{ 'semlinker' | slice:0:3 | uppercase }}</p> <!-- Output: SEM -->
</div>
```

#### 自定义管道
定义好的管道要在根模块中 declarations 声明。
```javascript
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'range'})
export class RangePipe implements PipeTransform {
  transform(value: Array<any>, range: Number): Array<Number> {
    for(var i = 0; i < range; i++){
      value.push(i);
    }
    return value;
  }
}
```
```html
<p *ngFor="let key of [] | range: 10">{{key}}</p>
```