module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "ecmaFeatures": {
        "arrowFunctions": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
        "describe": true,
        "it": true,
        "__filename": true,
        "__dirname": true,
    }
};