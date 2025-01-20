import pluginVue from 'eslint-plugin-vue'

export default [
    // js.configs.recommended,
//   ...pluginVue.configs['flat/recommended'],
    ...pluginVue.configs['flat/vue2-recommended'],
    {
        files: ["src/**/*.js", "src/**/*.vue"],
        ignores: ["**/.gitignore"],
        rules: {
            semi: "error",
            "vue/multi-word-component-names": "warn",
            "vue/no-mutating-props": "warn",
        }
    }
]