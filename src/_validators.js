export default {
    required: data => !data && typeof data !== "boolean" ? "Este campo é obrigatório." : false,
    _regexp: reg => data => !reg.test(data) ? "Formato inválido!" :false
}