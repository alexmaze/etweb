function setLang(lang) {
  Cookies.set("x-etweb-lang", lang)
  window.location.reload()
}

function getLang() {
  return Cookies.get("x-etweb-lang") || "cn"
}
