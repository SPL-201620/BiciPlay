
// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/jose/Documents/DatosMac/Jose/Universidad/2016-2/Fábricas/play-java/conf/routes
// @DATE:Sun Aug 28 12:10:17 COT 2016


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
