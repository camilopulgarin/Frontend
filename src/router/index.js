import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListTest from '@/components/Test/ListTest'
import EditTest from '@/components/Test/EditTest'
import Delete from '@/components/Test/Delete'
import NewTest from '@/components/Test/NewTest'
import Resultado from '@/components/Test/Resultado'
import Cuestionario from '@/components/Test/Cuestionario'
import Home from '@/components/Test/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Vue',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Test',
      name: 'ListTest',
      component: ListTest
    },
    {
      path: '/Test/:testId/edit',
      name: 'EditTest',
      component: EditTest
    },
    {
      path: '/Test/:testId/delete',
      name: 'Delete',
      component: Delete
    },
    {
      path: '/Test/new',
      name: 'NewTest',
      component: NewTest
    },
    {
      path: '/Test/Resultado',
      name: 'Resultado',
      component: Resultado
    },
    {
      path: '/Test/Cuestionario',
      name: 'Cuestionario',
      component: Cuestionario
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ],
  mode: 'history'
})
