import pluginVue from 'eslint-plugin-vue'

export default [
    ...pluginVue.configs['flat/vue2-recommended'],
    {
        files: ["src/**/*.js", "src/**/*.vue"],
        ignores: ["**/.gitignore"],
        rules: {
            "semi": ["error", "never"],
            "no-unreachable": ["error"],
            "no-unexpected-multiline": ["error"],
            "vue/multi-word-component-names": "warn",
            "vue/no-mutating-props": "warn",
        }
    }
]