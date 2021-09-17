const qurbastatics = require('qurbastatics')
validators = qurbastatics.validators

const Restaurant = require('../../models/restaurant')

const validateInputs = require('./validateInputs')

/**
 * @param  {} addingRestaurantInfo_to_validate
 */
module.exports = addingRestaurantInfoValidator = async (addingRestaurantInfoValidator) => {
    const return_value = { error: [] };
    //check existence of all required fields
    if (!addingRestaurantInfoValidator.name || !addingRestaurantInfoValidator.age || !addingRestaurantInfoValidator.address) {
        return_value.error.push("Please fill in all the fields")
        return return_value.error;
    }

    //check that the restaurant is not already exists in the system DB
    let existingRestaurant = await Restaurant.findOne({ name: addingRestaurantInfoValidator.name })
    if (existingRestaurant) {
        return_value.error.push("Restaurant already exists")
        return return_value.error
    }

    //validate inputs
    const validateAddingInfo = validateInputs.infoValidatorForAdding(addingRestaurantInfoValidator)
    if (validateAddingInfo.length > 0) {
        return_value.error = validateAddingInfo
    }

    return return_value.error

};
