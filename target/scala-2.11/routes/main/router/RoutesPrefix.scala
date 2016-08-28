
// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/lenovo/Documents/GitHub/BiciPlay/conf/routes
// @DATE:Sun Aug 28 16:32:14 COT 2016


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
