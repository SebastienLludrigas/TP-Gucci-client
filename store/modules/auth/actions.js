/* eslint-disable no-useless-return */
import Cookie from 'js-cookie'

/* eslint-disable no-console */
export default {
  async login (context) {
    context.commit('setError', false)
    context.commit('setErrorMessage', null)

    const data = {
      email: context.getters.connectionInfos.email,
      password: context.getters.connectionInfos.password
    }

    // console.log(data)
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      // console.log(responseData)
      // console.log(response)

      if (!response.ok) {
        context.commit('setError', true)
        context.commit('setErrorMessage', responseData.message)
        return
      }

      localStorage.setItem('token', responseData.token)
      localStorage.setItem('userId', responseData.userId)
      const remainingMilliseconds = 60 * 59 * 1000
      // const remainingMilliseconds = 8000
      const expiryDate = new Date().getTime() + remainingMilliseconds

      // console.log(`expiration date : ${expiryDate / 1000}`)
      // console.log(`current date : ${new Date().getTime() / 1000}`)

      localStorage.setItem('expiryDate', expiryDate)

      Cookie.set('jwt', responseData.token)
      Cookie.set('expiryDate', expiryDate)

      context.dispatch('autoLogout', remainingMilliseconds)

      context.commit('setToken', responseData.token)
      context.commit('setUserInfos', responseData.loadedUser)
      context.commit('setInitialUserReservations', responseData.infosReservations)
      context.commit('setConnected', true)
    } catch (err) {
      console.log(err)
    }
  },

  async initAuth (context, req) {
    let token
    let expirationDate

    if (req) {
      // this.app.router.go()
      if (!req.headers.cookie) {
        console.log('step1')
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        console.log('step2')
        return
      }
      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expiryDate='))
        .split('=')[1]

      // console.log(`expiration date : ${+expirationDate / 1000}`)
      // console.log(`current date : ${new Date().getTime() / 1000}`)

      // console.log(+(expirationDate - new Date().getTime()))

      try {
        const response = await fetch('http://localhost:3000/auth/persistLogin', {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        })

        const responseData = await response.json()

        // console.log(response)
        // console.log(responseData)

        if (!response.ok) {
          this.app.router.push('/Login')
        }

        context.commit('setUserInfos', responseData.loadedUser)
        // console.log(responseData)
        console.log(responseData.infosReservations, 'test')
        context.commit('setInitialUserReservations', responseData.infosReservations)
        console.log(context.getters.userReservations)
      } catch (err) {
        console.log(err)
      }
    } else {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('expiryDate')
    }

    if (new Date().getTime() > +expirationDate || !token) {
      console.log('No token or invalid token')
      context.dispatch('logout')
      return
    }

    context.commit('setToken', token)
    context.commit('setConnected', true)
  },

  autoLogout (context, payload) {
    setTimeout(() => {
      context.dispatch('logout')
    }, payload)
  },

  logout (context) {
    // this.app.router.push('/Login')
    context.commit('setToken', null)
    context.commit('setUserInfos', null)
    context.commit('setUserReservations', null)
    context.commit('setConnected', false)

    Cookie.remove('jwt')
    Cookie.remove('expiryDate')

    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('expiryDate')
      localStorage.removeItem('userId')
    }
  }
}
