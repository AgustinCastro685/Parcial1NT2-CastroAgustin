<template>
      <div>
         <div v-if="datos.length">    
            <div class="table-responsive">
              <table class="table">
              <tr class="bg-success text-white">
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Importe</th>
              <th>Fecha</th>
              <th>GastoAcumulado</th>


              
              </tr>
              <tr class="bg-info text-white" v-for="(dato,index) in datos" :key="index">
              <td>{{dato.nombre}}</td>
              <td>{{dato.descripcion}}</td>
              <td>{{agregarSigno$(dato.importe)}}</td>
              <td>{{formatearFecha(dato.createdAt)}}</td>
              <td>{{0}}</td>
              

              </tr>
              </table>
          </div>
         </div>
        <h2 v-else class="alert alert-warning" >Cargar datos</h2>
       
       </div> 
        

</template>

<script>

import filter from '../filter.js'

  export default  {
    name: 'src-components-gastos',
    mixins: [filter],
    props: [],
    mounted () {
      this.getDatosFormAxios()
    },
    data () {
      return {
      datos: [
      
        ],
      }
     
    },
    methods: {
    getDatosFormAxios(){
       let url = 'https://5f94845f9ecf720016bfc764.mockapi.io/api/appvue/gastos'
       this.axios(url)
        .then(resp => {
        console.log(resp.data)
        this.datos = resp.data
        })
        .catch(error => console.log('HTTP GET ERROR',error))
      }
    },
    
    computed: {
    }
}


</script>

<style scoped lang="css">
  .src-components-gastos {

  }
</style>
