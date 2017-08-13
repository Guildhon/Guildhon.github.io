My Note
-------- 
> PHP进阶

#### 1.数组
是一个键值对组成的语言结构，$arr = array()，表示创建一个空数组。PHP有两种数组：索引数组、关联数组；

索引数组是指数组的键是整数的数组，并且键的整数顺序是从0开始，依次类推，如$fruit = array("苹果","香蕉","菠萝")，也可以'0'=>'苹果'，使用print_r($fruit)输出数组键及对应的值。

索引数组赋值有三种方式，第一种：用数组变量的名字后面跟一个中括号的方式赋值，如$arr[0]='苹果'。第二种：用array()创建一个空数组，使用=>符号来分隔键和值，左侧表示键，右侧表示值，比如，array('0'=>'苹果')。第三种：用array()创建一个空数组，直接在数组里用英文的单引号'或者英文的双引号"赋值，数组会默认建立从0开始的整数的键。比如array('苹果');

关联数组赋值有两种方式，第一种：用数组变量的名字后面跟一个中括号的方式赋值，比如，$arr['apple']='苹果';二种：用array()创建一个空数组，使用=>符号来分隔键和值，左侧表示键，右侧表示值。当然，关联数组中，键一定是字符串。比如，array('apple'=>'苹果');
```
$fruit = array(

    'apple'=>"苹果",

    'banana'=>"香蕉",

    'pineapple'=>"菠萝"

); 
```
#### 2.类和对象
类是一类东西的结构描述，而对象则是一类东西的一个具体实例，对象通过new关键字进行实例化

类通过关键字class开头，然后是类名与花括号，在花括号中定义类的属性与方法，类名必须是字母或下划线开头，后面紧跟若干个字母、数字或下划线，类名最好能够表意，可以采用名词或者英文单词。
```
//定义一个类
class Car {
    //定义属性
    public $name = '汽车';

    //定义方法
    public function getName() {
        //方法内部可以使用$this伪变量调用对象的属性或者方法
        return $this->name;
    }
}
```

要创建一个类的实例，可以使用new关键字创建一个对象

```
$car = new Car();
//也可以采用变量来创建
$className = 'Car';
$car = new $className();
```

类和对象之类的属性,在类中定义的变量称之为属性，属性声明是由关键字 public，protected 或者 private 开头，默认都为public，外部可以访问。一般通过->对象操作符来访问对象的属性或者方法，对于静态属性则使用::双冒号进行访问。当在类成员方法内部调用的时候，可以使用$this伪变量调用当前对象的属性。
```
class Car {
    //定义公共属性
    public $name = '汽车';

    //定义受保护的属性
    protected $corlor = '白色';

    //定义私有属性
    private $price = '100000';
}
$car = new Car();
echo $car->name;   //调用对象的属性
echo $car->color;  //错误 受保护的属性不允许外部调用
echo $car->price;  //错误 私有属性不允许外部调用
```
受保护的属性与私有属性不允许外部调用，在类的成员方法内部是可以调用的
```
class Car{
    private $price = '1000';
    public function getPrice() {
        return $this->price; //内部访问私有属性
​    }
}
```

定义类的方法,方法就是在类中的function，类的方法也具有public，protected 以及 private 的访问控制
```
class Car {
    public function getName() {
        return '汽车';
    }
​}
$car = new Car();
echo $car->getName();
```
使用关键字static修饰的，称之为静态方法，静态方法不需要实例化对象，可以通过类名直接调用，操作符为双冒号::
```
class Car {
    public static function getName() {
        return '汽车';
    }
​}
echo Car::getName(); //结果为“汽车”
```
构造函数和析构函数,PHP5可以在类中使用__construct()定义一个构造函数，具有构造函数的类，会在每次对象创建的时候调用该函数
```
class Car {
   function __construct() {
       print "构造函数被调用\n";
   }
}
$car = new Car(); //实例化的时候 会自动调用构造函数__construct，这里会输出一个字符串
```
在子类中如果定义了__construct则不会调用父类的__construct，如果需要同时调用父类的构造函数，需要使用parent::__construct()显式的调用。
```
class Car {
   function __construct() {
       print "父类构造函数被调用\n";
   }
}
class Truck extends Car {
   function __construct() {
       print "子类构造函数被调用\n";
       parent::__construct();
   }
}
$car = new Truck();
```
PHP5支持析构函数，使用__destruct()进行定义，析构函数指的是当某个对象的所有引用被删除，或者对象被显式的销毁时会执行的函数
```
class Car {
   function __construct() {
       print "构造函数被调用 \n";
   }
   function __destruct() {
       print "析构函数被调用 \n";
   }
}
$car = new Car(); //实例化时会调用构造函数
echo '使用后，准备销毁car对象 \n';
unset($car); //销毁时会调用析构函数
```
当PHP代码执行完毕以后，会自动回收与销毁对象，因此一般情况下不需要显式的去销毁对象。

Static静态关键字,静态属性与方法可以在不实例化类的情况下调用，直接使用类名::方法名的方式进行调用。静态属性不允许对象使用->操作符调用
```
class Car {
    private static $speed = 10;
    
    public static function getSpeed() {
        return self::$speed;
    }
}
echo Car::getSpeed();  //调用静态方法
```
静态方法也可以通过变量来进行动态调用
```
$func = 'getSpeed';
$className = 'Car';
echo $className::$func();  //动态调用静态方法
```
静态方法中，$this伪变量不允许使用。可以使用self，parent，static在内部调用静态方法与属性
```
class Car {
    private static $speed = 10;
    
    public static function getSpeed() {
        return self::$speed;
    }
    
    public static function speedUp() {
        return self::$speed+=10;
    }
}
class BigCar extends Car {
    public static function start() {
        parent::speedUp();
    }
}

BigCar::start();
echo BigCar::getSpeed();   // 20
```
访问控制通过关键字public，protected和private来实现。被定义为公有的类成员可以在任何地方被访问。被定义为受保护的类成员则可以被其自身以及其子类和父类访问。被定义为私有的类成员则只能被其定义所在的类访问。

类属性必须定义为公有、受保护、私有之一，如果采用 var 定义，则被视为公有
```
class Car {
    $speed = 10; //错误 属性必须定义访问控制
    public $name;   //定义共有属性
}
```

类中的方法可以被定义为公有、私有或受保护。如果没有设置这些关键字，则该方法默认为公有
```
class Car {
​    //默认为共有方法
    function turnLeft() {
    }
}
```
如果构造函数定义成了私有方法，则不允许直接实例化对象了，这时候一般通过静态方法进行实例化，在设计模式中会经常使用这样的方法来控制对象的创建，比如单例模式只允许有一个全局唯一的对象
```
class Car {
    private function __construct() {
        echo 'object create';
    }

    private static $_object = null;
    public static function getInstance() {
        if (empty(self::$_object)) {
            self::$_object = new Car(); //内部方法可以调用私有方法，因此这里可以创建对象
        }
        return self::$_object;
    }
}
//$car = new Car(); //这里不允许直接实例化对象
$car = Car::getInstance(); //通过静态方法来获得一个实例
```
对象继承
```
class Car {
    public $speed = 0; //汽车的起始速度是0
    
    public function speedUp() {
        $this->speed += 10;
        return $this->speed;
    }
}
//定义继承于Car的Truck类
class Truck extends Car{
    public function speedUp(){
        $this->speed=parent::speedUp()+50;
    }
}

$car = new Truck();
$car->speedUp();
echo $car->speed;
```

重载指的是动态的创建属性与方法，是通过魔术方法来实现的。属性的重载通过__set，__get，__isset，__unset来分别实现对不存在属性的赋值、读取、判断属性是否设置、销毁属性
```
class Car {
    private $ary = array();
    
    public function __set($key, $val) {
        $this->ary[$key] = $val;
    }
    
    public function __get($key) {
        if (isset($this->ary[$key])) {
            return $this->ary[$key];
        }
        return null;
    }
    
    public function __isset($key) {
        if (isset($this->ary[$key])) {
            return true;
        }
        return false;
    }
    
    public function __unset($key) {
        unset($this->ary[$key]);
    }
}
$car = new Car();
$car->name = '汽车';  //name属性动态创建并赋值
echo $car->name;
```
方法的重载通过__call来实现，当调用不存在的方法的时候，将会转为参数调用__call方法，当调用不存在的静态方法时会使用__callStatic重载
```
class Car {
    public $speed = 0;
    
    public function __call($name, $args) {
        if ($name == 'speedUp') {
            $this->speed += 10;
        }
    }
}
$car = new Car();
$car->speedUp(); //调用不存在的方法会使用重载
echo $car->speed;
```
对象比较，当同一个类的两个实例的所有属性都相等时，可以使用比较运算符==进行判断，当需要判断两个变量是否为同一个对象的引用时，可以使用全等运算符===进行判断
```
class Car {
}
$a = new Car();
$b = new Car();
if ($a == $b) echo '==';   //true
if ($a === $b) echo '==='; //false
```

对象复制，在一些特殊情况下，可以通过关键字clone来复制一个对象，这时__clone方法会被调用，通过这个魔术方法来设置属性的值
```
class Car {
    public $name = 'car';
    
    public function __clone() {
        $obj = new Car();
        $obj->name = $this->name;
    }
}
$a = new Car();
$a->name = 'new car';
$b = clone $a;
var_dump($b);
```
对象序列化，可以通过serialize方法将对象序列化为字符串，用于存储或者传递数据，然后在需要的时候通过unserialize将字符串反序列化成对象进行使用。
```
class Car {
    public $name = 'car';
}
$a = new Car();
$str = serialize($a); //对象序列化成字符串
echo $str.'<br>';
$b = unserialize($str); //反序列化为对象
var_dump($b);
```
#### 3.正则表达式
是对字符串进行操作的一种逻辑公式，就是用一些特定的字符组合成一个规则字符串，称之为正则匹配模式
```
$p = '/apple/';  // '/apple/'就是一个正则表达式，他用来匹配源字符串中是否存在apple字符串
$str = "apple banna";
if (preg_match($p, $str)) {
    echo 'matched';
}
```
PCRE库函数中，正则匹配模式使用分隔符与元字符组成，分隔符可以是非数字、非反斜线、非空格的任意字符。经常使用的分隔符是正斜线(/)、hash符号(#) 以及取反符号(~)
```
/foo bar/
#^[^0-9]$#
~php~
```
如果模式中包含分隔符，则分隔符需要使用反斜杠（\）进行转义
```
/http:\/\//
```
如果模式中包含较多的分割字符，建议更换其他的字符作为分隔符，也可以采用preg_quote进行转义
```
$p = 'http://';
$p = '/'.preg_quote($p, '/').'/';
echo $p;  // /http\:\/\//
```
正则表达式中具有特殊含义的字符称之为元字符，常用的元字符有：
```
\ 一般用于转义字符
^ 断言目标的开始位置(或在多行模式下是行首)
$ 断言目标的结束位置(或在多行模式下是行尾)
. 匹配除换行符外的任何字符(默认)
[ 开始字符类定义
] 结束字符类定义
| 开始一个可选分支
( 子组的开始标记
) 子组的结束标记
? 作为量词，表示 0 次或 1 次匹配。位于量词后面用于改变量词的贪婪特性。 (查阅量词)
* 量词，0 次或多次匹配
+ 量词，1 次或多次匹配
{ 自定义量词开始标记
} 自定义量词结束标记
```
```
//下面的\s匹配任意的空白符，包括空格，制表符，换行符。[^\s]代表非空白符。[^\s]+表示一次或多次匹配非空白符。
$p = '/^我[^\s]+(苹果|香蕉)$/';
$str = "我喜欢吃苹果";
if (preg_match($p, $str)) {
    echo '匹配成功';
}
```
元字符具有两种使用场景，一种是可以在任何地方都能使用，另一种是只能在方括号内使用，在方括号内使用的有：
```
\ 转义字符
^ 仅在作为第一个字符(方括号内)时，表明字符类取反
- 标记字符范围
```
其中^在反括号外面，表示断言目标的开始位置，但在方括号内部则代表字符类取反，方括号内的减号-可以标记字符范围，例如0-9表示0到9之间的所有数字。
```
//下面的\w匹配字母或数字或下划线。
$p = '/[\w\.\-]+@[a-z0-9\-]+\.(com|cn)/';
$str = "我的邮箱是Spark.eric@imooc.com";
preg_match($p, $str, $match);
echo $match[0];
```
贪婪模式与懒惰模式,正则表达式中每个元字符匹配一个字符，当使用+之后将会变的贪婪，它将匹配尽可能多的字符，但使用问号?字符时，它将尽可能少的匹配字符，即是懒惰模式

贪婪模式：在可匹配与可不匹配的时候，优先匹配
```
//下面的\d表示匹配数字
$p = '/\d+\-\d+/';
$str = "我的电话是010-12345678";
preg_match($p, $str, $match);
echo $match[0]; //结果为：010-12345678
```
懒惰模式：在可匹配与可不匹配的时候，优先不匹配
```
$p = '/\d?\-\d?/';
$str = "我的电话是010-12345678";
preg_match($p, $str, $match);
echo $match[0];  //结果为：0-1
```
当我们确切的知道所匹配的字符长度的时候，可以使用{}指定匹配字符数
```
$p = '/\d{3}\-\d{8}/';
$str = "我的电话是010-12345678";
preg_match($p, $str, $match);
echo $match[0]; //结果为：010-12345678
```
\w匹配字母或数字或下划线，\s匹配任意的空白符，包括空格、制表符、换行符
```
$p = '/name:([\w\s]+)/';
$str = "name:steven jobs";
preg_match($p, $str, $match);
echo $match[1]; //结果为：steven jobs
```
PHP使用PCRE库函数来进行正则处理，preg_match用来执行一个匹配，可以简单的用来判断模式是否匹配成功，或者取得一个匹配结果，他的返回值是匹配成功的次数0或者1，在匹配到1次以后就会停止搜索
```
$subject = "abcdef";
$pattern = '/def/';
preg_match($pattern, $subject, $matches);
print_r($matches); //结果为：Array ( [0] => def )
```
上面的代码简单的执行了一个匹配，简单的判断def是否能匹配成功，但是正则表达式的强大的地方是进行模式匹配，因此更多的时候，会使用模式
```
$subject = "abcdef";
$pattern = '/a(.*?)d/';
preg_match($pattern, $subject, $matches);
print_r($matches); //结果为：Array ( [0] => abcd [1] => bc )
```
preg_match只能匹配一次结果，但很多时候我们需要匹配所有的结果，preg_match_all可以循环获取一个列表的匹配结果数组
```
$p = "|<[^>]+>(.*?)</[^>]+>|i";    // 分界符是| ,那么规则串中的 / 就不需要转义
$str = "<b>example: </b><div align=left>this is a test</div>";
preg_match_all($p, $str, $matches);
print_r($matches);
```
可以使用preg_match_all匹配一个表格中的数据
```
$p = "/<tr><td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/i";
$str = "<table> <tr><td>Eric</td><td>25</td></tr> <tr><td>John</td><td>26</td></tr> </table>";
preg_match_all($p, $str, $matches);
print_r($matches);  // $matches结果排序为$matches[0]保存完整模式的所有匹配, $matches[1] 保存第一个子组的所有匹配
```

搜索和替换，正则表达式的搜索与替换在某些方面具有重要用途，比如调整目标字符串的格式，改变目标字符串中匹配字符串的顺序等
```
$string = 'April 15, 2014';
$pattern = '/(\w+) (\d+), (\d+)/i';
$replacement = '$3, ${1} $2';
echo preg_replace($pattern, $replacement, $string); //结果为：2014, April 15
```
其中${1}与$1的写法是等效的，表示第一个匹配的字串，$2代表第二个匹配
```
$patterns = array ('/(19|20)(\d{2})-(\d{1,2})-(\d{1,2})/', '/^\s*{(\w+)}\s*=/');
$replace = array ('\3/\4/\1\2', '$\1 =');//\3等效于$3,\4等效于$4，依次类推
echo preg_replace($patterns, $replace, '{startDate} = 1999-5-27'); //结果为：$startDate = 5/27/1999
//详细解释下结果：(19|20)表示取19或者20中任意一个数字，(\d{2})表示两个数字，(\d{1,2})表示1个或2个数字，(\d{1,2})表示1个或2个数字。^\s*{(\w+)\s*=}表示以任意空格开头的，并且包含在{}中的字符，并且以任意空格结尾的，最后有个=号的。
```
```
// 用正则替换来去掉多余的空格与字符
$str = 'one     two';
$str = preg_replace('/\s+/', ' ', $str);
echo $str; // 结果改变为'one two'
```

#### 4.会话控制（session与cookie）

##### cookie简介

Cookie是存储在客户端浏览器中的数据，我们通过Cookie来跟踪与存储用户数据。一般情况下，Cookie通过HTTP headers从服务端返回到客户端。多数web程序都支持Cookie的操作，因为Cookie是存在于HTTP的标头之中，所以必须在其他信息输出以前进行设置，类似于header函数的使用限制。

PHP通过setcookie函数进行Cookie的设置，任何从浏览器发回的Cookie，PHP都会自动的将他存储在$_COOKIE的全局变量之中，因此我们可以通过$_COOKIE['key']的形式来读取某个Cookie值。

PHP中的Cookie具有非常广泛的使用，经常用来存储用户的登录信息，购物车等，且在使用会话Session时通常使用Cookie来存储会话id来识别用户，Cookie具备有效期，当有效期结束之后，Cookie会自动的从客户端删除。同时为了进行安全控制，Cookie还可以设置域跟路径。

##### 设置cookie

PHP设置Cookie最常用的方法就是使用setcookie函数，setcookie具有7个可选参数，我们常用到的为前5个：


```
name（ Cookie名）可以通过$_COOKIE['name'] 进行访问
value（Cookie的值）
expire（过期时间）Unix时间戳格式，默认为0，表示浏览器关闭即失效
path（有效路径）如果路径设置为'/'，则整个网站都有效
domain（有效域）默认整个域名都有效，如果设置了'www.imooc.com',则只在www子域中有效
```
```
$value = 'test';
setcookie("TestCookie", $value);
setcookie("TestCookie", $value, time()+3600);  //有效期一小时
setcookie("TestCookie", $value, time()+3600, "/path/", "imooc.com"); //设置路径与域
```
```
// PHP中还有一个设置Cookie的函数setrawcookie，setrawcookie跟setcookie基本一样，唯一的不同就是value值不会自动的进行urlencode，因此在需要的时候要手动的进行urlencode。
setrawcookie('cookie_name', rawurlencode($value), time()+60*60*24*365); 
```
```
// 因为Cookie是通过HTTP标头进行设置的，所以也可以直接使用header方法进行设置
header("Set-Cookie:cookie_name=value");
```
##### cookie的删除与过期时间
PHP中删除cookie也是采用setcookie函数来实现
```
setcookie('test', '', time()-1); //可以看到将cookie的过期时间设置到当前时间之前，则该cookie会自动失效，也就达到了删除cookie的目的
```
之所以这么设计是因为cookie是通过HTTP的标头来传递的，客户端根据服务端返回的Set-Cookie段来进行cookie的设置，如果删除cookie需要使用新的Del-Cookie来实现，则HTTP头就会变得复杂，实际上仅通过Set-Cookie就可以简单明了的实现Cookie的设置、更新与删除
```
header("Set-Cookie:test=1393832059; expires=".gmdate('D, d M Y H:i:s \G\M\T', time()-1)); // 用到了gmdate，用来生成格林威治标准时间，以便排除时差的影响
```

##### cookie的有效路径

cookie中的路径用来控制设置的cookie在哪个路径下有效，默认为'/'，在所有路径下都有，当设定了其他路径之后，则只在设定的路径以及子路径下有效
```
setcookie('test', time(), 0, '/path'); // 使test在/path以及子路径/path/abc下都有效，但是在根目录下就读取不到test的cookie值
```

##### session与cookie的异同
cookie将数据存储在客户端，建立起用户与服务器之间的联系，通常可以解决很多问题，但是cookie仍然具有一些局限：
```
cookie相对不是太安全，容易被盗用导致cookie欺骗
单个cookie的值最大只能存储4k
每次请求都要进行网络传输，占用带宽
```
session是将用户的会话数据存储在服务端，没有大小限制，通过一个session_id进行用户识别，PHP默认情况下session id是通过cookie来保存的，因此从某种程度上来说，seesion依赖于cookie。但这不是绝对的，session id也可以通过参数来实现，只要能将session id传递到服务端进行识别的机制都可以使用session	
##### 使用session

在PHP中使用session非常简单，先执行session_start方法开启session，然后通过全局变量$_SESSION进行session的读写

```
session_start();
$_SESSION['test'] = time();
var_dump($_SESSION);
```
session会自动的对要设置的值进行encode与decode，因此session可以支持任意数据类型，包括数据与对象等
```
session_start();
$_SESSION['ary'] = array('name' => 'jobs');
$_SESSION['obj'] = new stdClass();
var_dump($_SESSION);
```
默认情况下，session是以文件形式存储在服务器上的，因此当一个页面开启了session之后，会独占这个session文件，这样会导致当前用户的其他并发访问无法执行而等待。可以采用缓存或者数据库的形式存储来解决这个问题

##### 删除与销毁session
删除某个session值可以使用PHP的unset函数，删除后就会从全局变量$_SESSION中去除，无法访问
```
session_start();
$_SESSION['name'] = 'jobs';
unset($_SESSION['name']);
echo $_SESSION['name']; //提示name不存在
```
如果要删除所有的session，可以使用session_destroy函数销毁当前session，session_destroy会删除所有数据，但是session_id仍然存在。

值得注意的是，session_destroy并不会立即的销毁全局变量$_SESSION中的值，只有当下次再访问的时候，$_SESSION才为空，因此如果需要立即销毁$_SESSION，可以使用unset函数
```
session_start();
$_SESSION['name'] = 'jobs';
$_SESSION['time'] = time();
unset($_SESSION);
session_destroy(); 
var_dump($_SESSION); //此时已为空
```
如果需要同时销毁cookie中的session_id，通常在用户退出的时候可能会用到，则还需要显式的调用setcookie方法删除session_id的cookie值

##### 使用session来存储用户的登录信息
session可以用来存储多种类型的数据，因此具有很多的用途，常用来存储用户的登录信息，购物车数据，或者一些临时使用的暂存数据等。

用户在登录成功以后，通常可以将用户的信息存储在session中，一般的会单独的将一些重要的字段单独存储，然后所有的用户信息独立存储。
```
$_SESSION['uid'] = $userinfo['uid'];
$_SESSION['userinfo'] = $userinfo;
```
一般来说，登录信息既可以存储在sessioin中，也可以存储在cookie中，他们之间的差别在于session可以方便的存取多种数据类型，而cookie只支持字符串类型，同时对于一些安全性比较高的数据，cookie需要进行格式化与加密存储，而session存储在服务端则安全性较高

#### 5.文件系统
##### 读取文件内容
PHP具有丰富的文件操作函数，最简单的读取文件的函数为file_get_contents，可以将整个文件全部读取到一个字符串中
```
$content = file_get_contents('./test.txt');
```
file_get_contents也可以通过参数控制读取内容的开始点以及长度。
```
$content = file_get_contents('./test.txt', null, null, 100, 500);
```
PHP也提供类似于C语言操作文件的方法，使用fopen，fgets，fread等方法，fgets可以从文件指针中读取一行，freads可以读取指定长度的字符串
```
$fp = fopen('./text.txt', 'rb');
while(!feof($fp)) {
    echo fgets($fp); //读取一行
}
fclose($fp);
```
```
$fp = fopen('./text.txt', 'rb');
$contents = '';
while(!feof($fp)) {
    $contents .= fread($fp, 4096); //一次读取4096个字符
}
fclose($fp);
```
使用fopen打开的文件，最好使用fclose关闭文件指针，以避免文件句柄被占用
##### 判断文件是否存在
一般情况下在对文件进行操作的时候需要先判断文件是否存在，PHP中常用来判断文件存在的函数有两个is_file与file_exists.
```
$filename = './test.txt';
if (file_exists($filename)) {
    echo file_get_contents($filename);
}
```
如果只是判断文件存在，使用file_exists就行，file_exists不仅可以判断文件是否存在，同时也可以判断目录是否存在，从函数名可以看出，is_file是确切的判断给定的路径是否是一个文件

更加精确的可以使用is_readable与is_writeable在文件是否存在的基础上，判断文件是否可读与可写
```
$filename = './test.txt';
if (is_writeable($filename)) {
    file_put_contents($filename, 'test');
}
if (is_readable($filename)) {
    echo file_get_contents($filename);
}
```
##### 取得文件的修改时间
文件有很多元属性，包括：文件的所有者、创建时间、修改时间、最后的访问时间等
```
fileowner：获得文件的所有者
filectime：获取文件的创建时间
filemtime：获取文件的修改时间
fileatime：获取文件的访问时间
```
其中最常用的是文件的修改时间，通过文件的修改时间，可以判断文件的时效性，经常用在静态文件或者缓存数据的更新
```
$mtime = filemtime($filename);
echo '修改时间：'.date('Y-m-d H:i:s', filemtime($filename));
```
##### 取得文件的大小
通过filesize函数可以取得文件的大小，文件大小是以字节数表示的。
```
$filename = '/data/webroot/usercode/resource/test.txt';
$size = filesize($filename);
```
如果要转换文件大小的单位，可以自己定义函数来实现。
```
function getsize($size, $format = 'kb') {
    $p = 0;
    if ($format == 'kb') {
        $p = 1;
    } elseif ($format == 'mb') {
        $p = 2;
    } elseif ($format == 'gb') {
        $p = 3;
    }
    $size /= pow(1024, $p);
    return number_format($size, 3);
}

$filename = '/data/webroot/usercode/code/resource/test.txt';
$size = filesize($filename);

$size = getsize($size, 'kb'); //进行单位转换
echo $size.'kb';
```
##### 写入内容到文件
与读取文件对应，PHP写文件也具有两种方式，最简单的方式是采用file_put_contents
```
$filename = './test.txt';
$data = 'test';
file_put_contents($filename, $data); // $data参数可以是一个一维数组，当$data是数组的时候，会自动的将数组连接起来，相当于$data=implode('', $data);
```
PHP也支持类似C语言风格的操作方式，采用fwrite进行文件写入
```
$fp = fopen('./test.txt', 'w');
fwrite($fp, 'hello');
fwrite($fp, 'world');
fclose($fp);
```
##### 删除文件
PHP使用unlink函数进行文件删除
```
unlink($filename);
```
删除文件夹使用rmdir函数，文件夹必须为空，如果不为空或者没有权限则会提示失败
```
rmdir($dir);
``` 
如果文件夹中存在文件，可以先循环删除目录中的所有文件，然后再删除该目录，循环删除可以使用glob函数遍历所有文件
```
foreach (glob("*") as $filename) {
   unlink($filename);
}
```
##### 6.PHP异常处理
从PHP5开始，PHP支持异常处理，异常处理是面向对象一个重要特性，PHP代码中的异常通过throw抛出，异常抛出之后，后面的代码将不会再被执行

异常抛出被用于在遇到未知错误，或者不符合预先设定的条件时，通知客户程序，以便进行其他相关处理，不至于使程序直接报错中断

当代码中使用了try catch的时候，抛出的异常会在catch中捕获，否则会直接中断
```
1、基本语法
try{
    //可能出现错误或异常的代码
    //catch表示捕获，Exception是php已定义好的异常类
} catch(Exception $e){
    //对异常处理，方法：
        //1、自己处理
        //2、不处理，将其再次抛出
}
2、处理处理程序应当包括：
Try - 使用异常的函数应该位于 "try"  代码块内。如果没有触发异常，则代码将照常继续执行。但是如果异常被触发，会抛出一个异常。
Throw - 这里规定如何触发异常。注意：每一个 "throw" 必须对应至少一个 "catch"，当然可以对应多个"catch"
Catch - "catch" 代码块会捕获异常，并创建一个包含异常信息的对象。
```
```
//创建可抛出一个异常的函数
function checkNum($number){
     if($number>1){
         throw new Exception("异常提示-数字必须小于等于1");
     }
     return true;
 }
 
//在 "try" 代码块中触发异常
 try{
     checkNum(2);
     //如果异常被抛出，那么下面一行代码将不会被输出
     echo '如果能看到这个提示，说明你的数字小于等于1';
 }catch(Exception $e){
     //捕获异常
     echo '捕获异常: ' .$e->getMessage();  // 捕获异常: 异常提示-数字必须小于等于1
 }
 ```
 ##### 异常处理类
 PHP具有很多异常处理类，其中Exception是所有异常处理的基类
 ```
Exception具有几个基本属性与方法，其中包括了：

message 异常消息内容
code 异常代码
file 抛出异常的文件名
line 抛出异常在该文件的行数

其中常用的方法有：

getTrace 获取异常追踪信息
getTraceAsString 获取异常追踪信息的字符串
getMessage 获取出错信息

如果必要的话，可以通过继承Exception类来建立自定义的异常处理类。
```
```
//自定义的异常类，继承了PHP的异常基类Exception
class MyException extends Exception {
    function getInfo() {
        return '自定义错误信息';
    }
}

try {
    //使用异常的函数应该位于 "try"  代码块内。如果没有触发异常，则代码将照常继续执行。但是如果异常被触发，会抛出一个异常。
    throw new MyException('error');//这里规定如何触发异常。注意：每一个 "throw" 必须对应至少一个 "catch"，当然可以对应多个"catch"
} catch(Exception $e) {//"catch" 代码块会捕获异常，并创建一个包含异常信息的对象
    echo $e->getInfo();//获取自定义的异常信息
    echo $e->getMessage();//获取继承自基类的getMessage信息
}
```
##### 捕获异常信息
可以通过try catch来捕获异常，我们将执行的代码放在try代码块中，一旦其中的代码抛出异常，就能在catch中捕获
```
try {
    throw new Exception('wrong');
} catch(Exception $ex) {
    echo 'Error:'.$ex->getMessage().'<br>';
    echo $ex->getTraceAsString().'<br>';
}
echo '异常处理后，继续执行其他代码';
```
##### 获取错误发生的所在行
```
try {
    throw new Exception('wrong');
} catch(Exception $ex) {
    $msg = 'Error:'.$ex->getMessage()."\n";
    $msg.= $ex->getTraceAsString()."\n";
    $msg.= '异常行号：'.$ex->getLine()."\n";
    $msg.= '所在文件：'.$ex->getFile()."\n";
    //将异常信息记录到日志中
 	file_put_contents('error.log', $msg);
}
```
#### 7.数据库操作
PHP通过安装相应的扩展来实现数据库操作，现代应用程序的设计离不开数据库的应用，当前主流的数据库有MsSQL，MySQL，Sybase，Db2，Oracle，PostgreSQL，Access等，这些数据库PHP都能够安装扩展来支持，一般情况下常说的LAMP架构指的是：Linux、Apache、Mysql、PHP
##### 数据库扩展
PHP中一个数据库可能有一个或者多个扩展，其中既有官方的，也有第三方提供的。像Mysql常用的扩展有原生的mysql库，也可以使用增强版的mysqli扩展，还可以使用PDO进行连接与操作
````
// mysql扩展进行数据库连接的方法：
$link = mysql_connect('mysql_host', 'mysql_user', 'mysql_password');
```
```
//mysqli扩展
$link = mysqli_connect('mysql_host', 'mysql_user', 'mysql_password');
```
```
// PDO扩展
$dsn = 'mysql:dbname=testdb;host=127.0.0.1';
$user = 'dbuser';
$password = 'dbpass';
$dbh = new PDO($dsn, $user, $password);
```
##### 连接MySQL数据库
PHP要对数据库进行操作，首先要做的是与数据库建立连接，通常我们使用mysql_connect函数进行数据库连接，该函数需要指定数据库的地址，用户名及密码
```
$host = 'localhost';
$user = 'code1';
$pass = '';
$link = mysql_connect($host, $user, $pass);
```
PHP连接数据库的方式类似于直接在命令行下通过进行连接，类似：mysql -hlocalhost -ucode1 -p，当连接成功以后，我们需要选择一个操作的数据库，通过mysql_select_db函数来选择数据库
```
mysql_select_db('code1');
```
通常我们会先设置一下当前连接使用的字符编码，一般的我们会使用utf8编码
```
mysql_query("set names 'utf8'");
```
##### MySQL查询
在数据库建立连接以后就可以进行查询，采用mysql_query加sql语句的形式向数据库发送查询指令
```
$res = mysql_query('select * from user limit 1');
```
对于查询类的语句会返回一个资源句柄（resource），可以通过该资源获取查询结果集中的数据
```
$row = mysql_fetch_array($res);
var_dump($row);
```
默认的，PHP使用最近的数据库连接执行查询，但如果存在多个连接的情况，则可以通过参数指令从那个连接中进行查询
```
$link1 = mysql_connect('127.0.0.1', 'code1', '');
$link2 = mysql_connect('127.0.0.1', 'code1', '', true); //开启一个新的连接
$res = mysql_query('select * from user limit 1', $link1); //从第一个连接中查询数据
```
##### 插入新数据到MySQL中
```
$sql = "insert into user(name, age, class) values('李四', 18, '高三一班')";
mysql_query($sql); //执行插入语句
```
通常数据都是存储在变量或者数组中，因此sql语句需要先进行字符串拼接得到
$name = '李四';
$age = 18;
$class = '高三一班';
$sql = "insert into user(name, age, class) values('$name', '$age', '$class')";
mysql_query($sql); //执行插入语句
```
$name = '李四';
$age = 18;
$class = '高三一班';
$sql = "insert into user(name, age, class) values('$name', '$age', '$class')";
mysql_query($sql); //执行插入语句
```
在mysql中，执行插入语句以后，可以得到自增的主键id,通过PHP的mysql_insert_id函数可以获取该id
```
$uid = mysql_insert_id();
```
##### 取得数据查询结果
PHP操作数据库跟MySql客户端上操作极为相似，先进行连接，然后执行sql语句，再然后获取我们想要的结果集

PHP有多个函数可以获取数据集中的一行数据，最常用的是mysql_fetch_array，可以通过设定参数来更改行数据的下标，默认的会包含数字索引的下标以及字段名的关联索引下标

```
$sql = "select * from user limit 1";
$result = mysql_query($sql);
$row = mysql_fetch_array($result);
```
可以通过设定参数MYSQL_NUM只获取数字索引数组，等同于mysql_fetch_row函数，如果设定参数为MYSQL_ASSOC则只获取关联索引数组，等同于mysql_fetch_assoc函数
```
$row = mysql_fetch_row($result);
$row = mysql_fetch_array($result, MYSQL_NUM); //这两个方法获取的数据是一样的
```
```
$row = mysql_fetch_assoc($result);
$row = mysql_fetch_array($result, MYSQL_ASSOC);
```
如果要获取数据集中的所有数据，我们通过循环来遍历整个结果集
```
$data = array();
while ($row = mysql_fetch_array($result)) {
    $data[] = $row;
}
```
##### 查询分页数据
通过mysql的limit可以很容易的实现分页，limit m,n表示从m行后取n行数据，在PHP中我们需要构造m与n来实现获取某一页的所有数据

假定当前页为$page，每页显示$n条数据，那么m为当前页前面所有的数据，既$m = ($page-1) * $n
```
$page = 2;
$n = 2;
$m = ($page - 1) * $n;
$sql = "select * from user limit $m, $n";
$result = mysql_query($sql);
//循环获取当前页的数据
$data = array();
while ($row = mysql_fetch_assoc($result)) {
    $data[] = $row;
}
```
##### 更新与删除数据
数据的更新与删除相对比较简单，只需要构建好相应的sql语句，然后调用mysql_query执行就能完成相应的更新与删除操作
```
$sql = "update user set name = '曹操' where id=2 limit 1";
if (mysql_query($sql)) {
    echo '更新成功';
}
```
```
// 删除
$sql = "delete from user where id=2 limit 1";
if (mysql_query($sql)) {
    echo '删除成功';
}
```
对于删除与更新操作，可以通过mysql_affected_rows函数来获取更新过的数据行数，如果数据没有变化，则结果为0
```
$sql = "update user set name = '曹操' where id=2 limit 1";
if (mysql_query($sql)) {
    echo mysql_affected_rows();
}
```
##### 关闭MySQL连接
当数据库操作完成以后，可以使用mysql_close关闭数据库连接，默认的，当PHP执行完毕以后，会自动的关闭数据库连接
```
mysql_close();
```
在存在多个数据库连接的情况下，可以设定连接资源参数来关闭指定的数据库连接
```
$link = mysql_connect($host, $user, $pass);
mysql_close($link);
```

#### 8.函数
PHP的函数就是为了完成某些功能的代码块，分为系统函数和自定义函数，系统函数处理字符串、数组......自定义函数按照具体需求封装的函数。不调用不执行。函数名称与变量类似，不区分大小写，函数不能同名。
```
function_exists($functionName); // 如果存在返回true,否则返回fasle;
```
在函数内不能直接使用全局变量
```
// 需要在函数内使用global定义后再使用
$i = 1;
function test() {
	global $i;
	echo $i;
}
// 也可以通过$GLOBAL[键名]
```
取变量地址，传递引用，只能传变量
```
function test(&$i) {
	
}
```












