const { validators } = require('qurbastatics')

const Restaurant = require('../../models/restaurant')

const validateInputs = require('./validateInputs')


/**
 * @param  {} addingRestaurantInfo_to_validate
 */
module.exports = updatingRestaurantInfoValidator = async (updatingRestaurantInfoValidator) => {
    const return_value = { error: [] };

    //check that the restaurant is not already exists in the system DB
    let existingRestaurant = await Restaurant.findOne({ name: updatingRestaurantInfoValidator.name })
    if (existingRestaurant) {
        return_value.error.push("Restaurant already exists")
        return return_value.error
    }

    //validate inputs
    const validateUpdatingInfo = validateInputs.infoValidatorForUpdateAndQueryOptions(updatingRestaurantInfoValidator)

    if (validateUpdatingInfo.length > 0) {
        return_value.error = validateUpdatingInfo
    }


    return return_value.error

};
