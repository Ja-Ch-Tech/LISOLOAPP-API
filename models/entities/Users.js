module.exports = {
    Users(typeUser) {
        return {
            email: String,
            password: String,
            type: typeUser
        }
    }
}