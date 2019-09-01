# Object

```go
package base

import (
	"context"
	"time"
)
/* Object Part */
type Object interface {
    GetName() string // 获取名字
    GetTitle() string // 获取头衔，没有返回空
    GetFlags() []Flag // 获取所有Flag
    GetAttribute(ket string) interface{}
    GetAttributes() []interface{}

    GetContext() context.Context // 根据当前Object生成其当前所属Context
}

type Character interface {
    Object
    Do(ctx context.Context, action Action, target *Object) error //
}

type Flag struct{
	FlagID int64
	SetAt *time.Time  // Flag插上时间
	RemovedAt *time.Time  // Flag移除时间，保留暂时不知道移除的意义
}

type Status interface {
	// Status表示当前Object的状态
	GetName() string
	GetDesc() string

	GetExpiredAt() *time.Time
	// TODO: design
	// Status可能造成影响的地方，时间流动（扣血）、结算（战斗结算，地图移动等）、任务状态（属性增加和减少）


}

/* Action Part */
type Action interface {
	GetID() int64
	GetName() string
	// 对以target为对象执行当前Action，ctx包含执行者信息以及一些其他信息
	Execute(ctx context.Context, target *Object) error

	GetExtra() interface{}
}


```

## 关于上下文的思考
由于在很多场景下会需要一些全局变量，比如世界级的Flags支持、执行Action时获取当前Position以及执行者的内容，但这些以变量传入或者作为全局变量非常不优雅而且代码可读性差，所以考虑使用context，提供context的创建utils。

```go
ctx := utils.CreateContext(currentObject)
```
