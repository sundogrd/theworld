# 通信

## 消息内容确认（需要通信啥）


1. type: 类型，比如操作指令，move

```
{

  type: "move",

}
```

1. 客户端 -》服务端
UI操作，用户指令

* action
{
  type: "playerAction",
  payload: {
    id: "action-id",
    target: "5352",
  }
}

{
  type: "playerSave",
  payload: {
    position: 1,
  }
}
{
  type: "playerLoad",
  payload: {
    position: 2,
  }
}
*

1. 服务端 -》客户端
```
{
  type: "updateWorld",
  payload: {
    type: "move",
    worldUpdates: Array<WorldUpdate>,
  }
  <!-- type: "interrupt",
  payload: {

  } -->
}
```



## 消息格式

## 客户端

## 服务端
