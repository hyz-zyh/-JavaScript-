/**
 *  Singleton 单例模式
 *  1.限制类只能被实例化一次。
 *  Singleton模式，在实例不存在的情况下，可以通过一个方法创建一个类来实现创建类的新实例，如果实例已经存在它会返回
 *  该对象的引用。
 *
 */

var mySingleton = (function () {
    //实例保持了Singleton 的一个引用
    var instance;

    function init() {
        // Singleton
        //私有方法和变量
        function privateMethod() {
            console.log("I am orivate");
        }

        var privateVariable = "Im also private";
        var privateRandomNumber = Math.random();
        return {
            //公有方法和变量
            publicMethod: function () {
                console.log("The public can see me");
            },
            publicProperty: "I am  also public",
            publicRandomNumber: function () {
                return privateRandomNumber;
            }
        }
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }

})();

/**
 *Observer (观察者)模式
 * 1.Observer也是一种设计模式，其中，一个对象(subject) 维持一系列依赖于它(观察者)的对象，将有关状态的任何变更
 * 自动通知给它们。
 */

    //"use strict";

    //模拟一个目标可能拥有的一系列依赖Observer
    function ObserverList() {
        this.observerList = [];
    }

    /**
     * @return {number}
     */
    ObserverList.prototype.Add = function (obj) {
        return this.observerList.push(obj)
    };

    ObserverList.prototype.Empty = function () {
        this.observerList = [];
    };

    /**
     * @return {number}
     */
    ObserverList.prototype.Count = function() {
        return this.observerList.length;
    };

    ObserverList.prototype.Get = function (index) {
        if(index > -1 && index < this.observerList.length){
            return this.observerList[index];
        }
    };

    /**
     * @return {number}
     */
    ObserverList.prototype.Insert = function (obj, index) {
        var pointer = -1;

        if(index === 0) {
            //unshift() 可向数组的开头添加一个或多个元素，并返回新长度；
            this.observerList.unshift(obj);
            pointer = index;
        } else if(index === this.observerList.length) {
            this.observerList.push(obj);
            pointer = index;
        }
        return pointer;
    };

    /**
     * @return {number}
     */
    ObserverList.prototype.IndexOf = function (obj, startIndex) {
        var i = startIndex,
                pointer = -1;

        while(i < this.observerList.length) {
            if (this.observerList[i] === obj) {
                pointer = i;
            }
            i++;
        }
        return pointer;
    };

    ObserverList.prototype.RemoveIndexAt = function(index) {
        if (index === 0) {
            this.observerList.shift();
        } else if (index === this.observerList.length - 1) {
            this.observerList.pop();
        }
    };

    //使用extension扩展对象
    function extend (obj, extension) {
        for (var key in obj) {
            extension[key] = obj[key];
        }
    }

    //模拟目标(Subject)和在观察者列表上添加，删除或通知观察者的能力
    function Subject () {
        this.observers = new ObserverList();
    }

    Subject.prototype.AddObserver = function (observer) {
        this.observers.Add(observer);
    };

    Subject.prototype.RemoveObserver = function (observer) {
        this.observers.RemoveIndexAt(this.observers.IndexOf(observer,0));
    };

    Subject.prototype.Notify = function (context) {
        var observerCount = this.observers.Count();
        for (var i = 0; i < observerCount; i++) {
            this.observers.Get(i).Update(context);
        }
    };

    //然后定义一个框架来创建新的Observer.这里的Update功能将在后面的自定义行为部分进一步介绍
    //The Observer
    function Observer() {
        this.Update = function() {
            //...
        };
    }

    var controlCheckbox = document.getElementById("mainCheckbox"),
        addBtn = document.getElementById("addNewObserver"),
        container = document.getElementById("observersContainer");

    //具体目标 Concrete Subject
    //利用Subject 扩展 controlCheckbox
    extend(new Subject(), controlCheckbox);

    //点击checkbox会触发通知到观察者身上
    controlCheckbox["onclick"] = new Function("controlCheckbox.Notify(controlCheckbox.checked)");

    addBtn["onclick"] = AddNewObserver;

    //具体观察者 Concrete Observer

    function AddNewObserver () {
        //创建需要添加的新checkbox
        var check = document.createElement("input");
        check.type = "checkbox";

        //利用Observer类扩展checkbox
        extend(new Observer(), check);

        //重写自定义更新行为
        check.Update = function (value) {
           this.checked = value
        };

        //为主subject 的观察者列表添加新的观察者
        controlCheckbox.AddObserver(check);

        //将观察者附件到容器上
        container.appendChild(check);
    }


