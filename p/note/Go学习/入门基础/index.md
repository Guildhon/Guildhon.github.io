My Note
-------- 
> 入门基础

golang的组合，模拟继承
```
package main

import "fmt"

type Animal struct {
    People
    Atype string
}
type People struct {
    name string
}
func (f *People) echo (){
    fmt.Println(f.name)
}

func main() {
    p1 := Animal{People{name:"bbb"},"animal"}
    p1.echo()         // bbb
    fmt.Println(p1.Atype) //animal
}
```
模拟多态
```
package main

import "fmt"

type Foo interface {
    qux()
}

type Bar struct {}
type Baz struct {}

func (b Bar) qux(){}
func (b Baz) qux(){}

func main() {
   var f Foo
   f = Bar{}
   f = Baz{}
   fmt.Println(f)
}
```
接口实现
```
package main

import (
    "fmt"
    "time"
)

type Reader interface{
    Read(r chan string)
}
type Writer interface{
    Write(w chan string)
}

type ReadLogger struct {
    path string
}
type WriteLogger struct {
    db string
}

type Logger struct {
    read Reader
    write Writer
    r chan string
    w chan string
}

func (l *ReadLogger) Read(r chan string) {
    r <- "message"
}

func (l *WriteLogger) Write(w chan string){
    fmt.Println(<- w)
}

func (l *Logger) Process(){
   data := <- l.r
   l.w <- (data + "123")
}

func main() {
  rl := &ReadLogger{
      path: "url",
  }
  wl := &WriteLogger{
      db: "db",
  }    
  l := &Logger{
      r: make(chan string),
      w: make(chan string),
      read: rl,
      write: wl,
  }
  go l.read.Read(l.r)
  go l.Process()
  go l.write.Write(l.w)
  time.Sleep(1)
}
```