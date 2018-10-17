'use strict'

if (!global._babelPolyfill) {
  require("babel-polyfill")
}

import NextAuth from './next-auth-client'

export {
  NextAuth
}
