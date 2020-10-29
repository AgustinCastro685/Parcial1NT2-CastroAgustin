<template>

  <section class="src-components-formulario">

    <div class="jumbotron">
      <h2>Formulario</h2>
      <hr />

      <form novalidate autocomplete="off" @submit.prevent="enviar()">
          
          <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    class="form-control"
                    v-model="$v.f.nombre.$model"
                >
                <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
                   <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
                   <div v-if="$v.f.nombre.minLength.$invalid">Se requieren minimo {{$v.f.nombre.minLength.$params.length}} letras</div>
                   <div v-if="$v.f.nombre.maxLength.$invalid">Se permiten maximo {{$v.f.nombre.maxLength.$params.max}} letras</div>
 
                </div>
          </div>
          
          <div class="form-group">
                <label for="descripcion">Descripcion</label>
                <input 
                    type="text"
                    id="descripcion"
                    class="form-control"
                    v-model="$v.f.descripcion.$model"
                >

                <div v-if="$v.f.descripcion.$error && $v.f.descripcion.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.descripcion.required.$invalid">Este campo es requerido</div>
                </div>
          </div>

           <div class="form-group">
                <label for="importe">Importe</label>
                <input 
                    type="number"
                    id="importe"
                    class="form-control"
                    v-model="$v.f.importe.$model"
                >

                <div v-if="$v.f.importe.$error && $v.f.importe.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.importe.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.importe.numeric.$invalid">Campo numerico</div>

                </div>
          </div>


          <!-- ------------ -->
          <!-- BOTÓN ENVÍO  -->
          <!-- ------------ -->
          <div class="form-group">
                <input 
                    type="submit"
                    :disabled="$v.$invalid"
                    class="btn btn-success mt-4"
                    value="Enviar"
                >
          </div>
      </form>

     <!--  <pre>{{$v}}</pre> -->    
    </div>

  </section>

</template>

<script>

import { required, minLength, maxLength, numeric } from '@vuelidate/validators'


  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {
        this.getDatosFormAxios()
    },
    data () {
      return {
          f: this.resetForm(),
          url : 'https://5f94845f9ecf720016bfc764.mockapi.io/api/appvue/gastos'
      }
    },
    validations: {
    f: {
      nombre: { 
            required,
            minLength: minLength(5),
            maxLength: maxLength(15)
          },
      descripcion: { 
            required
          },
      importe: {
            required,
            numeric
      }
          }
    },
    methods: {
        
        //delay : ms => new Promise ( resolve => setTimeout(resolve, ms)),
        /* Envio de datos del formulario al backend */
        async sendDatosFormAxios(datos) {
            try{
               let res = await this.axios.post(this.url, datos , {'content-type': 'application/json'})
               //await this.delay(2000)
               console.log(res.data)
            }
               catch(error){
               console.log('HTTP POST ERROR', error)
            }
            },

        /* Pedido de datos almacenados en el backend */
        async getDatosFormAxios() {
            try{
                 let res = await this.axios(this.url)
                 console.log(res.data)
            }
            
            catch(error){
                 console.log('HTTP GET ERROR', error)
            } 
        },
        
        /* Submit del form */
            async enviar() {
            this.$v.$touch()
              if(!this.$v.$invalid){
              let form = this.f
              console.log(form)
            
              await this.sendDatosFormAxios(form)
              this.f = this.resetForm()
              this.$v.$reset()
          }
        },
        
        /* valor inicial de los campos de datos del formulario */
        resetForm() {
            return {
               nombre: '',
               descripcion : '',
               importe: ''
            }
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-formulario {

  }

  .jumbotron {
    background-color: rgb(153, 153, 194);
    color: white;
  }

  hr {
    background-color: #ddd;
  }

</style>
