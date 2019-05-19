/**
 *  Singleton 单例模式
 *  1.限制类只能被实例化一次。
 *  Singleton模式，在实例不存在的情况下，可以通过一个方法创建一个类来实现创建类的新实例，如果实例已经存在它会返回
 *  该对象的引用。
 *
 */

var mySingleton = (function(){
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
            publicMethod: function() {
                console.log("The public can see me");
            },
            publicProperty: "I am  also public",
            publicRandomNumber: function() {
                return privateRandomNumber;
            }
        }
    };

    return {
        getInstance: function() {
            if(!instance){
                instance = init();
            }
            return instance;
        }
    }

})();


/**
 *
 */
/
