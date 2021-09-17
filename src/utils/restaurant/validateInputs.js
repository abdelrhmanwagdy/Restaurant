infoValidatorForUpdateAndQueryOptions = (infoValidator) => {
    let errors = []
    //validate inputs
    if (infoValidator.name) {
        validators.validateRestaurantName(infoValidator.name)
            ? true
            : (errors.push("Name not validated"));
    }
    if (infoValidator.age) {
        validators.validateAge(infoValidator.age)
            ? true
            : (errors.push("Age not validated"));
    }
    if (infoValidator.address) {
        validators.validateAdderss(infoValidator.address)
            ? true
            : (errors.push("Address not validated"));
    }
    return errors;
}

infoValidatorForAdding = (infoValidator) => {
    let errors = []
    validators.validateRestaurantName(infoValidator.name)
        ? true
        : (errors.push("Name not validated"));
    validators.validateAge(infoValidator.age)
        ? true
        : (errors.push("Age not validated"));
    validators.validateAdderss(infoValidator.address)
        ? true
        : (errors.push("Address not validated"));
    return errors;

}

module.exports = { infoValidatorForUpdateAndQueryOptions, infoValidatorForAdding };