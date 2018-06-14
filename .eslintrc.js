module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "modules": true
    },
    "sourceType": "module"
  },

  "parser": "babel-eslint",

  "settings": {
    "import/external-module-folders": ["node_modules", "src"],
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.js"
      }
    }
  },

  "env": {
    "es6": true,
    "node": true
  },

  "plugins": [
    "standard",
    "promise",
    "react"
  ],

  "globals": {
    "document": false,
    "navigator": false,
    "window": false,
    "XMLHttpRequest": false,
    "React": false,
    "fetch": false
  },

  "rules":  {
    // eslint rules
    // https://eslint.org/docs/rules/arrow-parens
    "arrow-parens": ["error", "as-needed"],
    // https://eslint.org/docs/rules/comma-dangle
    "comma-dangle": ["error", "never"],
    // https://eslint.org/docs/rules/indent
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    // https://eslint.org/docs/rules/jsx-quotes
    "jsx-quotes": ["warn", "prefer-double"],
    // https://eslint.org/docs/rules/linebreak-style
    "linebreak-style": ["error", "unix"],
    // https://eslint.org/docs/rules/object-curly-spacing
    "object-curly-spacing": ["error", "always"],
    // https://eslint.org/docs/rules/max-lines
    "max-lines": ["warn", 500],
    // maximum allowed length of lines [level, maxLength] (https://eslint.org/docs/rules/max-len)
    "max-len": ["warn", 150],
    // https://eslint.org/docs/rules/no-console
    "no-console": ["warn"],
    // https://eslint.org/docs/rules/no-mixed-operators
    "no-mixed-operators": ["warn", {
      "groups": [
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
        ["&&", "||"],
        ["in", "instanceof"]
      ],
      "allowSamePrecedence": true
    }],
    // https://eslint.org/docs/rules/no-multi-spaces
    "no-multi-spaces": ["error"],
    // https://eslint.org/docs/rules/no-use-before-define
    "no-use-before-define": ["warn", { "functions": false, "classes": false, "variables": false }],
    // https://eslint.org/docs/rules/no-useless-return
    "no-useless-return": ["warn"],
    // https://eslint.org/docs/rules/no-underscore-dangle
    "no-underscore-dangle": ["warn", { "allow": ["_id"] }],
    // https://eslint.org/docs/rules/no-restricted-syntax
    "no-restricted-syntax": ["error"],
    // https://eslint.org/docs/rules/operator-linebreak
    "operator-linebreak": ["error", "before"],
    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    "prefer-promise-reject-errors": ["warn"],
    // https://eslint.org/docs/rules/padded-blocks
    "padded-blocks": ["warn", { "blocks": "never", "switches": "never", "classes": "never" }],
    // https://eslint.org/docs/rules/semi
    "semi": ["warn", "always"],

    // import plugin rules
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    "import/first": ["warn"],
    // import plugin cannot handle webpack resolve in this case, switching to babel resolution and same configuration for that might work
    // https://github.com/benmosher/eslint-plugin-import/issues/496#issuecomment-303463370
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    "import/no-extraneous-dependencies": [0, {"devDependencies": true}],
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    "import/no-unresolved": [0],

    // react plugin rules
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md
    "react/boolean-prop-naming": ["warn", {
      "propTypeNames": ["bool", "mutuallyExclusiveTrueProps"],
        "rule": "^(allow|display|is|has|are|should)[A-Z]([A-Za-z0-9]?)+"
    }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
    "react/default-props-match-prop-types": ["warn", { "allowRequiredDefaults": false }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
    "react/display-name": ["warn", { "ignoreTranspilerName": false }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
    "react/forbid-foreign-prop-types": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
    "react/forbid-prop-types": [0],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    "react/jsx-first-prop-new-line": ["warn", "multiline-multiprop"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
    "react/jsx-equals-spacing": ["warn", "never"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    "react/jsx-indent": ["warn", 2],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    "react/jsx-no-target-blank": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
    "react/jsx-tag-spacing": ["warn", {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never"
    }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    "react/jsx-wrap-multilines": ["warn", { "arrow": false }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
    "react/jsx-handler-names": ["warn", {
      "eventHandlerPrefix": "handle",
      "eventHandlerPropPrefix": "on"
    }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    "react/jsx-key": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    "react/jsx-sort-props": [0],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    "react/jsx-closing-bracket-location": ["warn", "line-aligned"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
    "react/jsx-closing-tag-location": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    "react/jsx-curly-spacing": ["warn", "never", { "allowMultiline": true }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    "react/jsx-indent-props": ["warn", 2],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    "react/jsx-max-props-per-line": ["warn", { "maximum": 1, "when": "multiline" }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    "react/jsx-no-bind": ["warn", {
      "ignoreRefs": true,
      "allowArrowFunctions": true,
      "allowBind": false
    }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
    "react/jsx-no-duplicate-props": ["warn", { "ignoreCase": true }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
    "react/jsx-no-undef": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
    "react/jsx-pascal-case": ["warn", {
      "allowAllCaps": true,
      "ignore": []
    }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
    "react/no-danger": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
    "react/no-deprecated": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
    "react/no-string-refs": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
    "react/no-danger-with-children": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
    "react/no-children-prop": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
    "react/no-find-dom-node": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
    "react/no-unused-prop-types": [0],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
    "react/no-direct-mutation-state": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
    "react/no-redundant-should-component-update": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md
    "react/no-unused-state": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
    "react/no-did-mount-set-state": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
    "react/no-did-update-set-state": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
    "react/no-will-update-set-state": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
    "react/no-unknown-property": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    "react/no-array-index-key": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md
    "react/no-typos": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
    "react/prefer-es6-class": ["warn", "always"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    "react/prefer-stateless-function": ["warn", { "ignorePureComponents": true }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
    "react/require-optimization": ["warn", { "allowDecorators": [] }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    "react/require-default-props": ["warn"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
    "react/sort-prop-types": ["warn", {
      "ignoreCase": true,
      "callbacksLast": false,
      "requiredFirst": false
    }],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    "react/self-closing-comp": [0],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
    "react/void-dom-elements-no-children": ["warn"],
    "react/prop-types": [0]
  },

  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "standard"
  ]
}
