export const validator = {
    isNotEmpty: val => val.trim().length > 0,
    isNotSmall: val => val.length > 5,
    isNotBig: val => val.length <= 20,
    isEmail: (val) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)) return true
        return false
    },
    isNotAllowedPasswordCharacters: (val) => {
        if (/^((?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20})$/.test(val)) return true
        return false
    },
    validate: (value, rules) => {
        const result = []
        for (var rule in rules) {
            let isValid = rules[rule].rule(value)
            if (!isValid) result.push(rules[rule].message)
        }
        if (result.length === 0) return true
        return result
    }
}

