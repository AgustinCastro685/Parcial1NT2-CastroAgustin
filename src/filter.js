export default {
    methods:{
        formatearFecha : function (fyh){
         return new Date(fyh).toLocaleString()
        },
        agregarSigno$ : function (imp){
            return "$" + imp
        }
    }
}