import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, ContactUs, NewUser, EditUser } from '../pages'

export const appRoutes = (
  <Switch>
    <Route path="/" exact component={ Home } />
    <Route path="/contact-us" exact component={ ContactUs } />
    <Route path="/user/new" component={ NewUser } />
    <Route path="/user/edit/:id" component={ EditUser }/>
  </Switch>
)
